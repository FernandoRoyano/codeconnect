export const PAYMENT_STRUCTURES = {
  two: { label: "2 pagos", splits: [{ label: "Inicio", pct: 50 }, { label: "Entrega", pct: 50 }] },
  three_balanced: { label: "3 pagos (40/30/30)", splits: [{ label: "Inicio", pct: 40 }, { label: "Intermedio", pct: 30 }, { label: "Entrega", pct: 30 }] },
  three_back: { label: "3 pagos (30/30/40)", splits: [{ label: "Inicio", pct: 30 }, { label: "Intermedio", pct: 30 }, { label: "Entrega", pct: 40 }] },
};

export const PROJECT_TYPES = [
  { value: "web", label: "Pagina web / Landing page" },
  { value: "crm", label: "CRM / Sistema de gestion" },
  { value: "app", label: "App movil" },
  { value: "software", label: "Software a medida" },
  { value: "automation", label: "Automatizacion / Integracion" },
  { value: "custom", label: "Proyecto personalizado" },
];

export const SIZE_REVISIONS: Record<string, number> = { small: 2, medium: 3, large: 4 };

export const CONDITIONS = [
  "El proyecto comenzara una vez recibido el pago inicial acordado.",
  "La propuesta de diseno sera presentada antes del desarrollo. El cliente podra solicitar modificaciones sobre esta propuesta hasta dar su aprobacion por escrito (email, mensaje o firma).",
  "Una vez aprobada la propuesta de diseno y comenzado el desarrollo, las modificaciones se limitaran al numero de rondas de revision indicadas en este presupuesto.",
  "Cada ronda de revision incluye ajustes menores sobre lo ya desarrollado (textos, colores, espaciados, imagenes). NO incluye cambios estructurales, nuevas funcionalidades ni redisenos de secciones completas.",
  "Cualquier cambio que exceda el alcance definido en este documento sera presupuestado por separado y requerira aprobacion antes de su ejecucion.",
  "Los cambios estructurales o nuevas funcionalidades solicitadas durante el desarrollo se consideraran ampliaciones del proyecto y se cotizaran aparte.",
  "Los plazos de entrega indicados estan sujetos a la disponibilidad de materiales (textos, imagenes, accesos) por parte del cliente. Retrasos en la entrega de materiales pueden afectar la fecha de entrega final.",
  "El proyecto se considerara entregado y finalizado una vez agotadas las rondas de revision o tras 15 dias sin respuesta del cliente despues de la ultima entrega.",
  "Los pagos realizados no son reembolsables. En caso de cancelacion, se facturara el trabajo realizado hasta la fecha.",
  "El desarrollador se reserva el derecho de incluir el proyecto en su portafolio, salvo acuerdo explicito de confidencialidad.",
];

export type PaymentStructureKey = keyof typeof PAYMENT_STRUCTURES;

export interface ProposalFormState {
  businessName: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  projectType: string;
  projectName: string;
  projectDescription: string;
  deliverables: string[];
  projectSize: string;
  totalPrice: string;
  currency: string;
  paymentStructure: string;
  estimatedDays: string;
  startDate: string;
  extraRevisionPrice: string;
  notes: string;
}

export const initialFormState: ProposalFormState = {
  businessName: "CodeConnect",
  clientName: "",
  clientEmail: "",
  clientCompany: "",
  projectType: "web",
  projectName: "",
  projectDescription: "",
  deliverables: [""],
  projectSize: "medium",
  totalPrice: "",
  currency: "EUR",
  paymentStructure: "two",
  estimatedDays: "",
  startDate: "",
  extraRevisionPrice: "",
  notes: "",
};
