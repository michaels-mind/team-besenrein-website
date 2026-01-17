"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { UploadCloud, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { submitInquiry } from "@/app/actions";
import { Container } from "@/components/common/Container";

const formSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen an."),
  email: z.string().email("Ungültige E-Mail-Adresse."),
  phone: z.string().min(6, "Bitte geben Sie eine gültige Telefonnummer an."),
  service: z.enum(["entruempelung", "garten", "abriss", "umzug", "sonstiges"]),
  message: z.string().min(10, "Bitte beschreiben Sie Ihr Anliegen kurz."),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { service: "entruempelung" },
  });

  const onDrop = (acceptedFiles: File[]) => {
    setUploadFiles((prev) => [...prev, ...acceptedFiles].slice(0, 5));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 5 * 1024 * 1024,
  });

  const onSubmit = (data: FormValues) => {
    setStatus("idle");
    setErrorMessage("");
    
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("service", data.service);
        formData.append("message", data.message);

        uploadFiles.forEach((file) => formData.append("images", file));

        const result = await submitInquiry(formData);

        if (result?.success) {
          setStatus("success");
          reset();
          setUploadFiles([]);
        } else {
          setStatus("error");
          setErrorMessage(result?.error || "Ein unbekannter Fehler ist aufgetreten.");
        }
      } catch (e) {
        setStatus("error");
        setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es später.");
        console.error(e);
      }
    });
  };

  // Erfolgs-Ansicht
  if (status === "success") {
    return (
      <section id="kontakt" className="border-t border-slate-200 bg-white py-16 lg:py-24">
        <Container className="max-w-2xl">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 p-12 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-900">Anfrage gesendet!</h3>
            <p className="mb-6 text-slate-600">Wir haben Ihre Daten erhalten und melden uns in Kürze.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700"
            >
              Neue Anfrage stellen
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="kontakt" className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <Container className="max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Kostenloses Angebot anfordern
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Beschreiben Sie Ihr Projekt. Fotos helfen uns für eine genaue Einschätzung.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Grid für Name/Tel */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Name</label>
              <input
                {...register("name")}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Max Mustermann"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Telefon</label>
              <input
                {...register("phone")}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="0170 12345678"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">E-Mail Adresse</label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="max@beispiel.de"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Service */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Gewünschte Leistung</label>
            <select
              {...register("service")}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="entruempelung">Entrümpelung & Haushaltsauflösung</option>
              <option value="garten">Garten & Landschaftsbau</option>
              <option value="abriss">Abrissarbeiten</option>
              <option value="umzug">Umzug & Transport</option>
              <option value="sonstiges">Sonstiges</option>
            </select>
          </div>

          {/* Nachricht */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Nachricht</label>
            <textarea
              {...register("message")}
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Was genau soll gemacht werden? Gibt es Besonderheiten (z.B. Etage, Fahrstuhl)?"
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>

          {/* Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Fotos hochladen (Optional)</label>
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                isDragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-slate-300 hover:bg-slate-50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="mb-3 rounded-full bg-slate-100 p-3">
                <UploadCloud className={`h-6 w-6 ${isDragActive ? "text-primary" : "text-slate-400"}`} />
              </div>
              <p className="text-sm font-medium text-slate-700">Klicken zum Auswählen</p>
              <p className="mt-1 text-xs text-slate-500">oder Bilder hier reinziehen (max. 5MB)</p>
            </div>

            {/* Bilder Liste */}
            {uploadFiles.length > 0 && (
              <ul className="mt-4 space-y-2">
                {uploadFiles.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                    <span className="truncate text-slate-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setUploadFiles((prev) => prev.filter((_, i) => i !== idx))}
                      className="ml-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Fehlermeldung */}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full py-4 text-base font-bold disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              "Kostenloses Angebot anfordern"
            )}
          </button>
        </form>
      </Container>
    </section>
  );
}
