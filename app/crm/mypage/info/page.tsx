import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/server/actions/auth/me";
import { verifySession } from "@/server/session";

export default async function InfoPage() {
  const session = await verifySession();
  const userEmail = session.user?.email;

  if (!userEmail) return null;
  const data = await getUser(userEmail);

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>가입된 정보</CardTitle>
        <CardDescription>정보를 추가 하거나 수정 할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <div className="text-muted-foreground">Email</div>
            <div>{data.email}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground">이름</div>
            <div>{data.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-muted-foreground">연락처</div>
            <div>{data.contact}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
