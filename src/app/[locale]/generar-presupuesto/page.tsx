"use client";

import { useState } from "react";
import Link from "next/link";
import ProposalForm from "@/components/dashboard/ProposalForm";
import ProposalView from "@/components/dashboard/ProposalView";
import { initialFormState, type ProposalFormState } from "@/lib/constants/proposal";

export default function GenerarPresupuestoPage() {
  const [view, setView] = useState<"form" | "preview">("form");
  const [form, setForm] = useState<ProposalFormState>(initialFormState);

  return (
    <section className="pt-28 pb-16 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner dashboard */}
        <div className="bg-gradient-to-r from-[#194973] to-[#0f3150] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white text-sm">
            <span className="font-bold">Nuevo:</span> Usa el dashboard para guardar, enviar y gestionar tus propuestas
          </div>
          <Link
            href="/dashboard/propuestas/nueva"
            className="bg-[#71C648] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#5db33a] transition-colors whitespace-nowrap"
          >
            Ir al dashboard
          </Link>
        </div>

        {/* Toggle editor / vista cliente */}
        <div className="flex justify-center gap-1 mb-6 bg-gray-200 rounded-xl p-1">
          <button
            onClick={() => setView("form")}
            className={`flex-1 py-3 px-5 rounded-lg font-semibold text-sm transition-all ${
              view === "form"
                ? "bg-white text-[#194973] shadow-sm"
                : "text-[#5A6D6D] hover:text-[#194973]"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setView("preview")}
            className={`flex-1 py-3 px-5 rounded-lg font-semibold text-sm transition-all ${
              view === "preview"
                ? "bg-white text-[#194973] shadow-sm"
                : "text-[#5A6D6D] hover:text-[#194973]"
            }`}
          >
            Vista cliente
          </button>
        </div>

        {view === "form" ? (
          <ProposalForm form={form} setForm={setForm} onGenerate={() => setView("preview")} />
        ) : (
          <ProposalView form={form} onBack={() => setView("form")} />
        )}
      </div>
    </section>
  );
}
