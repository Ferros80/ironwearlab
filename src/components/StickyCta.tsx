"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SHOW_AFTER_SCROLL = 100;

export function StickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const hideOnPages = ["/custom-request", "/admin"];
  const shouldHide = hideOnPages.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY >= SHOW_AFTER_SCROLL);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (shouldHide || !visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 md:hidden safe-area-bottom"
    >
      <div className="mx-auto max-w-lg rounded-2xl bg-black/95 backdrop-blur-md border border-white/10 shadow-xl px-4 py-3">
        <Link
          href="/custom-request"
          className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-white font-semibold text-zinc-950 transition-transform active:scale-[0.98]"
        >
          Richiedi il tuo custom
        </Link>
      </div>
    </div>
  );
}
