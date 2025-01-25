"use client";

import Link from "next/link";
import { useState } from "react";
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
import { AuthBody, AuthFooter, AuthHeader, AuthWrapper } from "./auth-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import findAction from "@/server/actions/auth/find";
import { ActionResponse } from "@/types/common";
import { FindSchema, FindSchemaType } from "@/types/auth";

export default function FindForm() {
  const [formState, setFormState] = useState<ActionResponse>({
    message: "",
    success: false,
  });

  const form = useForm<FindSchemaType>({
    resolver: zodResolver(FindSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FindSchemaType) {
    const response = await findAction(data);
    setFormState(response);
  }

  return (
    <AuthWrapper>
      <AuthHeader title="비밀번호 초기화" desc="가입하신 메일로 초기화 메일을 보내드립니다." />
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
                    <Input type="email" placeholder="email@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              메일 보내기
            </Button>
          </FormContent>
        </Form>
      </AuthBody>
      <AuthFooter>
        <span className="text-muted-foreground">이미 회원이신가요?</span>
        <Link href="/login" className="ml-2 underline underline-offset-4">
          로그인
        </Link>
      </AuthFooter>
    </AuthWrapper>
  );
}
