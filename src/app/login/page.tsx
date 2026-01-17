"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/api/supabase";
import { Loader2, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Falsche E-Mail oder Passwort.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      
      {/* HIER IST DER ZURÜCK-BUTTON */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <div className="relative h-24 w-60">
            <Image
              src="/logo/besenrein-logo.svg" 
              alt="Team Besenrein"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-500">Nur für autorisiertes Personal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="admin@team-besenrein.de"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
