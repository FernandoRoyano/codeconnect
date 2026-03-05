import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const segment = searchParams.get("segment");

  let query = supabase
    .from("prospects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("pipeline_status", status);
  }
  if (segment && segment !== "all") {
    query = query.eq("segment", segment);
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,company.ilike.%${search}%,city.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const { data, error } = await supabase.from("prospects").insert({
    user_id: user.id,
    name: body.name,
    position: body.position || null,
    company: body.company || null,
    city: body.city || null,
    country: body.country || null,
    segment: body.segment || null,
    why_good_prospect: body.whyGoodProspect || null,
    contact_notes: body.contactNotes || null,
    website_url: body.websiteUrl || null,
    has_online_booking: body.hasOnlineBooking || false,
    has_app: body.hasApp || false,
    website_quality: body.websiteQuality > 0 ? body.websiteQuality : null,
    pipeline_status: body.pipelineStatus || "identificado",
    email: body.email || null,
    phone: body.phone || null,
    contacted_at: body.pipelineStatus === "contactado" ? new Date().toISOString() : null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
