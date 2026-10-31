import { getFlowRuntime } from "../../../../lib/flow-runtime.js";
import { result } from "../http";
export const dynamic = "force-dynamic";
export async function GET() { return result(async () => (await getFlowRuntime()).verify()); }
