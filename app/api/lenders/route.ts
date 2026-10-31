import { lendersFixture } from '../../../lib/cash-fixture.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(lendersFixture, { headers: { 'Cache-Control': 'no-store' } });
}
