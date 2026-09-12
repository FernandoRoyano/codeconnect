import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = { robots: { index: false, follow: false } };

export default async function GenerarPresupuestoPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/dashboard/propuestas/nueva");
  redirect("/dashboard/propuestas/nueva");
}
