import Link from "next/link";
import Image from "next/image";
import { getPublicGallery } from "@/lib/gallery";

export default async function Home() {
  const galleryItems = await getPublicGallery();
  const previewItems = galleryItems.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] min-h-[100dvh] flex-col items-center justify-center px-4 text-center md:min-h-screen">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover object-[72%_18%]"
        />
        {/* Overlay: gradient + vignette */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/60 to-black/90" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.2em] text-white md:text-7xl lg:text-8xl lg:tracking-[0.25em]">
          CUSTOM STREETWEAR.
        </h1>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-zinc-300 md:max-w-md md:text-lg md:text-zinc-200">
          New Era originali. Strass, patch, ricami. Unico come te.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/custom-request"
            className="hero-cta inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold tracking-wide text-zinc-950 transition-all duration-200 hover:scale-105 active:scale-100"
          >
            Richiedi custom
          </Link>
          <Link
            href="/gallery"
            className="inline-flex min-h-[48px] min-w-[44px] items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-base font-medium text-white transition-all duration-200 hover:border-white hover:bg-white/5"
          >
            Esplora gallery
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="text-center font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-white md:text-3xl">
          Perché Iron Wear Lab
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="animate-fade-in rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 transition-transform duration-200 hover:scale-[1.01] md:p-8">
            <span className="text-2xl md:text-3xl">✨</span>
            <h3 className="mt-4 font-[family-name:var(--font-bebas)] text-xl tracking-wide text-white">
              New Era originale
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
              Solo basi New Era certificate. 59FIFTY, 9FORTY, Trucker, Beanie.
            </p>
          </div>
          <div className="animate-fade-in animate-fade-in-delay-1 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 transition-transform duration-200 hover:scale-[1.01] md:p-8">
            <span className="text-2xl md:text-3xl">💎</span>
            <h3 className="mt-4 font-[family-name:var(--font-bebas)] text-xl tracking-wide text-white">
              Dettagli premium
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
              Strass, patch, ricami di qualità. Ogni pezzo finito a mano.
            </p>
          </div>
          <div className="animate-fade-in animate-fade-in-delay-2 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 transition-transform duration-200 hover:scale-[1.01] md:p-8">
            <span className="text-2xl md:text-3xl">🎨</span>
            <h3 className="mt-4 font-[family-name:var(--font-bebas)] text-xl tracking-wide text-white">
              Lavorazione custom
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 md:text-base">
              Collaboriamo con te per realizzare il design che hai in mente.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="border-t border-zinc-800/50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-white md:text-4xl">
            Gallery
          </h2>
          <p className="mt-2 text-zinc-400">
            Cappelli, giubbotti, scarpe. Alcuni dei nostri lavori.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {previewItems.map((item, i) => (
              <Link
                key={item.id}
                href="/gallery"
                className={`group overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30 transition-all duration-200 hover:border-zinc-600/50 hover:shadow-lg animate-fade-in ${
                  i === 1 ? "animate-fade-in-delay-1" : i === 2 ? "animate-fade-in-delay-2" : i === 3 ? "animate-fade-in-delay-3" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-800">
                  {item.mediaType === "IMAGE" ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={400}
                      height={400}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={400}
                      height={400}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <span className="text-xs font-medium uppercase text-zinc-500">{item.category}</span>
                  <p className="mt-0.5 font-medium text-white line-clamp-2">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/gallery"
            className="mt-8 inline-flex min-h-[44px] min-w-[44px] items-center justify-center border-b border-white pb-1 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            Vedi gallery →
          </Link>
        </div>
      </section>
    </div>
  );
}
