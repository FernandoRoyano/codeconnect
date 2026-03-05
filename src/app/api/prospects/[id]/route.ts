import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("prospects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  // Build update object from camelCase to snake_case
  const update: Record<string, unknown> = {};
  if (body.name !== undefined) update.name = body.name;
  if (body.position !== undefined) update.position = body.position || null;
  if (body.company !== undefined) update.company = body.company || null;
  if (body.city !== undefined) update.city = body.city || null;
  if (body.country !== undefined) update.country = body.country || null;
  if (body.segment !== undefined) update.segment = body.segment || null;
  if (body.whyGoodProspect !== undefined) update.why_good_prospect = body.whyGoodProspect || null;
  if (body.contactNotes !== undefined) update.contact_notes = body.contactNotes || null;
  if (body.websiteUrl !== undefined) update.website_url = body.websiteUrl || null;
  if (body.hasOnlineBooking !== undefined) update.has_online_booking = body.hasOnlineBooking;
  if (body.hasApp !== undefined) update.has_app = body.hasApp;
  if (body.websiteQuality !== undefined) update.website_quality = body.websiteQuality > 0 ? body.websiteQuality : null;
  if (body.email !== undefined) update.email = body.email || null;
  if (body.phone !== undefined) update.phone = body.phone || null;

  if (body.pipelineStatus !== undefined) {
    update.pipeline_status = body.pipelineStatus;
    // Auto-set contacted_at when status changes to "contactado"
    if (body.pipelineStatus === "contactado" && !body.contacted_at) {
      // Check if contacted_at is already set
      const { data: existing } = await supabase
        .from("prospects")
        .select("contacted_at")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();
      if (existing && !existing.contacted_at) {
        update.contacted_at = new Date().toISOString();
      }
    }
  }

  const { data, error } = await supabase
    .from("prospects")
    .update(update)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("prospects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
