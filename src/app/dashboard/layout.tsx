import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export const metadata = {
  title: "Dashboard | CodeConnect",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader userEmail={user.email} />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
