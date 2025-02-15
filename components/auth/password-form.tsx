"use client";

import { Button } from "@/components/ui/button";
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
import { AuthBody, AuthWrapper } from "./auth-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModifyPasswordSchemaType, ModifyPasswordSchema } from "@/types/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";

export function PasswordModifyForm({ email }: { email: string }) {
  const form = useForm<ModifyPasswordSchemaType>({
    resolver: zodResolver(ModifyPasswordSchema),
    defaultValues: {
      email: email,
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  async function onSubmit(data: ModifyPasswordSchemaType) {
    await authClient.changePassword(
      {
        newPassword: data.newPassword,
        currentPassword: data.password,
      },
      {
        onSuccess: () => {
          form.reset();
          toast({
            description: "비밀번호를 수정했습니다.",
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
      <AuthBody>
        <Form {...form}>
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
