import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function readString(value: unknown, maxLength: number, required = false) {
  if (value == null || value === "") return required ? null : "";
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if ((required && !normalized) || normalized.length > maxLength) return null;
  return normalized;
}

function isRateLimited(ip: string) {
  if (ip === "unknown") return false;
  const now = Date.now();
  const recent = (requestsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestsByIp.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo más tarde." }, { status: 429 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 });
    }
    const body: unknown = JSON.parse(rawBody);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Solicitud no válida" }, { status: 400 });
    }

    const data = body as Record<string, unknown>;
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
    const from = process.env.CONTACT_EMAIL_FROM;
    const to = process.env.CONTACT_EMAIL_TO;
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
