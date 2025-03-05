import { authClient } from "@/lib/auth-client";
import { BaseSearchableOffset } from "@/types/common";

export const getUsers = async (params: Partial<BaseSearchableOffset>) => {
  return await authClient.admin.listUsers(
    {
      query: {
        ...params,
        sortBy: "createdAt",
        sortDirection: "desc",
      },
    },
    { throw: true },
  );
};
