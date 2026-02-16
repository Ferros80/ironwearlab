"use client";

interface ProductFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title: string;
    description: string | null;
    baseType: string | null;
    priceCents: number | null;
    isActive: boolean;
  };
}

export function ProductForm({ action, defaultValues }: ProductFormProps) {
  return (
    <form action={action} className="mt-6 max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-300">Titolo *</label>
        <input
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Descrizione</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Base (es. 59FIFTY)</label>
        <input
          name="baseType"
          defaultValue={defaultValues?.baseType ?? ""}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Prezzo (€)</label>
        <input
          name="priceCents"
          type="number"
          step="0.01"
          placeholder="es. 49.99"
          defaultValue={
            defaultValues?.priceCents != null
              ? (defaultValues.priceCents / 100).toFixed(2)
              : ""
          }
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            value="on"
            defaultChecked={defaultValues?.isActive ?? true}
            className="rounded border-zinc-600 bg-zinc-900"
          />
          <span className="text-sm text-zinc-300">Attivo</span>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-white px-4 py-2 font-semibold text-zinc-950"
      >
        Salva
      </button>
    </form>
  );
}
