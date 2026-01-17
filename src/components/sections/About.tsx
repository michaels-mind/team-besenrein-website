"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/common/Container";

export default function About() {
  return (
    <section id="ueber-uns" className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Bild-Bereich */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mr-auto rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
                alt="Team Besenrein bei der Arbeit"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                    10+
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">Jahre Erfahrung</p>
                    <p className="text-sm text-slate-500">in Nienburg & Umgebung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text-Bereich */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full text-primary bg-primary/10">
              Das sind wir
            </span>
            <h2 className="mb-6 text-3xl font-bold text-slate-900 lg:text-4xl">
              Anpacken statt Schnacken. <br />
              <span className="text-primary">Ihr Team Besenrein.</span>
            </h2>
            
            <p className="mb-6 text-lg text-slate-600 leading-relaxed">
              Wir sind kein anonymes Großunternehmen, sondern ein eingespieltes Team aus Nienburg. 
              Wir wissen, dass eine Haushaltsauflösung oft mehr ist als nur "Müll rausbringen". 
              Es geht um Erinnerungen, Vertrauen und Diskretion.
            </p>
            
            <p className="mb-8 text-slate-600">
              Egal ob schwerer Transport, verwilderter Garten oder komplette Entkernung: 
              Wir verlassen die Baustelle erst, wenn sie wirklich besenrein ist.
            </p>

            <ul className="space-y-4">
              {[
                "100% Diskretion bei sensiblen Aufträgen",
                "Festpreis-Garantie ohne Nachverhandlungen",
                "Fachgerechte Entsorgung mit Nachweis",
                "Schnelle Termine in Nienburg & Region"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-primary" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-4">
              <div>
                <p className="font-bold text-slate-900">Timur Gürses</p>
                <p className="text-sm text-primary">Inhaber & Gründer</p>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
