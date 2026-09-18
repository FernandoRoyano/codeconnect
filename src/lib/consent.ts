/**
 * Consentimiento de cookies. Lo guarda el banner y lo leen el banner y la
 * analitica, asi que el formato vive aqui y no duplicado en cada componente.
 */

export const CONSENT_KEY = "cookie_consent";
export const CONSENT_EVENT = "cookie-consent-change";

/**
 * Subir la version invalida los consentimientos ya guardados y vuelve a
 * preguntar. Hay que subirla cuando cambian las finalidades: los visitantes
 * que aceptaron cuando la web no tenia analitica no consintieron esto.
 */
export const CONSENT_VERSION = 2;

export type Consent = {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

/** Devuelve el consentimiento vigente, o null si no hay o es de otra version. */
export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed as Consent;
  } catch {
    // localStorage puede fallar en modo privado o con el almacenamiento bloqueado.
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }): void {
  const consent: Consent = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Si no se puede guardar, al menos la eleccion aplica en esta pagina.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

/** Borra la eleccion guardada para que el banner vuelva a preguntar. */
export function clearConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Nada que limpiar si el almacenamiento no esta disponible.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}
