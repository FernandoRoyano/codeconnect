# CodeConnect — plan de modificaciones de la auditoría V2

Fecha de contraste con el repositorio: 2026-09-12.

## Línea base de verificación

`npm run lint` no pasa en el estado actual: 12 errores y 15 avisos. Los errores incluyen dos enlaces internos con `<a>` en la home, varias funciones de carga usadas antes de declararse en el dashboard y páginas por token, y un `Date.now()` durante render en `ProposalView`. Los avisos incluyen dependencias de hooks, variables sin usar e imágenes sin optimización/alt. Esta deuda debe resolverse antes de usar lint como puerta de calidad y antes del despliegue.

## Alcance y criterio

Este documento convierte la auditoría en cambios ejecutables. No presupone que los nombres, testimonios, métricas o promesas actuales sean falsos: los considera **no verificados** hasta que exista evidencia y autorización. Tampoco modifica los cambios locales ya presentes en el árbol de trabajo.

Estados usados:

- **Bloqueado por negocio**: requiere una respuesta o evidencia de Fernando.
- **Listo para implementar**: puede resolverse desde el repositorio.
- **En curso localmente**: ya hay cambios sin confirmar que avanzan el punto, pero deben revisarse y verificarse.

## 0. Preparación y protección del trabajo existente

Estado: **listo para implementar antes de tocar código**.

Hay cambios locales amplios en páginas, traducciones, SEO, sitemap, robots y el configurador. Antes de ejecutar este plan:

1. Revisar y agrupar el diff actual por objetivo.
2. Confirmar que los nuevos archivos `ContactoContent.tsx`, `PortfolioContent.tsx`, `PresupuestoWizard.tsx` y `src/lib/seo.ts` pertenecen al trabajo que se quiere conservar.
3. Crear un commit o una rama de respaldo antes de mezclar los cambios de esta auditoría.
4. No incluir `graphify-out/`, `.claude/` o `skills/` en producción sin decidir expresamente si forman parte del repositorio.

Criterio de aceptación: el árbol de trabajo previo queda identificado y recuperable; ningún ajuste de la auditoría pisa cambios ajenos.

## 1. P0 — Portfolio, testimonios y métricas

Estado: **bloqueado por negocio**.

### Decisión requerida por cada caso

Completar esta tabla antes de publicar nuevo copy:

| Caso | Estado | Nombre publicable | Testimonio autorizado | Métricas y fuente | URL/evidencia | Fecha de autorización |
|---|---|---|---|---|---|---|
| Antea Salud | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Healthy Fitness | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| WellnessReal | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| DR Nutrición | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| FacturaFit | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| ParentFit | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

Estados permitidos: `CLIENTE_REAL`, `PROYECTO_PROPIO`, `DEMO`, `PROTOTIPO`, `RETIRAR`.

### Cambios de código

1. Extraer el portfolio de `messages/*.json` a un modelo de datos tipado con campos `status`, `evidenceUrl`, `authorizedAt`, `metrics` y `testimonial`.
2. Renderizar siempre una etiqueta visible según el estado.
3. Para `DEMO` y `PROTOTIPO`, usar nombres genéricos y retirar persona, cargo, cita y resultados cuantificados.
4. Para `PROYECTO_PROPIO`, usar la etiqueta “Proyecto propio de CodeConnect”; no atribuir una cita a un cliente.
5. Para `CLIENTE_REAL`, mostrar solo los campos expresamente autorizados.
6. Sustituir temporalmente “Proyectos reales” y “Casos reales” por “Ejemplos de soluciones” mientras haya casos pendientes.
7. Eliminar el bloque global de estadísticas del portfolio hasta verificar cada cifra.
8. Aplicar los mismos cambios en `es`, `en` y `fr`.

Archivos principales: `messages/es.json`, `messages/en.json`, `messages/fr.json`, `src/app/[locale]/portfolio/PortfolioContent.tsx`, `src/app/[locale]/page.tsx`.

Criterio de aceptación: ningún nombre, cita o resultado se presenta como real sin registro; todos los casos muestran estado; existe paridad entre idiomas.

## 2. P0 — Afirmaciones comerciales y contractuales

Estado: **bloqueado por negocio**.

### Inventario que debe resolverse

- Años/proyectos entregados, clientes activos y satisfacción.
- Respuesta en 24 horas: días laborables, horario, canal y qué cuenta como “respuesta”.
- “Licencia completa en propiedad”: código entregado, derechos de uso, componentes de terceros, dominio, hosting, mantenimiento, cuentas y datos.
- “Sin cuotas mensuales eternas”: costes recurrentes inevitables y servicios opcionales.

### Cambios de código y contenido

1. Centralizar afirmaciones verificadas en un único archivo de contenido, con `value`, `definition`, `source` y `lastVerifiedAt`.
2. Retirar de home, portfolio, presupuesto, contacto, footer y Open Graph cualquier cifra sin fuente.
3. Reescribir la promesa de 24 horas con sus condiciones o sustituirla por “te responderemos lo antes posible”.
4. Añadir a FAQ/condiciones una explicación breve de propiedad, licencias de terceros, infraestructura y mantenimiento.
5. Quitar las cifras actuales de `src/app/[locale]/opengraph-image.tsx` hasta verificarlas.

Criterio de aceptación: búsqueda global sin afirmaciones absolutas no registradas; la promesa contractual coincide en todas las rutas e idiomas.

## 3. P1 — Redes sociales y marca accesible

Estado: **parcialmente listo; perfiles bloqueados por negocio**.

1. Sustituir los enlaces genéricos del footer por perfiles reales. Si no se facilitan, ocultar todos los iconos afectados.
2. Mantener `target="_blank"` y `rel="noopener noreferrer"` solo para enlaces válidos.
3. Dar al logo un único nombre accesible “CodeConnect”: envolver la composición visual con `aria-label="CodeConnect"` y ocultar sus piezas al árbol accesible, o incluir texto equivalente para lectores de pantalla.
4. El icono aislado necesita también nombre cuando actúe como enlace; si es decorativo, `aria-hidden="true"`.

Archivos: `src/components/Footer.tsx`, `src/components/Logo.tsx`, y cualquier uso enlazado desde `Header.tsx`.

Criterio de aceptación: no quedan destinos sociales genéricos; el nombre accesible del logo no se fragmenta.

## 4. P1 — Conversión y CTA

Estado: **bloqueado parcialmente por definición comercial**.

1. Elegir un único evento primario: envío del configurador o envío del formulario de contacto.
2. Usar un CTA primario coherente en header, hero, cierres y footer. Propuesta: “Cuéntanos tu proyecto”.
3. Usar como CTA secundario “Ver ejemplos de soluciones”.
4. Antes de empezar el configurador, declarar duración estimada, datos solicitados, entregable y que el importe es orientativo hasta confirmar alcance.
5. Evitar “gratis” salvo que forme parte deliberada de la estrategia comercial.
6. Instrumentar eventos sin datos personales: inicio, paso completado, error y envío correcto.

Archivos: `messages/*.json`, `Header.tsx`, `Footer.tsx`, home, contacto y componentes de presupuesto.

Criterio de aceptación: cada página tiene un CTA primario inequívoco; la frase adjunta explica qué pasa después; la conversión se puede medir sin registrar PII.

## 5. P1 — Servicios, navegación y enlaces internos

Estado: **listo para implementar**.

Problema confirmado: el footer enlaza a `#software`, `#apps` y `#consultoria`, pero la página publica `#web`, `#crm` y `#facturacion`.

1. Adoptar la taxonomía ya desarrollada: Web, Gestión/CRM y Facturación.
2. Cambiar el footer para apuntar exactamente a `#web`, `#crm` y `#facturacion`.
3. Mantener apps, software genérico y consultoría solo como capacidades auxiliares si existe contenido visible que las explique; no como anchors ficticios.
4. Mantener el blog fuera de navegación y sitemap hasta que existan artículos y rutas de detalle reales. El diff local ya avanza este punto.
5. Añadir una comprobación automatizada de rutas y anchors internos.

Archivos: `src/components/Footer.tsx`, `messages/*.json`, `src/app/[locale]/servicios/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`.

Criterio de aceptación: cero rutas internas 404 y cero hashes sin elemento destino en los tres idiomas.

## 6. P2 — Accesibilidad

Estado: **listo para implementar y medir**.

1. Añadir estado accesible a los filtros del portfolio mediante `aria-pressed`; asociar el grupo a una etiqueta y anunciar el número de resultados cuando cambie.
2. Revisar el menú móvil: apertura/cierre con teclado, `aria-expanded`, relación con el panel, Escape y devolución de foco.
3. Mantener los FAQ con `details/summary`, comprobar foco visible y evitar headings dentro de `summary` si crean una jerarquía confusa.
4. Marcar SVG decorativos con `aria-hidden="true"`; nombrar solo los que aportan contenido.
5. Añadir `role="status"`/`aria-live` a confirmaciones de formularios y presupuesto, y conservar `role="alert"` para errores.
6. Respetar `prefers-reduced-motion` en animaciones `reveal`, transiciones y desplazamiento.
7. Auditar labels, mensajes de error por campo, contraste y orden de tabulación.
8. Ejecutar axe en home, servicios, portfolio, contacto y presupuesto, en escritorio y móvil.

Criterio de aceptación: cero incidencias críticas/serias de axe y flujo completo utilizable solo con teclado.

## 7. P2 — Responsive y rendimiento

Estado: **listo para medir; optimización posterior depende de resultados**.

1. Guardar una línea base de Lighthouse móvil/escritorio para cinco rutas públicas.
2. Medir LCP, INP, CLS, JavaScript transferido, imágenes y fuentes; no fijar objetivos retrospectivamente.
3. Probar 320, 360, 390, 768, 1024 y 1440 px sin overflow horizontal.
4. Revisar los mockups largos de servicios y el configurador en red y CPU limitadas.
5. Reducir componentes cliente e hidratación donde no haya interacción; la separación local de páginas servidor/contenido cliente debe medirse, no darse por optimización automática.
6. Definir un presupuesto inicial recomendado: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 en percentil 75, sujeto a datos reales de campo.

Criterio de aceptación: informe reproducible antes/después y sin regresiones en los breakpoints objetivo.

## 8. P2 — SEO e internacionalización

Estado: **en curso localmente**.

El diff actual ya añade metadata por ruta, canonical/hreflang, sitemap y robots. Antes de darlo por cerrado:

1. Unificar el dominio canónico: `src/lib/seo.ts` usa `https://codeconnect.es`, mientras `metadataBase` conserva un fallback de Vercel. Usar una sola constante validada por entorno.
2. Localizar también títulos y descripciones de páginas legales y blog; ahora varios son solo españoles.
3. No publicar `LocalBusiness` si no cumple los requisitos reales de negocio/localización; `Organization` es suficiente si no hay local abierto o dirección publicable.
4. Eliminar de metadata la promesa “licencia completa en propiedad” mientras no esté definida.
5. Evitar structured data de testimonios, ratings o servicios con datos no verificados.
6. Verificar en HTML renderizado title, description, canonical, alternates, OG y Twitter para cada locale.
7. Validar sitemap y robots contra rutas efectivamente publicadas.

Criterio de aceptación: metadata única y localizada, dominio consistente, alternates recíprocos y schema válido y veraz.

## 9. P3 — Formulario y entrega de correo

Estado: **listo para implementar; la prueba de entrega requiere entorno configurado**.

Riesgos confirmados: validación solo por presencia, ausencia de límites y antispam, destino y remitente incrustados, y contenido del usuario interpolado directamente en HTML.

1. Validar en servidor tipo, longitud y formato de todos los campos; rechazar claves y tipos inesperados.
2. Escapar contenido antes de insertarlo en HTML para impedir inyección de marcado en correos.
3. Mover remitente y destinatario a variables de entorno validadas al arrancar/usar el endpoint.
4. Añadir honeypot y rate limiting por ventana; CAPTCHA solo si el spam real lo justifica.
5. Aplicar límites de tamaño al body y timeout razonable al proveedor.
6. Devolver errores estables y accesibles, sin filtrar detalles internos.
7. No registrar cuerpo, email, teléfono ni mensaje; usar un identificador de correlación.
8. Desactivar envíos repetidos desde cliente y gestionar reintentos sin duplicados.
9. Añadir pruebas de validación, escape, éxito, fallo del proveedor y duplicado.
10. Realizar una prueba final con datos sintéticos autorizados y comprobar recepción.

Archivos: `src/app/api/contact/route.ts`, `src/app/[locale]/contacto/ContactoContent.tsx`, configuración de entorno y pruebas nuevas.

Criterio de aceptación: entradas inválidas no envían correo; HTML escapado; abuso básico limitado; éxito/error anunciados; entrega sintética confirmada.

## 10. P3 — Arquitectura, calidad y onboarding

Estado: **listo para implementar**.

1. Sustituir el README de create-next-app por instrucciones reales: requisitos, instalación, variables, locales, rutas, Supabase, Resend, scripts, build y despliegue.
2. Añadir `AGENTS.md` del repositorio con la regla de evidencia, paridad i18n, seguridad y verificación mínima.
3. Añadir scripts `typecheck` y `test`; incorporar pruebas focalizadas para cálculo de presupuesto, APIs y enlaces internos.
4. Mantener datos de marketing fuera de componentes extensos y con tipos explícitos.
5. Documentar la frontera entre web pública, dashboard privado, propuestas por token y APIs.
6. Revisar si `xlsx` y `@react-pdf/renderer` cargan solo en rutas servidor o bajo demanda.

Criterio de aceptación: un colaborador nuevo puede instalar, configurar, comprobar y entender el sistema usando solo el repositorio.

## 11. P4 — Seguridad, dependencias y privacidad

Estado: **listo para auditar; algunas correcciones dependerán de resultados**.

1. Ejecutar `npm audit` y registrar decisión para cada vulnerabilidad, no solo el conteo.
2. Revisar todas las APIs de dashboard y token: autenticación, autorización por recurso, expiración, enumeración y método HTTP.
3. Probar RLS. Hallazgo a revisar: la política de `clients` permite gestionar todos los clientes a cualquier usuario autenticado, mientras las propuestas sí se limitan por `user_id`.
4. Revisar importación Excel: tamaño, tipo real, número de filas, fórmulas, consumo de memoria y mensajes de error.
5. Confirmar que la service-role key solo se usa en servidor y en operaciones previamente autorizadas.
6. Crear un inventario de datos, finalidad, retención y borrado; no almacenar datos de salud en la web comercial sin diseño legal/técnico específico.
7. Comprobar que `.env*`, logs, PDFs y exportaciones no se versionan ni exponen.

Criterio de aceptación: sin vulnerabilidades críticas conocidas sin plan; autorización negativa probada; secretos solo en servidor; checklist de privacidad aprobado.

## 12. P5 — Posicionamiento y contenido

Estado: **bloqueado por decisión comercial**.

1. Elegir un segmento principal para hero y CTA. Recomendación inicial: clínicas y centros de salud/bienestar; gimnasios como segmento secundario.
2. Estructurar la home en: problema del segmento → solución → proceso → ejemplos clasificados → siguiente paso.
3. Mover el resto de verticales a “También trabajamos con”.
4. Organizar portfolio por problema resuelto y estado de evidencia, no solo por formato tecnológico.
5. Reducir elementos atmosféricos que no prueban capacidad si compiten con la propuesta y el CTA.

Criterio de aceptación: una persona del segmento principal identifica en el primer viewport para quién es, qué resuelve y qué debe hacer.

## Orden de ejecución propuesto

1. Proteger y revisar el trabajo local existente.
2. Obtener la matriz de evidencia, definición de promesas, perfiles sociales y segmento principal.
3. Aplicar el saneamiento P0 de contenido en los tres idiomas.
4. Corregir footer, anchors, logo y CTA.
5. Endurecer formulario y APIs; revisar RLS y dependencias.
6. Terminar y validar SEO/i18n.
7. Ejecutar accesibilidad, responsive y rendimiento; corregir según resultados.
8. Completar README, `AGENTS.md`, scripts y pruebas.
9. Ejecutar lint, typecheck, pruebas y build.
10. Probar correo con datos sintéticos y hacer revisión visual final antes de cualquier despliegue.

## Información mínima necesaria para desbloquear la implementación comercial

1. Clasificación y autorización de los seis casos.
2. Fuente y definición de cada cifra o permiso para retirarla.
3. Condiciones reales de respuesta, propiedad, soporte y costes recurrentes.
4. URLs sociales que deben publicarse.
5. Segmento principal y conversión primaria elegidos.
