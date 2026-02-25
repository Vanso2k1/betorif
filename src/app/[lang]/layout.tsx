// src/app/[lang]/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import Navbar from "../../components/Navbar";

import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BETORIF — Béton prêt à l’emploi",
  description:
    "BETORIF SARL — Fabrication de tous types de béton. Nador. Depuis 2004.",
};

const SUPPORTED_LANGS = ["fr", "es", "en", "ar"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

function normalizeLang(input: string): Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(input) ? (input as Lang) : "fr";
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = normalizeLang(lang);
  const isRTL = safeLang === "ar";

  return (
    <html lang={safeLang} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${montserrat.variable} ${poppins.variable} font-body`}>
        <Navbar />
        <main>{children}</main>
        
      </body>
    </html>
  );
}