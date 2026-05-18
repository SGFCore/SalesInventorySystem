import React, { useState, useEffect } from "react";
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
import type { ShipCompany } from "@/lib/types";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comp: ShipCompany | null;
}

export function EditCompDialog({ open, onOpenChange, comp }: EditProps) {
  const [formData, setFormData] = useState({
    shipCompanyName: "",
    supportedRegion: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (comp) {
      setFormData({
        shipCompanyName: comp.ShipCompanyName,
        supportedRegion: comp.SupportedRegion,
        phone: comp.Phone,
        email: comp.Email,
        address: comp.Address,
        notes: comp.Notes || "",
      });
    }
  }, [comp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.shipCompanyName || !formData.phone || !formData.email) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }
    console.log("Cập nhật đối tác:", formData);
    // Xử lý logic lưu dữ liệu tại đây
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Cập nhật đối tác vận chuyển
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-shipCompanyName">
              Tên công ty <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-shipCompanyName"
              name="shipCompanyName"
              value={formData.shipCompanyName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-supportedRegion">Khu vực hỗ trợ</Label>
            <Input
              id="edit-supportedRegion"
              name="supportedRegion"
              value={formData.supportedRegion}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-address">Địa chỉ</Label>
            <Input
              id="edit-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-notes">Ghi chú</Label>
            <Input
              id="edit-notes"
              name="notes"
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
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
