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
import type { Discount, Product, CustomerType } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);

  useEffect(() => {
    if (open && discount) {
      const loadOptions = async () => {
        setLoading(true);
        try {
          const [prods, custTypes] = await Promise.all([
            api.products.list(),
            api.customerTypes.list(),
          ]);
          setProducts(prods);
          setCustomerTypes(custTypes);
        } catch (e) {
          console.error("Lỗi tải thông tin chi tiết:", e);
        } finally {
          setLoading(false);
        }
      };
      loadOptions();
    }
  }, [open, discount]);

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

  const getProductName = (idStr: string) => {
    const prod = products.find((p) => p.ProductID.toString() === idStr);
    return prod ? prod.ProductName : `Sản phẩm #${idStr}`;
  };

  const getCustomerTypeName = (id: number) => {
    const t = customerTypes.find((ct) => ct.CustomerTypeID === id);
    return t ? t.CustomerTypeName : `Đối tượng #${id}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết mã khuyến mãi
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10 bg-white">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải chi tiết...</span>
          </div>
        ) : (
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
                {getProductName(discount.AppliedProductID)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500">Giá trị giảm</Label>
              <span className="col-span-2 font-bold text-blue-600">
                {discount.Value.toLocaleString("vi-VN")} đ
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500">Đối tượng áp dụng</Label>
              <span className="col-span-2 text-slate-900 font-medium">
                {getCustomerTypeName(discount.CustomerTypeID)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500">Ngày bắt đầu</Label>
              <span className="col-span-2 text-slate-900">
                {new Date(discount.StartDate).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500">Ngày hết hạn</Label>
              <span className="col-span-2 text-slate-900">
                {new Date(discount.ExpiryDate).toLocaleDateString("vi-VN")}
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
        )}

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
