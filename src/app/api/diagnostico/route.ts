import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
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

    // Se intentan las dos vias por separado. Un diagnostico es un contacto
    // comercial: perderlo en silencio porque una de las dos falle no es una
    // opcion, asi que solo se devuelve error si fallan ambas.
    let inquiryId: string | null = null;
    let storeError: unknown = null;
    try {
      const supabase = createServiceRoleClient();
      const { data: row, error } = await supabase
        .from("inquiries")
        .insert(inquiry)
        .select("id")
        .single();
      if (error) throw error;
      inquiryId = row?.id ?? null;
    } catch (err) {
      storeError = err;
      console.error("[diagnostico] No se pudo guardar la inquiry:", err);
    }

    const to = readEmailEnv(process.env.CONTACT_EMAIL_TO);
    const from = readEmailEnv(process.env.CONTACT_EMAIL_FROM);
    const canEmail = Boolean(process.env.RESEND_API_KEY && to && from);

    let notified = false;
    if (canEmail && to) {
      try {
        await sendInquiryNotificationToAdmin({
          to,
          inquiry: inquiry as unknown as Record<string, string | null>,
          sections: INQUIRY_SECTIONS,
          dashboardUrl: inquiryId
            ? `${SITE_URL}/dashboard/diagnosticos/${inquiryId}`
            : `${SITE_URL}/dashboard/diagnosticos`,
        });
        notified = true;
      } catch (err) {
        console.error("[diagnostico] No se pudo avisar por email:", err);
      }
    } else {
      console.error("[diagnostico] Falta configuracion de email");
    }

    if (!inquiryId && !notified) {
      return NextResponse.json(
        { error: "No hemos podido registrar tu caso. Inténtalo de nuevo o escríbenos por email." },
        { status: 500 }
      );
    }

    if (storeError && notified) {
      console.error("[diagnostico] Inquiry entregada solo por email, sin guardar en base de datos");
    }

    // La confirmacion al usuario no condiciona el resultado: si falla, el caso
    // ya esta recogido por alguna de las dos vias anteriores.
    if (canEmail) {
      sendInquiryConfirmationToUser({ to: inquiry.email, name: inquiry.name }).catch((err) =>
        console.error("[diagnostico] No se pudo confirmar al usuario:", err)
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[diagnostico] Error inesperado:", err);
    return NextResponse.json({ error: "No hemos podido enviar tu caso" }, { status: 500 });
  }
}
