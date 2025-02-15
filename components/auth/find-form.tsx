"use client";

import Link from "next/link";
import {
  Form,
  FormContent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthBody, AuthFooter, AuthHeader, AuthWrapper } from "./auth-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FindSchema, FindSchemaType } from "@/types/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";

export default function FindForm() {
  const form = useForm<FindSchemaType>({
    resolver: zodResolver(FindSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FindSchemaType) {
    await authClient.forgetPassword(
      {
        email: data.email,
        redirectTo: "/reset",
      },
      {
        onSuccess: () => {
          form.reset();
          toast({
            description: "요청하신 메일로 비밀번호 초기화 링크가 전송되었습니다.",
          });
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
      <AuthHeader title="비밀번호 초기화" desc="가입하신 메일로 초기화 메일을 보내드립니다." />
      <AuthBody>
        <Form {...form}>
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
