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
import type { Shipcompany } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comp: Shipcompany | null;
  onSave: () => void;
}

export function EditCompDialog({ open, onOpenChange, comp, onSave }: EditProps) {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    if (!comp) return;
    if (!formData.shipCompanyName || !formData.phone || !formData.supportedRegion) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }
    setLoading(true);
    try {
      await api.shipCompanies.update(comp.ShipCompanyID, {
        ...comp,
        ShipCompanyName: formData.shipCompanyName,
        SupportedRegion: formData.supportedRegion,
        Phone: formData.phone,
        Email: formData.email,
        Address: formData.address,
        Notes: formData.notes,
      });

      toast.success("Cập nhật đối tác vận chuyển thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật đối tác vận chuyển
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="edit-shipCompanyName">
              Tên đối tác vận chuyển <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-shipCompanyName"
              name="shipCompanyName"
              value={formData.shipCompanyName}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-supportedRegion">
              Khu vực hỗ trợ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-supportedRegion"
              name="supportedRegion"
              value={formData.supportedRegion}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
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
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-address">Địa chỉ</Label>
            <Input
              id="edit-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-notes">Ghi chú</Label>
            <Input
              id="edit-notes"
              name="notes"
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
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
