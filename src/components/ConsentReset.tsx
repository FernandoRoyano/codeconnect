"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, clearConsent, readConsent } from "@/lib/consent";

/**
 * Boton de la politica de cookies para retirar el consentimiento. Al borrarlo
 * vuelve a salir el banner, que es lo que la politica promete al visitante.
 */
export default function ConsentReset() {
  const [consent, setConsent] = useState<ReturnType<typeof readConsent>>(null);

  useEffect(() => {
    const sync = () => setConsent(readConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return (
    <div className="not-prose my-4 rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] p-5">
      <p className="text-sm text-[#57534e] mb-4">
        {consent
          ? consent.analytics
            ? "Ahora mismo tienes aceptadas las cookies de analítica."
            : "Ahora mismo tienes rechazadas las cookies de analítica."
          : "Ahora mismo no has elegido nada: no se carga ninguna cookie de analítica."}
      </p>
      <button
        type="button"
        onClick={clearConsent}
        disabled={!consent}
        className="inline-flex items-center rounded-full bg-[#194973] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f3150] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cambiar mi elección
      </button>
    </div>
  );
}
