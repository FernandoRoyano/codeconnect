import { readConsent } from "@/lib/consent";

export type LeadForm = "diagnostico" | "contacto" | "presupuesto";
type LeadEvent = "form_start" | "form_step" | "form_error" | "generate_lead" | "request_call";

/** La firma impide incorporar texto libre, emails o nombres a los eventos. */
export function trackLead(event: LeadEvent, form: LeadForm, step?: number): void {
  if (typeof window === "undefined" || !readConsent()?.analytics) return;
  window.gtag?.("event", event, {
    form_name: form,
    page_path: window.location.pathname,
    page_location: `${window.location.origin}${window.location.pathname}`,
    ...(step === undefined ? {} : { step }),
  });
}
