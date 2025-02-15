"use client";

import { authClient } from "@/lib/auth-client";
import { Separator } from "../ui/separator";
import Link from "next/link";

export function User() {
  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut();
    window.location.reload();
  }

  if (isPending) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-sm">
        <div className="font-semibold">{session?.user.name}</div>
        <div className="text-xs tracking-tight text-muted-foreground">({session?.user.email})</div>
      </div>
      <Separator orientation="vertical" className="mx-3 h-3" />
      <Link href="/crm/mypage/info" className="text-sm font-semibold">
        내정보
      </Link>
      <Separator orientation="vertical" className="mx-3 h-3" />
      <button className="text-sm font-semibold" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
