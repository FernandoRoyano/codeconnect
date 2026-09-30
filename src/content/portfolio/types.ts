/**
 * Un proyecto publicado en el portfolio. El listado, la pagina de caso, la
 * home y el sitemap salen de aqui.
 *
 * Solo se escribe lo que se puede comprobar abriendo el proyecto: sin metricas
 * de resultado inventadas ni testimonios que el cliente no haya dado.
 */
import type { SectorSlug } from "@/content/sectors/types";

export type ProjectKind = "own" | "client";

export type ProjectCategory = "web" | "software";

export type Project = {
  slug: string;
  title: string;
  /** Titulo para el <title> del buscador (≈45 caracteres, sin " | CodeConnect"). */
  seoTitle: string;
  metaDescription: string;
  /** Sector del proyecto, en el lenguaje en que lo buscaria un cliente. */
  sector: string;
  /** Landing de sector a la que enlaza el caso. Vacio si no encaja en ninguna. */
  sectorSlug?: SectorSlug;
  category: ProjectCategory;
  kind: ProjectKind;
  badge: string;
  /** Una frase para la tarjeta del listado. */
  summary: string;
  /** Portada de la tarjeta del listado. */
  image: string;
  captures: { desktop: string; mobile: string };
  technologies: string[];
  url: string;
  /** Contexto: quien es y que necesitaba. */
  context: string;
  /** Que resuelve la web o el producto, en bloques cortos. */
  scope: string[];
};
