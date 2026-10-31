# Milestone 1 — local synthetic demo

**Scope:** A merchant can move from a projected cash shortfall to a guarded, simulated decision; an operator can send synthetic external responses from a separate simulator; RiskOps can inspect the intent and action trail. This checkpoint is intended for the private PayTMunim GitHub repository.

## Included in this checkpoint

- Responsive merchant home, cash plan, three cost-ordered relief choices, lender comparison, supplier terms, source and outlet signals, evidence view, and RiskOps view.
- A separate `/simulator` console for supplier, AA, and lender scenarios. Merchant requests wait for a new matching server-issued event and show the response only after dispatch.
- Deterministic supplier intent and drift checks, plus server-side action guards for lender drawdown and supplier payment. The supplier ceiling follows 110% of synthetic prior-FY same-supplier debits after an AA sample response; a missing source invoice body fails closed.
- Owner PIN hash supplied privately through the local environment, approval tied to the action hash, idempotency, server pause, and one simulated ledger effect for a passing drawdown.
- Empty-start, hash-chained server evidence with verification; automated unit and isolated acceptance checks.
- Self-contained synthetic CSV and workbook sources with a reproducible derived snapshot and source hashes. The cash view uses the supplied workbook formula and never displays its opening input. All 25 supplied strategy/PRD markdown files, three distinct Excel workbooks, the earlier JSON fixture, and source generator scripts are bundled with a 49-file SHA-256 manifest.

## Milestone 1.1 — computed cash decision (backend only)

- `lib/cash-inputs.js` maps every cash input to its source file or workbook cell; `lib/cash-engine.js` calculates daily closings, first shortfall, lowest balance and each relief option. The `/api/cashplan` and `/api/options` response shapes are unchanged; options add a calculated `recommendation`.
- `lib/cash-state.js` applies relief only after a fresh, accepted, guard-passing supplier response or a completed drawdown. `/api/execute` reports the 5 Nov balance from the engine.
- `POST /api/munim` is a deterministic dialogue simulator over the calculated results (not a model).
- Guard fix: a supplier response now authorizes only if it answers the latest supplier request; previously a reply to an older request still passed after a new request.
- No screens were changed beyond the merchant poller matching the response to its request id. Screen work waits for the Stitch flows.

## Still to build

1. **Merchant intelligence:** product-level inventory and SKU demand data, calibrated outlet forecasts, stock transfer/reorder recommendations, and measured business outcomes. Payment amounts alone do not identify sold products.
2. **Delegated commerce:** real supplier messaging and negotiation, explicit BATNA/ZOPA configuration, quote and invoice authenticity checks, owner-authorized supplier payments, and durable supplier history.
3. **Capital and consent:** live lender offers, application handoff, bureau-consent OTP, the Know Your Agent flow for larger mandates, and real AA consent/data-request integration.
4. **Production controls:** merchant/operator authentication and roles, durable multi-user state, external evidence anchoring, privacy controls, monitoring, operational runbooks, and the remaining PRD journeys.
5. **Evaluation and design:** run the supplied multilingual golden-evals workbook, broaden end-to-end coverage, and compare the built screens against the Stitch exports. The current Ask experience is a scripted matcher; the optional server-side model-key branch is not implemented.

## Demo boundaries

All external responses and money movement are simulated. The synthetic bank's payee labels are generator ground truth, not an AA attestation of beneficiary identity. GD-1182 has metadata and a description but no complete source invoice body, so the supplier-payment guard remains in Needs verification. Simulator events, approvals, ledger effects, pause state, and evidence reset on process restart; the log is not independently anchored.

## Checkpoint verification

Run `npm run verify:sources`, `npm test`, `npm run lint`, `npx tsc --noEmit --pretty false`, and `npm run build` before committing. The drawdown browser path additionally requires the owner to configure a PIN privately with `npm run configure:pin` and restart the dev server.
