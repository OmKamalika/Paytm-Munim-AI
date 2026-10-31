# Milestone 2 — outlet demand and stock coverage

This milestone adds a seven-day outlet collection estimate and an optional owner-input stock coverage check to the existing **Your data** screen. It uses payment and shift history to support a replenishment decision without claiming to observe SKU sales or physical stock.

## Calculation boundary

- Use complete all-channel shift handovers through 29 October 2026. The partial Paytm-only 30 October sample is excluded from the all-channel fit.
- A complete historical day has both closed shifts. Missing shifts and explicitly closed, zero-collection days are handled separately.
- Per-outlet, same-weekday history, recent trend, and the observed 2025 Diwali uplift produce a point estimate. Historical residuals provide low/high scenarios, labeled as scenarios rather than calibrated confidence limits.
- This estimate is separate from the Milestone 1 workbook cash plan. It must not silently replace the workbook's projected inflows or its 5 November cash anchor.

## Merchant decision boundary

- A SKU coverage check requires the owner to enter the item's price, assumed share of outlet collections, on-hand units, and number of festival days to cover starting 4 November. Any estimated units are a **payment-based proxy plus owner assumptions**. Supplier lead time from the current date is not modeled.
- The result suggests a manual review of replenishment or surplus. It does not place an order, send a supplier message, or move money.
- No SKU-level quantity, stock-on-hand value, or stockout claim is shown before the owner supplies those inputs.

## Acceptance checks

Run source verification, unit and acceptance tests, lint, TypeScript, and production build. In the browser, verify the new forecast and owner-input result appear inline in **Your data**, while the supplier/AA/lender simulator remains separate and the cash-plan anchors remain unchanged.

At this checkpoint, source verification covered 49 files; 57 Node tests and six isolated acceptance cases passed; lint, TypeScript, and production build passed. Browser QA showed the 4–10 November outlet estimates and a Dadar owner-input example: ₹500 item price, 20% assumed revenue share, 10 units on hand, and three festival days produced a 61-unit point proxy and 51-unit gap to review. Those units are an illustrative calculation from owner assumptions, not observed sales.
