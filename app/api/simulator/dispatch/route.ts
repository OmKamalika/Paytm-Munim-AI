import { getSimulatorStore } from '../../../../lib/simulator-store.js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Send a simulator scenario ID as JSON.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)
      || Object.keys(body).length !== 1
      || !('scenarioId' in body) || typeof body.scenarioId !== 'string') {
    return Response.json({ error: 'Only a simulator scenario ID is accepted.' }, { status: 400 });
  }

  try {
    const store = getSimulatorStore();
    const event = store.dispatch(body.scenarioId);
    return Response.json({ event, state: store.getState() }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof RangeError) {
      return Response.json({ error: 'Unknown simulator scenario ID.' }, { status: 400 });
    }
    throw error;
  }
}
