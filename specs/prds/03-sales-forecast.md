# PRD-03 · Sales forecast (cash tool `forecast_sales`)

**Product:** PayTMunim · **Phase:** 0 · **AI:** Yes, statistical (no LLM)
**Depends on:** 01 Seeded data · **Feeds:** 05 Cash plan, 02 Munim agent, 19 Shift check
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

A per-outlet daily sales forecast for the next 90 days, with a range, built from the outlet's own history and scaled for festivals by the uplift seen last year. It is plain, inspectable Python: no LLM touches the numbers. The agent calls it as a tool; the cash plan uses it as inflows.

## 2. Problem

The cash plan is only as good as its inflow estimate. Owners know Diwali sells more but not how much more per outlet, and a single flat guess hides the outlet that's fading (Sion evenings, down 14% since August).

## 3. Users

| User | Need |
|---|---|
| Owner | A believable range, the reason behind it, and a way to change the festival assumption |
| Cash plan (PRD 05) | Daily point forecast and range per outlet, all channels |
| Shift check (PRD 19) | Expected range per outlet per shift |
| Agent (PRD 02) | Components it can explain ("last Diwali sold 1.8×") |

## 4. Scope

**In:** daily forecast per outlet, 90 days; 80% range; festival uplift from last year's same festival week; weekday pattern; trend; per-shift split; an owner override of the uplift.
**Out:** item-level forecasts; weather; competitor effects; ML models that can't be explained in one sentence.

## 5. Method

1. **Series:** daily net sales per outlet, all channels (Paytm exact + other QRs entered + cash counted), 18 months.
2. **Clean:** mark festival weeks and closure days (zero sales) as special; exclude them from fitting the base model.
3. **Base model:** Holt-Winters, additive weekly seasonality (period 7), damped trend, fitted per outlet with `statsmodels.ExponentialSmoothing`.
4. **Festival uplift:** for each outlet, uplift = sales in last year's festival week ÷ average of the 4 normal weeks before it. Seeded result: Dadar 1.8×, Matunga 1.5×, Sion 1.5×. Applied to the matching calendar window this year (Diwali week 2026: 4-10 Nov; Lakshmi Puja 8 Nov).
5. **Range:** 80% interval from the residual distribution of the last 12 weeks (empirical 10th and 90th percentiles of residuals), widened ×1.25 inside festival windows.
6. **Shift split:** each day's forecast split into shifts by the outlet's average shift share for that weekday over 12 weeks.
7. **Output components:** level, trend, weekday effect, festival uplift, so every number can be explained.

## 6. User journey (the only user-facing part: changing the festival assumption)

1. Owner opens the cash plan (W5) and sees: "Assumes Diwali week sells like last year's: 1.8× at Dadar, 1.5× elsewhere. [Change this]".
2. Taps **Change this**. A sheet shows each outlet's uplift with a slider (1.0× to 2.5×, step 0.1) and last year's actual for reference.
3. Changes Dadar to 1.5×, taps **Recalculate**.
4. The cash plan redraws; the gap figure updates; a chip shows "Your assumption" instead of "Last year".
5. **Reset to last year** restores the learned values.

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | `forecast_sales(outlet_id \| all, from, to, granularity=day\|shift)` returns, per period: point, low, high, components, source label. |
| FR-02 | Forecasts are deterministic for the same data, settings and version. |
| FR-03 | Fitting and forecasting all 3 outlets for 90 days takes under 2 seconds. |
| FR-04 | Festival calendar is a config table (Diwali, Holi, Eid, Christmas, Ganesh Chaturthi, local), not hard-coded. |
| FR-05 | If an outlet has fewer than 8 weeks of history, use the average of other outlets' weekday pattern scaled to its level, and label "low history". |
| FR-06 | If last year's festival week is missing for an outlet, use the business's other outlets' median uplift, labelled "borrowed". If none, uplift 1.0, labelled "no history". |
| FR-07 | Owner overrides of the uplift are stored per outlet, per festival, with who and when, and are labelled "Your assumption" everywhere they show. |
| FR-08 | Every forecast row carries `label: estimate` and the components used. |
| FR-09 | The forecast never goes below zero; low bound is floored at 0. |
| FR-10 | Model version and fitted parameters are logged per run for audit. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Outlet closed for a day (zero sales) | Excluded from fitting; future closures only if scheduled by the owner. |
| EC-02 | New outlet, 3 weeks old | FR-05 fallback; wide range; "low history" label. |
| EC-03 | Sudden step change (Sion evening drop since Aug) | Damped trend picks it up; the agent can cite the trend component. |
| EC-04 | One-off spike (a ₹80,000 bulk order) | Residuals above 4σ are winsorised before fitting. |
| EC-05 | Missing days of data (device offline) | Treated as missing, not zero; interpolated for fitting only. |
| EC-06 | Owner sets uplift to 2.5× | Allowed; plan shows "Your assumption" and a note that it is 0.7× above last year. |
| EC-07 | Festival date moves year to year | Calendar table drives the window, so last year's 20 Oct maps to this year's 8 Nov. |
| EC-08 | Refund-heavy day (net negative) | Net sales floored at 0 for fitting. |
| EC-09 | Request beyond 90 days | Rejected with "Forecasts go up to 90 days". |

## 9. Acceptance criteria

```gherkin
AC-01 Forecast shape
  Given the seeded data
  When forecast_sales(all, 30 Oct 2026, 27 Jan 2027, day) is called
  Then it returns 90 days for each of 3 outlets
  And every row has point, low, high, components and label "estimate"

AC-02 Seeded calibration
  Given the seeded data
  When I forecast 30 Oct to 7 Nov 2026 for all outlets combined
  Then 30 Oct to 3 Nov averages ₹70,000 a day within ±3%
  And 4 Nov to 7 Nov averages ₹1,20,000 a day within ±3%

AC-03 Uplift learned from last year
  Given last year's Diwali week is in the data
  When I read the components for 8 Nov 2026
  Then the festival uplift is 1.8 at Dadar and 1.5 at Matunga and Sion within ±0.05

AC-04 Owner override
  Given the cash plan shows "1.8x at Dadar"
  When the owner changes Dadar to 1.5x and taps Recalculate
  Then Dadar's 4-10 Nov forecast drops by about 17%
  And the plan shows "Your assumption" next to Dadar
  And the override is saved with the owner's ID and time

AC-05 Reset override
  Given Dadar is set to 1.5x by the owner
  When the owner taps "Reset to last year"
  Then Dadar's uplift returns to 1.8x and the label returns to "Last year"

AC-06 Low history
  Given an outlet with 3 weeks of data
  When it is forecast
  Then the result is labelled "low history" and its range is at least ±25% of the point

AC-07 Determinism
  Given the same data and version
  When I forecast twice
  Then both outputs are identical

AC-08 Speed
  Given 3 outlets with 18 months of data
  When I forecast 90 days
  Then it completes in under 2 seconds
```

## 10. Textual wireframe: "Change this" sheet (from W5)

```
┌──────────────────────────────────────────┐
│ Diwali week · how much more will sell?   │
├──────────────────────────────────────────┤
│ Dadar     last year 1.8x                 │
│ 1.0 ───────────────●──── 2.5   [1.8x]    │
│ Matunga   last year 1.5x                 │
│ 1.0 ──────────●───────── 2.5   [1.5x]    │
│ Sion      last year 1.5x                 │
│ 1.0 ──────────●───────── 2.5   [1.5x]    │
├──────────────────────────────────────────┤
│ Higher means more stock and a bigger     │
│ cash need before 4 Nov.                  │
├──────────────────────────────────────────┤
│ [ Reset to last year ]  [ Recalculate ]  │
└──────────────────────────────────────────┘
```

## 11. Evals

The forecast is statistical, so its evals are about accuracy, calibration, robustness and explainability. **On seeded data these prove the pipeline works, not real-world accuracy.** Real-data targets apply from the pilot.

| ID | Eval | Method | Pass (seeded, hackathon) | Pass (real data, pilot) |
|---|---|---|---|---|
| EV-01 | Normal-week accuracy | Hold out the last 4 normal weeks; forecast from the week before; weekly MAPE per outlet | ≤ 10% | ≤ 15% |
| EV-02 | Bias | Mean signed error over the holdout | within ±3% | within ±5% |
| EV-03 | Range calibration | Share of holdout days inside the 80% range | 70-90% | 70-90% |
| EV-04 | Festival week | Backtest a festival week using uplift from the previous year's same festival | n/a (only one Diwali seeded; reported, not gated) | weekly error ≤ 20% |
| EV-05 | Robustness | Inject 5 missing days, 2 zero days, 1 spike; re-run | No crash; EV-01 degrades by ≤ 2 pts | same |
| EV-06 | Cold start | Truncate an outlet to 3 weeks | Labelled "low history"; range ≥ ±25% | same |
| EV-07 | Explainability | For 20 random days, components sum to the point forecast | 20 of 20 | 20 of 20 |
| EV-08 | Determinism | Run twice | identical | identical |

The evals run in the safety test suite (PRD 11) and print per-outlet results on screen. Test 2 in the deck ("Forecast pipeline") is EV-01 plus EV-03.

## 12. Metrics (pilot)

Weekly MAPE per outlet; share of owners who override the uplift; gap-date accuracy (did the forecast gap happen within ±1 day).

## 13. Open questions

1. With real data, should the festival uplift blend last year with similar outlets nearby (consented, aggregated)? Decide after the pilot.
2. Do we need a separate model for wholesale-heavy outlets with lumpy orders?
