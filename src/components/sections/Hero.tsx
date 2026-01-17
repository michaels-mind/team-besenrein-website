"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/common/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero/hero-bild.webp"
          alt="Hintergrund"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <Container className="relative z-10 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative h-32 w-80">
            <Image
              src="/logo/besenrein-logo.svg"
              alt="Team Besenrein Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Entrümpelung & Umzüge in{" "}
          <span className="text-primary">Nienburg & Umgebung</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-slate-600">
          Wir schaffen Platz für Neues. Professionell, diskret und zum garantierten
          Festpreis. Ihr Partner für Haushaltsauflösungen und Transporte.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-4 text-sm font-medium">
          <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm text-primary">
            <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-success)' }} /> 
            Festpreis-Garantie
          </span>
          <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm text-primary">
            <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-success)' }} /> 
            Besenreine Übergabe
          </span>
          <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm text-primary">
            <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-success)' }} /> 
            Kostenlose Besichtigung
          </span>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="#kontakt" className="btn-primary">
            Kostenloses Angebot
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="#leistungen" className="btn-secondary">
            Leistungen ansehen
          </Link>
        </div>
      </Container>
    </section>
  );
}
