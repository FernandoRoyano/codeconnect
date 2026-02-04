interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? "text-center" : ""}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? "text-white" : "text-[#194973]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-3xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-gray-300" : "text-[#5A6D6D]"}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-24 bg-[#71C648] rounded-full ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
