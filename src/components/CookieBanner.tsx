"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Siempre activas
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Comprobar si ya hay preferencias guardadas
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Mostrar banner tras un pequeño delay para mejor UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie_consent", JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const rejectAll = () => {
    const allRejected = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie_consent", JSON.stringify(allRejected));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const saved = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie_consent", JSON.stringify(saved));
    setShowBanner(false);
    setShowConfig(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black/50 z-[998]" />

      {/* Banner principal */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {!showConfig ? (
            // Vista principal
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Icono de cookie */}
                <div className="hidden sm:flex w-12 h-12 bg-[#71C648]/10 rounded-full items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#194973] mb-2">
                    Utilizamos cookies
                  </h3>
                  <p className="text-[#5A6D6D] text-sm mb-4">
                    Usamos cookies propias y de terceros para mejorar tu experiencia, analizar el trafico
                    y mostrarte contenido personalizado. Puedes aceptar todas, rechazarlas o configurar
                    tus preferencias.{" "}
                    <Link href="/cookies" className="text-[#71C648] hover:underline">
                      Mas informacion
                    </Link>
                  </p>

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={acceptAll}
                      className="px-6 py-2.5 bg-[#71C648] text-white font-medium rounded-full hover:bg-[#5db33a] transition-colors"
                    >
                      Aceptar todas
                    </button>
                    <button
                      onClick={rejectAll}
                      className="px-6 py-2.5 bg-gray-100 text-[#5A6D6D] font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => setShowConfig(true)}
                      className="px-6 py-2.5 border border-[#194973] text-[#194973] font-medium rounded-full hover:bg-[#194973] hover:text-white transition-colors"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Vista de configuracion
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#194973]">
                  Configurar cookies
                </h3>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-[#5A6D6D] hover:text-[#194973]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6">
                {/* Cookies necesarias */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#194973] text-sm sm:text-base">Cookies necesarias</h4>
                    <p className="text-xs sm:text-sm text-[#5A6D6D]">
                      Esenciales para el funcionamiento del sitio. No se pueden desactivar.
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-[#71C648] rounded-full flex items-center justify-end px-1 flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                {/* Cookies analiticas */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#194973] text-sm sm:text-base">Cookies analiticas</h4>
                    <p className="text-xs sm:text-sm text-[#5A6D6D]">
                      Nos ayudan a entender como usas el sitio para mejorarlo.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0 ${
                      preferences.analytics ? "bg-[#71C648] justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                </div>

                {/* Cookies de marketing */}
                <div className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-[#194973] text-sm sm:text-base">Cookies de marketing</h4>
                    <p className="text-xs sm:text-sm text-[#5A6D6D]">
                      Permiten mostrarte anuncios relevantes y medir su efectividad.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0 ${
                      preferences.marketing ? "bg-[#71C648] justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                </div>
              </div>

              {/* Botones de guardar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={savePreferences}
                  className="flex-1 px-6 py-2.5 bg-[#194973] text-white font-medium rounded-full hover:bg-[#0f3150] transition-colors"
                >
                  Guardar preferencias
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-2.5 bg-[#71C648] text-white font-medium rounded-full hover:bg-[#5db33a] transition-colors"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
