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

type SortKey = "name" | "company" | "city" | "country" | "score" | "quality" | "created_at";
type SortDir = "asc" | "desc";

const HIGH_VALUE_SEGMENTS = ["salud", "restauracion", "ecommerce"];

function calcScore(p: Prospect): number {
  let score = 0;
  if (!p.website_url) score += 25;
  if (p.website_quality !== null && p.website_quality <= 2) score += 30;
  else if (p.website_quality !== null && p.website_quality <= 3) score += 15;
  if (!p.has_online_booking) score += 20;
  if (!p.has_app) score += 15;
  if (p.segment && HIGH_VALUE_SEGMENTS.includes(p.segment)) score += 10;
  return score;
}

function scoreColor(score: number): string {
  if (score >= 70) return "bg-green-100 text-green-700";
  if (score >= 40) return "bg-yellow-100 text-yellow-700";
  return "bg-gray-100 text-gray-500";
}

function scoreLabel(score: number): string {
  if (score >= 70) return "Alta";
  if (score >= 40) return "Media";
  return "Baja";
}

interface Filters {
  name: string;
  position: string;
  company: string;
  city: string;
  segment: string;
  hasWeb: string;
  quality: string;
  booking: string;
  app: string;
}

const emptyFilters: Filters = {
  name: "",
  position: "",
  company: "",
  city: "",
  segment: "",
  hasWeb: "",
  quality: "",
  booking: "",
  app: "",
};

export default function ProspectosPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

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

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const filteredProspects = prospects.filter((p) => {
    const f = filters;
    if (f.name && !p.name.toLowerCase().includes(f.name.toLowerCase())) return false;
    if (f.position && !(p.position || "").toLowerCase().includes(f.position.toLowerCase())) return false;
    if (f.company && !(p.company || "").toLowerCase().includes(f.company.toLowerCase())) return false;
    if (f.city && !(p.city || "").toLowerCase().includes(f.city.toLowerCase())) return false;
    if (f.segment && p.segment !== f.segment) return false;
    if (f.hasWeb === "yes" && !p.website_url) return false;
    if (f.hasWeb === "no" && p.website_url) return false;
    if (f.quality && p.website_quality !== Number(f.quality)) return false;
    if (f.booking === "yes" && !p.has_online_booking) return false;
    if (f.booking === "no" && p.has_online_booking) return false;
    if (f.app === "yes" && !p.has_app) return false;
    if (f.app === "no" && p.has_app) return false;
    return true;
  });

  const sortedProspects = [...filteredProspects].sort((a, b) => {
    let cmp = 0;
    switch (sortKey) {
      case "score": cmp = calcScore(a) - calcScore(b); break;
      case "quality": cmp = (a.website_quality || 0) - (b.website_quality || 0); break;
      case "created_at": cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); break;
      default: cmp = (a[sortKey] || "").localeCompare(b[sortKey] || ""); break;
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "score" ? "desc" : "asc"); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-block opacity-60">
      {sortKey === col ? (sortDir === "asc" ? "\u25B2" : "\u25BC") : "\u25B4\u25BE"}
    </span>
  );

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

      {/* View toggle + Filter toggle */}
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
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            showFilters || activeFilterCount > 0
              ? "bg-[#194973] text-white border-[#194973]"
              : "bg-white text-[#5A6D6D] border-gray-200 hover:bg-gray-50"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {activeFilterCount > 0 && (
            <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={() => setFilters(emptyFilters)}
            className="text-xs text-red-500 hover:text-red-700 font-medium"
          >
            Limpiar filtros
          </button>
        )}
        {filteredProspects.length !== prospects.length && (
          <span className="text-xs text-[#5A6D6D]">
            {filteredProspects.length} de {prospects.length}
          </span>
        )}
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
      ) : sortedProspects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">&#128270;</div>
          <div className="text-[#194973] font-bold">Sin resultados</div>
          <div className="text-[#5A6D6D] text-sm mt-1">Ningun prospecto coincide con los filtros aplicados</div>
          <button onClick={() => setFilters(emptyFilters)} className="mt-3 text-sm text-[#71C648] font-semibold hover:underline">Limpiar filtros</button>
        </div>
      ) : viewMode === "list" ? (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("score")}>Oportunidad<SortIcon col="score" /></th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("name")}>Nombre<SortIcon col="name" /></th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Cargo</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("company")}>Empresa<SortIcon col="company" /></th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("city")}>Ciudad<SortIcon col="city" /></th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("country")}>Pais<SortIcon col="country" /></th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Segmento</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Web</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 text-center cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("quality")}>Calidad<SortIcon col="quality" /></th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 text-center">Reserva</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 text-center">App</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3">Estado</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-4 py-3 cursor-pointer select-none hover:text-[#194973]" onClick={() => toggleSort("created_at")}>Fecha<SortIcon col="created_at" /></th>
                </tr>
                {showFilters && (
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">
                      <input type="text" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Filtrar..." className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]" />
                    </th>
                    <th className="px-4 py-2">
                      <input type="text" value={filters.position} onChange={(e) => setFilters({ ...filters, position: e.target.value })} placeholder="Filtrar..." className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]" />
                    </th>
                    <th className="px-4 py-2">
                      <input type="text" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} placeholder="Filtrar..." className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]" />
                    </th>
                    <th className="px-4 py-2">
                      <input type="text" value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })} placeholder="Filtrar..." className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]" />
                    </th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">
                      <select value={filters.segment} onChange={(e) => setFilters({ ...filters, segment: e.target.value })} className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]">
                        <option value="">Todos</option>
                        {SEGMENTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </th>
                    <th className="px-4 py-2">
                      <select value={filters.hasWeb} onChange={(e) => setFilters({ ...filters, hasWeb: e.target.value })} className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]">
                        <option value="">Todos</option>
                        <option value="yes">Con web</option>
                        <option value="no">Sin web</option>
                      </select>
                    </th>
                    <th className="px-4 py-2">
                      <select value={filters.quality} onChange={(e) => setFilters({ ...filters, quality: e.target.value })} className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]">
                        <option value="">Todos</option>
                        {[1,2,3,4,5].map((n) => <option key={n} value={String(n)}>{n}/5</option>)}
                      </select>
                    </th>
                    <th className="px-4 py-2">
                      <select value={filters.booking} onChange={(e) => setFilters({ ...filters, booking: e.target.value })} className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]">
                        <option value="">Todos</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                      </select>
                    </th>
                    <th className="px-4 py-2">
                      <select value={filters.app} onChange={(e) => setFilters({ ...filters, app: e.target.value })} className="w-full px-2 py-1 text-xs border border-gray-200 rounded-md bg-white text-[#194973] outline-none focus:border-[#71C648]">
                        <option value="">Todos</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                      </select>
                    </th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {sortedProspects.map((p) => {
                  const segLabel = SEGMENTS.find((s) => s.value === p.segment)?.label || p.segment;
                  const score = calcScore(p);
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${scoreColor(score)}`}>
                          {score}% {scoreLabel(score)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/prospectos/${p.id}`} className="text-sm font-medium text-[#194973] hover:text-[#71C648]">
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#5A6D6D]">{p.position || "-"}</td>
                      <td className="px-4 py-3 text-sm text-[#194973]">{p.company || "-"}</td>
                      <td className="px-4 py-3 text-sm text-[#5A6D6D]">{p.city || "-"}</td>
                      <td className="px-4 py-3 text-sm text-[#5A6D6D]">{p.country || "-"}</td>
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
                      <td className="px-4 py-3 text-xs text-[#5A6D6D] whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString("es-ES")}
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
          {sortedProspects.map((prospect) => (
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
