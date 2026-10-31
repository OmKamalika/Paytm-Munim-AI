import { getSimulatorStore } from '../../../../lib/simulator-store.js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return Response.json({ error: 'Send a JSON simulator request.' }, { status: 400 }); }
  try {
    const receipt = getSimulatorStore().request(body.kind);
    return Response.json({ ...receipt, synthetic: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Unknown simulator request kind.' }, { status: 400 });
  }
}
