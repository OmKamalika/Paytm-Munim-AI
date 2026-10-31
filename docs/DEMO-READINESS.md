# PayTMunim demo readiness (M4)

## Before you present

1. From a clean clone: `npm ci`, then `npm run configure:pin` (type the PIN privately; never put it in a script or chat).
2. `npm run build`, then `npm run start` (set `HOST=0.0.0.0` to reach it from the phone on the same network; use HTTPS to install it).
3. On the phone, open the merchant app (installed PWA or browser). On a laptop, open `/simulator` (operator) and `/riskops`.
4. Start from a fresh server: restarting resets every task, approval, ledger effect and journal entry. Open pages say the server restarted.

## Eight-minute script

1. **The problem (Home → Plan).** Projected low **−₹2,68,279 on 5 Nov**, back above zero on 8 Nov. Collections are each outlet's forecast; bills are the listed payables plus recurring EMI and utilities. Munim's calculated recommendation: ask Gupta first (₹0), then a ₹50,000 top-up drawdown. A drawdown alone would need ₹2,70,000, above the owner's cap.
2. **Hard stop.** Supplier terms → *Start the tracked Gupta negotiation*. Operator: *Changed payee and account*. The task is blocked; there is nothing to approve.
3. **Evidence hold.** Supplier terms → *Start from the header-only GD-1182 photo*. Operator: *Header-only photo*. Paused: no payment without the full invoice.
4. **Eligible success with pending.** Capital → *Start the tracked ₹2 lakh drawdown*. Operator: *AA available*. Approve the bureau purpose with the PIN. Operator: *OTP passed*, *Lender A offer*. Scroll the loan disclosure (EMI vs ₹1,52,000 cap, risks, alternatives, data shared, version and hash) and approve with the PIN. Operator: *Rail pending* — the plan does not change and nothing prompts a second payment. Operator: *Rail successful* — exactly one effect; Plan shows 5 Nov at −₹68,279 with the Gupta bill still ₹5,20,000.
5. **Permitted drift.** Start the Gupta negotiation again. Operator: *Counteroffer* (60% upfront, 30 days, no buyback). Show the changes and approve them with the PIN; then judge clear → full GD-1182 (INV-07) → AA available; approve the ₹3,12,000 advance; rail successful. Plan now says **no shortfall left** and recommends nothing more; Ask Munim says the same.
6. **Evidence.** More → Evidence: hash chain verified; the same entries appear in RiskOps, including the wrong-PIN refusal, disclosures and ledger references.

Optional: RiskOps *Pause demo checks* blocks every task step until resumed; the ₹2.5 lakh Know Your Agent capital path; supplier decline, judge concern, AA failures.

## What is simulated

Every external system and money movement. Ask Munim is a scripted dialogue over calculated results and the judge is a fixture; neither is an AI model. Roles are labels, not authenticated users.
