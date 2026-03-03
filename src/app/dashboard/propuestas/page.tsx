"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProposalStatusBadge from "@/components/dashboard/ProposalStatusBadge";
import type { ProposalStatus } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils/currency";

interface Proposal {
  id: string;
  reference_code: string;
  project_name: string;
  total_price: number;
  currency: string;
  status: ProposalStatus;
  created_at: string;
  client: { name: string; email: string; company: string | null } | null;
}

const STATUS_TABS: { label: string; value: string }[] = [
  { label: "Todas", value: "all" },
  { label: "Borrador", value: "borrador" },
  { label: "Enviada", value: "enviada" },
  { label: "Vista", value: "vista" },
  { label: "Aceptada", value: "aceptada" },
  { label: "Rechazada", value: "rechazada" },
  { label: "Descartada", value: "descartada" },
];

export default function ProposalListPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProposals();
  }, [activeTab]);

  const fetchProposals = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeTab !== "all") params.set("status", activeTab);
    if (search) params.set("search", search);

    const res = await fetch(`/api/proposals?${params}`);
    if (res.ok) {
      const data = await res.json();
      setProposals(data);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProposals();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#194973]">Propuestas</h1>
          <p className="text-[#5A6D6D] text-sm mt-1">Gestiona tus propuestas y presupuestos</p>
        </div>
        <Link
          href="/dashboard/propuestas/nueva"
          className="bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#71C648]/30 transition-all text-center"
        >
          + Nueva propuesta
        </Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre de proyecto o referencia..."
          className="w-full max-w-md px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm bg-white text-[#194973] outline-none transition-colors focus:border-[#71C648]"
        />
      </form>

      {/* Status tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {STATUS_TABS.map((tab) => (
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
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>
        ) : proposals.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">&#128196;</div>
            <div className="text-[#194973] font-bold">No hay propuestas</div>
            <div className="text-[#5A6D6D] text-sm mt-1">Crea tu primera propuesta para empezar</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Ref</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Proyecto</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Importe</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Estado</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-[#f8f9fa] transition-colors">
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/propuestas/${p.id}`} className="text-[#71C648] font-bold text-sm hover:underline">
                        {p.reference_code}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-[#194973]">{p.client?.name || "-"}</div>
                      {p.client?.company && <div className="text-xs text-[#5A6D6D]">{p.client.company}</div>}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#194973]">{p.project_name}</td>
                    <td className="px-5 py-4 text-sm font-bold text-[#194973]">{formatCurrency(p.total_price, p.currency)}</td>
                    <td className="px-5 py-4"><ProposalStatusBadge status={p.status} /></td>
                    <td className="px-5 py-4 text-xs text-[#5A6D6D]">
                      {new Date(p.created_at).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
