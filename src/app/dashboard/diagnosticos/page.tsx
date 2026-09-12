"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { INQUIRY_STATUS_CONFIG, INQUIRY_TABS, type InquiryStatus } from "@/lib/constants/inquiry";

interface InquiryRow {
  id: string;
  status: InquiryStatus;
  name: string;
  email: string;
  company: string | null;
  goal: string;
  pain: string;
  landing_path: string | null;
  utm_source: string | null;
  referrer: string | null;
  created_at: string;
}

function origin(row: InquiryRow): string {
  if (row.utm_source) return row.utm_source;
  if (row.referrer) {
    try {
      return new URL(row.referrer).hostname.replace(/^www\./, "");
    } catch {
      return row.referrer.slice(0, 40);
    }
  }
  return "Directo";
}

function summary(row: InquiryRow): string {
  const text = (row.goal || row.pain || "").replace(/\s+/g, " ").trim();
  return text.length > 110 ? `${text.slice(0, 109)}…` : text;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

export default function DiagnosticosPage() {
  const [rows, setRows] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (tab !== "all") params.set("status", tab);
    if (query) params.set("search", query);
    try {
      const res = await fetch(`/api/inquiries?${params}`);
      if (!res.ok) throw new Error("No se pudieron cargar los diagnosticos");
      setRows(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }, [tab, query]);

  useEffect(() => {
    load();
  }, [load]);

  const counts = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#194973]">Diagnosticos</h1>
          <p className="text-sm text-[#5A6D6D] mt-1">
            Casos que han llegado desde la web. Revisa antes de recomendar nada.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(search.trim());
          }}
          className="flex gap-2"
          role="search"
        >
          <label htmlFor="buscar" className="sr-only">
            Buscar por nombre, email o empresa
          </label>
          <input
            id="buscar"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, email o empresa"
            className="px-4 py-2 rounded-xl border border-[#e5e7eb] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#71C648]/40"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#194973] text-white text-sm font-medium hover:bg-[#0f3150] transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtrar por estado">
        {INQUIRY_TABS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={tab === item.value}
            onClick={() => setTab(item.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tab === item.value
                ? "bg-[#194973] text-white"
                : "bg-white text-[#5A6D6D] border border-[#e5e7eb] hover:border-[#194973]"
            }`}
          >
            {item.label}
            {item.value !== "all" && counts[item.value] ? (
              <span className="ml-1.5 text-xs opacity-70">{counts[item.value]}</span>
            ) : null}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {loading && <p className="text-[#5A6D6D] text-sm">Cargando…</p>}

        {error && !loading && (
          <p role="alert" className="bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
            {error}
          </p>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-10 text-center">
            <p className="text-[#194973] font-semibold">Todavia no hay diagnosticos</p>
            <p className="text-sm text-[#5A6D6D] mt-1">
              Apareceran aqui en cuanto alguien rellene el formulario de /diagnostico.
            </p>
          </div>
        )}

        {!loading && !error && rows.length > 0 && (
          <>
            <p className="sr-only">{rows.length} diagnosticos</p>
            <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#f8f9fa] text-[#5A6D6D] text-xs uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="text-left font-semibold px-5 py-3">Persona</th>
                      <th scope="col" className="text-left font-semibold px-5 py-3">Caso</th>
                      <th scope="col" className="text-left font-semibold px-5 py-3 whitespace-nowrap">Origen</th>
                      <th scope="col" className="text-left font-semibold px-5 py-3 whitespace-nowrap">Fecha</th>
                      <th scope="col" className="text-left font-semibold px-5 py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f1f0]">
                    {rows.map((row) => {
                      const badge = INQUIRY_STATUS_CONFIG[row.status];
                      return (
                        <tr key={row.id} className="hover:bg-[#fafaf9] transition-colors">
                          <td className="px-5 py-4 align-top">
                            <Link
                              href={`/dashboard/diagnosticos/${row.id}`}
                              className="font-semibold text-[#194973] hover:text-[#71C648] transition-colors"
                            >
                              {row.name}
                            </Link>
                            <div className="text-xs text-[#5A6D6D] mt-0.5">{row.company || row.email}</div>
                          </td>
                          <td className="px-5 py-4 align-top text-[#5A6D6D] max-w-md">{summary(row)}</td>
                          <td className="px-5 py-4 align-top text-[#5A6D6D] whitespace-nowrap">{origin(row)}</td>
                          <td className="px-5 py-4 align-top text-[#5A6D6D] whitespace-nowrap">
                            {formatDate(row.created_at)}
                          </td>
                          <td className="px-5 py-4 align-top">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
