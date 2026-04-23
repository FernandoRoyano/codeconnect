import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, empresa, servicio, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      web: "Desarrollo Web",
      software: "Software a Medida",
      apps: "Aplicaciones Moviles",
      consultoria: "Consultoria",
      otro: "Otro",
    };

    const { error } = await resend.emails.send({
      from: "CodeConnect <onboarding@resend.dev>",
      to: "codeconnectsl@gmail.com",
      replyTo: email,
      subject: `Nuevo contacto: ${nombre}${empresa ? ` - ${empresa}` : ""}`,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#f8f9fa;font-family:sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#194973;padding:24px 32px;">
      <h1 style="margin:0;color:#fff;font-size:18px;">Nuevo mensaje de contacto</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;width:120px;">Nombre</td><td style="padding:8px 0;color:#194973;font-weight:600;">${nombre}</td></tr>
        <tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#71C648;">${email}</a></td></tr>
        ${telefono ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Telefono</td><td style="padding:8px 0;color:#194973;">${telefono}</td></tr>` : ""}
        ${empresa ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Empresa</td><td style="padding:8px 0;color:#194973;">${empresa}</td></tr>` : ""}
        ${servicio ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Servicio</td><td style="padding:8px 0;color:#194973;">${serviceLabels[servicio] || servicio}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f8f9fa;border-radius:8px;">
        <p style="margin:0 0 4px;font-size:13px;color:#5A6D6D;">Mensaje</p>
        <p style="margin:0;color:#194973;line-height:1.6;">${mensaje.replace(/\n/g, "<br>")}</p>
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
