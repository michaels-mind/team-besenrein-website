"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { Container } from "@/components/common/Container";

const BEFORE = "/projekte/vorher.webp";
const AFTER = "/projekte/nachher.webp";

export default function Gallery() {
  const [pos, setPos] = useState(50);

  return (
    <section id="galerie" className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Emotionaler Text */}
          <div>
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">
              Unsere Arbeit
            </span>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 lg:text-4xl">
              Manchmal wird es alleine zu viel.
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-slate-600">
              Eine Wohnung auflösen, einen Keller leeren, einen Garten
              zurückerobern – das kostet Kraft, Zeit und manchmal Überwindung.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Genau dann sind wir da: diskret, schnell und besenrein. Sie rufen
              an – den Rest übernehmen wir.
            </p>
            <Link href="#kontakt" className="btn-primary w-fit">
              Kostenlos anfragen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Vorher / Nachher Slider */}
          <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-900/5">
            {/* Nachher (voll) */}
            <Image
              src={AFTER}
              alt="Nachher"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Vorher (geclippt) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={BEFORE}
                alt="Vorher"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Labels */}
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Vorher
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Nachher
            </span>

            {/* Trennlinie + Griff */}
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                <MoveHorizontal className="h-5 w-5" />
              </div>
            </div>

            {/* Unsichtbarer Regler zum Ziehen */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Vorher/Nachher-Regler"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}