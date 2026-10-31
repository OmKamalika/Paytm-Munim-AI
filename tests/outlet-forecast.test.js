import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregateDailyCollections, buildOutletForecast, calculateStockCoverage } from '../lib/outlet-forecast.js';
import { syntheticSource } from '../lib/synthetic-source.generated.js';
import { cashPlanFixture } from '../lib/cash-fixture.js';

const shift = (date, outletId, shiftName, amount, status = 'CLOSED') => ({
  date, outletId, shift: shiftName, status, collectedTotalInr: amount,
});

test('complete days need both closed shifts; a missing shift is not a zero-sales day', () => {
  const rows = [
    shift('2026-10-26', 'DAD', 'Morning', 100), shift('2026-10-26', 'DAD', 'Evening', 150),
    shift('2026-10-27', 'DAD', 'Morning', 80),
    shift('2026-10-28', 'DAD', 'Morning', 0, 'CLOSED_BANDH'), shift('2026-10-28', 'DAD', 'Evening', 0, 'CLOSED_BANDH'),
    shift('2026-10-29', 'DAD', 'Morning', 200, 'OPEN'), shift('2026-10-29', 'DAD', 'Evening', 200),
    shift('2026-10-30', 'DAD', 'Morning', 999), shift('2026-10-30', 'DAD', 'Evening', 999),
  ];
  const result = aggregateDailyCollections(rows, {
    through: '2026-10-29', closureDates: ['2026-10-28'],
  });
  assert.deepEqual(result.complete, [{ date: '2026-10-26', outletId: 'DAD', amountInr: 250 }]);
  assert.deepEqual(result.closures, [{ date: '2026-10-28', outletId: 'DAD' }]);
  assert.deepEqual(result.incomplete.map((item) => item.date), ['2026-10-27', '2026-10-29']);
  assert.equal(result.complete.some((item) => item.date === '2026-10-30'), false);
  const withExpectedDates = aggregateDailyCollections(rows, {
    from: '2026-10-25', through: '2026-10-29', outletIds: ['DAD'], closureDates: ['2026-10-28'],
  });
  assert.ok(withExpectedDates.incomplete.some((item) => item.date === '2026-10-25' && item.reason === 'no_handover_rows'));
});

test('seven-day forecast is source-backed, ordered, and separate from cash-plan anchors', () => {
  const before = JSON.stringify(cashPlanFixture.cashPlan.anchors);
  const result = buildOutletForecast(syntheticSource.handoverShifts, syntheticSource.outletMetrics, {
    through: '2026-10-29', from: '2026-11-04', days: 7,
    sourceHash: syntheticSource.provenance.sha256.shiftHandovers,
    closureDates: ['2025-07-09', '2026-01-12'],
  });
  assert.equal(result.modelVersion, 'outlet-velocity-v1');
  assert.deepEqual(result.window, { from: '2026-11-04', to: '2026-11-10' });
  assert.equal(result.source.closuresExcluded, 6);
  assert.equal(result.source.incompleteOutletDays, 0);
  assert.equal(result.outlets.length, 3);
  assert.deepEqual(result.outlets.map((item) => item.festivalUplift.factor), [1.8, 1.5, 1.5]);
  for (const outlet of result.outlets) {
    assert.equal(outlet.days.length, 7);
    assert.ok(outlet.historyDays > 500);
    assert.ok(outlet.trendFactor >= 0.85 && outlet.trendFactor <= 1.15);
    for (const day of outlet.days) {
      assert.equal(day.label, 'estimate');
      assert.ok(day.lowInr <= day.pointInr && day.pointInr <= day.highInr);
      assert.equal(day.components.festivalFactor, outlet.festivalUplift.factor);
    }
    assert.equal(outlet.total.pointInr, outlet.days.reduce((total, day) => total + day.pointInr, 0));
  }
  assert.equal(JSON.stringify(cashPlanFixture.cashPlan.anchors), before);
  assert.equal(JSON.stringify(result).includes('estimatedDemandUnits'), false);
});

test('stock unit proxy requires owner assumptions and never creates an order', () => {
  const forecast = {
    modelVersion: 'outlet-velocity-v1', window: { from: '2026-11-04', to: '2026-11-10' },
    outlets: [{ id: 'DAD', name: 'Dadar', days: [
      { date: '2026-11-04', lowInr: 800, pointInr: 1000, highInr: 1200 },
      { date: '2026-11-05', lowInr: 800, pointInr: 1000, highInr: 1200 },
    ] }],
  };
  const request = { outletId: 'DAD', skuLabel: 'Gift box', priceInr: 100, revenueSharePercent: 25, unitsOnHand: 1, coverageDays: 2 };
  const result = calculateStockCoverage(forecast, request);
  assert.deepEqual(result.estimatedDemandUnits, { low: 4, point: 5, high: 6 });
  assert.deepEqual(result.gapsUnits, { low: 3, point: 4, high: 5 });
  assert.equal(result.state, 'likely_shortage');
  assert.equal(result.recommendedReviewUnits, 4);
  assert.equal(result.label, 'owner assumption + payment proxy');
  assert.deepEqual(result.horizon, { from: '2026-11-04', to: '2026-11-05', coverageDays: 2 });
  assert.equal(result.assumptions.coverageDays, 2);
  assert.equal('leadDays' in result.assumptions, false);
  assert.equal('order' in result, false);
  assert.equal(calculateStockCoverage(forecast, { ...request, unitsOnHand: 7 }).state, 'possible_surplus');
  assert.equal(calculateStockCoverage(forecast, { ...request, unitsOnHand: 5 }).state, 'monitor');
});

test('invalid stock assumptions fail without a unit estimate', () => {
  const forecast = { modelVersion: 'outlet-velocity-v1', window: { from: '2026-11-04', to: '2026-11-10' }, outlets: [{ id: 'DAD', name: 'Dadar', days: [{ date: '2026-11-04', lowInr: 100, pointInr: 150, highInr: 200 }] }] };
  const good = { outletId: 'DAD', priceInr: 100, revenueSharePercent: 20, unitsOnHand: 0, coverageDays: 1 };
  for (const wrong of [
    { outletId: 'UNKNOWN' }, { priceInr: 0 }, { priceInr: 1.5 }, { revenueSharePercent: 0 },
    { revenueSharePercent: 101 }, { unitsOnHand: -1 }, { unitsOnHand: 1.5 }, { coverageDays: 8 },
    { coverageDays: undefined, leadDays: 1 },
  ]) assert.throws(() => calculateStockCoverage(forecast, { ...good, ...wrong }), RangeError);
});
