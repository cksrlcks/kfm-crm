import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SubNavItem as SubNavItemProps } from "@/types/common";
import { DynamicIcon } from "lucide-react/dynamic";

export function SubNavItem({ item }: { item: SubNavItemProps }) {
  const pathname = usePathname();
  const isActive = pathname.includes(item.path);
  return (
    <li>
      <Link
        key={item.path}
        href={item.path}
        className={cn(
          "flex items-center gap-3 rounded-md border border-transparent px-4 py-3 hover:border-slate-100",
          isActive && "bg-slate-50 font-medium",
        )}
      >
        <DynamicIcon name={item.icon} size={14} />
        <span className="text-sm"> {item.label}</span>
      </Link>
    </li>
  );
}
