import { cashPlanFixture } from '../../../lib/cash-fixture.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(cashPlanFixture, { headers: { 'Cache-Control': 'no-store' } });
}
