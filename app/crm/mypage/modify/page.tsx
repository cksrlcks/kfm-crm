import { ModifyForm } from "@/components/auth/modify-form";
import { getUser } from "@/server/actions/auth/me";
import { verifySession } from "@/server/session";

export default async function ModifyPage() {
  const session = await verifySession();
  const userEmail = session.user?.email;

  if (!userEmail) return null;
  const data = await getUser(userEmail);

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return <ModifyForm data={data} />;
}
