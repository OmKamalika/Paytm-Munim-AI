# PayTMunim

A merchant cash-planning and guarded-delegation demonstration. The owner reviews outlet sales, sets an agent's scope, and approves exact commitments. A separate operator supplies simulated external responses; RiskOps follows the same requests, disclosures and effects. No real supplier message, AA fetch, bureau check, loan or payment occurs.

## Start the demo

Node.js 22.13 or newer is required.

    npm ci
    npm run configure:pin
    npm run build
    npm start

Open http://127.0.0.1:5173/ and the /simulator and /riskops paths in separate tabs. PIN setup prompts privately and saves only its hash in ignored .env.local. Built start explicitly loads that file into the local Worker. Without verification configured, the app starts and financial approval fails closed.

For development use npm run dev. To run another built instance on Windows PowerShell, use npm.cmd start -- --port 5180; npm.cmd preserves argument forwarding. --host, --port and --env-file are supported. Defaults are loopback and port 5173. A clean checkout needs no .openai/hosting.json, PostgreSQL, D1 or R2 service.

Restart view resets navigation only. Stop and restart the server to reset requests, evidence, pause state and duplicate reservations. All three tabs must use the same server/port. Private owner verification remains configured across restarts.

## Merchant chat and delegation

The persistent outlet selector scopes recorded sales, forecast cards, generic chat and setup defaults. Business cash and credit limits remain labelled All outlets. Explicit outlet names in chat override the selection.

Ask Munim opens a persistent conversation. A stock-agent request offers an explicit setup action; a message alone never activates a task. Setup separates goal/product/outlet/trigger, order and advance ceilings, credit/buyback goals, expiry, permissions and review by the owner or authorized signatory. The validated mandate is recorded with the run, disclosures and traces. It may narrow fixed guardrails and cannot grant automatic payment authority.

Monitoring responses are operator-supplied payment/supplier signals. There is no unattended scheduler or observed retail SKU stock. The GD-1182 invoice covers shared procurement. Another product or an individual-outlet order pauses for matching evidence before supplier negotiation. Purchase quantities and payments do not prove shelf stock or retail sell-through.

## Sales and forecast basis

Actual sales stop at 31 October 2026, 15:55 IST. The supplied Paytm file ends on 30 October at 12:30:07 IST, so today's value is unavailable rather than zero. Observed 25–31 October net sales total ₹93,649: Dadar ₹43,411, Matunga ₹30,594, Sion ₹19,644. Two refunds are included; full-period coverage is unverified. Future dates appear separately as forecasts.

The M4 cash default uses active v4 outlet history over the 22-day plan, listed obligations, EMI and four bank-narration utility estimates. The ₹4,50,000 opening is the supplied historical workbook scenario, not the current AA balance. It is not displayed as an account balance.

The baseline first turns negative on 4 November, reaches −₹2,68,279 on 5 November and recovers on 8 November. It differs from the earlier −₹1,84,500 workbook-only scenario because the default now uses the integrated v4 outlet forecast. Historical workbook arithmetic remains independently reconciled in tests.

Only completed, disclosure-bound effects update the shared plan. Quotes, pending instructions, failures and rejected approvals provide no cash relief. The planned cash date is shown before consent:

- A completed ₹2,00,000 drawdown counts once on 4 November. Standalone, 5 November is −₹68,279: the loan does not fully solve the gap.
- A completed 50% Gupta advance records ₹2,60,000 on 4 November and preserves ₹2,60,000 payable on 19 December, counting 45-day credit from the listed due date. Its standalone low is −₹8,279.
- Both completed effects give ₹1,91,721 on 5 November; the deferred supplier balance remains owed.

Home, Plan and options refresh from server state. These are cash-scenario dates, distinct from wall-clock trace timestamps. The historical /api/execute endpoint returns HTTP 410; executable merchant actions use tracked evidence, authority and consent.

## Presenter rehearsal

1. Show recorded Sales and the separate cash projection. Open chat, then review stock-agent goal, limits and permissions.
2. Start the shared-stock task. In the simulator return a monitoring signal if requested, agreed supplier terms, judge clear, full INV-07 evidence, then AA available.
3. Review the exact invoice/account, the proposed amendment from 14-day original credit to 45 days, buyback, dated advance, remaining payable, risks and alternatives. Approve with the privately configured PIN.
4. Return payment pending: Home remains unchanged. The next request reconciles the same instruction. Return success and inspect the updated plan and shared evidence.
5. Demonstrate a changed-account hard block, counteroffer review or header-only evidence pause. Restart the server before repeating a completed invoice/action.
6. Capital requires AA/GST, bureau-purpose consent, simulated verification, lender response, final loan disclosure/PIN and rail outcome. The ₹2.5 lakh preset also checks simulated KYA identity, scopes, amount, destination, expiry, revocation and proof.

Guard/More and standalone RiskOps read the same journal, exact disclosures and ledger. Pause is rechecked before final effect commit. Replays and stale approvals cannot create a second effect. Evidence is SHA-256 chained in memory, without external anchoring.

## PWA and connectivity

The standalone manifest includes identity/scope, explicit 192/512 PNGs and maskable variants. Apple metadata/icon and safe areas are included. Supporting browsers receive an install affordance when their installation event is available. The in-app browser is not an installation test device.

For Netlify, the committed netlify.toml uses npm run build:netlify (native Next.js) and publishes .next with the Next.js adapter. The local npm run build remains the Vinext/Worker path. Publishing dist alone does not adapt the server-rendered pages and API handlers to Netlify.

The worker caches only public offline explanation, manifest and icon assets. It never caches or queues APIs, mutations, approvals, payments or React data payloads. Offline interaction is blocked; reconnection reloads server state. Supporting browsers can show a read-only fallback on failed navigation.

Physical-device installation, OS launch/resume and a reachable HTTPS deployment remain release-rehearsal gates. The repository is not hosting. A phone cannot reach the laptop through its own 127.0.0.1. Keep operator controls presenter-restricted when hosting; actors are named demo roles, not production authentication.

## Sources and verification

All supplied sources remain in data/synthetic/, data/synthetic-v3/, data/synthetic-v4/ and specs/. The source manifest verifies 120 supplied files, including 25 PRD/strategy markdown files, five Excel workbooks, 53 CSVs, 11 generators, 14 invoice JSONs and six ReBIT files. The inherited synthetic-ext procurement plans are explicitly demonstration assumptions, not historical retail observations.

The active v4 adapter includes 8,293 bank transactions, 120,705 Paytm rows, 3,462 handovers, seven invoice documents/710 lines and 18 filed AA GST periods. Gupta's 53 high-confidence prior-FY narration matches total ₹62,86,960 and yield the 110% ceiling of ₹69,15,656. Ambiguous matches and answer-key fields are excluded. Narration matching is inferred, not bank-attested identity.

    npm run verify:sources
    npm test
    npm run lint
    npm run typecheck
    npm run build
    npm run smoke:start

CI runs these gates on Ubuntu and Windows. The built-server smoke uses port 5194 and private random verification inputs to check absent configuration, runtime binding and artifact leakage without changing the owner's file. Tests do not mutate the live demo. Regenerate the compact sales snapshot with node scripts/derive-sales-summary.mjs; no database is needed.

Ask replies are scripted and the judge is simulated. Structured drift, source evidence, authority, consent, pause and duplicate checks execute real code. Live models/financial rails, durable audits, production role isolation and the full 24-PRD operating suite remain outside this local demonstration.
