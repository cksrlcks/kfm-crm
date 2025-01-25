"use server";

import { ResetSchema, ResetSchemaType } from "@/types/auth";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/server/dao/tokenDAO";
import { findUser, updateUserPasswordByEmailToken } from "@/server/dao/userDAO";

export default async function ResetAction(data: ResetSchemaType) {
  const parsed = ResetSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  // reset password process
  const { token, password } = parsed.data;

  try {
    // 1. 받은 token으로 resetPasswordTokens 테이블에 있는 토큰 가져오기
    const resetToken = await getPasswordResetTokenByToken(token);
    if (!resetToken) {
      return {
        success: false,
        message: "비밀번호 초기화 토큰이 없습니다.",
      };
    }

    // 2. 조회한 토큰에서 유효기간 체크
    const isExpired = new Date(resetToken.expires) < new Date();
    if (isExpired) {
      return {
        success: false,
        message: "토큰이 만료되었습니다.",
      };
    }

    // 3. email로 user 조회후 있는지 체크
    const user = await findUser(resetToken.email);
    if (!user) {
      return {
        success: false,
        message: "유저 정보가 없어습니다.",
      };
    }

    // 4. 비밀번호 암호화해서 usesr에 업데이트
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    await updateUserPasswordByEmailToken(hashedPassword, resetToken.email, resetToken.id);

    return {
      success: true,
      message: "비밀번호 변경에 성공했습니다.",
    };
  } catch {
    return {
      success: false,
      message: "문제가 생겨 실팼습니다.",
    };
  }
}
