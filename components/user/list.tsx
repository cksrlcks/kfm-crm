"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserWithRole } from "better-auth/plugins";
import { Button } from "../ui/button";
import { DataTable } from "../board/data-table";
import { formatDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface UserListProps {
  data: UserWithRole[];
  isFetching: boolean;
  onSelect: (userId: string) => void;
  onRemove: (userId: string) => void;
}

export default function UserList({ data, isFetching, onSelect, onRemove }: UserListProps) {
  const columns: ColumnDef<UserWithRole>[] = [
    {
      id: "no",
      header: "No.",
      size: 40,
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "이름",
    },
    {
      accessorKey: "role",
      header: "권한",
    },
    {
      accessorKey: "createdAt",
      header: "생성일",
      cell: ({ row }) => {
        return formatDate(row.getValue("createdAt"), "yyyy.MM.dd");
      },
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
        const userId = row.getValue("id") as string;
        return (
          <>
            <div className="flex justify-end gap-1">
              <Button type="button" variant="outline" size="sm" onClick={() => onSelect(userId)}>
                수정
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm">
                    탈퇴
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>회원을 삭제합니다.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>아니오</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onRemove(userId)}>예</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        );
      },
    },
  ];

  if (isFetching) {
    return <div>loading...</div>;
  }
  return <DataTable columns={columns} data={data} />;
}
