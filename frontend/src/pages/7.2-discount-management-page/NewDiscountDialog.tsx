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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { btn, dialog } from "@/pages/page-classes";
import { MOCK_PRODUCTS } from "./DiscountManagementPage";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewDiscountDialog({ open, onOpenChange }: NewProps) {
  const [discountName, setDiscountName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [customerTypeID, setCustomerTypeID] = useState<number>(1);
  const [appliedProductID, setAppliedProductID] = useState<string>("101");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = () => {
    if (!discountName.trim()) {
      alert("Vui lòng nhập tên chương trình khuyến mãi!");
      return;
    }
    if (value <= 0) {
      alert("Mức giá trị giảm phải lớn hơn 0 đ!");
      return;
    }
    if (!appliedProductID) {
      alert("Vui lòng chọn sản phẩm áp dụng!");
      return;
    }
    if (!startDate || !expiryDate) {
      alert("Vui lòng cấu hình đầy đủ ngày bắt đầu và ngày hết hạn!");
      return;
    }
    if (new Date(startDate) > new Date(expiryDate)) {
      alert("Ngày bắt đầu không được lớn hơn ngày hết hạn!");
      return;
    }

    const finalData = {
      DiscountName: discountName,
      Value: value,
      CustomerTypeID: customerTypeID,
      AppliedProductID: appliedProductID,
      Detail: detail,
      Status: status,
      StartDate: new Date(startDate),
      ExpiryDate: new Date(expiryDate),
    };

    console.log("Dữ liệu tạo khuyến mãi mới gửi đi:", finalData);

    // Reset Form
    setDiscountName("");
    setValue(0);
    setCustomerTypeID(1);
    setAppliedProductID("101");
    setDetail("");
    setStatus(0);
    setStartDate("");
    setExpiryDate("");
    onOpenChange(false);
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
            >
              {MOCK_PRODUCTS.map((prod) => (
                <option key={prod.ProductID} value={prod.ProductID.toString()}>
                  {prod.ProductName}
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
              >
                <option value={1}>Khách hàng Phổ thông</option>
                <option value={2}>Khách hàng Thân thiết</option>
                <option value={3}>Khách hàng VIP</option>
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
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-slate-700"
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
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-slate-700"
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
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
