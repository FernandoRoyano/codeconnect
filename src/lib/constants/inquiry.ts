export type InquiryStatus =
  | "new"
  | "reviewed"
  | "conversation"
  | "proposal"
  | "won"
  | "discarded";

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "new",
  "reviewed",
  "conversation",
  "proposal",
  "won",
  "discarded",
];

export const INQUIRY_STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string }
> = {
  new: { label: "Nuevo", bg: "bg-blue-100", text: "text-blue-700" },
  reviewed: { label: "Revisado", bg: "bg-purple-100", text: "text-purple-700" },
  conversation: { label: "Conversacion", bg: "bg-teal-100", text: "text-teal-700" },
  proposal: { label: "Propuesta", bg: "bg-orange-100", text: "text-orange-700" },
  won: { label: "Ganado", bg: "bg-green-100", text: "text-green-700" },
  discarded: { label: "Descartado", bg: "bg-gray-100", text: "text-gray-600" },
};

export const INQUIRY_TABS = [
  { label: "Todos", value: "all" },
  ...INQUIRY_STATUSES.map((value) => ({ label: INQUIRY_STATUS_CONFIG[value].label, value })),
];

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return typeof value === "string" && (INQUIRY_STATUSES as string[]).includes(value);
}

/** Campos del diagnostico que se muestran agrupados en el detalle del panel. */
export const INQUIRY_SECTIONS: { title: string; fields: { key: string; label: string }[] }[] = [
  {
    title: "Proceso actual",
    fields: [
      { key: "goal", label: "Que quiere mejorar" },
      { key: "current_process", label: "Como lo hace hoy" },
      { key: "tools", label: "Herramientas que usa" },
    ],
  },
  {
    title: "Problema",
    fields: [
      { key: "pain", label: "Que le resulta lento o manual" },
      { key: "frequency", label: "Con que frecuencia ocurre" },
      { key: "time_spent", label: "Tiempo que le dedica" },
      { key: "people_involved", label: "Personas implicadas" },
      { key: "consequences", label: "Errores o problemas que genera" },
      { key: "business_impact", label: "Impacto en el negocio" },
    ],
  },
  {
    title: "Contexto",
    fields: [
      { key: "tried_so_far", label: "Que ha intentado" },
      { key: "extra_notes", label: "Informacion adicional" },
    ],
  },
];
