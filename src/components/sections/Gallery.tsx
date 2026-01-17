"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { supabase } from "@/lib/api/supabase";
import { Container } from "@/components/common/Container";

type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  cover_image: string;
  images: string[];
};

export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState<string[]>(["Alle"]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, category, description, cover_url, detail_urls")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch projects failed:", error);
      return;
    }
    const projectsData = data.map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      cover_image: p.cover_url,
      images: p.detail_urls || [],
    }));
    setProjects(projectsData);
    setCategories(["Alle", ...new Set(projectsData.map((p: Project) => p.category))]);
  };

  const filteredProjects =
    activeCategory === "Alle"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (project: Project, index = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const allImages = [selectedProject.cover_image, ...selectedProject.images];
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject) return;
    const allImages = [selectedProject.cover_image, ...selectedProject.images];
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const allImagesForProject = (project: Project) => [project.cover_image, ...project.images];

  return (
    <section id="galerie" className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Unsere Arbeit</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Eindrücke aus echten Projekten. Sauber. Schnell. Besenrein.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary scale-105 text-white shadow-md shadow-primary/25"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openLightbox(project)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/30">
                  <Expand className="h-12 w-12 scale-0 text-white opacity-0 drop-shadow-2xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="mb-2 inline-block rounded-full border border-white/30 bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold leading-tight text-white drop-shadow-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/90 drop-shadow-md">
                    {project.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-slate-200">
                    {allImagesForProject(project).length} Bild{allImagesForProject(project).length !== 1 ? "er" : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <p className="text-xl text-slate-500">Noch keine Projekte in dieser Kategorie.</p>
          </div>
        )}
      </Container>

      {/* Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex animate-in fade-in zoom-in items-center justify-center bg-slate-900/98 p-4 backdrop-blur-md duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 z-50 scale-100 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
            aria-label="Schließen"
          >
            <X className="h-7 w-7" />
          </button>

          <div
            className="relative flex w-full max-w-6xl max-h-[95vh] flex-col items-center gap-8 md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-slate-800 shadow-2xl md:h-[70vh] lg:h-[80vh]">
              <Image
                src={allImagesForProject(selectedProject)[currentImageIndex]}
                alt={`${selectedProject.title} - Bild ${currentImageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              
              {allImagesForProject(selectedProject).length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 scale-100 rounded-2xl bg-white/20 p-3 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/40"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 scale-100 rounded-2xl bg-white/20 p-3 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/40"
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}
            </div>

            <div className="flex w-full flex-col items-center text-center md:w-auto md:max-w-md">
              <h3 className="mb-4 text-2xl font-bold text-white drop-shadow-md md:text-3xl">
                {selectedProject.title}
              </h3>
              <p className="mb-8 max-w-lg leading-relaxed text-slate-300 drop-shadow-md">
                {selectedProject.description}
              </p>
              
              <div className="scrollbar-thin scrollbar-thumb-slate-600/50 scrollbar-track-slate-800/20 flex w-full max-w-4xl justify-center gap-3 overflow-x-auto px-2 pb-4">
                {allImagesForProject(selectedProject).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl md:h-24 md:w-28 ${
                      currentImageIndex === idx
                        ? "border-4 border-primary scale-105 opacity-100"
                        : "border-4 border-transparent opacity-70 hover:border-white/50 hover:opacity-100"
                    }`}
                    aria-label={`Gehe zu Bild ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {idx === 0 && (
                      <span className="absolute -right-2 -top-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-white">
                        Cover
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Bild {currentImageIndex + 1} von {allImagesForProject(selectedProject).length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
