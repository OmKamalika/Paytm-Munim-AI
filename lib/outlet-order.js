// Splits the owner's Gupta gift-box order across outlets and SKUs.
//
// Inputs:
//   - the owner's order: 400 gift boxes for ₹5,20,000 (merchant-entered, demo-fixture);
//   - each outlet's Diwali-week (4-10 Nov) collection forecast (Milestone 2 model);
//   - a synthetic SKU fixture (data/synthetic-ext/): price, case pack, each SKU's
//     assumed share of an outlet's festival collections, and units on hand.
//
// Method: for every outlet x SKU, Milestone 2's calculateStockCoverage gives the
// point unit gap (forecast collections x share / retail price - units on hand).
// The owner's 400 boxes are then split in proportion to those gaps, in whole
// case packs (largest remainder). Nothing is ordered, sent or paid here.

import { calculateStockCoverage } from './outlet-forecast.js';
import { outletForecastFixture } from './outlet-forecast-fixture.js';

// Mirrors data/synthetic-ext/*.csv (checked by tests/outlet-order.test.js).
export const skuFixture = Object.freeze({
  synthetic: true,
  provenance: 'Authored for the demo in data/synthetic-ext/; not part of the user-supplied dataset. Shares and stock are assumptions.',
  skus: [
    { skuId: 'GB-DRY', name: 'Dry-fruit Diwali gift box', supplierId: 'gupta', unitCostInr: 1300, retailPriceInr: 1699, casePack: 5 },
    { skuId: 'GB-CHOC', name: 'Chocolate and cookies hamper', supplierId: 'gupta', unitCostInr: 1300, retailPriceInr: 1699, casePack: 5 },
    { skuId: 'GB-PUJA', name: 'Puja and diya gift set', supplierId: 'gupta', unitCostInr: 1300, retailPriceInr: 1699, casePack: 5 },
    { skuId: 'GB-SWT', name: 'Sweets and namkeen box', supplierId: 'gupta', unitCostInr: 1300, retailPriceInr: 1699, casePack: 5 },
  ],
  plan: [
    { outletId: 'DAD', skuId: 'GB-DRY', festivalRevenueSharePct: 10, unitsOnHand: 4 },
    { outletId: 'DAD', skuId: 'GB-CHOC', festivalRevenueSharePct: 7, unitsOnHand: 3 },
    { outletId: 'DAD', skuId: 'GB-PUJA', festivalRevenueSharePct: 4, unitsOnHand: 2 },
    { outletId: 'DAD', skuId: 'GB-SWT', festivalRevenueSharePct: 6, unitsOnHand: 5 },
    { outletId: 'MAT', skuId: 'GB-DRY', festivalRevenueSharePct: 7, unitsOnHand: 2 },
    { outletId: 'MAT', skuId: 'GB-CHOC', festivalRevenueSharePct: 6, unitsOnHand: 2 },
    { outletId: 'MAT', skuId: 'GB-PUJA', festivalRevenueSharePct: 5, unitsOnHand: 1 },
    { outletId: 'MAT', skuId: 'GB-SWT', festivalRevenueSharePct: 6, unitsOnHand: 3 },
    { outletId: 'SIO', skuId: 'GB-DRY', festivalRevenueSharePct: 5, unitsOnHand: 1 },
    { outletId: 'SIO', skuId: 'GB-CHOC', festivalRevenueSharePct: 5, unitsOnHand: 2 },
    { outletId: 'SIO', skuId: 'GB-PUJA', festivalRevenueSharePct: 6, unitsOnHand: 0 },
    { outletId: 'SIO', skuId: 'GB-SWT', festivalRevenueSharePct: 6, unitsOnHand: 2 },
  ],
  deliveryAddresses: {
    DAD: 'Shop 4, Ranade Road, Dadar West, Mumbai 400028 (synthetic)',
    MAT: '12 Telang Road, Matunga East, Mumbai 400019 (synthetic)',
    SIO: '7 Sion Main Road, Sion West, Mumbai 400022 (synthetic)',
  },
});

export const OWNER_ORDER = Object.freeze({ supplierId: 'gupta', units: 400, totalAmountInr: 520000, deliveryDate: '2026-11-04', source: 'merchant-entered order (demo-fixture originalIntent)' });

/** Largest-remainder split of `total` into whole packs, weighted by `weights`. */
function splitInPacks(total, packSize, weights) {
  const packs = total / packSize;
  if (!Number.isInteger(packs)) throw new RangeError('The order must be a whole number of case packs.');
  const weightSum = weights.reduce((sum, value) => sum + value, 0);
  if (weightSum <= 0) throw new RangeError('No unit gap to split the order by.');
  const exact = weights.map((value) => (value / weightSum) * packs);
  const result = exact.map(Math.floor);
  let left = packs - result.reduce((sum, value) => sum + value, 0);
  const order = exact.map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder || a.index - b.index);
  for (const { index } of order) {
    if (left === 0) break;
    result[index] += 1;
    left -= 1;
  }
  return result.map((value) => value * packSize);
}

export function buildOutletOrder({ forecast = outletForecastFixture, fixture = skuFixture, order = OWNER_ORDER } = {}) {
  const coverageDays = forecast.outlets[0].days.length;
  const packSize = fixture.skus[0].casePack;
  if (fixture.skus.some((sku) => sku.casePack !== packSize)) throw new RangeError('All SKUs in this order must share one case pack.');
  const rows = fixture.plan.map((line) => {
    const sku = fixture.skus.find((item) => item.skuId === line.skuId);
    const outlet = forecast.outlets.find((item) => item.id === line.outletId);
    if (!sku || !outlet) throw new RangeError(`Unknown SKU or outlet in plan: ${line.outletId}/${line.skuId}`);
    const coverage = calculateStockCoverage(forecast, {
      outletId: line.outletId, skuLabel: sku.name, priceInr: sku.retailPriceInr,
      revenueSharePercent: line.festivalRevenueSharePct, unitsOnHand: line.unitsOnHand, coverageDays,
    });
    return { outletId: line.outletId, outlet: outlet.name, skuId: sku.skuId, sku: sku.name, unitCostInr: sku.unitCostInr,
      unitsOnHand: line.unitsOnHand, demandUnits: coverage.estimatedDemandUnits, gapUnits: coverage.gapsUnits.point };
  });
  const units = splitInPacks(order.units, packSize, rows.map((row) => row.gapUnits));
  const lines = rows.map((row, index) => ({ ...row, orderUnits: units[index], amountInr: units[index] * row.unitCostInr }));
  const totalAmountInr = lines.reduce((sum, line) => sum + line.amountInr, 0);
  const forecastGapUnits = rows.reduce((sum, row) => sum + row.gapUnits, 0);
  const byOutlet = forecast.outlets.map((outlet) => {
    const own = lines.filter((line) => line.outletId === outlet.id);
    return { outletId: outlet.id, outlet: outlet.name, address: fixture.deliveryAddresses[outlet.id],
      units: own.reduce((sum, line) => sum + line.orderUnits, 0), amountInr: own.reduce((sum, line) => sum + line.amountInr, 0) };
  });
  return {
    synthetic: true,
    label: 'Order split from the outlet forecast and SKU fixture assumptions - not observed SKU sales',
    supplierId: order.supplierId,
    deliveryDate: order.deliveryDate,
    window: forecast.window,
    orderUnits: order.units,
    totalAmountInr,
    matchesOwnerOrder: totalAmountInr === order.totalAmountInr,
    forecastGapUnits,
    note: forecastGapUnits < order.units
      ? `The forecast points to about ${forecastGapUnits} boxes short for Diwali week; the owner's ${order.units}-box order is larger, so the requested 50% buyback on unsold boxes matters.`
      : `The forecast gap of ${forecastGapUnits} boxes is at least the owner's ${order.units}-box order.`,
    lines,
    byOutlet,
    // What the delegate sends to the supplier and what the supplier must echo back.
    deliveries: lines.filter((line) => line.orderUnits > 0).map(({ outletId, skuId, orderUnits }) => ({ outletId, skuId, units: orderUnits })),
    fixtureProvenance: fixture.provenance,
  };
}

export const outletOrder = buildOutletOrder();
