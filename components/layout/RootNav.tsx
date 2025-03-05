"use client";

import { RootNavItem } from "./RootNavItem";
import {
  BookOpen,
  DraftingCompass,
  LayoutDashboard,
  ScrollText,
  Settings,
  User,
} from "lucide-react";
import CaculatorDialog from "@/components/dialog/CalculatorDialog";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function RootNav() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const adminLinks = [
    {
      label: "견적서",
      path: "/crm/quotation/list",
      icon: ScrollText,
      active: pathname.includes("quotation"),
    },
    {
      label: "회원 관리",
      path: "/crm/users/admin-list",
      icon: User,
      active: pathname.includes("users"),
    },
  ];

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

  const allLinks = session?.user.role === "admin" ? [...userLinks, ...adminLinks] : userLinks;

  const [fixed, setFixed] = useState(false);

  const scrollNavCheck = useCallback(() => {
    setFixed(window.scrollY >= 50 ? true : false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavCheck);
    return () => window.removeEventListener("scroll", scrollNavCheck);
  }, [scrollNavCheck]);

  if (isPending) {
    return null;
  }

  return (
    <nav
      className={`sticky:bg-red sticky top-0 z-50 mb-8 flex items-center justify-between bg-white ${fixed && "border-b"}`}
    >
      <ul className="flex items-center gap-2">
        {allLinks.map((item) => (
          <RootNavItem key={item.path} item={item} />
        ))}
      </ul>
      <ul className="flex items-center gap-2">
        <li>
          <a href="/api/catalog" target="_blank" title="ee">
            <button className="flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight text-muted-foreground hover:border-slate-100">
              <BookOpen size={18} className="mb-1" />
              <span className="text-xs font-medium">
                블로워
                <br />
                PDF
              </span>
            </button>
          </a>
        </li>
        <li>
          <button
            className="flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight text-muted-foreground hover:border-slate-100"
            onClick={() => setCalculatorOpen(true)}
          >
            <DraftingCompass size={18} className="mb-1" />
            <span className="text-xs font-medium">
              블로워
              <br />
              선정
            </span>
          </button>
          <CaculatorDialog open={calculatorOpen} onOpenChange={setCalculatorOpen} />
        </li>
      </ul>
    </nav>
  );
}
