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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthBody, AuthFooter, AuthHeader, AuthWrapper } from "./auth-wrapper";
import { SignupSchema, SignupSchemaType } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export function SignupForm() {
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit({ email, password }: SignupSchemaType) {
    await authClient.signUp.email(
      { email, password, name: "user" },
      {
        onSuccess: () => {
          form.reset();
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
      <AuthHeader title="회원가입" desc="아래에 내용을 작성하신후 회원가입을 해주세요." />
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
              회원가입
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
