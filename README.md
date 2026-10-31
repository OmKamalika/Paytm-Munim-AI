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

The app is an installable PWA (manifest, PNG and maskable icons, service worker). Installation needs HTTPS or `localhost`. Serve the build over HTTPS (any host that runs the Cloudflare Worker build, or a tunnel to `npm run start`), open it in Chrome on Android or Safari on iOS, then **Install app** / **Add to Home Screen**. The service worker caches only an offline page and icons, never `/api` data, so an offline phone shows an honest offline screen and never shows an old balance or success as current.

## How the demo runs

Every money-moving action is a **tracked task** with one pipeline: correlated request → simulator response → guard checks → disclosure (versioned, hashed) → owner PIN → fenced rail instruction → success, failure or pending → ledger → recalculated plan → journal. The earlier single-step guard/execute routes are retired (HTTP 410) and their screens start tracked tasks instead.

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

## Known limits

- Synthetic rails, responses and judge; no live payment, AA, bureau, lender or supplier integration.
- Ask Munim is a scripted keyword dialogue over calculated results (`/api/munim`), not a language model or Hindi understanding. The judge is a fixture that can only add escalation.
- Session-only state: tasks, approvals, ledger, pause and journal reset on restart. The hash chain is not externally anchored. Roles are labels, not authenticated users.
- Forecasts are point estimates from payment and handover history; SKU shares and stock in `data/synthetic-ext/` are assumptions. The outlet order split is advisory and not yet part of the tracked supplier task.
- The multilingual golden-evals workbook is not run.

See `docs/M4-RELEASE.md` for this release's verification record, and `docs/MILESTONE*.md` for earlier checkpoints.
