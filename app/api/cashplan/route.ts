import { buildCashPlan } from '../../../lib/cash-fixture.js';
import { currentRelief } from '../../../lib/cash-state.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(buildCashPlan(await currentRelief()), { headers: { 'Cache-Control': 'no-store' } });
}
