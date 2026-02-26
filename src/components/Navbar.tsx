"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getDictionary, type Lang, LANGS } from "@/i18n/getDictionary";

const LANG_UI: Record<Lang, { label: string; flag: string }> = {
  fr: { label: "FR", flag: "/flags/fr.png" },
  es: { label: "ES", flag: "/flags/es.png" },
  en: { label: "EN", flag: "/flags/en.png" },
  ar: { label: "AR", flag: "/flags/ar.png" },
};

function getLangFromPath(pathname: string): Lang {
  const seg = pathname.split("/")[1] as Lang | undefined;
  return seg && LANGS.includes(seg) ? seg : "fr";
}

function withLang(lang: Lang, href: string) {
  const clean = href.startsWith("/") ? href : `/${href}`;
  if (clean === "/") return `/${lang}`;
  return `/${lang}${clean}`;
}

function switchLangPath(pathname: string, target: Lang) {
  const current = getLangFromPath(pathname);
  if (!pathname.startsWith(`/${current}`)) return `/${target}`;
  const next = pathname.replace(`/${current}`, `/${target}`);
  return next === `/${target}/` ? `/${target}` : next;
}

function isActivePath(pathname: string, href: string) {
  // Normalize trailing slash
  const normalize = (str: string) =>
    str.endsWith("/") && str !== "/" ? str.slice(0, -1) : str;

  const current = normalize(pathname);
  const target = normalize(href);

  // If it's the home route ("/fr", "/en", etc.)
  if (target.split("/").length === 2) {
    return current === target;
  }

  // For all other routes → exact match only
  return current === target;
}

export default function Navbar() {
  const pathname = usePathname();
  const lang = useMemo(() => getLangFromPath(pathname), [pathname]);
  const isRTL = lang === "ar";

  const [open, setOpen] = useState(false);
  const [t, setT] = useState<any>(null);

  useEffect(() => {
    let alive = true;
    getDictionary(lang).then((d) => alive && setT(d));
    return () => {
      alive = false;
    };
  }, [lang]);

  const nav = useMemo(
    () => [
      { href: "/", label: t?.nav?.home ?? "Accueil" },
      { href: "/about", label: t?.nav?.about ?? "À propos" },
      { href: "/how-it-works", label: t?.nav?.how ?? "Comment ça marche" },
      { href: "/contact", label: t?.nav?.contact ?? "Contact" },
    ],
    [t]
  );

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // === Toggle this if you want a login button later ===
  const SHOW_LOGIN = false;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* 1. Brand - shrink-0 prevents it from squishing */}
            <Link
              href={withLang(lang, "/")}
              className="flex items-center gap-3 shrink-0"
              aria-label="BETORIF Home"
            >
              <Image
                src="/images/logo.png"
                alt="BETORIF"
                width={50}
                height={50}
                className="h-10 w-auto object-contain md:h-12"
              />
              <div className="leading-tight hidden xl:block">
                <div className="font-display text-sm md:text-base font-bold text-slate-900 tracking-tight">
                  BETORIF
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 font-medium">
                  {t?.nav?.tagline ?? "Béton prêt à l’emploi"}
                </div>
              </div>
            </Link>

            {/* 2. Desktop Navigation - flex-1 and justify-center keeps it middle */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/50 p-1 shadow-sm">
                {nav.map((item) => {
                  const href = withLang(lang, item.href);
                  const active = isActivePath(pathname, href);
                  return (
                    <Link
                      key={item.href}
                      href={href}
                      className={[
                        "rounded-full px-3 py-0,5 text-sm font-semibold transition whitespace-nowrap",
                        active
                          ? "bg-slate-900 text-white shadow-md"
                          : "text-slate-600 hover:text-bg-slate-950 hover:bg-orange-500",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* 3. Actions - shrink-0 keeps it together on the right */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Language Switcher (Desktop) */}
              <div className="hidden xl:flex items-center gap-1.5 border-r border-slate-200 pr-3">
                {LANGS.map((code) => (
                  <Link
                    key={code}
                    href={switchLangPath(pathname, code)}
                    className={[
                      "p-1.5 rounded-lg transition-all",
                      code === lang ? "bg-slate-100 ring-1 ring-slate-200" : "opacity-50 hover:opacity-100"
                    ].join(" ")}
                  >
                    <Image 
                      src={LANG_UI[code].flag} 
                      alt={code} 
                      width={20} 
                      height={20} 
                      className="rounded-sm" 
                    />
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={withLang(lang, "/contact")}
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-orange-500 px-3 py-1.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                {t?.nav?.cta ?? "Demander un devis"}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span className="hidden xs:inline">{t?.nav?.menu ?? "Menu"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60"
            />

            <motion.aside
              initial={{ x: isRTL ? -420 : 420 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? -420 : 420 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className={[
                "fixed top-0 z-[70] h-full w-[88%] max-w-[420px] bg-white shadow-2xl",
                isRTL ? "left-0" : "right-0",
              ].join(" ")}
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <div className="font-display font-semibold text-slate-900">
                  BETORIF
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                >
                  {t?.nav?.close ?? "Fermer"} ✕
                </button>
              </div>

              <div className="p-5 flex flex-col h-[calc(100%-76px)]">
                <div className="space-y-2">
                  {nav.map((item) => {
                    const href = withLang(lang, item.href);
                    const active = isActivePath(pathname, href);
                    return (
                      <Link
                        key={item.href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={[
                          "block rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                          active
                            ? "border-slate-300 bg-slate-900 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    {t?.nav?.langTitle ?? "Language"}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGS.map((code) => {
                      const isActive = code === lang;
                      const href = switchLangPath(pathname, code);
                      return (
                        <Link
                          key={code}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={[
                            "inline-flex items-center justify-between rounded-2xl border px-3 py-2 text-xs font-semibold transition",
                            isActive
                              ? "border-slate-300 bg-slate-50 text-slate-900"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <span className="inline-flex items-center gap-2">
                            <Image
                              src={LANG_UI[code].flag}
                              alt={LANG_UI[code].label}
                              width={18}
                              height={18}
                              className="h-4 w-4 rounded-sm object-cover"
                            />
                            {LANG_UI[code].label}
                          </span>
                          {isActive ? (
                            <span className="text-[10px] px-2 py-1 rounded-full bg-slate-900 text-white">
                              ON
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-auto pt-6 space-y-3">
                  <Link
                    href={withLang(lang, "/contact")}
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    {t?.nav?.cta ?? "Demander un devis"}
                  </Link>

                  {SHOW_LOGIN ? (
                    <Link
                      href={withLang(lang, "/login")}
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      {t?.nav?.login ?? "Login"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

