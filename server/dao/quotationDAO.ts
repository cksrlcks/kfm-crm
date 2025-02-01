import { QuotationForm } from "@/types/quotation";
import { db } from "../db";
import { quotations } from "../db/schema";
import { and, gte, InferInsertModel, lt } from "drizzle-orm";

async function generateQuotNo() {
  const today = new Date();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(todayStart.getDate() + 1);

  const datePart = today.toISOString().slice(0, 10).replace(/-/g, "");
  const baseNumber = parseInt(datePart) * 1000;

  const lastQuot = await db.query.quotations.findFirst({
    where: and(gte(quotations.created_at, todayStart), lt(quotations.created_at, tomorrowStart)),
    orderBy: (quotations, { desc }) => [desc(quotations.quot_no)],
  });

  if (lastQuot && lastQuot.quot_no) {
    return lastQuot.quot_no + 1;
  } else {
    return baseNumber + 1;
  }
}

export const addQuotation = async (data: QuotationForm) => {
  const quot_no = await generateQuotNo();

  return await db
    .insert(quotations)
    .values({ ...data, quot_no } as InferInsertModel<typeof quotations>)
    .returning({ id: quotations.id });
};
