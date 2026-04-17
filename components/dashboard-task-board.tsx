"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormEvent, useMemo, useState } from "react";
import type { TaskPriority, TaskRecord, TaskStatus, TaskSubtask } from "@/lib/dashboard-state";

const columns: Array<{ key: TaskStatus; label: string; note: string }> = [
  { key: "now", label: "Now", note: "Do these before the board gets noisy." },
  { key: "next", label: "Next up", note: "Queued behind the current close-critical work." },
  { key: "waiting", label: "Waiting", note: "Blocked, delegated, or date-dependent." },
  { key: "done", label: "Done", note: "Completed work and proof of motion." },
];

const priorities: TaskPriority[] = ["critical", "high", "normal", "low"];

function groupTasks(tasks: TaskRecord[]) {
  return columns.reduce(
    (acc, column) => {
      acc[column.key] = tasks.filter((task) => task.status === column.key).sort((a, b) => a.position - b.position);
      return acc;
    },
    { now: [] as TaskRecord[], next: [] as TaskRecord[], waiting: [] as TaskRecord[], done: [] as TaskRecord[] },
  );
}

function percentDone(subtasks: TaskSubtask[]) {
  if (!subtasks.length) return 0;
  return Math.round((subtasks.filter((subtask) => subtask.done).length / subtasks.length) * 100);
}

function formatDate(input?: string) {
  if (!input) return "No date";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
  }).format(new Date(input));
}

function SortableTaskCard({ task, active, onSelect }: { task: TaskRecord; active: boolean; onSelect: (taskId: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id, data: { status: task.status } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const donePercent = percentDone(task.subtasks);

  return (
    <button
      ref={setNodeRef}
      style={style}
      type="button"
      className={active ? "taskCard active" : "taskCard"}
      onClick={() => onSelect(task.id)}
      {...attributes}
      {...listeners}
      data-dragging={isDragging ? "true" : "false"}
    >
      <div className="taskCardTop">
        <strong>{task.title}</strong>
        <span className={`taskPriority taskPriority${task.priority}`}>{task.priority}</span>
      </div>
      <p>{task.description || "No extra note yet."}</p>
      <div className="taskCardMeta">
        <span>{task.owner || "Shared"}</span>
        <span>{task.dueDate ? formatDate(task.dueDate) : "No due date"}</span>
      </div>
      {task.subtasks.length ? (
        <div className="taskProgress">
          <span>{task.subtasks.filter((item) => item.done).length}/{task.subtasks.length} subtasks</span>
          <div className="taskProgressBar"><i style={{ width: `${donePercent}%` }} /></div>
        </div>
      ) : null}
    </button>
  );
}

function TaskLane({
  column,
  tasks,
  selectedId,
  onSelect,
}: {
  column: (typeof columns)[number];
  tasks: TaskRecord[];
  selectedId: string | null;
  onSelect: (taskId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.key, data: { status: column.key } });

  return (
    <div ref={setNodeRef} className="taskLane" id={column.key} data-over={isOver ? "true" : "false"}>
      <div className="taskLaneHead">
        <div>
          <strong>{column.label}</strong>
          <p>{column.note}</p>
        </div>
        <span>{tasks.length}</span>
      </div>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="taskLaneStack">
          {tasks.length ? (
            tasks.map((task) => <SortableTaskCard key={task.id} task={task} active={selectedId === task.id} onSelect={onSelect} />)
          ) : (
            <div className="taskLaneEmpty">Nothing parked here yet.</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export function DashboardTaskBoard({ initialTasks }: { initialTasks: TaskRecord[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState(initialTasks[0]?.id || null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "next" as TaskStatus,
    priority: "high" as TaskPriority,
    dueDate: "",
    owner: "Shared",
    tags: "callbacks, ops",
  });
  const [subtaskDraft, setSubtaskDraft] = useState("");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }));
  const grouped = useMemo(() => groupTasks(tasks), [tasks]);
  const selectedTask = tasks.find((task) => task.id === selectedId) || null;

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim()) return;
    setCreating(true);
    try {
      const response = await fetch("/api/dashboard/tasks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          dueDate: form.dueDate || undefined,
          tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean),
          subtasks: [],
          source: "dashboard-board",
        }),
      });
      const task = (await response.json()) as TaskRecord;
      setTasks((current) => [...current, task]);
      setSelectedId(task.id);
      setForm({
        title: "",
        description: "",
        status: "next",
        priority: "high",
        dueDate: "",
        owner: "Shared",
        tags: "callbacks, ops",
      });
    } finally {
      setCreating(false);
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === over.id);
    const nextStatus = (overTask?.status || String(over.id)) as TaskStatus;

    const optimistic = tasks.map((task) =>
      task.id === activeTask.id ? { ...task, status: nextStatus } : task,
    );
    setTasks(optimistic);

    const response = await fetch("/api/dashboard/tasks/reorder", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ taskId: activeTask.id, status: nextStatus, overTaskId: overTask?.id || null }),
    });

    const data = (await response.json()) as TaskRecord[];
    setTasks(data);
  }

  async function patchSelected(payload: Record<string, unknown>) {
    if (!selectedTask) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/dashboard/tasks/${selectedTask.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = (await response.json()) as TaskRecord;
      setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)));
      setSelectedId(updated.id);
    } finally {
      setSaving(false);
    }
  }

  async function handleAddSubtask() {
    if (!selectedTask || !subtaskDraft.trim()) return;
    const response = await fetch(`/api/dashboard/tasks/${selectedTask.id}/subtasks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: subtaskDraft.trim() }),
    });
    const updated = (await response.json()) as TaskRecord;
    setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)));
    setSubtaskDraft("");
  }

  async function toggleSubtask(subtask: TaskSubtask) {
    if (!selectedTask) return;
    const response = await fetch(`/api/dashboard/tasks/${selectedTask.id}/subtasks/${subtask.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ done: !subtask.done }),
    });
    const updated = (await response.json()) as TaskRecord;
    setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)));
  }

  return (
    <section className="taskBoardShell">
      <form className="taskComposer" onSubmit={handleCreate}>
        <div>
          <p className="dashboardEyebrow">Shared task board</p>
          <h3 className="taskComposerTitle">A real board the brothers can drag, rank, and actually run from.</h3>
        </div>
        <div className="taskComposerGrid">
          <input placeholder="Task title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <input placeholder="Owner" value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} />
          <input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as TaskStatus })}>
            {columns.map((column) => (
              <option key={column.key} value={column.key}>{column.label}</option>
            ))}
          </select>
          <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as TaskPriority })}>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          <input placeholder="Tags, comma separated" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} />
        </div>
        <textarea placeholder="Why it matters, what done looks like, or any handoff context." rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <button type="submit" className="dashboardAction dashboardActionPrimary" disabled={creating || !form.title.trim()}>
          {creating ? "Adding..." : "Add shared task"}
        </button>
      </form>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="taskBoardColumns">
          {columns.map((column) => (
            <TaskLane key={column.key} column={column} tasks={grouped[column.key]} selectedId={selectedId} onSelect={setSelectedId} />
          ))}
        </div>
      </DndContext>

      <div className="taskDetailShell">
        {selectedTask ? (
          <>
            <div className="taskDetailHead">
              <div>
                <p className="dashboardEyebrow">Selected task</p>
                <h4>{selectedTask.title}</h4>
                <p>{selectedTask.description || "Use this space for the business context, handoff, and definition of done."}</p>
              </div>
              <span className={`taskPriority taskPriority${selectedTask.priority}`}>{selectedTask.priority}</span>
            </div>

            <div className="taskDetailGrid">
              <label>
                <span>Status</span>
                <select value={selectedTask.status} onChange={(event) => patchSelected({ status: event.target.value })} disabled={saving}>
                  {columns.map((column) => (
                    <option key={column.key} value={column.key}>{column.label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Priority</span>
                <select value={selectedTask.priority} onChange={(event) => patchSelected({ priority: event.target.value })} disabled={saving}>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Owner</span>
                <input value={selectedTask.owner || ""} onChange={(event) => setTasks((current) => current.map((task) => (task.id === selectedTask.id ? { ...task, owner: event.target.value } : task)))} onBlur={(event) => patchSelected({ owner: event.target.value })} />
              </label>
              <label>
                <span>Due date</span>
                <input type="date" value={selectedTask.dueDate || ""} onChange={(event) => setTasks((current) => current.map((task) => (task.id === selectedTask.id ? { ...task, dueDate: event.target.value } : task)))} onBlur={(event) => patchSelected({ dueDate: event.target.value || null })} />
              </label>
            </div>

            <div className="taskSubtaskShell">
              <div className="taskSubtaskHead">
                <strong>Subtasks</strong>
                <span>{selectedTask.subtasks.filter((item) => item.done).length}/{selectedTask.subtasks.length || 0} complete</span>
              </div>
              <div className="taskSubtaskList">
                {selectedTask.subtasks.length ? (
                  selectedTask.subtasks.map((subtask) => (
                    <button key={subtask.id} type="button" className={subtask.done ? "subtaskRow done" : "subtaskRow"} onClick={() => toggleSubtask(subtask)}>
                      <span>{subtask.done ? "✓" : "○"}</span>
                      <strong>{subtask.title}</strong>
                    </button>
                  ))
                ) : (
                  <div className="taskLaneEmpty">No subtasks yet. Break it down so the board is actually useful.</div>
                )}
              </div>
              <div className="taskSubtaskComposer">
                <input value={subtaskDraft} onChange={(event) => setSubtaskDraft(event.target.value)} placeholder="Add subtask" />
                <button type="button" className="dashboardAction" onClick={handleAddSubtask}>Add</button>
              </div>
            </div>
          </>
        ) : (
          <div className="taskLaneEmpty">Create a task or pick one from the board to edit the details.</div>
        )}
      </div>
    </section>
  );
}
