# PayTMunim synthetic data set

All data is synthetic. Names, accounts and amounts are illustrative.

## Files

| File | What it is |
|---|---|
| `PayTMunim_Synthetic_Data.xlsx` | Every table in one workbook. Derived fields are native Excel formulas, so the logic is visible. |
| `csv/*.csv` | The same tables as values, for the Postgres loader (one CSV per table). |
| `generate.py` | Deterministic generator (seed 42). Run `python generate.py out` to get the same CSVs again. |
| `build_xlsx.py` | Builds the workbook from the generator output. |

## Tables

| CSV / sheet | Rows | Key fields | Used by (PRD) |
|---|---|---|---|
| business | 1 | name, owner, GSTIN (fake), Paytm MID, bank a/c ··4521 | all |
| outlets | 3 | DAD, MAT, SIO; hours; shifts; monthly target | 03, 18, 19 |
| device_map | 11 | device_id, type, outlet, valid_from, valid_to (effective-dated) | 14 |
| other_qrs | 2 | QR2, QR3 labels (fictional providers) | 19, 20 |
| staff | 7 | role, outlet, shift, salary, PIN hash | 07, 20 |
| paytm_transactions | 1,14,790 | txn_id, timestamp (IST), device_id, outlet_id, method, PAYMENT/REFUND, amount, payer hash, MDR, GST, settlement date | 03, 05, 18, 19 |
| bank_statement | 7,793 | ReBIT DEPOSIT fields: txnId, type, mode, amount, currentBalance, transactionTimestamp, valueDate, narration, reference; plus label_* ground truth | 04, 05, 23 |
| shift_handovers | 3,282 | date, outlet, shift, staff, Paytm total, QR2, QR3, cash counted, cash spent from till, collected total | 19, 20 |
| suppliers | 7 | verified account last 4, account changed on, approved | 07 |
| invoices | 6 | GD-1182 plus duplicate, injected-text and changed-account variants | 07, 08, 11 |
| upcoming_outflows | 7 | 31 Oct to 20 Nov, total ₹12,66,500 | 05 |
| lenders | 5 | A bank 18.5% 3m; B NBFC 22% 3m; C NBFC 26.5% 6m; D min ₹5L; E needs 24 months GST | 06 |
| existing_emis | 1 | ₹22,000 on the 7th | 07 |
| owner_mandate | 10 | refund limits, PIN thresholds, credit cap %, always-ask list | 07, 16 |
| gst_returns | 18 | taxable value by slab, output tax, ITC, net payable, filing dates | 04, 05, 23 |

## Logic the backend must reproduce (formulas in the workbook)

| Field | Logic |
|---|---|
| Paytm `outlet_id` | Device → outlet lookup on `device_map` where `valid_from ≤ txn_date ≤ valid_to`; else `UNASSIGNED`. Paytm sends the device, not the outlet. |
| Paytm `shift` | Morning if the hour is before 15:00, else Evening. |
| Paytm `mdr_inr` | Card payments only: round(|amount| × 1.8%, 2). UPI = 0. Refunds carry no MDR. |
| Paytm `gst_on_mdr_inr` | round(MDR × 18%, 2). |
| Paytm settlement | One credit a day for the whole MID on T+1: net collections − MDR − GST. Expected vs bank credit gives MATCH / CHECK / PENDING. |
| Bank `currentBalance` | Running balance from the opening balance (₹4,20,000 on 1 May 2025). |
| Handover `collected_total` | Paytm + QR2 + QR3 + cash counted + cash spent from the till. |
| Lender match | Amount between min and max, GST months available ≥ required, offer valid. Instalment = round(PMT(rate/12, months, amount), −1). |
| Credit cap | 8% × average monthly collections over 12 complete months (Oct 2025 to Sep 2026) = ₹1,52,000. |
| Cash plan | Opening (bank close 29 Oct + cash in tills) + forecast inflow − known outflows, day by day. |

## Calibration (all pass)

| Check | Value |
|---|---|
| Average monthly collections, Oct 2025 to Sep 2026 | Dadar ₹9.0L, Matunga ₹6.0L, Sion ₹4.0L, total ₹19.0L (exact) |
| Paytm share | 25.0% |
| Diwali week 2025 vs the 4 weeks before | Dadar 1.80×, Matunga 1.50×, Sion 1.50× |
| Opening, start of 30 Oct 2026 | ₹4,50,000 (bank ₹3,54,156 + tills ₹95,844) |
| Credit cap | ₹1,52,000 |
| Paytm today (30 Oct, to 12:40 pm) | Dadar ₹4,980, Matunga ₹3,120, Sion ₹2,040 |
| Matunga Thursday evenings | expected about ₹17,600; 15, 22 and 29 Oct below range, 8 Oct within; 29 Oct = Paytm ₹4,120 + other QRs ₹6,350 + cash ₹4,000 = ₹14,470 |
| Cash plan | lowest −₹1,84,500 on 5 Nov; back above zero 7 Nov; with ₹2 lakh drawdown on 4 Nov, 5 Nov closes at +₹15,500 |
| Lender A | ₹68,730 a month; EMIs after ₹90,730 |

## Stories planted in the data

- **Last Diwali's cash crunch:** on 15 Oct 2025 the owner put in ₹7 lakh from a closed fixed deposit to pay for festival stock (bank line "FD CLOSURE PROCEEDS").
- **Device move:** QR PQR-1002 moved from Matunga to Sion on 15 Oct 2026; Sion's old QR was retired and Matunga got PQR-1004.
- **Shift leakage:** cash short at Matunga on Thursday evenings, 15, 22 and 29 Oct 2026 (PRD 19 pattern).
- **Closed days:** bandh on 9 Jul 2025 and 12 Jan 2026, so all outlets show zero (EC-06).
- **Messy narrations:** truncated, lowercase and blank narrations (PRD 04 must cope).
- **Attack invoices:** a duplicate GD-1182 (GD-1196), an invoice with an instruction to the AI written into it (KA-7710), and GD-1182 resent on WhatsApp with a new account ··3390.
- **Unknown payee:** R K Enterprises, account added 27 Oct 2026, not approved.
