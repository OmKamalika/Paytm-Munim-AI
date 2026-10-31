# Merchant chat and agent setup implementation plan

**Goal:** Make Ask Munim open a conversation and let an owner deliberately configure a stock agent without an always-expanded technical task catalogue.

**Design:** Preserve the Paytm navy/teal visual language. The Munim landing has one clear conversation entry, a compact agent entry and concise task summaries. Chat supports a persistent thread and explicit setup handoff. Agent setup opens a focused four-step dialog: goal and trigger; spending/terms limits; permissions; review and owner authority acknowledgement. No task starts from parsing a chat message alone.

**Authority:** Default mode monitors supplied payment/supplier signals, optionally seeks quotes, and prepares a proposal. Every binding order, supplier payment, bureau check and loan requires the appropriate owner sign-off. Supplier identity, invoice evidence, hard guard floors and duplicate protection remain binding. The configured mandate can narrow these boundaries. Monitoring outcomes come from the separate simulator, with no live SKU inventory or unattended scheduler claim.

**Architecture:** `MunimChat` owns the conversation display; the page supplies grounded scripted answers and an explicit setup callback. `AgentSetup` collects a typed mandate. `FlowMerchant` opens setup on demand, starts a run only after review, and renders one current action with optional evidence detail. `lib/delegation.js` validates and freezes the owner mandate; the workflow enforces it and exposes it to traces/RiskOps.

## Implementation

- [x] Reproduce the existing Ask submit behavior and always-expanded task catalogue in the browser.
- [x] Add chat routing tests, then implement conversation, keyboard/focus behavior and explicit setup handoff.
- [x] Add mandate and monitoring tests, then implement validated server-side scope, amount/terms/expiry checks and request-specific simulator responses.
- [x] Implement focused goal/limits/permissions/review setup, preserving input when navigating steps.
- [x] Replace the full default catalogue with compact agent/task cards. Keep detailed source and trace data behind disclosure controls.
- [x] Test full suite, lint, TypeScript, build and source provenance. Review authority wording against actual enforcement.
- [x] Rehearse chat → setup → monitor response → supplier proposal across merchant, operator and RiskOps; save visual proof.

## Reporting and outlet scope

The persistent merchant outlet selector scopes recorded sales, outlet forecasts, generic chat context and setup defaults. Explicit outlet names in chat override that context. Business cash planning and lending remain labelled All outlets. Stale stock-coverage requests cannot overwrite a newer outlet/input selection.

Actual sales are cut off at 31 October 2026, 15:55 IST. The source ends on 30 October at 12:30:07 IST; 31 October values remain unavailable rather than zero. The 25–31 October observed net total is ₹93,649, and full-period coverage is unverified. The 4–10 November projection is separately labelled a future forecast. UI synthetic-data banners were removed and the sales terminology updated; archived sources and API metadata retain their provenance.

## Verification

128 tests and six isolated acceptance checks pass. ESLint, TypeScript, the local framework build and 120-source verification pass. Browser rehearsal confirmed scoped Sion sales and chat, persistent chat history, explicit setup handoff, Sion setup prefill, no setup replay after navigation, editable ceilings retained through review, authorized-signatory activation, the separate monitoring/supplier simulator requests, and the recorded limits/role in live RiskOps. No browser money movement was attempted.

The known newer remote cash merge is outside this change; implementation starts from the tested local M3 checkout and does not incorporate malformed remote files.
