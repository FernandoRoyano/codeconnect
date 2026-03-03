"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProposalStatusBadge from "@/components/dashboard/ProposalStatusBadge";
import { formatCurrency } from "@/lib/utils/currency";
import type { ProposalStatus } from "@/lib/supabase/types";

interface DashboardStats {
  proposalsThisMonth: number;
  totalProposals: number;
  acceptanceRate: number;
  revenueCollected: number;
  revenuePending: number;
  statusCounts: Record<string, number>;
  overduePayments: number;
  upcomingPayments: {
    id: string;
    amount: number;
    currency: string;
    due_date: string;
    label: string;
    proposals: { project_name: string; client: { name: string } | null };
  }[];
  recentProposals: {
    id: string;
    status: ProposalStatus;
    total_price: number;
    currency: string;
    created_at: string;
    client: { name: string } | null;
  }[];
}

const STATUS_LABELS: Record<string, string> = {
  borrador: "Borrador",
  enviada: "Enviada",
  vista: "Vista",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  descartada: "Descartada",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#5A6D6D]">Cargando dashboard...</div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#194973]">Dashboard</h1>
        <p className="text-[#5A6D6D] text-sm mt-1">Resumen de tu actividad</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Propuestas</div>
          </div>
          <div className="text-3xl font-black text-[#194973]">{stats.proposalsThisMonth}</div>
          <div className="text-xs text-[#5A6D6D] mt-1">este mes / {stats.totalProposals} total</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Aceptacion</div>
          </div>
          <div className="text-3xl font-black text-[#71C648]">{stats.acceptanceRate}%</div>
          <div className="text-xs text-[#5A6D6D] mt-1">tasa de conversion</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Cobrado</div>
          </div>
          <div className="text-3xl font-black text-[#194973]">{formatCurrency(stats.revenueCollected)}</div>
          <div className="text-xs text-[#5A6D6D] mt-1">ingresos recibidos</div>
        </div>

        <div className={`rounded-2xl p-5 border ${stats.overduePayments > 0 ? "bg-red-50 border-red-200" : "bg-white border-gray-200"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stats.overduePayments > 0 ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Pendiente</div>
          </div>
          <div className="text-3xl font-black text-[#194973]">{formatCurrency(stats.revenuePending)}</div>
          <div className="text-xs text-[#5A6D6D] mt-1">
            {stats.overduePayments > 0 ? `${stats.overduePayments} pago(s) vencido(s)` : "por cobrar"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider">Pipeline de propuestas</h3>
              <Link href="/dashboard/propuestas" className="text-[#71C648] text-sm font-semibold hover:underline">
                Ver todas
              </Link>
            </div>
            <div className="flex gap-2 flex-wrap mb-5">
              {Object.entries(stats.statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center gap-2 bg-[#f8f9fa] rounded-lg px-3 py-2">
                  <ProposalStatusBadge status={status as ProposalStatus} />
                  <span className="text-sm font-bold text-[#194973]">{count}</span>
                </div>
              ))}
            </div>

            {/* Recent proposals */}
            <div className="flex flex-col gap-2">
              {stats.recentProposals.map((p) => (
                <Link
                  key={p.id}
                  href={`/dashboard/propuestas/${p.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ProposalStatusBadge status={p.status} />
                    <span className="text-sm text-[#194973] font-medium">{p.client?.name || "Sin cliente"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#194973]">{formatCurrency(p.total_price, p.currency)}</span>
                    <span className="text-xs text-[#5A6D6D]">{new Date(p.created_at).toLocaleDateString("es-ES")}</span>
                  </div>
                </Link>
              ))}
              {stats.recentProposals.length === 0 && (
                <div className="text-center py-6 text-[#5A6D6D] text-sm">
                  No hay propuestas aun.{" "}
                  <Link href="/dashboard/propuestas/nueva" className="text-[#71C648] font-semibold hover:underline">
                    Crear primera
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming payments */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider">Proximos pagos</h3>
              <Link href="/dashboard/pagos" className="text-[#71C648] text-sm font-semibold hover:underline">
                Ver todos
              </Link>
            </div>
            {stats.upcomingPayments.length === 0 ? (
              <div className="text-center py-6 text-[#5A6D6D] text-sm">No hay pagos pendientes</div>
            ) : (
              <div className="flex flex-col gap-3">
                {stats.upcomingPayments.map((p) => (
                  <div key={p.id} className="p-3 bg-[#f8f9fa] rounded-xl">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-[#194973]">{p.proposals?.client?.name || "-"}</div>
                      <div className="text-sm font-bold text-[#194973]">{formatCurrency(p.amount, p.currency)}</div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-[#5A6D6D]">{p.label}</div>
                      <div className="text-xs text-[#5A6D6D]">{new Date(p.due_date).toLocaleDateString("es-ES")}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Acceso rapido</h3>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/propuestas/nueva" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors text-sm text-[#194973] font-medium">
                <span className="text-[#71C648]">+</span> Nueva propuesta
              </Link>
              <Link href="/dashboard/clientes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors text-sm text-[#194973] font-medium">
                <span className="text-[#71C648]">&#8594;</span> Ver clientes
              </Link>
              <Link href="/dashboard/pagos" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors text-sm text-[#194973] font-medium">
                <span className="text-[#71C648]">&#8594;</span> Ver pagos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
