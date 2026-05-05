export interface FormData {
  // Paso 1: Tipo de proyecto
  tipoProyecto: string;
  // Paso 2: Funcionalidades
  funcionalidades: string[];
  otraFuncionalidad: string;
  // Paso 3: Integraciones
  integraciones: string[];
  otraIntegracion: string;
  // Paso 4: Usuarios y escala
  numeroUsuarios: string;
  necesitaApp: boolean;
  // Paso 5: Contacto
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  comentarios: string;
}

export interface Presupuesto {
  precioBase: number;
  precioFuncionalidades: number;
  precioIntegraciones: number;
  subtotal: number;
  multiplicador: number;
  precioApp: number;
  total: number;
}

export interface TipoProyecto {
  id: string;
  title: string;
  description: string;
  benefit: string;
  badge: string | null;
  complexity: number;
  precio: number;
  icon: React.ReactNode;
}

export interface Opcion {
  id: string;
  label: string;
  description: string;
  precio: number;
}

export interface UsuariosOption {
  id: string;
  label: string;
  description: string;
  value: string;
}
