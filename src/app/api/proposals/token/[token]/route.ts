import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("proposals")
    .select("*, client:clients(name, email, company), payments(id, label, percentage, amount, currency, sort_order)")
    .eq("token", token)
    .in("status", ["enviada", "vista", "aceptada", "rechazada"])
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Propuesta no encontrada" }, { status: 404 });
  }

  // Strip sensitive fields
  const { user_id, ...safeData } = data;
  return NextResponse.json(safeData);
}
