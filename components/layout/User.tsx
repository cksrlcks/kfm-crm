"use client";

import { GeneralUser } from "@/types/auth";
import { Separator } from "../ui/separator";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function User({ user }: { user: GeneralUser }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-sm">
        <div className="font-semibold">{user.name}</div>
        <div className="text-xs tracking-tight text-muted-foreground">({user.email})</div>
      </div>
      <Separator orientation="vertical" className="mx-3 h-3" />
      <Link href="/crm/mypage" className="text-sm font-semibold">
        내정보
      </Link>
      <Separator orientation="vertical" className="mx-3 h-3" />
      <button className="text-sm font-semibold" onClick={() => signOut()}>
        로그아웃
      </button>
    </div>
  );
}
