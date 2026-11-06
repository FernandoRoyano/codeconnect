export type OutreachEmail = {
  account: string;
  recipient: string | null;
  recipientSource: string;
  contextSource: string;
  context: string;
  subject: string;
  body: string;
};

const signature = "Fernando Royano\nCodeConnect\nhttps://www.codeconnectsl.com/es";

/** Borradores basados en información pública, sin relación comercial acreditada. */
export const outreachEmails: OutreachEmail[] = [
  {
    account: "Massalud",
    recipient: "info@massalud.org",
    recipientSource: "https://massalud.org/contacto/",
    contextSource: "https://massalud.org/contacto/",
    context: "Su página de contacto presenta solicitudes por teléfono y formulario. No se ha comprobado su gestión interna.",
    subject: "CodeConnect: gestión de solicitudes de cita en Massalud",
    body: `Hola, equipo de Massalud:

Soy Fernando Royano, de CodeConnect. He visto que en vuestra web ofrecéis contacto por teléfono y formulario para solicitar cita.

Desarrollo webs, herramientas internas y automatizaciones para negocios de salud y entrenamiento. Quería conocer si hay alguna tarea en la recepción o el seguimiento de solicitudes que os gustaría simplificar.

Si existe un punto que queráis mejorar, puedo revisar con vosotros el recorrido y valorar qué permiten las herramientas que ya utilizáis.

¿Os interesaría comentarlo en una conversación de 15–20 minutos?

Gracias por vuestro tiempo.

${signature}`,
  },
  {
    account: "EstudioFisio",
    recipient: "info@estudiofisio.es",
    recipientSource: "https://estudiofisio.es/",
    contextSource: "https://estudiofisio.es/pedir-cita/",
    context: "Presenta varias clínicas y reserva online con elección de profesional, día y hora. La reserva ya disponible no se presenta como una carencia.",
    subject: "CodeConnect: reservas y coordinación entre clínicas",
    body: `Hola, equipo de EstudioFisio:

Soy Fernando Royano, de CodeConnect. He visto que trabajáis con varias clínicas y que vuestra web permite elegir profesional, día y hora para reservar.

Mi trabajo se centra en conectar webs y herramientas de gestión. En vuestro caso, me gustaría saber si tenéis alguna prioridad de mejora en la coordinación entre la reserva, la recepción y el seguimiento administrativo de cada centro.

Podemos partir del sistema que ya utilizáis y comprobar si existe algún paso que merezca simplificarse.

¿Os vendría bien una conversación de 15–20 minutos para valorar si hay encaje?

Un saludo,

${signature}`,
  },
  {
    account: "Mi Fisio En Madrid",
    recipient: "info@mifisioenmadrid.es",
    recipientSource: "https://www.mifisioenmadrid.es/contacto",
    contextSource: "https://www.mifisioenmadrid.es/contacto",
    context: "Su página describe cita online y confirmaciones por WhatsApp o email. No se presupone que falte automatización.",
    subject: "CodeConnect: una consulta sobre vuestro recorrido de reservas",
    body: `Hola, equipo de Mi Fisio En Madrid:

Soy Fernando Royano, de CodeConnect. He visto que ofrecéis reserva online con confirmación por WhatsApp o email.

Desarrollo webs e integraciones para negocios de salud y entrenamiento. Me gustaría saber si, alrededor de ese recorrido, hay alguna tarea que queráis mejorar: gestionar cambios, coordinar avisos internos o seguir solicitudes pendientes.

Si tenéis una prioridad concreta, puedo valorar qué opciones permiten vuestras herramientas y qué alcance tendría abordarla.

¿Os interesa que lo comentemos en una conversación breve?

Gracias por vuestro tiempo.

${signature}`,
  },
  {
    account: "María Pastor Nutrición",
    recipient: null,
    recipientSource: "https://nutricionmpastor.es/contacto/",
    contextSource: "https://nutricionmpastor.es/pide-tu-cita/",
    context: "La página de citas revisada diferencia modalidades online y presencial y tipos de consulta. No se ha verificado una dirección de email pública adecuada.",
    subject: "CodeConnect: organización de reservas en tu consulta",
    body: `Hola, María:

Soy Fernando Royano, de CodeConnect. He visto en tu web que ofreces consultas online y presenciales en Madrid, con distintas opciones para la primera visita y las revisiones.

Desarrollo webs y automatizaciones para negocios de salud y entrenamiento. Me gustaría saber si hay alguna parte de la organización de reservas o del seguimiento administrativo que te gustaría simplificar.

Podemos revisar un proceso concreto y comprobar si las herramientas que ya utilizas permiten mejorarlo.

¿Te interesaría dedicarle una conversación de 15–20 minutos?

Un saludo,

${signature}`,
  },
  {
    account: "Holvia",
    recipient: null,
    recipientSource: "https://holvia.es/nutricionista-madrid/",
    contextSource: "https://holvia.es/nutricionista-madrid/",
    context: "Su página de nutrición presenta una solicitud de primera consulta con llamada posterior. No se ha verificado una dirección de email pública adecuada.",
    subject: "CodeConnect: de la solicitud web a la primera cita",
    body: `Hola, equipo de Holvia:

Soy Fernando Royano, de CodeConnect. He visto que vuestra página de nutrición invita a solicitar una primera consulta y que después contactáis por teléfono para dar cita.

Trabajo en webs, herramientas internas y automatizaciones. Me gustaría conocer si tenéis alguna prioridad en el seguimiento de esas solicitudes: saber cuáles están pendientes, registrar el siguiente paso o coordinar los avisos del equipo.

Si hay algo que queráis revisar, podemos recorrer el proceso actual y valorar qué mejora tendría sentido con vuestras herramientas.

¿Os interesaría comentarlo en una conversación breve?

Gracias por vuestro tiempo.

${signature}`,
  },
];
