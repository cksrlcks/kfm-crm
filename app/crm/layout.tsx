import { Root, RootBody, RootHeader, RootNav } from "@/components/layout/";
import { PropsWithChildren } from "react";
import QueryProvider from "@/context/QueryProvider";

export default async function CRMLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <Root>
        <RootHeader />
        <RootNav />
        <RootBody>{children}</RootBody>
      </Root>
    </QueryProvider>
  );
}
