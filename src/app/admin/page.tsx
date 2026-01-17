"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/api/supabase";
import {
  Loader2,
  Calendar,
  Phone,
  Mail,
  Search,
  Filter,
  X,
} from "lucide-react";

type Inquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string | null;
  images: string[] | string | null;
};

const STATUS_OPTIONS = [
  { value: "neu", label: "Neu", color: "bg-sky-100 text-sky-800" },
  { value: "gelesen", label: "Gelesen", color: "bg-slate-100 text-slate-600" },
  {
    value: "in_bearbeitung",
    label: "In Bearbeitung",
    color: "bg-yellow-100 text-yellow-800",
  },
  { value: "erledigt", label: "Erledigt", color: "bg-green-100 text-green-800" },
  { value: "abgelehnt", label: "Abgelehnt", color: "bg-red-100 text-red-800" },
];

const getPublicImageUrl = (path: string) => {
  const { data } = supabase.storage.from("inquiry-images").getPublicUrl(path);
  return data.publicUrl;
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("alle");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fehler beim Laden:", error);
      showToast("Fehler beim Laden der Anfragen", "error");
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      showToast("Status erfolgreich aktualisiert", "success");
    } else {
      showToast("Fehler beim Aktualisieren", "error");
    }
    setUpdatingId(null);
  };

  const getImagesArray = (inquiry: Inquiry): string[] => {
    if (Array.isArray(inquiry.images)) return inquiry.images;
    if (typeof inquiry.images === "string") {
      try {
        return JSON.parse(inquiry.images);
      } catch {
        return [];
      }
    }
    return [];
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      (inquiry.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.phone || "").includes(searchTerm) ||
      (inquiry.message || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "alle" || (inquiry.status || "neu") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string | null) => {
    const statusObj = STATUS_OPTIONS.find((s) => s.value === (status || "neu"));
    return statusObj?.color || "bg-slate-100 text-slate-600";
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-lg px-6 py-3 shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toast.message}
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute right-4 top-4 text-white hover:text-slate-300"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Vergrößertes Bild"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter & Search */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Eingegangene Anfragen ({filteredInquiries.length})
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Name, E-Mail, Telefon oder Nachricht durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="alle">Alle Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {filteredInquiries.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              {searchTerm || statusFilter !== "alle"
                ? "Keine Anfragen gefunden."
                : "Noch keine Anfragen vorhanden."}
            </div>
          ) : (
            filteredInquiries.map((inquiry) => {
              const safeImages = getImagesArray(inquiry);
              const currentStatus = inquiry.status || "neu";

              return (
                <div
                  key={inquiry.id}
                  className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-all ${
                    currentStatus === "neu"
                      ? "border-sky-200 shadow-md ring-1 ring-sky-100"
                      : "border-slate-200"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          currentStatus
                        )}`}
                      >
                        {STATUS_OPTIONS.find((s) => s.value === currentStatus)
                          ?.label || "NEU"}
                      </span>
                      <span className="flex items-center text-sm text-slate-500">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        {new Date(inquiry.created_at).toLocaleDateString(
                          "de-DE",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          updateStatus(inquiry.id, e.target.value)
                        }
                        disabled={updatingId === inquiry.id}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      {updatingId === inquiry.id && (
                        <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-3 md:col-span-1">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {inquiry.name}
                          </h3>
                          <p className="text-sm font-medium text-sky-600">
                            {inquiry.service}
                          </p>
                        </div>
                        <div className="space-y-1 text-sm text-slate-600">
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="flex items-center gap-2 hover:text-sky-600"
                          >
                            <Mail className="h-3.5 w-3.5" /> {inquiry.email}
                          </a>
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="flex items-center gap-2 hover:text-sky-600"
                          >
                            <Phone className="h-3.5 w-3.5" /> {inquiry.phone}
                          </a>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="mb-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700 whitespace-pre-wrap">
                          {inquiry.message}
                        </div>

                        {safeImages.length > 0 && (
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Angehängte Bilder ({safeImages.length})
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {safeImages.map((img, idx) => {
                                const url = getPublicImageUrl(img);
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => setLightboxImage(url)}
                                    className="relative block h-32 w-32 overflow-hidden rounded-lg border border-slate-200 transition-all hover:scale-105 hover:shadow-md"
                                  >
                                    <img
                                      src={url}
                                      alt="Kundenbild"
                                      className="h-full w-full object-cover"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
