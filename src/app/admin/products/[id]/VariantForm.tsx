"use client";

import { createProductVariant, deleteProductVariant } from "@/actions/products";

interface Variant {
  id: string;
  sku: string | null;
  color: string | null;
  size: string | null;
  stock: number;
}

interface VariantFormProps {
  productId: string;
  variants: Variant[];
}

export function VariantForm({ productId, variants }: VariantFormProps) {
  return (
    <div className="mt-4 space-y-4">
      {variants.map((v) => (
        <div
          key={v.id}
          className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
        >
          <span className="text-zinc-300">
            {[v.color, v.size].filter(Boolean).join(" / ") || "Default"}
          </span>
          <span className="text-zinc-500">SKU: {v.sku ?? "-"}</span>
          <span className="text-zinc-500">Stock: {v.stock}</span>
          <form
            action={async () => {
              if (confirm("Eliminare variante?")) {
                await deleteProductVariant(v.id);
              }
            }}
          >
            <button type="submit" className="text-sm text-red-400">
              Elimina
            </button>
          </form>
        </div>
      ))}
      <form
        action={async (fd) => {
          const color = (fd.get("color") as string) || undefined;
          const size = (fd.get("size") as string) || undefined;
          const stockStr = fd.get("stock") as string;
          const stock = stockStr ? parseInt(stockStr, 10) : 0;
          await createProductVariant({ productId, color, size, stock });
        }}
        className="flex flex-wrap gap-2"
      >
        <input
          name="color"
          placeholder="Colore"
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
        />
        <input
          name="size"
          placeholder="Taglia"
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          defaultValue="0"
          className="w-20 rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
        />
        <button
          type="submit"
          className="rounded bg-white px-4 py-2 text-sm font-semibold text-zinc-950"
        >
          + Variante
        </button>
      </form>
    </div>
  );
}
