import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendRejectionNotificationToAdmin } from "@/lib/email";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const { data: proposal } = await supabase
    .from("proposals")
    .select("id, status, user_id, reference_code, project_name, client:clients(name, email)")
    .eq("token", token)
    .single();

  if (!proposal) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!["enviada", "vista"].includes(proposal.status)) {
    return NextResponse.json(
      { error: "Esta propuesta no se puede rechazar en su estado actual" },
      { status: 400 }
    );
  }

  const rejectionReason = body.rejectionReason?.trim() || null;

  const { error } = await supabase
    .from("proposals")
    .update({
      status: "rechazada",
      rejection_reason: rejectionReason,
      rejected_at: new Date().toISOString(),
    })
    .eq("id", proposal.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Notify admin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = proposal.client as any;
  const clientData = Array.isArray(client) ? client[0] : client;
  const clientName = clientData?.name || "Cliente";

  if (proposal.user_id) {
    (async () => {
      try {
        const { data: { user: owner } } = await supabase.auth.admin.getUserById(proposal.user_id);
        if (owner?.email) {
          const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
          const protocol = host.includes("localhost") ? "http" : "https";
          await sendRejectionNotificationToAdmin({
            to: owner.email,
            clientName,
            projectName: proposal.project_name,
            referenceCode: proposal.reference_code,
            rejectionReason,
            dashboardUrl: `${protocol}://${host}/dashboard/propuestas/${proposal.id}`,
          });
        }
      } catch (err) {
        console.error("Failed to send rejection notification:", err);
      }
    })();
  }

  return NextResponse.json({ ok: true });
}
