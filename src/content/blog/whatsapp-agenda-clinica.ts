import type { Article } from "./types";

export const article: Article = {
  slug: "whatsapp-agenda-clinica-automatizacion",
  image: "/images/blog/whatsapp-agenda-clinica.webp",
  title: "Tu clínica no necesita otro chatbot: necesita que WhatsApp y la agenda se entiendan",
  seoTitle: "WhatsApp y la agenda de tu clínica, unidos",
  excerpt:
    "Responder mensajes más rápido no arregla una operativa rota. El ahorro aparece cuando citas, recordatorios y cambios dejan de depender de copiar datos a mano.",
  category: "Automatización",
  date: "2026-09-17",
  readMinutes: 7,
  metaDescription:
    "Cómo conectar WhatsApp y la agenda de una clínica para automatizar citas, recordatorios y cancelaciones sin perder control ni trato humano.",
  sources: [],
  body: [
    {
      type: "p",
      text: "Un paciente pregunta por WhatsApp si queda hueco el jueves. Alguien abre la agenda, busca, responde, espera confirmación y vuelve a la agenda para reservar. Si el paciente cambia de idea, el recorrido empieza otra vez.",
    },
    {
      type: "p",
      text: "Poner un chatbot delante puede acelerar la primera respuesta. Pero si detrás una persona sigue copiando cada dato, [no has automatizado la gestión](/blog/cinco-herramientas-ia-no-son-operativa): solo has puesto una puerta más bonita.",
    },
    { type: "h2", text: "La diferencia entre responder y resolver" },
    {
      type: "p",
      text: "Un sistema útil no se limita a conversar. Consulta disponibilidad real, recoge los datos necesarios, crea o modifica la cita y deja constancia de lo ocurrido. La conversación y la agenda comparten una única versión de la información.",
    },
    {
      type: "table",
      head: ["Automatización superficial", "Automatización conectada"],
      rows: [
        ["Responde horarios generales", "Consulta huecos disponibles"],
        ["Pide que llamen para reservar", "Crea la cita con reglas definidas"],
        ["Envía un mensaje genérico", "Confirma fecha, profesional y servicio"],
        ["Deriva cualquier excepción", "Resuelve lo habitual y deriva lo sensible"],
      ],
    },
    { type: "h2", text: "Qué conviene automatizar primero" },
    {
      type: "ol",
      items: [
        "**Confirmaciones y recordatorios.** Son repetitivos, tienen reglas claras y evitan que el equipo persiga respuestas una por una.",
        "**Cambios y cancelaciones sencillas.** El paciente puede liberar un hueco sin esperar a que alguien lea el mensaje.",
        "**Preguntas operativas.** Dirección, preparación previa, formas de pago u horarios pueden resolverse sin consultar a recepción.",
        "**Recogida inicial de datos.** Solo los imprescindibles para gestionar la solicitud; la información clínica merece otro circuito y más cuidado.",
      ],
    },
    {
      type: "callout",
      title: "La regla que evita muchos problemas",
      text: "Automatiza decisiones con una respuesta previsible. Si el mensaje exige interpretar síntomas, valorar urgencia o manejar una situación delicada, debe llegar a una persona.",
    },
    { type: "h2", text: "El mapa mínimo antes de tocar tecnología" },
    {
      type: "p",
      text: "Antes de elegir una herramienta, dibuja el recorrido actual desde que entra el mensaje hasta que la cita queda cerrada. Anota quién interviene, qué aplicación abre, qué dato copia y dónde suele atascarse.",
    },
    {
      type: "ul",
      items: [
        "Canales por los que entran las solicitudes.",
        "Agenda que manda de verdad, aunque el equipo use otras por costumbre.",
        "Reglas de duración, profesional, sala y margen entre citas.",
        "Mensajes que puede resolver el sistema y mensajes que deben escalarse.",
        "Qué ocurre cuando una integración falla o no hay disponibilidad.",
      ],
    },
    { type: "h2", text: "Cómo implantarlo sin poner la agenda en riesgo" },
    {
      type: "p",
      text: "Empieza con un único servicio y un horario acotado. Durante unas semanas compara cada reserva automática con la agenda y registra los errores. Cuando el flujo sea estable, amplía a más profesionales o tipos de cita.",
    },
    {
      type: "p",
      text: "Mantén además una salida visible: si falta un dato, la agenda no responde o la persona pide ayuda, el sistema debe detenerse y pasar el contexto al equipo. Obligar al paciente a discutir con un bot no ahorra trabajo; lo desplaza y lo empeora.",
    },
    { type: "h2", text: "Qué medir para saber si funciona" },
    {
      type: "ul",
      items: [
        "Solicitudes resueltas sin intervención manual.",
        "Tiempo medio desde el primer mensaje hasta la cita confirmada.",
        "Cambios y cancelaciones procesados correctamente.",
        "Errores de agenda, duplicados y conversaciones derivadas.",
        "Horas semanales que recepción deja de dedicar a copiar información.",
      ],
    },
    {
      type: "p",
      text: "Si solo mejora el tiempo de respuesta pero el equipo sigue haciendo los mismos pasos, revisa el diseño. La tecnología está contestando; todavía no está resolviendo.",
    },
    {
      type: "callout",
      title: "Si quieres ordenar el recorrido",
      text: "Cuéntame cómo entran hoy las citas y qué agenda utilizáis. Antes de hablar de herramientas, podemos localizar el paso concreto que más tiempo consume y decidir si merece la pena automatizarlo.",
    },
  ],
};
