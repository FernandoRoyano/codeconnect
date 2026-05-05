const LABELS = ["Proyecto", "Funciones", "Integraciones", "Escala", "Contacto"];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 flex-shrink-0 ${
                step < currentStep
                  ? "bg-[#71C648] text-white shadow-soft"
                  : step === currentStep
                    ? "bg-white text-[#194973] shadow-soft ring-4 ring-white/20"
                    : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {step < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < 5 && (
              <div className="flex-1 h-px mx-2 bg-white/10 relative overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-[#71C648] transition-[width] duration-500 ease-out ${
                    step < currentStep ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex justify-between mt-3 text-[11px] uppercase tracking-wider text-white/50 font-medium">
        {LABELS.map((l, i) => (
          <span key={l} className={i + 1 === currentStep ? "text-white" : ""}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
