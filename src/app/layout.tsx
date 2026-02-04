import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CodeConnect | Desarrollo de Software a Medida para Salud",
    template: "%s | CodeConnect",
  },
  description: "Conectando ideas, creando soluciones. Desarrollo de aplicaciones web y software a medida para el sector salud. Licencia completa en propiedad, desarrollo rapido y precios competitivos.",
  keywords: ["desarrollo web", "software a medida", "salud", "aplicaciones medicas", "tecnologia sanitaria", "codeconnect"],
  authors: [{ name: "CodeConnect" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "CodeConnect | Desarrollo de Software a Medida para Salud",
    description: "Conectando ideas, creando soluciones. Software a medida para el sector salud.",
    type: "website",
    locale: "es_ES",
    siteName: "CodeConnect",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeConnect | Software a Medida para Salud",
    description: "Conectando ideas, creando soluciones. Software a medida para el sector salud.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.variable} ${robotoSlab.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
