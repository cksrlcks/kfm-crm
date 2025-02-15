import { LucideIcon } from "lucide-react";
import { IconName } from "lucide-react/dynamic";

export type ActionResponse = { message?: string; success: boolean };

export type BaseNavItem = { path: string; label: string; active?: boolean };
export type RootNavItem = BaseNavItem & { icon: LucideIcon };
export type SubNavItem = BaseNavItem & { icon: IconName };
