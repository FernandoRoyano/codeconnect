"use client";

import { useState } from "react";
import Button from "@/components/Button";

interface FormData {
  // Paso 1: Tipo de proyecto
  tipoProyecto: string;
  // Paso 2: Funcionalidades
  funcionalidades: string[];
  otraFuncionalidad: string;
  // Paso 3: Integraciones
  integraciones: string[];
  otraIntegracion: string;
  // Paso 4: Usuarios y escala
  numeroUsuarios: string;
  necesitaApp: boolean;
  // Paso 5: Contacto
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  comentarios: string;
}

// Multiplicadores por escala de usuarios
const multiplicadoresUsuarios: Record<string, number> = {
  "< 50 usuarios": 1,
  "50-200 usuarios": 1.2,
  "200-1000 usuarios": 1.5,
  "> 1000 usuarios": 2,
};

// Precio adicional si necesita app móvil
const precioAppAdicional = 6000;

const tiposProyecto = [
  {
    id: "web",
    title: "Solo página web",
    description: "Una web profesional para mostrar tu negocio, servicios y contacto. Sin sistema de gestión.",
    benefit: "Ideal para empezar",
    badge: null,
    complexity: 1,
    precio: 1500,
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
    precio: 3500,
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
    precio: 5500,
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
    precio: 8000,
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
    precio: 15000,
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

// Funcionalidades específicas por tipo de proyecto (con precios)
const funcionalidadesPorTipo: Record<string, { id: string; label: string; description: string; precio: number }[]> = {
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

// Integraciones específicas por tipo de proyecto (con precios)
const integracionesPorTipo: Record<string, { id: string; label: string; description: string; precio: number }[]> = {
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

const usuariosOptions = [
  { id: "pequeno", label: "Pequeño", description: "Hasta 50 usuarios", value: "< 50 usuarios" },
  { id: "mediano", label: "Mediano", description: "50 - 200 usuarios", value: "50-200 usuarios" },
  { id: "grande", label: "Grande", description: "200 - 1000 usuarios", value: "200-1000 usuarios" },
  { id: "enterprise", label: "Enterprise", description: "Más de 1000 usuarios", value: "> 1000 usuarios" },
];

export default function PresupuestoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tipoProyecto: "",
    funcionalidades: [],
    otraFuncionalidad: "",
    integraciones: [],
    otraIntegracion: "",
    numeroUsuarios: "",
    necesitaApp: false,
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    comentarios: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;

  const handleTipoProyecto = (id: string) => {
    // Limpiar funcionalidades e integraciones al cambiar de tipo de proyecto
    setFormData({
      ...formData,
      tipoProyecto: id,
      funcionalidades: [],
      otraFuncionalidad: "",
      integraciones: [],
      otraIntegracion: ""
    });
  };

  const handleFuncionalidad = (id: string) => {
    const newFuncionalidades = formData.funcionalidades.includes(id)
      ? formData.funcionalidades.filter((f) => f !== id)
      : [...formData.funcionalidades, id];
    setFormData({ ...formData, funcionalidades: newFuncionalidades });
  };

  const handleIntegracion = (id: string) => {
    const newIntegraciones = formData.integraciones.includes(id)
      ? formData.integraciones.filter((i) => i !== id)
      : [...formData.integraciones, id];
    setFormData({ ...formData, integraciones: newIntegraciones });
  };

  const handleUsuarios = (value: string) => {
    setFormData({ ...formData, numeroUsuarios: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.tipoProyecto !== "";
      case 2:
        return formData.funcionalidades.length > 0 || formData.otraFuncionalidad.trim() !== "";
      case 3:
        return formData.integraciones.length > 0 || formData.otraIntegracion.trim() !== "";
      case 4:
        // Si es web u otro, no necesita usuarios (se salta este paso)
        if (formData.tipoProyecto === "web" || formData.tipoProyecto === "otro") {
          return true;
        }
        return formData.numeroUsuarios !== "";
      case 5:
        return formData.nombre !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  // Obtener funcionalidades según el tipo de proyecto seleccionado
  const getFuncionalidadesActuales = () => {
    return funcionalidadesPorTipo[formData.tipoProyecto] || [];
  };

  // Obtener integraciones según el tipo de proyecto seleccionado
  const getIntegracionesActuales = () => {
    return integracionesPorTipo[formData.tipoProyecto] || [];
  };

  // Calcular el presupuesto total
  const calcularPresupuesto = () => {
    const tipoProyectoData = tiposProyecto.find(t => t.id === formData.tipoProyecto);
    const precioBase = tipoProyectoData?.precio || 0;

    // Sumar funcionalidades
    const funcionalidades = getFuncionalidadesActuales();
    const precioFuncionalidades = formData.funcionalidades.reduce((total, funcId) => {
      const func = funcionalidades.find(f => f.id === funcId);
      return total + (func?.precio || 0);
    }, 0);

    // Sumar integraciones
    const integraciones = getIntegracionesActuales();
    const precioIntegraciones = formData.integraciones.reduce((total, intId) => {
      const integ = integraciones.find(i => i.id === intId);
      return total + (integ?.precio || 0);
    }, 0);

    // Subtotal antes de multiplicador
    const subtotal = precioBase + precioFuncionalidades + precioIntegraciones;

    // Aplicar multiplicador por escala de usuarios
    const multiplicador = multiplicadoresUsuarios[formData.numeroUsuarios] || 1;
    const totalConMultiplicador = subtotal * multiplicador;

    // Añadir precio de app adicional si aplica
    const precioApp = formData.necesitaApp && formData.tipoProyecto !== "app-clientes" && formData.tipoProyecto !== "proyecto-completo"
      ? precioAppAdicional
      : 0;

    const total = totalConMultiplicador + precioApp;

    return {
      precioBase,
      precioFuncionalidades,
      precioIntegraciones,
      subtotal,
      multiplicador,
      precioApp,
      total,
    };
  };

  // Formatear precio
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(precio);
  };

  // Generar HTML del presupuesto
  const generarHTMLPresupuesto = () => {
    const presupuesto = calcularPresupuesto();
    const tipoProyectoData = tiposProyecto.find(t => t.id === formData.tipoProyecto);
    const funcionalidades = getFuncionalidadesActuales();
    const integraciones = getIntegracionesActuales();
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    const funcionalidadesSeleccionadas = formData.funcionalidades.map(id => funcionalidades.find(f => f.id === id)).filter(Boolean);
    const integracionesSeleccionadas = formData.integraciones.map(id => integraciones.find(i => i.id === id)).filter(Boolean);

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presupuesto CodeConnect - ${formData.empresa || formData.nombre}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; color: #333; line-height: 1.6; background: #f8f9fa; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: linear-gradient(135deg, #194973 0%, #0f3150 100%); color: white; padding: 40px; }
    .header h1 { font-size: 28px; margin-bottom: 8px; }
    .header p { opacity: 0.9; }
    .logo { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .logo-circle { width: 24px; height: 24px; border-radius: 50%; }
    .logo-green { background: #71C648; }
    .logo-blue { background: #194973; border: 2px solid white; margin-left: -12px; }
    .content { padding: 40px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #71C648; margin-bottom: 12px; font-weight: 600; }
    .client-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .info-item { }
    .info-label { font-size: 12px; color: #666; }
    .info-value { font-weight: 600; color: #194973; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .table th { text-align: left; padding: 12px; background: #f8f9fa; color: #194973; font-weight: 600; border-bottom: 2px solid #e0e0e0; }
    .table td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
    .table .price { text-align: right; font-weight: 500; }
    .table .included { color: #71C648; font-size: 12px; }
    .totals { background: #f8f9fa; padding: 24px; border-radius: 12px; margin-top: 30px; }
    .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .total-row.subtotal { border-top: 1px solid #e0e0e0; padding-top: 16px; margin-top: 8px; }
    .total-row.final { font-size: 24px; font-weight: bold; color: #194973; border-top: 2px solid #194973; padding-top: 16px; margin-top: 16px; }
    .total-row .label { color: #666; }
    .total-row.final .label { color: #194973; }
    .badge { display: inline-block; background: #71C648; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .notes { background: #fff9e6; border-left: 4px solid #f5a623; padding: 16px; border-radius: 0 8px 8px 0; margin-top: 30px; }
    .notes-title { font-weight: 600; color: #f5a623; margin-bottom: 8px; }
    .footer { text-align: center; padding: 30px; color: #666; font-size: 14px; }
    .footer a { color: #71C648; text-decoration: none; }
    .validity { background: #e8f5e9; padding: 12px 16px; border-radius: 8px; text-align: center; color: #2e7d32; font-weight: 500; margin-top: 20px; }
    @media print {
      body { background: white; }
      .container { padding: 0; }
      .card { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">
          <span style="font-size: 24px; font-weight: bold;">Code</span>
          <div class="logo-circle logo-green"></div>
          <div class="logo-circle logo-blue"></div>
          <span style="font-size: 24px; font-weight: bold;">nnect</span>
        </div>
        <h1>Presupuesto</h1>
        <p>${fecha}</p>
      </div>

      <div class="content">
        <div class="section">
          <div class="section-title">Datos del cliente</div>
          <div class="client-info">
            <div class="info-item">
              <div class="info-label">Nombre</div>
              <div class="info-value">${formData.nombre}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value">${formData.email}</div>
            </div>
            ${formData.empresa ? `
            <div class="info-item">
              <div class="info-label">Empresa</div>
              <div class="info-value">${formData.empresa}</div>
            </div>` : ''}
            ${formData.telefono ? `
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value">${formData.telefono}</div>
            </div>` : ''}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Tipo de proyecto</div>
          <table class="table">
            <tr>
              <td><strong>${tipoProyectoData?.title}</strong><br><span style="color: #666; font-size: 14px;">${tipoProyectoData?.description}</span></td>
              <td class="price">${presupuesto.precioBase > 0 ? formatearPrecio(presupuesto.precioBase) : '<span class="badge">A consultar</span>'}</td>
            </tr>
          </table>
        </div>

        ${funcionalidadesSeleccionadas.length > 0 ? `
        <div class="section">
          <div class="section-title">Funcionalidades</div>
          <table class="table">
            <thead>
              <tr>
                <th>Funcionalidad</th>
                <th style="text-align: right;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${funcionalidadesSeleccionadas.map(f => `
              <tr>
                <td>${f?.label}</td>
                <td class="price">${f?.precio ? formatearPrecio(f.precio) : '<span class="included">Incluido</span>'}</td>
              </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ` : ''}

        ${integracionesSeleccionadas.length > 0 && !integracionesSeleccionadas.every(i => i?.id === 'ninguna') ? `
        <div class="section">
          <div class="section-title">Integraciones</div>
          <table class="table">
            <thead>
              <tr>
                <th>Integración</th>
                <th style="text-align: right;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${integracionesSeleccionadas.filter(i => i?.id !== 'ninguna').map(i => `
              <tr>
                <td>${i?.label}</td>
                <td class="price">${i?.precio ? formatearPrecio(i.precio) : '<span class="included">Incluido</span>'}</td>
              </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ` : ''}

        <div class="totals">
          <div class="total-row">
            <span class="label">Precio base (${tipoProyectoData?.title})</span>
            <span>${formatearPrecio(presupuesto.precioBase)}</span>
          </div>
          ${presupuesto.precioFuncionalidades > 0 ? `
          <div class="total-row">
            <span class="label">Funcionalidades adicionales</span>
            <span>+${formatearPrecio(presupuesto.precioFuncionalidades)}</span>
          </div>
          ` : ''}
          ${presupuesto.precioIntegraciones > 0 ? `
          <div class="total-row">
            <span class="label">Integraciones</span>
            <span>+${formatearPrecio(presupuesto.precioIntegraciones)}</span>
          </div>
          ` : ''}
          ${presupuesto.multiplicador > 1 ? `
          <div class="total-row subtotal">
            <span class="label">Subtotal</span>
            <span>${formatearPrecio(presupuesto.subtotal)}</span>
          </div>
          <div class="total-row">
            <span class="label">Ajuste por escala (${formData.numeroUsuarios}) x${presupuesto.multiplicador}</span>
            <span>+${formatearPrecio(presupuesto.subtotal * (presupuesto.multiplicador - 1))}</span>
          </div>
          ` : ''}
          ${presupuesto.precioApp > 0 ? `
          <div class="total-row">
            <span class="label">App móvil adicional (iOS + Android)</span>
            <span>+${formatearPrecio(presupuesto.precioApp)}</span>
          </div>
          ` : ''}
          <div class="total-row final">
            <span class="label">Total estimado</span>
            <span>${formData.tipoProyecto === 'otro' ? 'A consultar' : formatearPrecio(presupuesto.total)}</span>
          </div>
        </div>

        ${formData.otraFuncionalidad || formData.otraIntegracion || formData.comentarios ? `
        <div class="notes">
          <div class="notes-title">Notas adicionales</div>
          ${formData.otraFuncionalidad ? `<p><strong>Funcionalidad personalizada:</strong> ${formData.otraFuncionalidad}</p>` : ''}
          ${formData.otraIntegracion ? `<p><strong>Integración personalizada:</strong> ${formData.otraIntegracion}</p>` : ''}
          ${formData.comentarios ? `<p><strong>Comentarios:</strong> ${formData.comentarios}</p>` : ''}
        </div>
        ` : ''}

        <div class="validity">
          Este presupuesto tiene una validez de 30 días desde la fecha de emisión
        </div>
      </div>

      <div class="footer">
        <p>CodeConnect - Conectando ideas, creando soluciones</p>
        <p><a href="mailto:info@codeconnect.es">info@codeconnect.es</a> | <a href="https://codeconnect.es">codeconnect.es</a></p>
      </div>
    </div>
  </div>
</body>
</html>
    `;
  };

  // Descargar presupuesto como HTML
  const descargarPresupuesto = () => {
    const html = generarHTMLPresupuesto();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presupuesto-codeconnect-${formData.empresa || formData.nombre || 'cliente'}.html`.toLowerCase().replace(/\s+/g, '-');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Abrir presupuesto en nueva ventana para imprimir
  const imprimirPresupuesto = () => {
    const html = generarHTMLPresupuesto();
    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(html);
      ventana.document.close();
      setTimeout(() => ventana.print(), 500);
    }
  };

  // Determinar si el paso de usuarios aplica al tipo de proyecto
  const necesitaPasoUsuarios = () => {
    // Solo preguntamos por usuarios en proyectos que tienen usuarios registrados
    return formData.tipoProyecto !== "web" && formData.tipoProyecto !== "otro";
  };

  const nextStep = () => {
    if (currentStep < totalSteps && canProceed()) {
      let nextStepNum = currentStep + 1;
      // Saltar paso 4 (usuarios) si no aplica
      if (nextStepNum === 4 && !necesitaPasoUsuarios()) {
        nextStepNum = 5;
      }
      setCurrentStep(nextStepNum);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      let prevStepNum = currentStep - 1;
      // Saltar paso 4 (usuarios) si no aplica al volver atrás
      if (prevStepNum === 4 && !necesitaPasoUsuarios()) {
        prevStepNum = 3;
      }
      setCurrentStep(prevStepNum);
    }
  };

  if (submitted) {
    const presupuesto = calcularPresupuesto();
    const tipoProyectoData = tiposProyecto.find(t => t.id === formData.tipoProyecto);
    const funcionalidadesSeleccionadas = formData.funcionalidades.map(id =>
      getFuncionalidadesActuales().find(f => f.id === id)
    ).filter(Boolean);
    const integracionesSeleccionadas = formData.integraciones.map(id =>
      getIntegracionesActuales().find(i => i.id === id)
    ).filter(Boolean);

    return (
      <>
        <section className="pt-28 sm:pt-32 pb-16 bg-gradient-to-br from-[#194973] to-[#0f3150] min-h-screen">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#71C648] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                ¡Tu presupuesto está listo!
              </h1>
              <p className="text-gray-300">
                Revisa el detalle y descárgalo o imprímelo
              </p>
            </div>

            {/* Presupuesto Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#194973] to-[#0f3150] p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">{tipoProyectoData?.title}</h2>
                    <p className="text-gray-300 text-sm">{tipoProyectoData?.description}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-sm text-gray-300">Precio base</span>
                    <div className="text-xl sm:text-2xl font-bold">
                      {presupuesto.precioBase > 0 ? formatearPrecio(presupuesto.precioBase) : 'A consultar'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Funcionalidades */}
                {funcionalidadesSeleccionadas.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#71C648] uppercase tracking-wide mb-3">
                      Funcionalidades
                    </h3>
                    <div className="space-y-2">
                      {funcionalidadesSeleccionadas.map((func) => (
                        <div key={func?.id} className="flex justify-between text-sm">
                          <span className="text-[#5A6D6D]">{func?.label}</span>
                          <span className={func?.precio ? "font-medium text-[#194973]" : "text-[#71C648]"}>
                            {func?.precio ? `+${formatearPrecio(func.precio)}` : 'Incluido'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Integraciones */}
                {integracionesSeleccionadas.length > 0 && !integracionesSeleccionadas.every(i => i?.id === 'ninguna') && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#71C648] uppercase tracking-wide mb-3">
                      Integraciones
                    </h3>
                    <div className="space-y-2">
                      {integracionesSeleccionadas.filter(i => i?.id !== 'ninguna').map((integ) => (
                        <div key={integ?.id} className="flex justify-between text-sm">
                          <span className="text-[#5A6D6D]">{integ?.label}</span>
                          <span className={integ?.precio ? "font-medium text-[#194973]" : "text-[#71C648]"}>
                            {integ?.precio ? `+${formatearPrecio(integ.precio)}` : 'Incluido'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras */}
                {(presupuesto.multiplicador > 1 || presupuesto.precioApp > 0) && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-[#71C648] uppercase tracking-wide mb-3">
                      Ajustes
                    </h3>
                    <div className="space-y-2">
                      {presupuesto.multiplicador > 1 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#5A6D6D]">Escala ({formData.numeroUsuarios}) x{presupuesto.multiplicador}</span>
                          <span className="font-medium text-[#194973]">
                            +{formatearPrecio(presupuesto.subtotal * (presupuesto.multiplicador - 1))}
                          </span>
                        </div>
                      )}
                      {presupuesto.precioApp > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#5A6D6D]">App móvil iOS + Android</span>
                          <span className="font-medium text-[#194973]">+{formatearPrecio(presupuesto.precioApp)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notas personalizadas */}
                {(formData.otraFuncionalidad || formData.otraIntegracion) && (
                  <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                    <h3 className="text-sm font-semibold text-amber-700 mb-2">Notas adicionales</h3>
                    {formData.otraFuncionalidad && (
                      <p className="text-sm text-amber-600 mb-1">
                        <strong>Funcionalidad:</strong> {formData.otraFuncionalidad}
                      </p>
                    )}
                    {formData.otraIntegracion && (
                      <p className="text-sm text-amber-600">
                        <strong>Integración:</strong> {formData.otraIntegracion}
                      </p>
                    )}
                    <p className="text-xs text-amber-500 mt-2">* Estos elementos se valorarán personalmente</p>
                  </div>
                )}

                {/* Total */}
                <div className="border-t-2 border-[#194973] pt-4 mt-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-base sm:text-lg font-bold text-[#194973]">Total estimado</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#71C648]">
                      {formData.tipoProyecto === 'otro' ? 'A consultar' : formatearPrecio(presupuesto.total)}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A6D6D] mt-2">
                    * IVA no incluido. Presupuesto orientativo válido 30 días.
                  </p>
                </div>
              </div>

              {/* Card Footer - Actions */}
              <div className="bg-[#f8f9fa] p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={descargarPresupuesto}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#194973] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0f3150] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Descargar
                  </button>
                  <button
                    onClick={imprimirPresupuesto}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-[#194973] text-[#194973] px-6 py-3 rounded-full font-medium hover:bg-[#194973] hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg>
                    Imprimir
                  </button>
                </div>
              </div>
            </div>

            {/* Back buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button href="/" variant="outline-light">
                Volver al inicio
              </Button>
              <Button href="/portfolio" variant="outline-light">
                Ver proyectos similares
              </Button>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              Nos pondremos en contacto contigo en menos de 24 horas
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-6 sm:pb-8 bg-gradient-to-br from-[#194973] to-[#0f3150]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-[#71C648]/20 text-[#71C648] px-4 py-2 rounded-full text-sm font-medium mb-4 sm:mb-6">
              Sin compromiso
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Calcula tu presupuesto
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Responde unas preguntas sencillas y te preparamos una propuesta
              personalizada en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-[#194973] pb-8 sm:pb-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                    step < currentStep
                      ? "bg-[#71C648] text-white"
                      : step === currentStep
                      ? "bg-white text-[#194973]"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {step < currentStep ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 5 && (
                  <div
                    className={`w-8 sm:w-20 h-1 mx-1 sm:mx-2 rounded ${
                      step < currentStep ? "bg-[#71C648]" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="hidden sm:flex justify-between mt-2 text-xs sm:text-sm text-gray-400">
            <span>Proyecto</span>
            <span>Funciones</span>
            <span>Integraciones</span>
            <span>Escala</span>
            <span>Contacto</span>
          </div>
        </div>
      </section>

      {/* Form Steps */}
      <section className="py-8 sm:py-16 bg-[#f8f9fa] min-h-[60vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Step 1: Tipo de proyecto */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#194973] mb-2 text-center">
                ¿Qué tipo de proyecto necesitas?
              </h2>
              <p className="text-[#5A6D6D] mb-8 text-center">
                Selecciona la opción que mejor se ajuste a tu idea
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tiposProyecto.map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => handleTipoProyecto(tipo.id)}
                    className={`relative p-6 rounded-2xl text-left transition-all duration-300 group overflow-hidden ${
                      formData.tipoProyecto === tipo.id
                        ? "bg-gradient-to-br from-[#71C648] to-[#5db33a] text-white shadow-xl scale-[1.02] ring-4 ring-[#71C648]/30"
                        : "bg-white hover:shadow-xl hover:scale-[1.02] border-2 border-transparent hover:border-[#71C648]/20"
                    }`}
                  >
                    {/* Badge */}
                    {tipo.badge && (
                      <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                        formData.tipoProyecto === tipo.id
                          ? "bg-white/20 text-white"
                          : tipo.badge === "Recomendado"
                            ? "bg-[#71C648] text-white"
                            : "bg-[#194973] text-white"
                      }`}>
                        {tipo.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${
                      formData.tipoProyecto === tipo.id
                        ? "bg-white/20 text-white"
                        : "bg-gradient-to-br from-[#194973]/10 to-[#71C648]/10 text-[#194973] group-hover:from-[#71C648]/20 group-hover:to-[#71C648]/10"
                    }`}>
                      {tipo.icon}
                    </div>

                    {/* Benefit tag */}
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                      formData.tipoProyecto === tipo.id
                        ? "bg-white/20 text-white"
                        : "bg-[#71C648]/10 text-[#71C648]"
                    }`}>
                      {tipo.benefit}
                    </span>

                    {/* Title */}
                    <h3 className={`text-lg font-bold mb-2 ${
                      formData.tipoProyecto === tipo.id ? "text-white" : "text-[#194973]"
                    }`}>
                      {tipo.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm mb-4 leading-relaxed ${
                      formData.tipoProyecto === tipo.id ? "text-white/90" : "text-[#5A6D6D]"
                    }`}>
                      {tipo.description}
                    </p>

                    {/* Complexity indicator */}
                    {tipo.complexity > 0 && (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${
                          formData.tipoProyecto === tipo.id ? "text-white/70" : "text-[#5A6D6D]"
                        }`}>
                          Alcance:
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full transition-all ${
                                level <= tipo.complexity
                                  ? formData.tipoProyecto === tipo.id
                                    ? "bg-white"
                                    : "bg-[#71C648]"
                                  : formData.tipoProyecto === tipo.id
                                    ? "bg-white/30"
                                    : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Selection indicator */}
                    <div className={`absolute bottom-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      formData.tipoProyecto === tipo.id
                        ? "bg-white text-[#71C648]"
                        : "bg-gray-100 text-gray-300 group-hover:bg-[#71C648]/10 group-hover:text-[#71C648]"
                    }`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Funcionalidades */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#194973] mb-2 text-center">
                ¿Qué funcionalidades necesitas?
              </h2>
              <p className="text-[#5A6D6D] mb-8 text-center">
                Selecciona las que apliquen a tu{" "}
                <span className="font-medium text-[#71C648]">
                  {tiposProyecto.find(t => t.id === formData.tipoProyecto)?.title.toLowerCase()}
                </span>
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {getFuncionalidadesActuales().map((func) => (
                  <button
                    key={func.id}
                    onClick={() => handleFuncionalidad(func.id)}
                    className={`p-5 rounded-xl text-left transition-all flex items-start gap-4 ${
                      formData.funcionalidades.includes(func.id)
                        ? "bg-[#71C648] text-white shadow-lg"
                        : "bg-white hover:shadow-md"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                      formData.funcionalidades.includes(func.id)
                        ? "bg-white text-[#71C648]"
                        : "border-2 border-gray-300"
                    }`}>
                      {formData.funcionalidades.includes(func.id) && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        formData.funcionalidades.includes(func.id) ? "text-white" : "text-[#194973]"
                      }`}>
                        {func.label}
                      </h3>
                      <p className={`text-sm ${
                        formData.funcionalidades.includes(func.id) ? "text-white/80" : "text-[#5A6D6D]"
                      }`}>
                        {func.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Campo para añadir funcionalidad personalizada */}
              <div className="mt-6 bg-white rounded-xl p-5">
                <label className="block mb-3">
                  <span className="font-semibold text-[#194973] flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    ¿Necesitas algo más?
                  </span>
                  <span className="text-sm text-[#5A6D6D]">
                    Describe cualquier funcionalidad adicional que no aparezca en la lista
                  </span>
                </label>
                <textarea
                  name="otraFuncionalidad"
                  value={formData.otraFuncionalidad}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] resize-none"
                  placeholder="Ej: Quiero que los clientes puedan subir documentos, necesito un sistema de puntos de fidelidad, integración con mi software actual..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Integraciones */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#194973] mb-2 text-center">
                ¿Necesitas integraciones?
              </h2>
              <p className="text-[#5A6D6D] mb-8 text-center">
                Conecta tu{" "}
                <span className="font-medium text-[#71C648]">
                  {tiposProyecto.find(t => t.id === formData.tipoProyecto)?.title.toLowerCase()}
                </span>
                {" "}con otras herramientas
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {getIntegracionesActuales().map((integ) => (
                  <button
                    key={integ.id}
                    onClick={() => handleIntegracion(integ.id)}
                    className={`p-5 rounded-xl text-left transition-all flex items-start gap-4 ${
                      formData.integraciones.includes(integ.id)
                        ? "bg-[#71C648] text-white shadow-lg"
                        : "bg-white hover:shadow-md"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                      formData.integraciones.includes(integ.id)
                        ? "bg-white text-[#71C648]"
                        : "border-2 border-gray-300"
                    }`}>
                      {formData.integraciones.includes(integ.id) && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        formData.integraciones.includes(integ.id) ? "text-white" : "text-[#194973]"
                      }`}>
                        {integ.label}
                      </h3>
                      <p className={`text-sm ${
                        formData.integraciones.includes(integ.id) ? "text-white/80" : "text-[#5A6D6D]"
                      }`}>
                        {integ.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Campo para añadir integración personalizada */}
              <div className="mt-6 bg-white rounded-xl p-5">
                <label className="block mb-3">
                  <span className="font-semibold text-[#194973] flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#71C648]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    ¿Otra integración?
                  </span>
                  <span className="text-sm text-[#5A6D6D]">
                    Describe cualquier sistema o herramienta con la que necesites conectar
                  </span>
                </label>
                <textarea
                  name="otraIntegracion"
                  value={formData.otraIntegracion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] resize-none"
                  placeholder="Ej: Necesito conectar con mi software de contabilidad actual, quiero sincronizar con Notion, integración con mi CRM de HubSpot..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Usuarios y escala */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#194973] mb-2 text-center">
                ¿Cuántos usuarios tendrá la plataforma?
              </h2>
              <p className="text-[#5A6D6D] mb-8 text-center">
                Esto nos ayuda a dimensionar la infraestructura necesaria
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {usuariosOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleUsuarios(option.value)}
                    className={`p-6 rounded-xl text-center transition-all ${
                      formData.numeroUsuarios === option.value
                        ? "bg-[#71C648] text-white shadow-lg"
                        : "bg-white hover:shadow-md"
                    }`}
                  >
                    <h3 className={`text-xl font-bold mb-1 ${
                      formData.numeroUsuarios === option.value ? "text-white" : "text-[#194973]"
                    }`}>
                      {option.label}
                    </h3>
                    <p className={`text-sm ${
                      formData.numeroUsuarios === option.value ? "text-white/80" : "text-[#5A6D6D]"
                    }`}>
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl p-6">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.necesitaApp}
                    onChange={(e) => setFormData({ ...formData, necesitaApp: e.target.checked })}
                    className="w-5 h-5 rounded text-[#71C648] focus:ring-[#71C648]"
                  />
                  <div>
                    <span className="font-semibold text-[#194973]">Necesito también una app móvil</span>
                    <p className="text-sm text-[#5A6D6D]">App nativa para iOS y Android además de la web</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Contacto */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-[#194973] mb-2 text-center">
                ¿Cómo te contactamos?
              </h2>
              <p className="text-[#5A6D6D] mb-8 text-center">
                Te enviaremos la propuesta personalizada
              </p>
              <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#194973] mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648]"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#194973] mb-2">
                      Email profesional *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648]"
                      placeholder="tu@empresa.com"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#194973] mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648]"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#194973] mb-2">
                        Empresa / Centro
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648]"
                        placeholder="Nombre de tu organización"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#194973] mb-2">
                      ¿Algo más que quieras contarnos?
                    </label>
                    <textarea
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#71C648] resize-none"
                      placeholder="Detalles adicionales sobre tu proyecto..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevStep}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                currentStep === 1
                  ? "invisible"
                  : "bg-white text-[#194973] hover:bg-gray-100"
              }`}
            >
              Atrás
            </button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                variant="primary"
                size="lg"
                disabled={!canProceed()}
                className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="primary"
                size="lg"
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Solicitar presupuesto"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8 sm:py-12 bg-white border-t">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#71C648] mb-1">24h</div>
              <div className="text-xs sm:text-sm text-[#5A6D6D]">Respuesta garantizada</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#71C648] mb-1">100%</div>
              <div className="text-xs sm:text-sm text-[#5A6D6D]">Sin compromiso</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#71C648] mb-1">Gratis</div>
              <div className="text-xs sm:text-sm text-[#5A6D6D]">Presupuesto detallado</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
