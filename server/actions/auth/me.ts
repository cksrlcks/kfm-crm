"use server";

import { verifySession } from "@/server/session";
import { findUser } from "@/server/dao/userDAO";
import { userDTO } from "@/server/dto/userDTO";
import { cache } from "react";

export const getUser = cache(async (email: string) => {
  const session = await verifySession();
  if (!session) return null;

  const user = await findUser(email);
  if (!user) {
    return null;
  }
  return userDTO(user);
});
