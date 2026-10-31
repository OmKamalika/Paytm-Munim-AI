# PRD-19 · Shift check

**Product:** PayTMunim · **Phase:** 2 · **AI:** Yes (statistical expected range and pattern detection; LLM writes the summary)
**Depends on:** 03 Sales forecast (per-shift), 20 Shift close, 15 Consent (bank confirmation), 22 Shelf photos (optional) · **Feeds:** 13 Home, 24 Receipt
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

For every closed shift, compare what it collected (Paytm exact + other QRs entered + cash counted) with what it should have collected, as a range from the last 12 weeks of the same shift. Confirm other-QR totals against next-morning bank data. Flag patterns over weeks, not single bad shifts, and never by person. The owner can mark a reason.

## 2. Problem

Leakage at shift change shows up at month end, if at all. Owners either suspect everyone or no one. A range-based check that flags patterns, with bank confirmation, gives a fair signal.

## 3. Users

Owner (reviews, marks reasons). Staff never see results.

## 4. Scope

**In:** expected range per shift; collected total; shortfall range; bank confirmation; pattern detection; reasons; shelf photo summary (if PRD 22 is on); shift-check pass per outlet (billing PRD 24).
**Out:** naming staff; automatic deductions; customer-level analysis.

## 5. Method

1. **Expected:** per-shift forecast from PRD 03 (same weekday and shift, last 12 weeks, festival-adjusted). Range = point ± the shift's own 12-week residual spread (seeded Matunga Thursday evening: ₹17,600 ± 4% = ₹16,900 to ₹18,300).
2. **Collected:** Paytm (exact) + other QRs (entered) + cash counted + cash expenses from the till.
3. **Shortfall:** expected range − collected, if collected is below the low end (₹16,900 − ₹14,470 = ₹2,430 to ₹18,300 − ₹14,470 = ₹3,830).
4. **Bank confirmation (next morning):** sum of other-QR credits in the bank for the day vs sum of entered other-QR totals across all outlets; match within ±2% marks "bank-checked". It's business-wide, so it confirms totals, not which outlet.
5. **Pattern:** flag a (outlet, weekday, shift) when ≥ 3 of the last 4 occurrences are below range and the rest of that outlet's shifts are within range at ≥ 90%. Single shortfalls are shown only in the shift list, never as alerts.
6. **Summary text:** the LLM writes one line from the computed pattern; the PRD 02 ground check applies.

## 6. User journey

1. Morning: home alert "Matunga, Thursday evenings: below expected 3 times in 4 weeks · Check".
2. Opens W8: Thursday 29 Oct evening, expected ₹16,900-₹18,300, collected ₹14,470 broken down; shortfall ₹2,430-₹3,830; bank data matched for all 3 outlets; pattern 3 of 4 Thursdays, other 53 shifts within range; shelf: 9 packs of dry fruits moved.
3. Owner knows Thursday evenings give credit to a regular customer: taps **Given on credit**. Pattern muted for 4 weeks with that reason; logged.
4. Or taps **Talk to the manager**: creates a reminder; no message is sent by the app.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Results are visible only to the owner. No staff name appears anywhere in shift-check screens or alerts. |
| FR-02 | Alerts only for patterns (FR rule in section 5.5), never for a single shift. |
| FR-03 | Every figure shows its label: exact, entered, counted, bank-checked, estimate. |
| FR-04 | Reasons: Given on credit, Damaged, Moved to another outlet, Talk to the manager, Other (text). A reason mutes that pattern for 4 weeks. |
| FR-05 | Requires the shift-check pass on that outlet (PRD 24); without it, the outlet shows a preview. |
| FR-06 | If a handover is missing, the shift shows "not closed" and is excluded from patterns. |
| FR-07 | False-alarm rate is tracked: a pattern marked with a benign reason counts as dismissed. |
| FR-08 | Staff are told at onboarding (PRD 14 invite text) that shifts are checked by totals and patterns, never by person. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Festival week | Expected range uses festival uplift; widened ×1.25 (PRD 03). |
| EC-02 | Bank data missing | Results show "not bank-checked yet"; pattern logic still runs on entered totals. |
| EC-03 | Over-collection (above range) | Shown in the shift list as "above expected", never an alert. |
| EC-04 | New outlet (< 8 weeks) | No patterns; "learning" label. |
| EC-05 | Same cashier works every flagged shift | Still no names; the owner can see the roster themselves. |
| EC-06 | Entered other-QR totals don't match bank | "Other QRs entered ₹X, bank shows ₹Y business-wide" shown neutrally. |

## 9. Acceptance criteria

```gherkin
AC-01 Expected vs collected
  Given seeded Matunga Thursday 29 Oct evening data
  When the owner opens the shift check
  Then expected is ₹16,900 to ₹18,300
  And collected is ₹14,470 (Paytm ₹4,120, other QRs ₹6,350, cash ₹4,000)
  And below expected is ₹2,430 to ₹3,830

AC-02 Pattern, not one shift
  Given 3 of the last 4 Thursday evenings at Matunga are below range and 53 other shifts within range
  When patterns run
  Then one alert is raised for Matunga Thursday evenings
  And no alert is raised for any single other shift below range

AC-03 No names
  Given any shift-check screen or alert
  When it renders
  Then no staff member's name appears

AC-04 Bank confirmation
  Given next-morning bank data with other-QR credits within 2% of entered totals
  When confirmation runs
  Then the screen shows "Bank data matches the other-QR totals of all 3 outlets"

AC-05 Mark a reason
  Given the Matunga Thursday pattern
  When the owner taps Given on credit
  Then the pattern is muted for 4 weeks and the reason is logged
```

## 10. Textual wireframe: W8

```
┌──────────────────────────────────────────┐
│ (<)  Shift check · Matunga               │
├──────────────────────────────────────────┤
│ THU 29 OCT · EVENING, 3 PM TO 10 PM      │
│ Expected (last 12 weeks)                 │
│                     ₹16,900 to ₹18,300   │
│ Collected                     ₹14,470    │
│   Paytm (exact)                ₹4,120    │
│   Other QRs (entered)          ₹6,350    │
│   Cash (counted)               ₹4,000    │
│ Below expected        ₹2,430 to ₹3,830   │
├──────────────────────────────────────────┤
│ ✓ Bank data this morning matches the     │
│   other-QR totals of all 3 outlets       │
├──────────────────────────────────────────┤
│ PATTERN                                  │
│ 3 of the last 4 Thursday evenings ran    │
│ below expected. The other 53 shifts      │
│ were within range.                       │
│ ●●●● ●●●◐ ●●●◐ ●●●● … (◐ = below)        │
├──────────────────────────────────────────┤
│ HIGH-VALUE SHELF · dry fruits            │
│ 9 packs moved between 3 pm and 10 pm     │
│ [ See the two photos ]                   │
├──────────────────────────────────────────┤
│ Patterns by shift, never by person.      │
│ Know why? Mark it:                       │
│ [Given on credit] [Damaged]              │
│ [Moved to another outlet]                │
│ [Talk to the manager]                    │
└──────────────────────────────────────────┘
```

## 11. Evals

| ID | Eval | Data | Pass (pilot) |
|---|---|---|---|
| EV-01 | Range calibration | 12 weeks of normal shifts per outlet | 75-90% of normal shifts inside the range |
| EV-02 | Pattern recall | 30 seeded leakage patterns (₹1,500-₹4,000 a shift, 3 of 4 weeks) injected into clean data | ≥ 90% detected |
| EV-03 | False alarms (offline) | 12 weeks of clean seeded data, 3 outlets | ≤ 1 pattern alert per outlet per quarter |
| EV-04 | False alarms (live) | patterns dismissed with a benign reason | ≤ 1 in 5 (pilot gate) |
| EV-05 | No names | every generated summary | 100% name-free |
| EV-06 | Summary grounding | numbers in 50 summaries | 100% match computed values |
| EV-07 | Bank match logic | 40 seeded days with known mismatches | 100% correct match / mismatch |

## 12. Metrics (pilot)

Leakage recovered per outlet (the ₹1,750 a month assumption, measured against matched outlets); alerts per outlet; dismiss rate; pass uptake.

## 13. Open questions

1. Is 3 of 4 the right pattern threshold, or should it scale with shortfall size?
2. Should the owner be able to share a pattern with a manager without names? Proposed: Phase 3.
