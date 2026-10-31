import test from 'node:test';
import assert from 'node:assert/strict';
import { cashInputs, WORKBOOK_FIXED_COLLECTIONS, outletCollectionForecast } from '../lib/cash-inputs.js';
import {
  balanceOn, computeCashPlan, deferralAdjustment, drawdownAdjustment, minimumDrawdownInr, simpleInterestInr,
} from '../lib/cash-engine.js';

// v4 workbook data/synthetic-v4/PayTMunim_Synthetic_Data.xlsx, Cash_Plan!E5:E26 (cached values; includes Recurring_Bills).
const WORKBOOK_V4_CLOSINGS = [520000, 300000, 115000, 185000, 255000, -145000, -184500, -64500, 33500, 153500, 273500,
  393500, 513500, 611437, 731437, 851437, 967897, 1087897, 1207897, 1327897, 1447897, 1525897];
// v2 workbook data/synthetic/PayTMunim_Synthetic_Data.xlsx, Cash_Plan!D5:D26: the same bills without recurring ones.
const WORKBOOK_V2_CLOSINGS = [520000, 300000, 115000, 185000, 255000, -145000, -184500, -64500, 55500, 175500, 295500,
  415500, 535500, 655500, 775500, 895500, 1015500, 1135500, 1255500, 1375500, 1495500, 1573500];
// The arithmetic tests use the workbook's fixed collections so they can be checked against the workbook.
const workbook = { ...structuredClone(cashInputs), collectionsBasis: 'workbook_fixed', expectedCollections: structuredClone(WORKBOOK_FIXED_COLLECTIONS) };
const withChanges = (change) => { const copy = structuredClone(workbook); change(copy); return copy; };
const totalOwed = (plan) => [...plan.outflows, ...plan.afterHorizon].reduce((sum, item) => sum + item.amountInr, 0);

test('on fixed collections the engine reproduces the v4 workbook Cash_Plan closings exactly', () => {
  const plan = computeCashPlan(workbook);
  assert.equal(plan.ok, true);
  assert.deepEqual(plan.days.map((day) => day.balanceInr), WORKBOOK_V4_CLOSINGS);
  assert.deepEqual(plan.anchors, { firstNegativeDate: '2026-11-04', lowestDate: '2026-11-05', lowestBalanceInr: -184500, recoveryAboveZeroDate: '2026-11-07' });
});

test('without the v4 recurring bills it reproduces the earlier v2 workbook, so each bill is counted once', () => {
  const plan = computeCashPlan(withChanges((i) => { i.outflows = i.outflows.filter((item) => !item.id.startsWith('recurring_')); }));
  assert.deepEqual(plan.days.map((day) => day.balanceInr), WORKBOOK_V2_CLOSINGS);
  const recurring = cashInputs.outflows.filter((item) => item.id.startsWith('recurring_'));
  assert.deepEqual(recurring.map((item) => item.id), ['recurring_emi', 'recurring_electricity_dadar', 'recurring_electricity_matunga', 'recurring_electricity_sion', 'recurring_broadband']);
  // Rent, salary and GST are in upcoming_outflows.csv and must not appear twice.
  for (const category of ['rent', 'salaries', 'gst']) assert.equal(cashInputs.outflows.filter((item) => item.category === category).length, 1);
});

test('changing an input amount or date changes the result', () => {
  const base = computeCashPlan(workbook);
  const bigger = computeCashPlan(withChanges((i) => { i.outflows.find((item) => item.id === 'gupta').amountInr += 50000; }));
  assert.equal(bigger.anchors.lowestBalanceInr, base.anchors.lowestBalanceInr - 50000);
  const later = computeCashPlan(withChanges((i) => { i.outflows.find((item) => item.id === 'gupta').date = '2026-11-12'; }));
  assert.notEqual(later.anchors.lowestBalanceInr, base.anchors.lowestBalanceInr);
  assert.equal(balanceOn(later, '2026-11-05'), balanceOn(base, '2026-11-05') + 520000);
  const slower = computeCashPlan(withChanges((i) => { i.expectedCollections[1].dailyInr = 100000; }));
  assert.equal(balanceOn(slower, '2026-11-05'), balanceOn(base, '2026-11-05') - 40000);
});

test('a drawdown adds one dated inflow, is counted once and leaves the invoice fully payable', () => {
  const drawdown = drawdownAdjustment(cashInputs);
  const plan = computeCashPlan(workbook, [drawdown, drawdown, { ...drawdown }]);
  assert.equal(plan.inflows.length, 1);
  assert.equal(balanceOn(plan, '2026-11-05'), 15500);
  assert.equal(plan.anchors.lowestBalanceInr, 15500);
  assert.equal(plan.anchors.firstNegativeDate, null);
  assert.equal(plan.outflows.find((item) => item.invoiceId === 'GD-1182').amountInr, 520000);
  assert.equal(totalOwed(plan), totalOwed(computeCashPlan(workbook)));
});

test('an accepted deferral moves the agreed part to its new date instead of deleting it', () => {
  const deferral = deferralAdjustment(cashInputs, { upfrontPercent: 50, creditDays: 45, totalAmount: 520000 });
  assert.deepEqual([deferral.upfrontInr, deferral.deferredInr, deferral.newDate], [260000, 260000, '2026-12-19']);
  const plan = computeCashPlan(workbook, [deferral]);
  assert.equal(plan.outflows.find((item) => item.id === 'gupta').amountInr, 260000);
  assert.deepEqual(plan.afterHorizon.map(({ id, date, amountInr }) => [id, date, amountInr]), [['gupta_deferred', '2026-12-19', 260000]]);
  assert.equal(totalOwed(plan), totalOwed(computeCashPlan(workbook)));
  assert.equal(balanceOn(plan, '2026-11-05'), 75500);

  const inside = computeCashPlan(workbook, [deferralAdjustment(cashInputs, { upfrontPercent: 50, creditDays: 10 })]);
  assert.equal(inside.days.find((day) => day.date === '2026-11-14').knownOutflowsInr, 260000);
});

test('quotes that do not match the invoice, or move nothing, do not change the plan', () => {
  assert.equal(deferralAdjustment(cashInputs, { upfrontPercent: 50, creditDays: 45, totalAmount: 480000 }), null);
  assert.equal(deferralAdjustment(cashInputs, { upfrontPercent: 100, creditDays: 45 }), null);
  const plan = computeCashPlan(workbook, [{ id: 'bad', type: 'supplier_deferral', invoiceId: 'GD-1182', deferredInr: 600000, newDate: '2026-12-01' }]);
  assert.equal(plan.rejected.length, 1);
  assert.equal(plan.anchors.lowestBalanceInr, -184500);
});

test('a missing opening balance or collection is reported, not guessed', () => {
  const noOpening = computeCashPlan(withChanges((i) => { delete i.openingBalance; }));
  assert.equal(noOpening.ok, false);
  assert.ok(noOpening.missingInputs.some((item) => item.id === 'opening_balance'));
  assert.ok(noOpening.days.every((day) => day.balanceInr === null));
  assert.equal(noOpening.anchors.lowestBalanceInr, null);

  const gap = computeCashPlan(withChanges((i) => { i.expectedCollections[1].from = '2026-11-06'; }));
  assert.deepEqual(gap.missingInputs.map((item) => item.id), ['expected_collections_2026-11-04', 'expected_collections_2026-11-05']);
  assert.equal(balanceOn(gap, '2026-11-03'), 255000);
  assert.equal(balanceOn(gap, '2026-11-04'), null);
  assert.equal(balanceOn(gap, '2026-11-10'), null);
});

test('the smallest covering drawdown and the workbook interest estimate', () => {
  assert.equal(minimumDrawdownInr(cashInputs, computeCashPlan(workbook)), 190000);
  assert.equal(minimumDrawdownInr(cashInputs, computeCashPlan(workbook, [drawdownAdjustment(cashInputs)])), 0);
  // A shortfall before the drawdown date cannot be fixed by the drawdown.
  const early = computeCashPlan(withChanges((i) => { i.outflows.find((item) => item.id === 'patel').amountInr = 700000; }));
  assert.equal(minimumDrawdownInr(cashInputs, early), null);
  // Workbook Cash_Plan row 32: ROUND(200000 × 18.5% × 26 / 365, -2).
  assert.equal(simpleInterestInr(200000, 18.5, '2026-11-04', '2026-11-30'), 2600);
});

test('the default basis is the per-outlet forecast, summed by day', () => {
  assert.equal(cashInputs.collectionsBasis, 'outlet_forecast');
  assert.equal(cashInputs.expectedCollections.length, 22);
  cashInputs.expectedCollections.forEach((day, index) => {
    assert.equal(day.dailyInr, outletCollectionForecast.outlets.reduce((sum, outlet) => sum + outlet.days[index].pointInr, 0));
    assert.deepEqual(day.byOutlet.map((item) => item.outletId), ['DAD', 'MAT', 'SIO']);
  });
  // The Diwali uplift applies on 4-10 Nov only.
  const factor = (date) => outletCollectionForecast.outlets[0].days.find((day) => day.date === date).components.festivalFactor;
  assert.deepEqual([factor('2026-11-03'), factor('2026-11-04'), factor('2026-11-10'), factor('2026-11-11')], [1, 1.8, 1.8, 1]);
});

test('per-outlet basis: a deeper gap that needs deferral plus a small drawdown', () => {
  const plan = computeCashPlan(cashInputs);
  assert.equal(plan.ok, true);
  assert.deepEqual(plan.anchors, { firstNegativeDate: '2026-11-04', lowestDate: '2026-11-05', lowestBalanceInr: -268279, recoveryAboveZeroDate: '2026-11-08' });
  const drawdownOnly = computeCashPlan(cashInputs, [drawdownAdjustment(cashInputs)]);
  assert.equal(drawdownOnly.anchors.lowestBalanceInr, -68279);
  assert.equal(minimumDrawdownInr(cashInputs, plan), 270000);
  const deferred = computeCashPlan(cashInputs, [deferralAdjustment(cashInputs, { upfrontPercent: 50, creditDays: 45 })]);
  assert.equal(deferred.anchors.lowestBalanceInr, -8279);
  assert.equal(minimumDrawdownInr(cashInputs, deferred), 50000);
  const both = computeCashPlan(cashInputs, [deferralAdjustment(cashInputs, { upfrontPercent: 50, creditDays: 45 }), drawdownAdjustment(cashInputs, 50000)]);
  assert.ok(both.anchors.lowestBalanceInr >= 0);
});
