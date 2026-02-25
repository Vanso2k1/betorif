"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getDictionary, type Lang } from "@/i18n/getDictionary";

/** * BETORIF BRAND CONSTANTS
 * Senior Dev Tip: Centralizing these ensures consistency across 1500+ lines.
 */
const SLIDES = [
  "/images/hero.png", 
  "/images/hero2.png", 
  "/images/hero4.png", 
  "/images/hero6.png"
];

const SLIDES_MOBILE = [
  "/images/hero-m1.png",
  "/images/hero-m2.png",
  "/images/hero-m3.png",
  "/images/hero-m4.png",
];

const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

/** * ANIMATION VARIANTS
 * Industrial-strength motion presets
 */
const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const STAGGER_CONTAINER = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

// --- REUSABLE MICRO-COMPONENTS ---

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-orange-500 ring-1 ring-orange-500/20 uppercase backdrop-blur-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
      </span>
      {children}
    </div>
  );
}

function SectionHeading({ tag, title, subtitle, dark = false }: { tag: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <motion.div variants={FADE_UP} className="max-w-3xl">
      <p className={`text-[11px] font-black tracking-[0.3em] uppercase ${dark ? "text-orange-400" : "text-orange-600"}`}>
        {tag}
      </p>
      <h2 className={`font-display mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-6 text-lg md:text-xl leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/** * COMPONENT: The Technical Stat Card
 * Uses a mono font for the numbers to look like a digital gauge.
 */
function StatCard({ k, v, suffix }: { k: string; v: string; suffix?: string }) {
  return (
    <motion.div 
      variants={FADE_UP}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-orange-500/30"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{k}</span>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-bold text-white tracking-tighter">{v}</span>
          {suffix && <span className="text-sm font-bold text-orange-500">{suffix}</span>}
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-5 text-white">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2l8 4v12l-8 4-8-4V6l8-4z" />
        </svg>
      </div>
    </motion.div>
  );
}

/** * COMPONENT: ProcessBlock (The Timeline Logic)
 * Redesigned as a heavy-duty industrial tracker.
 */
function ProcessBlock({ H, t, L }: any) {
  const [active, setActive] = useState(0);
  const steps = H?.process?.steps || [];

  return (
    <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
      {/* Interactive Navigation */}
      <div className="lg:col-span-5 space-y-4">
        {steps.map((step: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`group w-full relative text-left p-6 rounded-3xl border transition-all duration-500 ${
              active === idx 
              ? "bg-slate-950 border-orange-500/50 shadow-2xl" 
              : "bg-white border-slate-200 hover:border-orange-200"
            }`}
          >
            <div className="flex items-center gap-6">
              <span className={`font-mono text-4xl font-black ${active === idx ? "text-orange-500" : "text-slate-200 group-hover:text-orange-200"}`}>
                {step.n || `0${idx + 1}`}
              </span>
              <div>
                <h4 className={`font-bold text-lg ${active === idx ? "text-white" : "text-slate-900"}`}>
                  {step.t}
                </h4>
                <p className={`text-sm mt-1 line-clamp-1 ${active === idx ? "text-slate-400" : "text-slate-500"}`}>
                  {step.d}
                </p>
              </div>
            </div>
            {active === idx && (
              <motion.div 
                layoutId="activeGlow"
                className="absolute inset-0 rounded-3xl bg-orange-500/5 pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>

      {/* Visual Detail Panel */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="relative h-full min-h-[300px] md:min-h-[500px] rounded-[3rem] bg-slate-900 border border-white/10 overflow-hidden p-6 md:p-12 flex flex-col justify-center"
          >
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <Badge className="mb-6 w-fit">{H?.process?.sys ?? "Système Opérationnel"}</Badge>
            <h3 className="text-5xl font-bold text-white tracking-tight mb-6">
              {steps[active]?.t}
            </h3>
            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              {steps[active]?.d}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps[active]?.bullets?.map((b: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-200 font-medium">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Icons simplified for performance
const Icons = {
  Mixer: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  Logistics: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
};

export default function HomePage() {
  const { lang } = useParams() as { lang: Lang };
  const L = (href: string) => (href === "/" ? `/${lang}` : `/${lang}${href}`);

  const [t, setT] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    getDictionary(lang).then(setT);
  }, [lang]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setCurrent((p) => (p + 1) % SLIDES.length), 5500);
    return () => window.clearInterval(id);
  }, [paused]);

  

  const H = t?.home;

  const report = useMemo(() => H?.report?.items ?? [
    { k: "Expérience", v: "20+ Ans" },
    { k: "Capacité", v: "80m³/h" },
    { k: "Flotte", v: "11 Camions" },
    { k: "Pompage", v: "42m Reach" },
    { k: "Labo", v: "Interne" },
    { k: "Certification", v: "NM/ISO" },
  ], [H]);

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const mq = window.matchMedia("(max-width: 767px)"); // < md
  const update = () => setIsMobile(mq.matches);
  update();

  if (mq.addEventListener) mq.addEventListener("change", update);
  else mq.addListener(update);

  return () => {
    if (mq.removeEventListener) mq.removeEventListener("change", update);
    else mq.removeListener(update);
  };
}, []);

const slides = isMobile ? SLIDES_MOBILE : SLIDES;

  if (!t) return <div className="min-h-screen bg-slate-950" />; // Prevent flash

  return (
    <main className="bg-white text-slate-900 selection:bg-orange-500/30">
      {/* SECTION 1: CINEMATIC HERO */}
      <section 
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background Engine */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={slides[current]}
              src={slides[current]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <div className={`${CONTAINER} relative z-10 w-full`}>
          <div className="grid grid-cols-12 gap-4 md:gap-12 items-center">
            
            {/* Left: Branding & Intent */}
            <div className="col-span-12 lg:col-span-7 space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Badge>{H?.pill ?? "Expertise Industrielle Certifiée"}</Badge>
              </motion.div>

              <motion.h1 
                className="font-display text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {H?.heroTitleA ?? "Béton Haute"}
                <span className="block text-orange-500"> {H?.heroTitleB ?? "Performance"}</span>
              </motion.h1>

              <motion.p 
                className="max-w-xl text-xl text-slate-400 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {H?.heroDesc ?? "Leader régional dans la production de béton prêt à l'emploi. Précision logistique et résistance structurelle pour vos grands chantiers."}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href={L("/contact")} className="h-16 inline-flex items-center justify-center px-10 rounded-2xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-orange-500/20">
                  {H?.ctaQuote ?? "Lancer un Projet"}
                </Link>
                <Link href={L("/how-it-works")} className="h-16 inline-flex items-center justify-center px-10 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-lg backdrop-blur-xl hover:bg-white/10 transition-all">
                  {H?.ctaHow ?? "Moyens Techniques"}
                </Link>
              </motion.div>

              {/* Quick Gauges */}
              <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                <StatCard k="Fondation" v="2004" />
                <StatCard k="Capacité" v="120" suffix="m³/h" />
                <StatCard k="Portée" v="42" suffix="m" />
                <StatCard k="Qualité" v="100" suffix="%" />
              </div>
            </div>

            {/* Right: The Digital Report Card */}
            <motion.div 
              className="col-span-12 lg:col-span-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 to-orange-900/50 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative rounded-[2.5rem] bg-slate-900 border border-white/10 p-8 shadow-3xl">
                  <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                    <div>
                      <div className="text-[10px] font-black text-orange-500 tracking-[0.3em] uppercase mb-1">{H?.report?.label ?? "Fiche Technique"}</div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{H?.report?.title ?? "Status Opérationnel"}</h3>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-2xl border border-orange-500/20">
                      <Icons.Mixer />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {report.map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors group/row">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.k}</span>
                        <span className="font-mono text-sm font-bold text-white group-hover/row:text-orange-400 transition-colors">{item.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    <Link href={L("/contact")} className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-white text-slate-950 font-black text-sm uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all">
                       {H?.ctaQuote ?? "Demander un devis"}
                    </Link>
                    <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-2">
                      {H?.report?.availability?? "Disponibilité 24/7 pour projets structurants"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE LOGO ENGINE (MARQUEE) */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className={CONTAINER}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0 text-center md:text-left">
              <div className="text-[10px] font-black text-orange-600 tracking-[0.3em] uppercase mb-1">{H?.refs?.tag?? "Partenaires"}</div>
              <h4 className="text-lg font-bold text-slate-900">{H?.refs?.title?? "Ils bâtissent avec nous"}</h4>
            </div>
            
            <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex gap-20 animate-marquee whitespace-nowrap items-center">
                {/* LOGO MAPPING - You can add more here */}
                {[...Array(2)].map((_, outer) => (
                  <React.Fragment key={outer}>
                    {['barcelo', 'iberostar', 'carrefour', 'marjane', 'omrane'].map((partner) => (
                      <img key={partner} src={`/images/partners/${partner}.png`} alt={partner} className="h-10 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer" />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE OPERATIONS PROCESS */}
      <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Mark */}
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
          <Icons.Logistics />
        </div>

        <div className={CONTAINER}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <SectionHeading 
                tag={H?.process?.tag ?? "LOGISTIQUE"} 
                title={H?.process?.title ?? "Le Parcours Chantier"} 
                subtitle={H?.process?.subtitle ?? "Une organisation millimétrée pour garantir la fluidité de vos coulages."} 
              />
              <div className="hidden md:block pb-2">
                <Link href={L("/how-it-works")} className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-2">
                  {H?.process?.hint ?? "Détails techniques"} <span className="text-xl">→</span>
                </Link>
              </div>
            </div>
          </Reveal>

          <ProcessBlock H={H} t={t} L={L} />
        </div>
      </section>

      {/* SECTION 4: INDUSTRIAL SERVICES GRID */}
      <section className="py-24 md:py-32 bg-white">
        <div className={CONTAINER}>
          <Reveal>
            <div className="text-center flex flex-col items-center mb-20">
              <Badge className="mb-4">{H?.services?.tag ?? "Solutions Structurelles"}</Badge>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                {H?.services?.title ?? "Nos Domaines d'Intervention"}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <ServiceCard
                icon={<Icons.Mixer />}
                title={H?.services?.cards?.[0]?.title ?? "Béton Prêt à l'Emploi"}
                desc={H?.services?.cards?.[0]?.desc ?? "Formulations sur mesure : du C25/30 aux bétons spéciaux haute performance."}
                ctaPrimary={{ href: L("/contact"), label: H?.services?.cards?.[0]?.ctaOrder ?? "Commander" }}
                ctaSecondary={{ href: L("/services"), label: H?.services?.cards?.[0]?.ctaSpecs ?? "Fiche technique" }}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <ServiceCard
                icon={<Icons.Logistics />}
                title={H?.services?.cards?.[1]?.title ?? "Logistique Avancée"}
                desc={H?.services?.cards?.[1]?.desc ?? "Flotte géolocalisée pour une cadence de livraison ininterrompue sur site."}
                ctaPrimary={{ href: L("/contact"), label: H?.services?.cards?.[1]?.ctaOrder ?? "Planifier" }}
                ctaSecondary={{ href: L("/services"), label: H?.services?.cards?.[1]?.ctaSpecs ?? "Zone d'action" }}
              />
            </Reveal>

            <Reveal delay={0.3}>
              <ServiceCard
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                title={H?.services?.cards?.[2]?.title ?? "Contrôle Qualité Labo"}
                desc={H?.services?.cards?.[2]?.desc ?? "Écrasement d'éprouvettes et suivi rigoureux de la traçabilité de chaque m³."}
                ctaPrimary={{ href: L("/contact"), label: H?.services?.cards?.[2]?.ctaOrder ??  "Certificats" }}
                ctaSecondary={{ href: L("/services"), label: H?.services?.cards?.[2]?.ctaSpecs ??  "Normes" }}
              />
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.4}>
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-white min-h-[300px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3 className="text-3xl font-bold mb-4">{H?.services?.optionsTitle ?? "Service de Pompage"}</h3>
                <p className="text-slate-400 text-lg max-w-md mb-8">
                  {H?.services?.optionsDesc ?? "Bras de 36m et 42m pour atteindre les zones les plus complexes. Rendement élevé pour dalles et voiles."}
                </p>
                <Link href={L("/contact")} className="w-fit px-8 py-4 bg-orange-500 rounded-xl font-bold hover:bg-orange-600 transition-colors">
                  {H?.services?.reserveButton ?? "Réserver une pompe"}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-dashed border-slate-200 p-10 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{H?.services?.supportTitle ?? "Support Technique"}</h3>
                <p className="text-slate-500 text-lg max-w-md mb-8">
                  {H?.services?.supportDesc ?? "Nos ingénieurs vous accompagnent dans le choix des adjuvants et la préparation des accès chantier."}
                </p>
                <a href="https://wa.me/212665293314" className="w-fit px-8 py-4 border border-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all">
                  {H?.services?.contactButton ?? "Parler à un expert"}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRUST & TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        {/* Cinematic Flare */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full" />
        
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <SectionHeading 
                dark 
                tag={H?.trust?.tag ?? "CONFIANCE"} 
                title={H?.trust?.title ?? "La Voix de nos Clients"} 
                subtitle={H?.trust?.subtitle ?? "Depuis 2004, nous sécurisons les fondations des projets les plus ambitieux de la région."} 
              />
              <div className="mt-10 flex gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                   <div className="text-2xl font-bold text-white">4.8/5</div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{H?.trust?.noteNum ?? "Note Moyenne"}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                   <div className="text-2xl font-bold text-white">98%</div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{H?.trust?.noteRate ?? "Fidélité"}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((item: any, i: number) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all h-full flex flex-col">
                    <div className="flex text-orange-500 mb-6 italic text-4xl font-serif">“</div>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-1">
                      {item.quote}
                    </p>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center font-bold text-orange-500 uppercase">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-bold">{item.name}</div>
                        <div className="text-sm text-slate-500 font-medium">{item.role}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE COMMAND CENTER CTA */}
      <section className="py-20 bg-white">
        <div className={CONTAINER}>
          <div className="relative overflow-hidden rounded-[3rem] bg-orange-500 p-8 md:p-16 shadow-2xl shadow-orange-500/30">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                  {H?.final?.title ?? "Prêt à couler votre projet ?"}
                </h2>
                <p className="mt-6 text-xl text-orange-950/80 font-medium max-w-2xl leading-relaxed">
                  {H?.final?.desc ?? "Ville, volume estimé, date souhaitée — notre équipe logistique revient vers vous avec une planification optimale sous 24h."}
                </p>
              </div>
              
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link href={L("/contact")} className="h-16 inline-flex items-center justify-center px-10 rounded-2xl bg-slate-950 text-white font-bold text-lg hover:bg-slate-900 transition-all hover:scale-105 shadow-xl">
                  {H?.ctaQuote ?? "Demander un devis"}
                </Link>
                <a href="https://wa.me/212665293314" target="_blank" rel="noreferrer" className="h-16 inline-flex items-center justify-center px-10 rounded-2xl bg-white/20 border border-white/20 text-white font-bold text-lg backdrop-blur-md hover:bg-white/30 transition-all">
                  {t?.nav?.whatsapp ?? "WhatsApp Direct"}
                </a>
              </div>
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

// --- HELPER COMPONENTS ---

function ServiceCard({ icon, title, desc, ctaPrimary, ctaSecondary }: any) {
  return (
    <div className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
      <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-8">{desc}</p>
      <div className="flex items-center gap-6">
        <Link href={ctaPrimary.href} className="text-sm font-black uppercase tracking-widest text-orange-600 hover:text-orange-700">
          {ctaPrimary.label}
        </Link>
        <Link href={ctaSecondary.href} className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
          {ctaSecondary.label}
        </Link>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const testimonials = [
  { name: "Ahmed Mansouri", role: "Directeur Technique, BuildCo", quote: "Betorif est notre partenaire exclusif sur Nador. Leur capacité à maintenir une cadence de coulage sur 24h est inégalée." },
  { name: "Sarah Alami", role: "Architecte Senior", quote: "Le suivi laboratoire et la précision des formulations nous permettent de valider nos structures les plus exigeantes en toute confiance." },
];