import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import type { Discount, Product, CustomerType } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount: Discount | null;
  onSave: () => void;
}

export function EditDiscountDialog({
  open,
  onOpenChange,
  discount,
  onSave,
}: EditProps) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerTypes, setCustomerTypes] = useState<CustomerType[]>([]);

  const [discountName, setDiscountName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [customerTypeID, setCustomerTypeID] = useState<number>(1);
  const [appliedProductID, setAppliedProductID] = useState<string>("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        try {
          const [prods, custTypes] = await Promise.all([
            api.products.list(),
            api.customerTypes.list(),
          ]);
          setProducts(prods);
          setCustomerTypes(custTypes);
        } catch (e) {
          console.error("Lỗi tải thông tin lựa chọn:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

  useEffect(() => {
    if (discount) {
      setDiscountName(discount.DiscountName);
      setValue(discount.Value);
      setCustomerTypeID(discount.CustomerTypeID);
      setAppliedProductID(discount.AppliedProductID || "");
      setDetail(discount.Detail);
      setStatus(discount.Status);
      setStartDate(new Date(discount.StartDate).toISOString().split("T")[0]);
      setExpiryDate(new Date(discount.ExpiryDate).toISOString().split("T")[0]);
    }
  }, [discount, open]);

  const handleSubmit = async () => {
    if (!discount) return;
    if (!discountName.trim()) {
      toast.error("Vui lòng nhập tên chương trình khuyến mãi!");
      return;
    }
    if (value <= 0) {
      toast.error("Mức giá trị giảm phải lớn hơn 0 đ!");
      return;
    }
    if (!appliedProductID) {
      toast.error("Vui lòng chọn sản phẩm áp dụng!");
      return;
    }
    if (!startDate || !expiryDate) {
      toast.error("Vui lòng cấu hình đầy đủ ngày bắt đầu và ngày hết hạn!");
      return;
    }
    if (new Date(startDate) > new Date(expiryDate)) {
      toast.error("Ngày bắt đầu không được lớn hơn ngày hết hạn!");
      return;
    }

    setLoading(true);
    try {
      await api.discounts.update(discount.DiscountID, {
        ...discount,
        DiscountName: discountName,
        Value: value,
        CustomerTypeID: customerTypeID,
        AppliedProductID: appliedProductID,
        Detail: detail,
        Status: status,
        StartDate: new Date(startDate),
        ExpiryDate: new Date(expiryDate),
      });

      toast.success("Cập nhật khuyến mãi thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!discount) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[480px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật chương trình khuyến mãi
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          {/* Tên khuyến mãi */}
          <div className="grid gap-1.5">
            <Label htmlFor="edit-name">
              Tên khuyến mãi <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={discountName}
              onChange={(e) => setDiscountName(e.target.value)}
              placeholder="Nhập tên chương trình..."
              className={dialog.input}
              disabled={loading}
            />
          </div>

          {/* Sản phẩm áp dụng */}
          <div className="grid gap-1.5">
            <Label htmlFor="edit-product">
              Sản phẩm áp dụng <span className="text-red-500">*</span>
            </Label>
            <NativeSelect
              id="edit-product"
              value={appliedProductID}
              onChange={(e) => setAppliedProductID(e.target.value)}
              className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
              disabled={loading}
            >
              {products.map((prod) => (
                <option key={prod.ProductID} value={prod.ProductID.toString()}>
                  {prod.ProductName} (#{prod.ProductID})
                </option>
              ))}
            </NativeSelect>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Giá trị giảm */}
            <div className="grid gap-1.5">
              <Label htmlFor="edit-value">
                Mức giảm giá (đ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder="Nhập số tiền giảm..."
                className={dialog.input}
                disabled={loading}
              />
            </div>

            {/* Loại khách hàng áp dụng */}
            <div className="grid gap-1.5">
              <Label htmlFor="edit-cust-type">Đối tượng áp dụng</Label>
              <NativeSelect
                id="edit-cust-type"
                value={customerTypeID}
                onChange={(e) => setCustomerTypeID(Number(e.target.value))}
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                disabled={loading}
              >
                {customerTypes.map((t) => (
                  <option key={t.CustomerTypeID} value={t.CustomerTypeID}>
                    {t.CustomerTypeName}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Ngày bắt đầu */}
            <div className="grid gap-1.5">
              <Label htmlFor="edit-start-date">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-slate-700 h-9"
                disabled={loading}
              />
            </div>

            {/* Ngày hết hạn */}
            <div className="grid gap-1.5">
              <Label htmlFor="edit-expiry-date">
                Ngày hết hạn <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-expiry-date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-slate-700 h-9"
                disabled={loading}
              />
            </div>
          </div>

          {/* Trạng thái hoạt động */}
          <div className="grid gap-1.5">
            <Label htmlFor="edit-status">Trạng thái</Label>
            <NativeSelect
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
              disabled={loading}
            >
              <option value={0}>Chờ chạy</option>
              <option value={1}>Đang chạy</option>
              <option value={2}>Tạm dừng</option>
            </NativeSelect>
          </div>

          {/* Mô tả chi tiết */}
          <div className="grid gap-1.5">
            <Label htmlFor="edit-detail">Chi tiết chương trình</Label>
            <Input
              id="edit-detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Nhập ghi chú chi tiết hoặc điều kiện áp dụng..."
              className={dialog.input}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)} disabled={loading}>
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
