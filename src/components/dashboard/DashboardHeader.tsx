"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardHeader({ userEmail }: { userEmail?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      {/* Spacer for mobile hamburger */}
      <div className="lg:hidden w-10" />

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/propuestas/nueva"
          className="bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#71C648]/30 transition-all"
        >
          + Nueva propuesta
        </Link>

        <div className="flex items-center gap-2 ml-2">
          <div className="w-8 h-8 rounded-full bg-[#194973] text-white flex items-center justify-center text-xs font-bold">
            {userEmail ? userEmail[0].toUpperCase() : "A"}
          </div>
          <button
            onClick={handleLogout}
            className="text-[#5A6D6D] hover:text-[#194973] text-sm font-medium transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
