import { getFlowRuntime } from "../../../../lib/flow-runtime.js";
import { input, result } from "../http";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return result(async () => (await getFlowRuntime()).respond(await input(request)));
}
