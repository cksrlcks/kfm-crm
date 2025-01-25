import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#">
            <span className="font-bold">
              KFM Blower <span className="text-muted-foreground">CRM</span>
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden bg-gradient-to-tr from-lime-400 via-emerald-500 to-teal-700 lg:block"></div>
    </div>
  );
}
