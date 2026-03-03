import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // All proposals
  const { data: allProposals } = await supabase
    .from("proposals")
    .select("id, status, total_price, currency, created_at, client:clients(name)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const proposals = allProposals || [];

  // Proposals this month
  const proposalsThisMonth = proposals.filter((p) => p.created_at >= firstOfMonth).length;

  // Status counts
  const statusCounts: Record<string, number> = {};
  proposals.forEach((p) => {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  });

  // Acceptance rate
  const decided = proposals.filter((p) => ["enviada", "vista", "aceptada", "rechazada"].includes(p.status)).length;
  const accepted = proposals.filter((p) => p.status === "aceptada").length;
  const acceptanceRate = decided > 0 ? Math.round((accepted / decided) * 100) : 0;

  // All payments
  const { data: allPayments } = await supabase
    .from("payments")
    .select("id, amount, currency, paid, paid_at, due_date, label, percentage, proposals!inner(id, project_name, user_id, client:clients(name))")
    .eq("proposals.user_id", user.id);

  const payments = allPayments || [];

  const revenueCollected = payments.filter((p) => p.paid).reduce((sum, p) => sum + Number(p.amount), 0);
  const revenuePending = payments.filter((p) => !p.paid).reduce((sum, p) => sum + Number(p.amount), 0);

  // Overdue
  const overduePayments = payments.filter(
    (p) => !p.paid && p.due_date && new Date(p.due_date) < now
  );

  // Upcoming (next 30 days)
  const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const upcomingPayments = payments
    .filter((p) => !p.paid && p.due_date && new Date(p.due_date) >= now && new Date(p.due_date) <= thirtyDays)
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
    .slice(0, 5);

  // Recent proposals
  const recentProposals = proposals.slice(0, 10);

  return NextResponse.json({
    proposalsThisMonth,
    totalProposals: proposals.length,
    acceptanceRate,
    revenueCollected,
    revenuePending,
    statusCounts,
    overduePayments: overduePayments.length,
    upcomingPayments,
    recentProposals,
  });
}
