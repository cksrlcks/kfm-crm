"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="grid gap-2 text-sm">
      <div className="flex justify-between">
        <div className="text-muted-foreground">Email</div>
        <div>{session.user.email}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-muted-foreground">이름</div>
        <div>{session.user.name}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-muted-foreground">연락처</div>
        <div>{session.user.contact}</div>
      </div>
    </div>
  );
}
