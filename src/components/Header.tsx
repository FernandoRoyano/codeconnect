"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menu movil esta abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo showTagline={false} variant={scrolled ? "default" : "white"} className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-[#194973] hover:text-[#71C648]"
                    : "text-white hover:text-[#71C648]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/presupuesto"
              className="bg-[#71C648] hover:bg-[#5db33a] text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Solicitar Presupuesto
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors ${
              scrolled
                ? "text-[#194973] hover:text-[#71C648] hover:bg-gray-100"
                : "text-white hover:text-[#71C648]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-[calc(100vh-5rem)] pb-4" : "max-h-0"
          } ${mobileMenuOpen ? (scrolled ? "bg-white/95 backdrop-blur-md" : "bg-[#194973]/95 backdrop-blur-md rounded-b-2xl") : ""}`}
        >
          <div className="space-y-1 pt-2 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                  scrolled
                    ? "text-[#194973] hover:text-[#71C648] hover:bg-gray-50"
                    : "text-white hover:text-[#71C648] hover:bg-white/10"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/presupuesto"
              className="block mx-2 mt-4 text-center bg-[#71C648] hover:bg-[#5db33a] text-white px-6 py-3.5 rounded-full font-medium transition-all text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              Solicitar Presupuesto
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
