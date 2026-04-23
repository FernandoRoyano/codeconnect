export default function BrandVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-mesh ${className}`} aria-hidden>
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#71C648" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#71C648" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M 100 80 Q 200 150 300 90" stroke="url(#lineGrad)" strokeWidth="1" fill="none" strokeDasharray="2 4" />
        <path d="M 80 220 Q 200 150 320 220" stroke="url(#lineGrad)" strokeWidth="1" fill="none" strokeDasharray="2 4" />
        <path d="M 100 80 Q 90 150 80 220" stroke="url(#lineGrad)" strokeWidth="1" fill="none" strokeDasharray="2 4" />
        <path d="M 300 90 Q 320 150 320 220" stroke="url(#lineGrad)" strokeWidth="1" fill="none" strokeDasharray="2 4" />
      </svg>

      {/* Central hub - CC logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#71C648] to-[#5fb039] shadow-soft-xl flex items-center justify-center">
          <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight">CC</span>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-[#71C648]/30 animate-pulse-subtle" />
        </div>
      </div>

      {/* Floating nodes — positioned around the hub */}
      {[
        { label: "Web", top: "14%", left: "14%", accent: "#71C648" },
        { label: "CRM", top: "14%", right: "12%", accent: "#71C648" },
        { label: "App", bottom: "16%", left: "12%", accent: "#71C648" },
        { label: "Facturación", bottom: "16%", right: "10%", accent: "#71C648" },
      ].map((node, i) => (
        <div
          key={i}
          className="absolute bg-white/95 backdrop-blur rounded-xl shadow-soft px-3 py-2 border border-white/40"
          style={{
            top: node.top,
            bottom: node.bottom,
            left: node.left,
            right: node.right,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.accent }} />
            <span className="text-xs font-semibold text-[#194973] tracking-tight">{node.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
