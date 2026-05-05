"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button";
import { calcularPresupuesto, getFuncionalidades, getIntegraciones } from "./calculo";
import { tiposProyecto } from "./data";
import type { FormData } from "./types";
import ProgressBar from "./_components/ProgressBar";
import Step1Tipo from "./_components/Step1Tipo";
import Step2Funcionalidades from "./_components/Step2Funcionalidades";
import Step3Integraciones from "./_components/Step3Integraciones";
import Step4Escala from "./_components/Step4Escala";
import Step5Contacto from "./_components/Step5Contacto";

// Lazy: la pantalla de resultado solo se carga al pulsar "Solicitar presupuesto".
// Evita meter el HTML template del PDF en el bundle inicial.
const ResultScreen = dynamic(() => import("./_components/ResultScreen"), { ssr: false });

const TOTAL_STEPS = 5;

export default function PresupuestoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tipoProyecto: "",
    funcionalidades: [],
    otraFuncionalidad: "",
    integraciones: [],
    otraIntegracion: "",
    numeroUsuarios: "",
    necesitaApp: false,
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    comentarios: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [llamadaStatus, setLlamadaStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const buildPayload = (solicitaLlamada: boolean) => {
    const presupuesto = calcularPresupuesto(formData);
    const tipoProyectoData = tiposProyecto.find((t) => t.id === formData.tipoProyecto);
    const funcionalidadesSeleccionadas = formData.funcionalidades
      .map((id) => getFuncionalidades(formData.tipoProyecto).find((f) => f.id === id)?.label)
      .filter(Boolean) as string[];
    const integracionesSeleccionadas = formData.integraciones
      .map((id) => getIntegraciones(formData.tipoProyecto).find((i) => i.id === id)?.label)
      .filter(Boolean) as string[];

    return {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      empresa: formData.empresa,
      comentarios: formData.comentarios,
      tipoProyectoLabel: tipoProyectoData?.title || formData.tipoProyecto,
      funcionalidades: funcionalidadesSeleccionadas,
      otraFuncionalidad: formData.otraFuncionalidad,
      integraciones: integracionesSeleccionadas,
      otraIntegracion: formData.otraIntegracion,
      numeroUsuarios: formData.numeroUsuarios,
      necesitaApp: formData.necesitaApp,
      presupuesto: {
        precioBase: presupuesto.precioBase,
        subtotal: presupuesto.subtotal,
        total: presupuesto.total,
        multiplicador: presupuesto.multiplicador,
        precioApp: presupuesto.precioApp,
      },
      solicitaLlamada,
    };
  };

  const handleTipoProyecto = (id: string) => {
    setFormData({
      ...formData,
      tipoProyecto: id,
      funcionalidades: [],
      otraFuncionalidad: "",
      integraciones: [],
      otraIntegracion: "",
    });
  };

  const handleFuncionalidad = (id: string) => {
    const next = formData.funcionalidades.includes(id)
      ? formData.funcionalidades.filter((f) => f !== id)
      : [...formData.funcionalidades, id];
    setFormData({ ...formData, funcionalidades: next });
  };

  const handleIntegracion = (id: string) => {
    const next = formData.integraciones.includes(id)
      ? formData.integraciones.filter((i) => i !== id)
      : [...formData.integraciones, id];
    setFormData({ ...formData, integraciones: next });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(false)),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setSubmitError("No se pudo enviar. Inténtalo de nuevo o escríbenos a codeconnectsl@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const solicitarLlamada = async () => {
    if (llamadaStatus === "sending" || llamadaStatus === "sent") return;
    setLlamadaStatus("sending");
    try {
      const res = await fetch("/api/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(true)),
      });
      if (!res.ok) throw new Error("send failed");
      setLlamadaStatus("sent");
    } catch {
      setLlamadaStatus("error");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.tipoProyecto !== "";
      case 2:
        return formData.funcionalidades.length > 0 || formData.otraFuncionalidad.trim() !== "";
      case 3:
        return formData.integraciones.length > 0 || formData.otraIntegracion.trim() !== "";
      case 4:
        if (formData.tipoProyecto === "web" || formData.tipoProyecto === "otro") return true;
        return formData.numeroUsuarios !== "";
      case 5:
        return formData.nombre !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  const necesitaPasoUsuarios = () => formData.tipoProyecto !== "web" && formData.tipoProyecto !== "otro";

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      let next = currentStep + 1;
      if (next === 4 && !necesitaPasoUsuarios()) next = 5;
      setCurrentStep(next);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      let prev = currentStep - 1;
      if (prev === 4 && !necesitaPasoUsuarios()) prev = 3;
      setCurrentStep(prev);
    }
  };

  if (submitted) {
    return <ResultScreen formData={formData} llamadaStatus={llamadaStatus} onSolicitarLlamada={solicitarLlamada} />;
  }

  return (
    <>
      {/* Hero + Progress */}
      <section className="relative pt-32 sm:pt-36 pb-10 sm:pb-14 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-[#71C648] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#71C648]" />
              Sin compromiso · 24h
            </span>
            <h1
              className="font-bold text-white tracking-tight mb-5"
              style={{ fontSize: "var(--fs-5xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Calcula tu presupuesto
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
              Responde unas preguntas sencillas y te preparamos una propuesta personalizada.
            </p>
          </div>
          <ProgressBar currentStep={currentStep} />
        </div>
      </section>

      {/* Form Steps */}
      <section className="py-12 sm:py-20 bg-[#fafaf9] min-h-[60vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {currentStep === 1 && <Step1Tipo tipoProyecto={formData.tipoProyecto} onSelect={handleTipoProyecto} />}
          {currentStep === 2 && (
            <Step2Funcionalidades
              tipoProyecto={formData.tipoProyecto}
              funcionalidades={formData.funcionalidades}
              otraFuncionalidad={formData.otraFuncionalidad}
              onToggle={handleFuncionalidad}
              onChangeOtra={handleInputChange}
            />
          )}
          {currentStep === 3 && (
            <Step3Integraciones
              tipoProyecto={formData.tipoProyecto}
              integraciones={formData.integraciones}
              otraIntegracion={formData.otraIntegracion}
              onToggle={handleIntegracion}
              onChangeOtra={handleInputChange}
            />
          )}
          {currentStep === 4 && (
            <Step4Escala
              numeroUsuarios={formData.numeroUsuarios}
              necesitaApp={formData.necesitaApp}
              onSelectUsuarios={(value) => setFormData({ ...formData, numeroUsuarios: value })}
              onChangeNecesitaApp={(value) => setFormData({ ...formData, necesitaApp: value })}
            />
          )}
          {currentStep === 5 && <Step5Contacto formData={formData} onChange={handleInputChange} />}

          {submitError && currentStep === TOTAL_STEPS && (
            <div role="alert" className="max-w-xl mx-auto mt-6 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
              {submitError}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevStep}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === 1 ? "invisible" : "bg-white text-[#194973] hover:bg-gray-100"
              }`}
            >
              Atrás
            </button>

            {currentStep < TOTAL_STEPS ? (
              <Button
                onClick={nextStep}
                variant="primary"
                size="lg"
                disabled={!canProceed()}
                className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
              >
                Siguiente
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="primary" size="lg" disabled={!canProceed() || isSubmitting}>
                {isSubmitting ? "Enviando..." : "Solicitar presupuesto"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8 sm:py-12 bg-white border-t">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#71C648] mb-1">24h</div>
              <div className="text-xs sm:text-sm text-[#5A6D6D]">Respuesta garantizada</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#71C648] mb-1">100%</div>
              <div className="text-xs sm:text-sm text-[#5A6D6D]">Sin compromiso</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#71C648] mb-1">Gratis</div>
              <div className="text-xs sm:text-sm text-[#5A6D6D]">Presupuesto detallado</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
