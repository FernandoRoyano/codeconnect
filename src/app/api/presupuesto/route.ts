import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

interface PresupuestoBody {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  comentarios?: string;
  tipoProyectoLabel: string;
  funcionalidades: string[];
  otraFuncionalidad?: string;
  integraciones: string[];
  otraIntegracion?: string;
  numeroUsuarios?: string;
  necesitaApp?: boolean;
  presupuesto?: {
    precioBase: number;
    subtotal: number;
    total: number;
    multiplicador: number;
    precioApp: number;
  };
  solicitaLlamada?: boolean;
}

const formatPrecio = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PresupuestoBody;
    const {
      nombre,
      email,
      telefono,
      empresa,
      comentarios,
      tipoProyectoLabel,
      funcionalidades = [],
      otraFuncionalidad,
      integraciones = [],
      otraIntegracion,
      numeroUsuarios,
      necesitaApp,
      presupuesto,
      solicitaLlamada,
    } = body;

    if (!nombre || !email) {
      return NextResponse.json({ error: "Nombre y email son obligatorios" }, { status: 400 });
    }

    const total = presupuesto?.total ?? 0;
    const totalStr = total > 0 ? formatPrecio(total) : "A consultar";

    const subject = solicitaLlamada
      ? `LLAMADA solicitada: ${nombre}${empresa ? ` (${empresa})` : ""} - ${totalStr}`
      : `Nuevo presupuesto: ${nombre}${empresa ? ` (${empresa})` : ""} - ${totalStr}`;

    const bannerColor = solicitaLlamada ? "#71C648" : "#194973";
    const bannerText = solicitaLlamada
      ? "El cliente pide que le llames para concretar"
      : "Nueva solicitud de presupuesto";

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;width:140px;">${escape(label)}</td><td style="padding:8px 0;color:#194973;font-weight:600;">${value}</td></tr>`;

    const telRow = telefono
      ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Teléfono</td><td style="padding:8px 0;"><a href="tel:${escape(telefono)}" style="color:#71C648;text-decoration:none;font-weight:600;">${escape(telefono)}</a></td></tr>`
      : "";

    const funcList = funcionalidades.length
      ? `<li><strong>Funcionalidades:</strong> ${funcionalidades.map(escape).join(", ")}</li>`
      : "";
    const otraFuncLine = otraFuncionalidad
      ? `<li><strong>Otra funcionalidad:</strong> ${escape(otraFuncionalidad)}</li>`
      : "";
    const integList = integraciones.length
      ? `<li><strong>Integraciones:</strong> ${integraciones.map(escape).join(", ")}</li>`
      : "";
    const otraIntegLine = otraIntegracion
      ? `<li><strong>Otra integración:</strong> ${escape(otraIntegracion)}</li>`
      : "";
    const usuariosLine = numeroUsuarios ? `<li><strong>Escala:</strong> ${escape(numeroUsuarios)}</li>` : "";
    const appLine = necesitaApp ? `<li><strong>Incluye app móvil</strong></li>` : "";

    const priceBlock = presupuesto
      ? `
      <div style="margin-top:16px;padding:16px;background:#194973;color:#fff;border-radius:8px;">
        <div style="font-size:12px;color:#71C648;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Presupuesto estimado</div>
        <div style="font-size:28px;font-weight:700;">${totalStr}</div>
        <div style="font-size:12px;color:#cbd5e1;margin-top:6px;">
          Base ${formatPrecio(presupuesto.precioBase)} · Subtotal ${formatPrecio(presupuesto.subtotal)}
          ${presupuesto.multiplicador > 1 ? ` · x${presupuesto.multiplicador} escala` : ""}
          ${presupuesto.precioApp > 0 ? ` · +${formatPrecio(presupuesto.precioApp)} app` : ""}
        </div>
      </div>`
      : "";

    const comentariosBlock = comentarios
      ? `<div style="margin-top:16px;padding:16px;background:#f8f9fa;border-radius:8px;">
           <p style="margin:0 0 4px;font-size:13px;color:#5A6D6D;">Comentarios del cliente</p>
           <p style="margin:0;color:#194973;line-height:1.6;">${escape(comentarios).replace(/\n/g, "<br>")}</p>
         </div>`
      : "";

    const { error } = await resend.emails.send({
      from: "CodeConnect <onboarding@resend.dev>",
      to: "codeconnectsl@gmail.com",
      replyTo: email,
      subject,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#f8f9fa;font-family:sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:${bannerColor};padding:20px 28px;">
      <div style="font-size:11px;color:#fff;opacity:0.75;text-transform:uppercase;letter-spacing:1px;">${bannerText}</div>
      <h1 style="margin:4px 0 0;color:#fff;font-size:20px;">${escape(tipoProyectoLabel || "Proyecto")}</h1>
    </div>
    <div style="padding:28px;">
      <h2 style="margin:0 0 12px;color:#194973;font-size:16px;">Contacto</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Nombre", escape(nombre))}
        <tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${escape(email)}" style="color:#71C648;text-decoration:none;font-weight:600;">${escape(email)}</a></td></tr>
        ${telRow}
        ${empresa ? row("Empresa", escape(empresa)) : ""}
      </table>

      <h2 style="margin:24px 0 12px;color:#194973;font-size:16px;">Detalle del proyecto</h2>
      <ul style="margin:0;padding-left:18px;color:#194973;line-height:1.8;font-size:14px;">
        ${funcList}
        ${otraFuncLine}
        ${integList}
        ${otraIntegLine}
        ${usuariosLine}
        ${appLine}
      </ul>

      ${priceBlock}
      ${comentariosBlock}

      <p style="margin-top:24px;padding:12px;background:#fef3c7;border-radius:8px;color:#92400e;font-size:13px;">
        Responde a este email para contestar directamente a ${escape(nombre)}.
      </p>
    </div>
  </div>
</body></html>`,
    });

    if (error) {
      console.error("[presupuesto] Resend error:", error);
      return NextResponse.json({ error: "Error al enviar el presupuesto" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[presupuesto] Unexpected error:", err);
    return NextResponse.json({ error: "Error al enviar el presupuesto" }, { status: 500 });
  }
}
