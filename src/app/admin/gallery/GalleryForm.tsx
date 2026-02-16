"use client";

import { useState } from "react";
import { MediaLibrary } from "@/components/admin/MediaLibrary";
import { MediaUpload } from "./MediaUpload";

const CATEGORIES = ["cappelli", "giubbotti", "scarpe"];

interface Media {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  alt: string | null;
}

interface GalleryFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title: string;
    category: string;
    mediaId: string;
    featured: boolean;
  };
}

export function GalleryForm({ action, defaultValues }: GalleryFormProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);

  return (
    <form action={action} className="mt-6 max-w-xl space-y-4">
      <input type="hidden" name="mediaId" value={selectedMedia?.id ?? defaultValues?.mediaId ?? ""} />
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
        <label className="block text-sm font-medium text-zinc-300">Categoria *</label>
        <select
          name="category"
          required
          defaultValue={defaultValues?.category}
          className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
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
        {showLibrary && (
          <div className="mt-2">
            <MediaLibrary
              onSelect={(m) => {
                setSelectedMedia(m);
                setShowLibrary(false);
              }}
            />
          </div>
        )}
        {selectedMedia && (
          <p className="mt-2 text-sm text-zinc-400">
            Selezionato: {selectedMedia.url} (ID: {selectedMedia.id})
          </p>
        )}
        {defaultValues?.mediaId && !selectedMedia && (
          <p className="mt-2 text-sm text-zinc-400">Media ID: {defaultValues.mediaId}</p>
        )}
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={defaultValues?.featured}
            className="rounded border-zinc-600 bg-zinc-900"
          />
          <span className="text-sm text-zinc-300">In evidenza</span>
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
