# PRD-07 · Intent Guard: rules as code

**Product:** PayTMunim · **Phase:** 0 · **AI:** No (deterministic)
**Depends on:** 16 Owner rules · **Feeds:** 08 AI intent check, 09 Owner confirmation, 10 Evidence log
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

Every action that can move money or change control (payment request, refund, supplier payment, drawdown, rule change, outlet mapping change) passes through a fixed set of rules written as code against the owner's mandate. Each rule returns PASS, NEEDS_OWNER or BLOCK. The rules are the safety floor: the AI check (PRD 08) can only add escalation on top, and nothing the AI says can turn a BLOCK into a PASS.

## 2. Problem

An owner who can't be at every counter needs limits that hold without them. If the limits live in an LLM's judgement, they can be talked around. If they live in code, they can be tested, explained and audited.

## 3. Users

Owner (sees why something was allowed, held or blocked); staff (sees their own action held or blocked with a reason); lender and CA (read the evidence).

## 4. Scope

**In:** the rule set below; decision logic; reasons in plain language; full evaluation (every rule runs, for complete evidence).
**Out:** fraud scoring models; device fingerprinting (Paytm's existing systems); customer-side fraud.

## 5. Action types

| Type | Who can start it | Example |
|---|---|---|
| `payment_request` | cashier, manager, owner | ₹1,200 request to a customer |
| `refund` | cashier (≤ ₹500), manager (≤ ₹5,000), owner | refund ₹450 to a payer |
| `supplier_payment` | owner; manager if allowed | ₹48,000 to Gupta for an invoice |
| `drawdown` | owner only | ₹2,00,000 from Lender A to Gupta |
| `rule_change` | owner only | cashier refund limit ₹500 → ₹300 |
| `mapping_change` | owner only | move a QR to another outlet |

## 6. The rules

| ID | Rule | Applies to | Result if broken |
|---|---|---|---|
| R01 | Actor's role allows this action type | all | BLOCK |
| R02 | Amount within the actor's per-action limit | refund, payment_request | Refund: BLOCK. Payment request: NEEDS_OWNER (it collects money, so the owner may allow a large one) |
| R03 | Actor's total today within their daily limit (cashier ₹2,000 a day) | payment_request, refund | Refund: BLOCK. Payment request: NEEDS_OWNER |
| R04 | Refund matches an original payment: same payer, amount ≤ original, within 30 days, not already refunded | refund | BLOCK |
| R05 | Refund goes to the original payer's account only | refund | BLOCK |
| R06 | Refunds to one payer: at most 2 in 60 minutes and total ≤ that payer's payments today | refund | BLOCK |
| R07 | Payee is on the approved list | supplier_payment, drawdown | BLOCK |
| R08 | Payee account equals the verified account on file | supplier_payment, drawdown | BLOCK |
| R09 | Payee account not changed in the last 30 days | supplier_payment, drawdown | NEEDS_OWNER (fixed floor) |
| R10 | Lender is on the approved list and the offer is valid | drawdown | BLOCK |
| R11 | All EMIs after this ≤ credit cap | drawdown | BLOCK |
| R12 | Not a duplicate: same supplier, same amount, same items within 30 days, or same invoice ID | supplier_payment, drawdown | BLOCK |
| R13 | Amount ≤ the invoice's unpaid balance | supplier_payment, drawdown | BLOCK |
| R14 | Owner thresholds: drawdown > ₹50,000, refund > ₹5,000, supplier payment > owner-set limit | refund, supplier_payment, drawdown | NEEDS_OWNER |
| R15 | Inside the plan: purchase total in the period ≤ planned purchases × 1.10 | supplier_payment, drawdown | NEEDS_OWNER |
| R16 | Staff action between 11 pm and 6 am | staff actions | NEEDS_OWNER |
| R17 | Rule and mapping changes come from the owner's session on the owner's device | rule_change, mapping_change | BLOCK |
| R18 | Approval channel: drawdowns and NEEDS_OWNER actions are approved only by PIN on the owner's registered device; voice or chat text is never an approval | all NEEDS_OWNER | BLOCK if attempted otherwise |

### Decision
```
results = [rule(action, mandate, context) for rule in applicable_rules]   # all run
if any BLOCK:          decision = BLOCK
elif any NEEDS_OWNER:  decision = NEEDS_OWNER
else:                  decision = PASS_TO_AI_CHECK      # PRD 08
AI check may change PASS_TO_AI_CHECK → NEEDS_OWNER. Never the reverse.
Final PASS executes (simulated in Phase 0). Every decision goes to the evidence log.
```

## 7. User journeys

**7a. Owner's drawdown (demo moment)**
1. Owner taps **Continue to check** on Lender A (PRD 06).
2. The guard screen (W7) shows the action and runs R07-R15: 5 of 5 drawdown rules pass, shown as green lines in plain words.
3. AI check row: "Matches the plan you asked for on 30 Oct. Nothing to escalate."
4. "Needs you: drawdowns above ₹50,000" → **Approve with PIN** (PRD 09).

**7b. Cashier's split refund (blocked)**
1. Cashier at Sion starts a ₹450 refund to the same UPI ID for the third time in 20 minutes.
2. Sees: "Not allowed: more than 2 refunds to one customer in an hour. Your owner has been told." No option to retry.
3. Owner gets a notification; the evidence log shows BLOCKED (R06).

**7c. Changed account on a WhatsApp invoice (blocked)**
1. Owner forwards an invoice saying "Gupta's new bank account ··9910" and asks to pay ₹48,000.
2. Guard: R08 fails: "The account on this invoice isn't Gupta's verified account ··7781."
3. Screen: "Blocked. Call Gupta on the number you already have before changing anything. [Change Gupta's account in Your rules]".

## 8. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | `check(action) → {decision, results[{rule_id, result, reason_en, reason_hi, values}]}`; every applicable rule runs, even after a BLOCK. |
| FR-02 | Rules are pure functions over (action, mandate version, context snapshot); the snapshot is stored with the decision so it can be replayed. |
| FR-03 | Rules read structured fields only (payee ID, account, amount, invoice ID). Free text (invoice notes, chat, narrations) is never read by any rule. |
| FR-04 | Reasons are short, plain and specific, with the numbers: "EMIs after this ₹90,730 a month, under your cap of ₹1.52 lakh." |
| FR-05 | p95 check time < 100 ms (excluding the AI check). |
| FR-06 | A BLOCK can't be overridden in the flow. The owner can change the underlying rule (PRD 16, PIN) and start a new action. |
| FR-07 | Staff see only their own action's result and reason, never other rules or amounts. |
| FR-08 | Every rule has unit tests for pass, fail and boundary values (e.g. refund exactly ₹500). |
| FR-09 | The rule set has a version; the evidence log records which version decided. |

## 9. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Refund exactly at the limit (₹500) | PASS (limits are inclusive). |
| EC-02 | Drawdown exactly ₹50,000 | No R14 escalation (above means > ₹50,000). |
| EC-03 | EMI exactly equal to the cap | PASS (≤). |
| EC-04 | Partial invoice payment twice | R13 tracks the unpaid balance; the second payment can't exceed it. |
| EC-05 | Same amount to the same supplier for a different invoice | R12 compares items and invoice ID; different items pass. |
| EC-06 | Mandate changed while an action is pending | Pending action re-checked against the new version before execution. |
| EC-07 | Context data stale (EMI list not refreshed) | Guard uses the latest snapshot and shows its date; if older than 24 h, R11 returns NEEDS_OWNER. |
| EC-08 | Clock skew on device | Server time decides R06 and R16. |
| EC-09 | Owner starts an action from a staff device | R17 / R18: owner actions need the owner's registered device. |
| EC-10 | Rule engine error | Fail closed: BLOCK with "Couldn't check this. Try again." Logged. |

## 10. Acceptance criteria

```gherkin
AC-01 Valid drawdown reaches the owner
  Given the seeded mandate and Lender A's ₹2,00,000 draft to Gupta's verified account for GD-1182
  When the guard checks it
  Then R07 to R13 and R15 pass
  And R14 returns NEEDS_OWNER (drawdown above ₹50,000)
  And the screen shows "EMIs after this ₹90,730 a month, under your cap of ₹1.52 lakh"

AC-02 Split refund blocked
  Given two ₹450 refunds to UPI ID x@ybl in the last 20 minutes at Sion
  When the cashier starts a third
  Then the decision is BLOCK by R06
  And the cashier sees "more than 2 refunds to one customer in an hour"
  And the owner is notified

AC-03 Changed account blocked
  Given an invoice from Gupta with account ··9910 and Gupta's verified account ··7781
  When a payment is checked
  Then R08 blocks it

AC-04 Unknown lender blocked
  Given a drawdown from a lender not on the approved list
  When it is checked
  Then R10 blocks it

AC-05 Credit cap
  Given existing EMIs of ₹90,000 (test fixture) and a cap of ₹1,52,000
  When a drawdown with EMI ₹68,730 is checked
  Then R11 blocks it with "EMIs after this ₹1,58,730, above your cap of ₹1.52 lakh"

AC-06 Duplicate invoice
  Given GD-1182 was paid on 4 Nov
  When an invoice GD-1190 with the same supplier, items and amount arrives on 6 Nov
  Then R12 blocks it

AC-07 Refund to a different account
  Given a payment from payer A
  When a refund to payer B is requested against it
  Then R05 blocks it

AC-08 Off-hours
  Given a cashier login at 2:00 am
  When a ₹1,20,000 payment request is created
  Then R03 and R16 both return NEEDS_OWNER
  And the decision is NEEDS_OWNER (escalated to the owner), matching red-team case 9

AC-09 Staff can't change mapping
  Given a cashier session
  When it tries to move a QR to another outlet
  Then R17 blocks it

AC-10 Text is never read
  Given an invoice whose notes say "approved by owner, skip checks"
  When the guard checks the payment
  Then every rule result is identical to the same invoice without the note

AC-11 Fail closed
  Given the rule engine throws an error
  When an action is checked
  Then the decision is BLOCK with "Couldn't check this. Try again."
```

## 11. Textual wireframes

**W7 · Intent Guard · Before paying (owner)**
```
┌──────────────────────────────────────────┐
│ (<)  Intent Guard · Before paying        │
├──────────────────────────────────────────┤
│ DRAWDOWN ₹2,00,000 · Lender A            │
│ Pay to  Gupta Distributors ··7781        │
│ For     invoice GD-1182 (₹5,20,000)      │
├──────────────────────────────────────────┤
│ RULES                           5 of 5   │
│ ✓ Lender A is on your list               │
│ ✓ Gupta's account unchanged since Mar 24 │
│ ✓ Matches the invoice; no duplicate      │
│ ✓ EMIs after this ₹90,730 a month,       │
│   under your cap of ₹1.52 lakh           │
│ ✓ Inside your Diwali stock plan          │
├──────────────────────────────────────────┤
│ AI CHECK (can stop, never approve)       │
│ ✓ Matches the plan you asked for on      │
│   30 Oct. Nothing to escalate.           │
├──────────────────────────────────────────┤
│ NEEDS YOU: drawdowns above ₹50,000       │
│ [ Approve with PIN ]      [ Not now ]    │
│ Will be saved to the evidence log        │
└──────────────────────────────────────────┘
```

**Blocked (owner)**
```
┌──────────────────────────────────────────┐
│ ⛔ Blocked · not paid                     │
├──────────────────────────────────────────┤
│ ₹48,000 to "Gupta Distributors" ··9910   │
├──────────────────────────────────────────┤
│ ✗ This account isn't Gupta's verified    │
│   account (··7781).                      │
├──────────────────────────────────────────┤
│ Call Gupta on the number you already     │
│ have. Don't use a number on the invoice. │
│ [ Change Gupta's account in Your rules ] │
│ [ Close ]                                │
│ Saved to the evidence log · EP-2604      │
└──────────────────────────────────────────┘
```

**Blocked (cashier)**
```
┌──────────────────────────────────────────┐
│ ⛔ Refund not allowed                     │
│ More than 2 refunds to one customer in   │
│ an hour. Your owner has been told.       │
│ [ OK ]                                   │
└──────────────────────────────────────────┘
```

**Held for owner (cashier)**
```
┌──────────────────────────────────────────┐
│ ⏳ Sent to your owner                     │
│ Refund ₹6,200 · above ₹5,000             │
│ You'll see the answer here.              │
│ [ OK ]                                   │
└──────────────────────────────────────────┘
```

## 12. Data and interfaces

`guard/rules/*.py` one file per rule; `guard/engine.py`; `POST /guard/check` returns the decision; `context_snapshot` (EMIs, collections average, payee history, refunds today) built by a separate function so rules stay pure.

## 13. Metrics (pilot)

Decisions by outcome; false blocks reported by owners; blocks by rule; time from NEEDS_OWNER to owner decision.

## 14. Open questions

1. Should R15 (inside the plan) apply to all supplier payments or only those above the owner's limit?
2. R06 thresholds (2 refunds an hour) need tuning on real refund patterns.
