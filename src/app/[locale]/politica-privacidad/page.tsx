import LegalLayout from "@/components/LegalLayout";

export default function PoliticaPrivacidadPage() {
  return (
    <LegalLayout title="Política de Privacidad">
            <h2>1. Responsable del tratamiento</h2>
            <p>
              <strong>Identidad:</strong> CodeConnect<br />
              <strong>NIF:</strong> [NIF/CIF a completar]<br />
              <strong>Dirección:</strong> [Dirección a completar]<br />
              <strong>Email:</strong> codeconnectsl@gmail.com
            </p>

            <h2>2. Datos que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales cuando utilizas nuestros servicios:</p>
            <ul>
              <li><strong>Datos de contacto:</strong> nombre, email, teléfono y empresa cuando rellenas formularios de contacto o presupuesto.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia mediante cookies.</li>
              <li><strong>Datos de comunicación:</strong> contenido de los mensajes que nos envías.</li>
            </ul>

            <h2>3. Finalidad del tratamiento</h2>
            <p>Utilizamos tus datos para:</p>
            <ul>
              <li>Responder a tus consultas y solicitudes de presupuesto.</li>
              <li>Enviarte información comercial sobre nuestros servicios (solo si das tu consentimiento).</li>
              <li>Mejorar nuestros servicios y la experiencia de usuario en la web.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>

            <h2>4. Base legal</h2>
            <p>El tratamiento de tus datos se basa en:</p>
            <ul>
              <li><strong>Consentimiento:</strong> cuando rellenas un formulario o aceptas cookies.</li>
              <li><strong>Ejecución de contrato:</strong> cuando nos contratas para desarrollar un proyecto.</li>
              <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y responder consultas.</li>
            </ul>

            <h2>5. Conservación de datos</h2>
            <p>
              Conservamos tus datos durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos
              y para cumplir con obligaciones legales. Los datos de clientes se conservan durante la relación contractual
              y los plazos legales posteriores (normalmente 5 años para obligaciones fiscales).
            </p>

            <h2>6. Destinatarios</h2>
            <p>
              No cedemos tus datos a terceros salvo obligación legal. Podemos compartir datos con:
            </p>
            <ul>
              <li>Proveedores de servicios que nos ayudan a operar (hosting, email marketing, etc.) con los que tenemos contratos de encargo de tratamiento.</li>
              <li>Administraciones públicas cuando sea requerido legalmente.</li>
            </ul>

            <h2>7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a codeconnectsl@gmail.com:</p>
            <ul>
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

            <h2>8. Seguridad</h2>
            <p>
              Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado SSL,
              acceso restringido, copias de seguridad y revisión periódica de nuestros sistemas.
            </p>

            <h2>9. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te recomendamos revisarla de vez en cuando.
              La fecha de última actualización aparece al principio de este documento.
            </p>

    </LegalLayout>
  );
}
