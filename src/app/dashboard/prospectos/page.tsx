"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProspectCard from "@/components/dashboard/ProspectCard";
import ImportProspectsModal from "@/components/dashboard/ImportProspectsModal";
import { PIPELINE_TABS, type ProspectPipelineStatus } from "@/lib/constants/prospect";

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
            Importar Excel
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

      {/* Pipeline tabs */}
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

      {/* Grid */}
      {loading ? (
        <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>
      ) : prospects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">&#128269;</div>
          <div className="text-[#194973] font-bold">No hay prospectos</div>
          <div className="text-[#5A6D6D] text-sm mt-1">Anade tu primer prospecto para empezar a hacer seguimiento</div>
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
