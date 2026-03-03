import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createServiceRoleClient();

  // Get proposal
  const { data: proposal } = await supabase
    .from("proposals")
    .select("id, status")
    .eq("token", token)
    .single();

  if (!proposal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Record view
  const userAgent = request.headers.get("user-agent") || null;
  await supabase.from("proposal_views").insert({
    proposal_id: proposal.id,
    user_agent: userAgent,
  });

  // Update status to 'vista' if currently 'enviada'
  if (proposal.status === "enviada") {
    await supabase
      .from("proposals")
      .update({
        status: "vista",
        first_viewed_at: new Date().toISOString(),
      })
      .eq("id", proposal.id);
  }

  return NextResponse.json({ ok: true });
}
