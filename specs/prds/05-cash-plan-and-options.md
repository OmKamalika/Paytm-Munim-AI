# PRD-05 · Cash plan and options (cash tool `cash_plan`)

**Product:** PayTMunim · **Phase:** 0 · **AI:** No (deterministic)
**Depends on:** 01 Seeded data, 03 Sales forecast, 04 Outflow detection, 17 Cost rules (seeded) · **Feeds:** 02 Munim agent, 06 Capital tab, 13 Munim home
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

A day-by-day forecast of the business's combined cash and bank balance for the next 90 days. It finds the days the balance goes below zero (gaps), says why, and builds three costed ways to cover each gap: ask a supplier for time, draw credit, or buy less. All arithmetic is code. The agent explains it; it does not compute it.

## 2. Problem

Stock, salaries, rent, GST and supplier bills land on different days across outlets. Owners learn about a shortfall at the counter. Credit at that moment is slow, and the cheap option (asking a supplier for time) needs a week's notice.

## 3. Users

Owner (reads the plan, picks an option); agent (calls the tool, explains); Capital tab (sized drawdown request); Munim home (alert).

## 4. Scope

**In:** 90-day daily balance; gap detection; reasons; three options per gap with cost; what-if on the festival uplift (via PRD 03) and on a chosen option.
**Out:** tax planning; multi-currency; separate cash vs bank planning per outlet (it's one business-wide balance).

## 5. Calculation

```
opening(d)  = closing(d-1); opening(30 Oct) = ₹4,50,000 (seeded combined cash and bank)
inflow(d)   = Σ outlets forecast_sales point(d)          [PRD 03]
outflow(d)  = Σ scheduled + projected outflows on d      [PRD 04, 17]
closing(d)  = opening(d) + inflow(d) − outflow(d)
range(d)    = closing computed with forecast low and high (low gives the pessimistic plan)
gap         = maximal run of days with closing(d) < buffer (default buffer ₹0)
gap size    = −min closing in the run;  gap date = day of the minimum
```

### The seeded fixture (all three outlets, ₹ lakh)

| Date | Inflow | Outflows | Closing |
|---|---|---|---|
| 30 Oct | 0.70 | none | 5.20 |
| 31 Oct | 0.70 | Patel 2.90 | 3.00 |
| 1 Nov | 0.70 | Salaries 1.05, Mehta 1.50 | 1.15 |
| 2 Nov | 0.70 | none | 1.85 |
| 3 Nov | 0.70 | none | 2.55 |
| 4 Nov | 1.20 | Gupta 5.20 | −1.45 |
| 5 Nov | 1.20 | Rent 1.07, bonus 0.525 | **−1.845 (lowest)** |
| 6 Nov | 1.20 | none | −0.645 |
| 7 Nov | 1.20 | none | 0.555 |

Gap: 4-6 Nov; size ₹1,84,500; lowest on 5 Nov; back above zero on 7 Nov. With a ₹2,00,000 drawdown on 4 Nov, 5 Nov closes at +₹15,500 (shown as "about +₹16,000").

### The three options

| Option | How it's built | Cost shown | Seeded result |
|---|---|---|---|
| **1 Ask a supplier for time** | Pick the largest supplier payment due inside the gap or ≤ 3 days before it that is ≥ gap size; ask for enough days to clear the gap | ₹0 if agreed; marked "needs supplier's yes" | Ask Gupta for 15 days on ₹2 lakh; cost ₹0 if he agrees; [Draft message] |
| **2 Draw credit** | Amount = gap size rounded up to the next ₹10,000 (min ₹50,000); date = first gap day; repay date = first day the plan stays above the amount; cost = amount × lowest matching APR × days ÷ 365 (prepayment at no charge, per the KFS) | interest in ₹; contractual EMI also shown on the Capital tab | Draw ₹2 lakh on 4 Nov, repay by 30 Nov, about ₹2,600 interest (18.5%, 26 days) |
| **3 Buy less** | Reduce the purchase inside the gap by the gap size; margin at risk = reduction × gross margin (seeded 15%) | ₹ of margin at risk | Buy ₹1.8 lakh less; risks about ₹27,000 of Diwali margin |

Option 2 appears only if at least one lender pre-check matches (PRD 06). Options are ordered by cost, cheapest first, and none is labelled "recommended": the owner chooses.

## 6. User journey

1. Munim home shows "Cash runs ₹1.8 lakh short on 5 Nov · [See plan]".
2. Owner opens the plan (W5): the curve, the lowest point, the list of what's coming up, the assumption chip.
3. Taps **5 Nov gap: 3 ways to cover it**.
4. Sees three option cards with costs (same as W4).
5. Picks one:
   - **Option 1:** "Draft message" opens a pre-filled WhatsApp text to Gupta. Owner edits and sends from their own phone. The plan marks the option "asked, waiting".
   - **Option 2:** opens the Capital tab (PRD 06) pre-filled with ₹2,00,000 on 4 Nov for Gupta's invoice.
   - **Option 3:** shows which purchase to cut and the new plan; owner taps **Use this** and the plan redraws with the smaller purchase.
6. The plan redraws with the chosen option applied as "planned".

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | `cash_plan(from, days=90, buffer=0, overrides?)` returns daily rows (date, opening, inflow, outflows[], closing, low, high), gaps[], options[] per gap. |
| FR-02 | All amounts are integers in paise internally; displayed in ₹ with Indian grouping (₹1,84,500) or lakh with one decimal (₹1.8 lakh). |
| FR-03 | Every outflow row cites its source (bank-detected, owner-confirmed, invoice, roster). |
| FR-04 | Every gap carries its top reasons: the 3 largest outflows in or just before it. |
| FR-05 | The pessimistic plan (forecast low) is computed; if it shows a gap the point plan doesn't, show "Possible gap" in amber. |
| FR-06 | Options use only data from PRD 04, 06 and 17; no option is generated by the LLM. |
| FR-07 | The owner can apply an option as "planned"; the plan recomputes; the original is kept for comparison. |
| FR-08 | Recompute takes under 500 ms. |
| FR-09 | The plan shows "Updated <time>" and recomputes when new collections or bank lines arrive. |
| FR-10 | The draft supplier message is a template with amount, days and invoice; the app never sends it. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | No gap in 90 days | "No cash gap in the next 90 days" with the lowest day and its balance. |
| EC-02 | Two gaps | Each listed with its own options; the earlier one first. |
| EC-03 | Gap starts today | Option 1 removed (no notice possible); option 2 marked "today, if the lender approves". |
| EC-04 | No lender matches | Option 2 replaced by "No matching credit line. Ask a lender on the Capital tab." |
| EC-05 | No supplier payment big enough | Option 1 uses the two largest, combined, or is removed with a reason. |
| EC-06 | Gap bigger than any line | Option 2 shows the largest available amount and the remaining gap. |
| EC-07 | Owner's uplift override applied | Plan labelled "Your assumption"; gap figure updates. |
| EC-08 | Negative opening balance | Allowed; gap starts on day 1. |
| EC-09 | Option 3 would cut stock below last year's festival sales | Warning: "Last Diwali you sold more than this." |
| EC-10 | Data stale (no bank update for 3 days) | Banner: "Bank data last updated 27 Oct". |

## 9. Acceptance criteria

```gherkin
AC-01 Gap found
  Given the seeded data and the pinned forecast fixture
  When cash_plan(30 Oct 2026, 90) runs
  Then the lowest point is −₹1,84,500 on 5 Nov 2026
  And the gap runs 4 Nov to 6 Nov
  And the balance is back above zero on 7 Nov

AC-02 Reasons
  Given the 5 Nov gap
  When I read its reasons
  Then they include Gupta ₹5,20,000 on 4 Nov, rent ₹1,07,000 and bonus ₹52,500 on 5 Nov

AC-03 Three options with costs
  Given the 5 Nov gap and 3 matching lenders
  When options are built
  Then option 1 is "Ask Gupta for 15 days on ₹2 lakh" with cost ₹0 if agreed
  And option 2 is "Draw ₹2 lakh on 4 Nov, repay by 30 Nov" with interest between ₹2,550 and ₹2,700
  And option 3 is "Buy ₹1.8 lakh less" with about ₹27,000 of margin at risk

AC-04 Drawdown fixes the gap
  Given option 2 is applied as planned
  When the plan recomputes
  Then 5 Nov closes at +₹15,500 and no gap remains before 30 Nov

AC-05 No lender
  Given no lender pre-check matches
  When options are built
  Then option 2 reads "No matching credit line" and links to the Capital tab

AC-06 Draft message never sent by the app
  Given the owner taps "Draft message" on option 1
  When the draft opens
  Then it is shown in the owner's own messaging app for them to send
  And PayTMunim sends nothing

AC-07 Pessimistic gap
  Given the point plan shows no gap but the low plan dips below zero on 12 Nov
  When the plan is shown
  Then an amber "Possible gap on 12 Nov" appears

AC-08 Speed
  Given the seeded data
  When I change the uplift and recompute
  Then the new plan is returned in under 500 ms
```

## 10. Textual wireframes

**W5 · Cash plan**
```
┌──────────────────────────────────────────┐
│ (<)  Cash plan · 30 Oct to 27 Jan        │
│ Updated 7:10 pm · all outlets, cash+bank │
├──────────────────────────────────────────┤
│ ₹L  5 ┤●                                 │
│     2 ┤ ╲__╱╲                            │
│     0 ┼──────╲───────╱───── Diwali 8 Nov │
│    -2 ┤       ╲_●_╱  Lowest −₹1.8L 5 Nov │
├──────────────────────────────────────────┤
│ COMING UP                                │
│ 31 Oct  Patel Traders       −₹2,90,000   │
│ 1 Nov   Salaries, 7 staff   −₹1,05,000   │
│ 1 Nov   Mehta Dry Fruits    −₹1,50,000   │
│ 4 Nov   Gupta Distributors  −₹5,20,000   │
│ 5 Nov   Rent, 3 outlets     −₹1,07,000   │
│ 5 Nov   Diwali bonus          −₹52,500   │
│ 20 Nov  GST for October       −₹42,000   │
├──────────────────────────────────────────┤
│ ⚠ 5 NOV GAP: 3 WAYS TO COVER IT [Open]   │
├──────────────────────────────────────────┤
│ Assumes Diwali week sells like last      │
│ year's: 1.8x Dadar, 1.5x elsewhere.      │
│ [ Change this ]          (estimate)      │
└──────────────────────────────────────────┘
```

**Gap options sheet**
```
┌──────────────────────────────────────────┐
│ 5 Nov · short by ₹1,84,500               │
│ Why: Gupta ₹5.2L on 4 Nov, rent and      │
│ bonus ₹1.6L on 5 Nov                     │
├──────────────────────────────────────────┤
│ 1  Ask Gupta for 15 days on ₹2 lakh      │
│    Costs ₹0 if he agrees  [Draft message]│
├──────────────────────────────────────────┤
│ 2  Draw ₹2 lakh on 4 Nov, repay 30 Nov   │
│    About ₹2,600 interest  [See offers]   │
├──────────────────────────────────────────┤
│ 3  Buy ₹1.8 lakh less                    │
│    Risks about ₹27,000 margin [Use this] │
├──────────────────────────────────────────┤
│ Cheapest first. You choose.              │
└──────────────────────────────────────────┘
```

**Draft message (opens in the owner's WhatsApp)**
```
Gupta ji, namaste. Invoice GD-1182 (₹5,20,000)
ka ₹2,00,000 hum 19 Nov tak de denge, baaki
4 Nov ko. Chalega? — Rakesh, Sharma General Stores
```

## 11. Data and interfaces

Input: PRD 03 forecast, PRD 04 outflows, PRD 06 `precheck_offers(amount, date)`, PRD 17 costs. Output JSON consumed by PRD 02 and the app. Pure Python module `cashplan/` with no I/O inside the calculation, so tests run on fixtures.

## 12. Metrics (pilot)

Gaps forecast ≥ 7 days ahead; gaps that happened without a forecast (misses); option chosen (1, 2, 3, none); gap-date accuracy ±1 day.

## 13. Open questions

1. Should the buffer default to one day's outflows instead of ₹0? Owners may prefer a cushion.
2. Option 1 depends on the supplier's yes. Should the plan track "asked, waiting" with a reminder after 2 days?
