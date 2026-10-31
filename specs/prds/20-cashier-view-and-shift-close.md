# PRD-20 · Cashier view and shift close

**Product:** PayTMunim · **Phase:** 2 · **AI:** No (voice close is PRD 21; shelf photos PRD 22)
**Depends on:** 14 Outlet mapping, 16 Owner rules, 07 Guard · **Feeds:** 19 Shift check, 18 Profit, 21 Voice
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

A restricted view for cashiers: today's Paytm total at their counter, four actions (create a payment request, check a payment landed, refund within their limit, close my shift) and a four-step shift close that records cash, cash expenses, other-QR totals and two shelf photos. No profit, no other outlets, no settings.

## 2. Problem

Shift change is where data goes missing: cash, other QRs and stock change hands twice a day with no record. Without a quick handover, the shift check and all-channel profit can't exist.

## 3. Users

Cashier (primary); manager (same view plus larger refund limit and their outlet's day total); owner (receives handovers).

## 4. Scope

**In:** cashier home; four actions; shift close stepper; handover receipt; limits shown; offline queue.
**Out:** stock counts beyond two shelves; staff attendance; customer data.

## 5. User journeys

**5a. Daily actions**
1. Cashier logs in with phone OTP (invite from PRD 14). Sees "Sion counter · Cashier", today on Paytm ₹2,040, 31 payments.
2. **Create payment request:** amount, optional note → QR or link for the customer.
3. **Check a payment landed:** enters amount or last 4 of the payer's phone → sees matching payments in the last 30 minutes.
4. **Refund (up to ₹500):** picks the original payment from today's list → refund to the same payer → guard check (PRD 07).

**5b. Close my shift (about 2 minutes)**
1. At 10 pm (or when the next cashier arrives) taps **Close my shift**.
2. Step 1 · Count cash: enters ₹3,100 (or by denominations).
3. Step 2 · Cash expenses: "chai ₹400, auto ₹250" (typed, or voice on the Soundbox, PRD 21), each marked "from the till" or "from my pocket".
4. Step 3 · Other QRs: totals from each other QR's app (QR 2 ₹2,450, QR 3 ₹1,180).
5. Step 4 · Photograph 2 shelves (dry fruits, personal care) (PRD 22; skippable until Phase 2b).
6. Taps **Hand over to the next shift**. Both cashiers see a handover receipt; the next cashier taps **Accept** (optional count check).

## 6. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Cashiers see only their outlet's counter data for today; no history beyond today, no profit, no other outlets, no settings. |
| FR-02 | Refund limit and daily limit from the mandate (PRD 16) are shown on the refund button. |
| FR-03 | Every refund goes through Intent Guard; the cashier sees only allowed / sent to owner / not allowed with a short reason. |
| FR-04 | Shift close requires steps 1 and 3; steps 2 and 4 can be "none" or skipped (skip is recorded). |
| FR-05 | Handover record: outlet, shift, cashier, time, cash count, expenses (till / pocket), other-QR totals, photos (hashes), Paytm total (system), next cashier's acceptance. |
| FR-06 | Once submitted, a handover can't be edited by staff; corrections go to the owner as a note. |
| FR-07 | Offline: actions queue locally (except refunds, which need the guard online); handover syncs when back online with original timestamps. |
| FR-08 | Reminder on the Soundbox and phone 15 minutes before shift end. |
| FR-09 | Hindi and English UI (PRD 12). Large tap targets (≥ 48 dp). |

## 7. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Cashier forgets to close | At shift end + 30 min, the owner is told "Sion evening not closed"; the next cashier can start a new shift but the handover stays open. |
| EC-02 | Next cashier disputes the cash count | "Count doesn't match" → both counts recorded → owner notified. |
| EC-03 | Other QR app unavailable | Enter "unknown"; next-day bank check (PRD 19) fills the gap business-wide. |
| EC-04 | Refund for a payment from yesterday | Not in the list; "Ask your manager" (manager can refund within 30 days). |
| EC-05 | Single cashier all day | One shift; close at day end. |
| EC-06 | Cashier tries a settings URL | Blocked; logged. |

## 8. Acceptance criteria

```gherkin
AC-01 Restricted view
  Given a Sion cashier login
  When the home loads
  Then it shows Sion's Paytm total today and four actions
  And no profit, other outlets or settings

AC-02 Refund within limit
  Given a ₹300 payment from payer P at 6:10 pm
  When the cashier refunds ₹300 to P
  Then the guard allows it and the cashier sees "Refunded"

AC-03 Refund above limit
  Given a ₹1,200 payment
  When the cashier tries to refund ₹1,200
  Then they see "Sent to your owner" or are told to ask the manager, per the mandate

AC-04 Shift close
  Given the cashier enters cash ₹3,100, expenses ₹650 from the till, other QRs ₹2,450 and ₹1,180
  When they hand over
  Then a handover record exists with those values and the system Paytm total ₹2,040
  And the next cashier sees it to accept

AC-05 Not closed
  Given the evening shift at Sion ended at 10 pm without a handover
  When it is 10:30 pm
  Then the owner gets "Sion evening not closed"

AC-06 Offline
  Given the phone is offline
  When the cashier completes a shift close
  Then it is saved locally and synced with its original time when back online
```

## 9. Textual wireframes

**F1 · Cashier home and shift close**
```
┌──────────────────────────────────────────┐
│ Sion counter · Cashier                   │
│ Restricted staff view                    │
├──────────────────────────────────────────┤
│ TODAY ON PAYTM        ₹2,040 · 31 pmts   │
├──────────────────────────────────────────┤
│ [ Create payment  ]  [ Check a payment ] │
│ [   request       ]  [   landed        ] │
│ [ Refund (≤ ₹500) ]  [ Close my shift  ] │
├──────────────────────────────────────────┤
│ CLOSE SHIFT · 4 STEPS                    │
│ ① Count cash                   ₹3,100    │
│ ② Cash expenses                  ₹650    │
│    chai ₹400 · auto ₹250 (till)          │
│ ③ Other QRs                              │
│    QR 2 ₹2,450 · QR 3 ₹1,180             │
│ ④ Photograph 2 shelves         1 of 2    │
│    dry fruits, personal care             │
│ [ Hand over to the next shift ]          │
├──────────────────────────────────────────┤
│ You can't see other outlets, profit or   │
│ settings.                                │
└──────────────────────────────────────────┘
```

**Handover receipt (next cashier)**
```
┌──────────────────────────────────────────┐
│ Handover from Anil · 10:02 pm            │
│ Cash ₹3,100 · expenses ₹650              │
│ Other QRs ₹3,630 · Paytm ₹2,040          │
│ [ Count doesn't match ]   [ Accept ]     │
└──────────────────────────────────────────┘
```

**Refund**
```
┌──────────────────────────────────────────┐
│ (<)  Refund · up to ₹500                 │
│ Pick today's payment:                    │
│ 6:10 pm  ₹300  ··4821                    │
│ 5:52 pm  ₹1,200 ··1190  (above limit)    │
│ [ Refund ₹300 to ··4821 ]                │
└──────────────────────────────────────────┘
```

## 10. Metrics (pilot)

Shifts closed on time; median close time (target < 2 min); skipped steps; count disputes.

## 11. Open questions

1. Is the cashier's ₹2,000 daily limit for payment requests or refunds? Confirm in PRD 16 Q1.
2. Should managers see the outlet's day total across all channels?
