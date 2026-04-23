"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");

  const footerNavigation = {
    servicios: [
      { name: t("webDev"), href: "/servicios#web" as const },
      { name: t("customSoftware"), href: "/servicios#software" as const },
      { name: t("mobileApps"), href: "/servicios#apps" as const },
      { name: t("consulting"), href: "/servicios#consultoria" as const },
    ],
    empresa: [
      { name: t("aboutUs"), href: "/#nosotros" as const },
      { name: t("portfolio"), href: "/portfolio" as const },
      { name: t("blog"), href: "/blog" as const },
      { name: t("contact"), href: "/contacto" as const },
    ],
    legal: [
      { name: t("privacy"), href: "/politica-privacidad" as const },
      { name: t("legal"), href: "/aviso-legal" as const },
      { name: t("cookies"), href: "/cookies" as const },
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "X / Twitter",
      href: "https://twitter.com",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "GitHub",
      href: "https://github.com",
      path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    },
  ];

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
                <a href="mailto:codeconnectsl@gmail.com" className="hover:text-[#71C648] transition-colors">
                  codeconnectsl@gmail.com
                </a>
                <span className="mx-2">·</span>
                <span>{t("location")}</span>
              </p>
            </div>
            <Link
              href="/presupuesto"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#71C648] hover:bg-[#5fb039] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-soft hover:shadow-soft-lg"
            >
              Solicitar presupuesto
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
            <div className="flex gap-2 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#71C648] hover:border-[#71C648]/40 hover:bg-[#71C648]/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {(["servicios", "empresa"] as const).map((key) => (
            <div key={key}>
              <h3 className="text-xs uppercase tracking-widest font-semibold text-[#71C648] mb-4">
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
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#71C648] mb-4">{t("contactTitle")}</h3>
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
