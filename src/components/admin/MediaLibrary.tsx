"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Media {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  alt: string | null;
}

interface MediaLibraryProps {
  onSelect: (media: Media) => void;
  filterType?: "IMAGE" | "VIDEO";
}

export function MediaLibrary({ onSelect, filterType }: MediaLibraryProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (filterType) params.set("type", filterType);
    if (search) params.set("q", search);
    fetch(`/api/media?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setMedia(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filterType, search]);

  if (loading) {
    return <p className="text-sm text-zinc-400">Caricamento...</p>;
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Cerca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500"
      />
      <div className="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto rounded border border-zinc-700 p-2 sm:grid-cols-6">
        {media.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m)}
            className="relative aspect-square overflow-hidden rounded border-2 border-transparent transition-colors hover:border-white focus:border-white"
          >
            {m.type === "IMAGE" ? (
              <Image
                src={m.url}
                alt={m.alt ?? ""}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-zinc-800 text-zinc-500">
                Video
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
