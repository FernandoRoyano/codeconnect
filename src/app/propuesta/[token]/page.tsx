"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProposalView from "@/components/dashboard/ProposalView";
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
  created_at: string;
  client: { name: string; email: string; company: string | null } | null;
}

export default function PublicProposalPage() {
  const { token } = useParams();
  const [proposal, setProposal] = useState<PublicProposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [signed, setSigned] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <ProposalView
          form={formState}
          proposalId={proposal.reference_code}
          proposalDate={new Date(proposal.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          readOnly={signed}
          alreadyAccepted={signed}
          existingSignature={proposal.signature_data}
          acceptedDate={proposal.signed_at ? new Date(proposal.signed_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : null}
          onSign={handleSign}
        />
      </div>
    </div>
  );
}
