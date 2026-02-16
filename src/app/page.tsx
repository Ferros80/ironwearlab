import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Image
  src="/images/hero-bg.jpg"
  alt="Iron Wear Lab"
  fill
  priority
  className="absolute inset-0 -z-10 object-cover object-[72%_18%] blur-[1px] brightness-65 contrast-110 scale-105"
/>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        <h1 className="font-[family-name:var(--font-bebas)] text-6xl tracking-wider text-white md:text-8xl lg:text-9xl">
          IRON WEAR LAB
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-400 md:text-xl">
          Cappellini New Era e accessori personalizzati con strass, patch e ricami.
          Streetwear made for you.
        </p>
        <Link
          href="/custom-request"
          className="animate-fade-in-delay-2 mt-10 inline-flex animate-fade-in items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-zinc-950 transition-transform hover:scale-105 active:scale-100"
        >
          Richiedi custom
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="animate-fade-in rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 transition-transform hover:scale-[1.02]">
            <span className="text-4xl">✨</span>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
              Strass & Patch
            </h2>
            <p className="mt-2 text-zinc-400">
              Personalizzazioni di qualità con materiali premium. Ogni pezzo è unico.
            </p>
          </div>
          <div className="animate-fade-in animate-fade-in-delay-1 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 transition-transform hover:scale-[1.02]">
            <span className="text-4xl">🎨</span>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
              Design unici
            </h2>
            <p className="mt-2 text-zinc-400">
              Collaboriamo con te per creare il design che hai in mente.
            </p>
          </div>
          <div className="animate-fade-in animate-fade-in-delay-2 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 transition-transform hover:scale-[1.02]">
            <span className="text-4xl">📦</span>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
              Ritiro o spedizione
            </h2>
            <p className="mt-2 text-zinc-400">
              Scegli come ricevere il tuo pezzo personalizzato.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800/50 py-24">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white md:text-5xl">
            VEDI LA GALLERY
          </h2>
          <p className="mt-4 text-zinc-400">
            Alcuni dei nostri lavori. Cappelli, giubbotti, scarpe.
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-block border-b border-white pb-1 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            Esplora →
          </Link>
        </div>
      </section>
    </div>
  );
}
