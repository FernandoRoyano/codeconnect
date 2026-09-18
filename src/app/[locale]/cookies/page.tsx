import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LegalLayout from "@/components/LegalLayout";
import ConsentReset from "@/components/ConsentReset";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: "Política de cookies", alternates: buildAlternates(locale, "/cookies") };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LegalLayout title="Política de cookies">
      <h2>1. Qué son las cookies</h2>
      <p>
        Una cookie es un pequeño fichero que un sitio web guarda en tu navegador. Algunas son imprescindibles
        para que la web funcione y otras sirven para medir cómo se usa. Esta página explica cuáles usamos
        nosotros y cómo puedes decidir sobre ellas.
      </p>

      <h2>2. Cookies técnicas</h2>
      <p>
        Las áreas que requieren inicio de sesión usan cookies técnicas de autenticación. Son necesarias para
        mantener la sesión y aplicar medidas de seguridad, no se utilizan para elaborar perfiles ni mostrar
        publicidad, y no requieren consentimiento. Si las bloqueas, las funciones que requieren autenticación
        dejarán de funcionar.
      </p>

      <h2>3. Cookies de analítica</h2>
      <p>
        Usamos <strong>Google Analytics 4</strong> para saber qué páginas se visitan y cómo se llega a ellas.
        Nos sirve para decidir qué contenido ampliar y qué partes de la web mejorar.
      </p>
      <ul>
        <li><strong>Proveedor:</strong> Google Ireland Limited.</li>
        <li><strong>Finalidad:</strong> medición de audiencia y rendimiento del sitio.</li>
        <li><strong>Base legal:</strong> tu consentimiento.</li>
        <li><strong>Datos:</strong> páginas vistas, procedencia, tipo de dispositivo y dirección IP anonimizada.</li>
        <li><strong>Publicidad:</strong> desactivada. No usamos estos datos para anuncios ni personalización.</li>
      </ul>
      <p>
        El script de Google <strong>no se descarga hasta que aceptas</strong>. Si lo rechazas, no se carga nada
        de Google y no se envía ningún dato.
      </p>

      <h2>4. Cookies de marketing</h2>
      <p>
        Hoy no utilizamos cookies publicitarias. El banner incluye esta categoría porque tu elección queda
        guardada para el futuro, pero mientras no haya ningún servicio de este tipo no se activa nada.
      </p>

      <h2>5. Cómo cambiar tu elección</h2>
      <p>
        Puedes retirar o modificar tu consentimiento cuando quieras desde aquí. Al hacerlo volverá a aparecer
        el banner para que elijas de nuevo.
      </p>
      <ConsentReset />
      <p>
        Tu elección se guarda en tu propio navegador (en <code>localStorage</code>, bajo la clave
        <code>cookie_consent</code>), no en nuestros servidores. Si cambiamos las finalidades para las que
        pedimos permiso, volveremos a preguntarte.
      </p>

      <h2>6. Gestión desde el navegador</h2>
      <p>
        También puedes consultar, bloquear o eliminar cookies desde la configuración de tu navegador, y usar
        el complemento de inhabilitación de Google Analytics si prefieres bloquearlo en todos los sitios.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Si tienes dudas sobre esta política, escríbenos mediante el formulario de contacto de esta web.
      </p>
    </LegalLayout>
  );
}
