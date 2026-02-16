"use client";

import { useTransition } from "react";

const STATUSES = ["NEW", "IN_PROGRESS", "DONE", "REJECTED"];

interface RequestStatusFormProps {
  id: string;
  status: string;
  adminNotes: string | null;
  action: (
    id: string,
    data: { status?: string; adminNotes?: string }
  ) => Promise<unknown>;
}

export function RequestStatusForm({
  id,
  status,
  adminNotes,
  action,
}: RequestStatusFormProps) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => {
        startTransition(async () => {
          const s = fd.get("status") as string;
          const notes = fd.get("adminNotes") as string;
          await action(id, {
            status: s || undefined,
            adminNotes: notes || undefined,
          });
        });
      }}
      className="mt-4 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300">Status</label>
        <select
          name="status"
          defaultValue={status}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Note admin</label>
        <textarea
          name="adminNotes"
          rows={3}
          defaultValue={adminNotes ?? ""}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-white px-4 py-2 font-semibold text-zinc-950 disabled:opacity-50"
      >
        {pending ? "Salvataggio..." : "Salva"}
      </button>
    </form>
  );
}
