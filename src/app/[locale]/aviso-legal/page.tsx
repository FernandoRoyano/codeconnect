export default function AvisoLegalPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Aviso Legal
            </h1>
            <p className="text-gray-300">
              Última actualización: Febrero 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-[#5A6D6D]">

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">1. Datos identificativos</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
              de la Información y Comercio Electrónico, se exponen los siguientes datos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Titular:</strong> CodeConnect</li>
              <li><strong>NIF/CIF:</strong> [A completar]</li>
              <li><strong>Domicilio:</strong> [A completar]</li>
              <li><strong>Email:</strong> info@codeconnect.es</li>
              <li><strong>Teléfono:</strong> [A completar]</li>
              <li><strong>Actividad:</strong> Desarrollo de software y aplicaciones web</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">2. Objeto</h2>
            <p>
              El presente aviso legal regula el uso del sitio web codeconnect.es (en adelante, el Sitio Web),
              del que es titular CodeConnect.
            </p>
            <p>
              La navegación por el Sitio Web atribuye la condición de usuario del mismo e implica la aceptación
              plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">3. Condiciones de uso</h2>
            <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que CodeConnect ofrece:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No realizar actividades ilícitas o contrarias a la buena fe y al orden público.</li>
              <li>No difundir contenidos de carácter racista, xenófobo, pornográfico, de apología del terrorismo o que atenten contra los derechos humanos.</li>
              <li>No provocar daños en los sistemas físicos y lógicos de CodeConnect o de terceros.</li>
              <li>No intentar acceder a cuentas de otros usuarios o a áreas restringidas del sistema.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">4. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del Sitio Web (textos, fotografías, gráficos, imágenes, iconos, tecnología,
              software, links y demás contenidos audiovisuales, así como su diseño gráfico y códigos fuente)
              son propiedad intelectual de CodeConnect o de terceros, sin que puedan entenderse cedidos al
              usuario ninguno de los derechos de explotación sobre los mismos.
            </p>
            <p>
              Las marcas, nombres comerciales o signos distintivos son titularidad de CodeConnect o de terceros,
              sin que pueda entenderse que el acceso al Sitio Web atribuye ningún derecho sobre los mismos.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">5. Exclusión de responsabilidad</h2>
            <p>CodeConnect no se hace responsable de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La falta de disponibilidad, mantenimiento y efectivo funcionamiento del Sitio Web o de sus servicios y contenidos.</li>
              <li>La existencia de virus, programas maliciosos o lesivos en los contenidos.</li>
              <li>El uso ilícito, negligente, fraudulento o contrario a este Aviso Legal.</li>
              <li>La falta de licitud, calidad, fiabilidad, utilidad y disponibilidad de los servicios prestados por terceros a través del Sitio Web.</li>
              <li>Los daños que pudieran causarse por el uso de información del Sitio Web.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">6. Enlaces externos</h2>
            <p>
              El Sitio Web puede contener enlaces a sitios de terceros. CodeConnect no asume ninguna
              responsabilidad por el contenido, información o servicios que pudieran aparecer en dichos sitios,
              que tendrán exclusivamente carácter informativo y que en ningún caso implican relación alguna
              entre CodeConnect y las personas o entidades titulares de tales contenidos.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">7. Legislación aplicable y jurisdicción</h2>
            <p>
              La relación entre CodeConnect y el usuario se regirá por la normativa española vigente.
              Para la resolución de cualquier controversia, las partes se someterán a los Juzgados y
              Tribunales del domicilio de CodeConnect, salvo que la ley disponga otra cosa.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">8. Modificaciones</h2>
            <p>
              CodeConnect se reserva el derecho de modificar, en cualquier momento y sin aviso previo,
              la presentación y configuración del Sitio Web, así como el presente Aviso Legal.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
