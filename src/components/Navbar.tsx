"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/gifted", label: "Gifted" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/custom-request", label: "Richiedi custom" },
];

const SOCIAL = [
  { href: "https://instagram.com", label: "Instagram", icon: "IG" },
  { href: "https://tiktok.com", label: "TikTok", icon: "TT" },
  { href: "https://twitter.com", label: "X", icon: "X" },
];

const MOBILE_MENU_ID = "mobile-nav-menu";
const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";

  // Header: transparent/blur on hero, solid when scrolled (home only)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= SCROLL_THRESHOLD);
    };
    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isMenuOpen) document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector<HTMLAnchorElement>("a");
      firstLink?.focus();
    }
  }, [isMenuOpen]);

  const headerBg = isHome && !isScrolled
    ? "bg-black/40 backdrop-blur-md border-white/5"
    : "bg-black/95 backdrop-blur-md border-white/10";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 md:h-28 border-b transition-colors duration-300 ${headerBg}`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 md:px-14">
        <div className="flex min-w-0 shrink items-center justify-start overflow-hidden">
          <Link href="/" className="flex items-center no-underline min-h-[44px] min-w-[44px]" aria-label="Home">
            <Logo className="block h-[100px] w-auto object-contain -translate-x-6 translate-y-3 md:translate-x-0 md:translate-y-[0.3cm] md:h-[183px]" />
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-11 whitespace-nowrap md:flex">
          {NAV_LINKS.filter((l) => l.href !== "/custom-request").map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-sm font-semibold tracking-wide no-underline transition-colors ${
                pathname === href ? "text-white" : "text-white/75 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <Link
            href="/custom-request"
            className="hidden min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105 active:scale-100 md:inline-flex md:px-8 md:py-4 md:text-base"
          >
            Richiedi custom
          </Link>

          <button
            ref={hamburgerRef}
            type="button"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/20 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`absolute block h-0.5 w-5 bg-white transition-all duration-200 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute block h-0.5 w-5 bg-white transition-all duration-200 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      {isMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            id={MOBILE_MENU_ID}
          >
            <button
              type="button"
              aria-label="Chiudi menu"
              className="absolute inset-0 bg-black/80 backdrop-blur-md animate-overlay-fade"
              onClick={closeMenu}
            />
            <aside
              ref={menuRef}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 shadow-2xl animate-drawer-slide overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex min-h-full flex-col px-6 pt-24 pb-8">
                <nav className="flex flex-col gap-0.5" aria-label="Menu principale">
                  {NAV_LINKS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium no-underline transition-all duration-200 ${
                        pathname === href ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">Social</p>
                  <div className="flex gap-4">
                    {SOCIAL.map(({ href, label, icon }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 text-sm font-medium text-zinc-400 transition-all hover:border-white hover:text-white"
                        aria-label={label}
                        onClick={closeMenu}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </header>
  );
}
