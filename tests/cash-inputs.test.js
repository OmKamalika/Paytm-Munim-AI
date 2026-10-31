import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { cashInputs, CASH_INPUT_SOURCES, outletCollectionForecast } from '../lib/cash-inputs.js';

const root = new URL('../', import.meta.url);
function csv(path) {
  const [header, ...rows] = readFileSync(new URL(path, root), 'utf8').trim().split(/\r?\n/);
  const keys = header.split(',');
  return rows.map((line) => {
    const cells = line.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((cell) => cell.replace(/,$/, '').replace(/^"|"$/g, ''));
    return Object.fromEntries(keys.map((key, index) => [key, cells[index]]));
  });
}

test('every upcoming outflow in the CSV is mapped with the same date and amount', () => {
  const source = csv(CASH_INPUT_SOURCES.upcomingOutflows);
  for (const row of source) {
    const mapped = cashInputs.outflows.find((item) => item.sourceId === row.outflow_id);
    assert.ok(mapped, `${row.outflow_id} is mapped`);
    assert.equal(mapped.date, row.due_date);
    assert.equal(mapped.amountInr, Number(row.amount_inr));
    if (row.invoice_no) assert.equal(mapped.invoiceId, row.invoice_no);
  }
});

test('the existing EMI comes from existing_emis.csv on its debit day', () => {
  const [emi] = csv(CASH_INPUT_SOURCES.existingEmis);
  const mapped = cashInputs.outflows.find((item) => item.sourceId === emi.loan_id);
  assert.equal(mapped.amountInr, Number(emi.emi_inr));
  assert.equal(Number(mapped.date.slice(8)), Number(emi.debit_day));
  assert.ok(mapped.date <= emi.ends_on);
});

test('only supplied dated bills and four explicit recurring utility estimates become outflows', () => {
  const sourceIds = new Set([
    ...csv(CASH_INPUT_SOURCES.upcomingOutflows).map((row) => row.outflow_id),
    ...csv(CASH_INPUT_SOURCES.existingEmis).map((row) => row.loan_id),
    'recurring:electricity_dadar', 'recurring:electricity_matunga', 'recurring:electricity_sion', 'recurring:broadband',
  ]);
  assert.deepEqual(cashInputs.outflows.map((item) => item.sourceId).filter((id) => !sourceIds.has(id)), []);
});

test('the opening balance is the 29 Oct bank close plus till cash, as in workbook Cash_Plan!B2', () => {
  const bank = csv(CASH_INPUT_SOURCES.openingSnapshotBankStatement);
  const last = bank.at(-1);
  assert.equal(last.txnId, 'BNK007793');
  const bankClose = cashInputs.openingBalance.components.find((item) => item.id === 'bank_close_29_oct');
  assert.equal(bankClose.amountInr, Number(last.currentBalance));
  const till = cashInputs.openingBalance.components.find((item) => item.id === 'till_cash_29_oct');
  // Workbook Assumptions!B6 (the value is recorded here; the workbook is not parsed in tests).
  assert.equal(till.amountInr, 95844);
  assert.equal(cashInputs.openingBalance.amountInr, Math.round(bankClose.amountInr + till.amountInr));
});

test('expected collections cover every day of the horizon exactly once', () => {
  for (let date = cashInputs.horizon.start; date <= cashInputs.horizon.end;) {
    assert.equal(cashInputs.expectedCollections.filter((band) => band.from <= date && date <= band.to).length, 1, date);
    date = new Date(Date.parse(`${date}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);
  }
});

test('the cash collection forecast fingerprints the active v4 shift evidence', () => {
  const bytes = readFileSync(new URL('data/synthetic-v4/csv/shift_handovers.csv', root));
  const hash = createHash('sha256').update(bytes).digest('hex');
  assert.equal(outletCollectionForecast.source.sourceHash, hash);
  assert.equal(CASH_INPUT_SOURCES.historicalCollections, 'data/synthetic-v4/csv/shift_handovers.csv');
  assert.equal(CASH_INPUT_SOURCES.recurringBills, 'data/synthetic-v4/csv/bank_statement.csv');
});

test('v4 recurring utilities enter once on their estimated due dates without duplicating planned bills', () => {
  const utilities = cashInputs.outflows.filter((bill) => bill.category === 'utilities');
  assert.deepEqual(utilities.map(({ id, date, amountInr, quality }) => [id, date, amountInr, quality]), [
    ['electricity_dadar', '2026-11-12', 9466, 'estimate'],
    ['electricity_matunga', '2026-11-12', 6910, 'estimate'],
    ['electricity_sion', '2026-11-12', 5687, 'estimate'],
    ['broadband', '2026-11-15', 3540, 'estimate'],
  ]);
  for (const category of ['emi', 'rent', 'salaries', 'gst']) {
    assert.equal(cashInputs.outflows.filter((bill) => bill.category === category).length, 1, category);
  }
});

test('the retained workbook opening is identified as a historical scenario snapshot', () => {
  assert.equal(cashInputs.openingBalance.amountInr, 450000);
  assert.match(cashInputs.openingBalance.source ?? '', /historical workbook/i);
  assert.match(cashInputs.openingBalance.source ?? '', /not.*v4 bank balance/i);
  assert.doesNotMatch(cashInputs.notSupplied.find((item) => item.id === 'sku_stock').note, /no.*invoice line data exists/i);
});
