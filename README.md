# PayTMunim demo

A local, synthetic merchant and RiskOps demonstration. The merchant sees a projected Diwali cash gap, compares three relief options, requests external responses, and reviews guarded actions. A separate simulator console sends supplier, Account Aggregator (AA), and lender responses. No real payment, supplier message, AA fetch, bureau request, or loan submission occurs.

## Run locally

Node.js 22.13 or newer is required.

```powershell
npm install
npm run configure:pin
npm run dev
```

PIN setup prompts privately in the terminal and saves only its SHA-256 hash in ignored `.env.local`. Restart the dev server if the PIN is configured or changed while it is running. No PIN value is bundled with this project. Without a configured hash, the guard fails closed and the drawdown cannot complete.

Open the local URL printed by the dev server in two tabs: `/` for the merchant and `/simulator` for the operator. Request a supplier, AA, or lender response in the merchant tab. Once it shows **Requested - waiting (simulated)**, dispatch the matching response from the simulator tab. The merchant receives the dispatched response and cannot choose a scenario. The request cursor is issued by the server so an older response does not satisfy a new request.

For the drawdown journey, request lender offers, dispatch the A/B/C fixture, select Lender A, review the server guard, and enter the owner PIN. The demo records one in-memory ledger effect only after the guard, payload, PIN, and evidence checks pass. Evidence and RiskOps show the resulting hash chain. `npm test` runs isolated unit and acceptance checks, including the release-gate regressions in `tests/regression-gate.test.js`.

## Synthetic data and calculations

The 15 source CSVs, workbook, two generator scripts, and source README in `data/synthetic/` were copied from the user's supplied PayTMunim synthetic dataset. The 25 supplied strategy/PRD markdown files, two earlier workbooks, earlier JSON fixture, and pasted briefs are in `specs/`. `specs/SOURCE_MANIFEST.json` records hashes for all 49 source files; run `npm run verify:sources` to check the bundle. `scripts/derive-synthetic-data.mjs` creates `lib/synthetic-source.generated.js` with source hashes, row counts, outlet metrics, and labeled supplier debits. It does not run either supplied Python generator. These are fixtures, not a live feed.

- Home shows Paytm-only collections through 12:40 pm on 30 October 2026: ₹10,140 across Dadar, Matunga, and Sion. The ₹19,00,000 monthly figure is **all-channel** collections across twelve complete months. Existing EMI is ₹22,000 and the 8% total EMI cap is ₹1,52,000.
- The cash plan is **calculated** by `lib/cash-engine.js` from the inputs mapped in `lib/cash-inputs.js`: opening balance ₹4,50,000 (29 Oct bank close ₹3,54,156 + till cash ₹95,844, workbook `Cash_Plan!B2`), expected collections of ₹70,000 a day to 3 Nov and ₹1,20,000 from 4 Nov (workbook `Assumptions!B12:B13`, a fixed demo estimate, not a statistical forecast), the seven bills in `upcoming_outflows.csv`, and the ₹22,000 EMI due 7 Nov from `existing_emis.csv`. Each closing = previous closing + collections + relief received − bills due. It first turns negative on 4 November, reaches −₹1,84,500 on 5 November and rises above zero on 7 November. It matches the workbook `Cash_Plan` closings exactly, except that from 7 Nov it is ₹22,000 lower because the workbook leaves out the EMI. Historical bank debits and outlet history are not read as future bills or forecasts. A missing input is reported, not filled in.
- Relief is applied only once it has happened: a supplier deferral after a fresh, accepted, guard-passing simulator response (it moves the deferred part to its new date, still owed), and a drawdown after a guarded, PIN-approved ledger effect (one dated inflow; the full Gupta invoice stays payable). The options route shows each option's calculated effect and a recommendation: ask Gupta first (₹0; 5 Nov would close at ₹75,500 if the requested terms are accepted), otherwise the smallest covering drawdown is ₹1,90,000 and the prepared ₹2,00,000 gives ₹15,500. The stock cut is an assumption, not a calculated result.
- The Ask screen's backend (`POST /api/munim`, `lib/munim-dialogue.js`) is a **deterministic dialogue simulator**: keyword matching over six demo questions, filled from the calculated plan. It is not an AI model and not Hindi language understanding; other questions get an honest "not supported" answer. The current screen still uses its scripted client-side text until the Stitch screens are wired to this route.
- Outlet cards show Paytm activity, an all-channel monthly baseline, and last Diwali's observed collection uplift. These are transaction signals, not SKU sales or a product-level stock forecast.
- The supplier payment ceiling is 110% of prior-financial-year same-supplier debits in the simulated bank statement. The Gupta fixture has 49 labeled debits totaling ₹59,18,310, yielding a ₹65,10,141 ceiling. The bank's `label_*` fields are synthetic generator ground truth, not bank-attested payee identity. This fixture is released to the merchant and guard only after an available AA response is dispatched in the simulator.
- The supplied GD-1182 invoice row contains amount, due date, account suffix, and a description, but no full invoice body. Supplier negotiation and intent drift can be demonstrated; a supplier payment remains **Needs verification** because the original body cannot be checked for instruction injection. The supplied changed-account, duplicate, and injected-description rows are test fixtures.
- The owner's drawdown destination `**4029` comes from the demo brief. The synthetic operating bank-statement account ends `4521`; these are distinct accounts and are not silently substituted for each other. Drawdowns are capped at ₹2,00,000 for this demo. Larger amounts require a future Know Your Agent flow and cannot execute here.

## Boundaries

Simulator requests and dispatches, approvals, pause state, ledger effects, and evidence live in server memory and reset on restart. RiskOps hashes are not independently anchored audit evidence. The multilingual golden-evals workbook is an unrun specification; `npm test` covers the implemented demo paths only. The interface was built locally against the supplied Stitch reference; its page source was not imported.

See `docs/MILESTONE.md` for what this checkpoint covers and the product work that remains.
