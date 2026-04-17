import { addTaskSubtask } from "@/lib/dashboard-state";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const payload = (await request.json().catch(() => ({}))) as { title?: string };

  if (!payload.title?.trim()) {
    return NextResponse.json({ message: "Subtask title is required." }, { status: 400 });
  }

  const task = await addTaskSubtask(id, payload.title.trim());
  return NextResponse.json(task, { status: 200 });
}
