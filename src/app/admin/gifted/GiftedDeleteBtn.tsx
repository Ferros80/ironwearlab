"use client";

import { deleteGiftedItem } from "@/actions/gifted";

export function GiftedDeleteBtn({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        if (confirm("Eliminare?")) {
          await deleteGiftedItem(id);
        }
      }}
    >
      <button type="submit" className="text-sm text-red-400 hover:text-red-300">
        Elimina
      </button>
    </form>
  );
}
