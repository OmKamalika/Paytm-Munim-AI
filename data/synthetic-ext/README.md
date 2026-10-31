# Synthetic extension fixture (authored for the demo)

These files are **not** part of the user-supplied PayTMunim dataset in `data/synthetic/` and are outside `specs/SOURCE_MANIFEST.json`. They were written for Milestone 3 so the outlet × SKU order split and a full-body supplier invoice can be demonstrated. Every value is an assumption.

| File | What it holds |
|---|---|
| `gupta_skus.csv` | Four Gupta Diwali gift-box SKUs. Each costs ₹1,300, so 400 boxes match the supplied ₹5,20,000 GD-1182 order. Retail ₹1,699, case pack 5. |
| `outlet_sku_plan.csv` | For each outlet × SKU: the assumed share of that outlet's Diwali-week collections spent on the SKU, and units on hand at close of 29 Oct. |
| `outlets_delivery.csv` | Synthetic delivery addresses and receiving windows. |

`lib/outlet-order.js` carries the same values in code (Workers cannot read CSV at runtime); `tests/outlet-order.test.js` checks the two match. The revised invoice GD-1182-R1 is generated from the resulting order by `scripts/build-revised-invoice.mjs` and committed as `lib/invoice-gd-1182-r1.generated.js`; rerun the script if these inputs change, and the tests will fail until you do.
