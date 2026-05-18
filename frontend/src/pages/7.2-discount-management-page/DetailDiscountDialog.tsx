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
import type { Discount } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import { MOCK_PRODUCTS } from "./DiscountManagementPage";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount: Discount | null;
}

export function DetailDiscountDialog({
  open,
  onOpenChange,
  discount,
}: DetailProps) {
  if (!discount) return null;

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Chờ chạy";
      case 1:
        return "Đang chạy";
      case 2:
        return "Tạm dừng";
      default:
        return "Không xác định";
    }
  };

  // Tìm thông tin sản phẩm dựa trên AppliedProductID mẫu
  const appliedProduct = MOCK_PRODUCTS.find(
    (p) => p.ProductID.toString() === discount.AppliedProductID,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết mã khuyến mãi
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Mã khuyến mãi</Label>
            <span className="col-span-2 font-medium text-slate-900">
              #{discount.DiscountID}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Tên chương trình</Label>
            <span className="col-span-2 font-bold text-slate-900">
              {discount.DiscountName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Sản phẩm áp dụng</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {appliedProduct ? appliedProduct.ProductName : "Không xác định"}{" "}
              (ID: {discount.AppliedProductID})
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Giá trị giảm</Label>
            <span className="col-span-2 font-bold text-blue-600">
              {discount.Value.toLocaleString("vi-VN")} đ
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Loại khách hàng</Label>
            <span className="col-span-2 text-slate-900">
              Mã phân loại: {discount.CustomerTypeID}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Ngày bắt đầu</Label>
            <span className="col-span-2 text-slate-900">
              {discount.StartDate.toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Ngày hết hạn</Label>
            <span className="col-span-2 text-slate-900">
              {discount.ExpiryDate.toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Trạng thái</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {getStatusLabel(discount.Status)}
            </span>
          </div>

          <div className="grid gap-1 items-start pt-1">
            <Label className="text-slate-500">Chi tiết ưu đãi</Label>
            <p className="text-slate-600 leading-relaxed text-xs p-3 bg-slate-50 rounded-md">
              {discount.Detail}
            </p>
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
