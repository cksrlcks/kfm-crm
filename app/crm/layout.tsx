import { auth } from "@/auth";
import { Root, RootBody, RootHeader, RootNav } from "@/components/layout/";
import { PropsWithChildren } from "react";

export default async function CRMLayout({ children }: PropsWithChildren) {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <Root>
      <RootHeader user={session.user} />
      <RootNav role={session.user.role} />

      <RootBody>{children}</RootBody>
    </Root>
  );
}
