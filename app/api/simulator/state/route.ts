import { getSimulatorStore } from '../../../../lib/simulator-store.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(getSimulatorStore().getState(), { headers: { 'Cache-Control': 'no-store' } });
}
