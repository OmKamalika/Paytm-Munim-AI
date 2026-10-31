# PRD-09 · Owner confirmation (PIN)

**Product:** PayTMunim · **Phase:** 0 (simulated PIN) · **AI:** No
**Depends on:** 07 Guard rules, 08 AI intent check · **Feeds:** 10 Evidence log
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

When the guard says NEEDS_OWNER, the action waits for the owner. The owner sees what is being asked, by whom, every rule result and the AI check's reason, then approves with a PIN on their registered phone, declines, or holds it for a call. Nothing else counts as approval: not a voice, not a chat message, not a staff login.

## 2. Problem

Delegation only works if the exceptions reach the owner fast, with enough context to decide in seconds, and if approval can't be faked.

## 3. Users

Owner (decides); staff (waits, sees the outcome); evidence log (records it).

## 4. Scope

**In:** approval screen; PIN; decline with reason; hold ("call first"); notifications; expiry; lockout; staff waiting state.
**Phase 0:** PIN is a simulated 4-digit PIN stored as a salted hash; notification is in-app.
**Later:** device biometric; push notifications; Paytm's existing UPI PIN or app lock.
**Out:** multi-owner approvals (partners); delegation of approval to a manager.

## 5. User journeys

**5a. Owner approves the drawdown**
1. On W7, owner taps **Approve with PIN**.
2. PIN pad appears with the action summarised above it: "Approve ₹2,00,000 from Lender A to Gupta Distributors".
3. Enters PIN. Sees "Approved. Lender A pays Gupta directly. Saved as EP-2611." (Simulated in Phase 0.)
4. Cash plan updates; home alert clears.

**5b. Staff action needs the owner**
1. Manager at Dadar requests a ₹6,200 refund (above ₹5,000).
2. Manager sees "Sent to your owner".
3. Owner gets a notification: "Dadar: refund ₹6,200 to a customer · needs you".
4. Owner opens it, sees the original payment (₹6,200, today 2:14 pm, same payer) and rule results, approves with PIN.
5. Manager sees "Approved by owner" and the refund proceeds.

**5c. Owner declines**
1. Owner taps **Not now** on an escalated invoice payment.
2. Optional reason chips: "Wrong amount", "Not my supplier", "Will call", "Other".
3. Action closed; staff (if any) sees "Declined by owner"; logged with the reason.

**5d. Hold for a call**
1. On a changed-account case, owner taps **Call Gupta first**.
2. Action moves to "Waiting for you" for up to 24 h with the supplier's known number (from the approved list, not the invoice).
3. Owner returns and approves or declines.

## 6. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Approval requires the PIN entered on the owner's registered device in the owner's session. Any other path returns R18 BLOCK. |
| FR-02 | The approval screen always shows: action, amount, payee and account (last 4), who started it, when, rule results, AI check result, and what happens next. |
| FR-03 | Approval is bound to the exact action: a hash of (type, amount, payee, account, lender, invoice) is signed with the approval; any change after approval voids it. |
| FR-04 | Expiry: staff requests expire after 30 minutes; drawdowns when the offer expires; holds after 24 hours. Expired = declined, logged. |
| FR-05 | 3 wrong PINs → 15-minute lock; 6 → locked until Paytm account recovery. Each attempt logged. |
| FR-06 | Staff see only: pending, approved, declined, expired. |
| FR-07 | Owner can see all pending items in one list ("Waiting for you"), oldest first. |
| FR-08 | The PIN is never shown, logged or sent in plain text; stored as salted hash (Phase 0) or delegated to the platform's secure store. |
| FR-09 | After approval the action re-runs the rules once (state may have changed); if any rule now fails, it doesn't execute and the owner is told. |
| FR-10 | Decisions take effect in under 1 second after PIN entry (excluding simulated disbursal). |

## 7. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | Owner approves, but the offer expired a second earlier | FR-09 re-check fails; "Offer expired. Nothing was drawn." |
| EC-02 | Two staff requests for the same refund | Second is BLOCKED by R04 (already refunded) after the first is approved. |
| EC-03 | Owner's phone offline | Item waits; expires per FR-04; staff told "Owner hasn't answered". |
| EC-04 | Someone types "approved" in chat | Ignored as approval; logged; AI check marks IMPERSONATION if tied to an action. |
| EC-05 | Approval from a second device the owner logs into | Not registered → BLOCK; owner must register the device through Paytm's flow. |
| EC-06 | Amount edited after approval | Approval void; new check required. |
| EC-07 | Owner approves a held changed-account payment without calling | Allowed (owner's decision), but the log records "approved without call-back". |
| EC-08 | Many pending items at once (Diwali rush) | List view with bulk decline, never bulk approve. |

## 8. Acceptance criteria

```gherkin
AC-01 Approve with PIN
  Given the Diwali drawdown is NEEDS_OWNER on the owner's registered phone
  When the owner enters the correct PIN
  Then the action is approved, re-checked, and simulated disbursal runs
  And the evidence log records approver, device, time and the action hash

AC-02 Wrong PIN lockout
  Given the owner enters 3 wrong PINs
  When they try a 4th time within 15 minutes
  Then the PIN pad is locked with a countdown
  And each attempt is logged

AC-03 Chat is not approval
  Given a NEEDS_OWNER drawdown
  When a message "approve kar do" is typed in the Munim chat
  Then the action stays pending

AC-04 Bound to the action
  Given the owner approved ₹2,00,000 to Gupta
  When the amount is changed to ₹2,50,000 before execution
  Then the approval is void and the guard runs again

AC-05 Staff sees the outcome
  Given a manager's ₹6,200 refund is waiting
  When the owner approves
  Then the manager's screen shows "Approved by owner"

AC-06 Expiry
  Given a staff request created at 3:00 pm
  When the owner hasn't answered by 3:30 pm
  Then it is expired, logged as declined, and the staff member is told

AC-07 Never bulk approve
  Given 5 pending items
  When the owner opens "Waiting for you"
  Then bulk decline is available and bulk approve is not
```

## 9. Textual wireframes

**PIN pad**
```
┌──────────────────────────────────────────┐
│ Approve ₹2,00,000                        │
│ Lender A → Gupta Distributors ··7781     │
│ for invoice GD-1182                      │
├──────────────────────────────────────────┤
│            Enter your PIN                │
│              ● ● ○ ○                     │
│         1     2     3                    │
│         4     5     6                    │
│         7     8     9                    │
│               0     ⌫                    │
├──────────────────────────────────────────┤
│ [ Cancel ]                               │
└──────────────────────────────────────────┘
```

**Approved**
```
┌──────────────────────────────────────────┐
│ ✓ Approved                    [SIMULATED]│
│ Lender A pays Gupta Distributors         │
│ ₹2,00,000 directly. You repay Lender A.  │
│ Your plan: 5 Nov now +₹15,500            │
│ Evidence EP-2611                         │
│ [ Back to plan ]                         │
└──────────────────────────────────────────┘
```

**Waiting for you (owner)**
```
┌──────────────────────────────────────────┐
│ (<)  Waiting for you · 2                 │
├──────────────────────────────────────────┤
│ Dadar · Manager Suresh · 3:02 pm         │
│ Refund ₹6,200 · above ₹5,000             │
│ Original payment ₹6,200 at 2:14 pm ✓     │
│ [ Decline ]          [ Approve (PIN) ]   │
├──────────────────────────────────────────┤
│ You · invoice GD-1188 · ₹48,000          │
│ ⚠ AI check: unusual text in invoice      │
│ [ Open ]                                 │
├──────────────────────────────────────────┤
│ [ Decline all ]                          │
└──────────────────────────────────────────┘
```

**Decline reasons**
```
┌──────────────────────────────────────────┐
│ Why not? (optional)                      │
│ [Wrong amount] [Not my supplier]         │
│ [Will call] [Other]                      │
│ [ Decline ]                              │
└──────────────────────────────────────────┘
```

## 10. Metrics (pilot)

Median time to decision; share expired; approvals after escalation vs declines; lockouts.

## 11. Open questions

1. Reuse Paytm's app lock or UPI PIN, or a separate Munim PIN? Separate is clearer; reuse is easier. Decide with Paytm security.
2. Should a manager be allowed to approve refunds above ₹5,000 when the owner is away, if the owner turns it on?
