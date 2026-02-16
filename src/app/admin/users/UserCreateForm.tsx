"use client";

import { useTransition, useState } from "react";

interface UserCreateFormProps {
  action: (data: {
    email: string;
    name?: string;
    password: string;
    role: "ADMIN" | "EDITOR";
  }) => Promise<unknown>;
}

export function UserCreateForm({ action }: UserCreateFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  return (
    <form
      action={(fd) => {
        setError("");
        startTransition(async () => {
          try {
            await action({
              email: fd.get("email") as string,
              name: (fd.get("name") as string) || undefined,
              password: fd.get("password") as string,
              role: (fd.get("role") as "ADMIN" | "EDITOR") || "EDITOR",
            });
          } catch (e) {
            setError(e instanceof Error ? e.message : "Errore");
          }
        });
      }}
      className="mt-4 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-zinc-300">Email *</label>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Nome</label>
        <input
          name="name"
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Password *</label>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Ruolo</label>
        <select
          name="role"
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        >
          <option value="EDITOR">EDITOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-white px-4 py-2 font-semibold text-zinc-950 disabled:opacity-50"
      >
        {pending ? "Creazione..." : "Crea utente"}
      </button>
    </form>
  );
}
