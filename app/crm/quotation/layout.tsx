import { PropsWithChildren } from "react";
import { SubLayout } from "@/components/layout/SubLayout";
import { SubNavItem } from "@/types/common";

export default function layout({ children }: PropsWithChildren) {
  const subItems: SubNavItem[] = [
    {
      path: "/crm/quotation/list",
      label: "견적서 리스트",
      icon: "scroll-text",
    },
    {
      path: "/crm/quotation/add",
      label: "견적서 작성",
      icon: "pencil",
    },
  ];
  return (
    <SubLayout title="견적서" desc="견적서를 작성하고, 관리하는 페이지입니다." items={subItems}>
      {children}
    </SubLayout>
  );
}
