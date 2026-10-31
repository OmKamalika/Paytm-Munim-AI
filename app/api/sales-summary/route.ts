import { salesSummary } from '../../../lib/sales-summary.generated.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(salesSummary, { headers: { 'Cache-Control': 'no-store' } });
}
