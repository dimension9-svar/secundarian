import type { Metadata } from "next";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import AuthCard from "../AuthCard";
import { CustomerLoginForm } from "../AccountForms";

export const metadata: Metadata = { title: "Sign In — Secundarian" };
export const dynamic = "force-dynamic";

export default async function CustomerLoginPage() {
  if (await getSession()) redirect("/account");
  return (
    <AuthCard title="Sign In" subtitle="Welcome back to Secundarian.">
      <CustomerLoginForm />
    </AuthCard>
  );
}
