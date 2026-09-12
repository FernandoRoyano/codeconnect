import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseInquiry, inquirySummary } from "@/lib/api/inquiry";

/**
 * parseInquiry es la unica frontera entre entrada anonima y la base de datos,
 * asi que se prueba lo que tiene que rechazar, no solo lo que acepta.
 */

const valid = () => ({
  nombre: "  Ana Gil  ",
  email: "ana@clinica.es",
  objetivo: "Dejar de cuadrar citas a mano",
  problema: "Copio los mismos datos en tres sitios",
  privacidad: true,
});

describe("parseInquiry", () => {
  it("acepta el minimo obligatorio y normaliza espacios", () => {
    const result = parseInquiry(valid());
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.value.name, "Ana Gil");
    assert.equal(result.value.email, "ana@clinica.es");
    assert.equal(result.value.privacy_accepted, true);
    assert.ok(result.value.privacy_accepted_at);
  });

  it("convierte los opcionales vacios en null y no en cadena vacia", () => {
    const result = parseInquiry(valid());
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.value.phone, null);
    assert.equal(result.value.company, null);
    assert.equal(result.value.tools, null);
  });

  for (const missing of ["nombre", "email", "objetivo", "problema"]) {
    it(`rechaza si falta ${missing}`, () => {
      const data = valid() as Record<string, unknown>;
      delete data[missing];
      const result = parseInquiry(data);
      assert.equal(result.ok, false);
      if (result.ok) return;
      assert.equal(result.field, missing);
    });
  }

  it("rechaza un email con formato invalido", () => {
    const result = parseInquiry({ ...valid(), email: "ana(arroba)clinica" });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.field, "email");
  });

  it("exige que el consentimiento llegue exactamente como true", () => {
    for (const value of [undefined, false, "true", 1, null, "on"]) {
      const result = parseInquiry({ ...valid(), privacidad: value });
      assert.equal(result.ok, false, `privacidad=${JSON.stringify(value)} no deberia pasar`);
      if (result.ok) return;
      assert.equal(result.field, "privacidad");
    }
  });

  it("rechaza tipos inesperados en lugar de convertirlos", () => {
    for (const value of [{ a: 1 }, [1, 2], 42, true]) {
      const result = parseInquiry({ ...valid(), nombre: value });
      assert.equal(result.ok, false, `nombre=${JSON.stringify(value)} no deberia pasar`);
    }
  });

  it("rechaza textos por encima del limite", () => {
    const result = parseInquiry({ ...valid(), objetivo: "x".repeat(2_001) });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.field, "objetivo");
  });

  it("guarda el origen cuando viene bien formado", () => {
    const result = parseInquiry({
      ...valid(),
      origen: {
        landing: "/es/diagnostico",
        referrer: "https://google.com/",
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "clinicas",
      },
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.value.landing_path, "/es/diagnostico");
    assert.equal(result.value.utm_source, "google");
    assert.equal(result.value.utm_medium, "cpc");
    assert.equal(result.value.utm_term, null);
  });

  it("descarta un origen corrupto sin tumbar el envio", () => {
    for (const origen of ["no-soy-un-objeto", 42, [1], null, { landing: { a: 1 } }]) {
      const result = parseInquiry({ ...valid(), origen });
      assert.equal(result.ok, true, `origen=${JSON.stringify(origen)} no deberia invalidar`);
      if (!result.ok) return;
      assert.equal(result.value.landing_path, null);
    }
  });

  it("no deja pasar campos ajenos al modelo", () => {
    const result = parseInquiry({ ...valid(), status: "won", internal_notes: "soy admin", id: "x" });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    const keys = Object.keys(result.value);
    assert.ok(!keys.includes("status"), "status no deberia llegar a la fila");
    assert.ok(!keys.includes("internal_notes"), "internal_notes no deberia llegar a la fila");
    assert.ok(!keys.includes("id"), "id no deberia llegar a la fila");
  });
});

describe("inquirySummary", () => {
  it("usa el objetivo y colapsa los espacios", () => {
    assert.equal(inquirySummary({ goal: "  Dos   espacios ", pain: "otro" }), "Dos espacios");
  });

  it("cae al problema si no hay objetivo", () => {
    assert.equal(inquirySummary({ goal: "", pain: "Duele" }), "Duele");
  });

  it("recorta los textos largos", () => {
    const out = inquirySummary({ goal: "x".repeat(200), pain: "" }, 20);
    assert.equal(out.length, 20);
    assert.ok(out.endsWith("…"));
  });
});
