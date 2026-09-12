import type { Opcion, TipoProyecto, UsuariosOption } from "./types";

// Multiplicadores por escala de usuarios (suavizados para pymes/autonomos)
export const multiplicadoresUsuarios: Record<string, number> = {
  "< 50 usuarios": 1,
  "50-200 usuarios": 1.1,
  "200-1000 usuarios": 1.2,
  "> 1000 usuarios": 1.4,
};

// Precio adicional si necesita app móvil
export const precioAppAdicional = 3500;

export const tiposProyecto: TipoProyecto[] = [
  {
    id: "web",
    title: "Tu web, la base de todo",
    description: "Una web profesional para mostrar tu negocio, pensada para conectar reservas, CRM o facturación después, sin rehacerla de cero.",
    benefit: "Ideal para empezar",
    badge: null,
    complexity: 1,
    precio: 1200,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    id: "crm",
    title: "Sistema de gestión (CRM)",
    description: "Para gestionar clientes, citas, historiales y seguimientos. Con o sin web pública.",
    benefit: "Organiza tu negocio",
    badge: "Popular",
    complexity: 2,
    precio: 2800,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "crm-facturacion",
    title: "Gestión + Facturación",
    description: "CRM completo más facturación, control de cobros e informes financieros.",
    benefit: "Control total de cuentas",
    badge: null,
    complexity: 3,
    precio: 4500,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    id: "app-clientes",
    title: "App para tus clientes",
    description: "App móvil donde tus clientes reservan, ven su historial y se comunican contigo.",
    benefit: "Fideliza clientes",
    badge: null,
    complexity: 3,
    precio: 5500,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    id: "proyecto-completo",
    title: "Proyecto completo",
    description: "Web + CRM + Facturación + App. La solución integral para digitalizar tu negocio.",
    benefit: "Máxima eficiencia",
    badge: "Recomendado",
    complexity: 5,
    precio: 9500,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    id: "otro",
    title: "Otro proyecto",
    description: "¿Tienes una idea diferente? Cuéntanos y la hacemos realidad.",
    benefit: "A tu medida",
    badge: null,
    complexity: 0,
    precio: 0,
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

export const funcionalidadesPorTipo: Record<string, Opcion[]> = {
  web: [
    { id: "paginas-info", label: "Páginas informativas", description: "Inicio, servicios, equipo, ubicación...", precio: 0 },
    { id: "galeria", label: "Galería de fotos", description: "Muestra tu local, equipo o trabajos realizados", precio: 200 },
    { id: "formulario-contacto", label: "Formulario de contacto", description: "Que los visitantes te escriban desde la web", precio: 0 },
    { id: "reserva-online", label: "Reserva de citas online", description: "Calendario para que reserven directamente", precio: 600 },
    { id: "blog", label: "Blog / Noticias", description: "Publica contenido y mejora tu posicionamiento", precio: 400 },
    { id: "testimonios", label: "Testimonios y reseñas", description: "Muestra opiniones de tus clientes", precio: 150 },
    { id: "chat-whatsapp", label: "Botón de WhatsApp", description: "Contacto directo desde la web", precio: 50 },
    { id: "redes-sociales", label: "Integración redes sociales", description: "Enlaces e Instagram feed", precio: 150 },
  ],
  crm: [
    { id: "fichas-clientes", label: "¿Tienes los datos de tus clientes desperdigados?", description: "Todo en una ficha: datos, historial y notas en un solo sitio.", precio: 0 },
    { id: "agenda-citas", label: "¿Sigues apuntando citas a mano o en varios sitios?", description: "Un calendario visual único para gestionar todas tus reservas.", precio: 0 },
    { id: "historial-visitas", label: "¿Te cuesta recordar qué le hiciste a cada cliente la última vez?", description: "Registro automático de cada visita e interacción.", precio: 300 },
    { id: "recordatorios", label: "¿Se te olvidan citas o tienes que perseguir a la gente?", description: "Recordatorios automáticos por email o SMS antes de cada cita.", precio: 400 },
    { id: "busqueda-filtros", label: "¿Tardas en encontrar a un cliente entre cientos?", description: "Búsqueda y filtros instantáneos.", precio: 0 },
    { id: "notas-internas", label: "¿Necesitas dejar notas privadas sobre un cliente?", description: "Apuntes internos que solo ve tu equipo.", precio: 0 },
    { id: "multiusuario", label: "¿Trabajáis varias personas y necesitáis acceso a la vez?", description: "Acceso para todo el equipo, con permisos por persona.", precio: 500 },
    { id: "exportar-datos", label: "¿Necesitas sacar tus datos a Excel o para tu gestor?", description: "Exporta listados en Excel o PDF cuando quieras.", precio: 250 },
  ],
  "crm-facturacion": [
    { id: "fichas-clientes", label: "¿Tienes los datos de tus clientes desperdigados?", description: "Todo en una ficha: datos, historial y notas en un solo sitio.", precio: 0 },
    { id: "agenda-citas", label: "¿Sigues apuntando citas a mano o en varios sitios?", description: "Un calendario visual único para gestionar todas tus reservas.", precio: 0 },
    { id: "facturas", label: "¿Pierdes tiempo haciendo facturas una a una?", description: "Genera facturas en segundos, con los datos ya cargados.", precio: 0 },
    { id: "control-cobros", label: "¿No sabes de un vistazo quién te ha pagado y quién no?", description: "Ve quién debe y quién ha pagado, sin buscar.", precio: 0 },
    { id: "cuotas-recurrentes", label: "¿Cobras una cuota fija y te toca facturarla a mano cada vez?", description: "Facturación automática recurrente, cada mes solo.", precio: 400 },
    { id: "informes-financieros", label: "¿No tienes claro cuánto facturas cada mes?", description: "Resumen de ingresos por periodo, siempre a mano.", precio: 350 },
    { id: "recordatorios-pago", label: "¿Tienes que perseguir a clientes que no pagan?", description: "Avisos automáticos a quien tenga un pago pendiente.", precio: 300 },
    { id: "exportar-gestor", label: "¿Tu gestor te pide los datos en un formato concreto?", description: "Exportación lista para tu asesor fiscal.", precio: 200 },
  ],
  "app-clientes": [
    { id: "reserva-movil", label: "¿Quieres que reserven desde el móvil sin llamarte?", description: "Tus clientes reservan cuando quieran, desde la app.", precio: 0 },
    { id: "ver-historial", label: "¿Te preguntan siempre qué se hicieron la última vez?", description: "El cliente ve su propio historial en la app.", precio: 0 },
    { id: "notificaciones-push", label: "¿Quieres avisarles de una cita o promoción al momento?", description: "Notificaciones push directas al móvil.", precio: 500 },
    { id: "chat-interno", label: "¿Te escriben por mil sitios distintos para consultarte algo?", description: "Chat directo dentro de la app, todo centralizado.", precio: 800 },
    { id: "pagos-app", label: "¿Quieres que paguen sin salir de la app?", description: "Pago de citas o cuotas desde el móvil.", precio: 600 },
    { id: "valoraciones", label: "¿Te gustaría que puntuaran su experiencia?", description: "Valoraciones dentro de la propia app.", precio: 300 },
    { id: "programa-fidelidad", label: "¿Quieres premiar a los clientes que repiten?", description: "Puntos, descuentos y recompensas automáticas.", precio: 700 },
    { id: "perfil-cliente", label: "¿Necesitas guardar preferencias de cada cliente?", description: "Perfil con sus datos y preferencias a mano.", precio: 0 },
  ],
  "proyecto-completo": [
    { id: "web-completa", label: "Necesitas una web profesional completa", description: "Todas las secciones que necesites, incluidas.", precio: 0 },
    { id: "crm-completo", label: "Necesitas gestionar clientes, citas e historial", description: "CRM completo: clientes, citas, historial, notas...", precio: 0 },
    { id: "facturacion-completa", label: "Necesitas facturar y controlar cobros", description: "Facturación integrada: facturas, cobros, informes...", precio: 0 },
    { id: "app-ios-android", label: "Quieres una app para tus clientes", description: "Aplicación nativa para iOS y Android.", precio: 0 },
    { id: "panel-admin", label: "Quieres controlarlo todo desde un solo sitio", description: "Panel de administración centralizado.", precio: 0 },
    { id: "analiticas", label: "¿Quieres saber qué funciona y qué no en tu negocio?", description: "Métricas de negocio en tiempo real.", precio: 800 },
    { id: "automatizaciones", label: "¿Hay tareas repetitivas que te gustaría que se hicieran solas?", description: "Automatiza lo que hoy haces a mano.", precio: 1200 },
    { id: "soporte-prioritario", label: "¿Necesitas atención preferente tras el lanzamiento?", description: "Soporte prioritario post-lanzamiento.", precio: 500 },
  ],
  otro: [
    { id: "personalizado", label: "Funcionalidad personalizada", description: "Descríbela en el campo de abajo", precio: 0 },
  ],
};

export const integracionesPorTipo: Record<string, Opcion[]> = {
  web: [
    { id: "google-analytics", label: "Google Analytics", description: "Estadísticas de visitas y comportamiento", precio: 100 },
    { id: "google-maps", label: "Google Maps", description: "Mapa con tu ubicación en la web", precio: 50 },
    { id: "redes-sociales", label: "Redes sociales", description: "Instagram, Facebook, TikTok...", precio: 100 },
    { id: "mailchimp", label: "Email marketing", description: "Mailchimp, Brevo, ActiveCampaign...", precio: 250 },
    { id: "calendly", label: "Calendario externo", description: "Calendly, Cal.com o similar", precio: 200 },
    { id: "chat-bot", label: "Chat o chatbot", description: "Intercom, Tidio, WhatsApp Business...", precio: 300 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  crm: [
    { id: "google-calendar", label: "¿Vives pegado a Google Calendar?", description: "Sincroniza tus citas automáticamente.", precio: 200 },
    { id: "email-proveedor", label: "¿Quieres que los avisos salgan desde tu propio correo?", description: "Conecta Gmail, Outlook o tu SMTP.", precio: 150 },
    { id: "sms", label: "¿Prefieres avisar por SMS en vez de email?", description: "Envío de mensajes de texto a tus clientes.", precio: 300 },
    { id: "whatsapp-api", label: "¿Tus clientes te escriben por WhatsApp para pedir cita?", description: "Mensajes automáticos por WhatsApp Business.", precio: 500 },
    { id: "firma-digital", label: "¿Necesitas que firmen documentos sin venir en persona?", description: "Firma electrónica con Signaturit, DocuSign...", precio: 400 },
    { id: "importar-excel", label: "¿Tienes ya tus clientes en una hoja de Excel?", description: "Migramos tus datos actuales, sin teclearlos de nuevo.", precio: 200 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  "crm-facturacion": [
    { id: "pasarela-pagos", label: "¿Quieres que te puedan pagar online directamente?", description: "Stripe, Redsys, PayPal...", precio: 400 },
    { id: "contabilidad", label: "¿Ya usas un software de contabilidad?", description: "Conecta con A3, Sage, Holded, Factorial...", precio: 600 },
    { id: "banco", label: "¿Te toca cuadrar a mano lo que cobras con tu banco?", description: "Conciliación automática con tu cuenta bancaria.", precio: 800 },
    { id: "facturae", label: "¿Necesitas emitir factura electrónica homologada?", description: "FacturaE, Veri*Factu y normativa vigente.", precio: 350 },
    { id: "google-calendar", label: "¿Vives pegado a Google Calendar?", description: "Sincroniza tus citas automáticamente.", precio: 200 },
    { id: "sms", label: "¿Quieres avisar por SMS o WhatsApp de un cobro pendiente?", description: "Recordatorios de pago automáticos.", precio: 300 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  "app-clientes": [
    { id: "notificaciones-push", label: "¿Necesitas enviar avisos push de verdad, no solo dentro de la app?", description: "Infraestructura de notificaciones (Firebase, OneSignal).", precio: 300 },
    { id: "pasarela-pagos", label: "¿Van a pagar con tarjeta o Apple/Google Pay desde el móvil?", description: "Stripe, Apple Pay, Google Pay...", precio: 500 },
    { id: "calendario-nativo", label: "¿Quieres que la cita se añada sola al calendario del móvil?", description: "Añadir citas directamente al calendario nativo.", precio: 200 },
    { id: "healthkit", label: "¿Trabajas con datos de salud de tus clientes?", description: "Conexión con Apple Health o Google Fit.", precio: 600 },
    { id: "wearables", label: "¿Tus clientes usan smartwatch o pulsera de actividad?", description: "Datos de wearables conectados a tu app.", precio: 800 },
    { id: "crm-existente", label: "¿Ya tienes un CRM y quieres conectarlo?", description: "Conectamos con el sistema que ya usas.", precio: 500 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  "proyecto-completo": [
    { id: "pasarela-pagos", label: "¿Quieres que te puedan pagar online directamente?", description: "Stripe, Redsys, PayPal...", precio: 400 },
    { id: "contabilidad", label: "¿Ya usas un software de contabilidad?", description: "Conecta con A3, Sage, Holded, Factorial...", precio: 600 },
    { id: "google-workspace", label: "¿Trabajáis con Google Workspace?", description: "Calendar, Gmail, Drive...", precio: 300 },
    { id: "sms-whatsapp", label: "¿Quieres avisar por SMS y WhatsApp además de email?", description: "Comunicación multicanal con tus clientes.", precio: 400 },
    { id: "firma-digital", label: "¿Necesitas que firmen documentos sin venir en persona?", description: "Firma electrónica con Signaturit, DocuSign...", precio: 400 },
    { id: "analiticas", label: "¿Quieres saber qué funciona y qué no en tu negocio?", description: "Google Analytics, Mixpanel...", precio: 350 },
    { id: "api-externa", label: "¿Necesitas conectar con algo más específico?", description: "Otras integraciones a medida.", precio: 500 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  otro: [
    { id: "personalizado", label: "Integración personalizada", description: "Descríbela en el campo de abajo", precio: 0 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
};

export const usuariosOptions: UsuariosOption[] = [
  { id: "pequeno", label: "Pequeño", description: "Hasta 50 usuarios", value: "< 50 usuarios" },
  { id: "mediano", label: "Mediano", description: "50 - 200 usuarios", value: "50-200 usuarios" },
  { id: "grande", label: "Grande", description: "200 - 1000 usuarios", value: "200-1000 usuarios" },
  { id: "enterprise", label: "Enterprise", description: "Más de 1000 usuarios", value: "> 1000 usuarios" },
];
