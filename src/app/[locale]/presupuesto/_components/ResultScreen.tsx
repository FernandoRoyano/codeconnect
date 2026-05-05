"use client";

import Button from "@/components/Button";
import { calcularPresupuesto, formatearPrecio, getFuncionalidades, getIntegraciones } from "../calculo";
import { tiposProyecto } from "../data";
import { generarHTMLPresupuesto } from "../html-template";
import type { FormData } from "../types";

interface Props {
  formData: FormData;
  llamadaStatus: "idle" | "sending" | "sent" | "error";
  onSolicitarLlamada: () => void;
}

export default function ResultScreen({ formData, llamadaStatus, onSolicitarLlamada }: Props) {
  const presupuesto = calcularPresupuesto(formData);
  const tipoProyectoData = tiposProyecto.find((t) => t.id === formData.tipoProyecto);
  const funcionalidadesSeleccionadas = formData.funcionalidades
    .map((id) => getFuncionalidades(formData.tipoProyecto).find((f) => f.id === id))
    .filter(Boolean);
  const integracionesSeleccionadas = formData.integraciones
    .map((id) => getIntegraciones(formData.tipoProyecto).find((i) => i.id === id))
    .filter(Boolean);

  const descargarPresupuesto = () => {
    const html = generarHTMLPresupuesto(formData);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `presupuesto-codeconnect-${formData.empresa || formData.nombre || "cliente"}.html`
      .toLowerCase()
      .replace(/\s+/g, "-");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const imprimirPresupuesto = () => {
    const html = generarHTMLPresupuesto(formData);
    const ventana = window.open("", "_blank");
    if (ventana) {
      ventana.document.write(html);
      ventana.document.close();
      setTimeout(() => ventana.print(), 500);
    }
  };

  return (
    <section className="pt-28 sm:pt-32 pb-16 bg-mesh min-h-screen relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#71C648] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">¡Tu presupuesto está listo!</h1>
          <p className="text-gray-300">Revisa el detalle y descárgalo o imprímelo</p>
        </div>

        {/* Presupuesto Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#194973] to-[#0f3150] p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">{tipoProyectoData?.title}</h2>
                <p className="text-gray-300 text-sm">{tipoProyectoData?.description}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-sm text-gray-300">Desde</span>
                <div className="text-xl sm:text-2xl font-bold">
                  {presupuesto.precioBase > 0 ? formatearPrecio(presupuesto.precioBase) : "A consultar"}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {funcionalidadesSeleccionadas.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#71C648] uppercase tracking-wide mb-3">Funcionalidades</h3>
                <div className="space-y-2">
                  {funcionalidadesSeleccionadas.map((func) => (
                    <div key={func?.id} className="flex justify-between text-sm">
                      <span className="text-[#5A6D6D]">{func?.label}</span>
                      <span className={func?.precio ? "font-medium text-[#194973]" : "text-[#71C648]"}>
                        {func?.precio ? `+${formatearPrecio(func.precio)}` : "Incluido"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {integracionesSeleccionadas.length > 0 && !integracionesSeleccionadas.every((i) => i?.id === "ninguna") && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#71C648] uppercase tracking-wide mb-3">Integraciones</h3>
                <div className="space-y-2">
                  {integracionesSeleccionadas
                    .filter((i) => i?.id !== "ninguna")
                    .map((integ) => (
                      <div key={integ?.id} className="flex justify-between text-sm">
                        <span className="text-[#5A6D6D]">{integ?.label}</span>
                        <span className={integ?.precio ? "font-medium text-[#194973]" : "text-[#71C648]"}>
                          {integ?.precio ? `+${formatearPrecio(integ.precio)}` : "Incluido"}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {(presupuesto.multiplicador > 1 || presupuesto.precioApp > 0) && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#71C648] uppercase tracking-wide mb-3">Ajustes</h3>
                <div className="space-y-2">
                  {presupuesto.multiplicador > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5A6D6D]">
                        Escala ({formData.numeroUsuarios}) x{presupuesto.multiplicador}
                      </span>
                      <span className="font-medium text-[#194973]">
                        +{formatearPrecio(presupuesto.subtotal * (presupuesto.multiplicador - 1))}
                      </span>
                    </div>
                  )}
                  {presupuesto.precioApp > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#5A6D6D]">App móvil iOS + Android</span>
                      <span className="font-medium text-[#194973]">+{formatearPrecio(presupuesto.precioApp)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {(formData.otraFuncionalidad || formData.otraIntegracion) && (
              <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <h3 className="text-sm font-semibold text-amber-700 mb-2">Notas adicionales</h3>
                {formData.otraFuncionalidad && (
                  <p className="text-sm text-amber-600 mb-1">
                    <strong>Funcionalidad:</strong> {formData.otraFuncionalidad}
                  </p>
                )}
                {formData.otraIntegracion && (
                  <p className="text-sm text-amber-600">
                    <strong>Integración:</strong> {formData.otraIntegracion}
                  </p>
                )}
                <p className="text-xs text-amber-500 mt-2">* Estos elementos se valorarán personalmente</p>
              </div>
            )}

            <div className="border-t-2 border-[#194973] pt-4 mt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <div>
                  <span className="block text-xs text-[#71C648] font-semibold uppercase tracking-wider">Tu proyecto desde</span>
                  <span className="text-base sm:text-lg font-bold text-[#194973]">Precio orientativo</span>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-[#194973]">
                  {formData.tipoProyecto === "otro" ? "A consultar" : `Desde ${formatearPrecio(presupuesto.total)}`}
                </span>
              </div>
              <p className="text-xs text-[#5A6D6D] mt-3 leading-relaxed">
                Trabajamos a medida: el precio final se afina en una llamada gratuita de 20 min donde entendemos tu caso y ajustamos alcance. IVA no incluido · Válido 30 días.
              </p>
            </div>
          </div>

          <div className="bg-[#fafaf9] p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={descargarPresupuesto}
                className="flex-1 flex items-center justify-center gap-2 bg-[#194973] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0f3150] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Descargar
              </button>
              <button
                onClick={imprimirPresupuesto}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#194973] text-[#194973] px-6 py-3 rounded-full font-medium hover:bg-[#194973] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
                Imprimir
              </button>
            </div>
          </div>
        </div>

        {/* Solicitar llamada */}
        <div className="mt-8 bg-white rounded-3xl shadow-soft-xl overflow-hidden">
          <div className="bg-[#71C648] p-6 sm:p-8 text-white">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1">¿Prefieres que lo concretemos hablando?</h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Un presupuesto online nunca sustituye una conversación. Te llamamos en 24h para afinar cada detalle sin compromiso.
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            {llamadaStatus === "sent" ? (
              <div className="flex items-center gap-3 text-[#194973]">
                <div className="w-10 h-10 rounded-full bg-[#71C648] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">¡Recibido! Te llamaremos en menos de 24h.</div>
                  <div className="text-sm text-[#57534e]">Hemos guardado tu presupuesto y tus datos.</div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={onSolicitarLlamada}
                  disabled={llamadaStatus === "sending"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#194973] hover:bg-[#0f3150] disabled:opacity-60 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-soft hover:shadow-soft-lg"
                >
                  {llamadaStatus === "sending" ? "Enviando..." : "Quiero que me llames"}
                  {llamadaStatus !== "sending" && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </button>
                {llamadaStatus === "error" && (
                  <p role="alert" className="mt-3 text-sm text-red-600">
                    No se pudo enviar. Inténtalo de nuevo o escríbenos a codeconnectsl@gmail.com.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button href="/" variant="outline-light">
            Volver al inicio
          </Button>
          <Button href="/portfolio" variant="outline-light">
            Ver proyectos similares
          </Button>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Hemos recibido tu solicitud. Te escribiremos en menos de 24h.
        </p>
      </div>
    </section>
  );
}
