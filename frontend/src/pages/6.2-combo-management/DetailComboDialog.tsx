import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Combo, ComboDetail } from "@/lib/types";
import { dialog } from "@/pages/page-classes";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo: Combo | null;
}

// Mock data chi tiết sản phẩm thuộc combo tương ứng
const MOCK_COMBO_DETAILS: ComboDetail[] = [
  { ComboID: 501, ProductID: 201, Quantity: 2 },
  { ComboID: 501, ProductID: 202, Quantity: 1 },
  { ComboID: 502, ProductID: 203, Quantity: 5 },
];

export function DetailComboDialog({ open, onOpenChange, combo }: DetailProps) {
  if (!combo) return null;

  // Lọc lấy các sản phẩm thuộc combo hiện tại
  const details = MOCK_COMBO_DETAILS.filter((d) => d.ComboID === combo.ComboID);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết gói sản phẩm (Combo)
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Mã Combo</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {combo.ComboID}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Giá bán gốc combo</Label>
            <span className="col-span-2 font-bold text-blue-600">
              {combo.ComboPrice.toLocaleString("vi-VN")} đ
            </span>
          </div>

          {/* Danh sách sản phẩm thành phần bên trong Combo */}
          <div className="grid gap-2 mt-2">
            <Label className="text-slate-500">Sản phẩm trong gói</Label>
            <div className="border border-slate-100 rounded-md overflow-hidden">
              <Table>
                <TableBody>
                  {details.length > 0 ? (
                    details.map((item, idx) => (
                      <TableRow key={idx} className="border-b border-slate-50">
                        <TableCell className="py-2 text-xs font-medium text-slate-700">
                          Mã sản phẩm: #{item.ProductID}
                        </TableCell>
                        <TableCell className="py-2 text-xs text-right text-slate-600">
                          Số lượng:{" "}
                          <span className="font-bold">{item.Quantity}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="py-3 text-center text-xs text-slate-400">
                        Không có sản phẩm chi tiết mẫu cho combo này.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white w-24"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
