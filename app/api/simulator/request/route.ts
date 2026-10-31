import { retired } from "../../disabled";

export const dynamic = "force-dynamic";

// The old single-step simulator is retired; /simulator answers tracked requests only.
export async function POST() {
  return retired("POST /api/simulator/request");
}
