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
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewCompDialog({ open, onOpenChange, onSave }: NewProps) {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    if (!formData.shipCompanyName || !formData.phone || !formData.email) {
      toast.error("Vui lòng nhập đầy đủ các thông tin bắt buộc!");
      return;
    }
    setLoading(true);
    try {
      const shipCompanyId = Math.floor(Math.random() * 900000) + 100000;
      await api.shipCompanies.create({
        ShipCompanyID: shipCompanyId,
        ShipCompanyName: formData.shipCompanyName,
        SupportedRegion: formData.supportedRegion,
        Phone: formData.phone,
        Email: formData.email,
        Address: formData.address,
        Notes: formData.notes,
        Status: 1,
      });

      toast.success("Thêm đối tác vận chuyển mới thành công!");
      setFormData({
        shipCompanyName: "",
        supportedRegion: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
      });
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Thêm đối tác vận chuyển thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm đối tác vận chuyển mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
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
              className={dialog.input}
              disabled={loading}
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
              className={dialog.input}
              disabled={loading}
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
              className={dialog.input}
              disabled={loading}
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
              className={dialog.input}
              disabled={loading}
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
              className={dialog.input}
              disabled={loading}
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
