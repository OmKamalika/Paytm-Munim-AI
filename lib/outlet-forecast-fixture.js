import { activeSource } from './active-source.js';
import { buildOutletForecast } from './outlet-forecast.js';

// Compiled from the bundled synthetic handover CSV. It is independent of the
// illustrative cash-plan workbook model and has no product-level observations.
export const outletForecastFixture = buildOutletForecast(
  activeSource.handoverShifts,
  activeSource.outletMetrics,
  {
    through: '2026-10-29',
    from: '2026-11-04',
    days: 7,
    sourceHash: activeSource.provenance.files.find(file => file.path === 'csv/shift_handovers.csv')?.sha256,
    closureDates: ['2025-07-09', '2026-01-12'],
  },
);
