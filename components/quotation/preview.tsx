"use client";

import LogoMono from "@/assets/images/logo-mono.png";
import Stamp from "@/assets/images/stamp.jpg";
import { formatDate, formatPriceWithComma } from "@/lib/utils";
import { COMPANY_NAME, EMPLOYEES, QuotationForm } from "@/types/quotation";
import Image from "next/image";
import { numToKorean } from "num-to-korean";
import { Fragment, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import dayjs from "dayjs";

interface QuotationPreviewProps {
  data: QuotationForm;
  open: boolean;
  onClose: () => void;
}

export default function QuotationPreview({ data, open, onClose }: QuotationPreviewProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const {
    quot_no,
    ins_no,
    quotation_date,
    company_name,
    quotation_amount,
    payment_term,
    delivery_term,
    delivery_condition,
    price_valid,
    remarks: { tax, transportation },
    prepared,
    category,
    accessory,
  } = data;

  const handleClick = useReactToPrint({
    contentRef: printAreaRef,
    documentTitle: company_name
      ? `${company_name}_${dayjs(quotation_date).format("YYYYMMDD")}`
      : "견적서",
  });

  const emptyRowLength = 10 - (category?.flatMap((item) => item.category_items) || []).length;

  let totalPrice = 0;
  category?.forEach((category) => {
    category.category_items?.forEach((item) => {
      if (item.quantity && item.unit_price) {
        totalPrice += item.quantity * item.unit_price;
      }
    });
  });

  const resultPrice = quotation_amount || totalPrice || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="safe-center max-h-[80vh] w-full max-w-[240mm] overflow-auto bg-gray-50 [&>button]:hidden">
        <DialogHeader hidden>
          <DialogTitle hidden>견적서 미리보기</DialogTitle>
        </DialogHeader>
        <div className="mx-auto">
          <div className="rounded-lgp-3">
            <div className="mb-2 flex justify-end gap-1">
              <Button type="button" variant="outline" onClick={() => handleClick()}>
                인쇄 및 PDF 저장
              </Button>
              <Button type="button" onClick={() => onClose()}>
                닫기
              </Button>
            </div>
            <div
              className="mx-auto aspect-[1/1.414] max-w-[210mm] border bg-white p-6 text-[10pt]"
              ref={printAreaRef}
            >
              <div className="mb-4 flex items-end justify-between border-b border-black pb-4">
                <div>
                  <div className="mb-2 flex items-center gap-4">
                    <Image src={LogoMono} alt="한국유체기계" className="w-[180px]" />
                    <Image src={Stamp} alt="한국유체기계 도장" className="h-12 w-10" />
                  </div>
                  <div>
                    <ul>
                      <li>주&nbsp;&nbsp;&nbsp;&nbsp;소 : 부산시 동래구 충렬대로 296</li>
                      <li>전&nbsp;&nbsp;&nbsp;&nbsp;화 : (051)555-9681(대)</li>
                      <li>팩&nbsp;&nbsp;&nbsp;&nbsp;스 : (051)515-5842</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-[12pt] font-bold">MAIN PRODUCTS</div>
                  <div className="pl-[10pt]">
                    <ul>
                      <li>Roots Type Blower</li>
                      <li>Root Type Vacuum pump</li>
                      <li>Rotary Vane Compressor</li>
                      <li>TURBO Blower</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[18pt] font-medium">견 적 서</span>
                  <span className="mt-1 border-t border-black pt-1">Quotation Sheet</span>
                </div>
                {/* 견적서 상단부분 */}
                <div className="mb-3">
                  <div className="flex items-end justify-between gap-10">
                    <div className="grid w-[60%] gap-6">
                      <div className="flex">
                        <div className="flex flex-1 gap-2 border-b border-black">
                          <div className="w-[6em]">To Messer</div>
                          <div>{company_name || "회사이름"}</div>
                        </div>
                        <div className="w-[20%]">귀하</div>
                      </div>

                      <div className="flex">
                        <div className="flex flex-1 gap-2 border-b border-black">
                          <div className="w-[6em]">견적금액</div>
                          <div>
                            {numToKorean(resultPrice)}
                            <span className="ml-[1em]">원정</span>
                          </div>
                        </div>
                        <div className="w-[20%]">₩ {resultPrice?.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="grid w-[200px] gap-3">
                      <div className="flex flex-1 items-end gap-12 border-b border-black">
                        <div className="w-[5em]">
                          <span>견적번호</span>
                          <span>Quot Nc</span>
                        </div>
                        <div>{quot_no}</div>
                      </div>
                      <div className="flex flex-1 gap-12 border-b border-black">
                        <div className="w-[5em]">Date</div>
                        <div>{quotation_date && formatDate(quotation_date, "yyyy.MM.dd")}</div>
                      </div>
                      <div className="flex flex-1 gap-12 border-b border-black">
                        <div className="w-[5em]">Ins No.</div>
                        <div>{ins_no}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 견적서 테이블 */}
                <table className="print-table mb-4">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "120px" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <td>
                        순위
                        <br />
                        NO.
                      </td>
                      <td>
                        품명 및 규격
                        <br />
                        Description & Specitication
                      </td>
                      <td>
                        수량
                        <br />
                        Q&apos;ty
                      </td>
                      <td>
                        단 가<br />
                        Unit Price
                      </td>
                      <td>
                        금 액<br />
                        Amount
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((item, index) => (
                      <Fragment key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.category_name}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        {item.category_items?.map((sub_item, sub_index) => (
                          <tr key={sub_index}>
                            <td></td>
                            <td>{sub_item.description}</td>
                            <td>{sub_item.quantity == 0 ? null : sub_item.quantity}</td>
                            <td className="tr">{formatPriceWithComma(sub_item.unit_price || 0)}</td>
                            <td className="tr">
                              {formatPriceWithComma(
                                (sub_item.quantity || 0) * (sub_item.unit_price || 0),
                              )}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                    {Array.from({ length: emptyRowLength }).map((_, index) => (
                      <tr key={index}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      {quotation_amount ? (
                        <td colSpan={3}>NEGO : {formatPriceWithComma(quotation_amount || 0)}</td>
                      ) : (
                        <td colSpan={3}></td>
                      )}

                      <td className="tr">{formatPriceWithComma(totalPrice)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* 견적서 하단부분 */}
                <div className="flex justify-between">
                  <div className="grid w-[44%] gap-3">
                    <div className="flex items-end gap-1">
                      <div>1</div>
                      <div className="flex flex-1 items-end gap-2 border-b border-black">
                        <div className="w-[10em]">
                          <div>지불조건</div>
                          <div>Terms of Payment</div>
                        </div>
                        <div>{payment_term}</div>
                      </div>
                    </div>

                    <div className="flex items-end gap-1">
                      <div>2</div>
                      <div className="flex flex-1 items-end gap-2 border-b border-black">
                        <div className="w-[10em]">
                          <div>제작기간</div>
                          <div>Time Delivery</div>
                        </div>
                        <div>발주후{delivery_term}일(국내)</div>
                      </div>
                    </div>

                    <div className="flex items-end gap-1">
                      <div>3</div>
                      <div className="flex flex-1 items-end gap-2 border-b border-black">
                        <div className="w-[10em]">
                          <div>인도조건</div>
                          <div>Delivery Condition</div>
                        </div>
                        <div>{delivery_condition}</div>
                      </div>
                    </div>

                    <div className="flex items-end gap-1">
                      <div>4</div>
                      <div className="flex flex-1 items-end gap-2 border-b border-black">
                        <div className="w-[10em]">
                          <div>유효기간</div>
                          <div>Price Valid</div>
                        </div>
                        <div>견적후 {price_valid}일</div>
                      </div>
                    </div>

                    <div className="flex items-end gap-1">
                      <div>5</div>
                      <div className="flex flex-1 items-end gap-2 border-b border-black">
                        <div className="w-[10em]">
                          <div>참고사항</div>
                          <div>Remarks</div>
                        </div>
                        <div>
                          {tax && "부가세 별도"} / {transportation && "운송료 별도"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end gap-1">
                      <div>6</div>
                      <div className="flex flex-1 items-end gap-2 border-b border-black">
                        <div className="w-[10em]">
                          <div>작성자</div>
                          <div>Prepared</div>
                        </div>
                        <div>
                          {COMPANY_NAME} {prepared}{" "}
                          {EMPLOYEES.find((item) => item.name === prepared)?.title}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[52%]">
                    <div className="mb-2 text-center text-[14pt] font-medium">
                      STANDARD ACCESSORY
                    </div>
                    <ul className="acc-list flex flex-wrap justify-end gap-y-4">
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.suction_silence && "checked"}`}></span>
                        SUCTION SILENCER
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.safety_valve && "checked"}`}></span>
                        SAFETY VALVE
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span
                          className={`check ${accessory?.discharge_silencer && "checked"}`}
                        ></span>
                        DISCHARGE SILENCER
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.flexible_check && "checked"}`}></span>
                        FLEXIBLE CHECK
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.pulley && "checked"}`}></span>PULLEY
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.flexible_tube && "checked"}`}></span>
                        FLEXIBLE TUBE
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.belt && "checked"}`}></span>BELT
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.expansion_joint && "checked"}`}></span>
                        EXPANSION JOINT
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.belt_cover && "checked"}`}></span>BELT
                        COVER
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.check_valve && "checked"}`}></span>
                        CHECK VALVE
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.bed && "checked"}`}></span>BED
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.gauge && "checked"}`}></span>GAUGE
                      </li>
                      <li className="item-center flex w-[50%] gap-2 pr-1">
                        <span className={`check ${accessory?.bolt_nut && "checked"}`}></span>
                        BOLT/NUT
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
