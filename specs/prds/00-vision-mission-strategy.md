# PayTMunim, with Intent Guard: vision, mission and strategy

**Owner:** Kamalika Poddar · **Status:** v1, for the mentor check-in · **Date:** 30 Oct 2026
**Track:** Paytm Build for India AI Hackathon, Mumbai · Track 1, Merchant Growth AI

All shops, people, lenders and numbers in this document are illustrative. All data in the build is synthetic and every payment is simulated.

---

## 1. Vision

**Every seth had a munim. Now every outlet gets one.**

An owner with two or more outlets should know three things every morning without asking anyone: which outlet makes money, when cash will run short, and what happened at shift change. When something has to be done about it, they should be able to hand over the legwork and keep the decision.

## 2. Mission

Give every Paytm merchant an AI munim inside the Paytm for Business app that:

1. **looks ahead**, not back: a cash plan, not another report;
2. **explains in the owner's language**, with the numbers behind every sentence;
3. **acts only inside rules the owner sets**, and asks before anything outside them;
4. **holds no money and decides no money**: rules in code and the owner decide; lenders pay suppliers; the owner repays lenders.

## 3. The problem

| Question the owner can't answer | Why it's hard with 2+ outlets | What it costs |
|---|---|---|
| Which outlet makes money? | One bank account, one GSTIN, three counters. Costs are shared. | The owner keeps a losing outlet open, or closes the wrong one. |
| When will cash run short? | Stock, salaries, rent, GST and supplier bills land on different days. | Found at the counter on the day. Credit at that point is slow or unavailable. |
| What happened at shift change? | Cash, stock and other QRs change hands twice a day with no record. | Leakage the owner sees at month end, if at all. |

**The scene we build around:** Sharma General Stores, three outlets in Mumbai (Dadar, Matunga, Sion), seven staff. On 30 Oct the owner, Rakesh Sharma, has ₹9.6 lakh of Diwali stock to buy by 4 Nov, salaries on 1 Nov, and rent and bonus on 5 Nov. His combined cash runs ₹1.84 lakh short on 5 Nov, three days before Lakshmi Puja. Today he finds out at the counter.

## 4. Who it's for

| Persona | Role in the product | What they need |
|---|---|---|
| **Owner** (Rakesh, 3 outlets) | Primary user, sole approver | A plan, not a dashboard. Control without being at every counter. |
| **Cashier** (one per counter) | Staff user, restricted view | Four actions and a quick shift close. No profit, no other outlets. |
| **Manager** | Staff user, wider limits | Refunds up to ₹5,000, the outlet's numbers. |
| **CA** (chartered accountant) | Receives the monthly pack | Books-ready data without rekeying from five sources. |
| **Lender** (partner bank or NBFC) | Underwrites on its own consented data | Pre-approved lines, a sized request, proof of where the money went. |
| **Paytm** | Platform | Merchant retention, membership revenue, lender-paid credit distribution. |

Built for owners of 2-5 outlets. Open to every Paytm merchant: a single shop starts with the cash plan and Capital tab, and the rest switches on when it opens outlet two.

## 5. Product principles

These are the rules every PRD is written against. A feature that breaks one does not ship.

1. **The AI interprets and explains. Code calculates and decides.** Every number on screen comes from a deterministic tool. The LLM writes words, not numbers.
2. **The owner keeps the decision.** Anything that moves money outside the owner's rules, or to someone new, comes back to the owner.
3. **The AI can stop an action, never approve one.** The AI intent check can only escalate.
4. **Paytm holds no money.** Lenders pay suppliers directly. Owners repay lenders directly.
5. **Exact or labelled.** Paytm collections are exact per outlet. Everything else carries an "estimate" label and a source.
6. **One consent per purpose.** The Munim's data consent and each lender's consent are separate and revocable in one tap.
7. **Patterns, never people.** Shift checks flag shifts, not staff names.
8. **Every action leaves evidence.** Who asked, what, which rules, the AI check, the approval, the time: hash-chained.
9. **Credit is free to the merchant.** Membership is never a condition for seeing an offer.
10. **Plain language.** Hindi, Hinglish or English, as the owner writes. Rupees in lakh and crore.

## 6. How the pieces fit together

```
                         ┌──────────────────────────────┐
  Owner question ───────▶│ 12 Language layer (Hi/En)    │
  (typed; voice stretch) └──────────────┬───────────────┘
                                        ▼
                         ┌──────────────────────────────┐
                         │ 02 Munim agent (LLM + tools) │  writes words, not numbers
                         └──┬──────┬──────┬──────┬──────┘
                 tool calls │      │      │      │
              ┌─────────────┘      │      │      └──────────────┐
              ▼                    ▼      ▼                     ▼
   ┌────────────────┐ ┌──────────────┐ ┌────────────────┐ ┌──────────────────┐
   │03 Sales        │ │04 Outflow    │ │05 Cash plan    │ │06 Capital tab    │
   │   forecast     │ │   detection  │ │   and options  │ │   offers         │
   └───────┬────────┘ └──────┬───────┘ └───────┬────────┘ └────────┬─────────┘
           └────────── reads ┴──── 01 Seeded data and ingestion ────┘
                                        │
                     owner picks an action (drawdown, payment, refund)
                                        ▼
         ┌───────────────────── INTENT GUARD ─────────────────────┐
         │ 07 Rules as code ─▶ 08 AI intent check ─▶ 09 Owner PIN │
         │   (block / pass)     (escalate only)      (decides)    │
         └───────────────────────────┬────────────────────────────┘
                                     ▼
                         ┌──────────────────────────────┐
                         │ 10 Evidence log (hash chain) │
                         └──────────────────────────────┘
   11 Safety test suite runs against 02-10 on every build. Results on screen.
   16 Owner rules set-up feeds 07. 15 Consents gate 01 and 06. 17 Cost rules feed 05 and 18.
```

**One loop, end to end (the demo):** question → forecast → outflows → cash plan with a gap → three options → offers → guard → owner confirms → simulated drawdown → logged.

## 7. Strategy: what we build, in what order, and why

The order follows dependencies and risk. Each phase has a gate: the next phase starts only when the gate holds.

### Phase 0 · The hackathon build (31 Oct, 8 hours, solo)

**Goal:** prove one narrow journey works, end to end, on seeded data.

| Order | PRD | Why this order |
|---|---|---|
| 1 | 01 Seeded data and ingestion | Everything reads from it. |
| 2 | 03 Sales forecast | The cash plan needs inflows. |
| 3 | 04 Outflow detection | The cash plan needs outflows. |
| 4 | 05 Cash plan and options | The core output: the gap and three options. |
| 5 | 02 Munim agent | Wraps 03-05 and 06 as tools; needs them to exist first. |
| 6 | 12 Language layer | Hindi and Hinglish in, Hindi or English out. Typed only. |
| 7 | 06 Capital tab offers | Simulated lenders; the drawdown option needs offers. |
| 8 | 16 Owner rules set-up (seeded) | The guard needs a mandate to check against. |
| 9 | 07 Intent Guard rules | Deterministic checks first: the safety floor. |
| 10 | 08 AI intent check | Added on top of the rules; can only escalate. |
| 11 | 09 Owner confirmation | The PIN step. |
| 12 | 10 Evidence log | Records every guard decision. |
| 13 | 11 Safety test suite | Runs the acceptance tests and red-team cases on screen. |

**Built / seeded / simulated / not in the build**

| Built (real code) | Seeded | Simulated | Not in the build |
|---|---|---|---|
| Forecast, outflow detection, cash plan | 3 outlets, 18 months of collections incl. last Diwali | Every payment and drawdown | Live lending, UPI AutoPay |
| Munim agent with tools | Bank and GST feeds (AA JSON) | Owner PIN | Voice, shelf photos |
| Intent Guard rules, AI check, log | Lender offers (3 lenders) | Lender disbursal | Billing, shift check, profit per outlet |
| Acceptance and red-team suite | Owner's rules and costs | | Paytm or AA sandbox (stretch, only if access works) |
| 4 screens on phone and web | Festival uplift | | |

**Solo plan (hours):** 0-1 data · 1-2.5 forecast and cash plan · 2.5-3.5 agent and tools · 3.5-5 guard and tests · 5-7 screens · 7-8 run tests, rehearse.

**Gate to Phase 1:** every row of the acceptance suite passes on seeded data.

### Phase 1 · Set-up flows (makes it usable by a real owner)

| Order | PRD | Why |
|---|---|---|
| 1 | 14 Outlet mapping | Per-outlet anything needs QRs and devices tagged to outlets. |
| 2 | 15 Data consent | Real bank and GST data needs Consent 1; lenders need Consent 2. |
| 3 | 16 Owner rules set-up (full UI) | The owner writes the mandate themselves. |
| 4 | 17 Cost rules | The cash plan and profit need confirmed costs. |
| 5 | 13 Munim home | The daily entry point, once there's real data behind it. |

**Gate to Phase 2:** a pilot owner sets up in about 20 minutes without help; the forecast error on real data is measured and acceptable (target set in PRD 03).

### Phase 2 · The rest of the product

| Order | PRD | Why |
|---|---|---|
| 1 | 24 Membership and billing | Needed before anyone pays. |
| 2 | 18 Profit per outlet | Answers question one; reuses 04 and 17. |
| 3 | 20 Cashier view and shift close | Shift data has to exist before a shift check. |
| 4 | 19 Shift check | Answers question three; reuses the forecast engine. |
| 5 | 23 CA pack | Low risk, priced add-on. |
| 6 | 21 Soundbox voice close and expenses | Voice once the typed flows are proven. |
| 7 | 22 Shelf photo check | Highest privacy and accuracy risk; last. |

**Gate to scale:** in the pilot, at least 7% of 2-5 outlet businesses reached are paying after two quarters, net gain at least ₹1,000 per outlet a month against matched outlets, at most 1 in 5 shift flags dismissed as false alarms, and drawdown overdues no worse than partners' own merchant books.

### Phase 3 · Roadmap (no PRD yet)

- **Restock as a Munim skill:** orders to the shop's own suppliers, inside the same mandate. The GMV step.
- **Agentic commerce:** a supplier's ordering agent sends an order; Intent Guard checks it against the mandate and pays within limits. Then customers' AI agents paying the shop.

### Dependency map

| PRD | Depends on | Feeds |
|---|---|---|
| 01 Seeded data | none | 03, 04, 05, 06, 18, 19 |
| 02 Munim agent | 03, 04, 05, 06, 12 | 07 (actions), 13 |
| 03 Sales forecast | 01 | 05, 19 |
| 04 Outflow detection | 01 | 05, 17, 18 |
| 05 Cash plan | 03, 04, 17 | 02, 06, 13 |
| 06 Capital tab | 01, 05, 15 | 07 |
| 07 Guard rules | 16 | 08, 09, 10 |
| 08 AI intent check | 07, 02 | 09, 10 |
| 09 Owner confirmation | 07, 08 | 10 |
| 10 Evidence log | 07, 08, 09 | 23, lenders |
| 11 Safety tests | 02-10 | release gate |
| 12 Language layer | none | 02, 21 |
| 13 Munim home | 05, 18, 19 | entry point |
| 14 Outlet mapping | none | 01, 18, 19, 20 |
| 15 Data consent | none | 01, 06 |
| 16 Owner rules | 14 | 07, 20 |
| 17 Cost rules | 04 | 05, 18 |
| 18 Profit per outlet | 04, 14, 17 | 13, 23 |
| 19 Shift check | 03, 20 | 13 |
| 20 Cashier view | 14, 16 | 19, 21 |
| 21 Soundbox voice | 12, 20 | 19 |
| 22 Shelf photos | 20 | 19 |
| 23 CA pack | 01, 18 | CA |
| 24 Billing | none | revenue |

## 8. How we measure it

**North Star:** the merchant's net gain per paying outlet per month (leakage recovered + extra margin − fees). Base-case estimate ₹2,271 for a 2-5 outlet member with the shift-check pass. A team estimate; the pilot measures it.

**Paytm co-metric:** contribution per member outlet per month (₹189 base case, Q3 FY29).

**Guardrails:** drawdown repayment (partners' 30+ days overdue), consent revocations, false alarms on shift checks, billing complaints, guard false blocks on valid actions.

**Hackathon success:** every acceptance test passes live; the AI's answer matches the tool numbers; the guard blocks the injected invoice and allows the valid drawdown only after confirmation.

## 9. Business model, in one paragraph

A clubhouse: an annual membership of ₹2,388 per business (₹199 a month, first 5 outlets included), plus usage: ₹49-99 per extra outlet, a ₹99 shift-check pass per outlet, a ₹99 CA pack. The Capital tab is free to every merchant; lenders pay Paytm. Base case over 8 quarters: ₹133.7 cr revenue, ₹79.0 cr contribution (59% margin, before fixed costs), ₹2,382 cr new GMV. All team estimates in AI_Munim_Projection.xlsx.

## 10. Non-goals

- Paytm does not lend, hold, pool or route money.
- The AI does not approve payments, change rules, or pick a lender for the owner.
- No staff surveillance by name. No faces in photos.
- No selling or sharing merchant data beyond the consented purpose.
- No GST filing (compliance, not growth). The CA pack prepares data; the CA files.
- Staff roles, outlet view and reconciliation already exist in Paytm and competitors' portals. We reuse them; we don't pitch them.

## 11. Risks and open questions

| Risk | How the design handles it | Owner of the answer |
|---|---|---|
| Single shops won't pay | Assume 1 in 100; reach in-app at no field cost; gate at 0.5% | Pilot |
| Forecast wrong on real data | Ranges not points; labelled estimates; backtest on real data before launch | PRD 03 |
| LLM states a wrong number | Numbers only from tools; answer checked against tool outputs | PRD 02, 11 |
| Prompt injection via invoices or messages | Content is data, never instructions; guard reads structured fields only | PRD 07, 08 |
| Shift checks feel like surveillance | Patterns by shift; owner-only; faces blurred; staff told at onboarding | PRD 19, 22 |
| Fee fatigue | Own bill line, reminder before every charge, 12-month lock, one-tap cancel | PRD 24 |
| Credit risk | Lenders underwrite on their own consent; owner's credit cap; overdues are a gate | PRD 06, 07 |
| DPDP duties from 13 May 2027 | Purpose-specific consent, one-tap revoke, no marketing use | PRD 15 |

**Open questions for Paytm:** count of businesses by number of outlets; Paytm Payments Services as the Account Aggregator data receiver; lending partners' take rates and loss-sharing terms; AA fetch pricing.

## 12. Mentor check-in: the talk track

**30 seconds.** "Owners with two or more outlets can't see which outlet makes money, when cash runs short, or what happened at shift change. PayTMunim is an AI munim in the Paytm for Business app. It plans cash, explains it in Hindi, lines up credit before the gap, and moves money only inside the owner's rules. Today I'm building one loop: a Diwali cash question to a guarded, simulated drawdown."

**2 minutes.** Walk the diagram in section 6, top to bottom. Then show the build table in section 7. End on the acceptance suite.

**Questions to expect**

| Question | Answer |
|---|---|
| What does the AI do that a dashboard and a rules engine can't? | It turns a question in Hindi into a plan: picks the tools, ties the forecast, outflows and offers together, and explains the gap and the trade-offs. The rules engine then decides whether money moves. |
| Why should we trust its numbers? | It doesn't produce numbers. Tools do. Test 3 checks every rupee in the answer against a tool result. |
| What if someone tricks it? | The guard reads structured fields, not text. The injected invoice test escalates. The AI check can only escalate. |
| Isn't this a lending product? | Credit is one tab, free to the merchant, paid by lenders, under half of revenue by design. Paytm never holds the money. |
| Why will an owner pay? | Base-case estimate: ₹2,450 back for ₹179 of fees. ₹1,750 of that needs the shift check, which is out of today's build. The pilot measures it. |
| How do you see per-outlet profit with one bank account? | Paytm collections are exact per outlet. Everything else is labelled an estimate. |
| What's real today? | Forecast, cash plan, agent, guard, log and tests are real code. Data is seeded. Payments are simulated. |

## 13. PRD index

| # | PRD | Phase | AI | Status |
|---|---|---|---|---|
| 01 | Seeded data and ingestion | 0 | No | To write |
| 02 | Munim agent | 0 | Yes | To write |
| 03 | Sales forecast | 0 | Yes (statistical) | To write |
| 04 | Outflow detection | 0 | Yes | To write |
| 05 | Cash plan and options | 0 | No | To write |
| 06 | Capital tab offers | 0 | No | To write |
| 07 | Intent Guard rules | 0 | No | To write |
| 08 | AI intent check | 0 | Yes | To write |
| 09 | Owner confirmation | 0 | No | To write |
| 10 | Evidence log | 0 | No | To write |
| 11 | Safety test suite | 0 | Eval infra | To write |
| 12 | Language layer (Hindi) | 0 | Yes | To write |
| 13 | Munim home | 1 | No | To write |
| 14 | Outlet mapping | 1 | No | To write |
| 15 | Data consent | 1 | No | To write |
| 16 | Owner rules set-up | 0 (seeded), 1 (UI) | Partly | To write |
| 17 | Cost rules | 1 | Uses 04 | To write |
| 18 | Profit per outlet | 2 | Yes | To write |
| 19 | Shift check | 2 | Yes | To write |
| 20 | Cashier view and shift close | 2 | No | To write |
| 21 | Soundbox voice close and expenses | 2 | Yes | To write |
| 22 | Shelf photo check | 2 | Yes | To write |
| 23 | CA pack | 2 | No | To write |
| 24 | Membership and billing | 2 | No | To write |

**Writing order:** 01, 03, 04, 05, 02, 12, 06, 16, 07, 08, 09, 10, 11, then 14, 15, 17, 13, then 24, 18, 20, 19, 23, 21, 22. Same as the build order.

## 14. Conventions every PRD follows

- **Sections:** summary · problem · users · scope and non-goals · user journey · functional requirements (FR-xx) · edge cases (EC-xx) · acceptance criteria in given-when-then (AC-xx) · textual wireframes for user-facing flows · data and interfaces · evals (AI features only) · metrics · dependencies · open questions.
- **IDs:** `PRD-07 FR-03` is unique across the set, so tests and code can cite it.
- **Numbers:** illustrative, from the Sharma General Stores scene, and consistent across PRDs.
- **Credit cap:** all EMIs ≤ 8% of average monthly collections (₹1.52 lakh a month for Sharma).
- **Owner's default mandate (seeded):** cashier payments, check, refund up to ₹500, close shift, ₹2,000 a day; manager refunds up to ₹5,000; always ask the owner for a new payee, a changed bank account, a drawdown above ₹50,000, a refund above ₹5,000, and any rule change.

## 15. Glossary

| Term | Meaning |
|---|---|
| Munim | A traditional accountant who kept a seth's books |
| Cash plan | Day-by-day forecast of combined cash and bank balance for 90 days |
| Gap | A day the cash plan goes below zero |
| Capital tab | Pre-approved credit offers from lenders, shown at a gap |
| Mandate | The owner's rules: who can do what, up to how much, to whom |
| Intent Guard | Rules as code, then an AI check that can only escalate, then the owner, then the log |
| Evidence pack | Hash-chained record of an action, shareable with a lender or the CA |
| AA | Account Aggregator: RBI-regulated, consent-based data sharing |
| FIU | Financial Information User: the party receiving AA data |
| KFS | Key Fact Statement a lender must show for every loan offer |
| Drawdown | Using part of a pre-approved credit line |
