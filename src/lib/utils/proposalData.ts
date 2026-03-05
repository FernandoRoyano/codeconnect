import {
  PAYMENT_STRUCTURES,
  PROJECT_TYPES,
  SIZE_REVISIONS,
  CONDITIONS,
  type ProposalFormState,
  type PaymentStructureKey,
} from "@/lib/constants/proposal";

export interface ProposalDisplayData {
  businessName: string;
  displayId: string;
  displayDate: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  projectTypeLabel: string;
  projectName: string;
  projectDescription: string;
  deliverables: string[];
  processSteps: { step: string; title: string; desc: string }[];
  revisionCount: number;
  extraRevisionPriceText: string;
  currencySymbol: string;
  totalFormatted: string;
  totalRaw: number;
  paymentSplits: { label: string; amount: string; pct: number; isFirst: boolean }[] | null;
  startDateFormatted: string | null;
  estimatedDays: string | null;
  notes: string | null;
  conditions: string[];
  isAccepted: boolean;
  isRejected: boolean;
  acceptedDate: string | null;
  rejectedDate: string | null;
  rejectionReason: string | null;
  signatureDataUri: string | null;
  clientNameForSignature: string;
}

export function buildProposalDisplayData(
  form: ProposalFormState,
  options: {
    proposalId?: string;
    proposalDate?: string;
    alreadyAccepted?: boolean;
    alreadyRejected?: boolean;
    acceptedDate?: string | null;
    rejectedDate?: string | null;
    rejectionReason?: string | null;
    existingSignature?: string | null;
  } = {}
): ProposalDisplayData {
  const revisions = SIZE_REVISIONS[form.projectSize];
  const payment = PAYMENT_STRUCTURES[form.paymentStructure as PaymentStructureKey];
  const curr = form.currency === "EUR" ? "\u20AC" : "$";
  const total = parseFloat(form.totalPrice) || 0;

  return {
    businessName: form.businessName || "CodeConnect",
    displayId: options.proposalId || `CC-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    displayDate: options.proposalDate || new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
    clientName: form.clientName || "Nombre del cliente",
    clientCompany: form.clientCompany,
    clientEmail: form.clientEmail,
    projectTypeLabel: PROJECT_TYPES.find((t) => t.value === form.projectType)?.label || form.projectType,
    projectName: form.projectName || "Nombre del proyecto",
    projectDescription: form.projectDescription || "",
    deliverables: form.deliverables.filter(Boolean),
    processSteps: [
      { step: "1", title: "Propuesta de diseno", desc: `Te presento una propuesta visual que podras modificar hasta que estes 100% satisfecho.` },
      { step: "2", title: "Desarrollo", desc: `Una vez aprobado el diseno, paso a desarrollo con ${revisions} rondas de revision incluidas.` },
      { step: "3", title: "Entrega final", desc: "Tras las revisiones, entrega del proyecto completo y cierre." },
    ],
    revisionCount: revisions,
    extraRevisionPriceText: form.extraRevisionPrice ? `${curr}${form.extraRevisionPrice}/revision` : "a consultar",
    currencySymbol: curr,
    totalFormatted: `${curr}${total.toLocaleString("es-ES")}`,
    totalRaw: total,
    paymentSplits: payment
      ? payment.splits.map((s, i) => ({
          label: s.label,
          amount: `${curr}${((total * s.pct) / 100).toLocaleString("es-ES")}`,
          pct: s.pct,
          isFirst: i === 0,
        }))
      : null,
    startDateFormatted: form.startDate
      ? new Date(form.startDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
      : null,
    estimatedDays: form.estimatedDays ? `${form.estimatedDays} dias laborables` : null,
    notes: form.notes || null,
    conditions: CONDITIONS,
    isAccepted: options.alreadyAccepted || false,
    isRejected: options.alreadyRejected || false,
    acceptedDate: options.acceptedDate || null,
    rejectedDate: options.rejectedDate || null,
    rejectionReason: options.rejectionReason || null,
    signatureDataUri: options.existingSignature || null,
    clientNameForSignature: form.clientName,
  };
}
