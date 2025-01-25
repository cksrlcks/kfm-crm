import { SubNavItem as SubNavItemProps } from "@/types/common";
import { SubNavItem } from "./SubNavItem";

export default function SubNav({ items }: { items: SubNavItemProps[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <SubNavItem key={item.path} item={item} />
      ))}
    </ul>
  );
}
