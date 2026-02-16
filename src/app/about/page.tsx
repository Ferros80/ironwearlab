import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Chi siamo. Custom hats e apparel streetwear, personalizzazioni New Era.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <header className="mb-12">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white md:text-6xl">
          ABOUT
        </h1>
      </header>

      <div className="space-y-6 text-zinc-300">
        <p className="text-lg leading-relaxed">
          Sono Tommaso, 18 anni, e personalizzo cappellini New Era e accessori con strass, patch e ricami.
        </p>
        <p className="leading-relaxed">
          Ogni pezzo è fatto a mano, pensato per chi vuole qualcosa di unico. Base New Era 59FIFTY, 9FORTY,
          Trucker, Beanie — e poi la tua idea. Streetwear e rap culture mi ispirano ogni giorno.
        </p>
        <p className="leading-relaxed">
          Niente shop online per ora: lavoriamo su richiesta. Compila il form custom e raccontami cosa hai in mente.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-6">
        <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
          COME FUNZIONA
        </h2>
        <ol className="mt-4 space-y-3 text-zinc-400">
          <li>1. Compila la richiesta custom con base, colore, tecniche, budget</li>
          <li>2. Ti rispondo per confermare e definire i dettagli</li>
          <li>3. Realizzo il pezzo</li>
          <li>4. Ritiro in zona o spedizione</li>
        </ol>
      </div>
    </div>
  );
}
