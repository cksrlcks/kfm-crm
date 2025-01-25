import { db } from "@/server/db";
import { passwordResetTokens, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

// 사용자 조회
export const findUser = async (email: string) => {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

// 새로운 사용자 삽입
export const createUser = async (email: string, hashedPassword: string) => {
  return await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });
};

// 사용자 정보 업데이트
export const updateUser = async (
  email: string,
  name: string | undefined,
  contact: string | undefined,
) => {
  return await db
    .update(users)
    .set({
      name,
      contact,
    })
    .where(eq(users.email, email));
};

// 비밀번호 업데이트
export const updatePassword = async (hashedPassword: string, email: string) => {
  return await db.update(users).set({ password: hashedPassword }).where(eq(users.email, email));
};

// 이메일인증을 통한 비밀번호 업데이트
export const updateUserPasswordByEmailToken = async (
  hashedPassword: string,
  email: string,
  tokenId: string,
) => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const dbPool = drizzle(pool);

  return await dbPool.transaction(async (ctx) => {
    await ctx.update(users).set({ password: hashedPassword }).where(eq(users.email, email));

    await ctx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, tokenId));
  });
};
