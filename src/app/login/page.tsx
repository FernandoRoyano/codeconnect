"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
    <form onSubmit={handleLogin} className="bg-white rounded-2xl p-7 shadow-2xl flex flex-col gap-5">
      <div>
        <label className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider mb-1 block">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-[#f8f9fa] text-[#194973] outline-none transition-colors focus:border-[#71C648]"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div>
        <label className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider mb-1 block">
          Contrasena
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-[#f8f9fa] text-[#194973] outline-none transition-colors focus:border-[#71C648]"
          placeholder="Tu contrasena"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white font-bold text-base rounded-xl hover:shadow-lg hover:shadow-[#71C648]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#194973] to-[#0f3150] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#71C648]" />
            <div className="w-8 h-8 rounded-full bg-white/30 -ml-5" />
            <span className="text-2xl font-extrabold text-white ml-1">CodeConnect</span>
          </div>
          <p className="text-white/50 text-sm">Panel de gestion</p>
        </div>

        <Suspense fallback={<div className="text-white/50 text-center">Cargando...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
