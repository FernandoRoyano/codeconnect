"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProposalView from "@/components/dashboard/ProposalView";
import ProposalStatusBadge from "@/components/dashboard/ProposalStatusBadge";
import type { ProposalFormState } from "@/lib/constants/proposal";
import type { ProposalStatus } from "@/lib/supabase/types";
import { formatCurrency } from "@/lib/utils/currency";
import DownloadProposalPDF from "@/components/pdf/DownloadProposalPDF";
import { buildProposalDisplayData } from "@/lib/utils/proposalData";

interface ProposalDetail {
  id: string;
  token: string;
  reference_code: string;
  status: ProposalStatus;
  business_name: string;
  project_type: string;
  project_name: string;
  project_description: string | null;
  deliverables: string[];
  project_size: string;
  total_price: number;
  currency: string;
  payment_structure: string;
  estimated_days: number | null;
  start_date: string | null;
  extra_revision_price: number | null;
  notes: string | null;
  signature_data: string | null;
  signed_at: string | null;
  terms_accepted: boolean;
  rejection_reason: string | null;
  rejected_at: string | null;
  created_at: string;
  sent_at: string | null;
  first_viewed_at: string | null;
  client: { id: string; name: string; email: string; company: string | null } | null;
  payments: { id: string; label: string; percentage: number; amount: number; currency: string; paid: boolean; paid_at: string | null; due_date: string | null; sort_order: number }[];
  proposal_views: { id: string; viewed_at: string }[];
}

export default function ProposalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProposal();
  }, [id]);

  const fetchProposal = async () => {
    const res = await fetch(`/api/proposals/${id}`);
    if (res.ok) {
      setProposal(await res.json());
    }
    setLoading(false);
  };

  const handleSend = async () => {
    setSending(true);
    const res = await fetch(`/api/proposals/${id}/send`, { method: "POST" });
    if (res.ok) {
      await fetchProposal();
    }
    setSending(false);
  };

  const handleStatusChange = async (newStatus: ProposalStatus) => {
    const res = await fetch(`/api/proposals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) await fetchProposal();
  };

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar esta propuesta? Esta accion no se puede deshacer.")) return;
    setDeleting(true);
    const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/dashboard/propuestas");
    }
    setDeleting(false);
  };

  const copyLink = () => {
    if (!proposal) return;
    const url = `${window.location.origin}/propuesta/${proposal.token}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="p-12 text-center text-[#5A6D6D]">Cargando...</div>;
  if (!proposal) return <div className="p-12 text-center text-[#5A6D6D]">Propuesta no encontrada</div>;

  const formState: ProposalFormState = {
    businessName: proposal.business_name,
    clientName: proposal.client?.name || "",
    clientEmail: proposal.client?.email || "",
    clientCompany: proposal.client?.company || "",
    projectType: proposal.project_type,
    projectName: proposal.project_name,
    projectDescription: proposal.project_description || "",
    deliverables: proposal.deliverables.length > 0 ? proposal.deliverables : [""],
    projectSize: proposal.project_size,
    totalPrice: proposal.total_price.toString(),
    currency: proposal.currency,
    paymentStructure: proposal.payment_structure,
    estimatedDays: proposal.estimated_days?.toString() || "",
    startDate: proposal.start_date || "",
    extraRevisionPrice: proposal.extra_revision_price?.toString() || "",
    notes: proposal.notes || "",
  };

  const pdfData = buildProposalDisplayData(formState, {
    proposalId: proposal.reference_code,
    proposalDate: new Date(proposal.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
    alreadyAccepted: proposal.status === "aceptada",
    alreadyRejected: proposal.status === "rechazada",
    rejectionReason: proposal.rejection_reason,
    rejectedDate: proposal.rejected_at ? new Date(proposal.rejected_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null,
    existingSignature: proposal.signature_data,
    acceptedDate: proposal.signed_at ? new Date(proposal.signed_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null,
  });

  if (showPreview) {
    return (
      <div className="max-w-3xl mx-auto">
        <ProposalView
          form={formState}
          onBack={() => setShowPreview(false)}
          proposalId={proposal.reference_code}
          proposalDate={new Date(proposal.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          readOnly
          alreadyAccepted={proposal.status === "aceptada"}
          alreadyRejected={proposal.status === "rechazada"}
          rejectionReason={proposal.rejection_reason}
          rejectedDate={proposal.rejected_at ? new Date(proposal.rejected_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null}
          existingSignature={proposal.signature_data}
          acceptedDate={proposal.signed_at ? new Date(proposal.signed_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Back + Header */}
      <Link href="/dashboard/propuestas" className="text-[#5A6D6D] text-sm hover:text-[#194973] transition-colors mb-4 inline-block">
        &larr; Volver a propuestas
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#194973]">{proposal.reference_code}</h1>
            <ProposalStatusBadge status={proposal.status} />
          </div>
          <p className="text-[#5A6D6D] text-sm mt-1">{proposal.project_name}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setShowPreview(true)} className="px-4 py-2 bg-white border border-gray-200 text-[#194973] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
            Ver propuesta
          </button>
          <DownloadProposalPDF
            data={pdfData}
            fileName={`Propuesta-${proposal.reference_code}.pdf`}
            className="px-4 py-2 bg-white border border-gray-200 text-[#194973] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          />
          {proposal.status === "borrador" && (
            <button onClick={handleSend} disabled={sending} className="px-4 py-2 bg-[#194973] text-white rounded-xl text-sm font-semibold hover:bg-[#0f3150] transition-colors disabled:opacity-50">
              {sending ? "Enviando..." : "Marcar como enviada"}
            </button>
          )}
          {(proposal.status === "enviada" || proposal.status === "vista") && (
            <button onClick={copyLink} className="px-4 py-2 bg-[#71C648] text-white rounded-xl text-sm font-semibold hover:bg-[#5db33a] transition-colors">
              {copied ? "Copiado!" : "Copiar link cliente"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info principal */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Detalles */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Detalles del proyecto</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[#5A6D6D]">Cliente</div>
                <div className="text-sm font-medium text-[#194973]">{proposal.client?.name || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Empresa</div>
                <div className="text-sm font-medium text-[#194973]">{proposal.client?.company || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Importe</div>
                <div className="text-lg font-bold text-[#194973]">{formatCurrency(proposal.total_price, proposal.currency)}</div>
              </div>
              <div>
                <div className="text-xs text-[#5A6D6D]">Plazo</div>
                <div className="text-sm font-medium text-[#194973]">{proposal.estimated_days ? `${proposal.estimated_days} dias` : "-"}</div>
              </div>
            </div>
            {proposal.rejection_reason && (
              <div className="col-span-2 mt-2">
                <div className="text-xs text-[#5A6D6D]">Motivo de rechazo</div>
                <div className="text-sm text-red-600 mt-1 p-3 bg-red-50 rounded-lg">{proposal.rejection_reason}</div>
              </div>
            )}
          </div>

          {/* Pagos */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Pagos</h3>
            <div className="flex flex-col gap-3">
              {proposal.payments
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl">
                    <div>
                      <div className="text-sm font-medium text-[#194973]">{p.label}</div>
                      <div className="text-xs text-[#5A6D6D]">{p.percentage}% del total</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-[#194973]">{formatCurrency(p.amount, p.currency)}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        p.paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {p.paid ? "Pagado" : "Pendiente"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Timeline</h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-[#71C648] mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-[#5A6D6D]">Creada</div>
                  <div className="text-sm text-[#194973]">{new Date(proposal.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                </div>
              </div>
              {proposal.sent_at && (
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#5A6D6D]">Enviada</div>
                    <div className="text-sm text-[#194973]">{new Date(proposal.sent_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                </div>
              )}
              {proposal.first_viewed_at && (
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#5A6D6D]">Vista por cliente</div>
                    <div className="text-sm text-[#194973]">{new Date(proposal.first_viewed_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                </div>
              )}
              {proposal.signed_at && (
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#5A6D6D]">Firmada</div>
                    <div className="text-sm text-[#194973]">{new Date(proposal.signed_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                </div>
              )}
              {proposal.rejected_at && (
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-[#5A6D6D]">Rechazada</div>
                    <div className="text-sm text-[#194973]">{new Date(proposal.rejected_at).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                </div>
              )}
              {proposal.proposal_views?.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="text-xs text-[#5A6D6D]">{proposal.proposal_views.length} vista(s) totales</div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Acciones</h3>
            <div className="flex flex-col gap-2">
              {proposal.status !== "aceptada" && proposal.status !== "descartada" && (
                <button
                  onClick={() => handleStatusChange("descartada")}
                  className="w-full py-2 px-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
                >
                  Descartar propuesta
                </button>
              )}
              {(proposal.status === "enviada" || proposal.status === "vista") && (
                <button
                  onClick={() => handleStatusChange("rechazada")}
                  className="w-full py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Marcar como rechazada
                </button>
              )}
              {proposal.client && (
                <Link
                  href={`/dashboard/clientes/${proposal.client.id}`}
                  className="w-full py-2 px-3 bg-gray-100 text-[#194973] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                >
                  Ver cliente
                </Link>
              )}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors mt-2 border-t border-gray-100 pt-3 disabled:opacity-50"
              >
                {deleting ? "Eliminando..." : "Eliminar propuesta"}
              </button>
            </div>
          </div>

          {/* Public link */}
          {proposal.status !== "borrador" && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-bold text-[#5A6D6D] uppercase tracking-wider mb-4">Link publico</h3>
              <div className="bg-[#f8f9fa] rounded-xl p-3 text-xs text-[#5A6D6D] break-all mb-3">
                {typeof window !== "undefined" ? `${window.location.origin}/propuesta/${proposal.token}` : `/propuesta/${proposal.token}`}
              </div>
              <button onClick={copyLink} className="w-full py-2 bg-[#194973] text-white rounded-lg text-sm font-semibold hover:bg-[#0f3150] transition-colors">
                {copied ? "Copiado!" : "Copiar link"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
