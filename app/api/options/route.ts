import { optionsFixture } from '../../../lib/cash-fixture.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(optionsFixture, { headers: { 'Cache-Control': 'no-store' } });
}
