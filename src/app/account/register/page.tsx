import type { Metadata } from "next";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AuthCard from "../AuthCard";
import { CustomerRegisterForm } from "../AccountForms";

export const metadata: Metadata = { title: "Create Account — Secundarian" };
export const dynamic = "force-dynamic";

export default async function CustomerRegisterPage() {
  if (await getSession()) redirect("/account");
  return (
    <AuthCard title="Create Account" subtitle="Join the workshop — track orders and check out faster.">
      <CustomerRegisterForm />
    </AuthCard>
  );
}
