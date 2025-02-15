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
import { ModifySchema, ModifySchemaType } from "@/types/auth";
import { AuthBody, AuthWrapper } from "./auth-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function ModifyForm({
  email,
  name,
  contact,
}: {
  email: string;
  name: string;
  contact: string | null | undefined;
}) {
  const router = useRouter();
  const form = useForm<ModifySchemaType>({
    resolver: zodResolver(ModifySchema),
    defaultValues: {
      email: email,
      name: name,
      contact: contact || "",
    },
  });

  async function onSubmit(data: ModifySchemaType) {
    await authClient.updateUser(
      {
        name: data.name,
        contact: data.contact,
      },
      {
        onSuccess: () => {
          toast({ description: "정보를 변경했습니다." });
          router.push("/crm/mypage");
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

  const isDisabled =
    !form.formState.isDirty || !form.formState.isValid || form.formState.isSubmitting;

  return (
    <AuthWrapper>
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
            <Button type="submit" className="w-fit" disabled={isDisabled}>
              수정하기
            </Button>
          </FormContent>
        </Form>
      </AuthBody>
    </AuthWrapper>
  );
}
