import { InferSelectModel } from "drizzle-orm";
import { users } from "@/server/db/schema";

export const userDTO = (user: InferSelectModel<typeof users>) => {
  return {
    email: user.email,
    name: user.name,
    image: user.image,
    created_at: user.created_at,
    role: user.role,
    companyId: user.companyId,
    contact: user.contact,
  };
};
