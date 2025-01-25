import { User } from "next-auth";
import { z } from "zod";

export type UserRole = "admin" | "user";

export type GeneralUser = Pick<User, "email" | "name" | "role">;

export const LoginSchema = z.object({
  email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
  password: z.string().min(8, { message: "8자 이상 입력해주세요" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const SignupSchema = z
  .object({
    email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
    password: z.string().min(8, { message: "8자 이상 입력해주세요" }),
    passwordConfirm: z.string().min(8, { message: "8자 이상 입력해주세요" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupSchemaType = z.infer<typeof SignupSchema>;

export const ModifySchema = z.object({
  email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
  contact: z
    .string()
    .regex(new RegExp(/^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/), "유효하지 않은 연락처입니다.")
    .optional(),
  name: z.string().min(2, { message: "2자 이상 입력해주세요" }).optional(),
});

export type ModifySchemaType = z.infer<typeof ModifySchema>;

export const ModifyPasswordSchema = z
  .object({
    email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
    password: z.string().min(8, { message: "8자 이상 입력해주세요" }),
    newPassword: z.string().min(8, { message: "8자 이상 입력해주세요" }),
    newPasswordConfirm: z.string().min(8, { message: "8자 이상 입력해주세요" }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type ModifyPasswordSchemaType = z.infer<typeof ModifyPasswordSchema>;

export const FindSchema = z.object({
  email: z.string().email({ message: "유효하지 않은 이메일입니다." }),
});
export type FindSchemaType = z.infer<typeof FindSchema>;

export const ResetSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8, { message: "8자 이상 입력해주세요" }),
    passwordConfirm: z.string().min(8, { message: "8자 이상 입력해주세요" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });
export type ResetSchemaType = z.infer<typeof ResetSchema>;
