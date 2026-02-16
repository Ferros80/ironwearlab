"use client";

import { useState } from "react";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { MediaUpload } from "../gallery/MediaUpload";

interface Media {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  alt: string | null;
}

interface GiftedFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    name: string;
    note: string | null;
    mediaId: string;
  };
}

export function GiftedForm({ action, defaultValues }: GiftedFormProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <form action={action} className="mt-6 max-w-xl space-y-4">
      <input type="hidden" name="mediaId" value={selectedMedia?.id ?? defaultValues?.mediaId ?? ""} />
      <div>
        <label className="block text-sm font-medium text-zinc-300">Nome *</label>
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Nota</label>
        <textarea
          name="note"
          rows={2}
          defaultValue={defaultValues?.note ?? ""}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-300">Media *</label>
        <div className="mt-2 flex gap-2">
<MediaUpload
              onUploaded={(m) => {
                setSelectedMedia({
                  id: m.id,
                  url: m.url,
                  type: m.type as "IMAGE" | "VIDEO",
                  alt: null,
                });
                setShowLibrary(false);
              }}
            />
          <button
            type="button"
            onClick={() => setShowLibrary(!showLibrary)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
          >
            Scegli esistente
          </button>
        </div>
        {selectedMedia && (
          <p className="mt-2 text-sm text-zinc-400">
            Selezionato: {selectedMedia.url} (ID: {selectedMedia.id})
          </p>
        )}
        {defaultValues?.mediaId && !selectedMedia && (
          <p className="mt-2 text-sm text-zinc-400">Media ID: {defaultValues.mediaId}</p>
        )}
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
