import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { isInquiryStatus } from "@/lib/constants/inquiry";

const MAX_LIMIT = 200;

export async function GET(request: NextRequest) {
  // inquiries tiene RLS sin politicas: nadie llega a estas filas desde el
  // navegador. La sesion se comprueba aqui y solo despues se usa la service-role.
  const auth = await createServerSupabaseClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const supabase = createServiceRoleClient();
  let query = supabase
    .from("inquiries")
    .select("id, status, name, email, company, goal, pain, landing_path, utm_source, referrer, created_at")
    .order("created_at", { ascending: false })
    .limit(MAX_LIMIT);

  if (status && status !== "all") {
    if (!isInquiryStatus(status)) {
      return NextResponse.json({ error: "Estado no válido" }, { status: 400 });
    }
    query = query.eq("status", status);
  }

  if (search) {
    const term = search.replace(/[%,()]/g, "").slice(0, 100);
    if (term) {
      query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%,company.ilike.%${term}%`);
    }
  }

  const { data, error } = await query;
  if (error) {
    console.error("[inquiries] Error al listar:", error);
    return NextResponse.json({ error: "No se pudieron cargar los diagnósticos" }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}
