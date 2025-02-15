import { PasswordModifyForm } from "@/components/auth/password-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PasswordPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { email } = session.user;

  return <PasswordModifyForm email={email} />;
}
