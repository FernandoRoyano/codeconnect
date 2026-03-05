import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { prospects } = body;

  if (!Array.isArray(prospects) || prospects.length === 0) {
    return NextResponse.json({ error: "No prospects to import" }, { status: 400 });
  }

  const inserts = prospects.map((p: Record<string, unknown>) => ({
    user_id: user.id,
    name: String(p.name || "").trim(),
    position: p.position ? String(p.position).trim() : null,
    company: p.company ? String(p.company).trim() : null,
    city: p.city ? String(p.city).trim() : null,
    country: p.country ? String(p.country).trim() : null,
    segment: p.segment ? String(p.segment).trim() : null,
    why_good_prospect: p.whyGoodProspect ? String(p.whyGoodProspect).trim() : null,
    contact_notes: p.contactNotes ? String(p.contactNotes).trim() : null,
    website_url: p.websiteUrl ? String(p.websiteUrl).trim() : null,
    has_online_booking: p.hasOnlineBooking === true || String(p.hasOnlineBooking || "").toLowerCase() === "si" || String(p.hasOnlineBooking || "").toLowerCase() === "sí" || String(p.hasOnlineBooking || "").toLowerCase() === "yes",
    has_app: p.hasApp === true || String(p.hasApp || "").toLowerCase() === "si" || String(p.hasApp || "").toLowerCase() === "sí" || String(p.hasApp || "").toLowerCase() === "yes",
    website_quality: p.websiteQuality ? Math.min(5, Math.max(1, parseInt(String(p.websiteQuality)))) : null,
    pipeline_status: "identificado" as const,
    email: p.email ? String(p.email).trim() : null,
    phone: p.phone ? String(p.phone).trim() : null,
  })).filter((p) => p.name);

  if (inserts.length === 0) {
    return NextResponse.json({ error: "No valid prospects found (name is required)" }, { status: 400 });
  }

  const { data, error } = await supabase.from("prospects").insert(inserts).select("id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ imported: data?.length || 0 }, { status: 201 });
}
