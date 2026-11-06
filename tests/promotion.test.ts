import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseProgressUpdate, progressPath, promotionTasks } from "@/content/promotion/index";

const valid = () => ({ taskId: promotionTasks[0].id, status: "done", notes: "Resultado real" });

describe("seguimiento de promoción", () => {
  it("solo acepta acciones del plan y estados conocidos", () => {
    for (const change of [{ taskId: "../otro-usuario" }, { taskId: "inventada" }, { status: "publicado" }, { status: null }, { status: ["done"] }]) {
      assert.equal(parseProgressUpdate({ ...valid(), ...change }).ok, false);
    }
  });
  it("limita las notas y rechaza objetos o valores ausentes", () => {
    for (const notes of ["x".repeat(4001), {}, null, undefined, 42]) {
      assert.equal(parseProgressUpdate({ ...valid(), notes }).ok, false);
    }
    assert.equal(parseProgressUpdate({ ...valid(), notes: "x".repeat(4000) }).ok, true);
  });
  it("no incorpora usuario, rutas ni fechas proporcionados por el cliente", () => {
    const result = parseProgressUpdate({ ...valid(), userId: "otro", path: "otro/archivo", completedAt: "inventada", notes: "  Revisado  " });
    assert.equal(result.ok, true);
    if (result.ok) assert.deepEqual(result.value, { taskId: promotionTasks[0].id, status: "done", notes: "Revisado" });
  });
  it("separa el progreso de cada usuario", () => {
    assert.notEqual(progressPath("usuario-a", promotionTasks[0].id), progressPath("usuario-b", promotionTasks[0].id));
    assert.ok(progressPath("usuario-a", promotionTasks[0].id).startsWith("usuario-a/clinicas-2026-11/"));
  });
  it("mantiene identificadores únicos y las seis semanas de acciones", () => {
    assert.equal(new Set(promotionTasks.map((task) => task.id)).size, promotionTasks.length);
    assert.deepEqual([...new Set(promotionTasks.map((task) => task.week))], [1, 2, 3, 4, 5, 6]);
  });
});
