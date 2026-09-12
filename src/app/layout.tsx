import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const roboto = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/Roboto-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Roboto-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Roboto-Black.ttf", weight: "900", style: "normal" },
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
