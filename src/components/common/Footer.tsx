import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

// ── HIER ANPASSEN ────────────────────────────
const PHONE_DISPLAY = "0176 62584987";
const PHONE_LINK = "+4917662584987";
const EMAIL = "kontakt@team-besenrein.de";
const AREA = "Nienburg, Hoya, Rehburg-Loccum, Stolzenau & Umgebung";
// ─────────────────────────────────────────────

const LEISTUNGEN = [
  { label: "Entrümpelung", href: "#leistungen" },
  { label: "Umzüge & Transport", href: "#leistungen" },
  { label: "Abriss & Handwerk", href: "#leistungen" },
  { label: "Garten & Landschaft", href: "#leistungen" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Marke */}
          <div>
            <span className="text-xl font-bold text-white">Team Besenrein</span>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Ihr Partner für Entrümpelung, Umzüge und Haushaltsauflösungen –
              professionell, diskret und zum garantierten Festpreis.
            </p>
          </div>

          {/* Spalte 2: Kontakt */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`tel:${PHONE_LINK}`}
                  className="flex items-center gap-3 hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                  {PHONE_DISPLAY}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                  {EMAIL}
                </Link>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{AREA}</span>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Leistungen */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Leistungen
            </h3>
            <ul className="space-y-3 text-sm">
              {LEISTUNGEN.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spalte 4: Rechtliches */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Rechtliches
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-white">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-white">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Team Besenrein. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}