import type { NextRequest } from "next/server";

/**
 * Defensas comunes a los formularios publicos (/api/contact y /api/presupuesto):
 * ambos aceptan entrada anonima y acaban interpolandola en el HTML de un correo.
 */

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => HTML_ESCAPES[character] ?? character);
}

/**
 * Devuelve la cadena saneada, "" si el campo es opcional y viene vacio, o null
 * si el valor no es aceptable. Distinguir null de "" permite al llamante
 * rechazar tipos inesperados sin confundirlos con un campo opcional ausente.
 */
export function readString(value: unknown, maxLength: number, required = false): string | null {
  if (value == null || value === "") return required ? null : "";
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if ((required && !normalized) || normalized.length > maxLength) return null;
  return normalized;
}

export function readStringArray(value: unknown, maxItems: number, maxLength: number): string[] | null {
  if (value == null) return [];
  if (!Array.isArray(value) || value.length > maxItems) return null;
  const items: string[] = [];
  for (const entry of value) {
    const item = readString(entry, maxLength);
    if (item === null) return null;
    if (item) items.push(item);
  }
  return items;
}

export function readFiniteNumber(value: unknown, min: number, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return value;
}

export function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/**
 * Lee una direccion de correo de una variable de entorno quitando saltos de
 * linea y tabuladores. Un valor pegado en el panel de Vercel puede arrastrar un
 * salto final, y un salto dentro de una cabecera de correo es la via clasica de
 * inyeccion: el destinatario o el remitente dejan de ser los que creemos.
 */
export function readEmailEnv(value: string | undefined): string | null {
  if (!value) return null;
  const cleaned = value.replace(/[\r\n\t]/g, "").trim();
  return cleaned || null;
}

type RateLimitOptions = { windowMs: number; max: number };

const buckets = new Map<string, number[]>();
let lastSweep = 0;

// Sin esta purga el Map crece indefinidamente: cada IP nueva dejaba una entrada
// que ya nunca se volvia a mirar.
function sweep(now: number, windowMs: number) {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    if (hits.every((timestamp) => now - timestamp >= windowMs)) buckets.delete(key);
  }
}

/**
 * Limitador por ventana deslizante. Vive en memoria del proceso, asi que en
 * serverless solo frena el abuso que cae en la misma instancia: sirve contra
 * envios repetidos, no contra un ataque distribuido.
 */
export function isRateLimited(key: string, { windowMs, max }: RateLimitOptions): boolean {
  if (key === "unknown") return false;
  const now = Date.now();
  sweep(now, windowMs);
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > max;
}

export type JsonBodyResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; status: 400 | 413 };

/**
 * Lee el cuerpo como JSON aplicando el limite de tamano dos veces: primero por
 * content-length, que evita leer el cuerpo entero, y despues sobre los bytes
 * reales, porque esa cabecera la pone el cliente y puede mentir.
 */
export async function readJsonBody(request: NextRequest, maxBytes: number): Promise<JsonBodyResult> {
  if (Number(request.headers.get("content-length") ?? 0) > maxBytes) {
    return { ok: false, status: 413 };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400 };
  }

  if (new TextEncoder().encode(raw).length > maxBytes) return { ok: false, status: 413 };

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, status: 400 };
    }
    return { ok: true, data: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, status: 400 };
  }
}
