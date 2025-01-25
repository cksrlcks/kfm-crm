import { User } from "next-auth";

export type UserRole = "admin" | "user";
export type GeneralUser = {
  email: string;
  name: string;
  role: User;
};
