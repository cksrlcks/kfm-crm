"use server";

import { ModifyPasswordSchema, ModifySchemaType } from "@/types/auth";
import bcrypt from "bcryptjs";
import { findUser, updatePassword } from "@/server/dao/userDAO";

export default async function ModifyPasswordAction(data: ModifySchemaType) {
  const parsed = ModifyPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  const { email, password, newPassword } = parsed.data;
  try {
    // 1. 유저정보 찾기
    const user = await findUser(email);
    if (!user) {
      return {
        success: false,
        message: "회원정보가 없습니다.",
      };
    }

    // 2. 기존 패스워드 일치여부 확인
    const passowrdMatch = await bcrypt.compare(password, user.password);
    if (!passowrdMatch) {
      return {
        success: false,
        message: "이전 비밀번호가 일치하지 않습니다.",
      };
    }

    // 3. 새로운 password로 교체
    const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUNDS));
    await updatePassword(hashedPassword, email);

    return {
      success: true,
      message: "비밀번호를 수정했습니다.",
    };
  } catch {
    return {
      success: false,
      message: "문제가 발생했습니다.",
    };
  }
}
