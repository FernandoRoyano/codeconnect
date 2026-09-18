import type { Article } from "./types";

export const article: Article = {
  slug: "ai-act-bot-whatsapp-aviso-ia",
  image: "/images/blog/ai-act-bot-whatsapp.webp",
  title: "Tienes un bot de WhatsApp: desde agosto estás obligado a avisar de que es una IA",
  seoTitle: "Bot de WhatsApp: aviso obligatorio de IA",
  excerpt:
    "El artículo 50 del reglamento europeo de IA entró en vigor el 2 de agosto de 2026. El aplazamiento del que habla todo el mundo no te cubre: afecta a los sistemas de alto riesgo, no a esto.",
  category: "Legal",
  date: "2026-09-10",
  readMinutes: 9,
  metaDescription:
    "Desde el 2 de agosto de 2026 el artículo 50 del AI Act obliga a avisar de que se está hablando con una IA. Qué significa para una clínica o un gimnasio con bot de WhatsApp, y por qué el aplazamiento del Digital Omnibus no te libra.",
  sources: [
    {
      label: "Comisión Europea — Obligaciones de transparencia del artículo 50",
      url: "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act",
    },
    {
      label: "Gibson Dunn — El acuerdo Omnibus y el aplazamiento del alto riesgo",
      url: "https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/",
    },
    {
      label: "Addleshaw Goddard — Qué deben saber las empresas antes del 2 de agosto de 2026",
      url: "https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/ai-transparency-ai-act-what-businesses-need-know-before-2-august-2026/",
    },
  ],
  body: [
    {
      type: "p",
      text: "Si en tu centro hay un [bot que responde por WhatsApp](/blog/whatsapp-agenda-clinica-automatizacion), un chat en la web que contesta dudas o un asistente que gestiona reservas fuera de horario, desde el **2 de agosto de 2026** tienes una obligación legal nueva: la persona que está al otro lado tiene que saber que habla con una máquina.",
    },
    {
      type: "p",
      text: "No es una recomendación de buenas prácticas. Es el artículo 50 del Reglamento Europeo de Inteligencia Artificial, y ya está en vigor mientras lees esto.",
    },
    {
      type: "callout",
      title: "El malentendido que me estoy encontrando",
      text: "En julio se aprobó el llamado Digital Omnibus y medio sector entendió que el AI Act se había aplazado. Se aplazó una parte: la de los sistemas de alto riesgo, que se va a diciembre de 2027. Las obligaciones de transparencia del artículo 50 **no se movieron**. Siguen con su fecha original.",
    },
    { type: "h2", text: "Qué dice exactamente la norma" },
    {
      type: "p",
      text: "El artículo 50 cubre cuatro situaciones distintas. A un centro con cita previa le afecta sobre todo la primera, pero conviene conocer las cuatro:",
    },
    {
      type: "ol",
      items: [
        "**Sistemas que interactúan con personas.** Chatbots, voicebots, asistentes de reservas. Hay que informar de que se está tratando con una IA, salvo que resulte evidente para una persona razonablemente atenta.",
        "**Contenido generado o manipulado por IA.** Textos, imágenes, audio o vídeo sintéticos tienen que ir marcados de forma que una máquina pueda detectarlo.",
        "**Reconocimiento de emociones y categorización biométrica.** Hay que informar a las personas expuestas a esos sistemas.",
        "**Ultrafalsificaciones y textos de interés público.** Deben identificarse como generados artificialmente.",
      ],
    },
    {
      type: "p",
      text: "La expresión «salvo que resulte evidente» es la que más discusión genera, y yo no me apoyaría en ella. Que tu bot se llame «Asistente Virtual» no basta si luego escribe como una persona, tutea y firma con un nombre propio. La norma piensa en quien no está sobre aviso, no en ti, que sabes perfectamente lo que montaste.",
    },
    { type: "h2", text: "«Yo no he construido ningún bot, lo he contratado»" },
    {
      type: "p",
      text: "Da igual. Y este es el punto que más gente pasa por alto.",
    },
    {
      type: "p",
      text: "El reglamento distingue entre **proveedor**, quien desarrolla el sistema y lo pone en el mercado, y **responsable del despliegue**, quien lo usa bajo su propia autoridad. Si contrataste una herramienta de terceros y la pusiste a hablar con tus pacientes o tus socios, eres responsable del despliegue. La obligación de que el aviso llegue al usuario es tuya, no de la empresa que te vendió la licencia.",
    },
    {
      type: "p",
      text: "Dicho de otro modo: la mayoría de las pymes españolas están en esta categoría sin haberlo pedido. No han desarrollado nada, pero han desplegado algo.",
    },
    { type: "h2", text: "Qué tienes que hacer, en concreto" },
    {
      type: "p",
      text: "Lo bueno de esta obligación es que se cumple en una tarde. No hay que registrar nada, ni auditar nada, ni contratar a nadie. Hay que avisar.",
    },
    { type: "h3", text: "1. Haz inventario de lo que responde solo" },
    {
      type: "p",
      text: "Antes de redactar avisos, localiza todo lo que en tu centro contesta sin que haya una persona detrás:",
    },
    {
      type: "ul",
      items: [
        "El bot de WhatsApp, si lo tienes.",
        "El widget de chat de la web.",
        "Las respuestas automáticas de Instagram o Facebook, si van más allá de un mensaje fijo.",
        "Cualquier asistente de reservas o de recordatorios que genere texto propio.",
        "El buzón de voz inteligente, si transcribe y responde.",
      ],
    },
    {
      type: "p",
      text: "Una respuesta automática fija del tipo «Gracias por tu mensaje, te contestamos en horario de mañana» no es un sistema de IA y no entra aquí. Lo que entra es lo que genera respuestas distintas según lo que le escriban.",
    },
    { type: "h3", text: "2. Pon el aviso donde empieza la conversación" },
    {
      type: "p",
      text: "El aviso tiene que llegar **en el momento de la interacción**, no escondido en la política de privacidad. En la práctica, el primer mensaje del bot.",
    },
    {
      type: "p",
      text: "Tres formas que funcionan y no espantan a nadie:",
    },
    {
      type: "ul",
      items: [
        "«Hola, soy el asistente automático de [centro]. Te atiendo yo para lo rápido, y si necesitas hablar con alguien del equipo te paso.»",
        "«Este chat lo responde una IA. Para temas clínicos te derivo a una persona.»",
        "Una etiqueta permanente y visible en la cabecera del chat: **Asistente con IA**.",
      ],
    },
    {
      type: "p",
      text: "Evita el eufemismo. «Asistente inteligente» o «Sistema automatizado» son formas de no decirlo. Si alguien tiene que deducirlo, no lo has avisado.",
    },
    { type: "h3", text: "3. Deja siempre la puerta a una persona" },
    {
      type: "p",
      text: "Esto no lo exige el artículo 50, lo exige el sentido común y te lo va a agradecer quien te escriba. En un centro de salud, además, hay conversaciones que no debería sostener un bot ni aunque avise de que lo es. Una vía clara de escalado a una persona resuelve a la vez el cumplimiento y la experiencia.",
    },
    { type: "h2", text: "Lo que sí se aplazó, para que no te vendan urgencia de lo que no toca" },
    {
      type: "table",
      head: ["Obligación", "Fecha", "¿Se movió?"],
      rows: [
        ["Transparencia (artículo 50)", "2 de agosto de 2026", "No. En vigor"],
        ["Alto riesgo del anexo III", "2 de diciembre de 2027", "Sí, aplazada"],
        ["IA integrada en productos regulados", "2 de agosto de 2028", "Sí, aplazada"],
      ],
    },
    {
      type: "p",
      text: "El aplazamiento llegó por el Reglamento (UE) 2026/1744, publicado el 24 de julio de 2026 y en vigor desde el 27, seis días antes de la fecha que modificaba. Ese margen tan corto es parte de por qué hay tanta confusión.",
    },
    {
      type: "p",
      text: "Un centro de fisioterapia, un gimnasio o una clínica dental que usa un bot para reservas **no** opera un sistema de alto riesgo. Si alguien te está vendiendo una auditoría de alto riesgo para tu chatbot de citas, pídele que te señale el punto del anexo III donde encaja.",
    },
    { type: "h2", text: "Y si no lo hago, ¿qué pasa?" },
    {
      type: "p",
      text: "El reglamento prevé sanciones por incumplir las obligaciones de transparencia. Para pymes y startups se aplica la cifra menor de cada horquilla, una de las pocas concesiones explícitas al tamaño de la empresa que hay en todo el texto.",
    },
    {
      type: "p",
      text: "Pero seré honesto contigo sobre el riesgo real: no espero una oleada de inspecciones a clínicas de barrio por el aviso de un chatbot. El motivo para hacerlo no es el miedo a la multa. Es que cuesta una tarde, y que el día que alguien se moleste porque creía estar hablando con tu recepcionista, el problema no va a ser regulatorio. Va a ser que esa persona no vuelve.",
    },
    { type: "h2", text: "Resumen" },
    {
      type: "ul",
      items: [
        "El artículo 50 del AI Act está **en vigor desde el 2 de agosto de 2026**.",
        "Si tu bot habla con personas, tienen que saber que es un bot, desde el primer mensaje.",
        "Eres responsable **aunque hayas contratado la herramienta a un tercero**.",
        "El aplazamiento del Digital Omnibus afecta al alto riesgo, no a esto.",
        "Se arregla en una tarde: inventario, aviso al inicio y salida hacia una persona.",
      ],
    },
    {
      type: "callout",
      title: "Si no sabes por dónde empezar",
      text: "Cuéntame cómo tienes montada la atención automática en tu centro y te digo qué entra en el artículo 50 y qué no. Si resulta que no te aplica nada, te lo diré igual.",
    },
  ],
};
