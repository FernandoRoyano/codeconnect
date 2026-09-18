"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 cargado solo si el visitante acepta la analitica.
 *
 * El script no se inyecta hasta que hay consentimiento: si alguien lo rechaza,
 * no llega a descargarse nada de Google. Al aceptar desde el banner no hace
 * falta recargar, porque el banner emite `CONSENT_EVENT`.
 *
 * Sin `NEXT_PUBLIC_GA_ID` definida el componente no hace absolutamente nada,
 * asi que en local y en previews el sitio va sin analitica.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;

    const load = () => {
      if (!readConsent()?.analytics) return;
      if (document.getElementById("ga4")) return;

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
      // Consent Mode: todo denegado salvo lo que el visitante acaba de aceptar.
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
        wait_for_update: 500,
      });
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { anonymize_ip: true });

      const script = document.createElement("script");
      script.id = "ga4";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    };

    load();
    window.addEventListener(CONSENT_EVENT, load);
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, []);

  // En App Router la navegacion no recarga la pagina: hay que enviar la vista.
  useEffect(() => {
    if (!GA_ID || !window.gtag || !readConsent()?.analytics) return;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
