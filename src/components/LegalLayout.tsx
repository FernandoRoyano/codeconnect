interface LegalLayoutProps {
  title: string;
  lastUpdate?: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdate = "Febrero 2026", children }: LegalLayoutProps) {
  return (
    <>
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 bg-mesh overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-[#71C648] px-4 py-1.5 rounded-full text-xs font-medium mb-6 uppercase tracking-widest">
            Legal
          </span>
          <h1
            className="font-bold text-white tracking-tight mb-4"
            style={{ fontSize: "var(--fs-4xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          <p className="text-white/60 text-sm">Última actualización: {lastUpdate}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="legal-prose text-[#57534e]">{children}</div>
        </div>
      </section>
    </>
  );
}
