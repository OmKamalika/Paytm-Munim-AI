# PRD-24 · Membership and billing

**Product:** PayTMunim · **Phase:** 2 · **AI:** No
**Depends on:** none · **Feeds:** revenue
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

A clubhouse: an annual membership per business, plus usage fees for what the owner switches on. Billed on its own line by UPI AutoPay, never bundled with the Soundbox rental. A reminder before every charge, a 12-month price lock, one-tap cancel, and a monthly receipt that sets what the owner paid against what the Munim found. The Capital tab is free to every merchant, member or not.

## 2. Problem

Merchants have seen device charges creep up through deductions they didn't expect (a forum thread describes Soundbox charges going from ₹29 to ₹135 a month; anecdotal). A new monthly fee has to read the opposite way: visible, predictable, easy to leave, and clearly worth it.

## 3. Price list (list prices, excluding 18% GST; team estimates to finalise)

| Item | Price | Notes |
|---|---|---|
| Annual membership, per business | ₹2,388 a year (₹199 a month) | First 5 outlets included. Billed monthly or yearly, same price. |
| Extra outlets 6-10 | ₹49 each a month | marginal slabs |
| Extra outlets 11-20 | ₹79 each a month | |
| Extra outlets 21+ | ₹99 each a month | list price; chains negotiate |
| Shift-check pass | ₹99 per outlet a month | only on outlets the owner picks |
| CA pack | ₹99 per business a month | |
| Capital tab | Free | lenders pay Paytm; never conditional on membership |

**What a business pays a month (membership + outlet slabs):** 1-5 outlets ₹199 · 6 ₹248 · 10 ₹444 · 20 ₹1,234 · 50 ₹4,204 · 100 ₹9,154.
**Sharma General Stores:** ₹199 + 3 passes × ₹99 + CA pack ₹99 = ₹595 + GST a month.

## 4. Users

Owner (joins, picks passes, pays, cancels); Paytm finance (invoices, GST).

## 5. User journeys

**5a. Join**
1. Owner taps **Join** from a member-only feature (e.g. profit per outlet) or More > Your plan.
2. Sees the plan builder: membership, outlets counted automatically, toggles for passes per outlet and the CA pack, monthly total with GST.
3. Chooses monthly or yearly billing (same price; yearly charged once).
4. Sets up UPI AutoPay (mandate for the monthly total + 20% headroom, or the yearly amount).
5. Sees "Member from 1 Nov · price locked till Oct 2027 · cancel any time".

**5b. Before every charge**
1. Two days before: in-app banner and notification: "₹595 + GST on 1 Dec by UPI AutoPay. [See what it found] [Change plan]".
2. On the day: charge; receipt in the app.

**5c. Monthly receipt**
1. "October: what you paid, what it found": paid ₹595; shift shortfalls flagged ₹7,300-₹11,500; Sion's monthly loss spotted ₹6,200; Diwali cash gap planned ₹1.8 lakh. Figures come from the modules' own outputs, each linked.

**5d. Cancel**
1. Your plan → **Cancel** → one confirmation: "Cancel at the end of this month? You keep Capital and your evidence log." → **Cancel membership**.
2. AutoPay mandate revoked. Yearly: unused full months refunded.

## 6. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Billing line is separate from device rental on every statement, notification and AutoPay mandate. |
| FR-02 | Reminder ≥ 48 hours before every charge, in-app and by notification. |
| FR-03 | Price lock: the member's prices can't rise for 12 months from joining; a later rise needs 30 days' notice and opt-in at renewal. |
| FR-04 | One-tap cancel from Your plan; no call, form or retention maze; one confirmation screen. |
| FR-05 | Usage changes (passes, outlets) prorate by day from the change; outlet count changes take effect on the next bill unless the owner adds outlets mid-month (prorated). |
| FR-06 | Failed AutoPay: retry on days 1, 3 and 5; features stay on for a 7-day grace; then member features pause (not delete); Capital unaffected. |
| FR-07 | GST invoice per charge with Paytm's GSTIN and the member's GSTIN. |
| FR-08 | The receipt's "what it found" values come from module outputs with links; if a module found nothing, say so plainly. |
| FR-09 | No free tier and no auto-renewing trial that converts silently. |
| FR-10 | The Capital tab never shows membership prompts. |

## 7. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Owner opens a 6th outlet mid-month | ₹49 prorated from that day. |
| EC-02 | Owner switches yearly → monthly mid-year | Takes effect at the end of the paid year. |
| EC-03 | Cancel then rejoin within 30 days | Original price lock restored. |
| EC-04 | AutoPay mandate revoked from the bank app | Treated as cancel at period end; owner told. |
| EC-05 | Receipt month with nothing found | "This month your Munim didn't find any shortfalls. It planned 1 cash gap." No inflated claims. |
| EC-06 | Dispute | Help → raise a dispute; charge refunded if billed against FR-02 or FR-03. |

## 8. Acceptance criteria

```gherkin
AC-01 Bill for Sharma
  Given 3 outlets, shift passes on all 3 and the CA pack
  When the plan is built
  Then the monthly total is ₹595 + GST

AC-02 Slabs
  Given 20 outlets and no passes
  When the bill is calculated
  Then it is ₹1,234 (₹199 + 5 × ₹49 + 10 × ₹79)

AC-03 Reminder
  Given a charge due on 1 Dec
  When it is 29 Nov
  Then the owner has an in-app reminder and a notification with the amount and date

AC-04 One-tap cancel
  Given an active monthly member
  When they tap Cancel and confirm once
  Then the membership ends at month end and the AutoPay mandate is revoked

AC-05 Capital unaffected
  Given a member whose payment failed past grace
  When they open Capital
  Then their offers show as before

AC-06 Price lock
  Given a member joined on 1 Nov 2026
  When list prices rise on 1 Mar 2027
  Then their bills stay unchanged till 31 Oct 2027
```

## 9. Textual wireframes

**W11 · Your plan**
```
┌──────────────────────────────────────────┐
│ (<)  Your plan · Sharma General Stores   │
├──────────────────────────────────────────┤
│ ANNUAL MEMBERSHIP   ₹199 a month         │
│ 3 outlets · first 5 included             │
│ Billed (●) monthly ( ) yearly ₹2,388     │
├──────────────────────────────────────────┤
│ USAGE                                    │
│ Shift-check pass  Dadar ☑ Matunga ☑      │
│                   Sion ☑        ₹297     │
│ CA pack                    ☑     ₹99     │
├──────────────────────────────────────────┤
│ NEXT CHARGE  ₹595 + GST on 1 Dec         │
│ UPI AutoPay · reminder 2 days before     │
│ Price locked till Oct 2027               │
├──────────────────────────────────────────┤
│ OCTOBER: WHAT YOU PAID, WHAT IT FOUND    │
│ You paid                         ₹595    │
│ Shift shortfalls flagged                 │
│                    ₹7,300 to ₹11,500     │
│ Sion's monthly loss spotted   ₹6,200     │
│ Diwali cash gap planned     ₹1.8 lakh    │
├──────────────────────────────────────────┤
│ Capital stays free, member or not.       │
│ [ Cancel ]   [ Bill history ]   [ Help ] │
└──────────────────────────────────────────┘
```

**Cancel**
```
┌──────────────────────────────────────────┐
│ Cancel at the end of November?           │
│ You keep the Capital tab and your        │
│ evidence log. You can rejoin any time.   │
│ [ Keep membership ] [ Cancel membership ]│
└──────────────────────────────────────────┘
```

## 10. Metrics (pilot)

Join rate by segment (gate: ≥ 7% of 2-5 outlet businesses reached pay after two quarters; ≥ 0.5% of single shops); monthly churn; billing complaints (guardrail); pass uptake (assumed 10% single-outlet, 50% multi-outlet outlets); CA pack uptake (assumed 20%).

## 11. Open questions

1. Should yearly billing carry a discount? A two-months-free discount would cut membership revenue by about 17% if everyone took it. Not modelled.
2. Confirm list prices with Paytm's merchant pricing team.
