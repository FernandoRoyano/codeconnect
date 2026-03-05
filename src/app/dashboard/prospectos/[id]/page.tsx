"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProspectPipelineBadge from "@/components/dashboard/ProspectPipelineBadge";
import WebsiteQualityStars from "@/components/dashboard/WebsiteQualityStars";
import {
  PIPELINE_STATUS_CONFIG,
  SEGMENTS,
  type ProspectPipelineStatus,
} from "@/lib/constants/prospect";

interface ProspectDetail {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  city: string | null;
  country: string | null;
  segment: string | null;
  why_good_prospect: string | null;
  contact_notes: string | null;
  website_url: string | null;
  has_online_booking: boolean;
  has_app: boolean;
  website_quality: number | null;
  pipeline_status: ProspectPipelineStatus;
  email: string | null;
  phone: string | null;
  contacted_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function ProspectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [prospect, setProspect] = useState<ProspectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    fetchProspect();
  }, [id]);

  const fetchProspect = async () => {
    const res = await fetch(`/api/prospects/${id}`);
    if (res.ok) {
      const data = await res.json();
      setProspect(data);
      setNotes(data.contact_notes || "");
    }
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: ProspectPipelineStatus) => {
    const res = await fetch(`/api/prospects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pipelineStatus: newStatus }),
    });
    if (res.ok) await fetchProspect();
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    const res = await fetch(`/api/prospects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactNotes: notes }),
    });
    if (res.ok) await fetchProspect();
    setSavingNotes(false);
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar este prospecto? Esta accion no se puede deshacer.")) return;
    setDeleting(true);
    const res = await fetch(`/api/prospects/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/dashboard/prospectos");
    setDeleting(false);
  };

  if (loading) return <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>;
  if (!prospect) return <div className="p-12 text-center text-[#5A6D6D]">Prospecto no encontrado</div>;

  const segmentLabel = SEGMENTS.find((s) => s.value === prospect.segment)?.label || prospect.segment;
  const location = [prospect.city, prospect.country].filter(Boolean).join(", ");

  return (
    <div>
      <Link href="/dashboard/prospectos" className="text-[#5A6D6D] text-sm hover:text-[#194973] transition-colors mb-4 inline-block">
        &larr; Volver a prospectos
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#194973]">{prospect.name}</h1>
            <ProspectPipelineBadge status={prospect.pipeline_status} />
          </div>
          <p className="text-[#5A6D6D] text-sm mt-1">
            {[prospect.position, prospect.company].filter(Boolean).join(" - ") || "Prospecto"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/prospectos/${id}/editar`}
            className="px-4 py-2 bg-white border border-gray-200 text-[#194973] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Editar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Datos de contacto */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Datos de contacto</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#5A6D6D]">Nombre</div>
                <div className="text-sm font-medium text-[#194973]">{prospect.name}</div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Cargo</div>
                <div className="text-sm font-medium text-[#194973]">{prospect.position || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Email</div>
                <div className="text-sm font-medium text-[#194973]">
                  {prospect.email ? (
                    <a href={`mailto:${prospect.email}`} className="text-[#71C648] hover:underline">{prospect.email}</a>
                  ) : "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Telefono</div>
                <div className="text-sm font-medium text-[#194973]">
                  {prospect.phone ? (
                    <a href={`tel:${prospect.phone}`} className="text-[#71C648] hover:underline">{prospect.phone}</a>
                  ) : "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Empresa</div>
                <div className="text-sm font-medium text-[#194973]">{prospect.company || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Ubicacion</div>
                <div className="text-sm font-medium text-[#194973]">{location || "-"}</div>
              </div>
              {segmentLabel && (
                <div>
                  <div className="text-xs text-[#5A6D6D]">Segmento</div>
                  <div className="inline-flex px-2 py-0.5 bg-[#f8f9fa] rounded text-xs text-[#5A6D6D] mt-1">{segmentLabel}</div>
                </div>
              )}
            </div>
          </div>

          {/* Analisis web */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Analisis web</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="col-span-2">
                <div className="text-xs text-[#5A6D6D]">Sitio web</div>
                <div className="text-sm font-medium text-[#194973]">
                  {prospect.website_url ? (
                    <a href={prospect.website_url} target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline break-all">
                      {prospect.website_url}
                    </a>
                  ) : "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D] mb-1">Calidad web</div>
                {prospect.website_quality ? (
                  <WebsiteQualityStars value={prospect.website_quality} readOnly />
                ) : (
                  <span className="text-sm text-[#5A6D6D]">-</span>
                )}
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D] mb-1">Funcionalidades</div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    prospect.has_online_booking ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    Reservas: {prospect.has_online_booking ? "Si" : "No"}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    prospect.has_app ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    App: {prospect.has_app ? "Si" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cualificacion */}
          {prospect.why_good_prospect && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Por que es un buen prospecto</h3>
              <p className="text-sm text-[#194973] whitespace-pre-line">{prospect.why_good_prospect}</p>
            </div>
          )}

          {/* Notas de contacto (editables) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Notas de contacto</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-[#194973] outline-none focus:border-[#71C648] resize-none"
              placeholder="Notas sobre las interacciones con este prospecto..."
            />
            {notes !== (prospect.contact_notes || "") && (
              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="mt-3 px-4 py-2 bg-[#194973] text-white rounded-xl text-sm font-semibold hover:bg-[#0f3150] transition-colors disabled:opacity-50"
              >
                {savingNotes ? "Guardando..." : "Guardar notas"}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Pipeline status */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Estado del pipeline</h3>
            <div className="flex flex-col gap-2">
              {(Object.keys(PIPELINE_STATUS_CONFIG) as ProspectPipelineStatus[]).map((status) => {
                const config = PIPELINE_STATUS_CONFIG[status];
                const isActive = prospect.pipeline_status === status;
                return (
                  <button
                    key={status}
                    onClick={() => !isActive && handleStatusChange(status)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium text-left transition-colors flex items-center gap-2 ${
                      isActive
                        ? `${config.bg} ${config.text} ring-2 ring-offset-1 ring-current`
                        : "bg-gray-50 text-[#5A6D6D] hover:bg-gray-100"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-current" : "bg-gray-300"}`} />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Timeline</h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-[#71C648] mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-[#5A6D6D]">Registrado</div>
                  <div className="text-sm text-[#194973]">{new Date(prospect.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                </div>
              </div>
              {prospect.contacted_at && (
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#5A6D6D]">Contactado</div>
                    <div className="text-sm text-[#194973]">{new Date(prospect.contacted_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                </div>
              )}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs text-[#5A6D6D]">Ultima actualizacion</div>
                <div className="text-sm text-[#194973]">{new Date(prospect.updated_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Acciones</h3>
            <div className="flex flex-col gap-2">
              <Link
                href={`/dashboard/prospectos/${id}/editar`}
                className="w-full py-2 px-3 bg-gray-100 text-[#194973] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
              >
                Editar prospecto
              </Link>
              {prospect.website_url && (
                <a
                  href={prospect.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-gray-100 text-[#194973] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                >
                  Visitar web
                </a>
              )}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors mt-2 border-t border-gray-100 pt-3 disabled:opacity-50"
              >
                {deleting ? "Eliminando..." : "Eliminar prospecto"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
