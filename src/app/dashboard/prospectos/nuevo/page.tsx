"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProspectForm from "@/components/dashboard/ProspectForm";
import { initialProspectFormState, type ProspectFormState } from "@/lib/constants/prospect";

export default function NuevoProspectoPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProspectFormState>(initialProspectFormState);
  const [saving, setSaving] = useState(false);

  const saveProspect = async () => {
    if (!form.name.trim()) return;
    setSaving(true);

    const res = await fetch("/api/prospects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      router.push(`/dashboard/prospectos/${data.id}`);
    }
    setSaving(false);
  };

  return (
    <div>
      <Link href="/dashboard/prospectos" className="text-[#5A6D6D] text-sm hover:text-[#194973] transition-colors mb-4 inline-block">
        &larr; Volver a prospectos
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#194973]">Nuevo prospecto</h1>
        <p className="text-[#5A6D6D] text-sm mt-1">Registra un nuevo potencial cliente</p>
      </div>

      <div className="max-w-3xl">
        <ProspectForm
          form={form}
          setForm={setForm}
          onSubmit={saveProspect}
          submitLabel="Crear prospecto"
          saving={saving}
        />
      </div>
    </div>
  );
}
