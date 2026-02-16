"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/gifted", label: "Gifted" },
  { href: "/admin/requests", label: "Richieste" },
  { href: "/admin/products", label: "Prodotti" },
  { href: "/admin/orders", label: "Ordini" },
  { href: "/admin/users", label: "Utenti", adminOnly: true },
];

interface SidebarProps {
  role?: string;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-zinc-800 bg-zinc-950">
      <div className="flex h-full flex-col">
        <div className="border-b border-zinc-800 p-4">
          <Link href="/admin" className="text-lg font-bold text-white">
            Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {LINKS.filter((l) => !l.adminOnly || role === "ADMIN").map((link) => (
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
  );
}
