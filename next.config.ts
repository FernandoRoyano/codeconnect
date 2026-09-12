import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
