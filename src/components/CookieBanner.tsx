"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Consent = { necessary: true; analytics: boolean; marketing: boolean; timestamp: string };

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const persist = (c: Omit<Consent, "timestamp">) => {
    localStorage.setItem("cookie_consent", JSON.stringify({ ...c, timestamp: new Date().toISOString() }));
    setShowBanner(false);
    setShowConfig(false);
  };

  const acceptAll = () => persist({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => persist({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => persist({ ...preferences, necessary: true });

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label={t("title")}
      className="fixed bottom-0 inset-x-0 z-[999] p-4 sm:p-6 pointer-events-none"
    >
      <div className="max-w-xl mx-auto animate-banner-rise pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-soft-xl border border-[#e7e5e4] overflow-hidden">
          {!showConfig ? (
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-10 h-10 bg-[#71C648]/10 rounded-full items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c.47 0 .93.04 1.38.11a3.751 3.751 0 004.57 4.57c.07.45.11.91.11 1.32z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75h.008v.008H9V9.75zM15 15h.008v.008H15V15zM10.5 14.25h.008v.008H10.5v-.008z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#194973] tracking-tight mb-1">{t("title")}</h3>
                  <p className="text-sm text-[#57534e] leading-relaxed mb-4">
                    {t("description")}{" "}
                    <Link href="/cookies" className="text-[#71C648] font-medium hover:underline">
                      {t("moreInfo")}
                    </Link>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={acceptAll}
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#71C648] text-white text-sm font-semibold rounded-full hover:bg-[#5fb039] transition-all shadow-soft hover:shadow-soft-lg"
                    >
                      {t("acceptAll")}
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-5 py-2 text-sm font-medium text-[#57534e] hover:text-[#194973] transition-colors"
                    >
                      {t("reject")}
                    </button>
                    <button
                      onClick={() => setShowConfig(true)}
                      className="px-5 py-2 text-sm font-medium text-[#57534e] hover:text-[#194973] transition-colors"
                    >
                      {t("configure")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-[#194973] tracking-tight">{t("configTitle")}</h3>
                <button
                  onClick={() => setShowConfig(false)}
                  aria-label="Cerrar"
                  className="w-8 h-8 rounded-full text-[#57534e] hover:text-[#194973] hover:bg-[#fafaf9] transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 mb-5">
                <ConsentRow
                  title={t("necessaryTitle")}
                  description={t("necessaryDesc")}
                  checked
                  disabled
                />
                <ConsentRow
                  title={t("analyticsTitle")}
                  description={t("analyticsDesc")}
                  checked={preferences.analytics}
                  onToggle={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                />
                <ConsentRow
                  title={t("marketingTitle")}
                  description={t("marketingDesc")}
                  checked={preferences.marketing}
                  onToggle={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={savePreferences}
                  className="flex-1 px-5 py-2.5 bg-white border border-[#e7e5e4] text-[#194973] text-sm font-semibold rounded-full hover:border-[#71C648]/40 hover:bg-[#fafaf9] transition-all"
                >
                  {t("savePreferences")}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-5 py-2.5 bg-[#71C648] text-white text-sm font-semibold rounded-full hover:bg-[#5fb039] transition-all shadow-soft"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onToggle,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#fafaf9]">
      <div className="min-w-0">
        <h4 className="font-semibold text-[#194973] text-sm tracking-tight">{title}</h4>
        <p className="text-xs text-[#57534e] leading-snug mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onToggle}
        className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-300 ${
          checked ? "bg-[#71C648]" : "bg-[#e7e5e4]"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
