import { getFlowRuntime } from "../../../../lib/flow-runtime.js";
import { input, result } from "../http";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return result(async () => (await getFlowRuntime()).consent(await input(request)));
}
