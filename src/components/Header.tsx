"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { name: t("home"), href: "/" as const },
    { name: t("services"), href: "/servicios" as const },
    { name: t("portfolio"), href: "/portfolio" as const },
    { name: t("blog"), href: "/blog" as const },
    { name: t("contact"), href: "/contacto" as const },
  ];

  const isActive = (href: string) => {
    const clean = pathname.replace(/^\/(es|en|fr)(?=\/|$)/, "") || "/";
    if (href === "/") return clean === "/";
    return clean === href || clean.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => { document.body.classList.remove("overflow-hidden"); };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#e7e5e4]/80"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex-shrink-0">
            <Logo showTagline={false} variant={scrolled ? "default" : "on-dark"} className="h-10" />
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    scrolled
                      ? active
                        ? "text-[#194973]"
                        : "text-[#57534e] hover:text-[#194973]"
                      : active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span
                      aria-hidden
                      className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-6 rounded-full ${
                        scrolled ? "bg-[#71C648]" : "bg-[#71C648]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
            <div className="mx-2 h-5 w-px bg-white/20 data-[scrolled=true]:bg-[#e7e5e4]" data-scrolled={scrolled} />
            <LanguageSwitcher scrolled={scrolled} />
            <Link
              href="/presupuesto"
              className="ml-3 inline-flex items-center gap-1.5 bg-[#71C648] hover:bg-[#5fb039] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-soft hover:shadow-soft-lg"
            >
              {t("budget")}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher scrolled={scrolled} />
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#194973] hover:bg-[#f5f5f4]" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{t("openMenu")}</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-[calc(100vh-5rem)] pb-4" : "max-h-0"
          } ${mobileMenuOpen ? (scrolled ? "bg-white/95 backdrop-blur-xl" : "bg-[#0f3150]/95 backdrop-blur-xl rounded-b-2xl") : ""}`}
        >
          <div className="space-y-1 pt-3 px-2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors text-base ${
                    scrolled
                      ? active
                        ? "text-[#194973] bg-[#f5f5f4]"
                        : "text-[#57534e] hover:text-[#194973] hover:bg-[#fafaf9]"
                      : active
                        ? "text-white bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/presupuesto"
              className="block mx-2 mt-4 text-center bg-[#71C648] hover:bg-[#5fb039] text-white px-6 py-3.5 rounded-full font-semibold transition-all text-base shadow-soft"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("budget")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
