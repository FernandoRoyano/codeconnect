import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("proposals")
    .update({
      status: "enviada",
      sent_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("token")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const publicUrl = `/propuesta/${data.token}`;
  return NextResponse.json({ publicUrl, token: data.token });
}
