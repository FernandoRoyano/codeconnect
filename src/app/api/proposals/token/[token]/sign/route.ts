import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const { data: proposal } = await supabase
    .from("proposals")
    .select("id, status, client:clients(name)")
    .eq("token", token)
    .single();

  if (!proposal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (proposal.status === "aceptada") {
    return NextResponse.json({ error: "Already signed" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = proposal.client as any;
  const clientName = (Array.isArray(client) ? client[0]?.name : client?.name) || "Cliente";

  const { error } = await supabase
    .from("proposals")
    .update({
      status: "aceptada",
      signature_data: body.signatureData,
      signed_at: new Date().toISOString(),
      signed_by_name: clientName,
      terms_accepted: true,
    })
    .eq("id", proposal.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
