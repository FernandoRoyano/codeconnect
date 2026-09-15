"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

type Origin = {
  landing: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

type Fields = {
  objetivo: string;
  procesoActual: string;
  herramientas: string;
  problema: string;
  frecuencia: string;
  tiempoDedicado: string;
  personasImplicadas: string;
  consecuencias: string;
  impacto: string;
  intentos: string;
  notas: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  website: string;
};

const EMPTY: Fields = {
  objetivo: "",
  procesoActual: "",
  herramientas: "",
  problema: "",
  frecuencia: "",
  tiempoDedicado: "",
  personasImplicadas: "",
  consecuencias: "",
  impacto: "",
  intentos: "",
  notas: "",
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  website: "",
};

const STEPS = ["Proceso", "Problema", "Contexto", "Contacto"];
const TOTAL = STEPS.length;

const field =
  "w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] text-[#194973] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all";
const labelCls = "block text-sm font-medium text-[#194973] mb-2";
const hintCls = "text-sm text-[#78716c] mb-2";

function Steps({ current }: { current: number }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center">
        {STEPS.map((label, index) => {
          const step = index + 1;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 flex-shrink-0 ${
                  step < current
                    ? "bg-[#71C648] text-white"
                    : step === current
                      ? "bg-white text-[#194973] ring-4 ring-white/20"
                      : "bg-white/5 text-white/40 border border-white/10"
                }`}
              >
                {step < current ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < TOTAL && (
                <div className="flex-1 h-px mx-2 bg-white/10 relative overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 bg-[#71C648] transition-[width] duration-500 ease-out ${
                      step < current ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="hidden sm:flex justify-between mt-3 text-[11px] uppercase tracking-wider text-white/50 font-medium">
        {STEPS.map((label, index) => (
          <span key={label} className={index + 1 === current ? "text-white" : ""}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DiagnosticoForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [privacidad, setPrivacidad] = useState(false);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // El origen se lee una sola vez, al montar: si el usuario navega dentro del
  // formulario no queremos que se sobrescriba con la URL ya limpia.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrigin({
      landing: window.location.pathname,
      referrer: document.referrer || "",
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmTerm: params.get("utm_term") || "",
      utmContent: params.get("utm_content") || "",
    });
  }, []);

  // Al cambiar de paso el foco va al titulo, para que quien navega con teclado
  // o lector de pantalla sepa que ha cambiado el contenido.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, sent]);

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const stepIsValid = () => {
    if (step === 1) return values.objetivo.trim().length > 0;
    if (step === 2) return values.problema.trim().length > 0;
    if (step === 4) {
      return (
        values.nombre.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) &&
        privacidad
      );
    }
    return true;
  };

  const next = () => {
    if (!stepIsValid()) {
      setError(
        step === 1
          ? "Cuéntame primero qué te gustaría mejorar."
          : "Cuéntame qué parte del proceso te está costando."
      );
      return;
    }
    setError("");
    setStep((s) => Math.min(TOTAL, s + 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepIsValid()) {
      setError("Revisa tu nombre, tu email y la aceptación de privacidad.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, privacidad, origen: origin ?? {} }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "No se pudo enviar");
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "No se pudo enviar. Inténtalo de nuevo dentro de unos minutos."
      );
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <section className="bg-[#0f3150] min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-xl">
          <div role="status" aria-live="polite" className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-soft">
            <div className="w-14 h-14 rounded-full bg-[#eff8ea] text-[#39751f] flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-bold text-[#194973] tracking-tight mb-4 outline-none"
              style={{ fontSize: "var(--fs-2xl)", lineHeight: 1.15 }}
            >
              He recibido tu caso
            </h1>
            <p className="text-[#57534e] leading-relaxed mb-3" style={{ fontSize: "var(--fs-base)" }}>
              Lo revisaré antes de recomendarte una solución. Si veo una forma razonable de
              simplificar el proceso, te explicaré qué haría y por qué.
            </p>
            <p className="text-[#78716c] leading-relaxed mb-8" style={{ fontSize: "var(--fs-sm)" }}>
              También te diré si creo que no compensa desarrollar nada. Te he enviado una copia
              por email.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 border-2 border-[#194973] text-[#194973] hover:bg-[#194973] hover:text-white px-6 py-2.5"
            >
              Mientras tanto, mira lo que he construido
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0f3150] min-h-screen pt-32 pb-24 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-[#71C648] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#71C648]" aria-hidden />
            Diagnóstico gratuito
          </span>
          <h1
            className="font-bold text-white tracking-tight mb-4"
            style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Primero entiendo el problema
          </h1>
          <p className="text-white/70 max-w-xl mx-auto" style={{ fontSize: "var(--fs-base)", lineHeight: 1.6 }}>
            Después vemos si merece la pena usar tecnología. Cuéntame cómo funciona hoy tu
            proceso y qué parte te está costando.
          </p>
        </div>

        <div className="mb-10">
          <Steps current={step} />
        </div>

        <form onSubmit={submit} noValidate className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={set("website")}
            />
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-[#78716c] mb-2">
            Paso {step} de {TOTAL}
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-bold text-[#194973] tracking-tight mb-6 outline-none"
            style={{ fontSize: "var(--fs-xl)", lineHeight: 1.2 }}
          >
            {step === 1 && "¿Cómo funciona hoy?"}
            {step === 2 && "¿Qué parte te está costando?"}
            {step === 3 && "¿Qué has intentado ya?"}
            {step === 4 && "¿Cómo te localizo?"}
          </h2>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="objetivo" className={labelCls}>
                  ¿Qué te gustaría mejorar? *
                </label>
                <p className={hintCls}>Con una frase basta. Ya lo concretamos después.</p>
                <textarea
                  id="objetivo"
                  rows={3}
                  className={field}
                  value={values.objetivo}
                  onChange={set("objetivo")}
                  placeholder="Quiero dejar de perder horas cuadrando las citas de la semana"
                  required
                />
              </div>
              <div>
                <label htmlFor="procesoActual" className={labelCls}>
                  ¿Cómo lo haces ahora mismo?
                </label>
                <p className={hintCls}>Paso a paso, tal cual lo hacéis. Sin adornos.</p>
                <textarea
                  id="procesoActual"
                  rows={4}
                  className={field}
                  value={values.procesoActual}
                  onChange={set("procesoActual")}
                  placeholder="El paciente llama, lo apunto en una libreta y al final del día lo paso a un Excel…"
                />
              </div>
              <div>
                <label htmlFor="herramientas" className={labelCls}>
                  ¿Qué herramientas usáis?
                </label>
                <input
                  id="herramientas"
                  type="text"
                  className={field}
                  value={values.herramientas}
                  onChange={set("herramientas")}
                  placeholder="Excel, WhatsApp, Google Calendar, papel…"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="problema" className={labelCls}>
                  ¿Qué te resulta lento, manual o repetitivo? *
                </label>
                <textarea
                  id="problema"
                  rows={3}
                  className={field}
                  value={values.problema}
                  onChange={set("problema")}
                  placeholder="Copiar los mismos datos tres veces en sitios distintos"
                  required
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="frecuencia" className={labelCls}>
                    ¿Cada cuánto?
                  </label>
                  <input
                    id="frecuencia"
                    type="text"
                    className={field}
                    value={values.frecuencia}
                    onChange={set("frecuencia")}
                    placeholder="A diario"
                  />
                </div>
                <div>
                  <label htmlFor="tiempoDedicado" className={labelCls}>
                    ¿Cuánto tiempo?
                  </label>
                  <input
                    id="tiempoDedicado"
                    type="text"
                    className={field}
                    value={values.tiempoDedicado}
                    onChange={set("tiempoDedicado")}
                    placeholder="2 horas al día"
                  />
                </div>
                <div>
                  <label htmlFor="personasImplicadas" className={labelCls}>
                    ¿Cuántas personas?
                  </label>
                  <input
                    id="personasImplicadas"
                    type="text"
                    className={field}
                    value={values.personasImplicadas}
                    onChange={set("personasImplicadas")}
                    placeholder="2 en recepción"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="consecuencias" className={labelCls}>
                  ¿Qué se rompe cuando falla?
                </label>
                <p className={hintCls}>Citas duplicadas, facturas mal, clientes que se enfadan…</p>
                <textarea
                  id="consecuencias"
                  rows={3}
                  className={field}
                  value={values.consecuencias}
                  onChange={set("consecuencias")}
                />
              </div>
              <div>
                <label htmlFor="impacto" className={labelCls}>
                  ¿Cómo te afecta al negocio?
                </label>
                <textarea
                  id="impacto"
                  rows={3}
                  className={field}
                  value={values.impacto}
                  onChange={set("impacto")}
                  placeholder="No puedo coger más pacientes sin contratar a alguien"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="intentos" className={labelCls}>
                  ¿Has intentado arreglarlo antes?
                </label>
                <p className={hintCls}>
                  Saber qué no funcionó me ahorra proponerte lo mismo otra vez.
                </p>
                <textarea
                  id="intentos"
                  rows={4}
                  className={field}
                  value={values.intentos}
                  onChange={set("intentos")}
                  placeholder="Probamos una herramienta de reservas pero nadie la usaba"
                />
              </div>
              <div>
                <label htmlFor="notas" className={labelCls}>
                  ¿Algo más que deba saber?
                </label>
                <textarea
                  id="notas"
                  rows={3}
                  className={field}
                  value={values.notas}
                  onChange={set("notas")}
                />
              </div>
              <div className="rounded-2xl bg-[#fafaf9] border border-[#e7e5e4] p-5">
                <p className="text-sm text-[#57534e] leading-relaxed">
                  Cuando lo revise puedo concluir varias cosas: que basta con simplificar el
                  proceso, que se resuelve automatizando, que hay que integrar lo que ya usas,
                  que tiene sentido desarrollar algo a medida, o que no compensa desarrollar
                  nada. Te diré cuál de las cinco y por qué.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className={labelCls}>
                    Nombre *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    autoComplete="name"
                    className={field}
                    value={values.nombre}
                    onChange={set("nombre")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={field}
                    value={values.email}
                    onChange={set("email")}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className={labelCls}>
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    autoComplete="tel"
                    className={field}
                    value={values.telefono}
                    onChange={set("telefono")}
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className={labelCls}>
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    autoComplete="organization"
                    className={field}
                    value={values.empresa}
                    onChange={set("empresa")}
                  />
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm text-[#57534e] leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-[#71C648] flex-shrink-0"
                  checked={privacidad}
                  onChange={(e) => setPrivacidad(e.target.checked)}
                  required
                />
                <span>
                  Acepto que uséis estos datos para revisar mi caso y responderme. *{" "}
                  <Link href="/politica-privacidad" className="text-[#39751f] underline">
                    Política de privacidad
                  </Link>
                </span>
              </label>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-6 bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-[#e7e5e4]">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-1.5 text-[#57534e] hover:text-[#194973] font-medium text-sm transition-colors px-2 py-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Atrás
              </button>
            ) : (
              <span />
            )}

            {step < TOTAL ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-1.5 bg-[#71C648] hover:bg-[#5db33a] text-[#12324a] font-semibold px-6 py-3 rounded-full transition-all"
              >
                Continuar
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-1.5 bg-[#71C648] hover:bg-[#5db33a] text-[#12324a] font-semibold px-6 py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Enviando…" : "Enviar para revisión"}
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-white/50 text-sm mt-6">
          No te va a llamar un comercial. Lo reviso yo y te contesto por email.
        </p>
        <p className="text-center text-white/40 text-sm mt-3">
          ¿Solo buscas una orientación de precio?{" "}
          <Link href="/presupuesto" className="text-white/70 underline hover:text-white transition-colors">
            Calcula un rango aproximado
          </Link>
        </p>
      </div>
    </section>
  );
}
