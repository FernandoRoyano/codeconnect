export default function CookiesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Politica de Cookies
            </h1>
            <p className="text-gray-300">
              Ultima actualizacion: Febrero 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#5A6D6D]">

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">1. Que son las cookies</h2>
            <p>
              Las cookies son pequenos archivos de texto que se almacenan en tu dispositivo (ordenador, tablet,
              movil) cuando visitas un sitio web. Sirven para recordar tus preferencias, mejorar tu experiencia
              de navegacion y recopilar informacion anonima sobre el uso del sitio.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">2. Tipos de cookies que utilizamos</h2>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Cookies tecnicas (necesarias)</h3>
            <p>
              Son esenciales para el funcionamiento del sitio web. Sin ellas, algunas funciones no estarian disponibles.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Finalidad</th>
                    <th className="text-left py-2">Duracion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">cookie_consent</td>
                    <td className="py-2">Guarda tus preferencias de cookies</td>
                    <td className="py-2">1 ano</td>
                  </tr>
                  <tr>
                    <td className="py-2">session_id</td>
                    <td className="py-2">Mantiene tu sesion activa</td>
                    <td className="py-2">Sesion</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Cookies analiticas</h3>
            <p>
              Nos permiten medir y analizar como los usuarios navegan por el sitio para mejorar nuestros servicios.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Proveedor</th>
                    <th className="text-left py-2">Finalidad</th>
                    <th className="text-left py-2">Duracion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">_ga</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">Distinguir usuarios</td>
                    <td className="py-2">2 anos</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">_ga_*</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">Mantener estado de sesion</td>
                    <td className="py-2">2 anos</td>
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
              Se utilizan para mostrarte anuncios relevantes y medir la efectividad de campanas publicitarias.
              Solo se activan si das tu consentimiento.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">3. Como gestionar las cookies</h2>
            <p>Puedes gestionar tus preferencias de cookies de varias formas:</p>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Desde nuestro banner de cookies</h3>
            <p>
              Al acceder a la web por primera vez, veras un banner donde puedes aceptar o rechazar las cookies
              no esenciales. Puedes cambiar tus preferencias en cualquier momento desde el enlace
              &quot;Configurar cookies&quot; en el pie de pagina.
            </p>

            <h3 className="text-xl font-semibold text-[#194973] mt-6 mb-3">Desde tu navegador</h3>
            <p>
              Puedes configurar tu navegador para bloquear o eliminar cookies. Aqui tienes enlaces a las
              instrucciones de los navegadores mas comunes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-4 text-sm bg-amber-50 border-l-4 border-amber-400 p-4">
              <strong>Nota:</strong> Si desactivas las cookies, algunas funciones del sitio podrian no funcionar correctamente.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">4. Cookies de terceros</h2>
            <p>
              Algunos servicios de terceros que utilizamos pueden instalar sus propias cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics:</strong> analisis web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline">Politica de privacidad</a></li>
              <li><strong>Google Fonts:</strong> tipografias web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#71C648] hover:underline">Politica de privacidad</a></li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">5. Actualizaciones</h2>
            <p>
              Podemos actualizar esta politica de cookies en cualquier momento. La fecha de la ultima
              actualizacion aparece al principio de este documento. Te recomendamos revisarla periodicamente.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">6. Contacto</h2>
            <p>
              Si tienes dudas sobre nuestra politica de cookies, puedes contactarnos en{" "}
              <a href="mailto:info@codeconnect.es" className="text-[#71C648] hover:underline">info@codeconnect.es</a>.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
