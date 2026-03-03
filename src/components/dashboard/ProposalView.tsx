"use client";

import { useState } from "react";
import { PAYMENT_STRUCTURES, PROJECT_TYPES, SIZE_REVISIONS, CONDITIONS, type ProposalFormState, type PaymentStructureKey } from "@/lib/constants/proposal";
import SignaturePad from "./SignaturePad";

interface ProposalViewProps {
  form: ProposalFormState;
  onBack?: () => void;
  proposalId?: string;
  proposalDate?: string;
  readOnly?: boolean;
  alreadyAccepted?: boolean;
  existingSignature?: string | null;
  acceptedDate?: string | null;
  onSign?: (signatureData: string) => void;
}

export default function ProposalView({
  form,
  onBack,
  proposalId,
  proposalDate,
  readOnly = false,
  alreadyAccepted = false,
  existingSignature = null,
  acceptedDate: existingAcceptedDate = null,
  onSign,
}: ProposalViewProps) {
  const [signature, setSignature] = useState<string | null>(existingSignature);
  const [accepted, setAccepted] = useState(alreadyAccepted);
  const [acceptedDate, setAcceptedDate] = useState<string | null>(existingAcceptedDate);
  const [termsChecked, setTermsChecked] = useState(alreadyAccepted);

  const revisions = SIZE_REVISIONS[form.projectSize];
  const payment = PAYMENT_STRUCTURES[form.paymentStructure as PaymentStructureKey];
  const curr = form.currency === "EUR" ? "\u20AC" : "$";
  const total = parseFloat(form.totalPrice) || 0;
  const displayDate = proposalDate || new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  const displayId = proposalId || `CC-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const handleAccept = () => {
    if (!termsChecked || !signature) return;
    setAccepted(true);
    setAcceptedDate(new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }));
    if (onSign) onSign(signature);
  };

  const sectionTitleClass = "text-xs font-bold tracking-[0.15em] text-[#71C648] uppercase mb-4 pb-2 border-b-2 border-gray-100";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#194973] to-[#0f3150] rounded-t-2xl px-5 sm:px-9 pt-8 sm:pt-10 pb-6 sm:pb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-[radial-gradient(circle,rgba(113,198,72,0.15)_0%,transparent_70%)] rounded-bl-full" />
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start relative gap-3">
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 rounded-full bg-[#71C648]" />
              <div className="w-6 h-6 rounded-full bg-white/30 -ml-3" />
              <span className="text-lg sm:text-xl font-extrabold ml-1">{form.businessName || "CodeConnect"}</span>
            </div>
            <div className="text-xs text-[#71C648] font-semibold tracking-[0.1em] uppercase">Propuesta de servicios</div>
          </div>
          <div className="sm:text-right text-sm text-white/50">
            <div className="font-bold text-[#71C648] text-sm mb-1">{displayId}</div>
            <div>{displayDate}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white px-5 sm:px-9 py-6 sm:py-8 rounded-b-2xl border border-gray-200 border-t-0 flex flex-col gap-6 sm:gap-8">

        {/* Info cliente */}
        <div className="bg-[#f8f9fa] rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-[#5A6D6D] uppercase tracking-[0.1em]">Preparado para</div>
            <div className="text-lg font-bold text-[#194973] mt-1">{form.clientName || "Nombre del cliente"}</div>
            {form.clientCompany && <div className="text-sm text-[#5A6D6D]">{form.clientCompany}</div>}
            {form.clientEmail && <div className="text-sm text-[#71C648]">{form.clientEmail}</div>}
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-[#5A6D6D] uppercase tracking-[0.1em]">Tipo</div>
            <div className="text-sm font-semibold text-[#194973] mt-1">
              {PROJECT_TYPES.find((t) => t.value === form.projectType)?.label}
            </div>
          </div>
        </div>

        {/* Descripcion */}
        <div>
          <div className={sectionTitleClass}>Descripcion del proyecto</div>
          <h2 className="text-xl font-extrabold text-[#194973] mb-3">{form.projectName || "Nombre del proyecto"}</h2>
          <p className="text-[#5A6D6D] leading-relaxed text-[15px]">{form.projectDescription || "Descripcion del proyecto..."}</p>
        </div>

        {/* Entregables */}
        <div>
          <div className={sectionTitleClass}>Alcance y entregables</div>
          <p className="text-[#5A6D6D] text-sm mb-4">El proyecto incluye exclusivamente los siguientes entregables. Cualquier elemento no listado aqui se considerara fuera del alcance.</p>
          <div className="flex flex-col gap-2">
            {form.deliverables.filter(Boolean).map((d, i) => (
              <div key={i} className="flex gap-3 items-center p-4 bg-[#f8f9fa] rounded-xl border-l-[3px] border-[#71C648]">
                <span className="text-[#71C648] font-extrabold text-sm min-w-[24px]">#{i + 1}</span>
                <span className="text-[#194973] font-medium text-[15px]">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <div>
          <div className={sectionTitleClass}>Proceso de trabajo</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { step: "1", title: "Propuesta de diseno", desc: "Te presento una propuesta visual que podras modificar hasta que estes 100% satisfecho." },
              { step: "2", title: "Desarrollo", desc: `Una vez aprobado el diseno, paso a desarrollo con ${revisions} rondas de revision incluidas.` },
              { step: "3", title: "Entrega final", desc: "Tras las revisiones, entrega del proyecto completo y cierre." },
            ].map((s) => (
              <div key={s.step} className="bg-[#f8f9fa] rounded-2xl p-5 text-center">
                <div className="w-9 h-9 rounded-full bg-[#194973] text-[#71C648] inline-flex items-center justify-center font-extrabold text-base mb-3">
                  {s.step}
                </div>
                <div className="font-bold text-[#194973] text-sm mb-2">{s.title}</div>
                <div className="text-[#5A6D6D] text-[13px] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revisiones */}
        <div className="bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-2xl p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <div className="font-extrabold text-[#194973] text-base sm:text-lg">Rondas de revision incluidas</div>
              <div className="text-[#5A6D6D] text-sm mt-1">
                Revisiones adicionales: {form.extraRevisionPrice ? `${curr}${form.extraRevisionPrice}/revision` : "a consultar"}
              </div>
            </div>
            <div className="text-5xl font-black text-[#71C648]">{revisions}</div>
          </div>
          <div className="mt-4 p-4 bg-[#71C648]/5 rounded-xl text-[13px] text-[#5A6D6D] leading-relaxed">
            <strong>Importante:</strong> Las revisiones cubren ajustes sobre lo desarrollado (textos, colores, imagenes, espaciados). Los cambios estructurales, nuevas funcionalidades o redisenos completos no se consideran revisiones y se presupuestan aparte.
          </div>
        </div>

        {/* Inversion */}
        <div>
          <div className={sectionTitleClass}>Inversion</div>
          <div className="text-center py-4 sm:py-6">
            <div className="text-xs text-[#5A6D6D] font-semibold uppercase tracking-[0.1em]">Precio total</div>
            <div className="text-3xl sm:text-5xl font-black text-[#194973] mt-1">{curr}{total.toLocaleString("es-ES")}</div>
            <div className="text-sm text-[#5A6D6D] mt-1">IVA no incluido</div>
          </div>
          {payment && (
            <div className={`grid grid-cols-1 gap-3 mt-4 ${payment.splits.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
              {payment.splits.map((s, i) => (
                <div key={i} className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center ${
                  i === 0 ? "bg-[#194973] text-white" : "bg-[#f8f9fa] text-[#194973]"
                }`}>
                  <div className={`text-xs font-bold uppercase tracking-[0.1em] mb-1 sm:mb-2 ${
                    i === 0 ? "text-[#71C648]" : "text-[#5A6D6D]"
                  }`}>{s.label}</div>
                  <div className="text-xl sm:text-2xl font-black">{curr}{((total * s.pct) / 100).toLocaleString("es-ES")}</div>
                  <div className={`text-xs mt-1 ${i === 0 ? "text-white/50" : "text-[#5A6D6D]"}`}>{s.pct}% del total</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plazos */}
        {(form.estimatedDays || form.startDate) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {form.startDate && (
              <div className="flex-1 bg-[#f8f9fa] rounded-2xl p-5">
                <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-[0.1em]">Inicio estimado</div>
                <div className="text-base font-bold text-[#194973] mt-2">
                  {new Date(form.startDate).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            )}
            {form.estimatedDays && (
              <div className="flex-1 bg-[#f8f9fa] rounded-2xl p-5">
                <div className="text-xs font-bold text-[#5A6D6D] uppercase tracking-[0.1em]">Plazo estimado</div>
                <div className="text-base font-bold text-[#194973] mt-2">{form.estimatedDays} dias laborables</div>
              </div>
            )}
          </div>
        )}

        {/* Notas */}
        {form.notes && (
          <div>
            <div className={sectionTitleClass}>Notas</div>
            <p className="text-[#5A6D6D] text-[15px] leading-relaxed">{form.notes}</p>
          </div>
        )}

        {/* Condiciones */}
        <div>
          <div className={sectionTitleClass}>Terminos y condiciones</div>
          <div className="flex flex-col gap-3">
            {CONDITIONS.map((c, i) => (
              <div key={i} className="flex gap-3 text-sm text-[#5A6D6D] leading-relaxed">
                <span className="text-[#71C648] font-extrabold text-xs min-w-[22px] mt-0.5">{i + 1}.</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Firma */}
        {!readOnly && (
          <>
            {!accepted ? (
              <div className="bg-[#f8f9fa] rounded-2xl p-5 sm:p-7 border-2 border-gray-200">
                <div className="text-lg font-extrabold text-[#194973] mb-4">Aceptacion del presupuesto</div>
                <label className="flex gap-3 items-start cursor-pointer mb-5">
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#71C648]"
                  />
                  <span className="text-sm text-[#5A6D6D] leading-relaxed">
                    He leido y acepto los terminos y condiciones descritos en este presupuesto. Entiendo que los cambios fuera del alcance definido se presupuestaran por separado.
                  </span>
                </label>
                <div className="text-sm font-semibold text-[#5A6D6D] mb-3">Firma del cliente:</div>
                <SignaturePad onSave={setSignature} saved={!!signature} />
                <button
                  onClick={handleAccept}
                  disabled={!termsChecked || !signature}
                  className={`w-full mt-5 py-4 rounded-xl font-bold text-base transition-all ${
                    termsChecked && signature
                      ? "bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white hover:shadow-lg hover:shadow-[#71C648]/30 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Aceptar y firmar presupuesto
                </button>
              </div>
            ) : (
              <div className="bg-green-50 rounded-2xl p-7 border-2 border-[#71C648] text-center">
                <div className="text-5xl mb-2">&#10003;</div>
                <div className="text-xl font-extrabold text-[#194973]">Presupuesto aceptado</div>
                <div className="text-[#5A6D6D] text-sm mt-2">
                  Firmado por {form.clientName} el {acceptedDate}
                </div>
                {signature && (
                  <img src={signature} alt="Firma" className="max-w-[200px] mx-auto mt-4 border border-gray-200 rounded-lg" />
                )}
              </div>
            )}
          </>
        )}

        {/* Firma read-only (para dashboard) */}
        {readOnly && existingSignature && (
          <div className="bg-green-50 rounded-2xl p-7 border-2 border-[#71C648] text-center">
            <div className="text-5xl mb-2">&#10003;</div>
            <div className="text-xl font-extrabold text-[#194973]">Presupuesto aceptado</div>
            {existingAcceptedDate && (
              <div className="text-[#5A6D6D] text-sm mt-2">Firmado el {existingAcceptedDate}</div>
            )}
            <img src={existingSignature} alt="Firma" className="max-w-[200px] mx-auto mt-4 border border-gray-200 rounded-lg" />
          </div>
        )}

        {/* Boton volver */}
        {onBack && (
          <button onClick={onBack} className="w-full py-3 bg-gray-100 text-[#5A6D6D] rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors">
            &larr; Volver al editor
          </button>
        )}
      </div>
    </div>
  );
}
