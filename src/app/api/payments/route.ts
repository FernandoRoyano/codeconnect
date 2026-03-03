import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const proposalId = searchParams.get("proposal_id");
  const paid = searchParams.get("paid");

  let query = supabase
    .from("payments")
    .select("*, proposals!inner(id, project_name, status, user_id, client:clients(name, email))")
    .eq("proposals.user_id", user.id)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (proposalId) {
    query = query.eq("proposal_id", proposalId);
  }
  if (paid === "true") {
    query = query.eq("paid", true);
  } else if (paid === "false") {
    query = query.eq("paid", false);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
