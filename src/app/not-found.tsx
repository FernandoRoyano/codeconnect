import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/es", label: "Inicio" },
  { href: "/es/servicios", label: "Servicios" },
  { href: "/es/portfolio", label: "Proyectos" },
  { href: "/es/blog", label: "Blog" },
  { href: "/es/contacto", label: "Contacto" },
];

/**
 * 404 para URLs que no encajan en ninguna ruta. Vive en la raiz, fuera del
 * layout con cabecera y pie, asi que lleva su propia salida a las secciones
 * principales en vez de dejar al visitante sin ningun enlace.
 */
export default function NotFound() {
  return (
    <div className="bg-mesh min-h-screen flex items-center">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#20DCC2] mb-4">Error 404</p>
        <h1
          className="font-bold text-white tracking-tight mb-5"
          style={{ fontSize: "var(--fs-4xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          Esta página no existe
        </h1>
        <p className="text-white/70 mb-10" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
          Puede que el enlace esté mal escrito o que la página haya cambiado de sitio. Desde aquí puedes
          seguir por donde te interese.
        </p>
        <nav className="flex flex-wrap justify-center gap-3" aria-label="Secciones principales">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
