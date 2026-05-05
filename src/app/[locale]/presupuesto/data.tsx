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
    title: "Solo página web",
    description: "Una web profesional para mostrar tu negocio, servicios y contacto. Sin sistema de gestión.",
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
    { id: "fichas-clientes", label: "Fichas de clientes", description: "Datos personales, historial, notas...", precio: 0 },
    { id: "agenda-citas", label: "Agenda de citas", description: "Calendario visual para gestionar reservas", precio: 0 },
    { id: "historial-visitas", label: "Historial de visitas", description: "Registro de cada interacción con el cliente", precio: 300 },
    { id: "recordatorios", label: "Recordatorios automáticos", description: "SMS/Email para citas y seguimientos", precio: 400 },
    { id: "busqueda-filtros", label: "Búsqueda y filtros", description: "Encuentra clientes rápidamente", precio: 0 },
    { id: "notas-internas", label: "Notas internas", description: "Apuntes privados sobre cada cliente", precio: 0 },
    { id: "multiusuario", label: "Varios usuarios", description: "Acceso para todo el equipo con permisos", precio: 500 },
    { id: "exportar-datos", label: "Exportar datos", description: "Descarga listados en Excel o PDF", precio: 250 },
  ],
  "crm-facturacion": [
    { id: "fichas-clientes", label: "Fichas de clientes", description: "Datos personales, historial, notas...", precio: 0 },
    { id: "agenda-citas", label: "Agenda de citas", description: "Calendario visual para gestionar reservas", precio: 0 },
    { id: "facturas", label: "Emisión de facturas", description: "Crea facturas en segundos", precio: 0 },
    { id: "control-cobros", label: "Control de cobros", description: "Ve quien te debe y quien ha pagado", precio: 0 },
    { id: "cuotas-recurrentes", label: "Cuotas recurrentes", description: "Facturación automática mensual", precio: 400 },
    { id: "informes-financieros", label: "Informes financieros", description: "Resumen de ingresos por periodo", precio: 350 },
    { id: "recordatorios-pago", label: "Recordatorios de pago", description: "Avisa a clientes con pagos pendientes", precio: 300 },
    { id: "exportar-gestor", label: "Exportar para gestor", description: "Datos listos para tu asesor fiscal", precio: 200 },
  ],
  "app-clientes": [
    { id: "reserva-movil", label: "Reserva desde el móvil", description: "Tus clientes reservan cuando quieran", precio: 0 },
    { id: "ver-historial", label: "Ver su historial", description: "El cliente ve sus visitas y tratamientos", precio: 0 },
    { id: "notificaciones-push", label: "Notificaciones push", description: "Avisos de citas y promociones", precio: 500 },
    { id: "chat-interno", label: "Chat con el centro", description: "Mensajería directa cliente-profesional", precio: 800 },
    { id: "pagos-app", label: "Pagos desde la app", description: "Pagar citas o cuotas desde el móvil", precio: 600 },
    { id: "valoraciones", label: "Valoraciones", description: "Los clientes puntúan su experiencia", precio: 300 },
    { id: "programa-fidelidad", label: "Programa de fidelidad", description: "Puntos, descuentos, recompensas", precio: 700 },
    { id: "perfil-cliente", label: "Perfil del cliente", description: "Datos personales y preferencias", precio: 0 },
  ],
  "proyecto-completo": [
    { id: "web-completa", label: "Web profesional completa", description: "Todas las secciones que necesites", precio: 0 },
    { id: "crm-completo", label: "CRM de gestión", description: "Clientes, citas, historial, notas...", precio: 0 },
    { id: "facturacion-completa", label: "Facturación integrada", description: "Facturas, cobros, informes...", precio: 0 },
    { id: "app-ios-android", label: "App iOS y Android", description: "Aplicación nativa para tus clientes", precio: 0 },
    { id: "panel-admin", label: "Panel de administración", description: "Controla todo desde un solo sitio", precio: 0 },
    { id: "analiticas", label: "Analíticas avanzadas", description: "Métricas de negocio en tiempo real", precio: 800 },
    { id: "automatizaciones", label: "Automatizaciones", description: "Tareas que se hacen solas", precio: 1200 },
    { id: "soporte-prioritario", label: "Soporte prioritario", description: "Atención preferente post-lanzamiento", precio: 500 },
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
    { id: "google-calendar", label: "Google Calendar", description: "Sincroniza citas con tu calendario", precio: 200 },
    { id: "email-proveedor", label: "Email automático", description: "Gmail, Outlook, SMTP propio...", precio: 150 },
    { id: "sms", label: "SMS", description: "Envío de mensajes de texto", precio: 300 },
    { id: "whatsapp-api", label: "WhatsApp Business API", description: "Mensajes automáticos por WhatsApp", precio: 500 },
    { id: "firma-digital", label: "Firma electrónica", description: "Signaturit, DocuSign...", precio: 400 },
    { id: "importar-excel", label: "Importar desde Excel", description: "Migrar datos de hojas de cálculo", precio: 200 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  "crm-facturacion": [
    { id: "pasarela-pagos", label: "Pasarela de pagos", description: "Stripe, Redsys, PayPal...", precio: 400 },
    { id: "contabilidad", label: "Software contable", description: "A3, Sage, Holded, Factorial...", precio: 600 },
    { id: "banco", label: "Conciliación bancaria", description: "Conexión con tu banco", precio: 800 },
    { id: "facturae", label: "Factura electrónica", description: "FacturaE, Veri*factu...", precio: 350 },
    { id: "google-calendar", label: "Google Calendar", description: "Sincroniza citas con tu calendario", precio: 200 },
    { id: "sms", label: "SMS / WhatsApp", description: "Recordatorios de pago", precio: 300 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  "app-clientes": [
    { id: "notificaciones-push", label: "Notificaciones push", description: "Firebase, OneSignal...", precio: 300 },
    { id: "pasarela-pagos", label: "Pagos en app", description: "Stripe, Apple Pay, Google Pay...", precio: 500 },
    { id: "calendario-nativo", label: "Calendario del móvil", description: "Añadir citas al calendario", precio: 200 },
    { id: "healthkit", label: "Datos de salud", description: "Apple Health, Google Fit", precio: 600 },
    { id: "wearables", label: "Wearables", description: "Smartwatch, pulseras de actividad", precio: 800 },
    { id: "crm-existente", label: "Tu CRM actual", description: "Conectar con sistema que ya usas", precio: 500 },
    { id: "ninguna", label: "Ninguna por ahora", description: "No necesito integraciones", precio: 0 },
  ],
  "proyecto-completo": [
    { id: "pasarela-pagos", label: "Pasarela de pagos", description: "Stripe, Redsys, PayPal...", precio: 400 },
    { id: "contabilidad", label: "Software contable", description: "A3, Sage, Holded, Factorial...", precio: 600 },
    { id: "google-workspace", label: "Google Workspace", description: "Calendar, Gmail, Drive...", precio: 300 },
    { id: "sms-whatsapp", label: "SMS y WhatsApp", description: "Comunicación multicanal", precio: 400 },
    { id: "firma-digital", label: "Firma electrónica", description: "Signaturit, DocuSign...", precio: 400 },
    { id: "analiticas", label: "Analíticas avanzadas", description: "Google Analytics, Mixpanel...", precio: 350 },
    { id: "api-externa", label: "APIs de terceros", description: "Otras integraciones específicas", precio: 500 },
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
