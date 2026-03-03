"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";
  const isPublicProposal = pathname.startsWith("/propuesta/");
  const hideChrome = isDashboard || isLogin || isPublicProposal;

  return (
    <>
      {!hideChrome && <Header />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
      {!hideChrome && <CookieBanner />}
    </>
  );
}
