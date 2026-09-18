import type { MetadataRoute } from "next";
import { articles } from "@/content/blog";
import { SITE_URL } from "@/lib/seo";

// Fecha real de la última edición de contenido conocida por este repo — no
// "new Date()" en cada request, que haría creer a los buscadores que todo
// cambia constantemente. Actualizar a mano cuando se publiquen cambios de
// contenido reales (o sustituir por la fecha del último commit relevante).
const LAST_MODIFIED = new Date("2026-09-18");

// El listado del blog cambia cuando se publica un articulo, asi que su fecha
// sale del contenido en vez de la constante de arriba.
const NEWEST_ARTICLE = new Date(
  articles.reduce((latest, a) => (a.date > latest ? a.date : latest), articles[0].date),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["es"];
  const pages = [
    "",
    "/servicios",
    "/diagnostico",
    "/contacto",
    "/presupuesto",
    "/portfolio",
    "/blog",
    "/politica-privacidad",
    "/aviso-legal",
    "/cookies",
  ];
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: page === "/blog" ? NEWEST_ARTICLE : LAST_MODIFIED,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  for (const article of articles) {
    entries.push({
      url: `${SITE_URL}/es/blog/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
