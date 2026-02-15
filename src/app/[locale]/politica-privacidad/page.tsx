export default function PoliticaPrivacidadPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Política de Privacidad
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

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">1. Responsable del tratamiento</h2>
            <p>
              <strong>Identidad:</strong> CodeConnect<br />
              <strong>NIF:</strong> [NIF/CIF a completar]<br />
              <strong>Dirección:</strong> [Dirección a completar]<br />
              <strong>Email:</strong> info@codeconnect.es<br />
              <strong>Teléfono:</strong> [Teléfono a completar]
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Datos de contacto:</strong> nombre, email, teléfono y empresa cuando rellenas formularios de contacto o presupuesto.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia mediante cookies.</li>
              <li><strong>Datos de comunicación:</strong> contenido de los mensajes que nos envías.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responder a tus consultas y solicitudes de presupuesto.</li>
              <li>Enviarte información comercial sobre nuestros servicios (solo si das tu consentimiento).</li>
              <li>Mejorar nuestros servicios y la experiencia de usuario en la web.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">4. Base legal</h2>
            <p>El tratamiento de tus datos se basa en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimiento:</strong> cuando rellenas un formulario o aceptas cookies.</li>
              <li><strong>Ejecución de contrato:</strong> cuando nos contratas para desarrollar un proyecto.</li>
              <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y responder consultas.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">5. Conservación de datos</h2>
            <p>
              Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos
              y para cumplir con obligaciones legales. Los datos de clientes se conservan durante la relación contractual
              y los plazos legales posteriores (normalmente 5 años para obligaciones fiscales).
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">6. Destinatarios</h2>
            <p>
              No cedemos tus datos a terceros salvo obligación legal. Podemos compartir datos con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proveedores de servicios que nos ayudan a operar (hosting, email marketing, etc.) con los que tenemos contratos de encargo de tratamiento.</li>
              <li>Administraciones públicas cuando sea requerido legalmente.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a info@codeconnect.es:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar que eliminemos tus datos.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato electrónico.</li>
              <li><strong>Limitación:</strong> solicitar que limitemos el uso de tus datos.</li>
            </ul>
            <p className="mt-4">
              También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">8. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado SSL,
              acceso restringido, copias de seguridad y revisión periódica de nuestros sistemas.
            </p>

            <h2 className="text-2xl font-bold text-[#194973] mt-8 mb-4">9. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te recomendamos revisarla de vez en cuando.
              La fecha de última actualización aparece al principio de este documento.
            </p>

          </div>
        </div>
      </section>
    </>
  );
}
