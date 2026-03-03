"use client";

import { PAYMENT_STRUCTURES, PROJECT_TYPES, type ProposalFormState } from "@/lib/constants/proposal";

interface ProposalFormProps {
  form: ProposalFormState;
  setForm: React.Dispatch<React.SetStateAction<ProposalFormState>>;
  onGenerate: () => void;
  submitLabel?: string;
}

export default function ProposalForm({ form, setForm, onGenerate, submitLabel = "Generar presupuesto" }: ProposalFormProps) {
  const update = (key: keyof ProposalFormState, val: string | string[]) => setForm((p) => ({ ...p, [key]: val }));
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
      {/* Seccion 1: Tu negocio */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 flex flex-col gap-5">
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
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 flex flex-col gap-5">
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
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 flex flex-col gap-5">
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
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200 flex flex-col gap-5">
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
        {submitLabel} &rarr;
      </button>
    </div>
  );
}
