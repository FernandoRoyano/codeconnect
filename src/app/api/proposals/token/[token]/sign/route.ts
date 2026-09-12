import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import {
  sendSignatureConfirmationToClient,
  sendSignatureNotificationToAdmin,
} from "@/lib/email";

// Solo una propuesta ya enviada al cliente puede firmarse: un borrador,
// una descartada o una rechazada no son ofertas vivas.
const SIGNABLE_STATUSES = ["enviada", "vista"];

// El pad envia canvas.toDataURL() -> PNG en base64. 200 KB cubre una firma
// en pantalla retina de sobra y evita que se guarden megas en la fila.
const SIGNATURE_PREFIX = "data:image/png;base64,";
const MAX_SIGNATURE_BYTES = 200_000;

function readSignature(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (!value.startsWith(SIGNATURE_PREFIX)) return null;
  if (value.length > MAX_SIGNATURE_BYTES) return null;
  const payload = value.slice(SIGNATURE_PREFIX.length);
  if (!payload || !/^[A-Za-z0-9+/]+={0,2}$/.test(payload)) return null;
  return value;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
  }

  const signatureData = readSignature((body as Record<string, unknown>).signatureData);
  if (!signatureData) {
    return NextResponse.json({ error: "Firma no válida" }, { status: 400 });
  }

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

  if (!SIGNABLE_STATUSES.includes(proposal.status)) {
    return NextResponse.json(
      { error: "Esta propuesta no se puede firmar en su estado actual" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = proposal.client as any;
  const clientData = Array.isArray(client) ? client[0] : client;
  const clientName = clientData?.name || "Cliente";
  const clientEmail = clientData?.email;

  // El filtro por estado tambien va en el UPDATE: si llegan dos firmas a la vez,
  // la segunda no encuentra fila y no puede pisar la primera.
  const { data: signed, error } = await supabase
    .from("proposals")
    .update({
      status: "aceptada",
      signature_data: signatureData,
      signed_at: new Date().toISOString(),
      signed_by_name: clientName,
      terms_accepted: true,
    })
    .eq("id", proposal.id)
    .in("status", SIGNABLE_STATUSES)
    .select("id")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!signed) return NextResponse.json({ error: "Already signed" }, { status: 409 });

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
