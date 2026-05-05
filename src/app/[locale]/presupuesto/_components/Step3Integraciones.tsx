import { getIntegraciones } from "../calculo";
import { tiposProyecto } from "../data";

interface Props {
  tipoProyecto: string;
  integraciones: string[];
  otraIntegracion: string;
  onToggle: (id: string) => void;
  onChangeOtra: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Step3Integraciones({ tipoProyecto, integraciones, otraIntegracion, onToggle, onChangeOtra }: Props) {
  const opciones = getIntegraciones(tipoProyecto);
  const tipoTitle = tiposProyecto.find((t) => t.id === tipoProyecto)?.title.toLowerCase() ?? "";

  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-[#194973] tracking-tight mb-3 text-center" style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}>
        ¿Necesitas integraciones?
      </h2>
      <p className="text-[#57534e] mb-10 text-center" style={{ fontSize: "var(--fs-base)" }}>
        Conecta tu <span className="font-semibold text-[#71C648]">{tipoTitle}</span> con otras herramientas
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {opciones.map((integ) => {
          const selected = integraciones.includes(integ.id);
          return (
            <button
              key={integ.id}
              onClick={() => onToggle(integ.id)}
              className={`p-5 rounded-xl text-left transition-all duration-200 flex items-start gap-3 bg-white border ${
                selected
                  ? "border-[#71C648] bg-[#71C648]/5 ring-2 ring-[#71C648]/20"
                  : "border-[#e7e5e4] hover:border-[#71C648]/40 hover:shadow-soft"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all mt-0.5 ${
                  selected ? "bg-[#71C648] text-white" : "border-2 border-[#e7e5e4]"
                }`}
              >
                {selected && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-[#194973] tracking-tight">{integ.label}</h3>
                <p className="text-sm text-[#57534e] leading-relaxed">{integ.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 border border-[#e7e5e4]">
        <label className="block mb-3">
          <span className="font-semibold text-[#194973] flex items-center gap-2">
            <svg className="w-5 h-5 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            ¿Otra integración?
          </span>
          <span className="text-sm text-[#57534e] mt-1 block">
            Describe cualquier sistema o herramienta con la que necesites conectar
          </span>
        </label>
        <textarea
          name="otraIntegracion"
          value={otraIntegracion}
          onChange={onChangeOtra}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all resize-none"
          placeholder="Ej: Necesito conectar con mi software de contabilidad actual, quiero sincronizar con Notion, integración con mi CRM de HubSpot..."
        />
      </div>
    </div>
  );
}
