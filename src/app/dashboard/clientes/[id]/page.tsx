"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProposalStatusBadge from "@/components/dashboard/ProposalStatusBadge";
import { formatCurrency } from "@/lib/utils/currency";
import type { ProposalStatus } from "@/lib/supabase/types";

interface ClientDetail {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  proposals: {
    id: string;
    reference_code: string;
    project_name: string;
    total_price: number;
    currency: string;
    status: ProposalStatus;
    created_at: string;
    payments: { id: string; amount: number; paid: boolean }[];
  }[];
}

export default function ClientDetailPage() {
  const { id } = useParams();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    fetchClient();
  }, [id]);

  const fetchClient = async () => {
    const res = await fetch(`/api/clients/${id}`);
    if (res.ok) {
      const data = await res.json();
      setClient(data);
      setNotes(data.notes || "");
    }
    setLoading(false);
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setSavingNotes(false);
  };

  if (loading) return <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>;
  if (!client) return <div className="p-12 text-center text-[#5A6D6D]">Cliente no encontrado</div>;

  const totalRevenue = client.proposals
    .flatMap((p) => p.payments)
    .filter((p) => p.paid)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalPending = client.proposals
    .flatMap((p) => p.payments)
    .filter((p) => !p.paid)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div>
      <Link href="/dashboard/clientes" className="text-[#5A6D6D] text-sm hover:text-[#194973] transition-colors mb-4 inline-block">
        &larr; Volver a clientes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Info */}
        <div className="flex flex-col gap-6">
          {/* Client card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#194973] text-white flex items-center justify-center font-bold text-lg">
                {client.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-[#194973]">{client.name}</h1>
                {client.company && <div className="text-sm text-[#5A6D6D]">{client.company}</div>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-[#5A6D6D]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {client.email}
              </div>
              {client.phone && (
                <div className="flex items-center gap-2 text-sm text-[#5A6D6D]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {client.phone}
                </div>
              )}
              <div className="text-xs text-[#5A6D6D] mt-2">
                Cliente desde {new Date(client.created_at).toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
              <div className="text-xs text-[#5A6D6D] font-bold uppercase">Cobrado</div>
              <div className="text-lg font-black text-[#71C648] mt-1">{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
              <div className="text-xs text-[#5A6D6D] font-bold uppercase">Pendiente</div>
              <div className="text-lg font-black text-[#194973] mt-1">{formatCurrency(totalPending)}</div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-3">Notas internas</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-[#f8f9fa] text-[#194973] outline-none transition-colors focus:border-[#71C648] min-h-[100px] resize-y"
              placeholder="Notas sobre este cliente..."
            />
            <button
              onClick={saveNotes}
              disabled={savingNotes}
              className="mt-2 px-4 py-2 bg-[#194973] text-white rounded-lg text-sm font-semibold hover:bg-[#0f3150] transition-colors disabled:opacity-50"
            >
              {savingNotes ? "Guardando..." : "Guardar notas"}
            </button>
          </div>
        </div>

        {/* Right: Proposals */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider">Propuestas</h3>
              <Link
                href="/dashboard/propuestas/nueva"
                className="text-[#71C648] text-sm font-semibold hover:underline"
              >
                + Nueva
              </Link>
            </div>
            {client.proposals.length === 0 ? (
              <div className="p-8 text-center text-[#5A6D6D] text-sm">No hay propuestas para este cliente</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Ref</th>
                      <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Proyecto</th>
                      <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Importe</th>
                      <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Estado</th>
                      <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client.proposals.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-[#f8f9fa] transition-colors">
                        <td className="px-5 py-4">
                          <Link href={`/dashboard/propuestas/${p.id}`} className="text-[#71C648] font-bold text-sm hover:underline">
                            {p.reference_code}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#194973]">{p.project_name}</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#194973]">{formatCurrency(p.total_price, p.currency)}</td>
                        <td className="px-5 py-4"><ProposalStatusBadge status={p.status} /></td>
                        <td className="px-5 py-4 text-xs text-[#5A6D6D]">{new Date(p.created_at).toLocaleDateString("es-ES")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
