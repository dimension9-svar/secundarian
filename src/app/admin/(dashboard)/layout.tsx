import type { ReactNode } from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/guard";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin — Secundarian",
  robots: { index: false, follow: false },
};

// Always render dynamically — admin pages are per-session and never cached.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdmin();
  return (
    <AdminShell email={session.user.email} role={session.user.role}>
      {children}
    </AdminShell>
  );
}
