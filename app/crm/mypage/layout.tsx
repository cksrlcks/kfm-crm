import { PropsWithChildren } from "react";
import { SubLayout } from "@/components/layout/SubLayout";
import { SubNavItem } from "@/types/common";

export default function layout({ children }: PropsWithChildren) {
  const subItems: SubNavItem[] = [
    {
      path: "/crm/mypage/info",
      label: "회원 정보",
      icon: "user",
    },
    {
      path: "/crm/mypage/modify",
      label: "프로필 수정",
      icon: "settings",
    },
    {
      path: "/crm/mypage/password",
      label: "비밀번호 수정",
      icon: "key-round",
    },
  ];
  return (
    <SubLayout title="내정보" desc="회원 정보를 수정하는 페이지 입니다" items={subItems}>
      {children}
    </SubLayout>
  );
}
