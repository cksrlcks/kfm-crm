import Pagination from "@/components/board/Pagination";
import QuotationList from "@/components/quotation/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuotations } from "@/server/dao/quotation";
import { GetQuotationsResponse } from "@/types/quotation";
import { redirect } from "next/navigation";

const PER_PAGE = 10;

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; keyword: string }>;
}) {
  const query = await searchParams;
  const keyword = query.keyword || "";
  const page = query.page ? parseInt(query.page) : 1;

  const { data, totalCount } = (await getQuotations({
    page,
    keyword,
    size: PER_PAGE,
  })) as GetQuotationsResponse;

  async function handleSearch(formData: FormData) {
    "use server";

    const keyword = formData.get("keyword") as string;
    redirect(keyword ? `/crm/quotation/list?keyword=${keyword}` : "/crm/quotation/list");
  }

  return (
    <div className="w-full">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-45">전체:{totalCount}</div>
          <form className="flex gap-2" action={handleSearch}>
            <Input type="text" className="h-auto" name="keyword" defaultValue={keyword} />
            <Button type="submit" variant="outline" size="sm">
              검색
            </Button>
          </form>
        </div>

        <QuotationList data={data} />

        <Pagination
          page={page}
          size={PER_PAGE}
          totalCount={totalCount}
          pathname="/crm/quotation/list"
          keyword={keyword}
        />
      </div>
    </div>
  );
}
