import type { Metadata } from "next";
import Image from "next/image";
import { getPublicGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Galleria di cappellini, giubbotti e scarpe personalizzati. Strass, patch, ricami.",
};

export default async function GalleryPage() {
  const items = await getPublicGallery();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white md:text-6xl">
          GALLERY
        </h1>
        <p className="mt-4 text-zinc-400">
          Cappelli, giubbotti, scarpe. Ogni pezzo è unico.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/30 transition-all hover:border-zinc-700/50 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden bg-zinc-800">
              {item.mediaType === "VIDEO" ? (
                <div className="flex aspect-square items-center justify-center bg-zinc-800">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="object-cover opacity-80 transition-transform group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded bg-black/60 px-2 py-1 text-xs font-medium">
                    Video
                  </span>
                </div>
              ) : item.mediaType === "IMAGE" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-4">
              <span className="text-xs font-medium uppercase text-zinc-500">{item.category}</span>
              <h2 className="mt-1 font-semibold text-white">{item.title}</h2>
              {item.description && (
                <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
