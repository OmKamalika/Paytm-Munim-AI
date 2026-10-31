import test from 'node:test';
import assert from 'node:assert/strict';
import { cashPlanFixture, optionsFixture, lendersFixture } from '../lib/cash-fixture.js';

test('cash plan anchors match the supplied workbook daily closings', () => {
  const { anchors } = cashPlanFixture.cashPlan;
  assert.deepEqual(anchors, {
    firstNegativeDate: '2026-11-04',
    lowestDate: '2026-11-05',
    lowestBalanceInr: -184500,
    recoveryAboveZeroDate: '2026-11-07',
  });
  assert.equal(cashPlanFixture.cashPlan.dailyBalanceSeries.length, 22);
  assert.equal(cashPlanFixture.cashPlan.dailyBalanceSeries.find((row) => row.date === '2026-11-05').balanceInr, -184500);
  assert.equal(JSON.stringify(cashPlanFixture).toLowerCase().includes('openingbalance'), false);
  assert.equal(JSON.stringify(cashPlanFixture).toLowerCase().includes('opening_liquid_cash'), false);
});

test('listed outflows retain exact amounts, dates, invoice and rent split', () => {
  const outflows = cashPlanFixture.cashPlan.outflows;
  assert.equal(outflows.length, 7);
  assert.deepEqual(outflows.map((row) => [row.id, row.date, row.amountInr, row.quality]), [
    ['patel', '2026-10-31', 290000, 'exact'],
    ['salaries', '2026-11-01', 105000, 'exact'],
    ['mehta', '2026-11-01', 150000, 'exact'],
    ['gupta', '2026-11-04', 520000, 'exact'],
    ['rent', '2026-11-05', 107000, 'exact'],
    ['bonus', '2026-11-05', 52500, 'exact'],
    ['gst', '2026-11-20', 42000, 'estimate'],
  ]);
  assert.equal(outflows.find((row) => row.id === 'gupta').invoiceId, 'GD-1182');
  assert.deepEqual(outflows.find((row) => row.id === 'rent').outletSplit, [
    { outlet: 'Dadar', amountInr: 45000 },
    { outlet: 'Matunga', amountInr: 30000 },
    { outlet: 'Sion', amountInr: 32000 },
  ]);
});

test('Paytm Home collection is separate from all-channel monthly collections', () => {
  assert.equal(cashPlanFixture.homePaytmToday.totalInr, 10140);
  assert.equal(cashPlanFixture.homePaytmToday.outlets.reduce((sum, outlet) => sum + outlet.amountInr, 0), 10140);
  assert.equal(cashPlanFixture.monthlyAllChannelCollectionsInr, 1900000);
  assert.notEqual(cashPlanFixture.homePaytmToday.channel, cashPlanFixture.monthlyCollectionsChannel);
});

test('three cost-ordered options keep the Gupta invoice full and count drawdown once', () => {
  const options = optionsFixture.options;
  assert.deepEqual(options.map((item) => item.id), ['supplier_deferral', 'drawdown', 'cut_stock']);
  assert.deepEqual(options.map((item) => item.costInr), [0, 2600, 28000]);
  assert.equal(options[0].conditional, true);
  assert.equal(options[0].effectOn5Nov.balanceInr, null);
  assert.equal(options[1].amountInr, 200000);
  assert.equal(options[1].destinationAccountMasked, '**4029');
  assert.equal(options[1].effectOn5Nov.balanceInr, 15500);
  assert.equal(options[1].effectOn5Nov.inflowCount, 1);
  assert.equal(options[1].effectOn5Nov.guptaInvoiceOutflowInr, 520000);
  assert.equal(options[2].orderReductionInr, 185000);
  assert.equal(options[2].effectOn5Nov.balanceInr, 500);
});

test('lender schedules are illustrative and each passes the 8 percent EMI cap', () => {
  assert.deepEqual(lendersFixture.emiCap, {
    monthlyCollectionsInr: 1900000,
    existingMonthlyEmiInr: 22000,
    percentage: 8,
    maxTotalMonthlyEmiInr: 152000,
  });
  assert.deepEqual(lendersFixture.offers.map(({ id, aprPercent, tenorMonths, emiInr, totalInterestInr, totalMonthlyEmiInr, underCap }) => [id, aprPercent, tenorMonths, emiInr, totalInterestInr, totalMonthlyEmiInr, underCap]), [
    ['A', 18.5, 3, 68730, 6190, 90730, true],
    ['B', 22, 3, 69130, 7390, 91130, true],
    ['C', 26.5, 6, 35960, 15760, 57960, true],
  ]);
  assert.equal(lendersFixture.offers[0].earlyRepayment.estimatedInterestInr, 2600);
  assert.equal(Object.hasOwn(lendersFixture.offers[1], 'earlyRepayment'), false);
  assert.equal(Object.hasOwn(lendersFixture.offers[2], 'earlyRepayment'), false);
  assert.ok(lendersFixture.offers.every((offer) => offer.illustrative === true));
});
