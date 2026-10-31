import { getSimulatorStore } from '../../../lib/simulator-store.js';
import { activeSource } from '../../../lib/active-source.js';
import { salesSummary } from '../../../lib/sales-summary.generated.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const aaEvent = getSimulatorStore().getActiveResponse('aa');
  const aaAvailable = aaEvent?.payload?.status === 'available';
  const gupta = activeSource.supplierSummary.find((row) => row.id === 'gupta');
  const fullInvoice = activeSource.invoices.find(row => row.row === 'INV-07');
  return Response.json({
    synthetic: true,
    asOf: salesSummary.asOf,
    salesSummary,
    sources: {
      paytm: 'Paytm net sales as of 31 Oct 2026, 3:55 pm IST. Latest source transaction: 30 Oct, 12:30:07 pm IST; no 31 Oct transactions are available. The seven-day actual window is 25–31 Oct and remains incomplete.',
      allChannels: 'Supplied shift handovers; 12 complete months Oct 2025–Sep 2026.',
      bank: 'Supplied bank statement, represented as an AA sample only after simulator dispatch.',
      supplierIdentity: 'Current ReBIT narration is matched to the supplier registry; test label columns and ambiguous matches are excluded from the ceiling.',
      invoice: 'The current source includes the header-only GD-1182 photo and full 212-line PDF body; tracked tasks request the relevant evidence.',
    },
    provenance: activeSource.provenance,
    outlets: activeSource.outletMetrics.map((row) => ({
      ...row,
      paytmToday: salesSummary.today.outlets.find((outlet) => outlet.id === row.id)?.totalInr ?? null,
      paytmTodayAvailable: salesSummary.today.outlets.find((outlet) => outlet.id === row.id)?.available ?? false,
      paytmLatestAvailableAt: salesSummary.today.outlets.find((outlet) => outlet.id === row.id)?.latestAvailableAt ?? null,
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
      sourceLabel: 'Current ReBIT statement; high-confidence narration matches only',
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
