# PRD-01 · Seeded data and ingestion

**Product:** PayTMunim, with Intent Guard · **Phase:** 0 (hackathon build) · **AI:** No
**Depends on:** none · **Feeds:** 03 Sales forecast, 04 Outflow detection, 05 Cash plan, 06 Capital tab, 07 Guard rules, 18 Profit per outlet, 19 Shift check
**Status:** v1 · 30 Oct 2026

All data in this PRD is synthetic. Names, accounts and amounts are illustrative.

---

## 1. Summary

One command (or one button on a demo admin screen) generates and loads a complete, reproducible data set for Sharma General Stores: 3 outlets, 18 months of daily collections including last Diwali, bank and GST feeds in Account Aggregator (ReBIT) JSON format, costs, suppliers, lenders, the owner's rules and the invoices the demo uses. Every other module reads only from what this loads.

## 2. Problem

Every downstream number (the ₹1.84 lakh gap on 5 Nov, the ₹1.52 lakh credit cap, the 1.8× Diwali uplift) depends on the data. If the data is hand-typed, inconsistent or different on each run, the demo can't be trusted and the acceptance tests can't have fixed expected results.

## 3. Users

| User | Need |
|---|---|
| Builder (Kamalika, at the hackathon) | Reset to a known state in seconds, before every demo run |
| Mentor or judge | See that the data is synthetic, labelled and shaped like real AA data |
| Downstream modules | Typed, validated records with stable IDs |

## 4. Scope

**In scope**
- A deterministic generator (fixed random seed) for 18 months: 1 May 2025 to 30 Oct 2026. This includes Diwali week 2025, so the festival uplift is learned from the data, not typed in.
- A loader that validates every record and writes it to Postgres.
- A reset that wipes and reloads in one step.
- A "SYNTHETIC DATA" label on every screen while seeded data is loaded.

**Out of scope**
- Real Account Aggregator fetch (stretch, PRD 15).
- Real Paytm transaction APIs (stretch).
- Any personal data of real people.

## 5. What gets seeded

| Entity | Records | Key fields | Used by |
|---|---|---|---|
| Business | 1 | Sharma General Stores, GSTIN (fake format-valid), owner Rakesh Sharma, bank a/c ··4521 | all |
| Outlets | 3 | Dadar, Matunga, Sion; open hours 8 am-10 pm; shifts 8-3 and 3-10 | 03, 18, 19 |
| Devices | 9 | per outlet: 1 Paytm QR, 1 AI Soundbox, 1 card machine; outlet tag | 03, 14 |
| Staff | 7 | name (fictional), role (cashier/manager), outlet, PIN hash | 07, 20 |
| Paytm collections | ~1.1 lakh rows | txn_id, timestamp, outlet_id, device_id, amount, payer_vpa_hash, method | 03, 05, 18, 19 |
| Other-QR and cash totals | per shift, 18 months | outlet, shift, other_qr_total, cash_count | 05, 19 |
| Bank statement (AA, FI type DEPOSIT) | ~9,000 rows | txnId, type CREDIT/DEBIT, mode, amount, currentBalance, transactionTimestamp, valueDate, narration, reference | 04, 05 |
| GST returns (AA, FI type GSTR-3B and GSTR-1) | 18 monthly | period, tax payable, ITC, filing date | 04, 05 |
| Costs | rent per outlet, salaries by roster | amount, due day, outlet | 05, 17, 18 |
| Suppliers | 6 approved + 1 unknown | name, verified account, account-changed-on, outlet served | 07 |
| Invoices | 4 | GD-1182 (₹5,20,000, Gupta), a duplicate of it with a new number, an invoice with injected text, a WhatsApp invoice with a changed account | 07, 08, 11 |
| Lenders | 5 | A bank 18.5%, B NBFC 22.0%, C NBFC 26.5% (match); D (min ₹5 lakh) and E (needs 24 months of GST) (no match) | 06 |
| Existing EMIs | 1 | ₹22,000 a month | 07 |
| Owner's rules | 1 mandate | per section 14 of the master doc | 07 |
| Opening balance | 1 | ₹4.5 lakh combined cash and bank at the start of 30 Oct 2026 | 05 |

### Calibration targets (the generator must hit these)

| Target | Value | Tolerance |
|---|---|---|
| Monthly sales, all channels | Dadar ₹9.0L, Matunga ₹6.0L, Sion ₹4.0L (₹19L total) | ±2% |
| Paytm share of sales | about 25% | ±3 pts |
| Diwali week 2025 vs a normal week | Dadar 1.8×, Matunga 1.5×, Sion 1.5× | ±0.05× |
| Weekly pattern | weekends +15%, Thursday evening at Matunga normal until Oct 2026 | n/a |
| Forecast-ready combined collections | about ₹70,000 a day 30 Oct-3 Nov; about ₹1.2 lakh a day 4-7 Nov | ±3% |
| Matunga Thursday evenings, last 4 weeks | 3 of 4 below expected (for PRD 19) | exact |
| Credit cap inputs | average monthly collections ₹19L → 8% ≈ ₹1.52L a month | exact |

### Known upcoming outflows (seeded as scheduled or recurring)

| Date | Payee | Amount |
|---|---|---|
| 31 Oct | Patel Traders | ₹2,90,000 |
| 1 Nov | Salaries, 7 staff | ₹1,05,000 |
| 1 Nov | Mehta Dry Fruits | ₹1,50,000 |
| 4 Nov | Gupta Distributors (GD-1182) | ₹5,20,000 |
| 5 Nov | Rent, 3 outlets | ₹1,07,000 |
| 5 Nov | Diwali bonus | ₹52,500 |
| 20 Nov | GST for October | ₹42,000 |

## 6. User journey (builder at the demo)

1. Opens the demo admin screen (or runs `make seed`).
2. Taps **Load sample data**. Sees progress per entity.
3. Sees a summary: counts per entity, calibration checks passed, data hash.
4. Opens the app. A "SYNTHETIC DATA" ribbon shows on every screen.
5. Before the next run, taps **Reset** to return to the same state.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | The generator takes a seed (default 42) and produces byte-identical output for the same seed and version. |
| FR-02 | Bank and GST records follow the ReBIT FI schema field names for DEPOSIT and GST types, as JSON. |
| FR-03 | Every record is validated with a Pydantic model before insert. One invalid record fails the whole load; nothing partial is written. |
| FR-04 | Load runs in one database transaction. |
| FR-05 | After loading, the calibration checks in section 5 run and report pass or fail with the measured value. |
| FR-06 | The loader writes a data-set hash (SHA-256 over sorted records) and the seed to a `dataset_meta` table. |
| FR-07 | Reset truncates all seeded tables and reloads; the evidence log (PRD 10) is also cleared and a new chain started. |
| FR-08 | Every API response carries `"data_source": "synthetic"` while seeded data is loaded; the app shows a ribbon. |
| FR-09 | Payer VPAs are stored only as salted hashes, even though synthetic. |
| FR-10 | Narrations follow real Indian bank patterns (e.g. "NEFT/PATELTRADERS/…", "UPI/…/RENT DADAR", "SAL OCT"), including messy ones, so PRD 04 is tested on realistic text. |
| FR-11 | Load completes in under 30 seconds on a laptop. |
| FR-12 | Read APIs: `get_collections(outlet?, from, to, granularity)`, `get_bank_lines(from, to)`, `get_gst(period)`, `get_costs()`, `get_suppliers()`, `get_lenders()`, `get_invoices()`, `get_mandate()`. |

## 8. Edge cases

| ID | Case | Expected behaviour |
|---|---|---|
| EC-01 | Load run twice without reset | Second run is refused with "Data already loaded. Reset first." |
| EC-02 | Generator version changes | Data-set hash changes; test fixtures pinned to the old hash fail loudly, not silently. |
| EC-03 | A calibration check fails | Load completes but the summary shows the failure in red, and the acceptance suite (PRD 11) refuses to run. |
| EC-04 | Database unavailable | Clear error, no partial state; retry button. |
| EC-05 | Bank narration missing or empty | Allowed (real data has these); PRD 04 must handle it. |
| EC-06 | Day with zero Paytm collections (outlet closed, e.g. a bandh) | Seeded on 2 days; forecast must not crash. |
| EC-07 | Refund transactions (negative) | Seeded; included in net collections. |
| EC-08 | Timezone | All timestamps stored in UTC, displayed in IST. Day boundaries use IST. |
| EC-09 | Leap year, month ends, 31-day months | Due dates on the 31st roll to the month's last day. |
| EC-10 | Composition-scheme variant | A flag seeds the business without GSTR-1/3B, to test that modules work without GST data. |
| EC-11 | Reset during a running demo session | Sessions are invalidated; the app returns to home with a "Data was reset" toast. |

## 9. Acceptance criteria

```gherkin
AC-01 Deterministic generation
  Given seed 42 and generator v1
  When I generate the data set twice
  Then both runs produce the same data-set hash

AC-02 Calibration
  Given the data set is loaded
  When the calibration checks run
  Then Diwali-week uplift is 1.8x at Dadar and 1.5x at Matunga and Sion within ±0.05x
  And average monthly collections are ₹19 lakh within ±2%
  And the opening balance on 30 Oct 2026 is ₹4,50,000

AC-03 All-or-nothing load
  Given one bank record has an amount that is not a number
  When I load the data
  Then the load fails with the record's ID and field named
  And no table contains any new rows

AC-04 Double load refused
  Given the data is already loaded
  When I tap "Load sample data" again
  Then I see "Data already loaded. Reset first."
  And nothing changes

AC-05 Reset
  Given the data is loaded and the evidence log has 5 entries
  When I tap Reset and confirm
  Then all seeded tables are reloaded with the same data-set hash
  And the evidence log has 0 entries and a new genesis hash

AC-06 Synthetic label
  Given seeded data is loaded
  When I open any app screen
  Then a "SYNTHETIC DATA" ribbon is visible
  And every API response has data_source = "synthetic"

AC-07 Schema
  Given the bank lines are loaded
  When I read one through get_bank_lines
  Then it has txnId, type, mode, amount, currentBalance, transactionTimestamp, valueDate, narration and reference

AC-08 Known outflows
  Given the data is loaded
  When I list scheduled outflows from 30 Oct to 20 Nov 2026
  Then I see the 7 outflows in section 5 with the exact amounts and dates

AC-09 Composition variant
  Given the composition-scheme flag is on
  When I load the data
  Then no GSTR-1 or GSTR-3B records exist
  And the load still passes every other calibration check

AC-10 Speed
  Given an empty database
  When I load the data on the demo laptop
  Then the load finishes in under 30 seconds
```

## 10. Textual wireframe: demo admin screen (builder only)

```
┌──────────────────────────────────────────┐
│ PayTMunim · Demo data          [SYNTHETIC]│
├──────────────────────────────────────────┤
│ Business   Sharma General Stores         │
│ Seed       42 · generator v1             │
│ Data hash  7c1e…a90                      │
├──────────────────────────────────────────┤
│ LOADED                                   │
│ Outlets 3 · Devices 9 · Staff 7          │
│ Collections 1,12,480 · Bank lines 9,012  │
│ GST returns 18 · Invoices 4 · Lenders 5  │
├──────────────────────────────────────────┤
│ CALIBRATION                     7 of 7   │
│ (ok) Monthly sales ₹19.0L                │
│ (ok) Diwali uplift 1.80x / 1.50x / 1.50x │
│ (ok) Opening balance ₹4,50,000           │
│ (ok) Credit cap ₹1.52L a month           │
│ (ok) Matunga Thursdays: 3 of 4 low       │
│ ...                                      │
├──────────────────────────────────────────┤
│ [ Load sample data ]   [ Reset ]         │
│ [ Run acceptance tests → ]               │
└──────────────────────────────────────────┘
```

Reset asks once: "Reset all data and the evidence log? [Cancel] [Reset]".

## 11. Data and interfaces

- **Storage:** Postgres, one schema `seed`. Tables per entity in section 5 plus `dataset_meta(seed, version, hash, loaded_at, calibration_json)`.
- **Files:** `seed/generate.py` (pandas, numpy, seeded RNG), `seed/models.py` (Pydantic), `seed/load.py`, `seed/fixtures/*.json` (ReBIT-shaped bank and GST samples).
- **API:** FastAPI read endpoints in FR-12, plus `POST /admin/seed`, `POST /admin/reset`, `GET /admin/seed/status`. Admin endpoints disabled outside demo mode.

## 12. Metrics

| Metric | Target |
|---|---|
| Load time | < 30 s |
| Calibration checks passing | 7 of 7 |
| Runs with an identical hash | 100% |

## 13. Open questions

1. Does the event allow a pre-generated data file, or must the generator run on the day? (Check the rules.) The design supports both.
2. If an AA sandbox becomes available, swap the bank and GST source behind the same read APIs; nothing downstream changes.
