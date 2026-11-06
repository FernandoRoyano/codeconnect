"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ArticleBody from "@/components/blog/ArticleBody";
import type { Block } from "@/content/blog";
import { PROMOTION_STATUSES, STATUS_LABELS, promotionTasks, researchAccounts, type PromotionStatus, type TaskProgress } from "@/content/promotion";
import { outreachEmails } from "@/content/promotion/emails";

type Guide = { id: string; title: string; raw: string; blocks: Block[] };
type Publication = { title: string; date: string; text: string };
type Tab = "acciones" | "materiales" | "centros" | "emails";
const dateLabel = (value: string) => new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", timeZone: "Europe/Madrid" }).format(new Date(`${value}T12:00:00Z`));
const statusClass: Record<PromotionStatus, string> = {
  pending: "bg-stone-100 text-stone-700", in_progress: "bg-blue-50 text-blue-800", done: "bg-emerald-50 text-emerald-800", skipped: "bg-stone-100 text-stone-600",
};
const buttonCls = "inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d8e1de] bg-white px-4 py-2 text-sm font-semibold text-[#111a1d] transition-colors hover:bg-[#e8f7f4] disabled:cursor-wait disabled:opacity-60";

export default function PromotionPanel({ today, guides, publications }: { today: string; guides: Guide[]; publications: Publication[] }) {
  const [tab, setTab] = useState<Tab>("acciones");
  const [guideId, setGuideId] = useState("plan");
  const [week, setWeek] = useState("all");
  const [filter, setFilter] = useState("open");
  const [progress, setProgress] = useState<Record<string, TaskProgress>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const activeSaves = useRef(new Set<string>());
  const materialRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLHeadingElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/promocion", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "No se pudo cargar tu progreso");
      setProgress(Object.fromEntries((body.progress as TaskProgress[]).map((row) => [row.taskId, row])));
      setLoaded(true);
    } catch (cause) {
      setLoaded(false);
      setError(cause instanceof Error ? cause.message : "No se pudo cargar tu progreso");
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const stateFor = (id: string): PromotionStatus => progress[id]?.status ?? "pending";
  const notesFor = (id: string) => drafts[id] ?? progress[id]?.notes ?? "";
  const completed = promotionTasks.filter((task) => stateFor(task.id) === "done").length;
  const active = promotionTasks.filter((task) => stateFor(task.id) === "in_progress").length;
  const open = promotionTasks.filter((task) => ["pending", "in_progress"].includes(stateFor(task.id)));
  const visible = promotionTasks.filter((task) =>
    (week === "all" || task.week === Number(week)) &&
    (filter === "all" || (filter === "open" ? ["pending", "in_progress"].includes(stateFor(task.id)) : stateFor(task.id) === filter)),
  );
  const guide = guides.find((item) => item.id === guideId) ?? guides[0];

  const save = async (taskId: string, status: PromotionStatus) => {
    if (!loaded || activeSaves.current.has(taskId)) return;
    activeSaves.current.add(taskId);
    setSaving((current) => [...current, taskId]);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/promocion", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ taskId, status, notes: notesFor(taskId) }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "No se pudo guardar");
      const row = body.progress as TaskProgress;
      setProgress((current) => ({ ...current, [taskId]: row }));
      setDrafts((current) => ({ ...current, [taskId]: row.notes }));
      setNotice(`Guardado: ${promotionTasks.find((task) => task.id === taskId)?.title}`);
      if ((filter === "open" && !["pending", "in_progress"].includes(status)) ||
        (PROMOTION_STATUSES.includes(filter as PromotionStatus) && filter !== status)) {
        requestAnimationFrame(() => actionsRef.current?.focus());
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo guardar. Tus notas siguen en pantalla.");
    } finally {
      activeSaves.current.delete(taskId);
      setSaving((current) => current.filter((id) => id !== taskId));
    }
  };
  const showResource = (id: string) => {
    setGuideId(id);
    setTab("materiales");
    requestAnimationFrame(() => materialRef.current?.focus());
  };
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setNotice("Texto copiado. Revísalo antes de utilizarlo."); }
    catch { setNotice("No se pudo copiar. Puedes seleccionar el texto directamente."); }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 text-[#111a1d]">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#075f58]">CodeConnect · Campaña inicial</p>
          <h1 className="text-3xl font-bold tracking-tight">Promoción</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#46575a]">Del 9 de noviembre al 20 de diciembre de 2026. Cinco horas semanales para construir tu red y conseguir conversaciones relevantes.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/prospectos" className={buttonCls}>Prospectos</Link>
          <Link href="/dashboard/diagnosticos" className={buttonCls}>Consultas recibidas</Link>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-3" aria-busy={loading}>
        {[["Acciones hechas", completed], ["En curso", active], ["Pendientes", open.length]].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[#d8e1de] bg-white p-5">
            <p className="text-sm text-[#46575a]">{label}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums">{loaded ? value : "—"}</p>
          </div>
        ))}
      </div>
      {loaded && <div className="flex flex-wrap items-center gap-3 text-sm text-[#46575a]">
        <progress className="h-2 w-48 max-w-full accent-[#075f58]" value={completed} max={promotionTasks.length} aria-label="Progreso de la campaña" />
        <span>{completed} de {promotionTasks.length} acciones hechas. Las descartadas no cuentan como hechas.</span>
      </div>}

      <div aria-live="polite" aria-atomic="true">{notice && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{notice}</p>}</div>
      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
        <p>{error}</p>
        {!loaded && <button className={`${buttonCls} mt-3`} onClick={() => void load()} disabled={loading}>Volver a cargar</button>}
      </div>}

      <nav aria-label="Secciones de promoción" className="flex flex-wrap gap-2 border-b border-[#d8e1de] pb-4">
        {([['acciones', 'Acciones y progreso'], ['materiales', 'Textos y guías'], ['centros', 'Centros investigados'], ['emails', 'Emails']] as const).map(([id, label]) => (
          <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)} className={`${buttonCls} ${tab === id ? "border-[#075f58] bg-[#e8f7f4] text-[#075f58]" : ""}`}>{label}</button>
        ))}
      </nav>

      {tab === "acciones" && <div className="space-y-5">
        <h2 ref={actionsRef} tabIndex={-1} className="text-xl font-bold">Acciones de la campaña</h2>
        {loaded && open[0] && <div className="rounded-2xl border border-[#abd8ce] bg-[#e8f7f4] p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#075f58]">Siguiente acción pendiente</p>
          <p className="mt-2 font-semibold">{open[0].title}</p>
          <p className="mt-1 text-sm text-[#46575a]">{open[0].description}</p>
        </div>}
        <div className="flex flex-wrap gap-4">
          <label className="text-sm font-medium">Semana
            <select value={week} onChange={(event) => setWeek(event.target.value)} className="ml-2 min-h-11 rounded-xl border border-[#d8e1de] bg-white px-3">
              <option value="all">Todas</option>{[1, 2, 3, 4, 5, 6].map((number) => <option key={number} value={number}>Semana {number}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">Estado
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="ml-2 min-h-11 rounded-xl border border-[#d8e1de] bg-white px-3">
              <option value="open">Pendientes y en curso</option><option value="all">Todos</option>{PROMOTION_STATUSES.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
            </select>
          </label>
        </div>
        {loading && <p role="status" className="text-sm text-[#46575a]">Cargando tu progreso…</p>}
        <p className="text-sm text-[#46575a]">Marca una acción como hecha cuando la hayas realizado. Los borradores están preparados; publicarlos o iniciar una conversación son acciones pendientes.</p>
        {visible.length === 0 && <p className="rounded-2xl border border-[#d8e1de] bg-white p-6">No hay acciones con estos filtros.</p>}
        {visible.map((task) => {
          const status = stateFor(task.id);
          const busy = saving.includes(task.id);
          const dirty = notesFor(task.id) !== (progress[task.id]?.notes ?? "");
          const overdue = task.dueDate < today && ["pending", "in_progress"].includes(status);
          return <article key={task.id} className="rounded-2xl border border-[#d8e1de] bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-semibold ${overdue ? "text-amber-800" : "text-[#46575a]"}`}>Semana {task.week} · {dateLabel(task.dueDate)}{overdue ? " · Fecha prevista superada" : ""}</p>
                <h2 className="mt-2 text-lg font-semibold">{task.title}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[status]}`}>{STATUS_LABELS[status]}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#46575a]">{task.description}</p>
            <fieldset disabled={!loaded || busy} className="mt-4 min-w-0">
              <legend className="sr-only">Actualizar {task.title}</legend>
              <div className="flex flex-wrap gap-2">
                {status !== "in_progress" && status !== "done" && <button type="button" onClick={() => void save(task.id, "in_progress")} className={buttonCls}>Empezar</button>}
                {status !== "done" && <button type="button" onClick={() => void save(task.id, "done")} className={`${buttonCls} border-[#075f58] bg-[#e8f7f4] text-[#075f58]`}>Marcar hecha</button>}
                {status !== "pending" && <button type="button" onClick={() => void save(task.id, "pending")} className={buttonCls}>Volver a pendiente</button>}
                {status !== "skipped" && status !== "done" && <button type="button" onClick={() => void save(task.id, "skipped")} className={buttonCls}>Descartar</button>}
              </div>
              <details className="mt-4 border-t border-[#d8e1de] pt-3">
                <summary className="min-h-11 cursor-pointer content-center text-sm font-semibold">Notas y resultado{dirty ? " · Sin guardar" : ""}</summary>
                <label htmlFor={`notes-${task.id}`} className="mb-2 mt-2 block text-sm text-[#46575a]">Qué hiciste, resultado y próximo paso</label>
                <textarea id={`notes-${task.id}`} rows={3} maxLength={4000} value={notesFor(task.id)} onChange={(event) => setDrafts((current) => ({ ...current, [task.id]: event.target.value }))} className="w-full rounded-xl border border-[#d8e1de] bg-[#fafaf9] p-3 text-sm" />
                <button type="button" disabled={!dirty || busy} onClick={() => void save(task.id, status)} className={`${buttonCls} mt-2`}>{busy ? "Guardando…" : "Guardar notas"}</button>
                {progress[task.id]?.updatedAt && <p className="mt-2 text-xs text-[#46575a]">Último guardado: {new Date(progress[task.id].updatedAt).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</p>}
              </details>
            </fieldset>
            {task.resource && <button type="button" onClick={() => showResource(task.resource!)} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#075f58] underline">Ver material preparado</button>}
          </article>;
        })}
      </div>}

      {tab === "materiales" && <section className="space-y-5">
        <h2 ref={materialRef} tabIndex={-1} className="text-2xl font-bold">Textos y guías preparados</h2>
        <p className="text-sm text-[#46575a]">Aquí tienes el plan completo, el arranque sin red, los guiones y los borradores. Revísalos y personalízalos antes de utilizarlos.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {publications.map((post) => <details key={post.title} className="min-w-0 rounded-2xl border border-[#d8e1de] bg-white p-5">
            <summary className="min-h-11 cursor-pointer content-center font-semibold">{post.title}<span className="mt-1 block text-xs font-normal text-[#46575a]">Borrador listo · previsto para {dateLabel(post.date)}</span></summary>
            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed [overflow-wrap:anywhere]">{post.text}</p>
            <button type="button" onClick={() => void copy(post.text)} className={`${buttonCls} mt-4`}>Copiar publicación</button>
          </details>)}
        </div>
        <label className="block text-sm font-semibold">Leer una guía completa
          <select value={guideId} onChange={(event) => setGuideId(event.target.value)} className="mt-2 block min-h-11 w-full rounded-xl border border-[#d8e1de] bg-white px-3 sm:max-w-md">{guides.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select>
        </label>
        <div className="rounded-2xl border border-[#d8e1de] bg-white p-5 [overflow-wrap:anywhere] sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h3 className="text-xl font-bold">{guide.title}</h3><button type="button" onClick={() => void copy(guide.raw)} className={buttonCls}>Copiar guía</button></div>
          <ArticleBody blocks={guide.blocks} />
        </div>
      </section>}

      {tab === "centros" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">Cinco centros para investigar</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[#46575a]">Fuentes públicas revisadas el 6 de noviembre de 2026. Al preparar la lista no se les había contactado ni se había confirmado una necesidad. Registra el seguimiento comercial actual en Prospectos.</p>
        {researchAccounts.map((account) => <article key={account.name} className="rounded-2xl border border-[#d8e1de] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-lg font-semibold">{account.name}</h3><span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">Investigación inicial · 6 nov.</span></div>
          <p className="mt-3 text-sm text-[#46575a]">{account.observation}</p>
          <p className="mt-3 text-sm"><strong>Por comprobar:</strong> {account.question}</p>
          <a href={account.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#075f58] underline">Ver fuente pública<span className="sr-only"> de {account.name} (nueva pestaña)</span></a>
        </article>)}
        <button type="button" onClick={() => showResource("arranque")} className={buttonCls}>Ver cómo iniciar las conversaciones</button>
      </section>}

      {tab === "emails" && <section className="space-y-5">
        <h2 className="text-2xl font-bold">Cinco emails personalizados</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[#46575a]">Borradores para revisar y adaptar. Confirma el destinatario y el contexto que permite el contacto comercial antes de utilizarlos; una dirección publicada no equivale a autorización. Registra el contacto real y su resultado en Prospectos.</p>
        <p className="text-sm text-[#46575a]">Preparados el 6 de noviembre de 2026. Copiar un texto no envía el correo ni cambia el estado de ningún centro.</p>
        {outreachEmails.map((email) => <article key={email.account} className="min-w-0 rounded-2xl border border-[#d8e1de] bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{email.account}</h3>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">Borrador preparado</span>
          </div>
          <div className="mt-4 rounded-xl bg-[#fafaf9] p-4 text-sm [overflow-wrap:anywhere]">
            <p><strong>Destinatario:</strong> {email.recipient ?? "Dirección de email pendiente de confirmar"}</p>
            <p className="mt-2 text-[#46575a]">{email.context}</p>
            <div className="mt-2 flex flex-wrap gap-x-4">
              <a href={email.recipientSource} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-[#075f58] underline">Revisar contacto público<span className="sr-only"> de {email.account} (nueva pestaña)</span></a>
              <a href={email.contextSource} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-[#075f58] underline">Ver contexto del borrador<span className="sr-only"> de {email.account} (nueva pestaña)</span></a>
            </div>
          </div>
          <p className="mt-5 text-sm font-semibold">Asunto</p>
          <p className="mt-1 text-sm [overflow-wrap:anywhere]">{email.subject}</p>
          <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed [overflow-wrap:anywhere]">{email.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {email.recipient && <button type="button" onClick={() => void copy(email.recipient!)} className={buttonCls}>Copiar dirección</button>}
            <button type="button" onClick={() => void copy(email.subject)} className={buttonCls}>Copiar asunto</button>
            <button type="button" onClick={() => void copy(email.body)} className={buttonCls}>Copiar email</button>
          </div>
        </article>)}
      </section>}
    </div>
  );
}
