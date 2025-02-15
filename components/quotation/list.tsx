"use client";

import { useState } from "react";
import QuotationPreview from "./preview";
import { Quotation } from "@/types/quotation";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { formatDate } from "@/lib/utils";
import { removeAction } from "@/server/actions/quotation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface QuotationListProps {
  data: Quotation[];
}

export default function QuotationList({ data }: QuotationListProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selected, setSelected] = useState<Quotation | null>(null);

  function handleSelect(data: Quotation) {
    setSelected(data);
    setIsPreviewOpen(true);
  }

  async function handleDelete(id: Quotation["id"]) {
    const response = await removeAction(id);
    toast({
      variant: response.success ? "default" : "destructive",
      description: response.message,
    });
  }

  const columns: ColumnDef<Quotation>[] = [
    {
      id: "no",
      header: "No.",
      size: 40,
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: "quot_no",
      header: "견적번호",
    },
    {
      accessorKey: "company_name",
      header: "회사이름",
      cell: ({ row }) => {
        return row.getValue("company_name") || "-";
      },
    },
    {
      accessorKey: "created_at",
      header: "작성일",
      cell: ({ row }) => {
        return formatDate(row.getValue("created_at"), "yyyy.MM.dd hh:mm");
      },
    },
    {
      accessorKey: "id",
      header: "",
      enableResizing: false,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSelect(row.original)}
            >
              보기
            </Button>
            <Link href={`/crm/quotation/edit/${row.getValue("id")}`}>
              <Button type="button" variant="outline" size="sm">
                수정
              </Button>
            </Link>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.getValue("id"))}
            >
              삭제
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
      {isPreviewOpen && selected && (
        <QuotationPreview
          data={selected}
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
