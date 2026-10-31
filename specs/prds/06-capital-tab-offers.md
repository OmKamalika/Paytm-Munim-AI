# PRD-06 · Capital tab: every matching offer (cash tool `list_offers`)

**Product:** PayTMunim · **Phase:** 0 (simulated lenders) · **AI:** No
**Depends on:** 01 Seeded data, 05 Cash plan, 15 Data consent (simulated in Phase 0) · **Feeds:** 07 Intent Guard
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

When the cash plan finds a gap, the Capital tab shows every pre-approved credit offer that matches the amount and date, sorted by APR, lowest first, each with its Key Fact Statement. Lenders that didn't match are named with the reason. The owner chooses; nothing is pre-selected. Paytm only passes consented data and insights to the lender for the lender's own decision. Paytm doesn't lend, doesn't hold the money and doesn't charge the merchant. The lender pays the supplier directly; the owner repays the lender.

In Phase 0 all lenders, decisions, disbursals and repayments are simulated.

## 2. Problem

Credit arrives after the shortfall, if at all. Applying at the counter on the day fails: conversion dies between "interested" and "documents uploaded". A pre-approved line, shown before the gap with the costs laid out, changes that.

## 3. Users

| User | Need |
|---|---|
| Owner | See all options and their real cost; choose without pressure |
| Lender | A sized request with consented data and proof of end use |
| Intent Guard | A structured drawdown request to check |

## 4. Scope

**In (Phase 0):** 5 seeded lenders (3 match, 2 don't); matching; APR sort; EMI calculation; KFS view; choose → draft drawdown → guard; simulated disbursal to the supplier.
**Phase 1+:** real Consent 2 per lender (PRD 15); real lender APIs; UPI AutoPay repayment; credit lines on UPI.
**Out:** Paytm as lender; pool or pass-through accounts; charging the merchant; ranking by anything other than a disclosed metric.

## 5. Seeded lenders

| Lender | Type | Line | APR | Tenure | Penal charge | Min | Match for ₹2L on 4 Nov |
|---|---|---|---|---|---|---|---|
| A | Bank | ₹3,00,000 | 18.5% | 3 months | 2% a year on overdue | ₹50,000 | Yes · EMI ₹68,730 |
| B | NBFC | ₹2,50,000 | 22.0% | 3 months | 3% a year | ₹50,000 | Yes · EMI ₹69,130 |
| C | NBFC | ₹5,00,000 | 26.5% | 6 months | 4% a year | ₹1,00,000 | Yes · EMI ₹35,960 |
| D | NBFC | ₹10,00,000 | 17.0% | 12 months | 2% a year | ₹5,00,000 | No: minimum ₹5 lakh |
| E | Bank | ₹4,00,000 | 16.5% | 6 months | 2% a year | ₹1,00,000 | No: needs 24 months of GST filings (has 18) |

EMI is reducing-balance: `P·r·(1+r)^n / ((1+r)^n − 1)`, r = APR ÷ 12.

## 6. User journey

1. From the gap options sheet (PRD 05) or the agent, the owner taps **See offers** for ₹2,00,000 on 4 Nov, for Gupta's invoice GD-1182.
2. Sees the header: amount, date, purpose, "paid straight to Gupta's verified account".
3. Sees 3 offer cards in APR order with line, APR, EMI, tenure, penal charge, [Key facts] and [Choose]. No card is highlighted.
4. Sees "Didn't match: Lender D (minimum ₹5 lakh) · Lender E (needs 24 months of GST filings)".
5. Optionally changes the amount (₹50,000 to the gap size) or tenure; EMIs recompute.
6. Taps **Key facts** on Lender A: the KFS (APR, total cost, all fees, penal charges, cooling-off period, grievance officer, lender's name as the lender).
7. Taps **Choose** on Lender A. A summary appears: "Draw ₹2,00,000 from Lender A on 4 Nov · paid to Gupta Distributors · EMI ₹68,730 for 3 months". Button: **Continue to check**.
8. Intent Guard runs (PRD 07-09). If allowed and approved, the simulated lender "pays" Gupta; the plan updates; the evidence log records it.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | `list_offers(amount, date, purpose, payee)` returns matching offers sorted by APR ascending, ties by total cost, then lender name; plus non-matches with one reason each. |
| FR-02 | Every matching offer is shown. None is hidden, highlighted, badged or pre-selected. |
| FR-03 | Each card shows: lender name and type, line, APR, tenure, EMI, total interest, penal charge, links to KFS. |
| FR-04 | KFS content comes from the lender (seeded); PayTMunim never edits it. |
| FR-05 | Footer always shows: "Paytm isn't the lender and charges you nothing. Paytm shares your data with a lender only with your consent, for its own decision. You repay the lender directly." |
| FR-06 | The Capital tab is available to every Paytm merchant, member or not. No paywall, no upsell on this screen. |
| FR-07 | Disbursal instruction always names the payee's verified account; the money never routes to Paytm or the merchant's account for supplier purchases. |
| FR-08 | `prepare_drawdown` returns a draft action: lender, offer ID, amount, date, payee, payee account, invoice ID, EMI, purpose. Status `draft` until the owner taps Continue. |
| FR-09 | Amount editor: min = lender's minimum, max = min(line, gap × 1.5); EMIs recompute under 200 ms. |
| FR-10 | Offers expire per the lender's validity (seeded 7 days); expired offers show "Ask Lender A to refresh". |
| FR-11 | Simulated disbursal writes a lender → supplier payment record and a repayment schedule; labelled "Simulated". |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | No lender matches | "No matching offer for ₹2 lakh on 4 Nov." Shows non-matches with reasons and the nearest amount any lender would do. |
| EC-02 | Only one matches | Shown alone; no "best" language. |
| EC-03 | Owner has no Consent 2 with any lender | "To see offers, let lenders check your data" → consent flow (PRD 15). In Phase 0 consent is seeded as given. |
| EC-04 | Payee is not an approved supplier | Allowed to view offers; Intent Guard will block at the check (PRD 07). |
| EC-05 | Amount above the gap | Allowed up to 1.5× gap; note "More than the gap by ₹X". |
| EC-06 | Drawdown would breach the credit cap | Shown with an amber note "Above your credit cap: Intent Guard will block this"; still visible, not choosable. |
| EC-07 | Two offers with the same APR | Order by total cost, then name. |
| EC-08 | Offer expires while the owner is on the guard screen | Guard re-checks validity; blocks with "Offer expired". |
| EC-09 | Lender declines at disbursal (simulated failure) | Owner told; plan unchanged; other offers shown again. |
| EC-10 | Owner backs out after Choose | Draft discarded; nothing logged except a "draft discarded" event. |

## 9. Acceptance criteria

```gherkin
AC-01 All matching offers in APR order
  Given seeded lenders and a request for ₹2,00,000 on 4 Nov
  When list_offers runs
  Then I see Lender A 18.5%, Lender B 22.0%, Lender C 26.5% in that order
  And no offer is highlighted or pre-selected

AC-02 Non-matches named
  Given the same request
  When the offers show
  Then "Lender D (minimum ₹5 lakh)" and "Lender E (needs 24 months of GST filings)" are listed as not matching

AC-03 EMI arithmetic
  Given ₹2,00,000 over 3 months at 18.5%
  When the EMI is calculated
  Then it is ₹68,730 (±₹1)
  And for Lender C over 6 months at 26.5% it is ₹35,960 (±₹1)

AC-04 Free and open
  Given a merchant without a membership
  When they open the Capital tab
  Then they see the same offers and no prompt to buy a membership

AC-05 Disclosure
  Given any offer screen
  When it renders
  Then the footer says Paytm isn't the lender, charges nothing, shares data only with consent, and the owner repays the lender directly

AC-06 Choose creates a draft only
  Given the owner taps Choose on Lender A
  When the summary shows
  Then a draft action exists with payee Gupta Distributors and the verified account
  And no disbursal has happened until the guard allows it and the owner approves

AC-07 Credit-cap warning
  Given a test fixture with existing EMIs of ₹90,000 and a cap of ₹1,52,000 a month
  When the owner views Lender A for ₹2,00,000 over 3 months (EMI ₹68,730)
  Then total EMIs would be ₹1,58,730
  And the card shows "Above your credit cap" and Choose is disabled

AC-08 Simulated disbursal
  Given the drawdown is allowed and approved
  When the simulated lender disburses
  Then a payment of ₹2,00,000 from Lender A to Gupta's verified account is recorded, labelled "Simulated"
  And the cash plan shows 5 Nov at +₹15,500
```

## 10. Textual wireframes

**W6 · Capital: every matching offer**
```
┌──────────────────────────────────────────┐
│ (<)  Capital · ₹2,00,000 on 4 Nov        │
│ For Gupta Distributors, invoice GD-1182. │
│ Paid straight to Gupta's verified a/c.   │
│ Amount [₹2,00,000 ✎]                     │
├──────────────────────────────────────────┤
│ ALL MATCHING OFFERS · lowest APR first   │
│ Lender A · bank                          │
│ Line ₹3,00,000 · APR 18.5% · 3 months    │
│ EMI ₹68,730 · interest ₹6,190            │
│ Penal charge 2% a year on overdue        │
│ [ Key facts (KFS) ]          [ Choose ]  │
├──────────────────────────────────────────┤
│ Lender B · NBFC                          │
│ Line ₹2,50,000 · APR 22.0% · 3 months    │
│ EMI ₹69,130 · interest ₹7,390            │
│ [ Key facts (KFS) ]          [ Choose ]  │
├──────────────────────────────────────────┤
│ Lender C · NBFC                          │
│ Line ₹5,00,000 · APR 26.5% · 6 months    │
│ EMI ₹35,960 · interest ₹15,760           │
│ [ Key facts (KFS) ]          [ Choose ]  │
├──────────────────────────────────────────┤
│ DIDN'T MATCH: Lender D (minimum ₹5 lakh) │
│ · Lender E (needs 24 months of GST)      │
├──────────────────────────────────────────┤
│ Paytm isn't the lender and charges you   │
│ nothing. Your data goes to a lender only │
│ with your consent, for its own decision. │
│ You repay the lender directly. Repay     │
│ early at no charge.        [SIMULATED]   │
└──────────────────────────────────────────┘
```

**Chosen offer summary**
```
┌──────────────────────────────────────────┐
│ You chose Lender A                       │
│ Draw    ₹2,00,000 on 4 Nov               │
│ Pay to  Gupta Distributors ··7781        │
│ For     invoice GD-1182                  │
│ EMI     ₹68,730 × 3 (repay early: free)  │
├──────────────────────────────────────────┤
│ Next: Intent Guard checks this against   │
│ your rules. You approve with your PIN.   │
│ [ Back ]          [ Continue to check ]  │
└──────────────────────────────────────────┘
```

**No match**
```
┌──────────────────────────────────────────┐
│ No matching offer for ₹2 lakh on 4 Nov   │
│ Lender D: minimum ₹5 lakh                │
│ Lender E: needs 24 months of GST         │
│ Nearest: Lender A up to ₹3 lakh from     │
│ 12 Nov                                   │
│ [ Back to the plan ]                     │
└──────────────────────────────────────────┘
```

(Interest figures are total interest over the full tenure at the EMI shown; the plan's ₹2,600 assumes early repayment by 30 Nov.)

## 11. Data and interfaces

`lenders` and `offers` tables (seeded); `offer_calc.py` (pure EMI and total cost); `list_offers`, `prepare_drawdown`, `simulate_disbursal` endpoints. In production each lender is an adapter: `precheck`, `offer`, `kfs`, `disburse(payee_account)`, `schedule`.

## 12. Metrics (pilot)

Offers shown per gap; owners who open KFS; choose rate; lender approval at disbursal; overdue rate vs partners' own books (guardrail).

## 13. Open questions

1. Interest totals: should cards show both "if repaid early by 30 Nov" and "over full tenure"? Default: full tenure on the card, early repayment in the plan.
2. Lender commercial terms (Paytm's share of a drawdown, assumed 2%) need confirming with Paytm's lending team.
