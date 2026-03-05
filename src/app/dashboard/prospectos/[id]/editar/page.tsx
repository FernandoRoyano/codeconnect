"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProspectForm from "@/components/dashboard/ProspectForm";
import type { ProspectFormState, ProspectPipelineStatus } from "@/lib/constants/prospect";
import { initialProspectFormState } from "@/lib/constants/prospect";

export default function EditarProspectoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<ProspectFormState>(initialProspectFormState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProspect();
  }, [id]);

  const fetchProspect = async () => {
    const res = await fetch(`/api/prospects/${id}`);
    if (res.ok) {
      const data = await res.json();
      setForm({
        name: data.name || "",
        position: data.position || "",
        company: data.company || "",
        city: data.city || "",
        country: data.country || "",
        segment: data.segment || "",
        whyGoodProspect: data.why_good_prospect || "",
        contactNotes: data.contact_notes || "",
        websiteUrl: data.website_url || "",
        hasOnlineBooking: data.has_online_booking || false,
        hasApp: data.has_app || false,
        websiteQuality: data.website_quality || 0,
        email: data.email || "",
        phone: data.phone || "",
        pipelineStatus: (data.pipeline_status as ProspectPipelineStatus) || "identificado",
      });
    }
    setLoading(false);
  };

  const saveProspect = async () => {
    if (!form.name.trim()) return;
    setSaving(true);

    const res = await fetch(`/api/prospects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push(`/dashboard/prospectos/${id}`);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>;

  return (
    <div>
      <Link href={`/dashboard/prospectos/${id}`} className="text-[#5A6D6D] text-sm hover:text-[#194973] transition-colors mb-4 inline-block">
        &larr; Volver al prospecto
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#194973]">Editar prospecto</h1>
        <p className="text-[#5A6D6D] text-sm mt-1">{form.name}</p>
      </div>

      <div className="max-w-3xl">
        <ProspectForm
          form={form}
          setForm={setForm}
          onSubmit={saveProspect}
          submitLabel="Guardar cambios"
          saving={saving}
        />
      </div>
    </div>
  );
}
