"use client";

import { useState, useRef, useCallback } from "react";

// ============ CONSTANTES ============

const PAYMENT_STRUCTURES = {
  two: { label: "2 pagos", splits: [{ label: "Inicio", pct: 50 }, { label: "Entrega", pct: 50 }] },
  three_balanced: { label: "3 pagos (40/30/30)", splits: [{ label: "Inicio", pct: 40 }, { label: "Intermedio", pct: 30 }, { label: "Entrega", pct: 30 }] },
  three_back: { label: "3 pagos (30/30/40)", splits: [{ label: "Inicio", pct: 30 }, { label: "Intermedio", pct: 30 }, { label: "Entrega", pct: 40 }] },
};

const PROJECT_TYPES = [
  { value: "web", label: "Pagina web / Landing page" },
  { value: "crm", label: "CRM / Sistema de gestion" },
  { value: "app", label: "App movil" },
  { value: "software", label: "Software a medida" },
  { value: "automation", label: "Automatizacion / Integracion" },
  { value: "custom", label: "Proyecto personalizado" },
];

const SIZE_REVISIONS: Record<string, number> = { small: 2, medium: 3, large: 4 };

const CONDITIONS = [
  "El proyecto comenzara una vez recibido el pago inicial acordado.",
  "La propuesta de diseno sera presentada antes del desarrollo. El cliente podra solicitar modificaciones sobre esta propuesta hasta dar su aprobacion por escrito (email, mensaje o firma).",
  "Una vez aprobada la propuesta de diseno y comenzado el desarrollo, las modificaciones se limitaran al numero de rondas de revision indicadas en este presupuesto.",
  "Cada ronda de revision incluye ajustes menores sobre lo ya desarrollado (textos, colores, espaciados, imagenes). NO incluye cambios estructurales, nuevas funcionalidades ni redisenos de secciones completas.",
  "Cualquier cambio que exceda el alcance definido en este documento sera presupuestado por separado y requerira aprobacion antes de su ejecucion.",
  "Los cambios estructurales o nuevas funcionalidades solicitadas durante el desarrollo se consideraran ampliaciones del proyecto y se cotizaran aparte.",
  "Los plazos de entrega indicados estan sujetos a la disponibilidad de materiales (textos, imagenes, accesos) por parte del cliente. Retrasos en la entrega de materiales pueden afectar la fecha de entrega final.",
  "El proyecto se considerara entregado y finalizado una vez agotadas las rondas de revision o tras 15 dias sin respuesta del cliente despues de la ultima entrega.",
  "Los pagos realizados no son reembolsables. En caso de cancelacion, se facturara el trabajo realizado hasta la fecha.",
  "El desarrollador se reserva el derecho de incluir el proyecto en su portafolio, salvo acuerdo explicito de confidencialidad.",
];

interface FormState {
  businessName: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  projectType: string;
  projectName: string;
  projectDescription: string;
  deliverables: string[];
  projectSize: string;
  totalPrice: string;
  currency: string;
  paymentStructure: string;
  estimatedDays: string;
  startDate: string;
  extraRevisionPrice: string;
  notes: string;
}

const initialFormState: FormState = {
  businessName: "CodeConnect",
  clientName: "",
  clientEmail: "",
  clientCompany: "",
  projectType: "web",
  projectName: "",
  projectDescription: "",
  deliverables: [""],
  projectSize: "medium",
  totalPrice: "",
  currency: "EUR",
  paymentStructure: "two",
  estimatedDays: "",
  startDate: "",
  extraRevisionPrice: "",
  notes: "",
};

// ============ SIGNATURE PAD ============

function SignaturePad({ onSave, saved }: { onSave: (data: string) => void; saved: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const event = "touches" in e ? e.touches[0] : e;
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, []);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#194973";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const endDraw = () => setDrawing(false);

  const clear = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    setHasDrawn(false);
  };

  const save = () => {
    if (!hasDrawn) return;
    onSave(canvasRef.current!.toDataURL());
  };

  return (
    <div className="flex flex-col gap-3">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        className={`w-full max-w-[400px] rounded-xl touch-none ${
          saved
            ? "border-2 border-[#71C648] bg-green-50"
            : "border-2 border-dashed border-gray-300 bg-[#f8f9fa] cursor-crosshair"
        }`}
      />
      {!saved && (
        <div className="flex gap-2">
          <button onClick={clear} className="px-4 py-2.5 bg-gray-100 text-[#5A6D6D] rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
            Borrar
          </button>
          <button
            onClick={save}
            disabled={!hasDrawn}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              hasDrawn ? "bg-[#194973] text-white hover:bg-[#0f3150]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirmar firma
          </button>
        </div>
      )}
      {saved && <span className="text-[#71C648] font-semibold text-sm">Firma guardada</span>}
    </div>
  );
}

// ============ FORMULARIO (EDITOR) ============

function ProposalForm({ form, setForm, onGenerate }: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onGenerate: () => void;
}) {
  const update = (key: keyof FormState, val: string | string[]) => setForm((p) => ({ ...p, [key]: val }));
  const updateDeliverable = (i: number, val: string) => {
    const d = [...form.deliverables];
    d[i] = val;
    setForm((p) => ({ ...p, deliverables: d }));
  };
  const addDeliverable = () => setForm((p) => ({ ...p, deliverables: [...p.deliverables, ""] }));
  const removeDeliverable = (i: number) => setForm((p) => ({ ...p, deliverables: p.deliverables.filter((_, idx) => idx !== i) }));

  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-[#f8f9fa] text-[#194973] outline-none transition-colors focus:border-[#71C648] font-[inherit]";
  const labelClass = "text-xs font-bold text-[#5A6D6D] uppercase tracking-wider mb-1 block";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="text-center mb-2">
        <div className="text-xs font-bold tracking-[0.2em] text-[#71C648] uppercase mb-2">Panel de presupuestos</div>
        <h1 className="text-3xl font-extrabold text-[#194973] leading-tight">Crear nueva propuesta</h1>
        <p className="text-[#5A6D6D] text-sm mt-2">Completa los datos y genera el presupuesto para tu cliente</p>
      </div>

      {/* Seccion 1: Tu negocio */}
      <div className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-[#194973] flex items-center gap-2 m-0">
          <span className="bg-[#71C648] text-white w-7 h-7 rounded-lg inline-flex items-center justify-center text-sm font-extrabold">1</span>
          Tu negocio
        </h3>
        <div>
          <label className={labelClass}>Nombre de tu marca</label>
          <input className={inputClass} value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="CodeConnect" />
        </div>
      </div>

      {/* Seccion 2: Cliente */}
      <div className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-[#194973] flex items-center gap-2 m-0">
          <span className="bg-[#71C648] text-white w-7 h-7 rounded-lg inline-flex items-center justify-center text-sm font-extrabold">2</span>
          Datos del cliente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre completo</label>
            <input className={inputClass} value={form.clientName} onChange={(e) => update("clientName", e.target.value)} placeholder="Juan Garcia" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={form.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} placeholder="juan@email.com" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Empresa (opcional)</label>
          <input className={inputClass} value={form.clientCompany} onChange={(e) => update("clientCompany", e.target.value)} placeholder="Nombre de la empresa" />
        </div>
      </div>

      {/* Seccion 3: Proyecto */}
      <div className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-[#194973] flex items-center gap-2 m-0">
          <span className="bg-[#71C648] text-white w-7 h-7 rounded-lg inline-flex items-center justify-center text-sm font-extrabold">3</span>
          Detalles del proyecto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tipo de proyecto</label>
            <select className={inputClass} value={form.projectType} onChange={(e) => update("projectType", e.target.value)}>
              {PROJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Nombre del proyecto</label>
            <input className={inputClass} value={form.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="Web Corporativa para..." />
          </div>
        </div>
        <div>
          <label className={labelClass}>Descripcion del proyecto</label>
          <textarea className={`${inputClass} min-h-[100px] resize-y`} value={form.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} placeholder="Describe que necesita el cliente, el objetivo del proyecto..." />
        </div>

        {/* Entregables */}
        <div>
          <label className={`${labelClass} mb-3`}>Entregables</label>
          {form.deliverables.map((d, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input className={`${inputClass} flex-1`} value={d} onChange={(e) => updateDeliverable(i, e.target.value)} placeholder={`Entregable ${i + 1} (ej: Diseno de Home, Seccion de contacto...)`} />
              {form.deliverables.length > 1 && (
                <button onClick={() => removeDeliverable(i)} className="px-3 py-2 bg-red-50 text-red-500 rounded-lg font-bold text-lg hover:bg-red-100 transition-colors">
                  &times;
                </button>
              )}
            </div>
          ))}
          <button onClick={addDeliverable} className="px-4 py-2.5 bg-gray-100 text-[#5A6D6D] rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
            + Anadir entregable
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tamano del proyecto</label>
            <select className={inputClass} value={form.projectSize} onChange={(e) => update("projectSize", e.target.value)}>
              <option value="small">Pequeno (2 revisiones)</option>
              <option value="medium">Mediano (3 revisiones)</option>
              <option value="large">Grande (4 revisiones)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Plazo estimado (dias laborables)</label>
            <input className={inputClass} type="number" value={form.estimatedDays} onChange={(e) => update("estimatedDays", e.target.value)} placeholder="15" />
          </div>
        </div>
      </div>

      {/* Seccion 4: Economico */}
      <div className="bg-white rounded-2xl p-7 border border-gray-200 flex flex-col gap-5">
        <h3 className="text-lg font-bold text-[#194973] flex items-center gap-2 m-0">
          <span className="bg-[#71C648] text-white w-7 h-7 rounded-lg inline-flex items-center justify-center text-sm font-extrabold">4</span>
          Condiciones economicas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Precio total</label>
            <input className={inputClass} type="number" value={form.totalPrice} onChange={(e) => update("totalPrice", e.target.value)} placeholder="1500" />
          </div>
          <div>
            <label className={labelClass}>Moneda</label>
            <select className={inputClass} value={form.currency} onChange={(e) => update("currency", e.target.value)}>
              <option value="EUR">&euro; EUR</option>
              <option value="USD">$ USD</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Precio revision extra</label>
            <input className={inputClass} type="number" value={form.extraRevisionPrice} onChange={(e) => update("extraRevisionPrice", e.target.value)} placeholder="50" />
          </div>
        </div>

        {/* Estructura de pagos */}
        <div>
          <label className={labelClass}>Estructura de pagos</label>
          <div className="flex gap-2 flex-wrap mt-1">
            {Object.entries(PAYMENT_STRUCTURES).map(([key, val]) => (
              <button
                key={key}
                onClick={() => update("paymentStructure", key)}
                className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  form.paymentStructure === key
                    ? "bg-[#194973] text-white"
                    : "bg-gray-100 text-[#5A6D6D] hover:bg-gray-200"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Fecha de inicio estimada</label>
          <input className={inputClass} type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Notas adicionales (opcional)</label>
          <textarea className={`${inputClass} min-h-[60px] resize-y`} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Cualquier aclaracion extra..." />
        </div>
      </div>

      {/* Boton generar */}
      <button
        onClick={onGenerate}
        className="w-full py-4 bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-[#71C648]/30 transition-all"
      >
        Generar presupuesto &rarr;
      </button>
    </div>
  );
}

// ============ VISTA CLIENTE ============

function ProposalView({ form, onBack }: { form: FormState; onBack: () => void }) {
  const [signature, setSignature] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [acceptedDate, setAcceptedDate] = useState<string | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);

  const revisions = SIZE_REVISIONS[form.projectSize];
  const payment = PAYMENT_STRUCTURES[form.paymentStructure as keyof typeof PAYMENT_STRUCTURES];
  const curr = form.currency === "EUR" ? "\u20AC" : "$";
  const total = parseFloat(form.totalPrice) || 0;
  const proposalDate = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  const proposalId = `CC-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const handleAccept = () => {
    if (!termsChecked || !signature) return;
    setAccepted(true);
    setAcceptedDate(new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }));
  };

  const sectionTitleClass = "text-xs font-bold tracking-[0.15em] text-[#71C648] uppercase mb-4 pb-2 border-b-2 border-gray-100";

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#194973] to-[#0f3150] rounded-t-2xl px-9 pt-10 pb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(113,198,72,0.15)_0%,transparent_70%)] rounded-bl-full" />
        <div className="flex justify-between items-start relative">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#71C648]" />
              <div className="w-6 h-6 rounded-full bg-white/30 -ml-3" />
              <span className="text-xl font-extrabold ml-1">{form.businessName || "CodeConnect"}</span>
            </div>
            <div className="text-xs text-[#71C648] font-semibold tracking-[0.1em] uppercase">Propuesta de servicios</div>
          </div>
          <div className="text-right text-sm text-white/50">
            <div className="font-bold text-[#71C648] text-sm mb-1">{proposalId}</div>
            <div>{proposalDate}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white px-9 py-8 rounded-b-2xl border border-gray-200 border-t-0 flex flex-col gap-8">

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
        <div className="bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <div className="font-extrabold text-[#194973] text-lg">Rondas de revision incluidas</div>
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
          <div className="text-center py-6">
            <div className="text-xs text-[#5A6D6D] font-semibold uppercase tracking-[0.1em]">Precio total</div>
            <div className="text-5xl font-black text-[#194973] mt-1">{curr}{total.toLocaleString("es-ES")}</div>
            <div className="text-sm text-[#5A6D6D] mt-1">IVA no incluido</div>
          </div>
          <div className={`grid gap-3 mt-4`} style={{ gridTemplateColumns: `repeat(${payment.splits.length}, 1fr)` }}>
            {payment.splits.map((s, i) => (
              <div key={i} className={`rounded-2xl p-5 text-center ${
                i === 0 ? "bg-[#194973] text-white" : "bg-[#f8f9fa] text-[#194973]"
              }`}>
                <div className={`text-xs font-bold uppercase tracking-[0.1em] mb-2 ${
                  i === 0 ? "text-[#71C648]" : "text-[#5A6D6D]"
                }`}>{s.label}</div>
                <div className="text-2xl font-black">{curr}{((total * s.pct) / 100).toLocaleString("es-ES")}</div>
                <div className={`text-xs mt-1 ${i === 0 ? "text-white/50" : "text-[#5A6D6D]"}`}>{s.pct}% del total</div>
              </div>
            ))}
          </div>
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
        {!accepted ? (
          <div className="bg-[#f8f9fa] rounded-2xl p-7 border-2 border-gray-200">
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

        {/* Boton volver */}
        <button onClick={onBack} className="w-full py-3 bg-gray-100 text-[#5A6D6D] rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors">
          &larr; Volver al editor
        </button>
      </div>
    </div>
  );
}

// ============ PAGINA PRINCIPAL ============

export default function GenerarPresupuestoPage() {
  const [view, setView] = useState<"form" | "preview">("form");
  const [form, setForm] = useState<FormState>(initialFormState);

  return (
    <section className="pt-28 pb-16 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle editor / vista cliente */}
        <div className="flex justify-center gap-1 mb-6 bg-gray-200 rounded-xl p-1">
          <button
            onClick={() => setView("form")}
            className={`flex-1 py-3 px-5 rounded-lg font-semibold text-sm transition-all ${
              view === "form"
                ? "bg-white text-[#194973] shadow-sm"
                : "text-[#5A6D6D] hover:text-[#194973]"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setView("preview")}
            className={`flex-1 py-3 px-5 rounded-lg font-semibold text-sm transition-all ${
              view === "preview"
                ? "bg-white text-[#194973] shadow-sm"
                : "text-[#5A6D6D] hover:text-[#194973]"
            }`}
          >
            Vista cliente
          </button>
        </div>

        {view === "form" ? (
          <ProposalForm form={form} setForm={setForm} onGenerate={() => setView("preview")} />
        ) : (
          <ProposalView form={form} onBack={() => setView("form")} />
        )}
      </div>
    </section>
  );
}
