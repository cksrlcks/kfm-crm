"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { AuthBody, AuthFooter, AuthHeader, AuthWrapper } from "@/components/auth/auth-wrapper";
import { Separator } from "@/components/ui/separator";
import { LoginSchema, LoginSchemaType } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginAction from "@/server/actions/auth/login";
import { ActionResponse } from "@/types/common";
import Spinner from "../ui/spinner";

export function LoginForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<ActionResponse>({
    message: "",
    success: false,
  });

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchemaType) {
    const response = await loginAction(data);

    if (response.success) {
      //alert(response.message);
      router.replace("/crm/dashboard");
    } else {
      setFormState(response);
    }
  }

  return (
    <AuthWrapper>
      <AuthHeader title="CRM 로그인" desc="담당자에 전달받거나 가입한 계정으로 로그인해주세요." />
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Spinner /> : "로그인"}
            </Button>
          </FormContent>
        </Form>
      </AuthBody>
      <AuthFooter>
        <div className="flex items-center justify-center">
          <div>
            <span className="text-muted-foreground">회원이 아니신가요?</span>
            <Link href="/signup" className="ml-2 underline underline-offset-4">
              회원가입
            </Link>
          </div>
          <Separator className="mx-4 h-4" orientation="vertical" />
          <div>
            <Link href="/find" className="underline underline-offset-4">
              비밀번호 재설정
            </Link>
          </div>
        </div>
      </AuthFooter>
    </AuthWrapper>
  );
}
