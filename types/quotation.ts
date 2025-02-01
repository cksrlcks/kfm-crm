import { z } from "zod";

export const COMPANY_NAME = "한국유체기계";
export const EMPLOYEES = [
  { id: 1, name: "이철환", title: "대표" },
  { id: 2, name: "이채윤", title: "부장" },
  { id: 3, name: "이채균", title: "부장" },
]; // db 회원정보에서 role이 admin인 사람이 나오도록 해야겟지?

export const ACCESSORY = [
  { id: 1, name: "suction_silence", label: "SUCTION SILENCE" },
  { id: 2, name: "discharge_silencer", label: "DISCHARGE SILENCER" },
  { id: 3, name: "pulley", label: "PULLEY" },
  { id: 4, name: "belt", label: "BELT" },
  { id: 5, name: "bed", label: "BED" },
  { id: 6, name: "safety_valve", label: "SAFETY VALVE" },
  { id: 7, name: "flexible_check", label: "FLEXIBLE CHECK" },
  { id: 8, name: "flexible_tube", label: "FLEXIBLE TUBE" },
  { id: 9, name: "expansion_joint", label: "EXPANSION JOINT" },
  { id: 10, name: "check_valve", label: "CHECK VALVE" },
  { id: 11, name: "gauge", label: "GAUGE" },
  { id: 12, name: "bolt_nut", label: "BOLT NUT" },
] as const;

export const productItemSchema = z.object({
  description: z.string(),
  quantity: z.coerce.number().optional(),
  unit_price: z.coerce.number().optional(),
});

export const categorySchema = z.object({
  category_name: z.string(),
  category_items: z.array(productItemSchema).optional(),
});

export const quotationFormSchema = z.object({
  quot_no: z.number().optional(), // 저장시 자동생성됩니다.
  ins_no: z.number().optional(),
  created_at: z.date().optional(), // 기본값, today
  updated_at: z.date().optional(),
  company_name: z.string().optional(),
  quotation_amount: z.coerce.number().optional(),
  payment_term: z.string().optional(), // 현금
  delivery_term: z.coerce.number().optional(), // 발주후 50일(국내)
  delivery_condition: z.string().optional(),
  price_valid: z.number().optional(),
  remarks: z.object({
    tax: z.boolean(),
    transportation: z.boolean(),
  }),
  prepared: z.string(),
  accessory: z.object(
    Object.fromEntries(ACCESSORY.map((accessory) => [accessory.name, z.boolean()])),
  ),
  category: z.array(categorySchema).optional(),
});

export type QuotationForm = z.infer<typeof quotationFormSchema>;
