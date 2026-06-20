import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/common/Container";

const PHONE_DISPLAY = "0176 62584987";
const PHONE_LINK = "+4917662584987";
const EMAIL = "kontakt@team-besenrein.de";

export default function About() {
  return (
    <section id="ueber-uns" className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <Container>
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-primary">
            Über uns
          </span>
          <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
            Ihr Ansprechpartner
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Kein anonymes Großunternehmen – bei uns sprechen Sie direkt mit dem Chef.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Foto oben-links */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-900/5 lg:w-[52%]">
            <Image
              src="/team/timur.webp"
              alt="Timur Gürses – Inhaber Team Besenrein"
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-cover"
            />
          </div>

          {/* Text-Karte unten-rechts, über das Bild gelegt */}
          <div className="relative z-10 -mt-12 ml-auto w-full rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-900/5 lg:-mt-56 lg:w-[55%]">
            <p className="text-2xl font-bold text-primary">Timur Gürses</p>
            <p className="mb-5 text-slate-500">Inhaber &amp; Gründer</p>

            <p className="mb-6 text-lg italic leading-relaxed text-slate-700">
              &bdquo;Eine Haushaltsauflösung ist Vertrauenssache. Ich sorge
              persönlich dafür, dass alles diskret, sauber und zum vereinbarten
              Festpreis abläuft – und packe selbst mit an.&ldquo;
            </p>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:gap-8">
              <Link
                href={`tel:${PHONE_LINK}`}
                className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                {PHONE_DISPLAY}
              </Link>
              <Link
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 font-medium text-slate-700 hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" />
                {EMAIL}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}