import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./user.service";
import { BaseSearchableOffset } from "@/types/common";

export const useGetUsers = (params: BaseSearchableOffset) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(params),
  });
};
