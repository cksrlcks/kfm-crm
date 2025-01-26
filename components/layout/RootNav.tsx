"use client";

import { UserRole } from "@/types/auth";
import { RootNavItem } from "./RootNavItem";
import { LayoutDashboard, ScrollText, Settings, User } from "lucide-react";

export function RootNav({ role }: { role?: UserRole }) {
  const adminLinks =
    role === "admin"
      ? [
          { label: "견적서", path: "/crm/quotation/list", icon: ScrollText },
          { label: "회원 관리", path: "/crm/users", icon: User },
        ]
      : [];

  const userLinks = [
    { label: "대시보드", path: "/crm/dashboard", icon: LayoutDashboard },
    { label: "내정보", path: "/crm/mypage/info", icon: Settings },
  ];

  const allLinks = [...userLinks, ...adminLinks];

  return (
    <nav className="mb-8">
      <ul className="flex items-center gap-2">
        {allLinks.map((item) => (
          <RootNavItem key={item.path} item={item} />
        ))}
      </ul>
    </nav>
  );
}
