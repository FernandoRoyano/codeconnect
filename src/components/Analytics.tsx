"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, CONSENT_KEY, readConsent } from "@/lib/consent";
import { captureEntry, clearEntry } from "@/lib/attribution";

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
 * Sin `NEXT_PUBLIC_GA_ID` no se carga Google. La atribución propia de consultas
 * sigue disponible si el visitante acepta la analítica.
 */
export default function Analytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    captureEntry();
    const load = () => {
      const allowed = Boolean(readConsent()?.analytics);
      if (GA_ID) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !allowed;
      }
      if (!allowed) {
        window.gtag?.("consent", "update", { analytics_storage: "denied" });
        return;
      }
      captureEntry();
      if (!GA_ID) return;
      if (document.getElementById("ga4")) {
        window.gtag?.("consent", "update", { analytics_storage: "granted" });
        return;
      }

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
      window.gtag("config", GA_ID, {
        anonymize_ip: true,
        send_page_view: false,
        page_location: `${window.location.origin}${window.location.pathname}`,
        page_referrer: "",
      });

      const script = document.createElement("script");
      script.id = "ga4";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    };

    const pageView = () => {
      if (!GA_ID || !window.gtag || !readConsent()?.analytics || lastPage.current === pathname) return;
      lastPage.current = pathname;
      window.gtag?.("event", "page_view", {
        page_path: pathname,
        page_location: `${window.location.origin}${pathname}`,
        page_referrer: "",
      });
    };
    const consentChanged = () => {
      if (!readConsent()?.analytics) {
        clearEntry();
        lastPage.current = null;
      }
      load();
      pageView();
    };
    const ctaClicked = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      const href = target?.getAttribute("href") || "";
      const destination = href.match(/^\/(?:es\/)?(diagnostico|contacto|presupuesto)(?:[?#]|$)/)?.[1];
      if (!destination || !readConsent()?.analytics) return;
      window.gtag?.("event", "cta_click", {
        destination,
        page_path: pathname,
        page_location: `${window.location.origin}${pathname}`,
      });
    };
    const storageChanged = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) consentChanged();
    };

    load();
    pageView();
    window.addEventListener(CONSENT_EVENT, consentChanged);
    window.addEventListener("storage", storageChanged);
    document.addEventListener("click", ctaClicked);
    return () => {
      window.removeEventListener(CONSENT_EVENT, consentChanged);
      window.removeEventListener("storage", storageChanged);
      document.removeEventListener("click", ctaClicked);
    };
  }, [pathname]);

  return null;
}
