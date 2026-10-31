import test from 'node:test';
import assert from 'node:assert/strict';
import { syntheticSource } from '../lib/synthetic-source.generated.js';
import { cashPlanFixture } from '../lib/cash-fixture.js';
import { createActionRuntime, sha256Hex } from '../lib/action-runtime.js';
import { createSimulatorStore } from '../lib/simulator-store.js';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

test('generated snapshot fingerprints match the bundled source CSVs', async () => {
  const files = {
    bankStatement: 'bank_statement.csv',
    paytmTransactions: 'paytm_transactions.csv',
    shiftHandovers: 'shift_handovers.csv',
    outlets: 'outlets.csv',
    suppliers: 'suppliers.csv',
    invoices: 'invoices.csv',
  };
  for (const [key, file] of Object.entries(files)) {
    const bytes = await readFile(new URL(`../data/synthetic/${file}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), syntheticSource.provenance.sha256[key]);
  }
});

test('supplied synthetic sources reconcile outlet productivity and Paytm Home', () => {
  assert.deepEqual(syntheticSource.provenance.rowCounts, {
    bankStatement: 7793, paytmTransactions: 114790, shiftHandovers: 3282,
    outlets: 3, suppliers: 7, invoices: 6,
  });
  assert.equal(syntheticSource.outletMetrics.reduce((sum, outlet) => sum + outlet.paytmToday, 0), 10140);
  assert.equal(syntheticSource.outletMetrics.reduce((sum, outlet) => sum + outlet.averageMonthlyAllChannelCollections, 0), 1900000);
  assert.deepEqual(syntheticSource.outletMetrics.map((outlet) => outlet.diwaliWeek2025Multiplier), [1.8, 1.5, 1.5]);
  assert.equal(syntheticSource.invoice.hasFullBody, false);
});

test('daily cash closings use the per-outlet forecast without exposing opening balance', () => {
  const series = cashPlanFixture.cashPlan.dailyBalanceSeries;
  assert.equal(series.length, 22);
  const close = (date) => series.find((row) => row.date === date)?.balanceInr;
  // Workbook-basis figures are checked in tests/cash-engine.test.js; these use the outlet forecast.
  assert.equal(close('2026-11-04'), -214966);
  assert.equal(close('2026-11-05'), -268279);
  assert.equal(close('2026-11-06'), -172243);
  assert.equal(close('2026-11-07'), -87289);
  assert.equal(close('2026-11-08'), 20400);
  assert.equal('openingBalance' in cashPlanFixture.cashPlan, false);
  assert.equal('openingBalanceInr' in cashPlanFixture.cashPlan, false);
});

test('Gupta cap uses labeled prior-FY debits only after AA simulator release', async () => {
  const gupta = syntheticSource.supplierSummary.find((row) => row.id === 'gupta');
  assert.equal(gupta.priorFyDebitCount, 49);
  assert.equal(gupta.priorFyDebitTotal, 5918310);
  assert.equal(gupta.derivedLimit, 6510141);

  const simulatorStore = createSimulatorStore();
  const supplier = simulatorStore.dispatch('supplier_clean');
  simulatorStore.request('aa');
  simulatorStore.dispatch('aa_unavailable');
  const runtime = createActionRuntime({
    pinHash: await sha256Hex(crypto.randomUUID()),
    aaDebits: syntheticSource.aaDebits,
    simulatorStore,
  });
  const action = {
    type: 'supplier_payment', supplier_id: 'gupta', amount: 260000,
    beneficiary_name: 'Gupta Distributors', beneficiary_account: 'XXXX7781',
    invoice_id: 'GD-1182', simulator_event_seq: supplier.seq,
  };
  const unavailable = await runtime.evaluate(action);
  assert.ok(unavailable.checks.some((check) => check.id === 'amount_limit' && check.status === 'NEEDS_VERIFICATION'));

  simulatorStore.dispatch('aa_available');
  const available = await runtime.evaluate(action);
  assert.ok(available.checks.some((check) => check.id === 'amount_limit' && check.status === 'PASS' && check.value === 6510141));
  assert.ok(available.checks.some((check) => check.id === 'invoice_injection' && check.status === 'NEEDS_VERIFICATION'));
  assert.equal(available.decision, 'BLOCK');

  simulatorStore.request('aa');
  const stale = await runtime.evaluate(action);
  assert.ok(stale.checks.some((check) => check.id === 'aa_response' && check.status === 'NEEDS_VERIFICATION'));
  assert.ok(stale.checks.some((check) => check.id === 'amount_limit' && check.status === 'NEEDS_VERIFICATION'));
});
