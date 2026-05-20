import React, { useState, useEffect } from "react";
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
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Product, CustomerType } from "@/lib/types";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewDiscountDialog({ open, onOpenChange, onSave }: NewProps) {
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
          if (prods.length > 0) {
            setAppliedProductID(prods[0].ProductID.toString());
          }
          if (custTypes.length > 0) {
            setCustomerTypeID(custTypes[0].CustomerTypeID);
          }
        } catch (e) {
          console.error("Lỗi tải thông tin lựa chọn:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

  const handleSubmit = async () => {
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
      const discountId = Math.floor(Math.random() * 9000) + 1000;
      await api.discounts.create({
        id: discountId,
        discountname: discountName,
        value: value,
        customertypeId: customerTypeID,
        appliedproductids: appliedProductID,
        detail: detail,
        status: status,
        startdate: new Date(startDate).toISOString(),
        expirydate: new Date(expiryDate).toISOString(),
      });

      toast.success("Tạo mới chương trình khuyến mãi thành công!");
      // Reset Form
      setDiscountName("");
      setValue(0);
      setDetail("");
      setStatus(0);
      setStartDate("");
      setExpiryDate("");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Tạo mới khuyến mãi thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[480px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo mới chương trình khuyến mãi
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          {/* Tên khuyến mãi */}
          <div className="grid gap-1.5">
            <Label htmlFor="new-name">
              Tên khuyến mãi <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-name"
              value={discountName}
              onChange={(e) => setDiscountName(e.target.value)}
              placeholder="Nhập tên chương trình..."
              className={dialog.input}
              disabled={loading}
            />
          </div>

          {/* Sản phẩm áp dụng */}
          <div className="grid gap-1.5">
            <Label htmlFor="new-product">
              Sản phẩm áp dụng <span className="text-red-500">*</span>
            </Label>
            <NativeSelect
              id="new-product"
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
              <Label htmlFor="new-value">
                Mức giảm giá (đ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-value"
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
              <Label htmlFor="new-cust-type">Đối tượng áp dụng</Label>
              <NativeSelect
                id="new-cust-type"
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
              <Label htmlFor="new-start-date">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-slate-700 h-9"
                disabled={loading}
              />
            </div>

            {/* Ngày hết hạn */}
            <div className="grid gap-1.5">
              <Label htmlFor="new-expiry-date">
                Ngày hết hạn <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-expiry-date"
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
            <Label htmlFor="new-status">Trạng thái ban đầu</Label>
            <NativeSelect
              id="new-status"
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
            <Label htmlFor="new-detail">Chi tiết chương trình</Label>
            <Input
              id="new-detail"
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
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
