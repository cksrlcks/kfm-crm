"use client";

import UserList from "@/components/user/list";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/service/user/user.queries";
import { UserModifyForm, userModifyFormSchema } from "@/service/user/user.type";

// better auth에서 pagination이 아직 지원 안됨, 임시로 100개
const PER_PAGE = 100;

export default function Page() {
  const searchParams = useSearchParams();
  const offset = Number(searchParams.get("offset")) || 0;
  const searchValue = searchParams.get("searchValue") || "";
  const queryClient = useQueryClient();

  const form = useForm<UserModifyForm>({
    resolver: zodResolver(userModifyFormSchema),
  });

  const { data, isFetching } = useGetUsers({ limit: PER_PAGE, searchValue, offset });
  const users = data?.users || [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedUser = users.find(({ id }) => id === selectedId);

  useEffect(() => {
    form.reset({
      email: selectedUser?.email,
      name: selectedUser?.name,
      role: selectedUser?.role,
    });
  }, [form, selectedId, selectedUser]);

  const onSubmit = async (data: UserModifyForm) => {
    if (!selectedId) return;

    await authClient.admin.setRole({
      userId: selectedId,
      role: data.role,
    });

    setSelectedId(null);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleRemoveUser = async (userId: string) => {
    await authClient.admin.removeUser({
      userId,
    });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  return (
    <div className="w-full">
      <UserList
        isFetching={isFetching}
        data={users}
        onSelect={setSelectedId}
        onRemove={handleRemoveUser}
      />

      <Dialog open={!!selectedId} onOpenChange={() => setSelectedId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원정보 수정</DialogTitle>
            <DialogDescription>회원의 권한을 수정 하실 수 있습니다.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="grid w-full gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" {...field} readOnly disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="이름을 입력해주세요" {...field} readOnly disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>권한</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="권한을 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="user">user</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">저장</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
