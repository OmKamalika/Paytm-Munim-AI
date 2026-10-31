# PayTMunim demo

A synthetic merchant cash-planning and Intent Guard demonstration for Sharma General Stores (Dadar, Matunga, Sion). The merchant sees a projected Diwali cash gap, delegates supplier and capital tasks to Munim, and approves only the exact disclosure shown, with a private PIN. An operator console sends every external response (supplier, invoice evidence, AA, bureau, lender, payment rail). RiskOps watches the same journal. **All data, rails and responses are simulated; no real money, supplier, AA, bureau or lender is contacted.**

## Run from a clean clone

Requires Node.js 22.13 or newer. No database, API key or private hosting file is needed.

```bash
git clone https://github.com/OmKamalika/Paytm-Munim-AI.git
```

```bash
cd Paytm-Munim-AI
```

```bash
npm ci
```

```bash
npm run configure:pin
```

`configure:pin` asks for a 6–12 digit owner PIN in the terminal (input hidden) and writes only its SHA-256 hash to the ignored `.env.local`. Nothing secret is committed; `.env.example` documents the variable without a value. Without a PIN hash, approvals fail closed.

Development server (hot reload):

```bash
npm run dev
```

Production build, started locally (this is the tested release path):

```bash
npm run build
```

```bash
npm run start
```

`npm run start` serves the build at `http://127.0.0.1:8787` and passes the PIN hash to the built worker through the ignored `dist/server/.dev.vars`. Set `HOST=0.0.0.0` to reach it from a phone on the same network. If `.openai/hosting.json` (a hosting-scaffold file, gitignored) is absent, the build runs without database or storage bindings, which this app does not use.

Release checks (also run in CI on every push and pull request):

```bash
npm run verify:sources && npm test && npm run lint && npx tsc --noEmit && npm run build
```

## Open three views

- Merchant (phone): `/`
- Operator: `/simulator`
- RiskOps: `/riskops`

### Install on a phone

Open the local URL printed by the dev server in three tabs: `/` for the merchant, `/simulator` for the operator, and `/riskops` for live review. In the merchant app, open **Ask Munim → Delegate and track** and choose a business intent. Its next external request appears in the simulator inbox. Select that exact request and respond; the merchant receives the result and RiskOps refreshes the same run, intent delta, guard action, disclosure, and trace every second. The merchant cannot select a supplier, judge, or rail scenario.

`npm test` runs unit and isolated acceptance checks. `npm run eval:flows` runs the selected delegated-flow evaluations with readable case names. Tests create their own private random approval inputs and never mutate the live demo state.

## Tracked simulations (Milestone 3)

- **Supplier happy path:** start the Gupta intent; respond with agreed terms → simulated judge clear → full INV-07 invoice → AA available. The merchant reviews the amount, account, credit, buyback, source checks, risks, alternatives, and original intent, then approves with PIN. The operator returns payment success, failure, or pending. Pending instructions request status reconciliation rather than a second transfer.
- **Intent drift:** return the supplier counteroffer (60% upfront, 30-day credit, no buyback). The guard requires a version-bound owner decision on those changes. That decision does not approve payment; the final advance requires a separate sign-off.
- **Source attacks:** a changed supplier account or duplicate invoice blocks. A header-only photo or invoice instruction attack pauses the run. Source text never becomes owner authority.
- **Capital:** AA bank and GST evidence → explicit owner bureau-purpose consent → simulated OTP outcome → lender offer/decline → final loan disclosure/PIN → simulated drawdown rail outcome. The ₹2.5 lakh intent additionally checks agent identity, scopes, amount, destination, expiry, revocation, and proof of possession. These are synthetic credentials and outcomes, with no external identity or lending call.

Responses bind to one open request and stale responses are rejected. A shared payment reservation prevents the tracked and single-step demos from paying or drawing against the same invoice twice. Successful rail outcomes create one local ledger effect. The journal records source/tool decisions, actors, original/runtime intents, deltas, simulated judge flags, exact disclosures, consent outcomes, and hashes. The judge fixture can add escalation and cannot overrule deterministic failures.
For the drawdown journey, request lender offers, dispatch the A/B/C fixture, select Lender A, review the server guard, and enter the owner PIN. The demo records one in-memory ledger effect only after the guard, payload, PIN, and evidence checks pass. Evidence and RiskOps show the resulting hash chain. `npm test` runs isolated unit and acceptance checks, including the release-gate regressions in `tests/regression-gate.test.js`.
The app is an installable PWA (manifest, PNG and maskable icons, service worker). Installation needs HTTPS or `localhost`. Serve the build over HTTPS (any host that runs the Cloudflare Worker build, or a tunnel to `npm run start`), open it in Chrome on Android or Safari on iOS, then **Install app** / **Add to Home Screen**. The service worker caches only an offline page and icons, never `/api` data, so an offline phone shows an honest offline screen and never shows an old balance or success as current.

## How the demo runs

Every money-moving action is a **tracked task** with one pipeline: correlated request → simulator response → guard checks → disclosure (versioned, hashed) → owner PIN → fenced rail instruction → success, failure or pending → ledger → recalculated plan → journal. The earlier single-step guard/execute routes are retired (HTTP 410) and their screens start tracked tasks instead.

The active data adapter is `lib/active-source.js`, using the supplied v4 bundle at `data/synthetic-v4/`. Earlier versions remain in `data/synthetic/` and `data/synthetic-v3/`. All supplied CSV, Excel, invoice JSON, ReBIT XML/JSON, README, and generator code are preserved. The 25 strategy/PRD markdown files, earlier workbooks/JSON fixture, and pasted briefs are in `specs/`. `specs/SOURCE_MANIFEST.json` records hashes for all 120 source files, including five Excel workbooks. Run `npm run verify:sources` to check the bundle. Our importers derive compact runtime snapshots without running the supplied Python generators. No PostgreSQL database is created or used.

- Home shows Paytm-only collections through 12:40 pm on 30 October 2026: ₹10,140 across Dadar, Matunga, and Sion. The ₹19,00,000 monthly figure is **all-channel** collections across twelve complete months. Existing EMI is ₹22,000 and the 8% total EMI cap is ₹1,52,000.
- The cash plan uses the supplied workbook forecast formula, listed outflows, and recurring EMI/utilities inferred from narrations. Rent, salaries, and GST are not duplicated. It first turns negative on 4 November, reaches −₹1,84,500 on 5 November, and closes at ₹33,500 on 7 November. The merchant view omits the opening input. The full ₹5,20,000 Gupta invoice remains an outflow; a completed ₹2,00,000 drawdown is counted once as an inflow and gives +₹15,500 on 5 November.
- The cash plan is **calculated** by `lib/cash-engine.js` from the inputs mapped in `lib/cash-inputs.js`: opening balance ₹4,50,000 (29 Oct bank close ₹3,54,156 + till cash ₹95,844, workbook `Cash_Plan!B2`), expected collections of ₹70,000 a day to 3 Nov and ₹1,20,000 from 4 Nov (workbook `Assumptions!B12:B13`, a fixed demo estimate, not a statistical forecast), the seven bills in `upcoming_outflows.csv`, and the ₹22,000 EMI due 7 Nov from `existing_emis.csv`. Each closing = previous closing + collections + relief received − bills due. It first turns negative on 4 November, reaches −₹1,84,500 on 5 November and rises above zero on 7 November. It matches the workbook `Cash_Plan` closings exactly, except that from 7 Nov it is ₹22,000 lower because the workbook leaves out the EMI. Historical bank debits and outlet history are not read as future bills or forecasts. A missing input is reported, not filled in.
- Relief is applied only once it has happened: a supplier deferral after a fresh, accepted, guard-passing simulator response (it moves the deferred part to its new date, still owed), and a drawdown after a guarded, PIN-approved ledger effect (one dated inflow; the full Gupta invoice stays payable). The options route shows each option's calculated effect and a recommendation: ask Gupta first (₹0; 5 Nov would close at ₹75,500 if the requested terms are accepted), otherwise the smallest covering drawdown is ₹1,90,000 and the prepared ₹2,00,000 gives ₹15,500. The stock cut is an assumption, not a calculated result.
- The Ask screen's backend (`POST /api/munim`, `lib/munim-dialogue.js`) is a **deterministic dialogue simulator**: keyword matching over six demo questions, filled from the calculated plan. It is not an AI model and not Hindi language understanding; other questions get an honest "not supported" answer. The current screen still uses its scripted client-side text until the Stitch screens are wired to this route.
- Outlet cards show Paytm activity, an all-channel monthly baseline, and last Diwali's observed collection uplift. These are transaction signals, not SKU sales or a product-level stock forecast.
- V4 covers the complete prior financial year from April 2025. Gupta's 53 transfer-narration matches total ₹62,86,960, giving the 110% ceiling of ₹69,15,656. The active matcher excludes `label_*` answer keys and ambiguous matches. Narration attribution is inferred, not a bank attestation of identity. Data is released to a tracked request only after its AA simulator response.
- The GD-1182 photo (INV-01) is header-only; the full app-upload document (INV-07) has 212 lines. Evidence checks recompute tax/discount arithmetic, exact line sums and invoice total, registry account/name, duplicates, and instruction text. Full evidence can pass while the photo fails closed. Owner approval is still required.
- The active bank and drawdown destination both end `4029`. The single-step demo retains the ₹2,00,000 boundary; the tracked ₹2,50,000 example requires simulated Know Your Agent checks and separate owner consent. No real agent credential or payment rail is used.
- The active source has 8,293 bank transactions, 120,705 Paytm rows, 3,462 handovers, and 18 filed AA GST periods through September 2026. October's estimated return is not counted as filed. Deposit/GST XML and JSON mirrors are checked for structural/value consistency. The supplied GST schema assumptions remain explicit; this is not full XSD validation.
- Supplier invoice quantities describe B2B billed purchases. Neither payments nor invoice quantities prove current stock or end-customer SKU sales. The merchant data view shows this purchase evidence separately from the optional owner-input coverage calculation.
- The cash plan is **calculated** by `lib/cash-engine.js` from the inputs mapped in `lib/cash-inputs.js`: opening balance ₹4,50,000 (29 Oct bank close ₹3,54,156 + till cash ₹95,844, workbook `Cash_Plan!B2`); expected collections = the sum of the Dadar, Matunga and Sion forecasts for each day (the Milestone 2 outlet model run over 30 Oct–20 Nov, with last Diwali's uplift on 4–10 Nov only); the seven bills in `upcoming_outflows.csv`; and the ₹22,000 EMI due 7 Nov from `existing_emis.csv`. Each closing = previous closing + collections + relief received − bills due. On this per-outlet basis it first turns negative on 4 Nov, reaches **−₹2,69,892 on 5 Nov** and is back above zero on 8 Nov. On the workbook's fixed ₹70,000/₹1,20,000-a-day estimate (kept as `WORKBOOK_FIXED_COLLECTIONS`), the same engine reproduces the workbook `Cash_Plan` closings exactly (−₹1,84,500), apart from the 7 Nov EMI. A missing input is reported, not filled in.
- Relief is applied only once it has happened: a supplier deferral after a fresh, accepted, guard-passing simulator response (the deferred part moves to its new date and stays owed), a drawdown after a guarded, PIN-approved ledger effect (one dated inflow), and a supplier payment, which marks its bill paid on the due date without moving cash twice. The recommendation is calculated: ask Gupta first (₹0; the requested 50/45 terms leave −₹9,892), then a ₹50,000 top-up drawdown (about ₹700 interest) covers the rest, leaving +₹40,108 on 5 Nov. A drawdown alone would need ₹2,70,000, above the owner's ₹2,00,000 cap. The stock cut is an assumption, not a calculated result.
- The Ask screen's backend (`POST /api/munim`, `lib/munim-dialogue.js`) is a **deterministic dialogue simulator**: keyword matching over seven demo questions, filled from calculated results. It is not an AI model and not Hindi language understanding; other questions get an honest "not supported" answer. The current screen still uses its scripted client-side text until the Stitch screens are wired to this route.
- Outlet cards show Paytm activity, an all-channel monthly baseline, and last Diwali's observed collection uplift. These are transaction signals, not SKU sales or a product-level stock forecast.
- The supplier payment ceiling is 110% of prior-financial-year same-supplier debits in the simulated bank statement. The Gupta fixture has 49 labeled debits totaling ₹59,18,310, yielding a ₹65,10,141 ceiling. The bank's `label_*` fields are synthetic generator ground truth, not bank-attested payee identity. This fixture is released to the merchant and guard only after an available AA response is dispatched in the simulator.
- The supplied GD-1182 invoice row contains amount, due date, account suffix, and a description, but no full invoice body, so a payment against GD-1182 stays **Needs verification**. A separate, clearly labelled synthetic revision, **GD-1182-R1** (`lib/invoice-gd-1182-r1.generated.js`, built by `scripts/build-revised-invoice.mjs`), has a full body: 12 outlet × SKU lines, ₹5,20,000, 50% upfront on delivery, balance in 45 days, 50% buyback, pay to Gupta's verified account ending 7781 (supplier assumed to be on Paytm for Business). It was authored for the demo and is not part of the supplied data. The supplied changed-account, duplicate, and injected-description rows are test fixtures.
- The owner's drawdown destination `**4029` comes from the demo brief. The synthetic operating bank-statement account ends `4521`; these are distinct accounts and are not silently substituted for each other. Drawdowns are capped at ₹2,00,000 for this demo. Larger amounts require a future Know Your Agent flow and cannot execute here.
**Simulator sequencing.** A task opens one request at a time. In `/simulator`, select the request marked *open* and choose a response for its kind. A response to an answered, superseded or unknown request is refused. Typical sequences:

| Journey | Merchant starts | Operator responses, in order | Merchant decisions |
|---|---|---|---|
| Eligible success (₹2 lakh drawdown) | Capital → *Start the tracked ₹2 lakh drawdown* | AA available → OTP passed → Lender A offer → *Rail pending* → *Rail successful* | Approve bureau purpose (PIN); approve loan (PIN) |
| Permitted drift | Supplier terms → *Start the tracked Gupta negotiation* | Counteroffer (60%, 30 days, no buyback) → judge clear → full GD-1182 (INV-07) → AA available → rail successful | Approve the changed terms (PIN); separately approve the ₹3,12,000 advance (PIN) |
| Hard block | Gupta negotiation | Changed payee and account | None possible: blocked, no disclosure |
| Missing-evidence hold | Supplier terms → *Start from the header-only GD-1182 photo* | Header-only photo (INV-01) | None: paused until full evidence is requested |
| Pending → reconciliation | Any payment step | *Rail pending*, then later *Rail successful* or *Rail failed* | None: the same instruction is reconciled, never resent |

**Rehearsal reset.** State is process memory. Stop the server (Ctrl+C) and start it again to reset every task, approval, ledger effect, pause and journal entry. Open pages notice the new session, say so, and drop earlier results. There is no reset endpoint. An invoice can have only one successful effect per action type in a session, so restart between full repetitions.

## Cash plan and relief

`lib/cash-engine.js` calculates the plan from inputs mapped in `lib/cash-inputs.js`; each input is checked against its source in tests.

- **Opening** ₹4,50,000 = v4 bank close 29 Oct ₹3,52,730 + till cash ₹97,270 (v4 workbook `Cash_Plan!B2`). Not shown in the API.
- **Expected collections** = the sum of the Dadar, Matunga and Sion forecasts per day (Milestone 2 model: same-weekday median, bounded trend, last Diwali's uplift on 4–10 Nov only), 30 Oct–20 Nov. A point estimate, not a measured future.
- **Bills**: the seven rows of `upcoming_outflows.csv` plus v4 recurring EMI, electricity and broadband from bank narrations. Rent, salary and GST are listed once.
- **Result**: low **−₹2,68,279 on 5 Nov**, back above zero on 8 Nov. On the workbook's fixed ₹70,000/₹1,20,000 collections the same engine reproduces the v4 workbook `Cash_Plan` exactly (−₹1,84,500).
- **Relief counts only after a confirmed action** from the tracked ledger: a drawdown adds one inflow (the Gupta bill stays at ₹5,20,000); a supplier advance is marked paid on its due date and the balance moves to the agreed credit date, never deducted twice; a **pending** instruction changes nothing, flags the bill, and suppresses any suggestion that would prompt a second payment.
- **Recommendation** (calculated): ask Gupta first (₹0; the requested 50/45 terms leave −₹8,279), then a ₹50,000 top-up drawdown (about ₹700 interest). A drawdown alone would need ₹2,70,000, above the ₹2,00,000 owner cap. When no shortfall remains, the plan says so and recommends nothing.

## Sources

The active adapter `lib/active-source.js` uses the supplied v4 bundle in `data/synthetic-v4/`; v2 (`data/synthetic/`) and v3 are preserved. `specs/SOURCE_MANIFEST.json` hashes all 120 supplied files (CSV, five Excel workbooks, invoice JSON, ReBIT XML/JSON, generators, 25 PRD markdown files); `npm run verify:sources` checks them.

- GD-1182: the owner's photo (INV-01) is header-only and fails closed; the full 212-line upload (INV-07) is supplied and can pass evidence checks. No invoice is authored to make a payment succeed.
- Gupta's supplier ceiling: 53 high-confidence narration matches over the full prior FY total ₹62,86,960, so 110% is ₹69,15,656. Narration attribution is inferred, not bank-attested.
- Operating and drawdown account both end `4029`.
- `data/synthetic-ext/` is a separate, labelled fixture authored for the outlet order split (four gift-box SKUs, shares, stock). It is not supplied data and is outside the manifest.

Simulator requests and dispatches, approvals, pause state, ledger reservations/effects, and evidence live in server memory and reset on restart. Demo roles are actor labels; production authentication and tenant isolation are not implemented. RiskOps hashes are not independently anchored audit evidence. The simulated judge does not call an LLM. The full multilingual golden-evals workbook remains a specification; the selected flow evaluations run real local code. The interface was built against the supplied Stitch reference; its page source was not imported.

See `docs/MILESTONE.md`, `docs/MILESTONE-2.md`, and `docs/MILESTONE-3.md` for the checkpoint scope and remaining boundaries.
See `docs/MILESTONE.md`, `docs/MILESTONE-2.md` and `docs/MILESTONE-3.md` for each checkpoint's scope and boundaries.
## Known limits

- Synthetic rails, responses and judge; no live payment, AA, bureau, lender or supplier integration.
- Ask Munim is a scripted keyword dialogue over calculated results (`/api/munim`), not a language model or Hindi understanding. The judge is a fixture that can only add escalation.
- Session-only state: tasks, approvals, ledger, pause and journal reset on restart. The hash chain is not externally anchored. Roles are labels, not authenticated users.
- Forecasts are point estimates from payment and handover history; SKU shares and stock in `data/synthetic-ext/` are assumptions. The outlet order split is advisory and not yet part of the tracked supplier task.
- The multilingual golden-evals workbook is not run.

See `docs/M4-RELEASE.md` for this release's verification record, and `docs/MILESTONE*.md` for earlier checkpoints.
