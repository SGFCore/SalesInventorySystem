import React, { useState } from "react";
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

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCompDialog({ open, onOpenChange }: NewProps) {
  const [formData, setFormData] = useState({
    shipCompanyName: "",
    supportedRegion: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.shipCompanyName || !formData.phone || !formData.email) {
      alert("Vui lòng nhập đầy đủ các thông tin bắt buộc!");
      return;
    }
    console.log("Dữ liệu tạo mới gửi đi:", formData);
    // Xử lý tạo mới đối tác tại đây

    // Reset state về form trống sau khi thêm thành công
    setFormData({
      shipCompanyName: "",
      supportedRegion: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Thêm đối tác vận chuyển mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="new-shipCompanyName">
              Tên công ty <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-shipCompanyName"
              name="shipCompanyName"
              placeholder="Nhập tên đối tác vận chuyển..."
              value={formData.shipCompanyName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-supportedRegion">Khu vực hỗ trợ</Label>
            <Input
              id="new-supportedRegion"
              name="supportedRegion"
              placeholder="Ví dụ: Toàn quốc, Miền Nam..."
              value={formData.supportedRegion}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-phone"
              name="phone"
              placeholder="Nhập số điện thoại liên hệ..."
              value={formData.phone}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-address">Địa chỉ</Label>
            <Input
              id="new-address"
              name="address"
              placeholder="Số nhà, tên đường, quận/huyện..."
              value={formData.address}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-notes">Ghi chú</Label>
            <Input
              id="new-notes"
              name="notes"
              placeholder="Nhập thông tin lưu ý thêm nếu có..."
              value={formData.notes}
              onChange={handleChange}
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
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
