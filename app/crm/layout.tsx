import { Root, RootBody, RootHeader, RootNav } from "@/components/layout/";
import { PropsWithChildren } from "react";

export default async function CRMLayout({ children }: PropsWithChildren) {
  return (
    <Root>
      <RootHeader />
      <RootNav />
      <RootBody>{children}</RootBody>
    </Root>
  );
}
