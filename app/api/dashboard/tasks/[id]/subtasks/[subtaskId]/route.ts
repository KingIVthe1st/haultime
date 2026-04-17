import { updateTaskSubtask } from "@/lib/dashboard-state";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string; subtaskId: string }> },
) {
  const { id, subtaskId } = await context.params;
  const payload = (await request.json().catch(() => ({}))) as { title?: string; done?: boolean };
  const task = await updateTaskSubtask(id, subtaskId, payload);
  return NextResponse.json(task, { status: 200 });
}
