import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.codeconnectsl.com";

/** `@id` de los datos estructurados, para que todas las páginas apunten a la misma entidad. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#fernando-royano`;

export const AUTHOR_IMAGE = "/images/team/fernando-royano.webp";
export const AUTHOR_LINKEDIN = "https://www.linkedin.com/in/fernando-royano-cabrero-dev";

/**
 * Canonical + hreflang para una ruta dada. `path` es la parte tras el locale,
 * con la barra inicial incluida (p.ej. "/servicios", "" para home).
 */
export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE_URL}/${l}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;

  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages,
  };
}
