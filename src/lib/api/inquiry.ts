import { readString } from "@/lib/api/form-guards";

/**
 * Validacion y normalizacion del diagnostico publico. Vive fuera de la ruta para
 * poder probarla sin levantar HTTP: es la unica frontera entre entrada anonima y
 * la base de datos.
 */

export type InquiryInput = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  goal: string;
  current_process: string | null;
  tools: string | null;
  pain: string;
  frequency: string | null;
  time_spent: string | null;
  people_involved: string | null;
  consequences: string | null;
  business_impact: string | null;
  tried_so_far: string | null;
  extra_notes: string | null;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  privacy_accepted: true;
  privacy_accepted_at: string;
};

export type ParseResult =
  | { ok: true; value: InquiryInput }
  | { ok: false; error: string; field?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// El origen lo compone el navegador, asi que se guarda corto y como texto
// plano. No decide nada: solo sirve para saber por donde entro el contacto.
const ORIGIN_MAX = 500;

type FieldSpec = {
  key: keyof InquiryInput;
  from: string;
  max: number;
  required?: boolean;
  label: string;
};

const FIELDS: FieldSpec[] = [
  { key: "name", from: "nombre", max: 100, required: true, label: "nombre" },
  { key: "phone", from: "telefono", max: 40, label: "telefono" },
  { key: "company", from: "empresa", max: 120, label: "empresa" },
  { key: "goal", from: "objetivo", max: 2_000, required: true, label: "objetivo" },
  { key: "current_process", from: "procesoActual", max: 2_000, label: "proceso actual" },
  { key: "tools", from: "herramientas", max: 500, label: "herramientas" },
  { key: "pain", from: "problema", max: 2_000, required: true, label: "problema" },
  { key: "frequency", from: "frecuencia", max: 200, label: "frecuencia" },
  { key: "time_spent", from: "tiempoDedicado", max: 200, label: "tiempo dedicado" },
  { key: "people_involved", from: "personasImplicadas", max: 200, label: "personas implicadas" },
  { key: "consequences", from: "consecuencias", max: 2_000, label: "consecuencias" },
  { key: "business_impact", from: "impacto", max: 2_000, label: "impacto" },
  { key: "tried_so_far", from: "intentos", max: 2_000, label: "intentos previos" },
  { key: "extra_notes", from: "notas", max: 2_000, label: "notas" },
];

const ORIGIN_FIELDS: { key: keyof InquiryInput; from: string }[] = [
  { key: "landing_path", from: "landing" },
  { key: "referrer", from: "referrer" },
  { key: "utm_source", from: "utmSource" },
  { key: "utm_medium", from: "utmMedium" },
  { key: "utm_campaign", from: "utmCampaign" },
  { key: "utm_term", from: "utmTerm" },
  { key: "utm_content", from: "utmContent" },
];

export function parseInquiry(data: Record<string, unknown>): ParseResult {
  const out = {} as Record<string, unknown>;

  for (const spec of FIELDS) {
    const value = readString(data[spec.from], spec.max, spec.required);
    if (value === null) {
      return { ok: false, error: `Revisa el campo: ${spec.label}`, field: spec.from };
    }
    out[spec.key] = spec.required ? value : value || null;
  }

  const email = readString(data.email, 254, true);
  if (!email) return { ok: false, error: "Revisa el campo: email", field: "email" };
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "El email no parece valido", field: "email" };
  }
  out.email = email;

  // El consentimiento tiene que llegar explicitamente a true. Cualquier otra
  // cosa (ausente, "false", 1) se trata como no aceptado.
  if (data.privacidad !== true) {
    return { ok: false, error: "Falta aceptar la politica de privacidad", field: "privacidad" };
  }
  out.privacy_accepted = true;
  out.privacy_accepted_at = new Date().toISOString();

  const origin = data.origen;
  const originData: Record<string, unknown> =
    origin && typeof origin === "object" && !Array.isArray(origin)
      ? (origin as Record<string, unknown>)
      : {};
  for (const spec of ORIGIN_FIELDS) {
    const value = readString(originData[spec.from], ORIGIN_MAX);
    // El origen nunca invalida el envio: si viene raro, se descarta y ya.
    out[spec.key] = value || null;
  }

  return { ok: true, value: out as InquiryInput };
}

/** Resumen de una linea para el asunto del correo y el listado del panel. */
export function inquirySummary(value: Pick<InquiryInput, "goal" | "pain">, max = 120): string {
  const text = (value.goal || value.pain || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
