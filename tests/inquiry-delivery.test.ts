import assert from "node:assert/strict";
import { it } from "node:test";
import { deliverInquiry } from "@/lib/api/inquiry-delivery";
import { parseInquiry } from "@/lib/api/inquiry";

const parsed = parseInquiry({ nombre: "Ana", email: "ana@example.com", objetivo: "Reservas", problema: "Copiar datos", privacidad: true });
if (!parsed.ok) throw new Error("Fixture inválida");
const inquiry = parsed.value;

for (const stored of [true, false]) {
  for (const notified of [true, false]) {
    it(`recepción con almacenamiento=${stored} y notificación=${notified}`, async (t) => {
      t.mock.method(console, "error", () => {});
      let calls = 0;
      const result = await deliverInquiry(inquiry, async (id) => {
        calls++;
        assert.equal(id, stored ? "inquiry-id" : null);
        if (!notified) throw new Error("Proveedor no disponible");
      }, async (value) => {
        assert.equal(value, inquiry);
        if (!stored) throw new Error("Base de datos no disponible");
        return "inquiry-id";
      });
      assert.equal(result.received, stored || notified);
      assert.equal(result.inquiryId, stored ? "inquiry-id" : null);
      assert.equal(result.notified, notified);
      assert.equal(calls, 1, "La notificación se intenta una sola vez aunque falle el almacenamiento");
    });
  }
}
