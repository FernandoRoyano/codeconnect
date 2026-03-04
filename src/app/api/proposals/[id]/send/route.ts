import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendProposalEmail } from "@/lib/email";
import { formatCurrency } from "@/lib/utils/currency";

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
    .select("token, project_name, total_price, currency, client:clients(name, email)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const publicUrl = `${protocol}://${host}/propuesta/${data.token}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = data.client as any;
  const clientData = Array.isArray(client) ? client[0] : client;

  if (clientData?.email) {
    try {
      await sendProposalEmail({
        to: clientData.email,
        clientName: clientData.name || "Cliente",
        projectName: data.project_name,
        totalPrice: formatCurrency(data.total_price, data.currency),
        proposalUrl: publicUrl,
      });
    } catch (emailError) {
      console.error("Failed to send proposal email:", emailError);
    }
  }

  return NextResponse.json({ publicUrl, token: data.token });
}
