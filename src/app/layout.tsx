import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Metadata mínima para lo que queda fuera de [locale] (panel, login, propuestas
// privadas): no se indexa. Las páginas públicas la sobrescriben en su layout.
export const metadata: Metadata = {
  title: "CodeConnect",
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: false, follow: false },
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
