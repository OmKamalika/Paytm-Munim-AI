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
- The cash plan is **calculated** by `lib/cash-engine.js` from the inputs mapped in `lib/cash-inputs.js`: opening balance ₹4,50,000 (29 Oct bank close ₹3,54,156 + till cash ₹95,844, workbook `Cash_Plan!B2`); expected collections = the sum of the Dadar, Matunga and Sion forecasts for each day (the Milestone 2 outlet model run over 30 Oct–20 Nov, with last Diwali's uplift on 4–10 Nov only); the seven bills in `upcoming_outflows.csv`; and the ₹22,000 EMI due 7 Nov from `existing_emis.csv`. Each closing = previous closing + collections + relief received − bills due. On this per-outlet basis it first turns negative on 4 Nov, reaches **−₹2,69,892 on 5 Nov** and is back above zero on 8 Nov. On the workbook's fixed ₹70,000/₹1,20,000-a-day estimate (kept as `WORKBOOK_FIXED_COLLECTIONS`), the same engine reproduces the workbook `Cash_Plan` closings exactly (−₹1,84,500), apart from the 7 Nov EMI. A missing input is reported, not filled in.
- Relief is applied only once it has happened: a supplier deferral after a fresh, accepted, guard-passing simulator response (the deferred part moves to its new date and stays owed), a drawdown after a guarded, PIN-approved ledger effect (one dated inflow), and a supplier payment, which marks its bill paid on the due date without moving cash twice. The recommendation is calculated: ask Gupta first (₹0; the requested 50/45 terms leave −₹9,892), then a ₹50,000 top-up drawdown (about ₹700 interest) covers the rest, leaving +₹40,108 on 5 Nov. A drawdown alone would need ₹2,70,000, above the owner's ₹2,00,000 cap. The stock cut is an assumption, not a calculated result.
- The Ask screen's backend (`POST /api/munim`, `lib/munim-dialogue.js`) is a **deterministic dialogue simulator**: keyword matching over seven demo questions, filled from calculated results. It is not an AI model and not Hindi language understanding; other questions get an honest "not supported" answer. The current screen still uses its scripted client-side text until the Stitch screens are wired to this route.
- Outlet cards show Paytm activity, an all-channel monthly baseline, and last Diwali's observed collection uplift. These are transaction signals, not SKU sales or a product-level stock forecast.
- The supplier payment ceiling is 110% of prior-financial-year same-supplier debits in the simulated bank statement. The Gupta fixture has 49 labeled debits totaling ₹59,18,310, yielding a ₹65,10,141 ceiling. The bank's `label_*` fields are synthetic generator ground truth, not bank-attested payee identity. This fixture is released to the merchant and guard only after an available AA response is dispatched in the simulator.
- The supplied GD-1182 invoice row contains amount, due date, account suffix, and a description, but no full invoice body, so a payment against GD-1182 stays **Needs verification**. A separate, clearly labelled synthetic revision, **GD-1182-R1** (`lib/invoice-gd-1182-r1.generated.js`, built by `scripts/build-revised-invoice.mjs`), has a full body: 12 outlet × SKU lines, ₹5,20,000, 50% upfront on delivery, balance in 45 days, 50% buyback, pay to Gupta's verified account ending 7781 (supplier assumed to be on Paytm for Business). It was authored for the demo and is not part of the supplied data. The supplied changed-account, duplicate, and injected-description rows are test fixtures.
- The owner's drawdown destination `**4029` comes from the demo brief. The synthetic operating bank-statement account ends `4521`; these are distinct accounts and are not silently substituted for each other. Drawdowns are capped at ₹2,00,000 for this demo. Larger amounts require a future Know Your Agent flow and cannot execute here.

## Outlet demand and stock coverage (Milestone 2)

`GET /api/outlet-forecast` produces a seven-day 4–10 November collection estimate for each outlet from complete all-channel shift handovers through 29 October. It uses a recent same-weekday median, a bounded recent trend, and the measured 2025 Diwali uplift. Low and high values are historical residual scenarios, **not** a calibrated confidence interval. The partial 30 October Paytm sample is excluded. Since Milestone 3, the cash plan uses the same model over 30 Oct–20 Nov as its expected collections (an owner decision; see `docs/MILESTONE-3.md`).

In the existing **Your data** screen, an owner can enter an outlet, product label, unit price, assumed share of outlet revenue, units on hand, and the number of festival days to cover from 4 November. `POST /api/stock-coverage` returns a low/point/high **unit proxy** and a manual replenishment or surplus review suggestion. It does not model supplier lead time or record an order, supplier message, payment, or inventory update. Without owner inputs, no SKU unit estimate is shown.

## Outlet order and supplier payment (Milestone 3)

- `lib/outlet-order.js` splits the owner's 400-box, ₹5,20,000 Gupta order across outlets and SKUs: Milestone 2's stock-coverage calculation gives each outlet × SKU unit gap from the Diwali-week forecast, and the 400 boxes are split in proportion, in whole case packs of 5. Result: **Dadar 220, Matunga 115, Sion 65**. The SKU inputs (four ₹1,300 gift-box SKUs, each SKU's assumed share of outlet festival collections, units on hand, delivery addresses) are a synthetic fixture in `data/synthetic-ext/`, authored for the demo and outside the 49-file source manifest. The forecast itself points to only about 81 boxes short for Diwali week, so the order is large and the 50% buyback matters.
- The delegate's order carries the outlet × SKU split. The intent check escalates a supplier reply that changes it (`supplier_delivery_drift`). The guard checks GD-1182-R1 line by line against the accepted order, its pay-to account, total and upfront amount, scans its body for injected instructions, and blocks a second payment for the same order under either invoice number. With the AA sample released and simulator reply `supplier_outlet_order`, the ₹2,60,000 upfront payment passes and executes once with the owner PIN (simulated). This path is API-only until the Stitch screens are wired.

Simulator scenarios added: `supplier_outlet_order` (accepts terms and split, attaches GD-1182-R1) and `supplier_delivery_drift` (accepts terms but delivers everything to Dadar).

## Boundaries

Simulator requests and dispatches, approvals, pause state, ledger effects, and evidence live in server memory and reset on restart. RiskOps hashes are not independently anchored audit evidence. The multilingual golden-evals workbook is an unrun specification; `npm test` covers the implemented demo paths only. The interface was built locally against the supplied Stitch reference; its page source was not imported.

See `docs/MILESTONE.md`, `docs/MILESTONE-2.md` and `docs/MILESTONE-3.md` for each checkpoint's scope and boundaries.

The build reads `.openai/hosting.json` only if it exists (it is gitignored); without it, the app runs with no database or storage bindings, which it does not use.
