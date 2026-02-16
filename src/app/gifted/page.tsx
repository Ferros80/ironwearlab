import type { Metadata } from "next";
import Image from "next/image";
import { getPublicGifted } from "@/lib/gifted";

export const metadata: Metadata = {
  title: "Gifted",
  description: "Artisti e personaggi che indossano le nostre creazioni personalizzate.",
};

export default async function GiftedPage() {
  const artists = await getPublicGifted();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white md:text-6xl">
          GIFTED
        </h1>
        <p className="mt-4 text-zinc-400">
          Chi ha scelto le nostre custom.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <article
            key={artist.id}
            className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 transition-all hover:border-zinc-700/50"
          >
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
              <Image
                src={artist.imageSrc}
                alt={artist.name}
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-white">{artist.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{artist.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
