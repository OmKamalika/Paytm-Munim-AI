# PRD-18 · Profit per outlet

**Product:** PayTMunim · **Phase:** 2 · **AI:** Yes (LLM explains drivers that code computes; uses PRD 04 labels)
**Depends on:** 04 Outflow detection, 14 Outlet mapping, 17 Cost rules, 20 Shift close (all-channel sales) · **Feeds:** 13 Home, 23 CA pack, 02 Agent (Phase 2 questions)
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

Each outlet's monthly profit: sales, gross margin, rent, staff, other costs, profit. Every line says how sure it is: exact (Paytm), bank-checked (other QRs and cash from handovers), or your rules (costs and margin %). Code computes the numbers and the drivers; the LLM writes a three-line "why" from those drivers.

## 2. Problem

"Which outlet makes money?" One bank account and one GSTIN can't answer it. Owners keep a losing outlet open because the good ones hide it.

## 3. Users

Owner.

## 4. Scope

**In:** monthly P&L per outlet; confidence label per line; drivers (rent % of sales, staff % of sales, sales trend by daypart, loss streak); a three-line explanation; month picker; Phase 2b what-if ("ek staff kam karein toh?").
**Out:** item-level margins (Paytm sees rupees, not items); tax; balance sheet.

## 5. Calculation

| Line | Source | Label |
|---|---|---|
| Sales | Paytm collections (exact) + other QRs and cash from shift handovers (PRD 20), checked against bank next day | exact / bank-checked |
| Gross margin | Sales × the owner's margin % per outlet (default 15%; owner sets) | your rules |
| Rent | Cost rules (PRD 17), outlet-assigned | your rules |
| Staff | Roster salaries + cash wages (PRD 17) | your rules |
| Other | Shared costs split by rule + outlet expenses (PRD 21) | your rules / your estimate |
| Profit | Gross margin − rent − staff − other | mixed (lowest label among lines) |

**Seeded October:**

| | Dadar | Matunga | Sion |
|---|---|---|---|
| Sales | ₹9.0L | ₹6.0L | ₹4.0L |
| Gross margin (15%) | ₹1,35,000 | ₹90,000 | ₹60,000 |
| Rent | ₹45,000 | ₹30,000 | ₹32,000 |
| Staff | ₹45,000 | ₹30,000 | ₹28,000 |
| Other | ₹7,600 | ₹6,100 | ₹6,200 |
| **Profit** | **₹37,400** | **₹23,900** | **−₹6,200** |

**Drivers (code):** rent ÷ sales (Sion 8%, Dadar 5%); evening sales change vs 3 months ago (Sion −14% since Aug); consecutive loss months (Sion 3); staff ÷ sales.

## 6. User journey

1. From home: "October: Sion lost ₹6,200 · Why" → W9.
2. Sees the table; Sion's profit in red.
3. Reads "Why Sion loses money": rent 8% of sales vs Dadar 5%; evening sales down 14% since August; third loss-making month in a row.
4. Taps **How sure is this** → line-by-line labels; taps [edit] on rent → Cost rules (PRD 17).
5. (Phase 2b) Asks "Sion mein shaam ka ek staff kam karein toh kya hoga?" → what-if recomputes with one evening salary removed and shows the new profit.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | `outlet_pnl(month)` returns lines per outlet with value, source and label. |
| FR-02 | Every number in the "why" text is a computed driver; the PRD 02 ground check applies. |
| FR-03 | The explanation is at most 3 lines and names only drivers whose value differs from the business median by ≥ 20% or that persist ≥ 2 months. |
| FR-04 | Profit's label is the least certain of its inputs. |
| FR-05 | If shift handovers are missing for > 20% of shifts in the month, sales show "Paytm only" for that outlet and the profit is greyed with a note. |
| FR-06 | The owner's margin % is per outlet and dated. |
| FR-07 | Members only; non-members see a preview with numbers blurred and "Available with membership". |
| FR-08 | What-if never saves changes; it shows the delta and "Not saved". |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Costs unconfirmed | Profit shown as "costs not confirmed" with a link to PRD 17. |
| EC-02 | Outlet opened mid-month | Prorated rent; label "part month". |
| EC-03 | Margin % not set | Default 15% labelled "default, change it". |
| EC-04 | All outlets profitable | Explanation names the weakest outlet's top driver, neutrally. |
| EC-05 | Device moved mid-month | Effective-dated split (PRD 14). |
| EC-06 | Single-outlet business | One column; no comparison drivers. |

## 9. Acceptance criteria

```gherkin
AC-01 October table
  Given seeded October data and confirmed costs
  When the owner opens Profit by outlet for October
  Then profits are Dadar ₹37,400, Matunga ₹23,900 and Sion −₹6,200

AC-02 Grounded why
  Given Sion's drivers
  When the explanation is written
  Then it states rent 8% of sales vs Dadar 5%, evening sales down 14% since August, and the third loss month in a row
  And every number matches a computed driver

AC-03 Labels
  Given the table
  When the owner opens How sure is this
  Then Paytm collections are "exact", other QRs and cash "bank-checked", rent and staff "your rules"

AC-04 Missing handovers
  Given 30% of Sion's shifts have no handover in October
  When the table shows
  Then Sion's sales say "Paytm only" and profit is greyed with a note

AC-05 What-if not saved
  Given the owner asks what if one evening staff is removed at Sion
  When the answer shows
  Then it shows the new profit and "Not saved", and the cost rules are unchanged
```

## 10. Textual wireframe: W9

```
┌──────────────────────────────────────────┐
│ (<)  Profit by outlet · [October ▾]      │
├──────────────────────────────────────────┤
│               Dadar  Matunga     Sion    │
│ Sales         ₹9.0L    ₹6.0L    ₹4.0L    │
│ Gross margin ₹1.35L  ₹90,000  ₹60,000    │
│ Rent        ₹45,000  ₹30,000  ₹32,000    │
│ Staff       ₹45,000  ₹30,000  ₹28,000    │
│ Other        ₹7,600   ₹6,100   ₹6,200    │
│ Profit      ₹37,400  ₹23,900  −₹6,200    │
├──────────────────────────────────────────┤
│ WHY SION LOSES MONEY                     │
│ Rent is 8% of sales (Dadar: 5%).         │
│ Evening sales are down 14% since Aug.    │
│ Third loss-making month in a row.        │
├──────────────────────────────────────────┤
│ HOW SURE IS THIS                         │
│ Paytm collections     exact              │
│ Other QRs and cash    bank-checked       │
│ Margin, rent, staff   your rules [edit]  │
├──────────────────────────────────────────┤
│ [ Ask: "Sion mein shaam ka ek staff kam  │
│   karein toh kya hoga?" ]                │
└──────────────────────────────────────────┘
```

## 11. Evals

| ID | Eval | Data | Pass (pilot) |
|---|---|---|---|
| EV-01 | Driver correctness | 30 seeded months × outlets with known drivers | 100% computed correctly (code tests) |
| EV-02 | Explanation grounding | every number in 60 explanations | 100% match drivers |
| EV-03 | Explanation relevance | judge + human: are the 3 lines the biggest drivers? | ≥ 90% agree |
| EV-04 | Neutral tone | no blame on staff names, no advice to fire anyone | 100% |
| EV-05 | Label accuracy | lines labelled per section 5 | 100% |
| EV-06 | What-if correctness | 20 what-ifs vs hand-computed results | 100% |
| EV-07 | Language | Hindi explanations rated by 2 native speakers | ≥ 4.0 / 5 |

## 12. Metrics (pilot)

Opens per month; edits to costs after viewing (signal of trust and correction); owners acting on a loss-making outlet (survey).

## 13. Open questions

1. Margin % per outlet is the weakest input. Could the owner's supplier invoices give a better estimate later (Restock)?
