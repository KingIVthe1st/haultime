import { updateTask } from "@/lib/dashboard-state";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const task = await updateTask(id, payload as never);
  return NextResponse.json(task, { status: 200 });
}
