"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onImported: () => void;
}

type Step = "input" | "preview" | "importing" | "done";

// Map Spanish/alternative column names to internal field keys
const FIELD_ALIASES: Record<string, string> = {
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
  websiteurl: "websiteUrl",
  "sitio web": "websiteUrl",
  url: "websiteUrl",
  pagina: "websiteUrl",
  reserva: "hasOnlineBooking",
  "reserva online": "hasOnlineBooking",
  booking: "hasOnlineBooking",
  app: "hasApp",
  aplicacion: "hasApp",
  "calidad web": "websiteQuality",
  calidad: "websiteQuality",
  "por que": "whyGoodProspect",
  prospecto: "whyGoodProspect",
  notas: "contactNotes",
  notes: "contactNotes",
  observaciones: "contactNotes",
  comentarios: "contactNotes",
};

function parseTabData(text: string): Record<string, unknown>[] {
  const lines = text.trim().split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  // Detect separator: tab or semicolon
  const sep = lines[0].includes("\t") ? "\t" : ";";

  const headers = lines[0].split(sep).map((h) => {
    const normalized = h.trim().toLowerCase();
    return FIELD_ALIASES[normalized] || normalized;
  });

  const rows: Record<string, unknown>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(sep);
    const row: Record<string, unknown> = {};
    headers.forEach((key, j) => {
      const val = values[j]?.trim();
      if (val) row[key] = val;
    });
    if (row.name) rows.push(row);
  }

  return rows;
}

export default function ImportProspectsModal({ onClose, onImported }: Props) {
  const [step, setStep] = useState<Step>("input");
  const [pastedText, setPastedText] = useState("");
  const [prospects, setProspects] = useState<Record<string, unknown>[]>([]);
  const [importedCount, setImportedCount] = useState(0);
  const [error, setError] = useState("");

  const handleParse = () => {
    setError("");
    const parsed = parseTabData(pastedText);

    if (parsed.length === 0) {
      setError("No se encontraron prospectos. Asegurate de que la primera fila tiene los encabezados (nombre, empresa, etc.) y que hay al menos una fila de datos.");
      return;
    }

    setProspects(parsed);
    setStep("preview");
  };

  const handleImport = async () => {
    setStep("importing");
    setError("");

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

        {/* Step: Input */}
        {step === "input" && (
          <div>
            <div className="bg-[#f8f9fa] rounded-xl p-4 mb-4">
              <p className="text-sm font-bold text-[#194973] mb-2">Como importar:</p>
              <ol className="text-sm text-[#5A6D6D] list-decimal list-inside flex flex-col gap-1">
                <li>Abre tu Excel o Google Sheets</li>
                <li>Asegurate de que la <span className="font-semibold text-[#194973]">primera fila</span> tiene los encabezados (nombre, empresa, ciudad, web...)</li>
                <li>Selecciona todas las celdas (encabezados + datos)</li>
                <li>Copia con <span className="font-semibold text-[#194973]">Ctrl+C</span></li>
                <li>Pega aqui abajo con <span className="font-semibold text-[#194973]">Ctrl+V</span></li>
              </ol>
            </div>

            <div className="mb-2 text-xs text-[#5A6D6D]">
              Encabezados reconocidos: nombre, cargo, empresa, email, telefono, ciudad, pais, segmento, web, reserva online, app, calidad web, notas
            </div>

            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-[#194973] outline-none focus:border-[#71C648] font-mono resize-none bg-white"
              placeholder={"nombre\tempresa\tciudad\tweb\tnotas\nJuan Garcia\tRestaurante El Sol\tMadrid\thttps://ejemplo.com\tWeb antigua"}
            />

            {error && (
              <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm mt-3">{error}</div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-[#5A6D6D] rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                Cancelar
              </button>
              <button
                onClick={handleParse}
                disabled={!pastedText.trim()}
                className="px-6 py-2 bg-[#194973] text-white rounded-xl text-sm font-semibold hover:bg-[#0f3150] transition-colors disabled:opacity-50"
              >
                Ver vista previa
              </button>
            </div>
          </div>
        )}

        {/* Step: Preview */}
        {step === "preview" && (
          <div>
            <p className="text-sm text-[#5A6D6D] mb-4">
              <span className="font-bold text-[#194973]">{prospects.length}</span> prospectos listos para importar:
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
                    <th className="text-left text-xs font-bold text-[#5A6D6D] uppercase px-3 py-2">Web</th>
                  </tr>
                </thead>
                <tbody>
                  {prospects.slice(0, 20).map((p, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="px-3 py-2 text-[#5A6D6D]">{i + 1}</td>
                      <td className="px-3 py-2 text-[#194973] font-medium">{String(p.name || "")}</td>
                      <td className="px-3 py-2 text-[#194973]">{String(p.company || "-")}</td>
                      <td className="px-3 py-2 text-[#194973]">{String(p.city || "-")}</td>
                      <td className="px-3 py-2 text-[#194973] truncate max-w-[150px]">{String(p.websiteUrl || "-")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {prospects.length > 20 && (
                <p className="text-xs text-[#5A6D6D] mt-2 px-3">...y {prospects.length - 20} mas</p>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setStep("input")} className="px-4 py-2 bg-gray-100 text-[#5A6D6D] rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                Atras
              </button>
              <button
                onClick={handleImport}
                className="px-6 py-2 bg-gradient-to-r from-[#71C648] to-[#5db33a] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#71C648]/30 transition-all"
              >
                Importar {prospects.length} prospectos
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
