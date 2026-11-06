import type { InquiryInput } from "@/lib/api/inquiry";

async function storeInquiry(inquiry: InquiryInput): Promise<string> {
  const { createServiceRoleClient } = await import("@/lib/supabase/server");
  const { data, error } = await createServiceRoleClient()
    .from("inquiries").insert(inquiry).select("id").single();
  if (error || !data?.id) throw new Error("No se pudo registrar la consulta");
  return data.id;
}

/** Cada vía se intenta aunque falle la otra. Éxito solo si se ha recibido. */
export async function deliverInquiry(
  inquiry: InquiryInput,
  notify: (inquiryId: string | null) => Promise<void>,
  store: (value: InquiryInput) => Promise<string> = storeInquiry,
) {
  let inquiryId: string | null = null;
  let notified = false;
  try {
    inquiryId = await store(inquiry);
  } catch {
    console.error("[inquiry] No se pudo guardar la consulta");
  }
  try {
    await notify(inquiryId);
    notified = true;
  } catch {
    console.error("[inquiry] No se pudo enviar la notificación");
  }
  return { received: Boolean(inquiryId || notified), inquiryId, notified };
}
