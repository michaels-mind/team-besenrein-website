"use client";

import Link from "next/link";
import { ArrowRight, Truck, Shovel, Hammer, Home } from "lucide-react";
import { Container } from "@/components/common/Container";

const services = [
  {
    title: "Entrümpelung",
    description: "Besenreine Räumung von Häusern, Wohnungen und Kellern. Inklusive fachgerechter Entsorgung und Wertanrechnung.",
    icon: Home,
    link: "/leistungen/entruempelung",
  },
  {
    title: "Umzüge & Transport",
    description: "Sicherer Transport Ihrer Möbel und Kartons. Wir kümmern uns um Abbau, Transport und Aufbau am neuen Ort.",
    icon: Truck,
    link: "/leistungen/umzug",
  },
  {
    title: "Abriss & Handwerk",
    description: "Entfernen von Tapeten, Bodenbelägen und nicht-tragenden Wänden. Vorbereitung für Ihre Renovierung.",
    icon: Hammer,
    link: "/leistungen/abriss",
  },
  {
    title: "Garten & Landschaft",
    description: "Grünschnitt, Gartenpflege und Neugestaltung. Wir bringen Ihren Außenbereich wieder in Form.",
    icon: Shovel,
    link: "/leistungen/garten",
  },
];

export default function Services() {
  return (
    <section 
      id="leistungen" 
      className="relative border-t border-slate-200 py-16 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background-poly.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      
      {/* Weißer Overlay für Lesbarkeit */}
      <div className="absolute inset-0 bg-white/40" />

      <Container className="relative z-10">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Unsere Leistungen
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Vom Dachboden bis zum Garten – wir sind Ihr Partner für Ordnung und Neustart in Nienburg.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
            >
              {/* KORRIGIERT: Icon-Container mit !important für sichere Farbe */}
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <service.icon 
                  className="h-6 w-6 transition-colors duration-300" 
                  style={{ 
                    color: 'var(--color-primary)',
                    strokeWidth: 2 
                  }}
                  strokeWidth={2}
                />
              </div>
              
              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {service.title}
              </h3>
              
              <p className="mb-6 flex-grow text-slate-600 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <Link
                  href="#kontakt"
                  className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-[var(--color-primary-hover)] focus:outline-none focus:underline"
                >
                  Angebot anfordern 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
