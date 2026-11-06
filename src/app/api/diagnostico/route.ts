import { NextRequest, NextResponse } from "next/server";
import { deliverInquiry } from "@/lib/api/inquiry-delivery";
import { getClientIp, isRateLimited, readEmailEnv, readJsonBody } from "@/lib/api/form-guards";
import { parseInquiry } from "@/lib/api/inquiry";
import { INQUIRY_SECTIONS } from "@/lib/constants/inquiry";
import { sendInquiryConfirmationToUser, sendInquiryNotificationToAdmin } from "@/lib/email";
import { SITE_URL } from "@/lib/seo";

const MAX_BODY_BYTES = 40_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(getClientIp(request), RATE_LIMIT)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Inténtalo más tarde." },
        { status: 429 }
      );
    }

    const parsed = await readJsonBody(request, MAX_BODY_BYTES);
    if (!parsed.ok) {
      const error = parsed.status === 413 ? "Solicitud demasiado grande" : "Solicitud no válida";
      return NextResponse.json({ error }, { status: parsed.status });
    }
    const data = parsed.data;

    // Honeypot: campo que una persona nunca rellena.
    if (data.website) return NextResponse.json({ success: true });

    const result = parseInquiry(data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error, field: result.field }, { status: 400 });
    }
    const inquiry = result.value;

    const to = readEmailEnv(process.env.CONTACT_EMAIL_TO);
    const from = readEmailEnv(process.env.CONTACT_EMAIL_FROM);
    const canEmail = Boolean(process.env.RESEND_API_KEY && to && from);
    const delivery = await deliverInquiry(inquiry, async (inquiryId) => {
      if (!canEmail || !to) throw new Error("Email no disponible");
      const result = await sendInquiryNotificationToAdmin({
        to,
        inquiry: inquiry as unknown as Record<string, string | null>,
        sections: INQUIRY_SECTIONS,
        dashboardUrl: inquiryId
          ? `${SITE_URL}/dashboard/diagnosticos/${inquiryId}`
          : `${SITE_URL}/dashboard/diagnosticos`,
      });
      if (result.error) throw new Error("No se pudo notificar");
    });
    if (!delivery.received) {
      return NextResponse.json({ error: "No hemos podido registrar tu caso. Inténtalo de nuevo." }, { status: 503 });
    }

    // Esperar la respuesta del proveedor evita abandonar el envío al terminar
    // la ejecución serverless. La recepción no depende de esta confirmación.
    if (canEmail) {
      try {
        const confirmation = await sendInquiryConfirmationToUser({ to: inquiry.email, name: inquiry.name });
        if (confirmation.error) console.error("[diagnostico] No se pudo enviar la confirmación");
      } catch {
        console.error("[diagnostico] No se pudo enviar la confirmación");
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[diagnostico] Error inesperado:", err);
    return NextResponse.json({ error: "No hemos podido enviar tu caso" }, { status: 500 });
  }
}
