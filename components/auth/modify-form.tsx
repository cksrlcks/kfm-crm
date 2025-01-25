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
import { ModifySchema, ModifySchemaType } from "@/types/auth";
import { ActionResponse } from "@/types/common";
import { AuthBody, AuthWrapper } from "./auth-wrapper";
import modifyUserAction from "@/server/actions/auth/modify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function ModifyForm({
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

  const form = useForm<ModifySchemaType>({
    resolver: zodResolver(ModifySchema),
    defaultValues: {
      email: data.email,
      name: data.name || "",
      contact: data.contact || "",
    },
  });

  async function onSubmit(data: ModifySchemaType) {
    const response = await modifyUserAction(data);

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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@email.com"
                      {...field}
                      readOnly
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="이름을 입력해주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>연락처</FormLabel>
                  <FormControl>
                    <Input placeholder="연락처를 입력해주세요 : 000-0000-0000" {...field} />
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
