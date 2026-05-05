import { calcularPresupuesto, formatearPrecio, getFuncionalidades, getIntegraciones } from "./calculo";
import { tiposProyecto } from "./data";
import type { FormData } from "./types";

export function generarHTMLPresupuesto(formData: FormData): string {
  const presupuesto = calcularPresupuesto(formData);
  const tipoProyectoData = tiposProyecto.find((t) => t.id === formData.tipoProyecto);
  const funcionalidades = getFuncionalidades(formData.tipoProyecto);
  const integraciones = getIntegraciones(formData.tipoProyecto);
  const fecha = new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

  const funcionalidadesSeleccionadas = formData.funcionalidades
    .map((id) => funcionalidades.find((f) => f.id === id))
    .filter(Boolean);
  const integracionesSeleccionadas = formData.integraciones
    .map((id) => integraciones.find((i) => i.id === id))
    .filter(Boolean);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presupuesto CodeConnect - ${formData.empresa || formData.nombre}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; color: #333; line-height: 1.6; background: #f8f9fa; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .card { background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: linear-gradient(135deg, #194973 0%, #0f3150 100%); color: white; padding: 40px; }
    .header h1 { font-size: 28px; margin-bottom: 8px; }
    .header p { opacity: 0.9; }
    .logo { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .logo-circle { width: 24px; height: 24px; border-radius: 50%; }
    .logo-green { background: #71C648; }
    .logo-blue { background: #194973; border: 2px solid white; margin-left: -12px; }
    .content { padding: 40px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #71C648; margin-bottom: 12px; font-weight: 600; }
    .client-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .info-label { font-size: 12px; color: #666; }
    .info-value { font-weight: 600; color: #194973; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .table th { text-align: left; padding: 12px; background: #f8f9fa; color: #194973; font-weight: 600; border-bottom: 2px solid #e0e0e0; }
    .table td { padding: 12px; border-bottom: 1px solid #e0e0e0; }
    .table .price { text-align: right; font-weight: 500; }
    .table .included { color: #71C648; font-size: 12px; }
    .totals { background: #f8f9fa; padding: 24px; border-radius: 12px; margin-top: 30px; }
    .total-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .total-row.subtotal { border-top: 1px solid #e0e0e0; padding-top: 16px; margin-top: 8px; }
    .total-row.final { font-size: 24px; font-weight: bold; color: #194973; border-top: 2px solid #194973; padding-top: 16px; margin-top: 16px; }
    .total-row .label { color: #666; }
    .total-row.final .label { color: #194973; }
    .badge { display: inline-block; background: #71C648; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .notes { background: #fff9e6; border-left: 4px solid #f5a623; padding: 16px; border-radius: 0 8px 8px 0; margin-top: 30px; }
    .notes-title { font-weight: 600; color: #f5a623; margin-bottom: 8px; }
    .footer { text-align: center; padding: 30px; color: #666; font-size: 14px; }
    .footer a { color: #71C648; text-decoration: none; }
    .validity { background: #e8f5e9; padding: 12px 16px; border-radius: 8px; text-align: center; color: #2e7d32; font-weight: 500; margin-top: 20px; }
    @media print { body { background: white; } .container { padding: 0; } .card { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">
          <span style="font-size: 24px; font-weight: bold;">Code</span>
          <div class="logo-circle logo-green"></div>
          <div class="logo-circle logo-blue"></div>
          <span style="font-size: 24px; font-weight: bold;">nnect</span>
        </div>
        <h1>Presupuesto</h1>
        <p>${fecha}</p>
      </div>

      <div class="content">
        <div class="section">
          <div class="section-title">Datos del cliente</div>
          <div class="client-info">
            <div><div class="info-label">Nombre</div><div class="info-value">${formData.nombre}</div></div>
            <div><div class="info-label">Email</div><div class="info-value">${formData.email}</div></div>
            ${formData.empresa ? `<div><div class="info-label">Empresa</div><div class="info-value">${formData.empresa}</div></div>` : ""}
            ${formData.telefono ? `<div><div class="info-label">Teléfono</div><div class="info-value">${formData.telefono}</div></div>` : ""}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Tipo de proyecto</div>
          <table class="table">
            <tr>
              <td><strong>${tipoProyectoData?.title}</strong><br><span style="color: #666; font-size: 14px;">${tipoProyectoData?.description}</span></td>
              <td class="price">${presupuesto.precioBase > 0 ? formatearPrecio(presupuesto.precioBase) : '<span class="badge">A consultar</span>'}</td>
            </tr>
          </table>
        </div>

        ${
          funcionalidadesSeleccionadas.length > 0
            ? `
        <div class="section">
          <div class="section-title">Funcionalidades</div>
          <table class="table">
            <thead><tr><th>Funcionalidad</th><th style="text-align: right;">Precio</th></tr></thead>
            <tbody>
              ${funcionalidadesSeleccionadas
                .map(
                  (f) => `<tr>
                <td>${f?.label}</td>
                <td class="price">${f?.precio ? formatearPrecio(f.precio) : '<span class="included">Incluido</span>'}</td>
              </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>`
            : ""
        }

        ${
          integracionesSeleccionadas.length > 0 && !integracionesSeleccionadas.every((i) => i?.id === "ninguna")
            ? `
        <div class="section">
          <div class="section-title">Integraciones</div>
          <table class="table">
            <thead><tr><th>Integración</th><th style="text-align: right;">Precio</th></tr></thead>
            <tbody>
              ${integracionesSeleccionadas
                .filter((i) => i?.id !== "ninguna")
                .map(
                  (i) => `<tr>
                <td>${i?.label}</td>
                <td class="price">${i?.precio ? formatearPrecio(i.precio) : '<span class="included">Incluido</span>'}</td>
              </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>`
            : ""
        }

        <div class="totals">
          <div class="total-row">
            <span class="label">Precio base (${tipoProyectoData?.title})</span>
            <span>${formatearPrecio(presupuesto.precioBase)}</span>
          </div>
          ${presupuesto.precioFuncionalidades > 0 ? `<div class="total-row"><span class="label">Funcionalidades adicionales</span><span>+${formatearPrecio(presupuesto.precioFuncionalidades)}</span></div>` : ""}
          ${presupuesto.precioIntegraciones > 0 ? `<div class="total-row"><span class="label">Integraciones</span><span>+${formatearPrecio(presupuesto.precioIntegraciones)}</span></div>` : ""}
          ${
            presupuesto.multiplicador > 1
              ? `<div class="total-row subtotal"><span class="label">Subtotal</span><span>${formatearPrecio(presupuesto.subtotal)}</span></div>
                 <div class="total-row"><span class="label">Ajuste por escala (${formData.numeroUsuarios}) x${presupuesto.multiplicador}</span><span>+${formatearPrecio(presupuesto.subtotal * (presupuesto.multiplicador - 1))}</span></div>`
              : ""
          }
          ${presupuesto.precioApp > 0 ? `<div class="total-row"><span class="label">App móvil adicional (iOS + Android)</span><span>+${formatearPrecio(presupuesto.precioApp)}</span></div>` : ""}
          <div class="total-row final">
            <span class="label">Total estimado</span>
            <span>${formData.tipoProyecto === "otro" ? "A consultar" : formatearPrecio(presupuesto.total)}</span>
          </div>
        </div>

        ${
          formData.otraFuncionalidad || formData.otraIntegracion || formData.comentarios
            ? `<div class="notes">
                <div class="notes-title">Notas adicionales</div>
                ${formData.otraFuncionalidad ? `<p><strong>Funcionalidad personalizada:</strong> ${formData.otraFuncionalidad}</p>` : ""}
                ${formData.otraIntegracion ? `<p><strong>Integración personalizada:</strong> ${formData.otraIntegracion}</p>` : ""}
                ${formData.comentarios ? `<p><strong>Comentarios:</strong> ${formData.comentarios}</p>` : ""}
              </div>`
            : ""
        }

        <div class="validity">Este presupuesto tiene una validez de 30 días desde la fecha de emisión</div>
      </div>

      <div class="footer">
        <p>CodeConnect - Conectando ideas, creando soluciones</p>
        <p><a href="mailto:codeconnectsl@gmail.com">codeconnectsl@gmail.com</a> | <a href="https://codeconnect.es">codeconnect.es</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
