"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "next/navigation";
import { getDictionary, type Lang } from "@/i18n/getDictionary";

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

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="font-semibold text-slate-900">{q}</div>
        <span
          className={[
            "inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 transition",
            open ? "rotate-45" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineStep({
  idx,
  title,
  desc,
  active,
  activeText,
  stepText,
}: {
  idx: number;
  title: string;
  desc: string;
  active: boolean;
  activeText: string;
  stepText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: idx * 0.05 }}
      className="relative"
    >
      <div
        className={[
          "rounded-3xl border shadow-sm backdrop-blur-sm",
          "bg-white/10 border-white/15 text-white",
          "transition",
          active ? "ring-1 ring-orange-400/40" : "ring-0",
        ].join(" ")}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <motion.div
              animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
              transition={
                active
                  ? { duration: 1.2, repeat: Infinity, repeatDelay: 1.2 }
                  : undefined
              }
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-sm font-extrabold text-white shadow-sm"
            >
              {idx + 1}
            </motion.div>

            <div className="min-w-0">
              <div className="font-display text-lg font-semibold tracking-tight">
                {title}
              </div>
              <div className="mt-2 text-sm text-white/80 leading-relaxed">
                {desc}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/70">
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    active ? "bg-orange-400" : "bg-white/35",
                  ].join(" ")}
                />
                {active ? activeText : stepText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  const { lang } = useParams() as { lang: Lang };
  const L = (href: string) => (href === "/" ? `/${lang}` : `/${lang}${href}`);

  const [t, setT] = useState<any>(null);
  useEffect(() => {
    getDictionary(lang).then(setT);
  }, [lang]);

  const H = t?.how;

  const HERO_IMG = "/images/how-hero.png";

  const steps = useMemo(
    () =>
      H?.steps ?? [
        {
          title: "Demande de devis",
          desc: "Ville, volume estimé, date souhaitée et contraintes d’accès (pompe si besoin).",
        },
        {
          title: "Validation & planification",
          desc: "Confirmation technique et organisation logistique avec communication claire.",
        },
        {
          title: "Production en centrale",
          desc: "Fabrication maîtrisée et régularité selon les exigences du chantier.",
        },
        {
          title: "Livraison sur chantier",
          desc: "Livraison planifiée et suivi pour sécuriser la cadence et les délais.",
        },
      ],
    [H]
  );

  // Active step using inView
  const s0 = useRef<HTMLDivElement | null>(null);
  const s1 = useRef<HTMLDivElement | null>(null);
  const s2 = useRef<HTMLDivElement | null>(null);
  const s3 = useRef<HTMLDivElement | null>(null);

  const v0 = useInView(s0, { margin: "-45% 0px -45% 0px" });
  const v1 = useInView(s1, { margin: "-45% 0px -45% 0px" });
  const v2 = useInView(s2, { margin: "-45% 0px -45% 0px" });
  const v3 = useInView(s3, { margin: "-45% 0px -45% 0px" });

  const activeIndex = v3 ? 3 : v2 ? 2 : v1 ? 1 : v0 ? 0 : 0;
  const progressPct = (activeIndex / (steps.length - 1)) * 100;

  const [open, setOpen] = useState<number | null>(0);

  const faqs = useMemo(
    () =>
      H?.faq?.items ?? [
        {
          q: "Comment obtenir un devis rapidement ?",
          a: "Indiquez la ville du chantier, un volume estimé (m³), la date souhaitée et les contraintes d’accès. Si vous pensez avoir besoin d’une pompe, précisez-le.",
        },
        {
          q: "Quels éléments sont nécessaires pour planifier la livraison ?",
          a: "Adresse exacte, accès chantier, créneau souhaité, cadence prévue, et contact sur site. Cela aide à organiser la logistique et respecter les délais.",
        },
        {
          q: "Proposez-vous un support technique chantier ?",
          a: "Oui, selon le besoin. Notre équipe vous oriente sur les infos à fournir et les contraintes à anticiper (accès, pompage, organisation).",
        },
        {
          q: "Quels types de projets livrez-vous ?",
          a: "Résidentiel, infrastructures, aménagements, chantiers publics et privés. L’essentiel : une planification claire pour sécuriser la cadence.",
        },
      ],
    [H]
  );

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src={HERO_IMG}
          alt={H?.hero?.alt ?? "Process BETORIF"}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <Reveal>
            <p className="text-xs font-semibold tracking-wider text-orange-300">
              {H?.hero?.badge ?? "PROCESS"}
            </p>
            <h1 className="font-display mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {H?.hero?.title ?? "Comment ça marche ?"}
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed">
              {H?.hero?.subtitle ??
                "Un parcours simple, clair et orienté chantier — de la demande de devis à la livraison planifiée."}
            </p>
          </Reveal>

          <div className="mt-10">
            {/* Desktop rail */}
            <div className="relative hidden md:block">
              <div className="h-px w-full bg-white/15" />
              <motion.div
                className="absolute left-0 top-0 h-px bg-orange-400"
                style={{ width: `${progressPct}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              />
              <div className="absolute left-0 top-0 -translate-y-1/2 flex w-full justify-between">
                {steps.map((_: unknown, i: number) => (
                  <div
                    key={i}
                    className={[
                      "h-3.5 w-3.5 rounded-full border",
                      i <= activeIndex
                        ? "bg-orange-400 border-orange-200/40"
                        : "bg-slate-950 border-white/20",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>

            {/* Steps grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div ref={s0}>
                <TimelineStep
                  idx={0}
                  title={steps[0]?.title ?? ""}
                  desc={steps[0]?.desc ?? ""}
                  active={activeIndex === 0}
                  activeText={H?.active ?? "En cours de lecture"}
                  stepText={H?.stepLabel ?? "Étape"}
                />
              </div>
              <div ref={s1}>
                <TimelineStep
                  idx={1}
                  title={steps[1]?.title ?? ""}
                  desc={steps[1]?.desc ?? ""}
                  active={activeIndex === 1}
                  activeText={H?.active ?? "En cours de lecture"}
                  stepText={H?.stepLabel ?? "Étape"}
                />
              </div>
              <div ref={s2}>
                <TimelineStep
                  idx={2}
                  title={steps[2]?.title ?? ""}
                  desc={steps[2]?.desc ?? ""}
                  active={activeIndex === 2}
                  activeText={H?.active ?? "En cours de lecture"}
                  stepText={H?.stepLabel ?? "Étape"}
                />
              </div>
              <div ref={s3}>
                <TimelineStep
                  idx={3}
                  title={steps[3]?.title ?? ""}
                  desc={steps[3]?.desc ?? ""}
                  active={activeIndex === 3}
                  activeText={H?.active ?? "En cours de lecture"}
                  stepText={H?.stepLabel ?? "Étape"}
                />
              </div>
            </div>

            {/* CTA row */}
            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-white/75">
                  {H?.ctaLine ?? (
                    <>
                      Pour accélérer le devis : <b className="text-white">ville</b>,{" "}
                      <b className="text-white">volume</b>, <b className="text-white">date</b> et{" "}
                      <b className="text-white">accès</b>.
                    </>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={L("/contact")}
                    className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                  >
                    {H?.ctaQuote ?? "Demander un devis"}
                  </Link>
                  <a
                    href="https://wa.me/212665293314"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15"
                  >
                    {t?.nav?.whatsapp ?? "WhatsApp"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ + Side CTA */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 lg:col-span-8">
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-orange-600">
                        {H?.faq?.badge ?? "FAQ"}
                      </p>
                      <h2 className="font-display mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                        {H?.faq?.title ?? "Questions fréquentes"}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600">
                        {H?.faq?.subtitle ?? "Réponses rapides aux questions les plus courantes."}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      {H?.faq?.pill ?? "Support chantier"}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {faqs.map((f: any, i: number) => (
                      <FaqItem
                        key={f.q}
                        q={f.q}
                        a={f.a}
                        open={open === i}
                        onToggle={() => setOpen(open === i ? null : i)}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <Reveal delay={0.06}>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-xs font-semibold tracking-wider text-orange-600">
                    {H?.side?.badge ?? "DEVIS"}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold text-slate-900">
                    {H?.side?.title ?? "Besoin d’un devis rapide ?"}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {H?.side?.desc ?? (
                      <>
                        Préparez : <b>ville</b>, <b>volume</b> (m³), <b>date</b> souhaitée, contraintes d’accès. Si
                        besoin, précisez <b>pompe</b>.
                      </>
                    )}
                  </p>

                  <div className="mt-6 grid gap-3">
                    <Link
                      href={L("/contact")}
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                    >
                      {H?.ctaQuote ?? "Demander un devis"}
                    </Link>
                    <a
                      href="https://wa.me/212665293314"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                    >
                      {t?.nav?.whatsapp ?? "WhatsApp"}
                    </a>
                  </div>

                  <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <div className="text-xs font-semibold tracking-wider text-orange-600">
                      {H?.side?.tipBadge ?? "ASTUCE"}
                    </div>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      {H?.side?.tip ?? "Plus la demande est précise, plus la réponse est rapide."}
                    </p>
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
              MADE BY <a href="https://www.kaeynadigital.com" target="_blank" rel="noreferrer" className="text-white font-black italic hover:text-orange-500 transition-colors">Kaeynadigital.com</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
