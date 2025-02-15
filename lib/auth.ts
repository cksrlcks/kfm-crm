import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../server/db";
import { sendPasswordResetEmail } from "./email";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      contact: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail(user.email, url);
    },
    
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, 
    },
  },
  plugins: [
    admin({
      defaultRole: "user",
      adminRole: ["admin", "superAdmin"],
    }),
  ],
});
