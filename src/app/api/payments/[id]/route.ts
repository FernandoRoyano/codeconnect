import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Campos que el panel puede tocar de un pago. El importe, el porcentaje y la
// propuesta a la que pertenece los fija la propuesta, no este endpoint.
const EDITABLE_FIELDS = ["paid", "paid_at", "payment_method", "payment_notes", "due_date"] as const;

type EditableField = (typeof EDITABLE_FIELDS)[number];

function pickUpdate(body: Record<string, unknown>) {
  const update: Partial<Record<EditableField, unknown>> = {};
  for (const field of EDITABLE_FIELDS) {
    if (field in body) update[field] = body[field];
  }
  return update;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }

  const update = pickUpdate(body as Record<string, unknown>);
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  // Propiedad comprobada en el codigo, no solo delegada en RLS.
  const { data: payment } = await supabase
    .from("payments")
    .select("id, proposals!inner(user_id)")
    .eq("id", id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proposal = payment?.proposals as any;
  const ownerId = Array.isArray(proposal) ? proposal[0]?.user_id : proposal?.user_id;

  if (!payment || ownerId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("payments")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
