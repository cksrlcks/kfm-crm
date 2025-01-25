import { PasswordModifyForm } from "@/components/auth/password-form";
import { getUser } from "@/server/actions/auth/me";
import { verifySession } from "@/server/session";

export default async function PasswordPage() {
  const session = await verifySession();
  const userEmail = session.user?.email;

  if (!userEmail) return null;
  const data = await getUser(userEmail);

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  return <PasswordModifyForm data={data} />;
}
