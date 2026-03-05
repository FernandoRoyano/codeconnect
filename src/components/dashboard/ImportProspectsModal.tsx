"use client";

import { useState, useCallback } from "react";

// Column mapping: Excel column name → prospect field
const FIELD_OPTIONS = [
  { value: "", label: "-- Ignorar --" },
  { value: "name", label: "Nombre" },
  { value: "position", label: "Cargo / Posicion" },
  { value: "company", label: "Empresa" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Telefono" },
  { value: "city", label: "Ciudad" },
  { value: "country", label: "Pais" },
  { value: "segment", label: "Segmento" },
  { value: "websiteUrl", label: "Sitio web" },
  { value: "hasOnlineBooking", label: "Reserva online" },
  { value: "hasApp", label: "Tiene App" },
  { value: "websiteQuality", label: "Calidad web (1-5)" },
  { value: "whyGoodProspect", label: "Por que es buen prospecto" },
  { value: "contactNotes", label: "Notas de contacto" },
];

// Auto-detect mapping based on common column names
const AUTO_MAP: Record<string, string> = {
  nombre: "name",
  name: "name",
  cargo: "position",
  posicion: "position",
  position: "position",
  puesto: "position",
  empresa: "company",
  company: "company",
  email: "email",
  correo: "email",
  "e-mail": "email",
  telefono: "phone",
  phone: "phone",
  tel: "phone",
  movil: "phone",
  ciudad: "city",
  city: "city",
  pais: "country",
  country: "country",
  segmento: "segment",
  segment: "segment",
  sector: "segment",
  web: "websiteUrl",
  website: "websiteUrl",
  "sitio web": "websiteUrl",
  url: "websiteUrl",
  pagina: "websiteUrl",
  "pagina web": "websiteUrl",
  reserva: "hasOnlineBooking",
  "reserva online": "hasOnlineBooking",
  booking: "hasOnlineBooking",
  app: "hasApp",
  aplicacion: "hasApp",
  "calidad web": "websiteQuality",
  calidad: "websiteQuality",
  "quality": "websiteQuality",
  "por que": "whyGoodProspect",
  "porque es buen prospecto": "whyGoodProspect",
  prospecto: "whyGoodProspect",
  notas: "contactNotes",
  notes: "contactNotes",
  "nota de contacto": "contactNotes",
  observaciones: "contactNotes",
  comentarios: "contactNotes",
};

interface Props {
  onClose: () => void;
  onImported: () => void;
}

type Step = "upload" | "mapping" | "preview" | "importing" | "done";

export default function ImportProspectsModal({ onClose, onImported }: Props) {
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState("");
  const [rawRows, setRawRows] = useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [importedCount, setImportedCount] = useState(0);
  const [error, setError] = useState("");

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setError("");

    try {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

      if (json.length === 0) {
        setError("El archivo esta vacio");
        return;
      }

      const cols = Object.keys(json[0]);
      setColumns(cols);
      setRawRows(json);

      // Auto-map columns
      const autoMapping: Record<string, string> = {};
      cols.forEach((col) => {
        const normalized = col.toLowerCase().trim();
        if (AUTO_MAP[normalized]) {
          autoMapping[col] = AUTO_MAP[normalized];
        }
      });
      setMapping(autoMapping);
      setStep("mapping");
    } catch {
      setError("Error al leer el archivo. Asegurate de que es un archivo Excel valido (.xlsx, .xls)");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const getMappedProspects = () => {
    return rawRows.map((row) => {
      const prospect: Record<string, unknown> = {};
      Object.entries(mapping).forEach(([col, field]) => {
        if (field && row[col] !== undefined && row[col] !== null && row[col] !== "") {
          prospect[field] = row[col];
        }
      });
      return prospect;
    }).filter((p) => p.name);
  };

  const handleImport = async () => {
    setStep("importing");
    setError("");

    const prospects = getMappedProspects();
    if (prospects.length === 0) {
      setError("No hay prospectos validos para importar (se necesita al menos el nombre)");
      setStep("preview");
      return;
    }

    try {
      const res = await fetch("/api/prospects/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospects }),
      });

      if (res.ok) {
        const data = await res.json();
        setImportedCount(data.imported);
        setStep("done");
        onImported();
      } else {
        const data = await res.json();
        setError(data.error || "Error al importar");
        setStep("preview");
      }
    } catch {
      setError("Error de conexion");
      setStep("preview");
    }
  };

  const mappedPreview = getMappedProspects();
  const hasNameMapping = Object.values(mapping).includes("name");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-[#194973]">Importar prospectos</h2>
          <button onClick={onClose} className="text-[#5A6D6D] hover:text-[#194973]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step: Upload */}
        {step === "upload" && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#71C648] transition-colors cursor-pointer"
            onClick={() => document.getElementById("excel-input")?.click()}
          >
            <div className="text-4xl mb-3">&#128196;</div>
            <p className="text-[#194973] font-bold mb-1">Arrastra tu archivo Excel aqui</p>
            <p className="text-sm text-[#5A6D6D] mb-4">o haz click para seleccionar</p>
            <p className="text-xs text-[#5A6D6D]">Formatos: .xlsx, .xls, .csv</p>
            <input
              id="excel-input"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        )}

        {/* Step: Mapping */}
        {step === "mapping" && (
          <div>
            <p className="text-sm text-[#5A6D6D] mb-1">Archivo: <span className="font-medium text-[#194973]">{fileName}</span></p>
            <p className="text-sm text-[#5A6D6D] mb-4">{rawRows.length} filas encontradas. Mapea las columnas de tu Excel a los campos de prospecto:</p>

            <div className="flex flex-col gap-3 mb-6">
              {columns.map((col) => (
                <div key={col} className="flex items-center gap-3">
                  <div className="w-1/3 text-sm font-medium text-[#194973] truncate" title={col}>{col}</div>
                  <svg className="w-4 h-4 text-[#5A6D6D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <select
                    value={mapping[col] || ""}
                    onChange={(e) => setMapping((prev) => ({ ...prev, [col]: e.target.value }))}
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl text-sm text-[#194973] outline-none focus:border-[#71C648]"
                  >
                    {FIELD_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {!hasNameMapping && (
              <p className="text-sm text-red-500 mb-4">Debes mapear al menos la columna &quot;Nombre&quot;</p>
            )}

            <div className="flex justify-end gap-3">
              <button onClick={() => setStep("upload")} className="px-4 py-2 bg-gray-100 text-[#5A6D6D] rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                Atras
              </button>
              <button
                onClick={() => setStep("preview")}
                disabled={!hasNameMapping}
                className="px-6 py-2 bg-[#194973] text-white rounded-xl text-sm font-semibold hover:bg-[#0f3150] transition-colors disabled:opacity-50"
              >
                Vista previa
              </button>
            </div>
          </div>
        )}

        {/* Step: Preview */}
        {step === "preview" && (
          <div>
            <p className="text-sm text-[#5A6D6D] mb-4">
              <span className="font-bold text-[#194973]">{mappedPreview.length}</span> prospectos listos para importar (de {rawRows.length} filas):
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm mb-4">{error}</div>
            )}

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase px-3 py-2">#</th>
                    <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase px-3 py-2">Nombre</th>
                    <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase px-3 py-2">Empresa</th>
                    <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase px-3 py-2">Ciudad</th>
                    <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase px-3 py-2">Segmento</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedPreview.slice(0, 10).map((p, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-3 py-2 text-[#5A6D6D]">{i + 1}</td>
                      <td className="px-3 py-2 text-[#194973] font-medium">{String(p.name || "")}</td>
                      <td className="px-3 py-2 text-[#194973]">{String(p.company || "-")}</td>
                      <td className="px-3 py-2 text-[#194973]">{String(p.city || "-")}</td>
                      <td className="px-3 py-2 text-[#194973]">{String(p.segment || "-")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {mappedPreview.length > 10 && (
                <p className="text-xs text-[#5A6D6D] mt-2 px-3">...y {mappedPreview.length - 10} mas</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setStep("mapping")} className="px-4 py-2 bg-gray-100 text-[#5A6D6D] rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                Atras
              </button>
              <button
                onClick={handleImport}
                className="px-6 py-2 bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#71C648]/30 transition-all"
              >
                Importar {mappedPreview.length} prospectos
              </button>
            </div>
          </div>
        )}

        {/* Step: Importing */}
        {step === "importing" && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 animate-pulse">&#9997;</div>
            <p className="text-[#194973] font-bold">Importando prospectos...</p>
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">&#9989;</div>
            <p className="text-xl font-bold text-[#194973] mb-2">{importedCount} prospectos importados</p>
            <p className="text-sm text-[#5A6D6D] mb-6">Se han anadido correctamente a tu CRM</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#194973] text-white rounded-xl text-sm font-semibold hover:bg-[#0f3150] transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
