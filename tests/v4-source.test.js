import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { activeSource } from '../lib/active-source.js';
import { validateXmlJsonMirror, deriveGstEvidence } from '../lib/v4-evidence.js';

test('active v4 source is complete, fingerprinted, and derived independently from narration', async () => {
  assert.equal(activeSource.version, 'v4');
  assert.equal(activeSource.provenance.files.length, 38);
  for (const item of activeSource.provenance.files) {
    const bytes = await readFile(new URL(`../data/synthetic-v4/${item.path}`, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256);
  }
  assert.deepEqual(activeSource.provenance.rowCounts, { bankTransactions: 8293, paytmTransactions: 120705, shiftHandovers: 3462, suppliers: 7, invoiceDocuments: 7, invoiceLines: 710, billUploads: 9, gstReturns: 19, gstFiledPeriods: 18 });
  assert.equal(activeSource.provenance.fyCoverage.completeFinancialYear, true);
  assert.equal(activeSource.provenance.fyCoverage.from, '2025-04-01');
  assert.equal(activeSource.provenance.fyCoverage.missingPeriod, null);
  assert.equal(activeSource.bankAccount.maskedAccNumber, 'XXXXXXXX4029');
  const gupta = activeSource.supplierSummary.find(row => row.id === 'gupta');
  assert.equal(gupta.priorFyDebitCount, 53);
  assert.equal(gupta.priorFyDebitTotal, 6286960);
  assert.equal(gupta.conservativeObservedLimit, 6915656);
  assert.ok(activeSource.aaDebits.filter(row => row.supplier_id === 'gupta').every(row => row.notBankAttested));
  assert.equal(activeSource.outletMetrics.reduce((sum, row) => sum + row.paytmToday, 0), 10140);
  assert.equal(activeSource.outletMetrics.reduce((sum, row) => sum + row.averageMonthlyAllChannelCollections, 0), 1900000);
});

test('actual AA GST evidence has eighteen filed periods and carries the schema caveat', () => {
  assert.equal(activeSource.gstReturnsFiled.length, 18);
  assert.equal(activeSource.gstHistorySummary.filingMonths, 18);
  assert.equal(activeSource.gstHistorySummary.from, '2025-04');
  assert.equal(activeSource.gstHistorySummary.to, '2026-09');
  assert.equal(activeSource.gstHistorySummary.fullXsdValidation, false);
  assert.match(activeSource.gstHistorySummary.validationCaveat, /no complete ReBIT XSD validation/i);
  assert.equal(activeSource.gstHistorySummary.validatedStructure, true);
  assert.equal(activeSource.gstHistorySummary.b2bInvoiceCount, 85);
  assert.equal(activeSource.gstProfile.taxpayerType, 'Regular');
  assert.equal(activeSource.gstProfile.status, 'Active');
  assert.ok(activeSource.gstReturnsFiled.every(row => row.period < '2026-10'));
  assert.ok(activeSource.gstHistorySummary.filingMonths < 24);
});

test('XML and JSON mirrors compare source fields and expose tampering', async () => {
  const base = new URL('../data/synthetic-v4/rebit/', import.meta.url);
  const deposit = JSON.parse(await readFile(new URL('deposit_v2.0.0.json', base), 'utf8'));
  const depositXml = await readFile(new URL('deposit_v2.0.0.xml', base), 'utf8');
  assert.equal(validateXmlJsonMirror(depositXml, deposit.Account, 'http://api.rebit.org.in/FISchema/deposit').ok, true);
  deposit.Account.Transactions.Transaction[0].amount = '999999';
  assert.equal(validateXmlJsonMirror(depositXml, deposit.Account, 'http://api.rebit.org.in/FISchema/deposit').ok, false);
  const gst = JSON.parse(await readFile(new URL('gstr1_3b_v1.1.0.json', base), 'utf8'));
  const gstXml = await readFile(new URL('gstr1_3b_v1.1.0.xml', base), 'utf8');
  assert.equal(validateXmlJsonMirror(gstXml, gst.Account, 'http://api.rebit.org.in/FISchema/gstr1_3b').ok, true);
  assert.equal(validateXmlJsonMirror(gstXml.replace('ret_prd="042025"', 'ret_prd="42025"'), gst.Account, 'http://api.rebit.org.in/FISchema/gstr1_3b').ok, false);
  gst.Account.Transactions.Gstr3bDetails.gstr3b[0].status = 'Pending';
  assert.equal(validateXmlJsonMirror(gstXml, gst.Account, 'http://api.rebit.org.in/FISchema/gstr1_3b').ok, false);
  assert.equal(deriveGstEvidence(gst).gstHistorySummary.filingMonths, 17);
});
