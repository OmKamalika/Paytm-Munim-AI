# M4 — reproducible demo and installable PWA

Goal: anyone can launch the release from a clean clone and complete the demo on a phone, with consistent cash, execution and evidence. No new product features.

## What changed

**1. Release branch repaired.** The two "merge main into milestone/simulated-operations-m3" commits had left `lib/action-runtime.js` with a duplicate declaration and a malformed cash plan; 12 test files failed to load. The merge was redone from the green v4 M3 commit (`35732e0`, 94 tests + 6 acceptance) and `main`. Recovery points: branch `recovery/main-pre-m4` (main before M4); `35732e0` stays in history.

- Cash inputs now come from the active v4 source: opening ₹4,50,000 (v4 bank close ₹3,52,730 + till ₹97,270), v4 recurring EMI/electricity/broadband (rent, salary, GST counted once), and the per-outlet forecast from v4 handovers. On fixed collections the engine reproduces the v4 workbook `Cash_Plan` exactly.
- The authored GD-1182-R1 invoice and its payment path were removed. The v4 bundle supplies the genuine full GD-1182 (INV-07); no invoice is invented to make a payment succeed. The header-only photo (INV-01) still holds.

**2. No hidden setup.** `.openai/hosting.json` is optional. `.env.example` is committed (no values). `npm run configure:pin` writes only a hash to the ignored `.env.local`. `npm run start` now passes that hash to the built worker (`dist/server/.dev.vars`, mode 600); before, the built runtime never saw it and approvals always failed closed.

**3. One action pipeline.** The single-step `/api/guard/evaluate`, `/api/execute`, `/api/analyze` and `/api/simulator/*` return 410. Capital and Supplier screens start tracked tasks; `/simulator` answers tracked requests only. Approval binds to one disclosure version; stale responses, replays, duplicates, pause and a broken journal are refused.

**4. Execution drives the business outcome.** Home, Plan, options and Ask read one ledger: a drawdown adds cash once and keeps the supplier bill; a supplier advance marks its part paid and moves the balance to the agreed date (never deducted twice); a pending instruction changes nothing, is flagged, and suppresses any prompt to pay again; when no gap remains the plan recommends nothing.

**5. One evidence source.** Merchant Evidence and RiskOps read the same flow journal; entries carry disclosure version/hash, guard action, approval, outcome and ledger reference.

**6–7. Phone.** Installable manifest (PNG + maskable icons), minimal service worker (offline page only; never caches `/api`), numeric PIN keypad, task status scrolled into view on start, banners for offline, RiskOps pause and server restart (earlier results are dropped, not shown as current).

**8. CI.** `.github/workflows/ci.yml`: source verification, tests (incl. acceptance), lint, TypeScript, build. Synthetic fixtures only, no secrets.

## Verification on the release candidate

All on commit `57dc6e7`, from a fresh `git clone` of the pushed branch, `npm ci`, `npm run configure:pin` (driven through a terminal), `npm run build`, `npm run start`. Full output: `docs/m4-rehearsal/results.txt`.

| Check | Result |
|---|---|
| `npm run verify:sources` | 120/120 files |
| `npm test` | 134 tests + 6/6 acceptance |
| Lint / TypeScript / build | clean / clean / pass (no `.openai/hosting.json`) |
| API journey (built runtime, private PIN) | 22/22 |
| Phone browser journeys (Pixel 7 emulation) | 26/26 checks; console shows only the deliberate wrong-PIN 409 and the deliberate offline test |
| Server restart | 4/4: offline banner, restart notice, old drawdown gone, evidence empty |

Journeys rehearsed: hard block (changed payee, no approval possible); missing evidence hold (header-only GD-1182); eligible success (₹2 lakh drawdown: AA → bureau consent PIN → OTP → lender → loan disclosure, wrong PIN refused, PIN → rail pending → reconciled once → plan −₹68,279); permitted drift (60/30 counteroffer → fresh owner approval → ₹3,12,000 advance); after both, no shortfall left and nothing more recommended; reload, offline, reconnect.

Backup demo: `docs/m4-rehearsal/backup-demo-phone.webm` (phone view of the full run) and the numbered screenshots.

## Not completed in this environment

- **HTTPS deployment.** This cloud session's network policy denies `api.cloudflare.com` and has no deployment credentials, so the release is not deployed from here. Any host that runs the Cloudflare Worker build works, or an HTTPS tunnel to `npm run start`.
- **Installed-phone test on the real demo phone.** Phone behaviour was verified in a Pixel 7 emulation of the production build (layout, numeric keypad, disclosure scrolling, resume, offline, restart), not on a physical device. Installation and standalone launch must be checked on the demo phone over HTTPS.
- **Tag.** The git proxy here only accepts pushes to the session branch, so the release tag must be created after merge (see the PR).

## Known limits

Synthetic rails and responses; scripted Ask and simulated judge; session-only state that resets on restart; hash chain not externally anchored; forecasts are point estimates; SKU fixture (`data/synthetic-ext/`) is an assumption and the outlet split is not yet part of the tracked supplier task; golden-evals workbook not run.
