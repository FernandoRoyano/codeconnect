import type { FormData } from "../types";
import { Link } from "@/i18n/navigation";

interface Props {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  privacidad: boolean;
  onPrivacyChange: (value: boolean) => void;
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all";

export default function Step5Contacto({ formData, onChange, privacidad, onPrivacyChange }: Props) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-[#194973] tracking-tight mb-3 text-center" style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}>
        ¿Cómo te contactamos?
      </h2>
      <p className="text-[#57534e] mb-10 text-center" style={{ fontSize: "var(--fs-base)" }}>
        Te enviaremos la propuesta personalizada
      </p>
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#e7e5e4]">
        <div className="space-y-5">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-[#194973] mb-2">
              Nombre completo *
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              autoComplete="name"
              maxLength={100}
              value={formData.nombre}
              onChange={onChange}
              className={inputCls}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#194973] mb-2">
              Email profesional *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              spellCheck={false}
              value={formData.email}
              onChange={onChange}
              className={inputCls}
              placeholder="tu@empresa.com"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-[#194973] mb-2">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                autoComplete="tel"
                maxLength={40}
                value={formData.telefono}
                onChange={onChange}
                className={inputCls}
                placeholder="+34 600 000 000"
              />
            </div>
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-[#194973] mb-2">
                Empresa / Centro
              </label>
              <input
                id="empresa"
                type="text"
                name="empresa"
                autoComplete="organization"
                maxLength={120}
                value={formData.empresa}
                onChange={onChange}
                className={inputCls}
                placeholder="Nombre de tu organización"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comentarios" className="block text-sm font-medium text-[#194973] mb-2">
              ¿Algo más que quieras contarnos?
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              autoComplete="off"
              value={formData.comentarios}
              onChange={onChange}
              rows={3}
              maxLength={5000}
              className={`${inputCls} resize-none`}
              placeholder="Detalles adicionales sobre tu proyecto..."
            />
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#57534e]">
            <input type="checkbox" required checked={privacidad} onChange={(event) => onPrivacyChange(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#075f58]" />
            <span>Acepto que uséis mis datos para responder a esta solicitud. * <Link href="/politica-privacidad" className="text-[#075f58] underline">Política de privacidad</Link></span>
          </label>
        </div>
      </div>
    </div>
  );
}
