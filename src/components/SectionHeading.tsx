interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 lg:mb-20 reveal ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-[#9de377]" : "text-[#39751f]"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-bold tracking-tight mb-5 ${
          light ? "text-white" : "text-[#194973]"
        }`}
        style={{ fontSize: "var(--fs-4xl)", lineHeight: 1.05 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-white/70" : "text-[#57534e]"
          }`}
          style={{ fontSize: "var(--fs-lg)", lineHeight: 1.55 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
