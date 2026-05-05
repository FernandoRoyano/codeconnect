import { usuariosOptions } from "../data";

interface Props {
  numeroUsuarios: string;
  necesitaApp: boolean;
  onSelectUsuarios: (value: string) => void;
  onChangeNecesitaApp: (value: boolean) => void;
}

export default function Step4Escala({ numeroUsuarios, necesitaApp, onSelectUsuarios, onChangeNecesitaApp }: Props) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-bold text-[#194973] tracking-tight mb-3 text-center" style={{ fontSize: "var(--fs-3xl)", lineHeight: 1.1 }}>
        ¿Cuántos usuarios tendrá la plataforma?
      </h2>
      <p className="text-[#57534e] mb-10 text-center" style={{ fontSize: "var(--fs-base)" }}>
        Esto nos ayuda a dimensionar la infraestructura necesaria
      </p>
      <div className="grid md:grid-cols-2 gap-3 mb-6 max-w-3xl mx-auto">
        {usuariosOptions.map((option) => {
          const selected = numeroUsuarios === option.value;
          return (
            <button
              key={option.id}
              onClick={() => onSelectUsuarios(option.value)}
              className={`p-6 rounded-2xl text-left transition-all duration-200 bg-white border ${
                selected
                  ? "border-[#71C648] bg-[#71C648]/5 ring-2 ring-[#71C648]/20"
                  : "border-[#e7e5e4] hover:border-[#71C648]/40 hover:shadow-soft"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#194973] tracking-tight">{option.label}</h3>
                  <p className="text-sm text-[#57534e]">{option.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all mt-1 ${
                    selected ? "bg-[#71C648]" : "border-2 border-[#e7e5e4]"
                  }`}
                >
                  {selected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <label className="max-w-3xl mx-auto bg-white rounded-2xl p-5 border border-[#e7e5e4] flex items-center gap-4 cursor-pointer hover:border-[#71C648]/40 transition-colors">
        <input
          type="checkbox"
          checked={necesitaApp}
          onChange={(e) => onChangeNecesitaApp(e.target.checked)}
          className="w-5 h-5 rounded text-[#71C648] focus:ring-[#71C648]"
        />
        <div>
          <span className="font-semibold text-[#194973] tracking-tight">Necesito también una app móvil</span>
          <p className="text-sm text-[#57534e]">App nativa para iOS y Android además de la web</p>
        </div>
      </label>
    </div>
  );
}
