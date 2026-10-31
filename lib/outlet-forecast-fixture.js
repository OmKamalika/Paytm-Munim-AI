import { syntheticSource } from './synthetic-source.generated.js';
import { buildOutletForecast } from './outlet-forecast.js';

// Compiled from the bundled synthetic handover CSV. It is independent of the
// illustrative cash-plan workbook model and has no product-level observations.
export const outletForecastFixture = buildOutletForecast(
  syntheticSource.handoverShifts,
  syntheticSource.outletMetrics,
  {
    through: '2026-10-29',
    from: '2026-11-04',
    days: 7,
    sourceHash: syntheticSource.provenance.sha256.shiftHandovers,
    closureDates: ['2025-07-09', '2026-01-12'],
  },
);
