"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { AuthBody, AuthFooter, AuthHeader, AuthWrapper } from "./auth-wrapper";
import {
  Form,
  FormContent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResetSchema, ResetSchemaType } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
export default function ResetForm() {
  const params = useSearchParams();
  const token = params.get("token") || "";

  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: ResetSchemaType) {
    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onSuccess: () => {
          form.reset();
          toast({
            description: "비밀번호를 변경했습니다. 다시 로그인해주세요",
          });
          redirect("/login");
        },
        onError: (ctx) => {
          toast({
            variant: "destructive",
            description: ctx.error.message,
          });
        },
      },
    );
  }

  return (
    <AuthWrapper>
      <AuthHeader title="비밀번호 초기화" desc="새로운 비밀번호를 입력해주세요" />
      <AuthBody>
        <Form {...form}>
          <FormContent onSubmit={form.handleSubmit(onSubmit)}>
            <input type="text" {...form.register("token")} defaultValue={token} hidden readOnly />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              변경
            </Button>
          </FormContent>
        </Form>
      </AuthBody>
      <AuthFooter>
        <Link href="/login">처음으로</Link>
      </AuthFooter>
    </AuthWrapper>
  );
}
