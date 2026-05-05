import { getFuncionalidades } from "../calculo";
import { tiposProyecto } from "../data";

interface Props {
  tipoProyecto: string;
  funcionalidades: string[];
  otraFuncionalidad: string;
  onToggle: (id: string) => void;
  onChangeOtra: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Step2Funcionalidades({ tipoProyecto, funcionalidades, otraFuncionalidad, onToggle, onChangeOtra }: Props) {
  const opciones = getFuncionalidades(tipoProyecto);
  const tipoTitle = tiposProyecto.find((t) => t.id === tipoProyecto)?.title.toLowerCase() ?? "";

  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-[#194973] tracking-tight mb-3 text-center" style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}>
        ¿Qué funcionalidades necesitas?
      </h2>
      <p className="text-[#57534e] mb-10 text-center" style={{ fontSize: "var(--fs-base)" }}>
        Selecciona las que apliquen a tu <span className="font-semibold text-[#71C648]">{tipoTitle}</span>
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {opciones.map((func) => {
          const selected = funcionalidades.includes(func.id);
          return (
            <button
              key={func.id}
              onClick={() => onToggle(func.id)}
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
                <h3 className="font-semibold text-[#194973] tracking-tight">{func.label}</h3>
                <p className="text-sm text-[#57534e] leading-relaxed">{func.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 bg-white rounded-2xl p-6 border border-[#e7e5e4]">
        <label className="block mb-3">
          <span className="font-semibold text-[#194973] flex items-center gap-2">
            <svg className="w-5 h-5 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            ¿Necesitas algo más?
          </span>
          <span className="text-sm text-[#57534e] mt-1 block">
            Describe cualquier funcionalidad adicional que no aparezca en la lista
          </span>
        </label>
        <textarea
          name="otraFuncionalidad"
          value={otraFuncionalidad}
          onChange={onChangeOtra}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#71C648]/40 focus:border-[#71C648] transition-all resize-none"
          placeholder="Ej: Quiero que los clientes puedan subir documentos, necesito un sistema de puntos de fidelidad, integración con mi software actual..."
        />
      </div>
    </div>
  );
}
