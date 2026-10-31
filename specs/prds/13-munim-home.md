# PRD-13 · Munim home

**Product:** PayTMunim · **Phase:** 1 · **AI:** No (shows outputs of 05, 18, 19; the Ask bar opens PRD 02)
**Depends on:** 05 Cash plan, 06 Capital, 18 Profit, 19 Shift check · **Feeds:** entry point to everything
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

The owner's daily screen. Today's Paytm collections by outlet, up to three alerts from the Munim ranked by urgency, the Capital card, items waiting for the owner, and the Ask bar. Readable in five seconds.

## 2. Problem

Owners don't open reports. They glance at their phone between customers. The three questions have to be answered on one screen, or not at all.

## 3. Users

Owner. (Staff have their own restricted home, PRD 20.)

## 4. Scope

**In:** today card; alerts (cash gap, shift pattern, outlet profit, data issues); waiting-for-you count; Capital card; Ask bar; synthetic ribbon in demo.
**Out:** charts beyond one sparkline; marketing banners; upsell on this screen (Capital stays free).

## 5. Alert ranking

| Priority | Alert | Source | Example |
|---|---|---|---|
| 1 | Waiting for you | PRD 09 | "2 items need you" |
| 2 | Cash gap within 14 days | PRD 05 | "Cash runs ₹1.8 lakh short on 5 Nov · See plan" |
| 3 | Shift pattern | PRD 19 | "Matunga, Thursday evenings: below expected 3 times in 4 weeks · Check" |
| 4 | Outlet losing money | PRD 18 | "October: Sion lost ₹6,200 · Why" |
| 5 | Data issue | PRD 15 | "Bank data last updated 27 Oct · Fix" |
| 6 | Possible gap (pessimistic plan) | PRD 05 | "Possible gap on 12 Nov" |

Show at most 3 alerts; the rest under "More alerts". Each alert has one action.

## 6. User journey

1. Owner opens the app at 7 pm. Sees today ₹10,140 on Paytm till 7 pm, split by outlet.
2. Reads the top alert: cash gap on 5 Nov → taps **See plan** (PRD 05).
3. Back on home, taps the Ask bar → types a question (PRD 02).
4. Next morning a new alert: Matunga Thursday pattern → **Check** (PRD 19).

## 7. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Home loads in under 1.5 s on a mid-range Android phone on 4G (cached last state shown instantly, then refreshed). |
| FR-02 | Today's figure is Paytm collections only and labelled "on Paytm"; outlet chips sum to the total. |
| FR-03 | Alerts are ranked by section 5 and deduplicated (one alert per gap, per pattern). |
| FR-04 | Dismissing an alert hides it for 24 h, except Waiting for you and gaps within 3 days. |
| FR-05 | The Capital card shows the number of pre-approved lines and the largest amount; never an interest-rate teaser; available to non-members. |
| FR-06 | Non-members see the cash plan alert and Capital; member-only alerts show as "Available with membership" once, not repeatedly. |
| FR-07 | All amounts follow PRD 12 formatting and language. |
| FR-08 | "SYNTHETIC DATA" ribbon in demo mode. |

## 8. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | No alerts | "All clear. Next big payment: Patel Traders ₹2.9 lakh on 31 Oct." |
| EC-02 | No consent yet | Card: "Connect your bank to see your cash plan" (PRD 15). |
| EC-03 | Devices unassigned | Banner to finish mapping (PRD 14). |
| EC-04 | Offline | Last-updated time; Ask bar disabled with "You're offline". |
| EC-05 | Single-outlet merchant | No outlet chips; profit and shift alerts hidden. |

## 9. Acceptance criteria

```gherkin
AC-01 Today card
  Given seeded collections on 30 Oct till 7 pm
  When the owner opens home
  Then it shows ₹10,140 on Paytm with Dadar ₹4,980, Matunga ₹3,120 and Sion ₹2,040

AC-02 Ranking
  Given a pending approval, a cash gap and a shift pattern
  When home loads
  Then they appear in that order and no more than 3 alerts show

AC-03 Capital stays free
  Given a merchant without a membership
  When home loads
  Then the Capital card shows their pre-approved lines with no prompt to buy

AC-04 All clear
  Given no alerts
  When home loads
  Then it shows the next big payment

AC-05 Speed
  Given a cached state
  When the owner opens home
  Then content shows in under 1.5 seconds
```

## 10. Textual wireframe: W1

```
┌──────────────────────────────────────────┐
│ [logo]  Sharma General Stores    (bell)  │
│ 3 outlets                  [SYNTHETIC]   │
├──────────────────────────────────────────┤
│ TODAY ON PAYTM (till 7 pm)     ₹10,140   │
│ Dadar ₹4,980 · Matunga ₹3,120 · Sion     │
│ ₹2,040                                   │
├──────────────────────────────────────────┤
│ ● 2 ITEMS NEED YOU               [Open]  │
├──────────────────────────────────────────┤
│ YOUR MUNIM                               │
│ ⚠ Cash runs ₹1.8 lakh short on 5 Nov     │
│   Diwali stock, rent       [See plan]    │
│ ⚠ Matunga, Thursday evenings: below      │
│   expected 3 times in 4 weeks  [Check]   │
│ ⓘ October: Sion lost ₹6,200; Dadar and   │
│   Matunga carry it               [Why]   │
├──────────────────────────────────────────┤
│ CAPITAL  3 pre-approved lines            │
│          up to ₹5 lakh           [Open]  │
├──────────────────────────────────────────┤
│ [ Ask your Munim, Hindi or English  ]    │
├──────────────────────────────────────────┤
│ Home   Outlets   Munim   Capital   More  │
└──────────────────────────────────────────┘
```

## 11. Metrics (pilot)

Daily opens per owner; alert tap-through by type; time from alert to action; dismiss rate (high = noisy alerts).

## 12. Open questions

1. Should the home figure include other QRs and cash once handovers exist (PRD 20)? Proposed: a second line "All channels (yesterday)".
