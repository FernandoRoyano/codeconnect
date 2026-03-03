import type { ProposalStatus } from "@/lib/supabase/types";

const STATUS_CONFIG: Record<ProposalStatus, { label: string; bg: string; text: string }> = {
  borrador: { label: "Borrador", bg: "bg-gray-100", text: "text-gray-700" },
  enviada: { label: "Enviada", bg: "bg-blue-100", text: "text-blue-700" },
  vista: { label: "Vista", bg: "bg-purple-100", text: "text-purple-700" },
  aceptada: { label: "Aceptada", bg: "bg-green-100", text: "text-green-700" },
  rechazada: { label: "Rechazada", bg: "bg-red-100", text: "text-red-700" },
  descartada: { label: "Descartada", bg: "bg-yellow-100", text: "text-yellow-700" },
};

export default function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.borrador;
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
