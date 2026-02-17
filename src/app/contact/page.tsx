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
          Per richieste custom usa il form dedicato. Per info generali puoi scriverci via email.
        </p>
      </header>

      <div className="space-y-8">
        {/* Custom request */}
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 shadow-lg">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-white">Richiedi una personalizzazione</h2>
            <p className="text-zinc-400">
              Compila il form con tutti i dettagli: base cappellino, colore, tecniche e budget.
              Ti rispondiamo al più presto.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/custom-request"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105"
            >
              Vai al form
            </Link>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white">Email</h2>
          <p className="mt-2 text-zinc-400">
            Per info generali, richieste e collaborazioni: scrivici qui.
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Info generali</p>
              <a
                href="mailto:info@ironwearlab.com"
                className="mt-2 inline-flex text-sm font-medium text-white underline underline-offset-4 hover:opacity-80"
              >
                info@ironwearlab.com
              </a>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Business / Collaborazioni</p>
              <a
                href="mailto:ferro@ironwearlab.com"
                className="mt-2 inline-flex text-sm font-medium text-white underline underline-offset-4 hover:opacity-80"
              >
                ferro@ironwearlab.com
              </a>
            </div>
          </div>

          <p className="mt-5 text-xs text-zinc-500">Tempo di risposta tipico: 24–48h.</p>
        </div>
      </div>
    </div>
  );
}
