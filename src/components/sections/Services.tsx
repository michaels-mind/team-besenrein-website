"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Container } from "@/components/common/Container";

const services = [
  {
    title: "Entrümpelung",
    description:
      "Besenreine Räumung von Häusern, Wohnungen und Kellern – inklusive fachgerechter Entsorgung und Wertanrechnung.",
    image: "/leistungen/entruempelung.webp",
    details: [
      "Wohnungs- & Hausauflösungen",
      "Keller, Dachboden & Garage",
      "Messie-Wohnungen (diskret)",
      "Fachgerechte Entsorgung mit Nachweis",
      "Wertanrechnung verwertbarer Gegenstände",
      "Besenreine Übergabe",
    ],
  },
  {
    title: "Umzüge & Transport",
    description:
      "Sicherer Transport Ihrer Möbel und Kartons. Wir kümmern uns um Abbau, Transport und Aufbau am neuen Ort.",
    image: "/leistungen/umzug.webp",
    details: [
      "Privat- & Firmenumzüge",
      "Möbel ab- und aufbauen",
      "Verpackung & Transport",
      "Transport einzelner Möbelstücke",
      "Entsorgung von Altmöbeln",
    ],
  },
  {
    title: "Abriss & Handwerk",
    description:
      "Entfernen von Tapeten, Bodenbelägen und nicht-tragenden Wänden – die saubere Vorbereitung für Ihre Renovierung.",
    image: "/leistungen/abriss.webp",
    details: [
      "Entkernung von Wohnungen",
      "Tapeten- & Bodenentfernung",
      "Abriss nicht-tragender Wände",
      "Demontage von Einbauten",
      "Renovierungs-Vorbereitung",
    ],
  },
  {
    title: "Garten & Landschaft",
    description:
      "Grünschnitt, Gartenpflege und Neugestaltung. Wir bringen Ihren Außenbereich wieder in Form.",
    image: "/leistungen/garten.webp",
    details: [
      "Grünschnitt & Gartenpflege",
      "Baum- & Heckenschnitt",
      "Gartenentrümpelung",
      "Neugestaltung & Bepflanzung",
      "Abtransport von Grünschnitt",
    ],
  },
];

export default function Services() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <section
      id="leistungen"
      className="py-16 lg:py-24"
      style={{
        background:
          "linear-gradient(180deg, var(--color-primary-light) 0%, #ffffff 60%)",
      }}
    >
      <Container>
        <h2 className="mb-12 text-4xl font-extrabold text-primary lg:text-5xl">
          Unsere Leistungen
        </h2>

        <div className="space-y-8">
          {services.map((service, i) => {
            const isOpen = open.has(i);
            return (
              <div
                key={i}
                className="overflow-hidden rounded-3xl bg-white p-3 shadow-md md:p-4"
              >
                <div className="grid items-stretch gap-2 md:grid-cols-[38%_1fr]">
                  {/* Foto */}
                  <div className="relative min-h-[240px] overflow-hidden rounded-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 38vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col p-5 md:p-8">
                    <h3 className="text-3xl font-bold text-slate-900 lg:text-4xl">
                      {service.title}
                    </h3>

                    <div className="my-5 h-px w-full bg-slate-200" />

                    <p className="leading-relaxed text-slate-600">
                      {service.description}
                    </p>

                    {/* Detailliste (aufklappbar) */}
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "mt-6 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                          Leistungen im Detail
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {service.details.map((d, di) => (
                            <li
                              key={di}
                              className="flex items-start gap-2 text-sm text-slate-600"
                            >
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* + Button */}
                    <button
                      onClick={() => toggle(i)}
                      aria-label={isOpen ? "Details schließen" : "Details anzeigen"}
                      className="mt-6 flex h-12 w-12 items-center justify-center self-end rounded-full bg-primary text-white shadow-md transition-all hover:scale-105 hover:bg-[var(--color-primary-hover)]"
                    >
                      <Plus
                        className={`h-6 w-6 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}