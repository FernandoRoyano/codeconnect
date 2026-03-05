"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProposalView from "@/components/dashboard/ProposalView";
import DownloadProposalPDF from "@/components/pdf/DownloadProposalPDF";
import { buildProposalDisplayData } from "@/lib/utils/proposalData";
import type { ProposalFormState } from "@/lib/constants/proposal";

interface PublicProposal {
  id: string;
  reference_code: string;
  status: string;
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
  rejection_reason: string | null;
  rejected_at: string | null;
  created_at: string;
  client: { name: string; email: string; company: string | null } | null;
}

export default function PublicProposalPage() {
  const { token } = useParams();
  const [proposal, setProposal] = useState<PublicProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [signed, setSigned] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  useEffect(() => {
    fetchProposal();
  }, [token]);

  const fetchProposal = async () => {
    try {
      const res = await fetch(`/api/proposals/token/${token}`);
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProposal(data);
      setSigned(data.status === "aceptada");
      setRejected(data.status === "rechazada");

      // Record view
      fetch(`/api/proposals/token/${token}/view`, { method: "POST" });
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const handleSign = async (signatureData: string) => {
    const res = await fetch(`/api/proposals/token/${token}/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signatureData }),
    });
    if (res.ok) {
      setSigned(true);
    }
  };

  const handleReject = async () => {
    setRejecting(true);
    const res = await fetch(`/api/proposals/token/${token}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rejectionReason: rejectionReason.trim() || null }),
    });
    if (res.ok) {
      setRejected(true);
      setShowRejectForm(false);
    }
    setRejecting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-[#5A6D6D]">Cargando propuesta...</div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">&#128270;</div>
          <h1 className="text-2xl font-bold text-[#194973] mb-2">Propuesta no encontrada</h1>
          <p className="text-[#5A6D6D]">El enlace puede haber expirado o no ser valido.</p>
        </div>
      </div>
    );
  }

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
    alreadyAccepted: signed,
    alreadyRejected: rejected,
    rejectionReason: proposal.rejection_reason,
    rejectedDate: proposal.rejected_at ? new Date(proposal.rejected_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null,
    existingSignature: proposal.signature_data,
    acceptedDate: proposal.signed_at ? new Date(proposal.signed_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null,
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ProposalView
          form={formState}
          proposalId={proposal.reference_code}
          proposalDate={new Date(proposal.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          readOnly={signed || rejected}
          alreadyAccepted={signed}
          alreadyRejected={rejected}
          rejectionReason={proposal.rejection_reason}
          rejectedDate={proposal.rejected_at ? new Date(proposal.rejected_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null}
          existingSignature={proposal.signature_data}
          acceptedDate={proposal.signed_at ? new Date(proposal.signed_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null}
          onSign={handleSign}
          onReject={() => setShowRejectForm(true)}
        />
        {signed && (
          <div className="mt-6 text-center">
            <DownloadProposalPDF
              data={pdfData}
              fileName={`Propuesta-${proposal.reference_code}.pdf`}
              className="px-6 py-3 bg-[#194973] text-white rounded-xl text-sm font-semibold hover:bg-[#0f3150] transition-colors disabled:opacity-50"
            />
          </div>
        )}
      </div>

      {/* Modal de rechazo */}
      {showRejectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-xl font-extrabold text-[#194973] mb-2">Rechazar propuesta</h3>
            <p className="text-sm text-[#5A6D6D] mb-4">
              ¿Estas seguro de que deseas rechazar esta propuesta? Esta accion no se puede deshacer.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Motivo del rechazo (opcional)"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-[#194973] outline-none focus:border-red-400 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectForm(false)}
                className="flex-1 py-3 bg-gray-100 text-[#5A6D6D] rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                disabled={rejecting}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {rejecting ? "Rechazando..." : "Confirmar rechazo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
