import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Las portadas viven en /public con nombre fijo y se sustituyen a mano, así
    // que el navegador puede quedarse la version optimizada un ano. Por defecto
    // Next manda max-age=0 y revalidaba en cada navegacion.
    minimumCacheTTL: 31536000,
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
