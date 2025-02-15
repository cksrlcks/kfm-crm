import { PropsWithChildren, ReactNode } from "react";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full max-w-lg flex-col gap-6">{children}</div>;
};

export const AuthHeader = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-balance text-sm text-muted-foreground">{desc}</p>
      {children}
    </div>
  );
};

export const AuthBody = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid gap-6">
      {children}
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
    </div>
  );
};

export const AuthFooter = ({ children }: PropsWithChildren) => {
  return <div className="text-center text-sm">{children}</div>;
};
