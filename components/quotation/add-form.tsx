"use client";

import { Control, useFieldArray, useForm, useFormContext, UseFormRegister } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  FormDescription,
  FormStatus,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { formatDate, formatPriceWithComma } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { AlignLeft, CalendarIcon, Minus, Plus, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { numToKorean } from "num-to-korean";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import QuotationPreview from "./preview";
import {
  ACCESSORY,
  COMPANY_NAME,
  EMPLOYEES,
  Quotation,
  QuotationForm,
  quotationFormSchema,
} from "@/types/quotation";
import { MouseEvent, PropsWithChildren, useState } from "react";
import { addAction, updateAction } from "@/server/actions/quotation";
import { ActionResponse } from "@/types/common";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryDefault = {
  category_name: "",
  category_items: [
    {
      description: "",
      quantity: 0,
      unit_price: 0,
    },
    {
      description: "",
      quantity: 0,
      unit_price: 0,
    },
  ],
};

export default function AddForm({ initialData }: { initialData?: Quotation }) {
  const isEditMode = !!initialData;
  const [formState, setFormState] = useState<ActionResponse>({
    message: "",
    success: false,
  });
  const router = useRouter();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const form = useForm<QuotationForm>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: initialData || {
      quot_no: undefined,
      ins_no: undefined,
      quotation_date: new Date(),
      company_name: "",
      quotation_amount: 0,
      payment_term: "현금",
      delivery_term: 30,
      delivery_condition: "지정상차도",
      price_valid: 30,
      remarks: {
        tax: true,
        transportation: true,
      },
      prepared: "이채균",
      accessory: {
        suction_silence: true,
        discharge_silencer: true,
        pulley: true,
        belt: true,
        belt_cover: false,
        bed: true,
        safety_valve: true,
        flexible_check: false,
        flexible_tube: false,
        expansion_joint: false,
        check_valve: false,
        gauge: true,
        bolt_nut: false,
      },
      category: [
        {
          category_name: "ROOTS BLOWER",
          category_items: [
            {
              description: "",
              quantity: 0,
              unit_price: 0,
            },
            {
              description: "",
              quantity: 0,
              unit_price: 0,
            },
          ],
        },
        {
          category_name: "MOTOR",
          category_items: [
            {
              description: "",
              quantity: 0,
              unit_price: 0,
            },
            {
              description: "",
              quantity: 0,
              unit_price: 0,
            },
          ],
        },
      ],
    },
  });

  const {
    fields: categoryFields,
    append: categoryAppend,
    remove: categoryRemove,
  } = useFieldArray({ control: form.control, name: "category" });

  let totalPrice = 0;
  form.getValues("category")?.forEach((category) => {
    category.category_items?.forEach((item) => {
      if (item.quantity && item.unit_price) {
        totalPrice += item.quantity * item.unit_price;
      }
    });
  });

  async function onSubmit(data: QuotationForm) {
    const response = isEditMode ? await updateAction(initialData.id, data) : await addAction(data);
    if (response.success) {
      alert(response.message);
      router.replace("/crm/quotation/list");
    } else {
      setFormState(response);
    }
  }

  return (
    <>
      <div className="grid w-full gap-3">
        <FormStatus status={formState} />
        <Form {...form}>
          <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4 flex w-full items-center justify-between">
              <h3 className="text-lg font-semibold">
                {isEditMode ? "견적서 수정" : "견적서 작성"}
              </h3>
              <div className="flex gap-1">
                <Button type="button" variant="outline" onClick={() => setIsPreviewOpen(true)}>
                  미리보기
                </Button>
                <Button type="submit">저장</Button>
              </div>
            </div>
            <div className="mb-8 rounded-md border p-4">
              <div className="mb-2 text-sm font-medium">자주쓰는 기호 모음</div>
              <div className="flex flex-wrap gap-1">
                <CopyTextButton>*</CopyTextButton>
                <CopyTextButton>㎥</CopyTextButton>
                <CopyTextButton>MIN</CopyTextButton>
                <CopyTextButton>KG</CopyTextButton>
                <CopyTextButton>㎠</CopyTextButton>
                <CopyTextButton>mmAq</CopyTextButton>
                <CopyTextButton>KW</CopyTextButton>
                <CopyTextButton>HZ</CopyTextButton>
                <CopyTextButton>Ø</CopyTextButton>
                <CopyTextButton>V</CopyTextButton>
                <CopyTextButton>SL*㎥/MIN*0.KG/㎠(00mmAq)</CopyTextButton>
                <CopyTextButton>WITH STANDARD ACCESSORY</CopyTextButton>
                <CopyTextButton>HIGEN*TEFC*KW*60HZ*4P*380V</CopyTextButton>
              </div>
            </div>
            <div className="flex flex-col gap-16 xl:flex-row">
              <div className="grid w-full gap-4 xl:w-[50%]">
                <FormField
                  control={form.control}
                  name="quot_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>견적번호</FormLabel>
                      <FormControl>
                        <Input placeholder="저장시 자동입력됩니다." {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ins_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ins No.</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quotation_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>견적일</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"}>
                              {field.value ? (
                                formatDate(field.value, "yyyy.MM.dd hh:mm")
                              ) : (
                                <span>날짜 선택</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>회사이름</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quotation_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>견적금액</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        {numToKorean(Number(field.value)) || "-"} 원<br />
                        {formatPriceWithComma(Number(field.value)) || "-"} 원
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payment_term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지불조건</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="delivery_term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제작기간</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>발주후{field.value}일(국내)</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="delivery_condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>인도조건</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price_valid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>유효기간</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>견적후 {field.value}일</FormDescription>
                    </FormItem>
                  )}
                />
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">참고사항</FormLabel>
                  </div>
                  <FormField
                    control={form.control}
                    name="remarks.tax"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">부가세 별도</FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="remarks.transportation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">운송료 별도</FormLabel>
                      </FormItem>
                    )}
                  />
                </FormItem>
                <FormField
                  control={form.control}
                  name="prepared"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>작성자</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="담당자를 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYEES.map((item) => (
                            <SelectItem key={item.id} value={`${item.name}`}>
                              {COMPANY_NAME} {item.title} {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">악세사리</FormLabel>
                  </div>
                  {ACCESSORY.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name={`accessory.${item.name}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              </div>
              <div className="w-full">
                <div className="mb-4 grid gap-8">
                  {categoryFields.map((field, categoryIndex) => {
                    return (
                      <div className="grid gap-2" key={field.id}>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="h-9 w-9"
                            onClick={() => categoryRemove(categoryIndex)}
                          >
                            <Minus />
                          </Button>
                          <Input
                            {...form.register(`category.${categoryIndex}.category_name`)}
                            className="w-full"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button type="button" variant="outline" className="h-9 w-9">
                                <AlignLeft />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" align="end">
                              <DropdownMenuLabel>항목</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  form.setValue(
                                    `category.${categoryIndex}.category_name`,
                                    "ROOTS BLOWER",
                                  )
                                }
                              >
                                ROOTS BLOWER
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  form.setValue(`category.${categoryIndex}.category_name`, "MOTOR")
                                }
                              >
                                MOTOR
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  form.setValue(
                                    `category.${categoryIndex}.category_name`,
                                    "ACCESSORY",
                                  )
                                }
                              >
                                ACCESSORY
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  form.setValue(`category.${categoryIndex}.category_name`, "ETC")
                                }
                              >
                                ETC
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CategoryItemsFieldArray
                          control={form.control}
                          register={form.register}
                          index={categoryIndex}
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full"
                    onClick={() => categoryAppend(categoryDefault)}
                  >
                    <Plus />
                  </Button>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>총금액</Label>
                    <Input className="w-100 text-right" type="number" value={totalPrice} disabled />
                  </div>

                  <FormField
                    control={form.control}
                    name="quotation_amount"
                    render={({ field }) => (
                      <>
                        <div className="flex items-center justify-between">
                          <Label>네고금액(견적금액)</Label>
                          <Input type="number" {...field} className="w-100 text-right" />
                        </div>
                        <FormDescription className="text-right">
                          {numToKorean(Number(field.value)) || "-"} 원<br />
                          {formatPriceWithComma(Number(field.value)) || "-"} 원
                        </FormDescription>
                      </>
                    )}
                  />

                  {/* 
                    <Label>네고금액(견적금액)</Label>
                    <Input
                      placeholder="네고금액을 써주세요"
                      className="w-100 text-right"
                      type="number"
                      {...form.register("quotation_amount")}
                    /> */}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div>
        {isPreviewOpen && (
          <QuotationPreview
            data={form.getValues()}
            open={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </div>
    </>
  );
}

function CategoryItemsFieldArray({
  control,
  register,
  index,
}: {
  control: Control<QuotationForm>;
  register: UseFormRegister<QuotationForm>;
  index: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `category.${index}.category_items`,
  });

  const { watch } = useFormContext();
  const itemValues = watch(`category.${index}.category_items`);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="w-8">No</TableHead>
            <TableHead>품명</TableHead>
            <TableHead className="w-32">수량</TableHead>
            <TableHead className="w-32">단가</TableHead>
            <TableHead className="w-32">금액</TableHead>
            <TableHead className="w-8">삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, itemIndex) => (
            <TableRow key={item.id}>
              <TableCell>{itemIndex + 1}</TableCell>
              <TableCell>
                <Input
                  placeholder="품명"
                  {...register(`category.${index}.category_items.${itemIndex}.description`)}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="수량"
                  type="number"
                  {...register(`category.${index}.category_items.${itemIndex}.quantity`)}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="단가"
                  type="number"
                  {...register(`category.${index}.category_items.${itemIndex}.unit_price`)}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="금액"
                  value={itemValues[itemIndex].unit_price * itemValues[itemIndex].quantity}
                  disabled
                />
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => remove(itemIndex)}
                >
                  <Trash2 size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="h-8 w-8"
          onClick={() => append({ description: "", quantity: 0, unit_price: 0 })}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

function CopyTextButton({ children }: PropsWithChildren) {
  async function handleCopy(e: MouseEvent) {
    const content = e.currentTarget.textContent;
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        toast({
          description: "클립보드에 복사했습니다. 붙여넣기로 사용해주세요",
          duration: 1000,
        });
      } catch {
        toast({
          variant: "destructive",
          description: "복사에 실패했습니다.",
          duration: 1000,
        });
      }
    }
  }
  return (
    <Button variant="secondary" type="button" onClick={handleCopy}>
      {children}
    </Button>
  );
}
