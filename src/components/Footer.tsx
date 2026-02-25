import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="font-display text-xl font-semibold tracking-tight text-slate-900">
              BETORIF
            </div>

            <p className="mt-4 max-w-sm text-sm text-slate-600 leading-relaxed">
              Spécialiste du béton prêt à l’emploi depuis 2004. Production
              industrielle, livraison planifiée et accompagnement professionnel.
            </p>

            <div className="mt-6 h-1 w-14 rounded-full bg-orange-500" />
          </div>

          {/* Navigation */}
          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-900">
              Navigation
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/how-it-works"
                className="text-slate-600 transition hover:text-orange-600"
              >
                Comment ça marche
              </Link>

              <Link
                href="/about"
                className="text-slate-600 transition hover:text-orange-600"
              >
                À propos
              </Link>

              <Link
                href="/contact"
                className="text-slate-600 transition hover:text-orange-600"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-900">
              Contact
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div>📍 Avenue Hassan II, Immeuble BMCE BANK (5ème étage), Nador</div>
              <div>📞 +212 6 65 29 33 14</div>
              <div>📞 +212 6 61 30 87 88</div>
              <div>✉️ info@betorif.ma</div>

              <div className="pt-3">
                <a
                  href="https://wa.me/212665293314"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} BETORIF — Tous droits réservés.</div>

          <div className="font-semibold text-orange-600">Béton prêt à l’emploi</div>
        </div>
      </div>
    </footer>
  );
}
