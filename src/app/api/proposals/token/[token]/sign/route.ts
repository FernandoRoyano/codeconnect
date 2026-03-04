import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import {
  sendSignatureConfirmationToClient,
  sendSignatureNotificationToAdmin,
} from "@/lib/email";

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

  if (proposal.status === "aceptada") {
    return NextResponse.json({ error: "Already signed" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = proposal.client as any;
  const clientData = Array.isArray(client) ? client[0] : client;
  const clientName = clientData?.name || "Cliente";
  const clientEmail = clientData?.email;

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

  // Send notification emails (fire-and-forget)
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const dashboardUrl = `${protocol}://${host}/dashboard/propuestas/${proposal.id}`;

  // Confirmation to client
  if (clientEmail) {
    sendSignatureConfirmationToClient({
      to: clientEmail,
      clientName,
      projectName: proposal.project_name,
      referenceCode: proposal.reference_code,
    }).catch((err) => console.error("Failed to send client confirmation:", err));
  }

  // Notification to admin
  if (proposal.user_id) {
    (async () => {
      try {
        const { data: { user: owner } } = await supabase.auth.admin.getUserById(proposal.user_id);
        if (owner?.email) {
          await sendSignatureNotificationToAdmin({
            to: owner.email,
            clientName,
            projectName: proposal.project_name,
            referenceCode: proposal.reference_code,
            dashboardUrl,
          });
        }
      } catch (err) {
        console.error("Failed to send admin notification:", err);
      }
    })();
  }

  return NextResponse.json({ ok: true });
}
