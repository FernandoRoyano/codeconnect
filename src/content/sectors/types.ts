/**
 * Una landing por sector. Cada problema y cada respuesta tiene que poder
 * apoyarse en un proyecto publicado o en un articulo del blog: sin cifras,
 * clientes ni plazos que no esten ya respaldados en otra parte de la web.
 */
export type SectorSlug = "clinicas" | "gimnasios" | "bienestar";

export type Sector = {
  slug: SectorSlug;
  /** Nombre corto para menus, pildoras y migas. */
  name: string;
  /** Titulo para el <title> del buscador (≈45 caracteres, sin " | CodeConnect"). */
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** H1 de la landing. */
  title: string;
  intro: string;
  /** Perfiles concretos a los que se dirige, tal y como se buscan. */
  audience: string[];
  problems: { title: string; text: string }[];
  solutions: { title: string; text: string; href: "/servicios#web" | "/servicios#crm" | "/servicios#facturacion" }[];
  projectSlugs: string[];
  articleSlugs: string[];
  faqs: { q: string; a: string }[];
};
