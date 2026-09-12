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
NEXT_PUBLIC_SITE_URL=https://codeconnect.es
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_EMAIL_FROM=CodeConnect <contacto@tu-dominio-verificado.es>
CONTACT_EMAIL_TO=
```

Las variables `NEXT_PUBLIC_*` llegan al navegador. La service-role de Supabase y la clave de Resend son exclusivamente de servidor.

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
