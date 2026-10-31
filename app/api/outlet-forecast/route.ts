import { outletForecastFixture } from '../../../lib/outlet-forecast-fixture.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(outletForecastFixture, { headers: { 'Cache-Control': 'no-store' } });
}
