"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { StickyCta } from "./StickyCta";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-14 pb-24 md:pt-28 md:pb-0">{children}</main>
      <Footer />
      <StickyCta />
    </>
  );
}
