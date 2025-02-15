import Profile from "@/components/mypage/Profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function InfoPage() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>가입된 정보</CardTitle>
        <CardDescription>정보를 추가 하거나 수정 할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Profile />
      </CardContent>
    </Card>
  );
}
