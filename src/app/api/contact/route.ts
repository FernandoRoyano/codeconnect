import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  escapeHtml,
  getClientIp,
  isRateLimited,
  readEmailEnv,
  readJsonBody,
  readString,
} from "@/lib/api/form-guards";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(getClientIp(request), RATE_LIMIT)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo más tarde." }, { status: 429 });
    }

    const parsed = await readJsonBody(request, MAX_BODY_BYTES);
    if (!parsed.ok) {
      const error = parsed.status === 413 ? "Solicitud demasiado grande" : "Solicitud no válida";
      return NextResponse.json({ error }, { status: parsed.status });
    }
    const data = parsed.data;

    // Honeypot: campo que una persona nunca rellena. Devolvemos exito para no
    // avisar al bot de que le hemos visto, pero no se envia nada.
    if (data.website) return NextResponse.json({ success: true });

    const nombre = readString(data.nombre, 100, true);
    const email = readString(data.email, 254, true);
    const telefono = readString(data.telefono, 40);
    const empresa = readString(data.empresa, 120);
    const servicio = readString(data.servicio, 40);
    const mensaje = readString(data.mensaje, 5_000, true);

    if (!nombre || !email || !mensaje || telefono === null || empresa === null || servicio === null) {
      return NextResponse.json(
        { error: "Revisa los campos del formulario" },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = readEmailEnv(process.env.CONTACT_EMAIL_FROM);
    const to = readEmailEnv(process.env.CONTACT_EMAIL_TO);
    if (!apiKey || !from || !to) {
      console.error("[contact] Missing email configuration");
      return NextResponse.json({ error: "Servicio no disponible" }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const safe = {
      nombre: escapeHtml(nombre),
      email: escapeHtml(email),
      telefono: escapeHtml(telefono),
      empresa: escapeHtml(empresa),
      servicio: escapeHtml(servicio),
      mensaje: escapeHtml(mensaje),
    };

    const serviceLabels: Record<string, string> = {
      web: "Desarrollo Web",
      software: "Software a Medida",
      apps: "Aplicaciones Moviles",
      consultoria: "Consultoria",
      otro: "Otro",
    };

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto: ${nombre}${empresa ? ` - ${empresa}` : ""}`.replace(/[\r\n]/g, " "),
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#f8f9fa;font-family:sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#194973;padding:24px 32px;">
      <h1 style="margin:0;color:#fff;font-size:18px;">Nuevo mensaje de contacto</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;width:120px;">Nombre</td><td style="padding:8px 0;color:#194973;font-weight:600;">${safe.nombre}</td></tr>
        <tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${safe.email}" style="color:#71C648;">${safe.email}</a></td></tr>
        ${telefono ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Telefono</td><td style="padding:8px 0;color:#194973;">${safe.telefono}</td></tr>` : ""}
        ${empresa ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Empresa</td><td style="padding:8px 0;color:#194973;">${safe.empresa}</td></tr>` : ""}
        ${servicio ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Servicio</td><td style="padding:8px 0;color:#194973;">${escapeHtml(serviceLabels[servicio] || servicio)}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f8f9fa;border-radius:8px;">
        <p style="margin:0 0 4px;font-size:13px;color:#5A6D6D;">Mensaje</p>
        <p style="margin:0;color:#194973;line-height:1.6;">${safe.mensaje.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
  </div>
</body></html>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Error al enviar el mensaje" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
