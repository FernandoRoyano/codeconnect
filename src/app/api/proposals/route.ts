import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateProposalToken, generateReferenceCode } from "@/lib/utils/tokens";
import { PAYMENT_STRUCTURES, type PaymentStructureKey } from "@/lib/constants/proposal";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  let query = supabase
    .from("proposals")
    .select("*, client:clients(*), payments(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  if (search) {
    query = query.or(`project_name.ilike.%${search}%,reference_code.ilike.%${search}%`);
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
  const token = generateProposalToken();
  const referenceCode = generateReferenceCode();

  // Find or create client
  let clientId: string | null = null;
  if (body.clientEmail) {
    const { data: existing } = await supabase
      .from("clients")
      .select("id")
      .eq("email", body.clientEmail)
      .single();

    if (existing) {
      clientId = existing.id;
      await supabase.from("clients").update({
        name: body.clientName,
        company: body.clientCompany || null,
      }).eq("id", clientId);
    } else {
      const { data: newClient } = await supabase.from("clients").insert({
        name: body.clientName,
        email: body.clientEmail,
        company: body.clientCompany || null,
      }).select("id").single();
      clientId = newClient?.id || null;
    }
  }

  // Create proposal
  const { data: proposal, error } = await supabase.from("proposals").insert({
    token,
    reference_code: referenceCode,
    client_id: clientId,
    user_id: user.id,
    status: body.status || "borrador",
    business_name: body.businessName || "CodeConnect",
    project_type: body.projectType,
    project_name: body.projectName,
    project_description: body.projectDescription || null,
    deliverables: body.deliverables?.filter(Boolean) || [],
    project_size: body.projectSize || "medium",
    total_price: parseFloat(body.totalPrice) || 0,
    currency: body.currency || "EUR",
    payment_structure: body.paymentStructure || "two",
    estimated_days: body.estimatedDays ? parseInt(body.estimatedDays) : null,
    start_date: body.startDate || null,
    extra_revision_price: body.extraRevisionPrice ? parseFloat(body.extraRevisionPrice) : null,
    notes: body.notes || null,
    sent_at: body.status === "enviada" ? new Date().toISOString() : null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Generate payment schedule
  const structureKey = (body.paymentStructure || "two") as PaymentStructureKey;
  const structure = PAYMENT_STRUCTURES[structureKey] || PAYMENT_STRUCTURES.two;
  const total = parseFloat(body.totalPrice) || 0;

  const paymentInserts = structure.splits.map((split, i) => ({
    proposal_id: proposal.id,
    label: split.label,
    percentage: split.pct,
    amount: Math.round((total * split.pct / 100) * 100) / 100,
    currency: body.currency || "EUR",
    sort_order: i,
  }));

  await supabase.from("payments").insert(paymentInserts);

  return NextResponse.json(proposal, { status: 201 });
}
