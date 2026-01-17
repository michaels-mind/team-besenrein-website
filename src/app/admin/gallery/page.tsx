"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, ImageIcon, User } from "lucide-react";
import ProjektEditor from "@/components/admin/ProjektEditor";
import { supabase } from "@/lib/api/supabase";

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

export default function AdminGalleryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [optimisticProjects, setOptimisticProjects] = useState<Project[]>([]);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  async function checkAuthAndFetch() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) fetchProjects();
    else setLoading(false);
  }

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, category, description, cover_url, detail_urls, images_order, created_at")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Fetch projects failed:", error);
    } else {
      const mappedProjects = (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        description: p.description,
        cover_url: p.cover_url,
        detail_urls: p.detail_urls || [],
        images_order: p.images_order || [],
        created_at: p.created_at,
      }));
      setProjects(mappedProjects);
      setOptimisticProjects(mappedProjects);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Projekt wirklich löschen?")) return;
    
    setOptimisticProjects(prev => prev.filter(p => p.id !== id));
    
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Löschen fehlgeschlagen: " + error.message);
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject({
      ...project,
      detail_urls: project.detail_urls || [],
      images_order: project.images_order || [],
    });
  };

  const createNewProject = () => {
    setEditingProject({
      id: "",
      title: "",
      category: "",
      description: "",
      cover_url: null,
      detail_urls: [],
      images_order: [],
    });
  };

  const handleSave = () => {
    setEditingProject(null);
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mb-4"></div>
          <p className="text-slate-600">Projekte laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <User className="w-16 h-16 text-slate-400 mb-4" />
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Admin Gallery</h1>
        <p className="text-slate-600 mb-6 max-w-md">Bitte melde dich im Admin-Bereich an.</p>
        <a href="/admin" className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Zum Admin Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Galerie Verwaltung</h1>
            <p className="mt-1 text-sm text-slate-600">
              {optimisticProjects.length} Projekte
            </p>
          </div>
          <button
            onClick={createNewProject}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="h-5 w-5" />
            Neues Projekt
          </button>
        </div>

        {/* Projects Grid */}
        {optimisticProjects.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <ImageIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Keine Projekte</h2>
            <p className="text-slate-600">Erstelle dein erstes Projekt!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {optimisticProjects.map((project) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {project.cover_url ? (
                    <Image
                      src={project.cover_url}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {project.category}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {project.detail_urls.length + 1} Bilder
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {editingProject && (
        <ProjektEditor
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
