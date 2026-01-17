'use client';

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import MultiImageUpload from "./MultiImageUpload";
import { saveProject } from "@/app/actions";
import { z } from "zod";

// ✅ DESIGN SYSTEM strikt eingehalten!
const schema = z.object({
  title: z.string().min(1, "Titel erforderlich").max(100),
  category: z.string().min(1, "Kategorie erforderlich").max(50),
  description: z.string().min(10, "Mindestens 10 Zeichen").max(500),
});

type FormData = z.infer<typeof schema>;

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  cover_url: string | null;
  detail_urls: string[];
  images_order: string[];
  created_at?: string;
}

interface Props {
  project: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export default function ProjektEditor({ project, onClose, onSave }: Props) {
  // WICHTIG: Wenn project.id leer ist, generieren wir hier eine für diese Session!
  // Wir nutzen useState mit lazy initializer, damit die ID stabil bleibt beim Re-Render
  const [currentProjectId] = useState(() => 
    project.id && project.id.trim() !== "" ? project.id : crypto.randomUUID()
  );

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageData, setImageData] = useState<{
    cover_url: string;
    detail_urls: string[];
    images_order: string[];
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
    },
  });

  useEffect(() => {
    reset({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
    });
    setImageData(null);
    setServerError(null);
    // Wir resetten NICHT currentProjectId, da das eine neue Editor-Instanz wäre
  }, [project.id, reset]);

  const onSubmit = async (data: FormData) => {
    // Prüfe auf Bilder: Entweder neue imageData oder existierende Projektdaten
    const hasAnyImages = imageData 
      ? (imageData.cover_url || imageData.detail_urls.length > 0)
      : (project.cover_url || project.detail_urls.length > 0);

    if (!hasAnyImages) {
      setServerError("Mindestens 1 Bild erforderlich");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      // WICHTIG: Nutze currentProjectId statt project.id!
      formData.append('id', currentProjectId);
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('cover_url', imageData?.cover_url || project.cover_url || '');
      formData.append('detail_urls', JSON.stringify(imageData?.detail_urls || project.detail_urls));
      formData.append('images_order', JSON.stringify(imageData?.images_order || project.images_order));

      const result = await saveProject(formData);
      
      if (result.success) {
        const savedProject: Project = {
          ...project,
          id: currentProjectId, // Aktualisierte ID
          title: data.title,
          category: data.category,
          description: data.description,
          cover_url: imageData?.cover_url || project.cover_url || null,
          detail_urls: imageData?.detail_urls || project.detail_urls,
          images_order: imageData?.images_order || project.images_order,
        };
        onSave(savedProject);
        onClose();
      } else {
        setServerError(result.error || "Unbekannter Fehler");
      }
    });
  };

  const imageCount = (imageData?.detail_urls.length || project.detail_urls.length) + 1;
  const hasImages = imageData || project.cover_url || project.detail_urls.length > 0;

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] overflow-hidden border border-slate-200 shadow-md">
        
        {/* Header */}
        <div className="sticky top-0 px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {project.id ? "Bearbeiten" : "Neues"} Projekt
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                ID: {currentProjectId.slice(-8)}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isPending}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Title + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Titel <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title")}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all text-lg"
                  placeholder="z.B. Komplett Entrümpelung Nienburg"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Kategorie <span className="text-red-500">*</span>
                </label>
                <select {...register("category")}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all">
                  <option value="">Auswählen</option>
                  <option value="Entrümpelung">Entrümpelung</option>
                  <option value="Umzug">Umzug</option>
                  <option value="Garten">Garten</option>
                  <option value="Abriss">Abriss</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Beschreibung <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all resize-vertical"
                placeholder="Projektbeschreibung..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Images */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Galerie</h4>
                    <p className="text-sm text-slate-600">
                      {hasImages ? `${imageCount} Bilder` : "Keine Bilder"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
                >
                  Bilder bearbeiten
                </button>
              </div>
            </div>

            {serverError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{serverError}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={isPending || !watch("title") || !watch("category") || !watch("description") || !hasImages}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Speichern...
                  </>
                ) : (
                  'Speichern'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Image Modal */}
        {showImageModal && (
          <MultiImageUpload
            projectId={currentProjectId} // ✅ Nutze hier currentProjectId!
            onClose={() => setShowImageModal(false)}
            initialImages={{
              coverUrl: imageData?.cover_url || project.cover_url || undefined,
              detailUrls: imageData?.detail_urls || project.detail_urls,
              images_order: imageData?.images_order || project.images_order,
            }}
            onUploadComplete={(result) => {
              setImageData(result);
              setShowImageModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
