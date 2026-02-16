"use client";

import { useState } from "react";

interface MediaUploadProps {
  onUploaded: (media: { id: string; url: string; type: string }) => void;
}

export function MediaUpload({ onUploaded }: MediaUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Errore upload");
      onUploaded(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore");
    } finally {
      setLoading(false);
    }
  }

  return (
    <label className="cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        disabled={loading}
        onChange={handleChange}
      />
      {loading ? "Caricamento..." : "Carica file"}
      {error && <span className="ml-2 text-red-400">{error}</span>}
    </label>
  );
}
