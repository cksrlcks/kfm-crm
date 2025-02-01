"use server";

import { addQuotation } from "@/server/dao/quotationDAO";
import { QuotationForm, quotationFormSchema } from "@/types/quotation";

export default async function quotationAddAction(data: QuotationForm) {
  const parsed = quotationFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    const result = await addQuotation(parsed.data);

    if (result) {
      return {
        success: true,
        message: "견적서 작성을 성공했습니다.",
      };
    } else {
      return {
        success: false,
        message: "견적서 작성에 문제가 생겼어요",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "견적서 작성에 문제가 생겼어요",
    };
  }
}
