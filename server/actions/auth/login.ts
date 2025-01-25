"use server";

import { signIn } from "@/auth";
import { LoginSchema, LoginSchemaType } from "@/types/auth";
import { CredentialsSignin } from "next-auth";

export default async function loginAction(data: LoginSchemaType) {
  const parsed = LoginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  // login process
  const { email, password } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: "로그인에 성공했습니다.",
    };
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "로그인 실패",
    };
  }
}
