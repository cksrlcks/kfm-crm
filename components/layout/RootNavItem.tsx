import { cn } from "@/lib/utils";
import { RootNavItem as RootNavItemProps } from "@/types/common";
import Link from "next/link";

export function RootNavItem({ item }: { item: RootNavItemProps }) {
  return (
    <Link
      href={item.path}
      className={cn(
        "flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight text-muted-foreground hover:border-slate-100",
        item.active && "bg-slate-50 text-foreground",
      )}
    >
      <item.icon size={18} className="mb-1" />
      <span className={cn("text-xs font-medium", item.active && "font-bold")}>{item.label}</span>
    </Link>
  );
}
