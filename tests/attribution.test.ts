import assert from "node:assert/strict";
import { it } from "node:test";
import { captureEntry, clearEntry, getInquiryOrigin, originFromUrl } from "@/lib/attribution";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent";
import { trackLead } from "@/lib/analytics";

it("extrae campañas sin guardar queries, fragmentos ni rutas del referrer", () => {
  const origin = originFromUrl("https://example.com/es?utm_source=google&email=private#secret", "https://search.example/path?token=private");
  assert.equal(origin.landing, "/es");
  assert.equal(origin.referrer, "https://search.example");
  assert.equal(origin.utmSource, "google");
  assert.ok(!JSON.stringify(origin).includes("private"));
  assert.equal(originFromUrl("https://example.com/es?utm_campaign=" + "x".repeat(200), "inválido").utmCampaign.length, 120);
});

it("conserva la entrada entre rutas con consentimiento y bloquea atribución y eventos al rechazar", (t) => {
  const originals = ["window", "document", "localStorage", "sessionStorage"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const);
  const local = new Map<string, string>();
  const session = new Map<string, string>();
  const storage = (map: Map<string, string>) => ({ getItem: (key: string) => map.get(key) ?? null, setItem: (key: string, value: string) => map.set(key, value), removeItem: (key: string) => map.delete(key) });
  const events: unknown[][] = [];
  const location = { href: "https://example.com/es?utm_source=campaign", pathname: "/es", origin: "https://example.com" };
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location, gtag: (...args: unknown[]) => events.push(args) } });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { referrer: "https://search.example/query?private=yes" } });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage(local) });
  Object.defineProperty(globalThis, "sessionStorage", { configurable: true, value: storage(session) });
  t.after(() => {
    clearEntry();
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  });
  clearEntry();
  captureEntry();
  assert.equal(session.size, 0, "No persistir antes del consentimiento");
  assert.equal(getInquiryOrigin(), undefined);
  trackLead("form_start", "diagnostico");
  assert.equal(events.length, 0);

  const consent = { version: CONSENT_VERSION, necessary: true, analytics: true, marketing: false };
  local.set(CONSENT_KEY, JSON.stringify(consent));
  location.href = "https://example.com/es/diagnostico";
  location.pathname = "/es/diagnostico";
  captureEntry();
  assert.equal(getInquiryOrigin()?.landing, "/es");
  assert.equal(getInquiryOrigin()?.utmSource, "campaign");
  assert.equal(session.size, 1);
  trackLead("generate_lead", "diagnostico");
  assert.deepEqual(events, [["event", "generate_lead", {
    form_name: "diagnostico",
    page_path: "/es/diagnostico",
    page_location: "https://example.com/es/diagnostico",
  }]]);

  // Una recarga de la página mantiene la atribución guardada para la sesión.
  const stored = [...session.entries()];
  clearEntry();
  for (const [key, value] of stored) session.set(key, value);
  captureEntry();
  assert.equal(getInquiryOrigin()?.utmSource, "campaign");

  local.set(CONSENT_KEY, JSON.stringify({ ...consent, analytics: false }));
  clearEntry();
  assert.equal(getInquiryOrigin(), undefined);
  assert.equal(session.size, 0);
  trackLead("generate_lead", "contacto");
  assert.equal(events.length, 1);
  local.set(CONSENT_KEY, JSON.stringify({ ...consent, analytics: "true" }));
  assert.equal(getInquiryOrigin(), undefined, "Un valor corrupto no habilita la atribución");
  local.set(CONSENT_KEY, JSON.stringify({ ...consent, version: CONSENT_VERSION - 1 }));
  assert.equal(getInquiryOrigin(), undefined, "El consentimiento anterior no cubre la nueva finalidad");
});
