"use server";

import { ModifySchema, ModifySchemaType } from "@/types/auth";
import { updateUser } from "@/server/dao/userDAO";

export default async function modifyUserAction(data: ModifySchemaType) {
  const parsed = ModifySchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  const { email, name, contact } = parsed.data;

  // db update
  try {
    await updateUser(email, name, contact);

    return {
      success: true,
      message: "회원정보를 수정했습니다.",
    };
  } catch {
    return {
      success: false,
      message: "문제가 발생했습니다.",
    };
  }
}
