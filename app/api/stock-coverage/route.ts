import { outletForecastFixture } from '../../../lib/outlet-forecast-fixture.js';
import { calculateStockCoverage } from '../../../lib/outlet-forecast.js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let input: unknown;
  try { input = await request.json(); }
  catch { return Response.json({ error: 'Send owner stock assumptions as JSON.' }, { status: 400 }); }
  try {
    const result = calculateStockCoverage(outletForecastFixture, input);
    return Response.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof RangeError) return Response.json({ error: error.message }, { status: 400 });
    throw error;
  }
}
