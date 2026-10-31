import { syntheticSource } from '../../../lib/synthetic-source.generated.js';
import { getSimulatorStore } from '../../../lib/simulator-store.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const aaEvent = getSimulatorStore().getActiveResponse('aa');
  const aaAvailable = aaEvent?.payload?.status === 'available';
  const gupta = syntheticSource.supplierSummary.find((row) => row.id === 'gupta');
  return Response.json({
    synthetic: true,
    asOf: syntheticSource.asOf,
    sources: {
      paytm: 'Supplied synthetic Paytm transactions; Home is Paytm-only through 12:40 pm on 30 Oct.',
      allChannels: 'Supplied synthetic shift handovers; 12 complete months Oct 2025–Sep 2026.',
      bank: 'Supplied synthetic bank statement, represented as an AA sample only after simulator dispatch.',
      supplierIdentity: 'Payee labels are generator ground truth and are not real AA attestation; supplier account comes from the separate synthetic supplier registry.',
      invoice: 'Supplied synthetic invoice CSV contains metadata and a short description, not the full GD-1182 invoice body.',
    },
    provenance: syntheticSource.provenance,
    outlets: syntheticSource.outletMetrics.map((row) => ({
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
      limitRule: 'Prior FY same-supplier labeled synthetic bank debits × 1.10',
      aaAvailable,
      sourceLabel: 'Synthetic bank statement; payee labels are generator ground truth',
    } : null,
    invoice: {
      number: syntheticSource.invoice.number,
      amount: syntheticSource.invoice.amount,
      verifiedAccountLast4: syntheticSource.invoice.accountLast4,
      hasFullBody: syntheticSource.invoice.hasFullBody,
      integrity: syntheticSource.invoice.integrity,
      variants: syntheticSource.invoice.variants,
    },
  }, { headers: { 'Cache-Control': 'no-store' } });
}
