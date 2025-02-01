import { PropsWithChildren } from "react";

export function Loading({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full items-center justify-center px-5 py-10 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
