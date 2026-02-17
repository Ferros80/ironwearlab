import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contattaci per richieste personalizzate di cappellini e apparel.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <header className="mb-12">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white md:text-6xl">
          CONTACT
        </h1>
        <p className="mt-4 text-zinc-400">
          Per richieste custom usa il form dedicato.
        </p>
      </header>

      <div className="space-y-8">
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6">
          <h2 className="font-semibold text-white">Richiedi una personalizzazione</h2>
          <p className="mt-2 text-zinc-400">
            Compila il form con tutti i dettagli: base cappellino, colore, tecniche, budget. Ti rispondo al più presto.
          </p>
          <Link
            href="/custom-request"
            className="mt-4 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105"
          >
            Vai al form
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6">
          <h2 className="font-semibold text-white">Social</h2>
          <p className="mt-2 text-zinc-400">
            Seguimi su Instagram per vedere gli ultimi lavori e le novità.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-white underline underline-offset-4 hover:opacity-80"
          >
            @customhats
          </a>
        </div>
      </div>
    </div>
  );
}
