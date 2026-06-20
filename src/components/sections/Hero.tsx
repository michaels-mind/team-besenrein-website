"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";

const SLIDES = ["/hero/hero-1.webp", "/hero/hero-2.webp", "/hero/hero-3.webp"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Graue Hintergrund-Diagonalen */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[55vh] w-[45vw] bg-slate-200 [clip-path:polygon(100%_0,100%_100%,30%_0)]" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[35vw] bg-slate-200 [clip-path:polygon(0_100%,60%_100%,0_25%)]" />
      </div>

      <Container className="relative z-10 flex min-h-[80svh] items-stretch py-6 lg:py-8">
        <div className="relative w-full flex-1 overflow-hidden rounded-3xl shadow-2xl">
          {/* FOTO-REGION (rechts sichtbar) – Slides, full-bleed */}
          {SLIDES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Eindruck ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* DECKENDE FARBFLÄCHE LINKS mit Diagonale */}
          <div className="absolute inset-0 bg-primary lg:[clip-path:polygon(0_0,55%_0,42%_100%,0_100%)]" />

          {/* HELLERE DIAGONALE über dem Foto (entlang der Kante) */}
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-primary/30 lg:block lg:[clip-path:polygon(55%_0,65%_0,52%_100%,42%_100%)]"
          />

          {/* TEXT */}
          <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-center px-8 py-12 text-white sm:px-12 lg:w-[50%] lg:pr-16">
            <span className="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80">
              <MapPin className="h-5 w-5" />
              Nienburg (Weser)
            </span>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Sauber, schnell,
              <br />
              besenrein.
              <br />
              <span className="text-white/60">Seit über 10 Jahren.</span>
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