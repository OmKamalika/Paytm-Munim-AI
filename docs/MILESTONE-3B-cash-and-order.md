# Milestone 3B — per-outlet cash basis and outlet order (merged into M4)

> Superseded in part by M4: the authored invoice GD-1182-R1 and its payment path were removed, because the supplied v4 bundle now includes the genuine full GD-1182 invoice (INV-07) on the tracked supplier flow.

## What changed

- **Cash basis (owner decision):** the cash plan's expected collections are now the sum of the three outlet forecasts (Milestone 2 model, extended to 30 Oct–20 Nov; Diwali uplift on 4–10 Nov only). This replaces the workbook's fixed ₹70,000/₹1,20,000-a-day estimate by explicit choice. Milestone 2 kept the two separate; that boundary is intentionally lifted here. The workbook basis is still available as `WORKBOOK_FIXED_COLLECTIONS` and is reconciled in tests.
- **Result:** low −₹2,69,892 on 5 Nov (was −₹1,84,500). A ₹2,00,000 drawdown alone no longer closes the gap. The calculated recommendation is Gupta's deferral (₹0) plus a ₹50,000 top-up drawdown, which leaves +₹40,108.
- **Outlet order:** the 400-box Gupta order is split Dadar 220 / Matunga 115 / Sion 65 across four SKUs, from forecast-based unit gaps and the synthetic SKU fixture (`data/synthetic-ext/`).
- **Supplier payment path:** synthetic full-body invoice GD-1182-R1, two simulator scenarios, a delivery-split drift check, and guard checks `invoice_match` and `order_already_paid`. GD-1182 itself stays on hold.
- **Build:** `.openai/hosting.json` is optional, so a fresh clone runs dev, build and type-check.

## Boundaries

- Forecasts are point estimates from payment and handover history, not observed SKU sales. SKU shares, stock and prices are assumptions.
- GD-1182-R1 is an authored demo document, not supplier evidence.
- All payments, deliveries and supplier replies are simulated and reset on restart.
- No screens changed; the order and supplier-payment path are reachable through the API until the Stitch flows are wired.

## Checkpoint verification

`npm run verify:sources`, `npm test` (99 unit tests and 6 acceptance cases), `npm run lint`, `npx tsc --noEmit` and `npm run build` pass without `.openai/hosting.json`. A local run checked the existing browser journey and, through the API, the outlet-order payment (guard pass, wrong PIN refused, one payment, second payment blocked, plan marks the bill paid, evidence chain verified) and the deferral plus ₹50,000 top-up drawdown.
