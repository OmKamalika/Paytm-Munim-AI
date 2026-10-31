import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { cashInputs } from '../lib/cash-inputs.js';

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
  const source = csv('data/synthetic/upcoming_outflows.csv');
  for (const row of source) {
    const mapped = cashInputs.outflows.find((item) => item.sourceId === row.outflow_id);
    assert.ok(mapped, `${row.outflow_id} is mapped`);
    assert.equal(mapped.date, row.due_date);
    assert.equal(mapped.amountInr, Number(row.amount_inr));
    if (row.invoice_no) assert.equal(mapped.invoiceId, row.invoice_no);
  }
});

test('the existing EMI comes from existing_emis.csv on its debit day', () => {
  const [emi] = csv('data/synthetic/existing_emis.csv');
  const mapped = cashInputs.outflows.find((item) => item.sourceId === emi.loan_id);
  assert.equal(mapped.amountInr, Number(emi.emi_inr));
  assert.equal(Number(mapped.date.slice(8)), Number(emi.debit_day));
  assert.ok(mapped.date <= emi.ends_on);
});

test('only mapped sources become outflows: nothing is read from bank-debit history', () => {
  const sourceIds = new Set([...csv('data/synthetic/upcoming_outflows.csv').map((row) => row.outflow_id), ...csv('data/synthetic/existing_emis.csv').map((row) => row.loan_id)]);
  assert.deepEqual(cashInputs.outflows.map((item) => item.sourceId).filter((id) => !sourceIds.has(id)), []);
});

test('the opening balance is the 29 Oct bank close plus till cash, as in workbook Cash_Plan!B2', () => {
  const bank = csv('data/synthetic/bank_statement.csv');
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
