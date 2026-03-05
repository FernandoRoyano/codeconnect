"use client";

import { SEGMENTS, type ProspectFormState } from "@/lib/constants/prospect";
import WebsiteQualityStars from "./WebsiteQualityStars";

interface Props {
  form: ProspectFormState;
  setForm: React.Dispatch<React.SetStateAction<ProspectFormState>>;
  onSubmit: () => void;
  submitLabel?: string;
  saving?: boolean;
}

const inputClass =
  "w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-[#194973] outline-none transition-colors focus:border-[#71C648] bg-white";
const labelClass = "block text-xs font-bold text-[#5A6D6D] uppercase tracking-wider mb-1.5";

export default function ProspectForm({ form, setForm, onSubmit, submitLabel = "Guardar", saving }: Props) {
  const update = (field: keyof ProspectFormState, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* 1. Datos de contacto */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#194973] text-white flex items-center justify-center text-xs font-bold">1</div>
          <h3 className="text-sm font-bold text-[#194973]">Datos de contacto</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className={inputClass}
              placeholder="Nombre de la persona"
            />
          </div>
          <div>
            <label className={labelClass}>Cargo / Posicion</label>
            <input
              type="text"
              value={form.position}
              onChange={(e) => update("position", e.target.value)}
              className={inputClass}
              placeholder="CEO, Director de marketing..."
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              placeholder="email@ejemplo.com"
            />
          </div>
          <div>
            <label className={labelClass}>Telefono</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              placeholder="+34 600 000 000"
            />
          </div>
        </div>
      </div>

      {/* 2. Empresa */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#194973] text-white flex items-center justify-center text-xs font-bold">2</div>
          <h3 className="text-sm font-bold text-[#194973]">Empresa</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Empresa</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              className={inputClass}
              placeholder="Nombre de la empresa"
            />
          </div>
          <div>
            <label className={labelClass}>Segmento</label>
            <select
              value={form.segment}
              onChange={(e) => update("segment", e.target.value)}
              className={inputClass}
            >
              <option value="">Seleccionar segmento</option>
              {SEGMENTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Ciudad</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className={inputClass}
              placeholder="Madrid, Barcelona..."
            />
          </div>
          <div>
            <label className={labelClass}>Pais</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={inputClass}
              placeholder="Espana"
            />
          </div>
        </div>
      </div>

      {/* 3. Analisis web */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#194973] text-white flex items-center justify-center text-xs font-bold">3</div>
          <h3 className="text-sm font-bold text-[#194973]">Analisis web</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Sitio web</label>
            <input
              type="url"
              value={form.websiteUrl}
              onChange={(e) => update("websiteUrl", e.target.value)}
              className={inputClass}
              placeholder="https://ejemplo.com"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Calidad de la web</label>
              <WebsiteQualityStars
                value={form.websiteQuality}
                onChange={(val) => update("websiteQuality", val)}
              />
            </div>
            <div>
              <label className={labelClass}>Reserva online</label>
              <button
                type="button"
                onClick={() => update("hasOnlineBooking", !form.hasOnlineBooking)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors ${
                  form.hasOnlineBooking
                    ? "border-[#71C648] bg-green-50 text-[#194973]"
                    : "border-gray-200 bg-white text-[#5A6D6D]"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  form.hasOnlineBooking ? "border-[#71C648] bg-[#71C648]" : "border-gray-300"
                }`}>
                  {form.hasOnlineBooking && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {form.hasOnlineBooking ? "Si" : "No"}
              </button>
            </div>
            <div>
              <label className={labelClass}>Tiene App</label>
              <button
                type="button"
                onClick={() => update("hasApp", !form.hasApp)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-colors ${
                  form.hasApp
                    ? "border-[#71C648] bg-green-50 text-[#194973]"
                    : "border-gray-200 bg-white text-[#5A6D6D]"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  form.hasApp ? "border-[#71C648] bg-[#71C648]" : "border-gray-300"
                }`}>
                  {form.hasApp && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {form.hasApp ? "Si" : "No"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Cualificacion */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-full bg-[#194973] text-white flex items-center justify-center text-xs font-bold">4</div>
          <h3 className="text-sm font-bold text-[#194973]">Cualificacion</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Por que es un buen prospecto</label>
            <textarea
              value={form.whyGoodProspect}
              onChange={(e) => update("whyGoodProspect", e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Necesita mejorar su web, no tiene presencia online..."
            />
          </div>
          <div>
            <label className={labelClass}>Notas de contacto</label>
            <textarea
              value={form.contactNotes}
              onChange={(e) => update("contactNotes", e.target.value)}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Notas sobre las interacciones..."
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={saving || !form.name.trim()}
          className="px-8 py-3 bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#71C648]/30 transition-all disabled:opacity-50"
        >
          {saving ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
