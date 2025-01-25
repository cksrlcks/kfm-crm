"use server";

import { SignupSchema, SignupSchemaType } from "@/types/auth";
import bcrypt from "bcryptjs";
import { createUser, findUser } from "@/server/dao/userDAO";

export default async function signupAction(data: SignupSchemaType) {
  const parsed = SignupSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  // signup process
  const { email, password } = parsed.data;

  try {
    // 1. isExsitEmail check
    const isExsitEmail = await findUser(email);

    if (isExsitEmail) {
      return {
        success: false,
        message: "이미 가입된 이메일입니다.",
      };
    }

    // 2. db insert
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await createUser(email, hashedPassword);

    if (!user[0]) {
      return {
        success: false,
        message: "회원가입에 문제가 생겼어요.",
      };
    }

    return {
      success: true,
      message: "회원가입 성공",
    };
  } catch {
    return {
      success: false,
      message: "회원가입에 문제가 생겼어요.",
    };
  }
}
