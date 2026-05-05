import { tiposProyecto } from "../data";

const fmt = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

interface Props {
  tipoProyecto: string;
  onSelect: (id: string) => void;
}

export default function Step1Tipo({ tipoProyecto, onSelect }: Props) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-[#194973] tracking-tight mb-3 text-center" style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}>
        ¿Qué tipo de proyecto necesitas?
      </h2>
      <p className="text-[#57534e] mb-10 text-center" style={{ fontSize: "var(--fs-base)" }}>
        Selecciona la opción que mejor se ajuste a tu idea
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiposProyecto.map((tipo) => {
          const selected = tipoProyecto === tipo.id;
          return (
            <button
              key={tipo.id}
              onClick={() => onSelect(tipo.id)}
              className={`relative p-6 rounded-2xl text-left transition-all duration-300 group overflow-hidden bg-white border ${
                selected
                  ? "border-[#71C648] shadow-soft-lg ring-4 ring-[#71C648]/15"
                  : "border-[#e7e5e4] hover:border-[#71C648]/40 hover:shadow-soft hover:-translate-y-0.5"
              }`}
            >
              {tipo.badge && (
                <span
                  className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    tipo.badge === "Recomendado" ? "bg-[#71C648] text-white" : "bg-[#194973] text-white"
                  }`}
                >
                  {tipo.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#194973]/10 to-[#71C648]/10 text-[#194973]">
                {tipo.icon}
              </div>

              <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-[#71C648] mb-2">
                {tipo.benefit}
              </span>

              <h3 className="text-lg font-bold mb-2 text-[#194973] tracking-tight">{tipo.title}</h3>

              <p className="text-sm mb-4 leading-relaxed text-[#57534e]">{tipo.description}</p>

              <div className="flex items-baseline gap-1.5 mb-4">
                {tipo.precio > 0 ? (
                  <>
                    <span className="text-[10px] uppercase tracking-widest text-[#57534e] font-medium">Desde</span>
                    <span className="text-xl font-bold text-[#194973] tracking-tight">{fmt.format(tipo.precio)}</span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-[#71C648]">A consultar</span>
                )}
              </div>

              {tipo.complexity > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#57534e] font-medium">Alcance</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          level <= tipo.complexity ? "bg-[#71C648]" : "bg-[#e7e5e4]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`absolute top-4 left-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  selected ? "bg-[#71C648] text-white scale-100" : "bg-transparent text-transparent scale-0"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
