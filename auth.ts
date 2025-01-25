import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./server/db";
import { eq } from "drizzle-orm";
import { users } from "./server/db/schema";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { LoginSchema, UserRole } from "./types/auth";

declare module "next-auth" {
  interface User {
    role?: UserRole;
  }

  interface Session {
    role?: UserRole;
  }

  interface JWT {
    role?: UserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const credentialsSignin = new CredentialsSignin();

        // 1. safeparse with zod schema
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) {
          credentialsSignin.message = "양식을 다시 확인해주세요.";
          throw credentialsSignin;
        }

        const { email, password } = parsed.data;

        // 2. find email
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) {
          credentialsSignin.message = "존재하지 않는 이메일입니다.";
          throw credentialsSignin;
        }

        // 3. compare with password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          credentialsSignin.message = "비밀번호가 틀렸습니다.";
          throw credentialsSignin;
        }
        // 4. return user
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
});
