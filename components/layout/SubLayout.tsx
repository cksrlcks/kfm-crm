"use client";

import { PropsWithChildren } from "react";
import SubNav from "./SubNav";
import { SubHeader } from "./SubHeader";
import { Separator } from "../ui/separator";
import { SubNavItem } from "@/types/common";

interface SubLayoutProps {
  title: string;
  desc: string;
  items: SubNavItem[];
}

export function SubLayout({ children, title, desc, items }: PropsWithChildren<SubLayoutProps>) {
  return (
    <div>
      <SubHeader title={title} desc={desc} />
      <Separator className="my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SubNav items={items} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1 pr-4">{children}</div>
      </div>
    </div>
  );
}
