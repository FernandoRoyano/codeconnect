import LegalLayout from "@/components/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de Cookies">
            <h2>1. Qué son las cookies</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet,
              móvil) cuando visitas un sitio web. Sirven para recordar tus preferencias, mejorar tu experiencia
              de navegación y recopilar información anónima sobre el uso del sitio.
            </p>

            <h2>2. Tipos de cookies que utilizamos</h2>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Cookies técnicas (necesarias)</h3>
            <p>
              Son esenciales para el funcionamiento del sitio web. Sin ellas, algunas funciones no estarían disponibles.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Finalidad</th>
                    <th className="text-left py-2">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">cookie_consent</td>
                    <td className="py-2">Guarda tus preferencias de cookies</td>
                    <td className="py-2">1 año</td>
                  </tr>
                  <tr>
                    <td className="py-2">session_id</td>
                    <td className="py-2">Mantiene tu sesión activa</td>
                    <td className="py-2">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Cookies analíticas</h3>
            <p>
              Nos permiten medir y analizar cómo los usuarios navegan por el sitio para mejorar nuestros servicios.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Proveedor</th>
                    <th className="text-left py-2">Finalidad</th>
                    <th className="text-left py-2">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">_ga</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">Distinguir usuarios</td>
                    <td className="py-2">2 años</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">_ga_*</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">Mantener estado de sesión</td>
                    <td className="py-2">2 años</td>
                  </tr>
                  <tr>
                    <td className="py-2">_gid</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">Distinguir usuarios</td>
                    <td className="py-2">24 horas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Cookies de marketing (opcionales)</h3>
            <p>
              Se utilizan para mostrarte anuncios relevantes y medir la efectividad de campañas publicitarias.
              Solo se activan si das tu consentimiento.
            </p>

            <h2>3. Cómo gestionar las cookies</h2>
            <p>Puedes gestionar tus preferencias de cookies de varias formas:</p>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Desde nuestro banner de cookies</h3>
            <p>
              Al acceder a la web por primera vez, verás un banner donde puedes aceptar o rechazar las cookies
              no esenciales. Puedes cambiar tus preferencias en cualquier momento desde el enlace
              &quot;Configurar cookies&quot; en el pie de página.
            </p>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Desde tu navegador</h3>
            <p>
              Puedes configurar tu navegador para bloquear o eliminar cookies. Aquí tienes enlaces a las
              instrucciones de los navegadores más comunes:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p className="mt-4 text-sm bg-amber-50 border-l-4 border-amber-400 p-4">
              <strong>Nota:</strong> Si desactivas las cookies, algunas funciones del sitio podrían no funcionar correctamente.
            </p>

            <h2>4. Cookies de terceros</h2>
            <p>
              Algunos servicios de terceros que utilizamos pueden instalar sus propias cookies:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> análisis web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de privacidad</a></li>
              <li><strong>Google Fonts:</strong> tipografías web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de privacidad</a></li>
            </ul>

            <h2>5. Actualizaciones</h2>
            <p>
              Podemos actualizar esta política de cookies en cualquier momento. La fecha de la última
              actualización aparece al principio de este documento. Te recomendamos revisarla periódicamente.
            </p>

            <h2>6. Contacto</h2>
            <p>
              Si tienes dudas sobre nuestra política de cookies, puedes contactarnos en{" "}
              <a href="mailto:codeconnectsl@gmail.com">codeconnectsl@gmail.com</a>.
            </p>
    </LegalLayout>
  );
}
