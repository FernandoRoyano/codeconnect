"use client";

import { useTranslations } from "next-intl";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: "default" | "white" | "icon";
}

export default function Logo({ className = "", showTagline = true, variant = "default" }: LogoProps) {
  const t = useTranslations("logo");
  const blueColor = variant === "white" ? "#ffffff" : "#194973";
  const greenColor = variant === "white" ? "#ffffff" : "#71C648";
  const grayColor = variant === "white" ? "#ffffff" : "#5A6D6D";

  if (variant === "icon") {
    return (
      <svg viewBox="0 0 80 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="5" width="60" height="30" rx="15" fill={greenColor} />
        <circle cx="45" cy="20" r="12" fill={blueColor} />
      </svg>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: blueColor, fontFamily: "Helvetica, Arial, sans-serif" }}>Code</span>
        <svg viewBox="0 0 50 30" className="h-6 md:h-7 mx-0.5" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="50" height="30" rx="15" fill={greenColor} />
          <circle cx="36" cy="15" r="11" fill={blueColor} />
        </svg>
        <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: blueColor, fontFamily: "Helvetica, Arial, sans-serif" }}>nnect</span>
      </div>
      {showTagline && (
        <span className="text-sm md:text-base tracking-wide mt-1" style={{ color: grayColor }}>{t("tagline")}</span>
      )}
    </div>
  );
}
