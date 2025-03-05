import { PropsWithChildren } from "react";
import { SubLayout } from "@/components/layout/SubLayout";
import { SubNavItem } from "@/types/common";

export default function Layout({ children }: PropsWithChildren) {
  const subItems: SubNavItem[] = [
    {
      path: "/crm/users/admin-list",
      label: "관리자 리스트",
      icon: "shield-check",
    },
    {
      path: "/crm/users/client-list",
      label: "고객 리스트",
      icon: "users-round",
    },
  ];
  return (
    <SubLayout title="회원 관리" desc="회원 관리를 할 수 있습니다." items={subItems}>
      {children}
    </SubLayout>
  );
}
