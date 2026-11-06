# CodeConnect

Web comercial y panel interno de CodeConnect, construidos con Next.js App Router, TypeScript, Tailwind CSS, `next-intl`, Supabase y Resend.

## Requisitos

- Node.js 22
- npm
- Proyecto Supabase para las funciones de dashboard
- Cuenta Resend y un remitente verificado para los formularios

## Desarrollo local

```bash
npm install
npm run dev
```

La web estará disponible en `http://localhost:3000`. La ruta raíz redirige al locale predeterminado y las páginas públicas viven bajo `/es`, `/en` y `/fr`.

## Variables de entorno

Crear `.env.local` sin versionarlo:

```text
NEXT_PUBLIC_SITE_URL=https://www.codeconnectsl.com
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_EMAIL_FROM=CodeConnect <contacto@tu-dominio-verificado.es>
CONTACT_EMAIL_TO=
```

Las variables `NEXT_PUBLIC_*` llegan al navegador. La service-role de Supabase y la clave de Resend son exclusivamente de servidor.

## Consultas y medición

Diagnóstico, contacto y presupuesto registran las solicitudes en la tabla `inquiries`
existente y mantienen la notificación por email. Si falla una vía, se intenta la otra;
solo se informa de éxito si alguna recibió la solicitud. El panel las reúne en
**Consultas** (`/dashboard/diagnosticos`). La tabla y sus políticas están en
`supabase-migrations/20260913_inquiries.sql`; esta mejora no cambia el esquema.

Los tres formularios requieren aceptación explícita de privacidad. El diagnóstico
permite enviar solo objetivo, nombre y email; los detalles son opcionales. Una
solicitud posterior de llamada sobre un presupuesto se registra como una consulta
adicional identificada como tal.

Con consentimiento analítico, `cc_entry_v1` conserva la entrada y las UTM en
`sessionStorage` durante la sesión y las incorpora a la solicitud. Al rechazar o
retirar el consentimiento, no se adjunta esta atribución y se elimina su registro.
La versión de consentimiento pasa a 3 para informar de la atribución de consultas
y volver a solicitar la elección a quienes aceptaron una versión anterior.
GA4 solo se carga si además está configurada `NEXT_PUBLIC_GA_ID`. Los eventos propios
son `cta_click`, `form_start`, `form_step`, `form_error`, `generate_lead` y
`request_call`, con formulario, paso y ruta cuando corresponda; no contienen datos
de contacto ni texto libre. `generate_lead` se emite tras una respuesta de éxito del
servidor. Revisar en GA4 que la medición mejorada no duplique eventos equivalentes
antes de usar estas cifras como embudo.

## Verificación

```bash
npm run lint
npm run typecheck
npm run build
```

## Estructura

- `src/app/[locale]`: web pública localizada.
- `messages`: copy de español, inglés y francés; los locales deben conservar paridad.
- `src/app/dashboard`: panel privado.
- `src/app/api`: formularios, clientes, prospectos, propuestas y pagos.
- `src/lib/supabase`: clientes Supabase de navegador, servidor y administración.
- `supabase-schema.sql`: esquema y políticas RLS.

## Contenido comercial

Un portfolio solo puede presentarse como cliente real cuando existe autorización para publicar nombre, cita, logo y resultados. En ausencia de evidencia debe etiquetarse como demo, prototipo o proyecto propio y no incluir testimonios ni métricas atribuidas.

## Despliegue

El despliegue previsto es Vercel. Configura allí todas las variables de entorno, usa el dominio canónico de producción y ejecuta las verificaciones anteriores antes de publicar.
