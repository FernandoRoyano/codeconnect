import { readConsent } from "@/lib/consent";

export type InquiryOrigin = {
  landing: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

const KEY = "cc_entry_v1";
let entry: InquiryOrigin | null = null;

/** Solo campos de campaña conocidos; nunca la query completa ni fragmentos. */
export function originFromUrl(href: string, referrer: string): InquiryOrigin {
  const url = new URL(href);
  const campaign = (key: string) => (url.searchParams.get(key) || "").slice(0, 120);
  let source = "";
  try { source = referrer ? new URL(referrer).origin : ""; } catch { /* Origen inválido. */ }
  return {
    landing: url.pathname.slice(0, 500),
    referrer: source,
    utmSource: campaign("utm_source"),
    utmMedium: campaign("utm_medium"),
    utmCampaign: campaign("utm_campaign"),
    utmTerm: campaign("utm_term"),
    utmContent: campaign("utm_content"),
  };
}

/** Conserva la entrada en memoria; solo persiste con consentimiento analítico. */
export function captureEntry(): void {
  if (typeof window === "undefined") return;
  const consent = readConsent();
  if (consent && !consent.analytics) {
    clearEntry();
    return;
  }
  entry ??= originFromUrl(window.location.href, document.referrer);
  if (!consent?.analytics) return;
  try {
    const raw = sessionStorage.getItem(KEY);
    const saved: unknown = raw ? JSON.parse(raw) : null;
    if (saved && typeof saved === "object" &&
      Object.keys(entry).every((key) => typeof (saved as Record<string, unknown>)[key] === "string" &&
        ((saved as Record<string, string>)[key].length <= 500))) {
      entry = Object.fromEntries(Object.keys(entry).map((key) => [key, (saved as Record<string, string>)[key]])) as InquiryOrigin;
    }
    sessionStorage.setItem(KEY, JSON.stringify(entry));
  } catch { /* La navegación sigue funcionando con almacenamiento bloqueado. */ }
}

export function clearEntry(): void {
  entry = null;
  try { sessionStorage.removeItem(KEY); } catch { /* Almacenamiento bloqueado. */ }
}

export function getInquiryOrigin(): InquiryOrigin | undefined {
  if (!readConsent()?.analytics) return undefined;
  captureEntry();
  return entry ?? undefined;
}
