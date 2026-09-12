import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://codeconnect.es";

/**
 * Canonical + hreflang para una ruta dada. `path` es la parte tras el locale,
 * con la barra inicial incluida (p.ej. "/servicios", "" para home).
 */
export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${BASE_URL}/${l}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/${routing.defaultLocale}${path}`;

  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages,
  };
}
