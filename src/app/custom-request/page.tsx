import type { Metadata } from "next";
import { CustomRequestForm } from "./CustomRequestForm";

export const metadata: Metadata = {
  title: "Richiedi Custom",
  description: "Compila il form per richiedere una personalizzazione. Cappellini New Era, strass, patch, ricami.",
};

export default function CustomRequestPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
      <header className="mb-12">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide text-white md:text-6xl">
          RICHIEDI CUSTOM
        </h1>
        <p className="mt-4 text-zinc-400">
          Compila tutti i campi. Ti rispondo per confermare e definire i dettagli.
        </p>
      </header>

      <CustomRequestForm />
    </div>
  );
}
