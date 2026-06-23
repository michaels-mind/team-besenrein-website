import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung | Team Besenrein",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Datenschutzerklärung
      </h1>

      <div className="space-y-8 leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            1. Verantwortlicher
          </h2>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <p className="mt-2">
            Team Besenrein
            <br />
            Timur Gürses
            <br />
            In den Gärten 10
            <br />
            31582 Nienburg (Weser)
            <br />
            Telefon: 0176 62584987
            <br />
            E-Mail: kontakt@team-besenrein.de
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            2. Technischer Betrieb der Website (Auftragsverarbeiter)
          </h2>
          <p>
            Der technische Betrieb dieser Website – einschließlich des
            Kontaktformulars und der nachfolgend genannten Dienste – erfolgt
            durch einen externen Dienstleister, der ausschließlich in unserem
            Auftrag und nach unseren Weisungen tätig wird:
          </p>
          <p className="mt-2">
            Michael Benkendorf (Michaels Mind)
            <br />
            Rabenhorst 29
            <br />
            31582 Nienburg
            <br />
            E-Mail: service@michaelsmind.de
          </p>
          <p className="mt-2">
            Mit dem Dienstleister besteht ein Vertrag zur Auftragsverarbeitung
            gemäß Art. 28 DSGVO. Die nachfolgend genannten Anbieter (Vercel,
            Resend, Upstash) werden als Unterauftragsverarbeiter eingesetzt; auch
            mit ihnen bestehen entsprechende Verträge zur Auftragsverarbeitung.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Hosting</h2>
          <p>
            Diese Website wird bei einem externen Dienstleister gehostet (Vercel
            Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA). Personenbezogene
            Daten, die auf dieser Website erfasst werden, werden auf den Servern
            des Hosters verarbeitet. Die Verarbeitung erfolgt zur Erfüllung
            unserer vertraglichen und vorvertraglichen Verpflichtungen sowie im
            Interesse einer sicheren und effizienten Bereitstellung unseres
            Onlineangebots (Art. 6 Abs. 1 lit. b und f DSGVO).
          </p>
          <p className="mt-2">
            Es besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
            Da eine Verarbeitung auch in den USA stattfinden kann, ist dieser
            Datentransfer zusätzlich durch die Standardvertragsklauseln (SCC) der
            EU-Kommission abgesichert.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            4. Server-Log-Dateien
          </h2>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch
            Informationen in Server-Log-Dateien, die Ihr Browser automatisch
            übermittelt (Browsertyp und -version, verwendetes Betriebssystem,
            Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der
            Serveranfrage, IP-Adresse). Eine Zusammenführung dieser Daten mit
            anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            5. Kontaktformular und E-Mail-Versand
          </h2>
          <p>
            Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen,
            werden Ihre Angaben aus dem Formular (Name, Telefonnummer,
            E-Mail-Adresse, gewünschte Leistung, Nachricht sowie optional
            hochgeladene Fotos) zwecks Bearbeitung der Anfrage und für den Fall
            von Anschlussfragen bei uns verarbeitet. Optional hochgeladene Fotos
            werden ausschließlich als Anhang der Anfrage-E-Mail übermittelt und
            nicht in einer separaten Datenbank gespeichert.
          </p>
          <p className="mt-2">
            Für den Versand dieser Anfragen per E-Mail nutzen wir den Dienst
            Resend (Plus Five Five, Inc., USA / Resend EU). Die Verarbeitung
            erfolgt in einem Rechenzentrum innerhalb der EU (Region Irland). Es
            besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO;
            eine etwaige Verarbeitung in den USA ist durch
            Standardvertragsklauseln (SCC) abgesichert.
          </p>
          <p className="mt-2">
            Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO
            (Anbahnung bzw. Erfüllung eines Vertrags) bzw. Art. 6 Abs. 1 lit. f
            DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen). Die
            Daten verbleiben bei uns, bis der Zweck der Speicherung entfällt oder
            Sie uns zur Löschung auffordern, soweit keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            6. Spam- und Missbrauchsschutz (Rate-Limiting)
          </h2>
          <p>
            Zum Schutz unseres Kontaktformulars vor automatisiertem Missbrauch
            und Spam begrenzen wir die Anzahl der Anfragen pro IP-Adresse. Hierzu
            wird Ihre IP-Adresse für kurze Zeit verarbeitet und temporär
            gespeichert. Wir nutzen dafür den Dienst Upstash (Upstash, Inc.,
            Delaware, USA).
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist unser berechtigtes Interesse an der Sicherheit
            und Funktionsfähigkeit unseres Angebots (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p className="mt-2">
            Upstash ist ein US-Anbieter; ein Zugriff aus den USA kann nicht
            vollständig ausgeschlossen werden. Der Datentransfer ist durch die
            Standardvertragsklauseln (SCC) der EU-Kommission sowie die
            Zertifizierung von Upstash unter dem EU-U.S. Data Privacy Framework
            abgesichert. Es besteht ein Vertrag zur Auftragsverarbeitung gemäß
            Art. 28 DSGVO.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            7. SSL- bzw. TLS-Verschlüsselung
          </h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw.
            TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am
            Schloss-Symbol in der Adresszeile Ihres Browsers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            8. Ihre Rechte
          </h2>
          <p>
            Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO),
            Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
            Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie ein
            Widerspruchsrecht (Art. 21). Zudem steht Ihnen ein Beschwerderecht
            bei einer Datenschutz-Aufsichtsbehörde zu. Wenden Sie sich hierzu an
            die oben genannten Kontaktdaten.
          </p>
        </section>

        <p className="text-sm text-slate-500">
          Stand: {new Date().toLocaleDateString("de-DE")}
        </p>
      </div>

      <div className="mt-12">
        <Link href="/" className="text-primary hover:underline">
          ← Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}