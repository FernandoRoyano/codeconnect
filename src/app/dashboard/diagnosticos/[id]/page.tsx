"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  INQUIRY_SECTIONS,
  INQUIRY_STATUSES,
  INQUIRY_STATUS_CONFIG,
  type InquiryStatus,
} from "@/lib/constants/inquiry";

type Inquiry = Record<string, string | null> & {
  id: string;
  status: InquiryStatus;
  name: string;
  email: string;
  created_at: string;
};

const ORIGIN_FIELDS = [
  { key: "landing_path", label: "Landing" },
  { key: "referrer", label: "Referrer" },
  { key: "utm_source", label: "utm_source" },
  { key: "utm_medium", label: "utm_medium" },
  { key: "utm_campaign", label: "utm_campaign" },
  { key: "utm_term", label: "utm_term" },
  { key: "utm_content", label: "utm_content" },
];

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function DiagnosticoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries/${id}`);
      if (!res.ok) throw new Error("No se encontro el diagnostico");
      const data = await res.json();
      setInquiry(data);
      setNotes(data.internal_notes || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const patch = async (body: Record<string, unknown>, message: string) => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "No se pudo guardar");
      }
      setInquiry(await res.json());
      setSaved(message);
      setTimeout(() => setSaved(""), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar este diagnóstico? Esta acción no se puede deshacer.")) return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "No se pudo eliminar");
      }
      router.push("/dashboard/diagnosticos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-[#5A6D6D] text-sm">Cargando…</p>;

  if (!inquiry) {
    return (
      <div>
        <p role="alert" className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
          {error || "No se encontro el diagnostico"}
        </p>
        <Link href="/dashboard/diagnosticos" className="text-[#194973] text-sm mt-4 inline-block">
          ← Volver a diagnosticos
        </Link>
      </div>
    );
  }

  const badge = INQUIRY_STATUS_CONFIG[inquiry.status];

  return (
    <div className="max-w-4xl">
      <Link
        href="/dashboard/diagnosticos"
        className="text-sm text-[#5A6D6D] hover:text-[#194973] transition-colors inline-block mb-4"
      >
        ← Diagnosticos
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#194973]">{inquiry.name}</h1>
          <p className="text-sm text-[#5A6D6D] mt-1">
            {inquiry.company ? `${inquiry.company} · ` : ""}
            <a href={`mailto:${inquiry.email}`} className="text-[#39751f] hover:underline">
              {inquiry.email}
            </a>
            {inquiry.phone ? ` · ${inquiry.phone}` : ""}
          </p>
          <p className="text-xs text-[#9ca3af] mt-1">Recibido el {formatDateTime(inquiry.created_at)}</p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-6">
        <h2 className="text-xs uppercase tracking-wider text-[#5A6D6D] font-semibold mb-3">Estado</h2>
        <div className="flex flex-wrap gap-2">
          {INQUIRY_STATUSES.map((value) => {
            const config = INQUIRY_STATUS_CONFIG[value];
            const active = inquiry.status === value;
            return (
              <button
                key={value}
                type="button"
                disabled={saving || active}
                aria-pressed={active}
                onClick={() => patch({ status: value }, `Estado: ${config.label}`)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors disabled:cursor-default ${
                  active
                    ? "bg-[#194973] text-white"
                    : "bg-white text-[#5A6D6D] border border-[#e5e7eb] hover:border-[#194973] disabled:opacity-50"
                }`}
              >
                {config.label}
              </button>
            );
          })}
        </div>
        <div aria-live="polite" className="min-h-[1.25rem] mt-3">
          {saved && <p className="text-sm text-[#39751f] font-medium">{saved}</p>}
          {error && (
            <p role="alert" className="text-sm text-red-600 font-medium">
              {error}
            </p>
          )}
        </div>
      </div>

      {INQUIRY_SECTIONS.map((section) => {
        const filled = section.fields.filter((f) => inquiry[f.key]);
        if (filled.length === 0) return null;
        return (
          <div key={section.title} className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-6">
            <h2 className="text-xs uppercase tracking-wider text-[#5A6D6D] font-semibold mb-4">
              {section.title}
            </h2>
            <dl className="space-y-4">
              {filled.map((f) => (
                <div key={f.key}>
                  <dt className="text-xs text-[#9ca3af] mb-1">{f.label}</dt>
                  <dd className="text-[#194973] leading-relaxed whitespace-pre-wrap">{inquiry[f.key]}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}

      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5 mb-6">
        <h2 className="text-xs uppercase tracking-wider text-[#5A6D6D] font-semibold mb-4">Origen</h2>
        <dl className="grid sm:grid-cols-2 gap-3 text-sm">
          {ORIGIN_FIELDS.filter((f) => inquiry[f.key]).map((f) => (
            <div key={f.key}>
              <dt className="text-xs text-[#9ca3af]">{f.label}</dt>
              <dd className="text-[#194973] break-all">{inquiry[f.key]}</dd>
            </div>
          ))}
          {ORIGIN_FIELDS.every((f) => !inquiry[f.key]) && (
            <p className="text-sm text-[#5A6D6D]">Sin datos de origen.</p>
          )}
        </dl>
      </div>

      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-5">
        <label htmlFor="notas" className="block text-xs uppercase tracking-wider text-[#5A6D6D] font-semibold mb-3">
          Notas internas
        </label>
        <textarea
          id="notas"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] bg-[#fafaf9] text-[#194973] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40"
          placeholder="Que le vas a proponer y por que"
        />
        <button
          type="button"
          disabled={saving}
          onClick={() => patch({ internal_notes: notes }, "Notas guardadas")}
          className="mt-3 px-4 py-2 rounded-xl bg-[#194973] text-white text-sm font-medium hover:bg-[#0f3150] transition-colors disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar notas"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/60 p-5">
        <h2 className="text-sm font-bold text-red-700">Eliminar diagnóstico</h2>
        <p className="mt-1 text-sm text-red-700/80">
          El formulario y sus notas internas se eliminarán definitivamente.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Eliminando…" : "Eliminar diagnóstico"}
        </button>
      </div>
    </div>
  );
}
