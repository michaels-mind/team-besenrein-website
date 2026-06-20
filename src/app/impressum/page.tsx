import Link from "next/link";

export const metadata = {
  title: "Impressum | Team Besenrein",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Impressum</h1>

      <div className="space-y-6 leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Angaben gemäß § 5 DDG
          </h2>
          <p>
            Team Besenrein
            <br />
            Inhaber: Timur Gürses
            <br />
            In den Gärten 10
            <br />
            31582 Nienburg (Weser)
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">Kontakt</h2>
          <p>
            Telefon: 0176 62584987
            <br />
            E-Mail: kontakt@team-besenrein.de
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Redaktionell verantwortlich
          </h2>
          <p>
            Timur Gürses
            <br />
            In den Gärten 10
            <br />
            31582 Nienburg (Weser)
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            EU-Streitschlichtung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden
            Sie oben im Impressum.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link href="/" className="text-primary hover:underline">
          ← Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}