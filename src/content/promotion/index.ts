export const CAMPAIGN_ID = "clinicas-2026-11";
export const PROGRESS_BUCKET = "promotion-progress";

export const PROMOTION_STATUSES = ["pending", "in_progress", "done", "skipped"] as const;
export type PromotionStatus = (typeof PROMOTION_STATUSES)[number];
export const STATUS_LABELS: Record<PromotionStatus, string> = {
  pending: "Pendiente", in_progress: "En curso", done: "Hecha", skipped: "Descartada",
};

export type PromotionTask = {
  id: string; week: number; dueDate: string; title: string; description: string;
  resource?: "plan" | "arranque" | "conversaciones" | "publicaciones";
};
export type TaskProgress = {
  taskId: string; status: PromotionStatus; notes: string;
  completedAt: string | null; updatedAt: string;
};

export const promotionTasks: PromotionTask[] = [
  { id: "comprobar-recepcion", week: 1, dueDate: "2026-11-09", title: "Comprobar la recepción completa de una consulta", description: "Verifica guardado en Consultas y correo con una prueba identificada. Anota el resultado; no basta con que aparezca la pantalla de éxito.", resource: "plan" },
  { id: "preparar-perfil", week: 1, dueDate: "2026-11-09", title: "Preparar el perfil de LinkedIn", description: "Revisa el titular, la presentación y el enlace destacado. Tienes los textos preparados en Publicaciones.", resource: "publicaciones" },
  { id: "elegir-cuentas", week: 1, dueDate: "2026-11-09", title: "Elegir tres cuentas para investigar", description: "Empieza con los cinco centros investigados. Busca un contexto profesional pertinente, sin presuponer necesidades.", resource: "arranque" },
  { id: "publicar-presentacion", week: 1, dueDate: "2026-11-10", title: "Publicar la presentación de CodeConnect", description: "Copia el primer borrador, revísalo y publícalo desde tu perfil. Guarda el enlace en las notas.", resource: "publicaciones" },
  { id: "aportar-semana-1", week: 1, dueDate: "2026-11-11", title: "Preparar dos aportaciones a conversaciones públicas", description: "Lee la publicación completa y aporta algo concreto. Registra solo interacciones que realmente hayas realizado.", resource: "arranque" },
  { id: "publicar-agenda", week: 1, dueDate: "2026-11-12", title: "Publicar sobre WhatsApp y la agenda", description: "El segundo texto está preparado. Responde a las preguntas que suscite sin enviar ofertas automáticas.", resource: "publicaciones" },
  { id: "revisar-semana-1", week: 1, dueDate: "2026-11-13", title: "Revisar respuestas y completar cinco cuentas investigadas", description: "Anota lo que has aprendido y prepara un ejemplo con datos ficticios.", resource: "arranque" },
  { id: "investigar-diez", week: 2, dueDate: "2026-11-16", title: "Ampliar la investigación hasta diez cuentas", description: "Separa hechos públicos, hipótesis y contexto para conversar. Una visita a su web no significa que hayas contactado.", resource: "arranque" },
  { id: "publicar-reserva", week: 2, dueDate: "2026-11-17", title: "Mostrar cómo una web facilita una reserva", description: "Prepara una demostración de 45–90 segundos con datos ficticios y una acción principal clara.", resource: "plan" },
  { id: "buscar-colaboradores", week: 2, dueDate: "2026-11-18", title: "Identificar dos posibles colaboradores", description: "Busca diseñadores, consultores o agencias con una actividad complementaria. Registra una vía pertinente de relación.", resource: "conversaciones" },
  { id: "publicar-herramientas", week: 2, dueDate: "2026-11-19", title: "Explicar cuándo aprovechar un programa existente", description: "Utiliza el artículo de software vertical o a medida. Pregunta qué parte les resuelve su herramienta actual.", resource: "plan" },
  { id: "revisar-arranque", week: 2, dueDate: "2026-11-20", title: "Revisar las primeras dos semanas", description: "Cuenta publicaciones, interacciones y conversaciones voluntarias. Ajusta el enfoque según respuestas reales.", resource: "arranque" },
  { id: "publicar-caso", week: 3, dueDate: "2026-11-24", title: "Mostrar el caso de la web de nutrición", description: "Describe el alcance documentado del caso de Diego Royano y respeta la autorización de uso. No añadas resultados no acreditados.", resource: "plan" },
  { id: "conversaciones-semana-3", week: 3, dueDate: "2026-11-25", title: "Continuar las conversaciones que hayan generado interés", description: "Resume una necesidad expresada y acuerda un siguiente paso. Utiliza Prospectos o Consultas según el origen.", resource: "conversaciones" },
  { id: "publicar-ausencias", week: 3, dueDate: "2026-11-26", title: "Explicar cómo medir una cita no atendida", description: "Usa un cálculo hipotético identificado como ejemplo y el artículo existente. No atribuyas cifras a clientes.", resource: "plan" },
  { id: "elegir-problema", week: 3, dueDate: "2026-11-27", title: "Elegir el problema con mayor interés observado", description: "Revisa si se repite una dificultad y si el público encaja. Las metas del plan son orientativas.", resource: "plan" },
  { id: "publicar-flujo", week: 4, dueDate: "2026-12-01", title: "Demostrar un recorrido de consulta y seguimiento", description: "Presenta el flujo propio de CodeConnect usando datos ficticios, sin mostrar información del panel de clientes.", resource: "plan" },
  { id: "llamadas-semana-4", week: 4, dueDate: "2026-12-02", title: "Celebrar las conversaciones acordadas", description: "Utiliza el guion de 20 minutos y registra problema, herramientas y siguiente paso.", resource: "conversaciones" },
  { id: "publicar-cuando-no", week: 4, dueDate: "2026-12-03", title: "Explicar cuándo no compensa desarrollar a medida", description: "Reutiliza el artículo existente y ofrece una valoración del proceso.", resource: "plan" },
  { id: "propuestas-semana-4", week: 4, dueDate: "2026-12-04", title: "Preparar propuestas para oportunidades cualificadas", description: "Acota entregables, dependencias, costes y límites solo cuando haya una necesidad confirmada.", resource: "conversaciones" },
  { id: "publicar-presupuesto", week: 5, dueDate: "2026-12-08", title: "Explicar qué necesitas para dar un presupuesto", description: "Habla de proceso, herramientas, usuarios y límites. Dirige al formulario breve.", resource: "plan" },
  { id: "resolver-dudas", week: 5, dueDate: "2026-12-09", title: "Resolver dudas de las oportunidades abiertas", description: "Anota cada objeción real y acuerda una acción o fecha. No marques una respuesta positiva como contratación.", resource: "conversaciones" },
  { id: "publicar-mejora", week: 5, dueDate: "2026-12-10", title: "Mostrar cómo mejorar una parte del negocio", description: "Prepara un esquema concreto; comprueba las posibilidades de las herramientas antes de prometer integraciones.", resource: "plan" },
  { id: "seguimiento-propuestas", week: 5, dueDate: "2026-12-11", title: "Revisar propuestas y fechas de seguimiento", description: "Retoma lo acordado y respeta cualquier negativa o petición de no recibir más contacto.", resource: "conversaciones" },
  { id: "publicar-enero", week: 6, dueDate: "2026-12-15", title: "Ayudar a elegir una prioridad para enero", description: "Publica tres preguntas para ordenar una mejora tecnológica y ofrece una conversación si hay interés.", resource: "plan" },
  { id: "acordar-enero", week: 6, dueDate: "2026-12-16", title: "Acordar continuidad con las oportunidades activas", description: "Registra próximos pasos reales para enero si la disponibilidad de diciembre es limitada.", resource: "conversaciones" },
  { id: "publicar-aprendizajes", week: 6, dueDate: "2026-12-17", title: "Compartir aprendizajes reales de la campaña", description: "Usa lo observado. Si aún no hay aprendizajes comerciales, explica un criterio técnico propio.", resource: "plan" },
  { id: "balance-campana", week: 6, dueDate: "2026-12-18", title: "Hacer balance y decidir el siguiente ciclo", description: "Registra interacciones, conversaciones cualificadas, propuestas y contratos. Decide qué repetir o ajustar sin confundir actividad con ventas.", resource: "plan" },
];

export const researchAccounts = [
  { name: "Massalud", url: "https://massalud.org/contacto/", observation: "La página de contacto presenta teléfono y formulario para esta clínica de fisioterapia en Madrid.", question: "¿Cómo se gestiona una solicitud hasta confirmar la cita?" },
  { name: "EstudioFisio", url: "https://estudiofisio.es/pedir-cita/", observation: "Presenta distintas clínicas y reserva eligiendo profesional, día y hora.", question: "¿Existe alguna necesidad entre la reserva y la operativa de las sedes?" },
  { name: "Mi Fisio En Madrid", url: "https://www.mifisioenmadrid.es/contacto", observation: "Publica cita online y describe confirmaciones por WhatsApp o email.", question: "¿Qué parte del recorrido está resuelta y qué desean mejorar?" },
  { name: "María Pastor Nutrición", url: "https://nutricionmpastor.es/pide-tu-cita/", observation: "Diferencia consultas iniciales y revisiones; presenta WhatsApp para concertar cita presencial en Madrid.", question: "¿Cómo coordinan las modalidades y tipos de consulta?" },
  { name: "Holvia", url: "https://holvia.es/nutricionista-madrid/", observation: "Su página presenta solicitud de primera consulta con llamada posterior.", question: "¿Cómo siguen las solicitudes recibidas y qué prioridad de mejora tienen?" },
];

export function progressPath(userId: string, taskId: string): string {
  return `${userId}/${CAMPAIGN_ID}/${taskId}.json`;
}

export function parseProgressUpdate(body: Record<string, unknown>):
  | { ok: true; value: Pick<TaskProgress, "taskId" | "status" | "notes"> }
  | { ok: false; error: string } {
  if (typeof body.taskId !== "string" || !promotionTasks.some((task) => task.id === body.taskId)) {
    return { ok: false, error: "Acción no válida" };
  }
  if (!PROMOTION_STATUSES.includes(body.status as PromotionStatus)) {
    return { ok: false, error: "Estado no válido" };
  }
  if (typeof body.notes !== "string" || body.notes.length > 4000) {
    return { ok: false, error: "Las notas deben tener como máximo 4.000 caracteres" };
  }
  return { ok: true, value: { taskId: body.taskId, status: body.status as PromotionStatus, notes: body.notes.trim() } };
}
