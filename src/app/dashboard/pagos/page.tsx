"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils/currency";

interface Payment {
  id: string;
  label: string;
  percentage: number;
  amount: number;
  currency: string;
  due_date: string | null;
  paid: boolean;
  paid_at: string | null;
  payment_method: string | null;
  proposals: {
    id: string;
    project_name: string;
    status: string;
    client: { name: string; email: string } | null;
  };
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");
  const [markingId, setMarkingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const fetchPayments = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter === "pending") params.set("paid", "false");
    if (filter === "paid") params.set("paid", "true");

    const res = await fetch(`/api/payments?${params}`);
    if (res.ok) setPayments(await res.json());
    setLoading(false);
  };

  const markAsPaid = async (paymentId: string) => {
    setMarkingId(paymentId);
    const res = await fetch(`/api/payments/${paymentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paid: true,
        paid_at: new Date().toISOString(),
        payment_method: "transferencia",
      }),
    });
    if (res.ok) await fetchPayments();
    setMarkingId(null);
  };

  const markAsUnpaid = async (paymentId: string) => {
    setMarkingId(paymentId);
    const res = await fetch(`/api/payments/${paymentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paid: false,
        paid_at: null,
        payment_method: null,
      }),
    });
    if (res.ok) await fetchPayments();
    setMarkingId(null);
  };

  const totalPending = payments.filter((p) => !p.paid).reduce((sum, p) => sum + Number(p.amount), 0);
  const totalCollected = payments.filter((p) => p.paid).reduce((sum, p) => sum + Number(p.amount), 0);
  const overdue = payments.filter((p) => !p.paid && p.due_date && new Date(p.due_date) < new Date());

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#194973] mb-1">Pagos</h1>
      <p className="text-[#5A6D6D] text-sm mb-6">Control de cobros y pagos de tus proyectos</p>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Cobrado</div>
          <div className="text-2xl font-black text-[#71C648] mt-1">{formatCurrency(totalCollected)}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200">
          <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Pendiente</div>
          <div className="text-2xl font-black text-[#194973] mt-1">{formatCurrency(totalPending)}</div>
        </div>
        <div className={`rounded-2xl p-5 border ${overdue.length > 0 ? "bg-red-50 border-red-200" : "bg-white border-gray-200"}`}>
          <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-wider">Vencidos</div>
          <div className={`text-2xl font-black mt-1 ${overdue.length > 0 ? "text-red-600" : "text-[#194973]"}`}>
            {overdue.length}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        {[
          { label: "Todos", value: "all" as const },
          { label: "Pendientes", value: "pending" as const },
          { label: "Cobrados", value: "paid" as const },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              filter === tab.value
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
        ) : payments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">&#128176;</div>
            <div className="text-[#194973] font-bold">No hay pagos</div>
            <div className="text-[#5A6D6D] text-sm mt-1">Los pagos se generan automaticamente al crear propuestas</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Cliente</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Proyecto</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Concepto</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Importe</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Vencimiento</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Estado</th>
                  <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase tracking-wider px-5 py-3">Accion</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => {
                  const isOverdue = !p.paid && p.due_date && new Date(p.due_date) < new Date();
                  return (
                    <tr key={p.id} className={`border-b border-gray-50 ${isOverdue ? "bg-red-50/50" : "hover:bg-[#f8f9fa]"} transition-colors`}>
                      <td className="px-5 py-4 text-sm text-[#194973] font-medium">{p.proposals?.client?.name || "-"}</td>
                      <td className="px-5 py-4 text-sm text-[#194973]">{p.proposals?.project_name}</td>
                      <td className="px-5 py-4 text-sm text-[#5A6D6D]">{p.label} ({p.percentage}%)</td>
                      <td className="px-5 py-4 text-sm font-bold text-[#194973]">{formatCurrency(p.amount, p.currency)}</td>
                      <td className="px-5 py-4 text-xs text-[#5A6D6D]">
                        {p.due_date ? new Date(p.due_date).toLocaleDateString("es-ES") : "-"}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          p.paid
                            ? "bg-green-100 text-green-700"
                            : isOverdue
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {p.paid ? "Cobrado" : isOverdue ? "Vencido" : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {!p.paid ? (
                          <button
                            onClick={() => markAsPaid(p.id)}
                            disabled={markingId === p.id}
                            className="px-3 py-1.5 bg-[#71C648] text-white rounded-lg text-xs font-semibold hover:bg-[#5db33a] transition-colors disabled:opacity-50"
                          >
                            {markingId === p.id ? "..." : "Cobrar"}
                          </button>
                        ) : (
                          <button
                            onClick={() => markAsUnpaid(p.id)}
                            disabled={markingId === p.id}
                            className="px-3 py-1.5 bg-gray-100 text-[#5A6D6D] rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                          >
                            Deshacer
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
