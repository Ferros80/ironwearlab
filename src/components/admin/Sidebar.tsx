"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/gifted", label: "Gifted" },
  { href: "/admin/requests", label: "Richieste" },
  { href: "/admin/products", label: "Prodotti" },
  { href: "/admin/orders", label: "Ordini" },
  { href: "/admin/users", label: "Utenti", adminOnly: true },
];

const ADMIN_MENU_ID = "admin-mobile-menu";

interface SidebarProps {
  role?: string;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isOpen) document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen, closeMenu]);

  const filteredLinks = LINKS.filter((l) => !l.adminOnly || role === "ADMIN");

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 border-r border-zinc-800 bg-zinc-950 md:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-zinc-800 p-4">
            <Link href="/admin" className="text-lg font-bold text-white">
              Admin
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-2">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-zinc-800 p-2">
            <Link
              href="/"
              className="mb-2 block rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
            >
              ← Sito pubblico
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile: top bar + hamburger */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 md:hidden">
        <Link href="/admin" className="text-lg font-bold text-white">
          Admin
        </Link>
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={isOpen}
          aria-controls={ADMIN_MENU_ID}
          className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-200 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-200 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {/* Mobile: overlay + drawer (portal) */}
      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu admin"
            id={ADMIN_MENU_ID}
          >
            <button
              type="button"
              aria-label="Chiudi menu"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-overlay-fade"
              onClick={closeMenu}
            />
            <aside
              ref={menuRef}
              className="absolute left-0 top-0 bottom-0 w-full max-w-xs border-r border-zinc-800 bg-zinc-950 shadow-2xl animate-drawer-slide-left overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex min-h-full flex-col pt-16 pb-8">
                <nav className="flex flex-col gap-0.5 px-2" aria-label="Menu admin">
                  {filteredLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium no-underline transition-colors ${
                        pathname === link.href
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 border-t border-zinc-800 px-2 pt-4">
                  <Link
                    href="/"
                    className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-zinc-400 no-underline hover:bg-zinc-800/50 hover:text-white"
                    onClick={closeMenu}
                  >
                    ← Sito pubblico
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      signOut({ callbackUrl: "/admin/login" });
                    }}
                    className="flex min-h-[48px] w-full items-center rounded-xl px-4 py-3 text-left text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
