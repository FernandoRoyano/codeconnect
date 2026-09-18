import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Cuanto guarda el servidor cada imagen optimizada. No se puede invalidar
    // esta cache, asi que 31 dias (el valor que sugiere la documentacion) en
    // lugar de un ano: si hay que sustituir una portada antes, basta con
    // renombrarla. El Max-Age que acaba viendo el navegador es el mayor entre
    // este valor y el Cache-Control del fichero de origen, que se fija abajo.
    minimumCacheTTL: 2678400,
  },
  // /en y /fr estuvieron publicados y hoy devuelven 200. Al dejar el sitio en
  // solo espanol, redirigirlos conserva los enlaces en circulacion y lo que
  // tengan indexado los buscadores, en vez de convertirlos en 404.
  async redirects() {
    return [
      { source: "/en", destination: "/es", permanent: true },
      { source: "/fr", destination: "/es", permanent: true },
      { source: "/en/:path*", destination: "/es/:path*", permanent: true },
      { source: "/fr/:path*", destination: "/es/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Los ficheros de /public salian con max-age=0, must-revalidate, y ese
        // valor se propaga a la version optimizada: el navegador volvia a
        // preguntar por cada imagen en cada navegacion. La cabecera hay que
        // ponerla en el fichero de origen, no en /_next/image.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=2592000" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // La web no usa camara, microfono ni ubicacion: se niegan explicitamente.
          // (X-XSS-Protection se ha quitado: los navegadores actuales la ignoran.)
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
