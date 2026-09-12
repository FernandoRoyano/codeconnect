# CodeConnect — instrucciones del repositorio

- Aplicación Next.js con App Router, TypeScript, Tailwind y next-intl.
- Antes de cambiar portfolio, testimonios, logos o métricas, clasifica cada elemento como cliente real, proyecto propio, demo o prototipo. No inventes prueba social.
- Trata `messages/` como contenido localizado y conserva paridad entre locales.
- Reutiliza componentes y utilidades existentes. Evita dependencias nuevas sin justificarlas.
- No expongas secretos. APIs, Supabase, Resend y formularios deben validar entrada y autorización en servidor.
- Para cambios de interfaz comprueba teclado, foco, contraste, móvil, enlaces, metadata y estados de error.
- Verificación mínima: `npm run lint`, `npm run typecheck` y `npm run build`.
- No modifiques datos o configuración de producción ni despliegues sin petición explícita.
