export default function PoliticaPrivacidadPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Politica de Privacidad
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

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">1. Responsable del tratamiento</h2>
            <p>
              <strong>Identidad:</strong> CodeConnect<br />
              <strong>NIF:</strong> [NIF/CIF a completar]<br />
              <strong>Direccion:</strong> [Direccion a completar]<br />
              <strong>Email:</strong> info@codeconnect.es<br />
              <strong>Telefono:</strong> [Telefono a completar]
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Datos de contacto:</strong> nombre, email, telefono y empresa cuando rellenas formularios de contacto o presupuesto.</li>
              <li><strong>Datos de navegacion:</strong> direccion IP, tipo de navegador, paginas visitadas y tiempo de permanencia mediante cookies.</li>
              <li><strong>Datos de comunicacion:</strong> contenido de los mensajes que nos envias.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tus consultas y solicitudes de presupuesto.</li>
              <li>Enviarte informacion comercial sobre nuestros servicios (solo si das tu consentimiento).</li>
              <li>Mejorar nuestros servicios y la experiencia de usuario en la web.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">4. Base legal</h2>
            <p>El tratamiento de tus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimiento:</strong> cuando rellenas un formulario o aceptas cookies.</li>
              <li><strong>Ejecucion de contrato:</strong> cuando nos contratas para desarrollar un proyecto.</li>
              <li><strong>Interes legitimo:</strong> para mejorar nuestros servicios y responder consultas.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">5. Conservacion de datos</h2>
            <p>
              Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos
              y para cumplir con obligaciones legales. Los datos de clientes se conservan durante la relacion contractual
              y los plazos legales posteriores (normalmente 5 anos para obligaciones fiscales).
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">6. Destinatarios</h2>
            <p>
              No cedemos tus datos a terceros salvo obligacion legal. Podemos compartir datos con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proveedores de servicios que nos ayudan a operar (hosting, email marketing, etc.) con los que tenemos contratos de encargo de tratamiento.</li>
              <li>Administraciones publicas cuando sea requerido legalmente.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a info@codeconnect.es:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> saber que datos tenemos sobre ti.</li>
              <li><strong>Rectificacion:</strong> corregir datos inexactos.</li>
              <li><strong>Supresion:</strong> solicitar que eliminemos tus datos.</li>
              <li><strong>Oposicion:</strong> oponerte al tratamiento de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato electronico.</li>
              <li><strong>Limitacion:</strong> solicitar que limitemos el uso de tus datos.</li>
            </ul>
            <p className="mt-4">
              Tambien puedes presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos (www.aepd.es).
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">8. Seguridad</h2>
            <p>
              Aplicamos medidas tecnicas y organizativas para proteger tus datos: cifrado SSL,
              acceso restringido, copias de seguridad y revision periodica de nuestros sistemas.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">9. Cambios en esta politica</h2>
            <p>
              Podemos actualizar esta politica periodicamente. Te recomendamos revisarla de vez en cuando.
              La fecha de ultima actualizacion aparece al principio de este documento.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
