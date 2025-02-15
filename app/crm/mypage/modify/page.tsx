import { ModifyForm } from "@/components/auth/modify-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ModifyPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { email, contact, name } = session.user;

  return <ModifyForm email={email} contact={contact} name={name} />;
}
