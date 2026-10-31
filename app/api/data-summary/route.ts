import { getSimulatorStore } from '../../../lib/simulator-store.js';
import { getFlowRuntime } from '../../../lib/flow-runtime.js';
import { activeSource } from '../../../lib/active-source.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const aaEvent = getSimulatorStore().getActiveResponse('aa');
  const aaAvailable = aaEvent?.payload?.status === 'available';
  // Bank history is released only after a tracked run received an available AA response.
  const aaAvailable = (await (await getFlowRuntime()).getLedger()).aaReleased;
  const gupta = activeSource.supplierSummary.find((row) => row.id === 'gupta');
  const fullInvoice = activeSource.invoices.find(row => row.row === 'INV-07');
  return Response.json({
    synthetic: true,
    asOf: activeSource.asOf,
    sources: {
      paytm: 'Supplied synthetic Paytm transactions; Home is Paytm-only through 12:40 pm on 30 Oct.',
      allChannels: 'Supplied synthetic shift handovers; 12 complete months Oct 2025–Sep 2026.',
      bank: 'Supplied synthetic bank statement, represented as an AA sample only after simulator dispatch.',
      bank: 'Supplied synthetic bank statement, released to the guard only after a tracked run receives an available AA response.',
      supplierIdentity: 'Current ReBIT narration is matched to the supplier registry; test label columns and ambiguous matches are excluded from the ceiling.',
      invoice: 'The current source includes the header-only GD-1182 photo and full 212-line PDF body; tracked tasks request the relevant evidence.',
    },
    provenance: activeSource.provenance,
    outlets: activeSource.outletMetrics.map((row) => ({
      ...row,
      paytmAverageMonthly: row.averageMonthlyPaytmCollections,
      diwaliWeek2025Multiplier: row.diwaliWeek2025Multiplier,
    })),
    supplier: gupta ? {
      id: gupta.id,
      name: gupta.name,
      priorFyDebitCount: aaAvailable ? gupta.priorFyDebitCount : null,
      priorFyDebitTotal: aaAvailable ? gupta.priorFyDebitTotal : null,
      derivedLimit: aaAvailable ? gupta.derivedLimit : null,
      limitRule: 'Clearly matched prior-FY same-supplier bank debits × 1.10',
      aaAvailable,
      sourceLabel: 'Current synthetic ReBIT statement; high-confidence narration matches only',
      completeFinancialYear: activeSource.provenance.fyCoverage.completeFinancialYear,
      missingPeriod: activeSource.provenance.fyCoverage.missingPeriod,
    } : null,
    invoice: {
      number: fullInvoice?.number || 'GD-1182',
      amount: fullInvoice?.totalInr || 520000,
      verifiedAccountLast4: fullInvoice?.accountLast4 || '7781',
      hasFullBody: true,
      integrity: 'Header-only and full-body versions are available; payment evidence is checked within the tracked request.',
      variants: activeSource.invoices.map(row => ({ row: row.row, number: row.number, lines: row.lineCount, status: row.evidence.status })),
    },
    procurement: {
      description: activeSource.procurementEstimates.description,
      productsInDocuments: activeSource.procurementEstimates.products.length,
      sample: activeSource.procurementEstimates.products.filter(row => /gift|diya|rangoli|chocolate/i.test(row.description)).slice(0, 6),
    },
  }, { headers: { 'Cache-Control': 'no-store' } });
}
