import Link from "next/link";

const SOCIAL = [
  {
    href: "https://www.instagram.com/ironwearlab/",
    label: "Instagram",
    icon: "IG",
  },
  {
    href: "https://www.tiktok.com/@ironwearlab1",
    label: "TikTok",
    icon: "TT",
  },
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
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-white">
              Custom Hats &amp; Apparel
            </Link>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Cappellini New Era e accessori personalizzati con strass, patch e ricami.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-zinc-500">
              LINK
            </p>
            <ul className="mt-4 space-y-4">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-zinc-300 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-zinc-500">
              SOCIAL
            </p>
            <div className="mt-4 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/60 text-xs font-semibold text-zinc-200 hover:border-zinc-500 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800/50 pt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} Iron Wear Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
