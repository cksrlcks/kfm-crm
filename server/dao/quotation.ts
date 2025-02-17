import { GetQuotationsRequest, Quotation, QuotationForm } from "@/types/quotation";
import { db } from "../db";
import { quotations } from "../db/schema";
import { count, eq, ilike, InferInsertModel, or, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

function generateQuotNo() {
  return Number(dayjs().tz("Asia/Seoul").format("YYYYMMDD"));
}

export const addQuotation = async (data: QuotationForm) => {
  const quot_no = generateQuotNo();

  return await db
    .insert(quotations)
    .values({ ...data, quot_no } as InferInsertModel<typeof quotations>)
    .returning({ id: quotations.id });
};

export const updateQuotation = async (id: Quotation["id"], data: QuotationForm) => {
  return await db
    .update(quotations)
    .set(data)
    .where(eq(quotations.id, id))
    .returning({ id: quotations.id });
};

export const removeQuotation = async (id: Quotation["id"]) => {
  return await db.delete(quotations).where(eq(quotations.id, id));
};

export const getQuotations = unstable_cache(async (params: GetQuotationsRequest = {}) => {
  const { page = 1, size = 10, keyword } = params;
  const condition = keyword
    ? or(
        ilike(quotations.company_name, `%${keyword}%`),
        ilike(sql`CAST(${quotations.quot_no} AS TEXT)`, `%${keyword}%`),
      )
    : undefined;

  const data = await db.query.quotations.findMany({
    orderBy: (quotations, { desc }) => [desc(quotations.created_at)],
    where: condition,
    limit: size,
    offset: (page - 1) * size,
  });

  const [totalCount] = await db.select({ count: count() }).from(quotations).where(condition);

  return {
    data,
    totalCount: totalCount.count,
  };
});

export const getQuotation = unstable_cache(async (id: Quotation["id"]) => {
  return await db.query.quotations.findFirst({
    where: eq(quotations.id, id),
  });
});
