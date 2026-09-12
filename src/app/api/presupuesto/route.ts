import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  escapeHtml,
  getClientIp,
  isRateLimited,
  readEmailEnv,
  readFiniteNumber,
  readJsonBody,
  readString,
  readStringArray,
} from "@/lib/api/form-guards";

const MAX_BODY_BYTES = 40_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 8 };

// Tope defensivo para las cifras: el presupuesto lo calcula el navegador y llega
// en el cuerpo, asi que es dato del cliente, no una cifra de confianza. Solo
// sirve para que el correo sea legible.
const MAX_PRICE = 1_000_000;

const formatPrecio = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

type Presupuesto = {
  precioBase: number;
  subtotal: number;
  total: number;
  multiplicador: number;
  precioApp: number;
  precioMin: number | null;
  precioMax: number | null;
};

// undefined = no venia; null = venia mal formado y hay que rechazar la peticion.
function readPresupuesto(value: unknown): Presupuesto | null | undefined {
  if (value == null) return undefined;
  if (typeof value !== "object" || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;

  const precioBase = readFiniteNumber(raw.precioBase, 0, MAX_PRICE);
  const subtotal = readFiniteNumber(raw.subtotal, 0, MAX_PRICE);
  const total = readFiniteNumber(raw.total, 0, MAX_PRICE);
  const multiplicador = readFiniteNumber(raw.multiplicador, 0, 100);
  const precioApp = readFiniteNumber(raw.precioApp, 0, MAX_PRICE);
  if (precioBase === null || subtotal === null || total === null || multiplicador === null || precioApp === null) {
    return null;
  }

  const precioMin = raw.precioMin == null ? null : readFiniteNumber(raw.precioMin, 0, MAX_PRICE);
  const precioMax = raw.precioMax == null ? null : readFiniteNumber(raw.precioMax, 0, MAX_PRICE);
  if (raw.precioMin != null && precioMin === null) return null;
  if (raw.precioMax != null && precioMax === null) return null;

  return { precioBase, subtotal, total, multiplicador, precioApp, precioMin, precioMax };
}

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
    const comentarios = readString(data.comentarios, 5_000);
    const tipoProyectoLabel = readString(data.tipoProyectoLabel, 120);
    const otraFuncionalidad = readString(data.otraFuncionalidad, 500);
    const otraIntegracion = readString(data.otraIntegracion, 500);
    const numeroUsuarios = readString(data.numeroUsuarios, 80);
    const funcionalidades = readStringArray(data.funcionalidades, 60, 200);
    const integraciones = readStringArray(data.integraciones, 60, 200);
    const presupuesto = readPresupuesto(data.presupuesto);
    const necesitaApp = data.necesitaApp === true;
    const solicitaLlamada = data.solicitaLlamada === true;

    if (!nombre || !email) {
      return NextResponse.json({ error: "Nombre y email son obligatorios" }, { status: 400 });
    }
    if (
      telefono === null ||
      empresa === null ||
      comentarios === null ||
      tipoProyectoLabel === null ||
      otraFuncionalidad === null ||
      otraIntegracion === null ||
      numeroUsuarios === null ||
      funcionalidades === null ||
      integraciones === null ||
      presupuesto === null
    ) {
      return NextResponse.json({ error: "Revisa los datos del formulario" }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = readEmailEnv(process.env.CONTACT_EMAIL_FROM);
    const to = readEmailEnv(process.env.CONTACT_EMAIL_TO);
    if (!apiKey || !from || !to) {
      console.error("[presupuesto] Missing email configuration");
      return NextResponse.json({ error: "Servicio no disponible" }, { status: 503 });
    }

    const total = presupuesto?.total ?? 0;
    const totalStr =
      total > 0 && presupuesto?.precioMin && presupuesto?.precioMax
        ? `${formatPrecio(presupuesto.precioMin)} - ${formatPrecio(presupuesto.precioMax)}`
        : total > 0
          ? formatPrecio(total)
          : "A consultar";

    const subject = (
      solicitaLlamada
        ? `Llamada solicitada - ${nombre}${empresa ? ` (${empresa})` : ""} · ${totalStr}`
        : `Nuevo presupuesto - ${nombre}${empresa ? ` (${empresa})` : ""} · ${totalStr}`
    ).replace(/[\r\n]/g, " ");

    const bannerColor = solicitaLlamada ? "#71C648" : "#194973";
    const bannerText = solicitaLlamada
      ? "El cliente pide que le llames para concretar"
      : "Nueva solicitud de presupuesto";

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;width:140px;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#194973;font-weight:600;">${value}</td></tr>`;

    const telRow = telefono
      ? `<tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Teléfono</td><td style="padding:8px 0;"><a href="tel:${escapeHtml(telefono)}" style="color:#71C648;text-decoration:none;font-weight:600;">${escapeHtml(telefono)}</a></td></tr>`
      : "";

    const funcList = funcionalidades.length
      ? `<li><strong>Funcionalidades:</strong> ${funcionalidades.map(escapeHtml).join(", ")}</li>`
      : "";
    const otraFuncLine = otraFuncionalidad
      ? `<li><strong>Otra funcionalidad:</strong> ${escapeHtml(otraFuncionalidad)}</li>`
      : "";
    const integList = integraciones.length
      ? `<li><strong>Integraciones:</strong> ${integraciones.map(escapeHtml).join(", ")}</li>`
      : "";
    const otraIntegLine = otraIntegracion
      ? `<li><strong>Otra integración:</strong> ${escapeHtml(otraIntegracion)}</li>`
      : "";
    const usuariosLine = numeroUsuarios ? `<li><strong>Escala:</strong> ${escapeHtml(numeroUsuarios)}</li>` : "";
    const appLine = necesitaApp ? `<li><strong>Incluye app móvil</strong></li>` : "";

    const priceBlock = presupuesto
      ? `
      <div style="margin-top:16px;padding:16px;background:#194973;color:#fff;border-radius:8px;">
        <div style="font-size:12px;color:#71C648;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Rango estimado</div>
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
           <p style="margin:0;color:#194973;line-height:1.6;">${escapeHtml(comentarios).replace(/\n/g, "<br>")}</p>
         </div>`
      : "";

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#f8f9fa;font-family:sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:${bannerColor};padding:20px 28px;">
      <div style="font-size:11px;color:#fff;opacity:0.75;text-transform:uppercase;letter-spacing:1px;">${bannerText}</div>
      <h1 style="margin:4px 0 0;color:#fff;font-size:20px;">${escapeHtml(tipoProyectoLabel || "Proyecto")}</h1>
    </div>
    <div style="padding:28px;">
      <h2 style="margin:0 0 12px;color:#194973;font-size:16px;">Contacto</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Nombre", escapeHtml(nombre))}
        <tr><td style="padding:8px 0;color:#5A6D6D;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#71C648;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a></td></tr>
        ${telRow}
        ${empresa ? row("Empresa", escapeHtml(empresa)) : ""}
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
        Responde a este email para contestar directamente a ${escapeHtml(nombre)}.
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
