import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bebas = Bebas_Neue({ weight: "400", variable: "--font-bebas", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Custom Hats & Apparel | Cappellini New Era Personalizzati",
    template: "%s | Custom Hats",
  },
  description:
    "Cappellini New Era e accessori streetwear personalizzati con strass, patch e ricami. Custom hats & apparel per chi vuole distinguersi.",
  openGraph: {
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable} antialiased`}>
        <SessionProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </SessionProvider>
      </body>
    </html>
  );
}
