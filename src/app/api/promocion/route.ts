import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { readJsonBody } from "@/lib/api/form-guards";
import { CAMPAIGN_ID, PROGRESS_BUCKET, parseProgressUpdate, progressPath, promotionTasks, type TaskProgress } from "@/content/promotion";

export async function GET() {
  try {
    const auth = await createServerSupabaseClient();
    const { data: { user } } = await auth.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const bucket = createServiceRoleClient().storage.from(PROGRESS_BUCKET);
    const { data: files, error } = await bucket.list(`${user.id}/${CAMPAIGN_ID}`, { limit: 100 });
    if (error) throw new Error("No se pudo leer el progreso");
    const knownFiles = new Map(promotionTasks.map((task) => [`${task.id}.json`, task.id]));
    const progress = await Promise.all((files ?? []).filter((file) => knownFiles.has(file.name)).map(async (file) => {
      const taskId = knownFiles.get(file.name)!;
      const { data, error: downloadError } = await bucket.download(progressPath(user.id, taskId));
      if (downloadError || !data) throw new Error("No se pudo leer una acción");
      const row = JSON.parse(await data.text()) as TaskProgress;
      const parsed = parseProgressUpdate(row as unknown as Record<string, unknown>);
      if (!parsed.ok || row.taskId !== taskId) throw new Error("Progreso no válido");
      return row;
    }));
    return NextResponse.json({ progress }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "No se pudo cargar tu progreso. Inténtalo de nuevo." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await createServerSupabaseClient();
    const { data: { user } } = await auth.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const json = await readJsonBody(request, 24_000);
    if (!json.ok) return NextResponse.json({ error: "Solicitud no válida" }, { status: json.status });
    const parsed = parseProgressUpdate(json.data);
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const now = new Date().toISOString();
    const progress: TaskProgress = { ...parsed.value, completedAt: parsed.value.status === "done" ? now : null, updatedAt: now };
    const bucket = createServiceRoleClient().storage.from(PROGRESS_BUCKET);
    const path = progressPath(user.id, parsed.value.taskId);
    if (progress.status === "done") {
      const { data: previous } = await bucket.download(path);
      if (previous) {
        const row = JSON.parse(await previous.text()) as TaskProgress;
        if (row.status === "done" && typeof row.completedAt === "string") progress.completedAt = row.completedAt;
      }
    }
    const { error } = await bucket.upload(
      path, JSON.stringify(progress),
      { upsert: true, contentType: "application/json", cacheControl: "0" },
    );
    if (error) throw new Error("No se pudo guardar");
    return NextResponse.json({ progress }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar el cambio. Tus notas siguen en pantalla." }, { status: 503 });
  }
}
