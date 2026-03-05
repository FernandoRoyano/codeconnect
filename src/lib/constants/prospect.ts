export type ProspectPipelineStatus =
  | "identificado"
  | "contactado"
  | "respondido"
  | "interesado"
  | "negociando"
  | "convertido"
  | "descartado";

export const PIPELINE_STATUS_CONFIG: Record<
  ProspectPipelineStatus,
  { label: string; bg: string; text: string }
> = {
  identificado: { label: "Identificado", bg: "bg-gray-100", text: "text-gray-700" },
  contactado: { label: "Contactado", bg: "bg-blue-100", text: "text-blue-700" },
  respondido: { label: "Respondido", bg: "bg-purple-100", text: "text-purple-700" },
  interesado: { label: "Interesado", bg: "bg-teal-100", text: "text-teal-700" },
  negociando: { label: "Negociando", bg: "bg-orange-100", text: "text-orange-700" },
  convertido: { label: "Convertido", bg: "bg-green-100", text: "text-green-700" },
  descartado: { label: "Descartado", bg: "bg-red-100", text: "text-red-700" },
};

export const PIPELINE_TABS = [
  { label: "Todos", value: "all" },
  { label: "Identificado", value: "identificado" },
  { label: "Contactado", value: "contactado" },
  { label: "Respondido", value: "respondido" },
  { label: "Interesado", value: "interesado" },
  { label: "Negociando", value: "negociando" },
  { label: "Convertido", value: "convertido" },
  { label: "Descartado", value: "descartado" },
];

export const SEGMENTS = [
  { value: "restauracion", label: "Restauracion / Hosteleria" },
  { value: "salud", label: "Salud / Clinicas" },
  { value: "ecommerce", label: "E-commerce / Tiendas" },
  { value: "servicios", label: "Servicios profesionales" },
  { value: "inmobiliaria", label: "Inmobiliaria" },
  { value: "educacion", label: "Educacion / Formacion" },
  { value: "turismo", label: "Turismo / Viajes" },
  { value: "otro", label: "Otro" },
];

export interface ProspectFormState {
  name: string;
  position: string;
  company: string;
  city: string;
  country: string;
  segment: string;
  whyGoodProspect: string;
  contactNotes: string;
  websiteUrl: string;
  hasOnlineBooking: boolean;
  hasApp: boolean;
  websiteQuality: number;
  email: string;
  phone: string;
  pipelineStatus: ProspectPipelineStatus;
}

export const initialProspectFormState: ProspectFormState = {
  name: "",
  position: "",
  company: "",
  city: "",
  country: "Espana",
  segment: "",
  whyGoodProspect: "",
  contactNotes: "",
  websiteUrl: "",
  hasOnlineBooking: false,
  hasApp: false,
  websiteQuality: 0,
  email: "",
  phone: "",
  pipelineStatus: "identificado",
};
