import QuotationList from "@/components/quotation/list";
import { getQuotations } from "@/server/dao/quotation";
import { Quotation } from "@/types/quotation";

export const dynamic = "force-dynamic";

export default async function ListPage() {
  const data = (await getQuotations()) as Quotation[];

  return <QuotationList data={data} />;
}
