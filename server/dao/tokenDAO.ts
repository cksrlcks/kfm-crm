"use server";

import { db } from "@/server/db";
import { passwordResetTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getPasswordResetTokenByEmail(email: string) {
  return await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });
}

export async function getPasswordResetTokenByToken(token: string) {
  return await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });
}

export async function generatePasswordResetToken(email: string) {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1시간

  const exisitingToken = await getPasswordResetTokenByEmail(email);
  if (exisitingToken) {
    await deletePasswordResetToken(email);
  }

  return await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();
}

export async function deletePasswordResetToken(email: string) {
  return await db.delete(passwordResetTokens).where(eq(passwordResetTokens.email, email));
}
