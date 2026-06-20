"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";

const SLIDES = [
  { desktop: "/hero/hero-1.webp", mobile: "/hero/hero-mobile-1.webp" },
  { desktop: "/hero/hero-2.webp", mobile: "/hero/hero-mobile-2.webp" },
  { desktop: "/hero/hero-3.webp", mobile: "/hero/hero-mobile-3.webp" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Graue Hintergrund-Diagonalen */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[55vh] w-[45vw] bg-slate-200 [clip-path:polygon(100%_0,100%_100%,30%_0)]" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[35vw] bg-slate-200 [clip-path:polygon(0_100%,60%_100%,0_25%)]" />
      </div>

      <Container className="relative z-10 flex min-h-[80svh] items-stretch py-6 lg:py-8">
        {/* ───────── MOBILE: Foto oben (diagonal) + Farbfläche unten ───────── */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-primary shadow-2xl lg:hidden">
          {/* Foto mit diagonaler Unterkante */}
          <div className="relative h-[44svh] w-full shrink-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_86%)]">
            {SLIDES.map((slide, i) => (
              <img
                key={slide.mobile}
                src={slide.mobile}
                alt={`Eindruck ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Text */}
          <div className="px-6 pt-2 text-white">
            <span className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <MapPin className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                Nienburg (Weser)
              </span>
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
              Schnell, sauber,
              <br />
              besenrein.
              <br />
              <span className="text-white/60">Wir räumen auf. Du atmest auf.</span>
            </h1>

            <div className="mt-7 flex flex-col gap-3">
              <Link
                href="#leistungen"
                className="inline-flex w-fit items-center rounded-full bg-white px-7 py-3 text-base font-semibold text-primary shadow-md transition-colors hover:bg-white/90"
              >
                Unsere Leistungen
              </Link>
              <Link
                href="#kontakt"
                className="inline-flex w-fit items-center rounded-full border border-white/40 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Jetzt Kontakt aufnehmen
              </Link>
            </div>
          </div>

          {/* Slider-Steuerung unten */}
          <div className="mt-auto flex items-center justify-between px-5 py-5">
            <button
              onClick={prev}
              aria-label="Vorheriges Bild"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Zu Bild ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2.5 bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Nächstes Bild"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* ───────── DESKTOP: Diagonal-Split (Farbe links, Foto rechts) ───────── */}
        <div className="relative hidden w-full flex-1 overflow-hidden rounded-3xl bg-primary shadow-2xl lg:block">
          {SLIDES.map((slide, i) => (
            <img
              key={slide.desktop}
              src={slide.desktop}
              alt={`Eindruck ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* deckende Farbfläche links mit Diagonale */}
          <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,55%_0,42%_100%,0_100%)]" />

          {/* hellere Diagonale entlang der Kante */}
          <div
            aria-hidden
            className="absolute inset-0 bg-primary/30 [clip-path:polygon(55%_0,65%_0,52%_100%,42%_100%)]"
          />

          {/* Text links mittig */}
          <div className="absolute inset-y-0 left-0 flex w-[50%] flex-col justify-center px-12 pr-16 text-white">
            <span className="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80">
              <MapPin className="h-5 w-5" />
              Nienburg (Weser)
            </span>

            <h1 className="text-6xl font-extrabold leading-tight">
              Schnell, sauber,
              <br />
              besenrein.
              <br />
              <span className="text-white/60">Wir räumen auf. Du atmest auf.</span>
            </h1>

            <div className="mt-8">
              <Link
                href="#leistungen"
                className="inline-flex w-fit items-center rounded-full bg-white px-7 py-3 text-base font-semibold text-primary shadow-md transition-colors hover:bg-white/90"
              >
                Unsere Leistungen
              </Link>
            </div>
          </div>

          {/* Pfeile */}
          <div className="absolute bottom-5 right-5 z-10 flex gap-2">
            <button
              onClick={prev}
              aria-label="Vorheriges Bild"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow transition-colors hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Nächstes Bild"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow transition-colors hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Punkte */}
          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Zu Bild ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}