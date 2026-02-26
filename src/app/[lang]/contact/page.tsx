"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getDictionary, type Lang } from "@/i18n/getDictionary";
import MobileCollapse from "@/components/MobileCollapse";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, delay }}
  >
    {children}
  </motion.div>
);

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export default function ContactPage() {
  const { lang } = useParams() as { lang: Lang };

  const [t, setT] = useState<any>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    getDictionary(lang).then(setT);
  }, [lang]);

  const C = t?.contact;

  const chantierTypes = useMemo(
    () =>
      C?.chantierTypes ?? [
        "Fondations",
        "Dalle",
        "Poteaux / voiles",
        "Voirie / aménagement",
        "Projet résidentiel",
        "Projet public / privé",
        "Autre",
      ],
    [C]
  );

  return (
    <main className="bg-white text-slate-900">
      {/* Header */}
      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <Reveal>
            <p className="text-xs font-semibold tracking-wider text-orange-300">
              {C?.hero?.badge ?? "DEVIS"}
            </p>
            <h1 className="font-display mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {C?.hero?.title ?? "Demander un devis"}
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed">
              {C?.hero?.subtitle ??
                "Donnez les infos essentielles (ville, volume estimé, date). Notre équipe vous répond rapidement pour confirmer et planifier la livraison."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold">
              {(C?.hero?.badges ?? [
                "Réponse rapide",
                "Livraison planifiée",
                "Support chantier",
              ]).map((x: string) => (
                <span
                  key={x}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/90 ring-1 ring-white/15"
                >
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  {x}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-display text-xl font-semibold text-slate-900">
                        {C?.form?.title ?? "Formulaire de devis"}
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        {C?.form?.subtitle ??
                          "Remplissez en 1 minute. Plus c’est précis, plus la réponse est rapide."}
                      </div>
                    </div>
                    <div className="hidden sm:block rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                      {C?.form?.free ?? "Devis gratuit"}
                    </div>
                  </div>

                  {sent ? (
                    <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                      <div className="font-display text-lg font-semibold text-emerald-900">
                        {C?.success?.title ?? "Demande envoyée ✅"}
                      </div>
                      <div className="mt-2 text-sm text-emerald-800">
                        {C?.success?.desc ??
                          "Merci. Notre équipe vous contactera rapidement pour confirmer les détails."}
                      </div>
                      <div className="mt-5">
                        <a
                          href="https://wa.me/212665293314"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                        >
                          {C?.success?.cta ?? "WhatsApp maintenant"}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form
                      className="mt-8 grid grid-cols-12 gap-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                    >
                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.name ?? "Nom / Société"}
                        </label>
                        <input
                          required
                          placeholder={C?.form?.namePlaceholder ?? "Votre nom"}
                          className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm"
                        />
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.phone ?? "Téléphone"}
                        </label>
                        <input
                          required
                          placeholder={C?.form?.phonePlaceholder ?? "+212 ..."}
                          className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm"
                        />
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.city ?? "Ville / Chantier"}
                        </label>
                        <input
                          required
                          placeholder={C?.form?.cityPlaceholder ?? "Nador, Selouane..."}
                          className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm"
                        />
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.type ?? "Type de chantier"}
                        </label>
                        <select
                          defaultValue={chantierTypes[0]}
                          className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm"
                        >
                          {chantierTypes.map((t: string) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.volume ?? "Volume estimé (m³)"}{" "}
                          <span className="text-slate-400 font-medium">
                            ({C?.form?.optional ?? "optionnel"})
                          </span>
                        </label>
                        <input
                          placeholder="18"
                          className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm"
                        />
                      </div>

                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.date ?? "Date souhaitée"}
                        </label>
                        <input
                          type="date"
                          required
                          className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm"
                        />
                      </div>

                      <div className="col-span-12">
                        <label className="text-xs font-semibold text-slate-700">
                          {C?.form?.details ?? "Détails"}{" "}
                          <span className="text-slate-400 font-medium">
                            ({C?.form?.detailsHint ?? "accès, pompe, contraintes"})
                          </span>
                        </label>
                        <textarea
                          rows={5}
                          placeholder={C?.form?.detailsPlaceholder ?? "Décrivez votre besoin…"}
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
                        />
                      </div>

                      <div className="col-span-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                        <div className="text-xs text-slate-500">
                          {C?.form?.consent ??
                            "En envoyant, vous acceptez d’être contacté pour le devis."}
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                        >
                          {C?.form?.submit ?? "Envoyer la demande"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-5">
              <Reveal delay={0.08}>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="font-display text-lg font-semibold text-slate-900">
                    {C?.side?.title ?? "Contact direct"}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {C?.side?.subtitle ??
                      "Pour accélérer : envoyez les infos sur WhatsApp."}
                  </div>

                  <div className="mt-6 grid gap-3">
                    <a
                      href="https://wa.me/212665293314"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                    >
                      {t?.nav?.whatsapp ?? "WhatsApp"}
                    </a>
                    <a
                      href="https://www.google.com/maps?q=Avenue+Hassan+II+immeuble+BMCE+BANK+Nador"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                    >
                      {C?.side?.maps ?? "Ouvrir sur Maps"}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INDUSTRIAL FOOTER */}
      <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
                <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center text-sm italic">B</div>
                BETORIF<span className="text-orange-500">.</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg">
                Expertise en béton prêt à l'emploi depuis 2004. Leader de la construction durable dans la région de Nador.
              </p>
              <div className="flex gap-4">
                {['facebook', 'linkedin', 'instagram'].map(social => (
                  <div key={social} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition-colors cursor-pointer">
                    <span className="text-[10px] uppercase font-bold">{social.charAt(0)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 space-y-6">
              <h5 className="text-white font-bold uppercase tracking-widest text-xs">Solutions</h5>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="page.tsx" className="hover:text-orange-500 transition-colors">Béton Standard</Link></li>
                <li><Link href="page.tsx" className="hover:text-orange-500 transition-colors">Pompage</Link></li>
                <li><Link href="page.tsx" className="hover:text-orange-500 transition-colors">Génie Civil</Link></li>
                <li><Link href="page.tsx" className="hover:text-orange-500 transition-colors">Laboratoire</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h5 className="text-white font-bold uppercase tracking-widest text-xs">Société</h5>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="about.tsx" className="hover:text-orange-500 transition-colors">À Propos</Link></li>
                <li><Link href="careers.tsx" className="hover:text-orange-500 transition-colors">Recrutement</Link></li>
                <li><Link href="legal.tsx" className="hover:text-orange-500 transition-colors">Mentions Légales</Link></li>
                <li><Link href="contact.tsx" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="lg:col-span-4 space-y-6">
              <h5 className="text-white font-bold uppercase tracking-widest text-xs">Siège Social</h5>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="shrink-0 text-orange-500 mt-1">📍</div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Zone Industrielle Selouane,<br /> BP 124, 62700 Nador, Maroc.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 text-orange-500 mt-1">📞</div>
                  <p className="text-slate-400 text-sm font-bold">
                    +212 536 60 00 00 / +212 661 00 00 00
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 text-orange-500 mt-1">✉️</div>
                  <p className="text-slate-400 text-sm font-bold">
                    contact@betorif.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} BETORIF SARL. TOUS DROITS RÉSERVÉS.
            </p>
            <p className="text-slate-500 text-xs font-medium flex items-center gap-2">
              MADE BY <a href="https://www.kaeynadigital.com" target="_blank" rel="noreferrer" className="text-white font-black italic hover:text-orange-500 transition-colors">Kaeynadigital.com</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
