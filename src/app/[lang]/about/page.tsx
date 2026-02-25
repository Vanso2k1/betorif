"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getDictionary, type Lang } from "@/i18n/getDictionary";
import MobileCollapse from "@/components/MobileCollapse";


const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-90px" }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/15">
      <span className="h-2 w-2 rounded-full bg-orange-500" />
      {children}
    </span>
  );
}

/** ✅ DARK BOX STYLE: bg-slate-950, page stays white */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-7 shadow-sm">
      <div className="font-display text-lg font-semibold text-white">{title}</div>
      <div className="mt-3 text-sm text-white/75 leading-relaxed">{children}</div>
    </div>
  );
}

function StatBox({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-sm">
      <div className="font-display text-2xl font-semibold tracking-tight text-white">{v}</div>
      <div className="mt-1 text-xs font-semibold tracking-wider text-white/60">{k}</div>
    </div>
  );
}

function MiniBar({
  label,
  value,
  max,
  suffix = "",
  locale,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  locale: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const nf = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-semibold text-white/80">{label}</div>
        <div className="text-xs font-semibold text-white">
          {nf.format(value)}
          {suffix}
        </div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-orange-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { lang } = useParams() as { lang: Lang };
  const L = (href: string) => (href === "/" ? `/${lang}` : `/${lang}${href}`);

  const [t, setT] = useState<any>(null);

  useEffect(() => {
    getDictionary(lang).then(setT);
  }, [lang]);

  const A = t?.about;

  // ✅ Replace with your real about hero image
  const HERO_IMG = "/images/hero2.png";

  // ---- Data (kept exactly; keys moved to dictionary for translation) ----
  const identite = useMemo(
    () =>
      A?.identity?.items ?? [
        { k: "Raison sociale", v: "BETORIF SARL" },
        { k: "Forme", v: "Société à responsabilité limitée" },
        { k: "Activité", v: "Fabrication de tous type de béton" },
        { k: "Date de création", v: "24/05/2004" },
        { k: "Capital social", v: "1 500 000,00 DHS" },
        { k: "Gérant", v: "M. ALLACHE Abderrachid" },
        { k: "Siège", v: "Avenue Hassan II, immeuble BMCE BANK, 5ème étage N°17, Nador" },
        { k: "Téléphone", v: "+212 6 61 30 87 88 / +212 6 65 29 33 14" },
        { k: "Email", v: "info@betorif.ma" },
        { k: "Site", v: "www.betorif.ma" },
      ],
    [A]
  );

  const effectif = useMemo(
    () => [
      { year: "2015", val: 24 },
      { year: "2016", val: 26 },
      { year: "2017", val: 32 },
      { year: "2018", val: 30 },
      { year: "2019", val: 27 },
      { year: "2020", val: 32 },
      { year: "2021", val: 31 },
      { year: "2022", val: 35 },
      { year: "2023", val: 27 },
      { year: "2024", val: 36 },
      { year: "2025", val: 33 },
    ],
    []
  );

  const production = useMemo(
    () => [
      { year: "2014", val: 30811.0 },
      { year: "2015", val: 22188.5 },
      { year: "2016", val: 30916.5 },
      { year: "2017", val: 43597.5 },
      { year: "2018", val: 40877.5 },
      { year: "2019", val: 26954.0 },
      { year: "2020", val: 35056.5 },
      { year: "2021", val: 35262.5 },
      { year: "2022", val: 31347.0 },
      { year: "2023", val: 42862.5 },
      { year: "2024", val: 43276.5 },
      { year: "2025", val: 56790.5 },
    ],
    []
  );

  const moyensMateriels = useMemo(
    () =>
      A?.capacity?.materials ?? [
        "02 Centrales à béton",
        "08 camions bétonnières 10m³ + 03 camions bétonnières 12m³",
        "02 camions semi-remorque 25m³",
        "01 pompe à béton 36m",
        "01 pompe à béton 42m",
        "02 chargeuses",
        "01 véhicule Pick-up ~ 1.3T",
        "05 véhicules commerciaux",
        "Poste soudure + atelier maintenance",
        "Parc & équipe : 22 chauffeurs + magasinier + mécanicien + électricien/soudeur/tôlier",
      ],
    [A]
  );

  const moyensHumains = useMemo(
    () =>
      A?.capacity?.humans ?? [
        "Coordination opérationnelle et planning global",
        "Gestion assurance qualité et suivi des ouvrages",
        "Soutien & conseil techniques (Ingénieur)",
        "Techniciens spécialisés (production / contrôle / suivi)",
        "Chefs de chantier & chefs d’équipe",
        "Communication client & suivi chantier",
      ],
    [A]
  );

  const ouvrages = useMemo(
    () =>
      A?.references?.projects ?? [
        "Voirie Cap de l’eau",
        "Aménagement de la corniche de Saïdia",
        "Projet social à Saïdia (3050 appartements)",
        "Villas touristiques (950 unités)",
        "Appartements touristiques à Saïdia (+180 000)",
        "Écoles, internats, centres d’éducation",
        "Centre hospitalier à Saïdia",
        "Kiada & municipalité de Saïdia",
        "Centre commercial à Saïdia (projet avec OMRANE)",
        "Station d’épuration de Saïdia",
        "Quatre stations de service à Saïdia",
        "Centre de culture à Berkane",
      ],
    [A]
  );

  const gallery = useMemo(
    () => ["/images/hero.png", "/images/hero2.png", "/images/hero4.png", "/images/hero6.png"],
    []
  );

  const stats = useMemo(
    () =>
      A?.stats ?? [
        { k: "Fondée", v: "2004" },
        { k: "Capital social", v: "1 500 000 DHS" },
        { k: "Centrales", v: "2" },
        { k: "Pompes", v: "36m & 42m" },
      ],
    [A]
  );

  const maxEffectif = Math.max(...effectif.map((x) => x.val));
  const maxProd = Math.max(...production.map((x) => x.val));

  return (
    <main className="bg-gray-100 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt={A?.hero?.heroAlt ?? "À propos BETORIF"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <Reveal>
            <p className="text-xs font-semibold tracking-wider text-orange-300">
              {A?.hero?.badge ?? "À PROPOS"}
            </p>
            <h1 className="font-display mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {A?.hero?.title ?? "BETORIF — Notre objectif : votre satisfaction"}
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed">
              {A?.hero?.subtitle ??
                "Une entreprise spécialisée dans le béton prêt à l’emploi, avec des moyens humains et matériels pour sécuriser la qualité et le respect des délais chantier."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(A?.hero?.pills ?? ["Depuis 2004", "Nador & région", "Livraison planifiée", "Support chantier"]).map(
                (p: string) => (
                  <Pill key={p}>{p}</Pill>
                )
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={L("/contact")}
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                {A?.hero?.ctaQuote ?? "Demander un devis"}
              </Link>
              <a
                href="https://wa.me/212665293314"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15"
              >
                {A?.hero?.ctaWhatsapp ?? t?.nav?.whatsapp ?? "WhatsApp"}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IDENTITY + KEY STATS */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-sm">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-orange-500">
                        {A?.identity?.badge ?? "FICHE"}
                      </p>
                      <h2 className="font-display mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-orange-500">
                        {A?.identity?.title ?? "Identité de l’entreprise"}
                      </h2>
                      <p className="mt-2 text-sm text-white/70">
                        {A?.identity?.subtitle ??
                          "Informations générales (extrait du dossier de présentation)."}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      {A?.identity?.companyTag ?? "BETORIF SARL"}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    {identite.map((x: any) => (
                      <div key={x.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs font-semibold text-white/60">{x.k}</div>
                        <div className="mt-1 text-sm font-semibold text-white">{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <Reveal delay={0.06}>
                <div className="grid grid-cols-1 gap-4">
                  {stats.map((s: any) => (
                    <StatBox key={s.k} k={s.k} v={s.v} />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTATION ENTREPRISE */}
      <section className="mt-8">
        <div className="mx-auto max-w-5xl">
        <div className="bg-slate-950 border border-white/10 rounded-3xl p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h3 className="text-3xl font-bold text-orange-500">
                {A?.brochure?.title ?? "Présentation de l’entreprise"}
              </h3>
              <p className="text-white/75 mt-3 max-w-xl">
                {A?.brochure?.text ??
                  "Consultez notre brochure officielle pour découvrir nos services, équipements et références."}
              </p>
            </div>

            <a
              href="https://drive.google.com/file/d/1mj-Xlu_79lUDme2PQQvQWu00gKQVRqFg/view"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-slate-950 font-semibold hover:bg-orange-400 transition"
            >
              {A?.brochure?.button ?? "Ouvrir dans Google Drive"}
            </a>
          </div>
          </div>
        </div>
      </section>

      {/* CHARTS */}
<section className="bg-slate-50">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
    <Reveal>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-orange-600">
            {A?.indicators?.badge ?? "INDICATEURS"}
          </p>
          <h2 className="font-display mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {A?.indicators?.title ?? "Effectif & production"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {A?.indicators?.subtitle ?? "Repères de capacité (données internes)."}
          </p>
        </div>

        <Link
          href={L("/contact")}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          {A?.indicators?.quoteCta ?? "Demander un devis →"}
        </Link>
      </div>
    </Reveal>

    {/* Collapse ONLY for mobile, always open on md+ */}
    <div className="mt-10">
      <MobileCollapse
        title={A?.indicators?.collapseTitle ?? (A?.indicators?.title ?? "Effectif & production")}
        subtitle={A?.indicators?.collapseHint ?? "Voir les indicateurs"}
        defaultOpen={false}
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.06}>
              <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-sm">
                <div className="font-display text-lg font-semibold text-white">
                  {A?.indicators?.staffTitle ?? "Nombre d’effectif"}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  {A?.indicators?.staffSubtitle ?? "Évolution annuelle."}
                </div>
                <div className="mt-6 grid gap-3">
                  {effectif.map((e) => (
                    <MiniBar
                      key={e.year}
                      label={e.year}
                      value={e.val}
                      max={maxEffectif}
                      locale={lang}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-sm">
                <div className="font-display text-lg font-semibold text-white">
                  {A?.indicators?.productionTitle ?? "Chiffre de production (m³)"}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  {A?.indicators?.productionSubtitle ?? "Historique (2014 → 2025)."}
                </div>
                <div className="mt-6 grid gap-3">
                  {production.map((p) => (
                    <MiniBar
                      key={p.year}
                      label={p.year}
                      value={Math.round(p.val)}
                      max={maxProd}
                      suffix={A?.indicators?.productionSuffix ?? " m³"}
                      locale={lang}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </MobileCollapse>
    </div>
  </div>
</section>


      {/* MEANS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <Reveal>
            <div className="text-center">
              <p className="text-xs font-semibold tracking-wider text-orange-600">
                {A?.capacity?.badge ?? "CAPACITÉS"}
              </p>
              <h2 className="font-display mt-2 text-2xl md:text-4xl font-semibold tracking-tight text-slate-900">
                {A?.capacity?.title ?? "Moyens humains & matériels"}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                {A?.capacity?.subtitle ??
                  "Organisation, suivi et équipements adaptés pour garantir régularité et délais chantier."}
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <Reveal>
                <Card title={A?.capacity?.humansTitle ?? "Moyens humains"}>
                  <ul className="mt-4 space-y-2">
                    {moyensHumains.map((x: string) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Reveal delay={0.06}>
                <Card title={A?.capacity?.materialsTitle ?? "Moyens matériels"}>
                  <ul className="mt-4 space-y-2">
                    {moyensMateriels.map((x: string) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-orange-500" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* OUVRAGES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <Reveal>
            <p className="text-xs font-semibold tracking-wider text-orange-600">
              {A?.references?.badge ?? "RÉFÉRENCES"}
            </p>
            <h2 className="font-display mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {A?.references?.title ?? "Ouvrages réalisés"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              {A?.references?.subtitle ?? "Exemples de projets livrés (public & privé)."}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {ouvrages.map((o: string, i: number) => (
              <Reveal key={o} delay={0.03 * i}>
                <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-500" />
                    <div className="text-sm font-semibold text-white">{o}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-orange-600">
                  {A?.gallery?.badge ?? "GALERIE"}
                </p>
                <h2 className="font-display mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                  {A?.gallery?.title ?? "Photos & installations"}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {A?.gallery?.subtitle ?? "Ajoutez ici les photos réelles (centrale, flotte, chantier)."}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={0.04 * i}>
                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${A?.gallery?.altPrefix ?? "Galerie"} ${i + 1}`}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-50 overflow-x-hidden">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 px-6 py-10 md:p-12 shadow-sm">
        
        {/* Blur circle (hidden on mobile) */}
        <div className="hidden md:block absolute -right-28 -top-28 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative grid grid-cols-12 items-center gap-8 md:gap-10">
          
          <div className="col-span-12 lg:col-span-8">
            <p className="text-xs font-semibold tracking-wider text-orange-300">
              {A?.finalCta?.badge ?? "DEVIS"}
            </p>

            <h2 className="font-display mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-white">
              {A?.finalCta?.title ?? "Parlons de votre chantier."}
            </h2>

            <p className="mt-4 max-w-xl text-white/75 leading-relaxed">
              {A?.finalCta?.subtitle ??
                "Ville, volume estimé, date souhaitée et contraintes d’accès — on vous répond rapidement."}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <Link
              href={L("/contact")}
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              {A?.finalCta?.ctaQuote ?? "Demander un devis"}
            </Link>

            <a
              href="https://wa.me/212665293314"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15"
            >
              {A?.finalCta?.ctaWhatsapp ?? t?.nav?.whatsapp ?? "WhatsApp"}
            </a>
          </div>

        </div>
      </div>
    </Reveal>
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
                <li><Link href={L("/services")} className="hover:text-orange-500 transition-colors">Béton Standard</Link></li>
                <li><Link href={L("/services")} className="hover:text-orange-500 transition-colors">Pompage</Link></li>
                <li><Link href={L("/services")} className="hover:text-orange-500 transition-colors">Génie Civil</Link></li>
                <li><Link href={L("/services")} className="hover:text-orange-500 transition-colors">Laboratoire</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h5 className="text-white font-bold uppercase tracking-widest text-xs">Société</h5>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href={L("/about")} className="hover:text-orange-500 transition-colors">À Propos</Link></li>
                <li><Link href={L("/careers")} className="hover:text-orange-500 transition-colors">Recrutement</Link></li>
                <li><Link href={L("/legal")} className="hover:text-orange-500 transition-colors">Mentions Légales</Link></li>
                <li><Link href={L("/contact")} className="hover:text-orange-500 transition-colors">Contact</Link></li>
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
              CONCEPTION PAR <span className="text-white font-black italic">DESIGNER.CO</span>
            </p>
          </div>
        </div>
      </footer>
      
    </main>
  );
}
