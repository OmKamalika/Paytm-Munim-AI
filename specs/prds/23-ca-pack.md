# PRD-23 · CA pack

**Product:** PayTMunim · **Phase:** 2 · **AI:** No
**Depends on:** 01 data, 10 Evidence log, 17 Cost rules, 18 Profit, 20 Shift close · **Feeds:** the owner's chartered accountant
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

A books-ready monthly pack for the owner's chartered accountant: Paytm charges by payment type with GST (for input tax credit), settlements and refunds, the daily three-way match (Paytm settlements vs bank credits vs cash), expenses by outlet and category, and profit by outlet. Prepared automatically on the 3rd of each month; the owner decides when and with whom to share it. ₹99 per business a month.

## 2. Problem

Every month the CA rebuilds the books from five sources: Paytm settlement reports, bank statements, cash notebooks, expense slips and GST returns. That rekeying costs the CA hours and the owner fees, and errors slip in. The data already sits in the Munim.

## 3. Users

Owner (shares); CA (receives, imports); Paytm (uses existing settlement reports with MDR and GST as a source).

## 4. Scope

**In:** monthly pack in Excel and PDF plus a JSON file; Tally-friendly ledger CSV; share link to a named CA, valid 30 days; evidence log extract for money actions.
**Out:** filing GST or ITR (the CA files); a CA portal with multi-client dashboards (roadmap).

## 5. Contents

| Sheet | Contents | Source |
|---|---|---|
| Summary | sales by outlet and channel, expenses, profit by outlet, notes on estimates | PRD 18 |
| Paytm charges | MDR and GST by payment type (UPI above ₹2,000, cards, etc.), invoice numbers for input tax credit | Paytm settlement reports |
| Settlements | daily Paytm settlements with UTR | Paytm |
| Three-way match | per day: Paytm settled, bank credited, cash counted; differences flagged | PRD 01, 20 |
| Refunds | each refund, original payment, approver | PRD 07, 10 |
| Expenses | by outlet and category, with source (bank, cash, spoken) and evidence | PRD 17, 21 |
| Money actions | drawdowns and supplier payments with evidence IDs | PRD 10 |
| Ledger CSV | date, voucher type, ledger, amount, narration (Tally import format) | all |

## 6. User journey

1. 3 Nov: notification "Your October CA pack is ready".
2. Owner opens it: summary page; "3 items need your note" (e.g. an uncategorised ₹35,000 debit).
3. Adds notes or skips.
4. Taps **Share with CA** → picks saved CA (name, email, phone) or adds one → PIN → link sent; shown as "Shared with CA Mehta, 3 Nov, valid till 3 Dec".
5. CA opens the link, verifies OTP sent to the CA's phone, downloads Excel, PDF and CSV.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Generated automatically on the 3rd for the previous month; regenerated if late data arrives, with a version number. |
| FR-02 | Every figure carries its source and label (exact, bank-checked, your rules, your estimate). |
| FR-03 | The three-way match lists every day with a difference above ₹100. |
| FR-04 | Sharing requires the owner's PIN, names a recipient, sends a link that needs the recipient's OTP, expires in 30 days, and is logged. |
| FR-05 | The owner can revoke a share link at any time. |
| FR-06 | Members with the CA pack only; others see a sample pack. |
| FR-07 | No customer VPAs or phone numbers in the pack. |
| FR-08 | Ledger CSV validated against the Tally import format before release. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Bank consent revoked mid-month | Pack covers Paytm and cash only; cover note says so. |
| EC-02 | Late bank data after the pack is shared | New version; CA notified of a revision with what changed. |
| EC-03 | Composition dealer | No input tax credit sheet; note added. |
| EC-04 | No CA saved | Owner can download and send it themselves. |
| EC-05 | CA email bounces | Owner notified; link still valid for the phone. |

## 9. Acceptance criteria

```gherkin
AC-01 Pack ready on the 3rd
  Given October data
  When it is 3 Nov
  Then an October pack exists with all sheets in section 5 and the owner is notified

AC-02 Three-way match
  Given a day where Paytm settled ₹10,140, bank credited ₹10,140 and cash counted ₹9,500 vs expected ₹9,800
  When the match sheet is built
  Then that day is flagged with a cash difference of ₹300

AC-03 Share needs PIN and OTP
  Given the owner shares with CA Mehta
  When the CA opens the link
  Then they must enter an OTP sent to their phone
  And the share is in the evidence log

AC-04 Revoke
  Given an active share link
  When the owner revokes it
  Then the link stops working immediately

AC-05 No customer data
  Given any pack file
  When I search it
  Then it contains no customer VPA or phone number
```

## 10. Textual wireframe

```
┌──────────────────────────────────────────┐
│ (<)  CA pack · October 2026      v1      │
├──────────────────────────────────────────┤
│ Sales      ₹19.0L (Paytm ₹4.8L exact)    │
│ Expenses   ₹2.94L · Profit by outlet ›   │
│ Paytm charges ₹1,860 + GST ₹335 (ITC)    │
│ Three-way match  28 of 31 days matched › │
├──────────────────────────────────────────┤
│ ⚠ 3 ITEMS NEED YOUR NOTE                 │
│ 12 Oct  ₹35,000 "TRF 88213"   [Add note] │
├──────────────────────────────────────────┤
│ FILES  Excel · PDF · Tally CSV · JSON    │
├──────────────────────────────────────────┤
│ [ Share with CA ]  (PIN)                 │
│ Shared: CA Mehta · 3 Nov · till 3 Dec    │
│ [ Revoke ]                               │
└──────────────────────────────────────────┘
```

(Figures other than sales are illustrative placeholders for layout.)

## 11. Metrics (pilot)

Packs shared; CA opens; CA feedback on time saved (survey); revisions per pack.

## 12. Open questions

1. Which accounting tools beyond Tally do CAs in the pilot use? Add exports accordingly.
2. Could CAs become a distribution channel (one CA, dozens of clients)? Roadmap: CA dashboard.
