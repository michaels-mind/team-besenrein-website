"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/api/supabase";
import { LogOut, Loader2, MessageSquare, Images } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.replace("/login?redirect=/admin");
        return;
      }
      setLoading(false);
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session?.user) {
        router.replace("/login");
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    setLogoutLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Anfragen", icon: MessageSquare },
    { href: "/admin/gallery", label: "Galerie", icon: Images },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - UNVERÄNDERT */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-slate-900">
            Team Besenrein Admin
          </h1>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 disabled:opacity-50"
          >
            {logoutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Abmelden
          </button>
        </div>
      </header>

      {/* Navigation - UNVERÄNDERT */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
