"use server";

import { FindSchema, FindSchemaType } from "@/types/auth";
import {
  deletePasswordResetToken,
  generatePasswordResetToken,
  getPasswordResetTokenByEmail,
} from "@/server/dao/tokenDAO";
import { findUser } from "@/server/dao/userDAO";
import { sendPasswordResetEmail } from "@/lib/email";

export default async function findAction(data: FindSchemaType) {
  const parsed = FindSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  // send reset password email process
  const { email } = parsed.data;

  try {
    // 1. find user
    const user = await findUser(email);

    if (!user) {
      return {
        success: false,
        message: "가입되지 않은 이메일입니다.",
      };
    }

    // 2. 이미 ressetPasswordToken이 존재하는지 확인후 있으면 기존꺼 삭제
    const exisitingToken = await getPasswordResetTokenByEmail(email);
    if (exisitingToken) {
      await deletePasswordResetToken(email);
    }

    // 3. passwordResetToken generate
    const passwordResetToken = await generatePasswordResetToken(email);
    if (!passwordResetToken) {
      return {
        message: "재발급 토큰을 생성할 수 없습니다.",
        success: false,
      };
    }

    // 4. send email
    const resetLink = `${process.env.BASE_URL}/reset?token=${passwordResetToken[0].token}`;
    await sendPasswordResetEmail(email, resetLink);

    return {
      message: "수신된 메일에서 비밀번호 초기화를 진행하세요",
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }
}
