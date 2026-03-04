import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return _resend;
}

const FROM_EMAIL = "CodeConnect <propuestas@codeconnect.es>";

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#194973,#0f3150);border-radius:16px 16px 0 0;padding:32px 40px;">
          <span style="display:inline-block;width:20px;height:20px;background-color:#71C648;border-radius:50%;vertical-align:middle;"></span>
          <span style="font-size:18px;font-weight:800;color:#ffffff;margin-left:8px;vertical-align:middle;">CodeConnect</span>
        </td></tr>
        <tr><td style="background-color:#ffffff;padding:40px;border:1px solid #e5e7eb;border-top:0;">
          ${content}
        </td></tr>
        <tr><td style="padding:24px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">CodeConnect - Desarrollo de software a medida</p>
          <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">Este email fue enviado desde codeconnect.es</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ctaButton(url: string, text: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
  <tr><td align="center">
    <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#71C648,#5db33a);color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 32px;border-radius:12px;">
      ${text}
    </a>
  </td></tr>
</table>`;
}

export async function sendProposalEmail(params: {
  to: string;
  clientName: string;
  projectName: string;
  totalPrice: string;
  proposalUrl: string;
}) {
  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#194973;">Hola ${params.clientName},</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#5A6D6D;line-height:1.6;">
      Te hemos preparado una propuesta para tu proyecto. Revisa los detalles y, si est&aacute;s de acuerdo, puedes aceptarla directamente desde el enlace.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:12px;padding:24px;margin-bottom:8px;">
      <tr><td>
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#5A6D6D;text-transform:uppercase;letter-spacing:1px;">Proyecto</p>
        <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#194973;">${params.projectName}</p>
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#5A6D6D;text-transform:uppercase;letter-spacing:1px;">Inversi&oacute;n</p>
        <p style="margin:0;font-size:28px;font-weight:900;color:#194973;">${params.totalPrice}</p>
        <p style="margin:4px 0 0;font-size:12px;color:#5A6D6D;">IVA no incluido</p>
      </td></tr>
    </table>
    ${ctaButton(params.proposalUrl, "Ver propuesta completa")}
    <p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;">
      Si el bot&oacute;n no funciona, copia este enlace:<br/>
      <a href="${params.proposalUrl}" style="color:#71C648;word-break:break-all;">${params.proposalUrl}</a>
    </p>`;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Propuesta: ${params.projectName} - CodeConnect`,
    html: emailLayout(content),
  });
}

export async function sendSignatureConfirmationToClient(params: {
  to: string;
  clientName: string;
  projectName: string;
  referenceCode: string;
}) {
  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:48px;">&#10003;</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#194973;text-align:center;">Propuesta aceptada</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#5A6D6D;line-height:1.6;text-align:center;">
      Gracias ${params.clientName}, hemos registrado tu firma correctamente. Nos pondremos en contacto contigo para los pr&oacute;ximos pasos.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:2px solid #71C648;border-radius:12px;padding:24px;">
      <tr><td style="text-align:center;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#5A6D6D;text-transform:uppercase;letter-spacing:1px;">Referencia</p>
        <p style="margin:0;font-size:18px;font-weight:800;color:#194973;">${params.referenceCode}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#5A6D6D;">Proyecto: ${params.projectName}</p>
      </td></tr>
    </table>`;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Confirmaci\u00f3n: Propuesta ${params.referenceCode} aceptada`,
    html: emailLayout(content),
  });
}

export async function sendSignatureNotificationToAdmin(params: {
  to: string;
  clientName: string;
  projectName: string;
  referenceCode: string;
  dashboardUrl: string;
}) {
  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:48px;">&#127881;</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#194973;text-align:center;">Propuesta firmada</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#5A6D6D;line-height:1.6;text-align:center;">
      <strong>${params.clientName}</strong> ha aceptado y firmado la propuesta <strong>${params.referenceCode}</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0fdf4;border:2px solid #71C648;border-radius:12px;padding:24px;">
      <tr><td>
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#5A6D6D;text-transform:uppercase;letter-spacing:1px;">Proyecto</p>
        <p style="margin:0;font-size:16px;font-weight:700;color:#194973;">${params.projectName}</p>
      </td></tr>
    </table>
    ${ctaButton(params.dashboardUrl, "Ver en el dashboard")}`;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Firmada: ${params.clientName} ha aceptado ${params.referenceCode}`,
    html: emailLayout(content),
  });
}

export async function sendRejectionNotificationToAdmin(params: {
  to: string;
  clientName: string;
  projectName: string;
  referenceCode: string;
  rejectionReason: string | null;
  dashboardUrl: string;
}) {
  const reasonBlock = params.rejectionReason
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fef2f2;border:1px solid #fca5a5;border-radius:12px;padding:20px;margin-top:16px;">
        <tr><td>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#5A6D6D;text-transform:uppercase;letter-spacing:1px;">Motivo</p>
          <p style="margin:0;font-size:14px;color:#194973;line-height:1.5;">${params.rejectionReason}</p>
        </td></tr>
      </table>`
    : "";

  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:48px;">&#10060;</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#194973;text-align:center;">Propuesta rechazada</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#5A6D6D;line-height:1.6;text-align:center;">
      <strong>${params.clientName}</strong> ha rechazado la propuesta <strong>${params.referenceCode}</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fa;border-radius:12px;padding:24px;">
      <tr><td>
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#5A6D6D;text-transform:uppercase;letter-spacing:1px;">Proyecto</p>
        <p style="margin:0;font-size:16px;font-weight:700;color:#194973;">${params.projectName}</p>
      </td></tr>
    </table>
    ${reasonBlock}
    ${ctaButton(params.dashboardUrl, "Ver en el dashboard")}`;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Rechazada: ${params.clientName} ha rechazado ${params.referenceCode}`,
    html: emailLayout(content),
  });
}
