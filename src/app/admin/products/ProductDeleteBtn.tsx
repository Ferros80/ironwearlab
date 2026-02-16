"use client";

import { deleteProduct } from "@/actions/products";

export function ProductDeleteBtn({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        if (confirm("Eliminare prodotto?")) {
          await deleteProduct(id);
        }
      }}
    >
      <button type="submit" className="text-sm text-red-400 hover:text-red-300">
        Elimina
      </button>
    </form>
  );
}
