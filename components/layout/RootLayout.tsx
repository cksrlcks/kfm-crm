import { PropsWithChildren } from "react";

export function Root({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-screen-2xl px-8 py-6">{children}</div>;
}
