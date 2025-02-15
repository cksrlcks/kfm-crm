import AddForm from "@/components/quotation/add-form";
import { getQuotation } from "@/server/dao/quotation";
import { Quotation } from "@/types/quotation";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = (await getQuotation(Number(id))) as Quotation;

  if (!data) {
    redirect("/crm/quotation/list");
  }
  return <AddForm initialData={data} />;
}
