"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProspectCard from "@/components/dashboard/ProspectCard";
import ProspectPipelineBadge from "@/components/dashboard/ProspectPipelineBadge";
import ImportProspectsModal from "@/components/dashboard/ImportProspectsModal";
import { PIPELINE_TABS, SEGMENTS, type ProspectPipelineStatus } from "@/lib/constants/prospect";

interface Prospect {
  id: string;
  name: string;
  position: string | null;
  company: string | null;
  city: string | null;
  country: string | null;
  segment: string | null;
  website_url: string | null;
  has_online_booking: boolean;
  has_app: boolean;
  website_quality: number | null;
  pipeline_status: ProspectPipelineStatus;
  created_at: string;
}

export default function ProspectosPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    fetchProspects();
  }, [activeTab]);

  const fetchProspects = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("status", activeTab);
    if (search) params.set("search", search);

    const res = await fetch(`/api/prospects?${params}`);
    if (res.ok) setProspects(await res.json());
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProspects();
  };

  // Count per status for tab badges
  const statusCounts = prospects.reduce((acc, p) => {
    acc[p.pipeline_status] = (acc[p.pipeline_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#194973]">Prospectos</h1>
          <p className="text-[#5A6D6D] text-sm mt-1">Gestiona tus potenciales clientes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(true)}
            className="px-4 py-2.5 bg-white border border-gray-200 text-[#194973] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Importar
          </button>
          <Link
            href="/dashboard/prospectos/nuevo"
            className="bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#71C648]/30 transition-all text-center"
          >
            + Nuevo prospecto
          </Link>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, empresa o ciudad..."
          className="w-full max-w-md px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-white text-[#194973] outline-none transition-colors focus:border-[#71C648]"
        />
      </form>

      {/* View toggle + Pipeline tabs */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex bg-gray-200 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === "list" ? "bg-white text-[#194973] shadow-sm" : "text-[#5A6D6D]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === "grid" ? "bg-white text-[#194973] shadow-sm" : "text-[#5A6D6D]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {PIPELINE_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.value
                ? "bg-[#194973] text-white"
                : "bg-white text-[#5A6D6D] hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.label}
            {tab.value === "all" && prospects.length > 0 && activeTab === "all" && (
              <span className="ml-1.5 text-[10px] opacity-70">({prospects.length})</span>
            )}
            {tab.value !== "all" && statusCounts[tab.value] && activeTab === "all" && (
              <span className="ml-1.5 text-[10px] opacity-70">({statusCounts[tab.value]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>
      ) : prospects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">&#128269;</div>
          <div className="text-[#194973] font-bold">No hay prospectos</div>
          <div className="text-[#5A6D6D] text-sm mt-1">Anade tu primer prospecto para empezar a hacer seguimiento</div>
        </div>
      ) : viewMode === "list" ? (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Nombre</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Cargo</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Empresa</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Ciudad</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Segmento</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Web</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 text-center">Calidad</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 text-center">Reserva</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 text-center">App</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((p) => {
                  const segLabel = SEGMENTS.find((s) => s.value === p.segment)?.label || p.segment;
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/prospectos/${p.id}`} className="text-sm font-medium text-[#194973] hover:text-[#71C648]">
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#5A6D6D]">{p.position || "-"}</td>
                      <td className="px-4 py-3 text-sm text-[#194973]">{p.company || "-"}</td>
                      <td className="px-4 py-3 text-sm text-[#5A6D6D]">{p.city || "-"}</td>
                      <td className="px-4 py-3 text-xs text-[#5A6D6D]">{segLabel || "-"}</td>
                      <td className="px-4 py-3 text-sm">
                        {p.website_url ? (
                          <a href={p.website_url} target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline truncate block max-w-[120px]">
                            {p.website_url.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.website_quality ? (
                          <span className="text-sm font-bold text-[#194973]">{p.website_quality}/5</span>
                        ) : <span className="text-[#5A6D6D]">-</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block w-5 h-5 rounded-full text-xs font-bold leading-5 ${
                          p.has_online_booking ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                        }`}>
                          {p.has_online_booking ? "S" : "N"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block w-5 h-5 rounded-full text-xs font-bold leading-5 ${
                          p.has_app ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                        }`}>
                          {p.has_app ? "S" : "N"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ProspectPipelineBadge status={p.pipeline_status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prospects.map((prospect) => (
            <ProspectCard key={prospect.id} prospect={prospect} />
          ))}
        </div>
      )}

      {/* Import modal */}
      {showImport && (
        <ImportProspectsModal
          onClose={() => setShowImport(false)}
          onImported={() => fetchProspects()}
        />
      )}
    </div>
  );
}
