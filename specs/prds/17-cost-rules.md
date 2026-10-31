# PRD-17 · Cost rules ("Your costs")

**Product:** PayTMunim · **Phase:** 1 (seeded in Phase 0) · **AI:** Uses PRD 04's labels; no AI of its own
**Depends on:** 04 Outflow detection, 14 Outlet mapping · **Feeds:** 05 Cash plan, 18 Profit per outlet
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

The Munim proposes the business's recurring costs from the bank data (rent, salaries, supplier bills, EMIs, utilities) and asks the owner to confirm each one once, say which outlet it belongs to, and how to split shared costs. The Munim proposes; the owner confirms; nothing is assumed silently.

## 2. Problem

Bank data is business-wide: one rent line may cover two shops; salaries may be partly cash; the electricity bill is shared. Profit per outlet and the cash plan are wrong unless costs are tagged to outlets and confirmed.

## 3. Users

Owner (confirms, splits, adds cash costs).

## 4. Scope

**In:** review list of found costs; confirm, relabel or reject; assign outlet or split rule; add costs not in the bank (cash salaries); change amount going forward.
**Out:** expense claims by staff (PRD 21 handles spoken expenses); GST input credit logic (CA pack).

## 5. Split rules

| Rule | Use for | Example |
|---|---|---|
| One outlet | rent, outlet staff | Rent Dadar ₹45,000 → Dadar |
| Equal | shared admin costs | Accountant ₹3,000 → ₹1,000 each |
| By sales | shared electricity, delivery | split by each outlet's share of sales that month |
| By roster | shared staff (a manager across outlets) | by shifts worked per outlet |
| Custom % | anything else | 50/30/20 |

## 6. User journey

1. After consent, owner sees "Your Munim found 9 regular costs. Confirm them · 5 minutes".
2. Each card: payee, amount, how often, last 3 dates, suggested category and outlet, confidence.
3. For "₹30,000 to Shree Enterprises on the 5th, 6 times · Rent?": owner taps **Yes, that's rent** → picks Matunga.
4. For "₹1,05,000 salary batch on the 1st": owner taps **Split by roster** (uses PRD 14 roster).
5. For "₹5,400 electricity, shared": taps **Split by sales**.
6. Adds a cash cost: "Chai and transport, about ₹6,000 a month, Dadar".
7. Taps **Save costs**. Cash plan and profit update.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Every recurring outflow from PRD 04 with confidence below "confirmed" appears in the review list until the owner acts. |
| FR-02 | Each confirmed cost stores: payee, category, amount rule (fixed or last-3 median), schedule, outlet or split rule, source (bank-detected / owner-added), confirmed-by and date. |
| FR-03 | Owner corrections feed PRD 04's per-business rules (counterparty → category). |
| FR-04 | "Not a cost" (e.g. owner's personal transfer) removes it from profit but keeps it in the cash plan as an outflow. |
| FR-05 | Owner-added cash costs are labelled "your estimate" in profit. |
| FR-06 | Changing a cost's amount applies from a chosen month; history isn't rewritten. |
| FR-07 | Splits must total 100%; the UI blocks saving otherwise. |
| FR-08 | Confirming costs doesn't need a PIN (no money moves); changes are versioned. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Owner skips review | Unconfirmed costs still go into the cash plan (as "found in bank"), but profit per outlet shows "costs not confirmed". |
| EC-02 | Same payee, two outlets (two shops rented from one landlord) | Split into two costs by amount. |
| EC-03 | Rent increase | Owner changes the amount from next month; old months unchanged. |
| EC-04 | Cost stops (outlet closed) | Owner marks "ended on"; cash plan stops projecting it. |
| EC-05 | Salary partly cash | Owner adds the cash part; combined salary per outlet shown. |
| EC-06 | Split by sales when an outlet had zero sales | That outlet's share is 0 for that month. |

## 9. Acceptance criteria

```gherkin
AC-01 Found costs shown
  Given seeded bank data
  When the owner opens Your costs
  Then rent ₹1,07,000 (3 lines), salaries ₹1,05,000 and electricity ₹5,400 appear with suggested categories

AC-02 Confirm and assign
  Given "₹30,000 to Shree Enterprises" suggested as rent
  When the owner confirms it as rent for Matunga
  Then Matunga's profit shows rent ₹30,000
  And next month's line is labelled rent without review

AC-03 Split must total 100%
  Given a custom split of 50/30/10
  When the owner taps Save
  Then saving is blocked with "Splits add up to 90%"

AC-04 Cash cost added
  Given the owner adds ₹6,000 a month of cash costs for Dadar
  When profit is shown
  Then Dadar's Other costs include ₹6,000 labelled "your estimate"

AC-05 Not a cost
  Given a ₹50,000 transfer to the owner's own account
  When marked "Not a cost"
  Then it leaves profit but stays in the cash plan
```

## 10. Textual wireframe: Your costs (wf11)

```
┌──────────────────────────────────────────┐
│ (<)  Your costs                          │
│ You confirm, we never assume · 4 of 9    │
├──────────────────────────────────────────┤
│ FOUND IN YOUR BANK DATA                  │
│ ₹30,000 on the 5th to "R K Estates"      │
│ 6 times · looks like: Rent               │
│ [Dadar] [Matunga] [Sion]                 │
│ [ Yes, that's rent ]  [ Not rent ]       │
├──────────────────────────────────────────┤
│ ₹1,05,000 on the 1st · 7 transfers       │
│ looks like: Salaries                     │
│ [ Split by roster ✓ ] [ Change ]         │
├──────────────────────────────────────────┤
│ SHARED COSTS                             │
│ Electricity (one bill)          ₹5,400   │
│ Split by  (●) Sales ( ) Equal ( ) Custom │
│ Dadar 47% · Matunga 32% · Sion 21%       │
├──────────────────────────────────────────┤
│ WHAT THIS CHANGES                        │
│ Sion's October profit −₹6,200            │
├──────────────────────────────────────────┤
│ [ + Add a cash cost ]                    │
│ [ Save costs ]                           │
└──────────────────────────────────────────┘
```

## 11. Metrics (pilot)

Share of costs confirmed in the first week; corrections per month; owner-added cash costs per outlet.

## 12. Open questions

1. Default split for shared costs: by sales or equal? Sales is fairer; equal is simpler to explain. Default: sales.
