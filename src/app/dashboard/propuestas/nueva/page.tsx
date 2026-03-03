"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProposalForm from "@/components/dashboard/ProposalForm";
import ProposalView from "@/components/dashboard/ProposalView";
import { initialFormState, type ProposalFormState } from "@/lib/constants/proposal";

export default function NuevaPropostaPage() {
  const router = useRouter();
  const [view, setView] = useState<"form" | "preview">("form");
  const [form, setForm] = useState<ProposalFormState>(initialFormState);
  const [saving, setSaving] = useState(false);

  const saveProposal = async (status: "borrador" | "enviada") => {
    if (!form.projectName || !form.totalPrice) return;
    setSaving(true);

    const res = await fetch("/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status }),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/dashboard/propuestas/${data.id}`);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {/* Toggle editor / vista */}
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
          <div className="flex flex-col gap-4">
            <ProposalForm form={form} setForm={setForm} onGenerate={() => setView("preview")} submitLabel="Vista previa" />

            {/* Save buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => saveProposal("borrador")}
                disabled={saving || !form.projectName}
                className="flex-1 py-3 bg-white border-2 border-gray-200 text-[#194973] font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar borrador"}
              </button>
              <button
                onClick={() => saveProposal("enviada")}
                disabled={saving || !form.projectName || !form.totalPrice}
                className="flex-1 py-3 bg-[#194973] text-white font-semibold rounded-xl hover:bg-[#0f3150] transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar y enviar"}
              </button>
            </div>
          </div>
        ) : (
          <ProposalView form={form} onBack={() => setView("form")} readOnly />
        )}
      </div>
    </div>
  );
}
