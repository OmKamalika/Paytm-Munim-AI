import { getFlowRuntime } from "../../../../lib/flow-runtime.js";
import { input, result } from "../http";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return result(async () => {
    const body = await input(request);
    if (Object.keys(body).some((field) => !['intentId', 'delegation'].includes(field))) throw new Error('Send only intentId and an optional owner delegation.');
    return (await getFlowRuntime()).start(body.intentId, body.delegation);
  });
}
