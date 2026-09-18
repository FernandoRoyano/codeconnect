import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

/**
 * 404 dentro del sitio: se muestra cuando una pagina llama a `notFound()`
 * (por ejemplo, un slug de blog que ya no existe). A diferencia de la 404 de
 * la raiz, esta si va dentro del layout con cabecera y pie.
 */
export default function LocaleNotFound() {
  return (
    <section className="bg-mesh">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-36 pb-24 sm:pt-44 sm:pb-32 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#20DCC2] mb-4">Error 404</p>
        <h1
          className="font-bold text-white tracking-tight mb-5"
          style={{ fontSize: "var(--fs-4xl)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          No encontramos esta página
        </h1>
        <p className="text-white/70 mb-10" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.6 }}>
          El contenido que buscas puede haber cambiado de dirección. Prueba en el blog o cuéntanos qué
          necesitabas encontrar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/blog" variant="primary" size="lg">
            Ver el blog
          </Button>
          <Button href="/contacto" variant="outline" size="lg">
            Contacto
          </Button>
        </div>
      </div>
    </section>
  );
}
