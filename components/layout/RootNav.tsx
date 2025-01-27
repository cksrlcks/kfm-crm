"use client";

import { UserRole } from "@/types/auth";
import { RootNavItem } from "./RootNavItem";
import { DraftingCompass, LayoutDashboard, ScrollText, Settings, User } from "lucide-react";
import CaculatorDialog from "../util/calculator";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function RootNav({ role }: { role?: UserRole }) {
  const [calOpen, setCalOpen] = useState(false);
  const pathname = usePathname();

  const adminLinks =
    role === "admin"
      ? [
          {
            label: "견적서",
            path: "/crm/quotation/list",
            icon: ScrollText,
            active: pathname.includes("quotation"),
          },
          {
            label: "회원 관리",
            path: "/crm/users",
            icon: User,
            active: pathname.includes("users"),
          },
        ]
      : [];

  const userLinks = [
    {
      label: "대시보드",
      path: "/crm/dashboard",
      icon: LayoutDashboard,
      active: pathname.includes("dashboard"),
    },
    {
      label: "내정보",
      path: "/crm/mypage/info",
      icon: Settings,
      active: pathname.includes("mypage"),
    },
  ];

  const allLinks = [...userLinks, ...adminLinks];

  return (
    <nav className="mb-8 flex items-center justify-between">
      <ul className="flex items-center gap-2">
        {allLinks.map((item) => (
          <RootNavItem key={item.path} item={item} />
        ))}
      </ul>
      <ul>
        <li>
          <button
            className="flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight text-muted-foreground hover:border-slate-100"
            onClick={() => setCalOpen(true)}
          >
            <DraftingCompass size={18} className="mb-1" />
            <span className="text-xs font-medium">직경계산</span>
          </button>
          <CaculatorDialog open={calOpen} onOpenChange={setCalOpen} />
        </li>
      </ul>
    </nav>
  );
}
