"use client";

import { useState } from "react";
import { HAT_BASES } from "@/lib/mockData";
import { customRequestSchema, type CustomRequestInput } from "@/lib/validators";

const TECHNIQUES = [
  { value: "strass", label: "Strass" },
  { value: "patch", label: "Patch" },
  { value: "ricamo", label: "Ricamo" },
  { value: "mix", label: "Mix" },
];

const BUDGET_RANGES = [
  { value: "<100€", label: "Meno di 100€" },
  { value: "100-200€", label: "100-200€" },
  { value: "200-400€", label: "200-400€" },
  { value: "400€+", label: "400€+" },
];

const DELIVERY_OPTIONS = [
  { value: "ritiro", label: "Ritiro" },
  { value: "spedizione", label: "Spedizione" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export function CustomRequestForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);

    const raw: Record<string, unknown> = {
      honeypot: fd.get("honeypot") ?? "",
      hatBase: fd.get("hatBase"),
      color: fd.get("color"),
      size: fd.get("size") || undefined,
      techniques: fd.getAll("techniques") as string[],
      text: fd.get("text") || undefined,
      palette: fd.get("palette") || undefined,
      inspirationLink1: fd.get("inspirationLink1") || undefined,
      inspirationLink2: fd.get("inspirationLink2") || undefined,
      inspirationLink3: fd.get("inspirationLink3") || undefined,
      budgetRange: fd.get("budgetRange"),
      desiredDate: fd.get("desiredDate") || undefined,
      delivery: fd.get("delivery"),
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      instagram: fd.get("instagram") || undefined,
    };

    const result = customRequestSchema.safeParse(raw);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0]?.toString() ?? "";
        if (path) errors[path] = err.message;
      });
      setClientErrors(errors);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const res = await fetch("/api/custom-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data.error ?? "Errore durante l'invio. Riprova.");
      return;
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <p className="text-lg font-medium text-green-400">Richiesta inviata!</p>
        <p className="mt-2 text-zinc-400">
          Ti risponderò al più presto all&apos;indirizzo email indicato.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="honeypot"
        className="absolute -left-[9999px] opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="hatBase" className="block text-sm font-medium text-zinc-300">
          Base cappellino *
        </label>
        <select
          id="hatBase"
          name="hatBase"
          required
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        >
          {HAT_BASES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {clientErrors.hatBase && (
          <p className="mt-1 text-sm text-red-400">{clientErrors.hatBase}</p>
        )}
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-zinc-300">
          Colore *
        </label>
        <input
          id="color"
          name="color"
          type="text"
          required
          placeholder="es. Nero, Navy, Bianco"
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
        {clientErrors.color && (
          <p className="mt-1 text-sm text-red-400">{clientErrors.color}</p>
        )}
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-zinc-300">
          Taglia (se fitted)
        </label>
        <input
          id="size"
          name="size"
          type="text"
          placeholder="es. 7 1/4"
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-zinc-300">Tecniche *</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {TECHNIQUES.map((t) => (
            <label key={t.value} className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center gap-3 rounded-lg py-2">
              <input
                type="checkbox"
                name="techniques"
                value={t.value}
                className="size-5 shrink-0 rounded border-zinc-600 bg-zinc-900 text-white focus:ring-white"
              />
              <span className="text-sm text-zinc-300">{t.label}</span>
            </label>
          ))}
        </div>
        {clientErrors.techniques && (
          <p className="mt-1 text-sm text-red-400">{clientErrors.techniques}</p>
        )}
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-zinc-300">
          Testo da inserire
        </label>
        <textarea
          id="text"
          name="text"
          rows={3}
          placeholder="Scritte, iniziali..."
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <label htmlFor="palette" className="block text-sm font-medium text-zinc-300">
          Palette / colori desiderati
        </label>
        <input
          id="palette"
          name="palette"
          type="text"
          placeholder="es. Oro, nero, bianco"
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <label htmlFor="inspirationLink1" className="block text-sm font-medium text-zinc-300">
          Link ispirazione (max 3)
        </label>
        <div className="mt-2 space-y-2">
          <input
            id="inspirationLink1"
            name="inspirationLink1"
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <input
            name="inspirationLink2"
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
          <input
            name="inspirationLink3"
            type="url"
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-zinc-300">
          Budget *
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          required
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        >
          {BUDGET_RANGES.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="desiredDate" className="block text-sm font-medium text-zinc-300">
          Data desiderata
        </label>
        <input
          id="desiredDate"
          name="desiredDate"
          type="date"
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-zinc-300">Consegna *</span>
        <div className="mt-2 flex gap-4">
          {DELIVERY_OPTIONS.map((d) => (
            <label key={d.value} className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg py-2">
              <input
                type="radio"
                name="delivery"
                value={d.value}
                required
                className="size-5 shrink-0 border-zinc-600 bg-zinc-900 text-white focus:ring-white"
              />
              <span className="text-sm text-zinc-300">{d.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-zinc-800" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
          Nome *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
        {clientErrors.name && (
          <p className="mt-1 text-sm text-red-400">{clientErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
        {clientErrors.email && (
          <p className="mt-1 text-sm text-red-400">{clientErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
          Telefono *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
        {clientErrors.phone && (
          <p className="mt-1 text-sm text-red-400">{clientErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="instagram" className="block text-sm font-medium text-zinc-300">
          Instagram
        </label>
        <input
          id="instagram"
          name="instagram"
          type="text"
          placeholder="@username"
          className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full min-h-[44px] rounded-full bg-white py-4 font-semibold text-zinc-950 transition-all hover:scale-[1.02] disabled:scale-100 disabled:opacity-70"
      >
        {status === "loading" ? "Invio in corso..." : "Invia richiesta"}
      </button>
    </form>
  );
}
