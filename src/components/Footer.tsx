import Link from "next/link";

const SOCIAL = [
  { href: "https://instagram.com", label: "Instagram", icon: "IG" },
  { href: "https://tiktok.com", label: "TikTok", icon: "TT" },
  { href: "https://twitter.com", label: "X", icon: "X" },
];

const FOOTER_LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/gifted", label: "Gifted" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/custom-request", label: "Richiedi custom" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="text-lg font-bold text-white">
              Custom Hats & Apparel
            </Link>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Cappellini New Era e accessori personalizzati con strass, patch e ricami.
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Link</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {FOOTER_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm text-zinc-400 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Social</h3>
              <ul className="mt-3 flex gap-4">
                {SOCIAL.map(({ href, label, icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-zinc-700/50 text-xs font-medium text-zinc-400 transition-all hover:border-white hover:text-white"
                      aria-label={label}
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Custom Hats. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
