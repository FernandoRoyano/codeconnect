import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: "Política de cookies", alternates: buildAlternates(locale, "/cookies") };
}

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de cookies">
      <h2>1. Cookies utilizadas</h2>
      <p>
        Esta web no utiliza cookies analíticas, publicitarias ni de seguimiento. Por ese motivo no mostramos un
        banner de consentimiento.
      </p>

      <h2>2. Cookies técnicas</h2>
      <p>
        Las áreas que requieren inicio de sesión pueden usar cookies técnicas de autenticación. Son necesarias para
        mantener la sesión y aplicar medidas de seguridad, y no se utilizan para elaborar perfiles ni mostrar publicidad.
      </p>

      <h2>3. Servicios de terceros</h2>
      <p>
        Si en el futuro incorporamos un servicio que instale cookies no esenciales, actualizaremos esta política y
        solicitaremos tu consentimiento antes de activarlas.
      </p>

      <h2>4. Gestión desde el navegador</h2>
      <p>
        Puedes consultar, bloquear o eliminar cookies desde la configuración de tu navegador. Si bloqueas las cookies
        técnicas, las funciones que requieren autenticación podrían dejar de funcionar.
      </p>

      <h2>5. Contacto</h2>
      <p>
        Si tienes dudas sobre esta política, escribe a{" "}
        el formulario de contacto de esta web.
      </p>
    </LegalLayout>
  );
}
