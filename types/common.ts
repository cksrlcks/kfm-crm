import { LucideIcon } from "lucide-react";
import { IconName } from "lucide-react/dynamic";

export type ActionResponse = { message?: string; success: boolean };

export type BaseNavItem = { path: string; label: string; active?: boolean };
export type RootNavItem = BaseNavItem & { icon: LucideIcon };
export type SubNavItem = BaseNavItem & { icon: IconName };

export type BasePagination = { page: number; size: number };
export type BaseSearchablePagination = BasePagination & { keyword: string };
export type BasePaginationReponse<T> = {
  data: T[];
  totalCount: number;
};

export type BaseOffset = { offset: number; limit: number };
export type BaseSearchableOffset = { offset: number; limit: number; searchValue: string };
