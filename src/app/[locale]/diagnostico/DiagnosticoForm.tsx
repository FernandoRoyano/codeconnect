"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getInquiryOrigin } from "@/lib/attribution";
import { trackLead } from "@/lib/analytics";

const optionalFields = [
  ["procesoActual", "textarea", 2000], ["herramientas", "text", 500],
  ["problema", "textarea", 2000], ["frecuencia", "text", 200],
  ["tiempoDedicado", "text", 200], ["personasImplicadas", "text", 200],
  ["consecuencias", "textarea", 2000], ["impacto", "textarea", 2000],
  ["intentos", "textarea", 2000], ["notas", "textarea", 2000],
  ["telefono", "tel", 40], ["empresa", "text", 120],
] as const;
const inputCls = "w-full rounded-xl border border-[#d8e1de] bg-[#fafaf9] px-4 py-3 text-[#194973] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075f58]";
const labelCls = "mb-2 block text-sm font-medium text-[#194973]";

export default function DiagnosticoForm() {
  const t = useTranslations("diagnosis");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const submitting = useRef(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errorField = useRef<string | null>(null);

  useEffect(() => { if (sent) successRef.current?.focus(); }, [sent]);
  useEffect(() => {
    if (!error || sending || !errorField.current) return;
    const control = formRef.current?.elements.namedItem(errorField.current);
    if (control instanceof HTMLElement) control.focus();
  }, [error, sending]);

  const start = () => {
    if (started.current) return;
    started.current = true;
    trackLead("form_start", "diagnostico");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const payload: Record<string, unknown> = Object.fromEntries(new FormData(form));
    for (const key of ["objetivo", "nombre", "email"]) {
      if (typeof payload[key] !== "string" || !payload[key].trim()) {
        setError(t("requiredError"));
        (form.elements.namedItem(key) as HTMLElement | null)?.focus();
        return;
      }
    }
    payload.privacidad = payload.privacidad === "on";
    payload.formato = "breve";
    payload.origen = getInquiryOrigin();
    submitting.current = true;
    setSending(true);
    setError("");
    errorField.current = null;
    try {
      const response = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        if (typeof body.field === "string") {
          errorField.current = body.field;
          const control = form.elements.namedItem(body.field);
          if (control instanceof HTMLElement) {
            const details = control.closest("details");
            if (details) details.open = true;
          }
        }
        throw new Error(body.error || t("sendError"));
      }
      trackLead("generate_lead", "diagnostico");
      setSent(true);
    } catch (cause) {
      trackLead("form_error", "diagnostico");
      setError(cause instanceof Error ? cause.message : t("sendError"));
    } finally {
      submitting.current = false;
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0f3150] px-4 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-2xl">
        {sent ? (
          <div role="status" className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
            <p className="mb-4 text-sm font-semibold text-[#075f58]">{t("successBadge")}</p>
            <h1 ref={successRef} tabIndex={-1} className="mb-5 text-3xl font-bold text-[#194973]">{t("successTitle")}</h1>
            <p className="mb-4 text-[#57534e]">{t("successDesc")}</p>
            <p className="mb-8 text-[#57534e]">{t("successNote")}</p>
            <Link href="/portfolio" className="inline-flex min-h-11 items-center rounded-full border-2 border-[#194973] px-6 py-3 font-semibold text-[#194973]">{t("successLink")}</Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="mb-4 text-sm font-semibold text-[#65ead9]">{t("badge")}</p>
              <h1 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">{t("title")}</h1>
              <p className="text-lg text-white/80">{t("description")}</p>
            </div>
            <form ref={formRef} onSubmit={submit} onFocusCapture={start} className="rounded-3xl bg-white p-6 shadow-soft sm:p-8" aria-busy={sending}>
              <fieldset disabled={sending} className="min-w-0 space-y-6">
                <legend className="sr-only">{t("title")}</legend>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="objetivo" className={labelCls}>{t("goal")} *</label>
                  <p id="goal-hint" className="mb-3 text-sm text-[#57534e]">{t("goalHint")}</p>
                  <textarea id="objetivo" name="objetivo" required maxLength={2000} rows={3} aria-describedby="goal-hint" placeholder={t("goalPlaceholder")} className={inputCls} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className={labelCls}>{t("name")} *</label>
                    <input id="nombre" name="nombre" required maxLength={100} autoComplete="name" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>{t("email")} *</label>
                    <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputCls} />
                  </div>
                </div>
                <details className="rounded-2xl border border-[#d8e1de] p-4 sm:p-5" onToggle={(event) => { if (event.currentTarget.open) trackLead("form_step", "diagnostico", 2); }}>
                  <summary className="min-h-11 cursor-pointer content-center font-semibold text-[#194973]">{t("optionalTitle")}</summary>
                  <p className="mb-6 mt-3 text-sm text-[#57534e]">{t("optionalHint")}</p>
                  <div className="space-y-5">
                    {optionalFields.map(([name, type, limit]) => (
                      <div key={name}>
                        <label htmlFor={name} className={labelCls}>{t(`fields.${name}`)}</label>
                        {type === "textarea" ? (
                          <textarea id={name} name={name} rows={3} maxLength={limit} className={inputCls} />
                        ) : (
                          <input id={name} name={name} type={type} maxLength={limit} autoComplete={name === "telefono" ? "tel" : name === "empresa" ? "organization" : "off"} className={inputCls} />
                        )}
                      </div>
                    ))}
                  </div>
                </details>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#57534e]">
                  <input name="privacidad" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[#075f58]" />
                  <span>{t("privacy")} * <Link href="/politica-privacidad" className="text-[#075f58] underline">{t("privacyLink")}</Link></span>
                </label>
                <button type="submit" disabled={sending} className="min-h-12 w-full rounded-full bg-[#20dcc2] px-6 py-3 font-semibold text-[#0b0f10] transition-colors hover:bg-[#14bfa9] disabled:cursor-wait disabled:opacity-60">
                  {sending ? t("sending") : t("submit")}
                </button>
              </fieldset>
              {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{error}</p>}
            </form>
            <p className="mt-6 text-center text-sm text-white/80">{t("personalNote")}</p>
            <p className="mt-3 text-center text-sm text-white/80">{t("budgetHint")} <Link href="/presupuesto" className="underline">{t("budgetLink")}</Link></p>
          </>
        )}
      </div>
    </section>
  );
}
