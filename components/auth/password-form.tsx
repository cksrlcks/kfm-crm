"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormContent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormStatus,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthBody, AuthWrapper } from "./auth-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModifyPasswordSchemaType, ModifyPasswordSchema } from "@/types/auth";
import ModifyPasswordAction from "@/server/actions/auth/password";
import { ActionResponse } from "@/types/common";

export function PasswordModifyForm({
  data,
}: {
  data: {
    email: string;
    name: string | null;
    contact: string | null;
  };
}) {
  const router = useRouter();
  const [formState, setFormState] = useState<ActionResponse>({
    message: "",
    success: false,
  });

  const form = useForm<ModifyPasswordSchemaType>({
    resolver: zodResolver(ModifyPasswordSchema),
    defaultValues: {
      email: data.email,
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  async function onSubmit(data: ModifyPasswordSchemaType) {
    const response = await ModifyPasswordAction(data);

    if (response.success) {
      alert(response.message);
      router.replace("/crm/mypage");
    } else {
      setFormState(response);
    }
  }

  return (
    <AuthWrapper>
      <AuthBody>
        <Form {...form}>
          <FormStatus status={formState} />
          <FormContent onSubmit={form.handleSubmit(onSubmit)}>
            <input type="text" {...form.register("email")} hidden readOnly />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이전 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>새로운 비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPasswordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>새로운 비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit" disabled={form.formState.isSubmitting}>
              수정하기
            </Button>
          </FormContent>
        </Form>
      </AuthBody>
    </AuthWrapper>
  );
}
