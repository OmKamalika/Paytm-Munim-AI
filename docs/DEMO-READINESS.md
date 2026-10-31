# PayTMunim demo readiness — 31 October 2026

**Code is ready for the selected local simulations. Presenter setup remains: configure the owner PIN privately and restart the server, then rehearse the approval-to-rail step.** The current browser correctly holds owner approval because no PIN hash is configured. Successful approvals and rail effects pass the isolated code evaluations.

## What is built

| Area | Working behavior |
|---|---|
| Merchant planning | Cash shortfall, three relief choices, lender comparison, outlet collection estimates, and optional owner-input stock coverage. Supplier invoice quantities are B2B billed purchases, not current inventory. |
| Supplier tasks | Merchant intent list, BATNA/ZOPA boundaries, accepted/counteroffer/refused replies, structured intent delta, and separate approval of changed terms and final payment. |
| Invoice evidence | Header-only hold; full 212-line GD-1182 verification; tax/discount arithmetic; exact line/header reconciliation; duplicate, changed account, and instruction checks. Original invoice credit of 14 days is disclosed separately from a proposed 45-day amendment. |
| AA and lenders | Correlated bank/GST requests with complete, partial, malformed, failed, and expired-consent responses; bureau-purpose disclosure and simulated OTP results; lender offer/decline/expiry. |
| Know Your Agent | Structured identity, mandate scope, amount, destination, expiry, revocation, and proof checks for the ₹2.5 lakh synthetic capital intent. Authority is rechecked before execution. |
| Payment outcomes | Simulated Paytm supplier transfer/drawdown success, definitive failure, and pending reconciliation. A shared invoice reservation prevents duplicate execution across the old and tracked paths. |
| RiskOps | Shared server feed across tabs; run/request/trace/span/actor identifiers, system and simulated judge flags, pause/block/owner-review status, exact merchant disclosures, consent events, and hash verification. |
| Sources | V4 active, older versions preserved. All 120 supplied source files verify, including 25 PRD markdown files and five Excel workbooks. No PostgreSQL database is used. |

## Verification completed

| Check | Result |
|---|---|
| Source manifest | 120/120 files match SHA-256 fingerprints |
| Node unit/integration suite | 94/94 pass |
| Selected workflow evaluations | 24/24 pass; these are included in the 94-test suite |
| Isolated financial acceptance cases | 6/6 pass |
| Lint / TypeScript / production build | All pass |
| Browser handoff | Merchant request → simulator inbox → response → merchant/RiskOps verified |
| Browser evidence flow | Header pauses; retry with full source advances to negotiation and informed payment disclosure |
| Browser negative flows | Commercial drift requires sign-off; changed beneficiary and revoked KYA block |
| Browser shared pause | RiskOps pause disables merchant task actions; resume restores them |
| Successful owner approval in the presenter browser | Pending private PIN setup; successful path verified in isolated code tests |

The pause race found during review was fixed in both execution paths. Regression cases cover a pause arriving during PIN/evidence hashing and immediately before commit. A late pause records a blocked attempt with zero ledger effect. No open P1 remained in the reviewed scope.

## Presenter setup

From the project folder, run:

```powershell
npm install
npm run configure:pin
npm run dev
```

Set the PIN privately in the terminal; do not put it in a script or share it in chat. Restart the dev server after configuring it. Open three tabs:

- Merchant: `http://127.0.0.1:5173/`
- Operator: `http://127.0.0.1:5173/simulator`
- RiskOps: `http://127.0.0.1:5173/riskops`

No payment tokens, bureau credentials, AA connection, database, or LLM key are required. The judge response is explicitly simulated. Restarting the server clears the demo's runs, reservations, ledger, and journal, so start the presentation from a fresh server session.

## Suggested eight-minute script

1. **Business problem:** show the −₹1,84,500 projected low on 5 November and the three relief choices. Explain supplier-billed purchase evidence and outlet demand signals without claiming to know stock on hand.
2. **Evidence hold to informed decision:** Ask Munim → “Complete the missing GD-1182 invoice evidence.” In the operator inbox send header-only, show the pause in RiskOps, request again, send full INV-07, agreed supplier terms, judge clear, and AA available. Show the invoice's original 14-day terms beside the proposed 45-day amendment, the advance, verified account, limit, risks, alternatives, and data shared.
3. **Owner and rail:** approve with the private PIN. The operator now sees a payment instruction. Choose success and show one simulated ledger effect and a verified trace. For a pending demonstration, choose pending first and reconcile the same instruction's status; do not submit another transfer.
4. **Drift and hard stop:** start a separate supplier intent. Send the counteroffer to show 50%→60% upfront, 45→30 days, and 50%→0% buyback with owner review. In another task send changed payee/account and show the hard block.
5. **Authority boundary:** start the ₹2.5 lakh intent, send complete AA data, then revoked KYA. Show the authority check and block in RiskOps. The full successful capital/OTP/lender path is an optional longer demonstration.

An invoice can have only one successful effect per action type in the local session. For independent repetitions after a completed payment, restart the server. Pending instructions keep their reservation until a definitive reconciliation outcome.

## Scope still outside this demo

Production authentication and tenant isolation, durable externally anchored audit records, live AA/bureau/lender/supplier/payment connections, a live model judge, and full GST XSD validation are not implemented. The supplied GST schema assumptions remain visible. The rest of the PRD suite and the complete multilingual golden evaluation workbook remain future work; only the selected flows above are asserted as working.

V4 supplies the data needed for this selected demonstration. Retail SKU sell-through and current stock are intentionally not assumed; procurement commitments are estimated from supplier documents, negotiation, and payment trails.

## GitHub checkpoint

Milestone 1 is on `main`; Milestone 2 is on `milestone/outlet-demand-m2`. This checkpoint is **Milestone 3 — v4 delegated operations and live RiskOps** on `milestone/simulated-operations-m3`, based on Milestone 2. It includes the code, tests, readiness report, and all supplied source versions. It is a local synthetic demo checkpoint, not a production release.
