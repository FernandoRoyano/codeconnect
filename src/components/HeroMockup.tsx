export default function HeroMockup({ className = "" }: { className?: string }) {
  const barHeights = [38, 52, 44, 68, 58, 82, 74, 92, 86, 78, 96, 88];

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white ${className}`}
      aria-hidden
    >
      {/* Window chrome */}
      <div className="h-9 bg-[#f5f5f4] border-b border-[#e7e5e4] flex items-center px-4 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
        <div className="mx-auto w-40 h-4 rounded bg-white border border-[#e7e5e4]" />
      </div>

      <div className="flex h-[calc(100%-2.25rem)]">
        {/* Sidebar */}
        <aside className="w-16 sm:w-20 bg-[#194973] flex flex-col items-center py-4 gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#71C648] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">CC</span>
          </div>
          <div className="w-full flex-1 flex flex-col items-center gap-1.5 mt-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#71C648]" />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-sm bg-white/25" />
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-5 flex flex-col gap-3 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] sm:text-xs text-[#71C648] font-semibold uppercase tracking-wider">Dashboard</div>
              <div className="text-sm sm:text-base font-bold text-[#194973]">Resumen mensual</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block w-28 h-7 rounded-lg border border-[#e7e5e4] bg-[#fafaf9]" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#71C648] to-[#194973] flex items-center justify-center text-white text-[9px] font-bold">FR</div>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Clientes", value: "248", delta: "+12%", up: true },
              { label: "Ingresos", value: "€18.4k", delta: "+24%", up: true },
              { label: "Activos", value: "92%", delta: "+3%", up: true },
            ].map((kpi, i) => (
              <div key={i} className="rounded-xl border border-[#e7e5e4] bg-white p-2 sm:p-3">
                <div className="text-[9px] sm:text-[10px] text-[#57534e] uppercase tracking-wider mb-0.5">{kpi.label}</div>
                <div className="text-sm sm:text-lg font-bold text-[#194973] leading-tight">{kpi.value}</div>
                <div className="mt-0.5 text-[9px] sm:text-[10px] text-[#71C648] font-semibold flex items-center gap-0.5">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0L14 7.06v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69L5.22 13.72a.75.75 0 000 1.06z" clipRule="evenodd" />
                  </svg>
                  {kpi.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-0 rounded-xl border border-[#e7e5e4] bg-white p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] sm:text-xs font-semibold text-[#194973]">Actividad 30 días</div>
              <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-[#57534e]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#71C648]" /> Nuevos
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#194973]" /> Activos
                </span>
              </div>
            </div>
            <div className="flex-1 flex items-end gap-1 sm:gap-1.5">
              {barHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end">
                  <div
                    className="w-full bg-[#71C648] rounded-sm"
                    style={{ height: `${h * 0.45}%` }}
                  />
                  <div
                    className="w-full bg-[#194973]/80 rounded-sm"
                    style={{ height: `${h * 0.35}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
