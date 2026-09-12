"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: "default" | "white" | "on-dark" | "icon";
}

function Mark({ monochrome = false }: { monochrome?: boolean }) {
  const gradientId = `cc-logo-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 256 160" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {!monochrome && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#20DCC2" />
            <stop offset="1" stopColor="#47BFC0" />
          </linearGradient>
        </defs>
      )}
      <g
        fill="none"
        stroke={monochrome ? "currentColor" : `url(#${gradientId})`}
        strokeWidth="27"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M109 45 84 20C68 4 42 4 26 20S10 62 26 78l31 31c16 16 42 16 58 0l33-33" />
        <path d="m147 115 25 25c16 16 42 16 58 0s16-42 0-58l-31-31c-16-16-42-16-58 0l-33 33" />
      </g>
    </svg>
  );
}

export default function Logo({ className = "", showTagline = true, variant = "default" }: LogoProps) {
  const t = useTranslations("logo");
  const onDark = variant === "white" || variant === "on-dark";
  const textColor = onDark ? "text-[#F7F8F7]" : "text-[#0B0F10]";
  const mutedColor = onDark ? "text-[#F7F8F7]/80" : "text-[#0B0F10]/75";

  if (variant === "icon") {
    return <span className={`inline-flex text-[#0B0F10] ${className}`} role="img" aria-label="CodeConnect"><Mark /></span>;
  }

  return (
    <div className={`inline-flex flex-col ${className}`} role="img" aria-label="CodeConnect">
      <div className={`flex items-center gap-2.5 ${textColor}`} aria-hidden="true">
        <span className="h-8 md:h-9"><Mark monochrome={variant === "white"} /></span>
        <span className="text-[1.45rem] font-bold tracking-[-0.035em] md:text-[1.7rem]">CodeConnect</span>
      </div>
      {showTagline && <span className={`mt-1 pl-[3.45rem] text-xs tracking-[0.01em] ${mutedColor}`}>{t("tagline")}</span>}
    </div>
  );
}
