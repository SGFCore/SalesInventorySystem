import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Order, ReturnPolicy } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";

interface ReturnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

const MOCK_ORDER_PRODUCTS = [
  { ProductID: 201, ProductName: "Sản phẩm A", Quantity: 2, Price: 150000 },
  { ProductID: 202, ProductName: "Sản phẩm B", Quantity: 1, Price: 100000 },
];

const MOCK_POLICIES: ReturnPolicy[] = [
  {
    PolicyID: 1,
    PolicyName: "Chính sách đổi trả tiêu chuẩn hệ thống",
    MaxReturnDays: 7,
    PenaltyFeeRate: 0,
    EffectiveDate: new Date("2026-01-01"),
    IsActive: 1,
  },
  {
    PolicyID: 2,
    PolicyName: "Chính sách đổi trả hàng sự kiện / giảm giá",
    MaxReturnDays: 3,
    PenaltyFeeRate: 0.1,
    EffectiveDate: new Date("2026-01-01"),
    IsActive: 1,
  },
  {
    PolicyID: 3,
    PolicyName: "Chính sách cũ năm 2025",
    MaxReturnDays: 14,
    PenaltyFeeRate: 0.05,
    EffectiveDate: new Date("2025-01-01"),
    IsActive: 0,
  },
];

export function ReturnProductDialog({
  open,
  onOpenChange,
  order,
}: ReturnProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handleToggleProduct = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSubmit = () => {
    console.log(
      "Xử lý trả hàng cho đơn:",
      order.OrderID,
      "Các sản phẩm:",
      selectedProductIds,
    );
    onOpenChange(false);
  };

  const activePolicies = MOCK_POLICIES.filter((p) => p.IsActive === 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Yêu cầu Trả Hàng #{order?.OrderID}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm">
          <div className="font-medium text-slate-900 mb-1">
            Chọn sản phẩm khách muốn hoàn trả:
          </div>

          <div className="border border-slate-200 overflow-hidden">
            <Table>
              <TableBody>
                {MOCK_ORDER_PRODUCTS.map((item) => (
                  <TableRow
                    key={item.ProductID}
                    className="border-b border-slate-100"
                  >
                    <TableCell className="w-[40px] py-3 text-center">
                      <Checkbox
                        className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        checked={selectedProductIds.includes(item.ProductID)}
                        onCheckedChange={() =>
                          handleToggleProduct(item.ProductID)
                        }
                      />
                    </TableCell>
                    <TableCell className="py-3 text-xs font-medium text-slate-700">
                      {item.ProductName} (Mã: #{item.ProductID})
                    </TableCell>
                    <TableCell className="py-3 text-xs text-center text-slate-600">
                      Số lượng:{" "}
                      <span className="font-bold">{item.Quantity}</span>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-right text-slate-900 font-medium">
                      {item.Price.toLocaleString("vi-VN")} đ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Quy định chính sách đổi trả bằng Collapsible */}
          <Collapsible
            open={isPolicyOpen}
            onOpenChange={setIsPolicyOpen}
            className="border border-slate-200 mt-2"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full px-4 py-3 font-bold text-slate-900 text-xs bg-slate-50 hover:bg-slate-100 text-left"
              >
                <span>CHÍNH SÁCH ĐỔI TRẢ ÁP DỤNG</span>
                {isPolicyOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 bg-white border-t border-slate-200 text-xs text-slate-600 space-y-3">
              {activePolicies.map((policy) => (
                <div
                  key={policy.PolicyID}
                  className="border-b border-slate-100 pb-2 last:border-none last:pb-0"
                >
                  <div className="font-bold text-slate-800 mb-0.5">
                    {policy.PolicyName}
                  </div>
                  <div>
                    • Hạn đổi trả tối đa:{" "}
                    <span className="font-medium text-slate-900">
                      {policy.MaxReturnDays} ngày
                    </span>
                  </div>
                  <div>
                    • Tỷ lệ phí phạt hủy/đổi:{" "}
                    <span className="font-medium text-slate-900">
                      {policy.PenaltyFeeRate * 100}%
                    </span>
                  </div>
                  <div>
                    • Ngày hiệu lực công bố:{" "}
                    {policy.EffectiveDate.toLocaleDateString("vi-VN")}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
           
            onClick={() => onOpenChange(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={selectedProductIds.length === 0}
          >
            Xác nhận Trả hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
