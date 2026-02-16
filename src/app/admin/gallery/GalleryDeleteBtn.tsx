"use client";

import { deleteGalleryItem } from "@/actions/gallery";

export function GalleryDeleteBtn({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        if (confirm("Eliminare?")) {
          await deleteGalleryItem(id);
        }
      }}
    >
      <button type="submit" className="text-sm text-red-400 hover:text-red-300">
        Elimina
      </button>
    </form>
  );
}
