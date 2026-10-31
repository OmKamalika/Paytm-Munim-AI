import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { outletOrder, skuFixture, buildOutletOrder, OWNER_ORDER } from '../lib/outlet-order.js';
import { revisedInvoice } from '../lib/invoice-gd-1182-r1.generated.js';
import { demoFixture } from '../lib/demo-fixture.js';

const csv = (path) => {
  const [header, ...rows] = readFileSync(new URL(`../data/synthetic-ext/${path}`, import.meta.url), 'utf8').trim().split(/\r?\n/);
  const keys = header.split(',');
  return rows.map((line) => Object.fromEntries(line.match(/("[^"]*"|[^,]*)(,|$)/g).slice(0, keys.length).map((cell, index) => [keys[index], cell.replace(/,$/, '').replace(/^"|"$/g, '')])));
};

test('the in-code SKU fixture mirrors data/synthetic-ext', () => {
  assert.deepEqual(skuFixture.skus.map((s) => [s.skuId, s.unitCostInr, s.retailPriceInr, s.casePack]),
    csv('gupta_skus.csv').map((r) => [r.sku_id, Number(r.unit_cost_inr), Number(r.retail_price_inr), Number(r.case_pack)]));
  assert.deepEqual(skuFixture.plan.map((p) => [p.outletId, p.skuId, p.festivalRevenueSharePct, p.unitsOnHand]),
    csv('outlet_sku_plan.csv').map((r) => [r.outlet_id, r.sku_id, Number(r.festival_revenue_share_pct), Number(r.units_on_hand)]));
  assert.deepEqual(Object.entries(skuFixture.deliveryAddresses), csv('outlets_delivery.csv').map((r) => [r.outlet_id, r.delivery_address]));
});

test('the owner order splits into whole case packs by outlet and SKU and keeps its value', () => {
  assert.equal(outletOrder.orderUnits, 400);
  assert.equal(outletOrder.totalAmountInr, 520000);
  assert.equal(outletOrder.matchesOwnerOrder, true);
  assert.ok(outletOrder.lines.every((line) => line.orderUnits % 5 === 0));
  assert.deepEqual(outletOrder.byOutlet.map((item) => [item.outletId, item.units, item.amountInr]), [['DAD', 220, 286000], ['MAT', 115, 149500], ['SIO', 65, 84500]]);
  // The gap that drives the weights is the Milestone 2 point gap from forecast x share / price - on hand.
  const dry = outletOrder.lines.find((line) => line.outletId === 'DAD' && line.skuId === 'GB-DRY');
  assert.equal(dry.gapUnits, dry.demandUnits.point - dry.unitsOnHand);
  assert.equal(outletOrder.forecastGapUnits, 81);
  assert.match(outletOrder.note, /buyback/);
  assert.deepEqual(demoFixture.originalIntent.deliveries, outletOrder.deliveries);
});

test('changing an outlet assumption changes the split', () => {
  const fixture = structuredClone(skuFixture);
  fixture.plan.find((p) => p.outletId === 'SIO' && p.skuId === 'GB-PUJA').festivalRevenueSharePct = 20;
  const changed = buildOutletOrder({ fixture, order: OWNER_ORDER });
  assert.ok(changed.byOutlet.find((item) => item.outletId === 'SIO').units > 65);
  assert.equal(changed.byOutlet.reduce((sum, item) => sum + item.units, 0), 400);
});

test('GD-1182-R1 is a labelled synthetic revision whose lines equal the order', () => {
  assert.equal(revisedInvoice.synthetic, true);
  assert.equal(revisedInvoice.revisionOf, 'GD-1182');
  assert.equal(revisedInvoice.hasFullBody, true);
  assert.match(revisedInvoice.provenance, /Not part of the user-supplied data/);
  assert.deepEqual(revisedInvoice.lines.map((l) => ({ outletId: l.outletId, skuId: l.skuId, units: l.units })), outletOrder.deliveries);
  assert.equal(revisedInvoice.lines.reduce((sum, l) => sum + l.amountInr, 0), revisedInvoice.amount);
  assert.equal(revisedInvoice.amount, 520000);
  assert.deepEqual([revisedInvoice.terms.upfrontInr, revisedInvoice.terms.balanceInr, revisedInvoice.terms.balanceDue], [260000, 260000, '2026-12-19']);
  assert.equal(revisedInvoice.payTo.accountLast4, '7781');
  for (const line of revisedInvoice.lines) assert.ok(revisedInvoice.fullBody.includes(`${line.skuId} ${line.description} x ${line.units}`));
});
