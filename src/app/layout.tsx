import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodeConnect | Desarrollo de Software a Medida para Salud",
    template: "%s | CodeConnect",
  },
  description:
    "Conectando ideas, creando soluciones. Desarrollo de aplicaciones web y software a medida para el sector salud.",
  icons: {
    icon: "/favicon.svg",
  },
};

// El idioma se toma de la configuración de rutas, no de la request: `getLocale()`
// leía la cabecera que pone el proxy y eso obligaba a renderizar cada página en
// cada visita. Con un valor estático, todo el árbol puede prerrenderizarse.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={routing.defaultLocale}>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
