import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRESSURE_TYPE_DATA, VACCUM_TYPE_DATA } from "@/data/diameter";

const PRESSURE_RANGE = Object.keys(PRESSURE_TYPE_DATA);

const VACCUM_RANGE = Object.keys(VACCUM_TYPE_DATA);

export default function CaculatorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const [pressureTypeData, setPressureTypeData] = useState<{
    pressure?: string;
    qs?: string;
  }>({
    pressure: "",
    qs: "",
  });

  const [vaccumTypeData, setVaccumTypeData] = useState<{
    pressure?: string;
    qd?: string;
  }>({
    pressure: "",
    qd: "",
  });

  const pressureFilterFilled = pressureTypeData.pressure && pressureTypeData.qs;
  const filteredByPressureData =
    pressureFilterFilled &&
    PRESSURE_TYPE_DATA[pressureTypeData.pressure as keyof typeof PRESSURE_TYPE_DATA].filter(
      (item) =>
        item.qs &&
        item.qs <= Number(pressureTypeData.qs) + 0.3 &&
        item.qs >= Number(pressureTypeData.qs) - 0.3,
    );

  const vaccumFilterdFilled = vaccumTypeData.pressure && vaccumTypeData.qd;
  const filteredByVaccumData =
    vaccumFilterdFilled &&
    VACCUM_TYPE_DATA[vaccumTypeData.pressure as keyof typeof VACCUM_TYPE_DATA].filter(
      (item) =>
        item.qd &&
        item.qd <= Number(vaccumTypeData.qd) + 2 &&
        item.qd >= Number(vaccumTypeData.qd) - 2,
    );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>블로워 선정기</DialogTitle>
          <DialogDescription>블로워 기종 선정을 도와줍니다.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="pressure">압송식</TabsTrigger>
            <TabsTrigger value="vaccum">진공식</TabsTrigger>
          </TabsList>
          <TabsContent value="pressure">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>
                  압력{" "}
                  <Unit>
                    kg/cm<sup>2</sup>
                  </Unit>
                </Label>
                <Select
                  value={pressureTypeData.pressure}
                  onValueChange={(value) =>
                    setPressureTypeData((prev) => ({ ...prev, pressure: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="압력을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESSURE_RANGE.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item} kg/cm<sup>2</sup>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="mb-2">
                  흡입풍량{" "}
                  <Unit>
                    m<sup>3</sup>/min
                  </Unit>
                </Label>
                <Input
                  value={pressureTypeData.qs}
                  placeholder="흡입풍량을 입력해주세요"
                  onChange={(e) => setPressureTypeData((prev) => ({ ...prev, qs: e.target.value }))}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      구경 <Unit>mm</Unit>
                    </TableHead>
                    <TableHead>
                      회전수 <Unit>rpm</Unit>
                    </TableHead>
                    <TableHead>
                      흡입풍량(Qs){" "}
                      <Unit>
                        m<sup>3</sup>/min
                      </Unit>
                    </TableHead>
                    <TableHead>
                      축동력(La) <Unit>kW</Unit>
                    </TableHead>
                    <TableHead>
                      추천 축동력 <Unit>kW</Unit>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pressureTypeData.pressure &&
                    pressureTypeData.qs &&
                    filteredByPressureData &&
                    filteredByPressureData.map((item) => (
                      <TableRow key={`${item.dia}-${item.rpm}-${item.qs}-${item.la}`}>
                        <TableCell>{item.dia}</TableCell>
                        <TableCell>{item.rpm}</TableCell>
                        <TableCell>{item.qs}</TableCell>
                        <TableCell>{item.la}</TableCell>
                        <TableCell>{item.la && item.la * 1.2}</TableCell>
                      </TableRow>
                    ))}
                  {pressureFilterFilled && filteredByPressureData?.length === 0 && (
                    <TableRow className="p-3 text-center text-sm text-muted-foreground">
                      <TableCell colSpan={4} className="p-6">
                        만족하는 데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                  {(!pressureTypeData.pressure || !pressureTypeData.qs) && (
                    <TableRow className="p-3 text-center text-sm text-muted-foreground">
                      <TableCell colSpan={5} className="p-6">
                        압력과 흡입풍량을 작성해주세요
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="vaccum">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>
                  압력{" "}
                  <Unit>
                    kg/cm<sup>2</sup>
                  </Unit>
                </Label>
                <Select
                  value={vaccumTypeData.pressure}
                  onValueChange={(value) =>
                    setVaccumTypeData((prev) => ({ ...prev, pressure: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="압력을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {VACCUM_RANGE.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item} mmAq
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="mb-2">
                  흡입풍량{" "}
                  <Unit>
                    m<sup>3</sup>/min
                  </Unit>
                </Label>
                <Input
                  value={vaccumTypeData.qd}
                  placeholder="흡입풍량을 입력해주세요"
                  onChange={(e) => setVaccumTypeData((prev) => ({ ...prev, qd: e.target.value }))}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      구경 <Unit>mm</Unit>
                    </TableHead>
                    <TableHead>
                      회전수 <Unit>rpm</Unit>
                    </TableHead>
                    <TableHead>
                      흡입풍량(Qd){" "}
                      <Unit>
                        m<sup>3</sup>/min
                      </Unit>
                    </TableHead>
                    <TableHead>
                      축동력(La) <Unit>kW</Unit>
                    </TableHead>
                    <TableHead>
                      추천 축동력 <Unit>kW</Unit>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccumTypeData.pressure &&
                    vaccumTypeData.qd &&
                    filteredByVaccumData &&
                    filteredByVaccumData.map((item) => (
                      <TableRow key={`${item.dia}-${item.rpm}-${item.qd}-${item.la}`}>
                        <TableCell>{item.dia}</TableCell>
                        <TableCell>{item.rpm}</TableCell>
                        <TableCell>{item.qd}</TableCell>
                        <TableCell>{item.la}</TableCell>
                        <TableCell>{item.la && item.la * 1.2}</TableCell>
                      </TableRow>
                    ))}
                  {vaccumFilterdFilled && filteredByVaccumData?.length === 0 && (
                    <TableRow className="p-3 text-center text-sm text-muted-foreground">
                      <TableCell colSpan={5} className="p-6">
                        만족하는 데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                  {(!vaccumTypeData.pressure || !vaccumTypeData.qd) && (
                    <TableRow className="p-3 text-center text-sm text-muted-foreground">
                      <TableCell colSpan={5} className="p-6">
                        압력과 흡입풍량을 작성해주세요
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export function Unit({ children }: PropsWithChildren) {
  return <span className="text-xs text-muted-foreground">{children}</span>;
}
