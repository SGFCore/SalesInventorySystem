import React, { useEffect, useState } from "react";
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
import type { Discount } from "@/lib/types";
import { MOCK_PRODUCTS } from "./DiscountManagementPage";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount: Discount | null;
}

export function EditDiscountDialog({
  open,
  onOpenChange,
  discount,
}: EditProps) {
  const [discountName, setDiscountName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [customerTypeID, setCustomerTypeID] = useState<number>(1);
  const [appliedProductID, setAppliedProductID] = useState<string>("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    if (discount) {
      setDiscountName(discount.DiscountName);
      setValue(discount.Value);
      setCustomerTypeID(discount.CustomerTypeID);
      setAppliedProductID(discount.AppliedProductID || "101");
      setDetail(discount.Detail);
      setStatus(discount.Status);
      setStartDate(discount.StartDate.toISOString().split("T")[0]);
      setExpiryDate(discount.ExpiryDate.toISOString().split("T")[0]);
    }
  }, [discount, open]);

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

    const updatedData = {
      DiscountID: discount?.DiscountID,
      DiscountName: discountName,
      Value: value,
      CustomerTypeID: customerTypeID,
      AppliedProductID: appliedProductID,
      Detail: detail,
      Status: status,
      StartDate: new Date(startDate),
      ExpiryDate: new Date(expiryDate),
    };

    console.log("Dữ liệu cập nhật khuyến mãi gửi đi:", updatedData);
    onOpenChange(false);
  };

  if (!discount) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
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
              className="border-slate-200 focus:ring-blue-600"
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
              className="border-slate-200 focus:ring-blue-600 text-sm h-9"
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
              <Label htmlFor="edit-value">
                Mức giảm giá (đ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder="Nhập số tiền giảm..."
                className="border-slate-200 focus:ring-blue-600"
              />
            </div>

            {/* Loại khách hàng áp dụng */}
            <div className="grid gap-1.5">
              <Label htmlFor="edit-cust-type">Đối tượng áp dụng</Label>
              <NativeSelect
                id="edit-cust-type"
                value={customerTypeID}
                onChange={(e) => setCustomerTypeID(Number(e.target.value))}
                className="border-slate-200 focus:ring-blue-600 text-sm h-9"
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
              <Label htmlFor="edit-start-date">
                Ngày bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-slate-200 focus:ring-blue-600 text-slate-700"
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
                className="border-slate-200 focus:ring-blue-600 text-slate-700"
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
              className="border-slate-200 focus:ring-blue-600 text-sm h-9"
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
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
