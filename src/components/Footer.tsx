"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");

  const footerNavigation = {
    servicios: [
      { name: t("webDev"), href: "/servicios#web" as const },
      { name: t("management"), href: "/servicios#crm" as const },
      { name: t("billing"), href: "/servicios#facturacion" as const },
    ],
    empresa: [
      { name: t("aboutUs"), href: "/#nosotros" as const },
      { name: t("portfolio"), href: "/portfolio" as const },
      { name: t("contact"), href: "/contacto" as const },
    ],
    legal: [
      { name: t("privacy"), href: "/politica-privacidad" as const },
      { name: t("legal"), href: "/aviso-legal" as const },
      { name: t("cookies"), href: "/cookies" as const },
    ],
  };

  return (
    <footer className="relative bg-mesh text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* CTA strip */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2
                className="font-bold text-white tracking-tight mb-2"
                style={{ fontSize: "var(--fs-2xl)", lineHeight: 1.1 }}
              >
                {t("description")}
              </h2>
              <p className="text-white/60 text-sm">
                <a href="mailto:codeconnectsl@gmail.com" className="hover:text-[#20DCC2] transition-colors">
                  codeconnectsl@gmail.com
                </a>
                <span className="mx-2">·</span>
                <span>{t("location")}</span>
              </p>
            </div>
            <Link
              href="/diagnostico"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#71C648] hover:bg-[#5fb039] text-[#12324a] px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-soft hover:shadow-soft-lg"
            >
              {t("diagnosis")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div>
            <Logo variant="on-dark" showTagline={true} />
          </div>

          {(["servicios", "empresa"] as const).map((key) => (
            <div key={key}>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#20DCC2] mb-4">
                {key === "servicios" ? t("servicesTitle") : t("companyTitle")}
              </h3>
              <ul className="space-y-2.5">
                {footerNavigation[key].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#20DCC2] mb-4">{t("contactTitle")}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:codeconnectsl@gmail.com" className="text-white/70 hover:text-white transition-colors break-all">
                  codeconnectsl@gmail.com
                </a>
              </li>
              <li className="text-white/70">{t("location")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">&copy; {new Date().getFullYear()} {t("copyright")}</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/50 hover:text-white transition-colors text-xs"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
