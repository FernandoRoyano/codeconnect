import { funcionalidadesPorTipo, integracionesPorTipo, multiplicadoresUsuarios, precioAppAdicional, tiposProyecto } from "./data";
import type { FormData, Opcion, Presupuesto } from "./types";

export function getFuncionalidades(tipoProyecto: string): Opcion[] {
  return funcionalidadesPorTipo[tipoProyecto] || [];
}

export function getIntegraciones(tipoProyecto: string): Opcion[] {
  return integracionesPorTipo[tipoProyecto] || [];
}

export function calcularPresupuesto(formData: FormData): Presupuesto {
  const tipoProyectoData = tiposProyecto.find((t) => t.id === formData.tipoProyecto);
  const precioBase = tipoProyectoData?.precio || 0;

  const funcionalidades = getFuncionalidades(formData.tipoProyecto);
  const precioFuncionalidades = formData.funcionalidades.reduce((total, funcId) => {
    const func = funcionalidades.find((f) => f.id === funcId);
    return total + (func?.precio || 0);
  }, 0);

  const integraciones = getIntegraciones(formData.tipoProyecto);
  const precioIntegraciones = formData.integraciones.reduce((total, intId) => {
    const integ = integraciones.find((i) => i.id === intId);
    return total + (integ?.precio || 0);
  }, 0);

  const subtotal = precioBase + precioFuncionalidades + precioIntegraciones;
  const multiplicador = multiplicadoresUsuarios[formData.numeroUsuarios] || 1;
  const totalConMultiplicador = subtotal * multiplicador;

  const precioApp =
    formData.necesitaApp &&
    formData.tipoProyecto !== "app-clientes" &&
    formData.tipoProyecto !== "proyecto-completo"
      ? precioAppAdicional
      : 0;

  const total = totalConMultiplicador + precioApp;

  return {
    precioBase,
    precioFuncionalidades,
    precioIntegraciones,
    subtotal,
    multiplicador,
    precioApp,
    total,
  };
}

export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(precio);
}
