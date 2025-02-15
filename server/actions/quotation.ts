"use server";

import { addQuotation, removeQuotation, updateQuotation } from "@/server/dao/quotation";
import { Quotation, QuotationForm, quotationFormSchema } from "@/types/quotation";
import { revalidatePath } from "next/cache";

export async function addAction(data: QuotationForm) {
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
      revalidatePath("/crm/quotation", "layout");

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

export async function updateAction(id: Quotation["id"], data: QuotationForm) {
  const parsed = quotationFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    const result = await updateQuotation(id, data);

    if (result) {
      revalidatePath("/crm/quotation", "layout");

      return {
        success: true,
        message: "견적서 작성을 수정했습니다.",
      };
    } else {
      return {
        success: false,
        message: "견적서 수정에 문제가 생겼어요",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "견적서 수정성에 문제가 생겼어요",
    };
  }
}

export async function removeAction(id: Quotation["id"]) {
  try {
    const result = await removeQuotation(id);

    if (result) {
      revalidatePath("/crm/quotation", "layout");

      return {
        success: true,
        message: "삭제했습니다.",
      };
    } else {
      return {
        success: false,
        message: "삭제를 실패했습니다.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "삭제를 실패했습니다.",
    };
  }
}
