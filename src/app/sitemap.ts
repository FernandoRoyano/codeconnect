import type { MetadataRoute } from "next";

const BASE_URL = "https://codeconnect.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["es", "en", "fr"];
  const pages = [
    "",
    "/servicios",
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
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
