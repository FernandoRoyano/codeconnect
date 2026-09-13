import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { readJsonBody, readString } from "@/lib/api/form-guards";
import { isInquiryStatus } from "@/lib/constants/inquiry";

const MAX_BODY_BYTES = 10_000;

async function requireSession() {
  const auth = await createServerSupabaseClient();
  const { data: { user } } = await auth.auth.getUser();
  return user;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("inquiries").select("*").eq("id", id).single();

  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = await readJsonBody(request, MAX_BODY_BYTES);
  if (!parsed.ok) {
    const error = parsed.status === 413 ? "Solicitud demasiado grande" : "Solicitud no válida";
    return NextResponse.json({ error }, { status: parsed.status });
  }

  const update: Record<string, unknown> = {};

  if ("status" in parsed.data) {
    if (!isInquiryStatus(parsed.data.status)) {
      return NextResponse.json({ error: "Estado no válido" }, { status: 400 });
    }
    update.status = parsed.data.status;
    // El paso a revisado deja constancia de cuando se miro por primera vez.
    if (parsed.data.status !== "new") update.reviewed_at = new Date().toISOString();
  }

  if ("internal_notes" in parsed.data) {
    const notes = readString(parsed.data.internal_notes, 5_000);
    if (notes === null) return NextResponse.json({ error: "Notas no válidas" }, { status: 400 });
    update.internal_notes = notes || null;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("inquiries")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[inquiries] Error al actualizar:", error);
    return NextResponse.json({ error: "No se pudo actualizar" }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("inquiries")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[inquiries] Error al eliminar:", error);
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
