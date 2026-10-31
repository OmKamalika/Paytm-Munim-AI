import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildSalesSummary, DEMO_AS_OF } from '../lib/sales-summary.js';
import { salesSummary } from '../lib/sales-summary.generated.js';
import { parseSalesCsv } from '../scripts/derive-sales-summary.mjs';

const transaction = (id, at, amount, changes = {}) => ({ txn_id: id, txn_timestamp: at, outlet_id: 'DAD', txn_type: 'PAYMENT', amount_inr: amount, ...changes });

test('actual sales include the exact cutoff and exclude later transactions and dates outside the seven-day range', () => {
  const summary = buildSalesSummary([
    transaction('before-range', '2026-10-24T23:59:59+05:30', 900),
    transaction('first-range', '2026-10-25T00:00:00+05:30', 100),
    transaction('today', '2026-10-31T09:00:00+05:30', 200),
    transaction('exact-cutoff', '2026-10-31T15:55:00+05:30', 300),
    transaction('after-cutoff', '2026-10-31T15:55:01+05:30', 800),
    transaction('future-day', '2026-11-01T10:00:00+05:30', 700),
  ]);
  assert.equal(summary.asOf, '2026-10-31T15:55:00+05:30');
  assert.equal(summary.today.date, '2026-10-31');
  assert.equal(summary.today.totalInr, 500);
  assert.equal(summary.today.transactionCount, 2);
  assert.equal(summary.last7Days.from, '2026-10-25');
  assert.equal(summary.last7Days.to, '2026-10-31');
  assert.equal(summary.last7Days.totalInr, 600);
  assert.equal(summary.last7Days.transactionCount, 3);
  assert.equal(summary.latestAvailableAt, '2026-10-31T15:55:00+05:30');
});

test('calendar days use IST even when the source timestamp uses UTC', () => {
  const summary = buildSalesSummary([
    transaction('previous-day', '2026-10-30T18:29:59Z', 10),
    transaction('today-midnight', '2026-10-30T18:30:00Z', 20),
    transaction('same-cutoff-utc', '2026-10-31T10:25:00Z', 30),
    transaction('after-cutoff-utc', '2026-10-31T10:25:00.001Z', 400),
  ]);
  assert.equal(summary.today.totalInr, 50);
  assert.equal(summary.today.transactionCount, 2);
  assert.equal(summary.last7Days.totalInr, 60);
  assert.equal(summary.latestAvailableAt, '2026-10-31T15:55:00+05:30');
});

test('missing current-day rows remain unavailable and expose the latest data age instead of prior-day sales', () => {
  const summary = buildSalesSummary([transaction('yesterday', '2026-10-30T12:30:07+05:30', 4980)]);
  assert.equal(summary.today.available, false);
  assert.equal(summary.today.totalInr, null);
  assert.equal(summary.today.transactionCount, null);
  assert.equal(summary.today.outlets.every((outlet) => !outlet.available && outlet.totalInr === null), true);
  assert.equal(summary.latestAvailableAt, '2026-10-30T12:30:07+05:30');
  assert.equal(summary.dataThrough, '2026-10-30');
  assert.equal(summary.dataAgeMinutes, 1644);
  assert.equal(summary.last7Days.complete, false);
  assert.deepEqual(summary.last7Days.coverage.missingDates, ['2026-10-25', '2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-31']);
  assert.equal(summary.last7Days.totalInr, 4980);
});

test('malformed, unknown, unsuccessful and duplicate rows cannot enter sales totals or latest data time', () => {
  const rows = [transaction('good', '2026-10-31T10:00:00+05:30', '100.25', { status: 'SUCCESS' })];
  rows.push(rows[0], null,
    transaction('unknown-outlet', '2026-10-31T15:00:00+05:30', 800, { outlet_id: 'PUN' }),
    transaction('bad-calendar', '2026-02-30T10:00:00+05:30', 800),
    transaction('bad-hour', '2026-10-31T25:00:00+05:30', 800),
    transaction('no-offset', '2026-10-31T15:00:00', 800),
    transaction('wrong-date', '2026-10-31T15:00:00+05:30', 800, { txn_date: '2026-10-30' }),
    transaction('failed', '2026-10-31T15:00:00+05:30', 800, { txn_status: 'FAILED' }),
    transaction('pending', '2026-10-31T15:00:00+05:30', 800, { payment_status: 'PENDING' }),
    transaction('unknown-type', '2026-10-31T15:00:00+05:30', 800, { txn_type: 'ADJUSTMENT' }),
    transaction('bad-amount', '2026-10-31T15:00:00+05:30', '100oops'),
    transaction('negative-sale', '2026-10-31T15:00:00+05:30', -10),
    transaction('positive-refund', '2026-10-31T15:00:00+05:30', 10, { txn_type: 'REFUND' }),
    transaction('', '2026-10-31T15:00:00+05:30', 800));
  const summary = buildSalesSummary(rows);
  assert.equal(summary.today.totalInr, 100.25);
  assert.equal(summary.today.transactionCount, 1);
  assert.equal(summary.latestAvailableAt, '2026-10-31T10:00:00+05:30');
});

test('net sales subtract explicit refunds and preserve payment and refund counts per outlet', () => {
  const summary = buildSalesSummary([
    transaction('dadar-sale', '2026-10-31T10:00:00+05:30', '200.50'),
    transaction('dadar-refund', '2026-10-31T10:01:00+05:30', '-40.25', { txn_type: 'REFUND', status: 'COMPLETED' }),
    transaction('sion-sale', '2026-10-31T10:02:00+05:30', 30, { outlet_id: 'SIO' }),
  ]);
  assert.equal(summary.today.totalInr, 190.25);
  assert.equal(summary.today.paymentCount, 2);
  assert.equal(summary.today.refundCount, 1);
  assert.equal(summary.today.transactionCount, 3);
  assert.equal(summary.today.outlets.find((outlet) => outlet.id === 'DAD').totalInr, 160.25);
  assert.equal(summary.today.outlets.find((outlet) => outlet.id === 'MAT').totalInr, null);
});

test('historical cutoffs are supported and an as-of beyond the fixed demo time is rejected', () => {
  const summary = buildSalesSummary([
    transaction('morning', '2026-10-30T09:00:00+05:30', 50),
    transaction('later', '2026-10-30T11:00:00+05:30', 100),
  ], { asOf: '2026-10-30T10:00:00+05:30' });
  assert.equal(summary.today.date, '2026-10-30');
  assert.equal(summary.today.totalInr, 50);
  assert.throws(() => buildSalesSummary([], { asOf: '2026-11-01T00:00:00+05:30' }), /as-of|cutoff/i);
  assert.throws(() => buildSalesSummary([], { asOf: 'yesterday' }), /as-of|timestamp/i);
  const empty = buildSalesSummary([]);
  assert.equal(empty.today.totalInr, null);
  assert.equal(empty.last7Days.totalInr, null);
  assert.equal(empty.latestAvailableAt, null);
});

test('the compact actual-sales snapshot reproduces archived source rows without future data or prior-day relabeling', async () => {
  const path = new URL('../data/synthetic-v4/csv/paytm_transactions.csv', import.meta.url);
  const bytes = await readFile(path);
  const summary = buildSalesSummary(parseSalesCsv(bytes.toString('utf8')));
  assert.equal(DEMO_AS_OF, '2026-10-31T15:55:00+05:30');
  assert.deepEqual(salesSummary, { ...summary, provenance: { source: 'csv/paytm_transactions.csv', sha256: createHash('sha256').update(bytes).digest('hex'), rowCount: 120705 } });
  assert.equal(summary.today.available, false);
  assert.equal(summary.last7Days.totalInr, 93649);
  assert.equal(summary.last7Days.transactionCount, 1249);
  assert.equal(summary.last7Days.paymentCount, 1247);
  assert.equal(summary.last7Days.refundCount, 2);
  assert.deepEqual(summary.last7Days.outlets.map((outlet) => [outlet.id, outlet.totalInr]), [['DAD', 43411], ['MAT', 30594], ['SIO', 19644]]);
  assert.deepEqual(summary.last7Days.coverage.missingDates, ['2026-10-31']);
  assert.equal(summary.last7Days.complete, false);
  assert.ok(JSON.stringify(salesSummary).length < 15000);
});

test('the importer reads quoted fields and rejects mismatched CSV columns', () => {
  assert.deepEqual(parseSalesCsv('txn_id,note\r\nT1,"two, fields"\r\nT2,"an ""escaped"" quote"\r\n'), [
    { txn_id: 'T1', note: 'two, fields' }, { txn_id: 'T2', note: 'an "escaped" quote' },
  ]);
  assert.throws(() => parseSalesCsv('a,b\n1,2,3\n'), /column/i);
  assert.throws(() => parseSalesCsv('a,b\n1,"unterminated\n'), /unterminated/i);
});
