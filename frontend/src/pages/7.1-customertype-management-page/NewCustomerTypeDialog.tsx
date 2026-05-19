import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import React, { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewCustomerTypeDialog({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CustomerTypeName: "",
    Discount: "",
    SpendingLimit: "",
    Detail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.CustomerTypeName.trim()) {
      toast.error("Vui lòng nhập tên nhóm khách hàng!");
      return;
    }
    setLoading(true);
    try {
      const typeId = Math.floor(Math.random() * 9000) + 1000;
      await api.customerTypes.create({
        CustomerTypeID: typeId,
        CustomerTypeName: formData.CustomerTypeName,
        Discount: Number(formData.Discount) || 0,
        SpendingLimit: Number(formData.SpendingLimit) || 0,
        Detail: formData.Detail,
      });
      toast.success("Tạo nhóm khách hàng thành công!");
      setFormData({
        CustomerTypeName: "",
        Discount: "",
        SpendingLimit: "",
        Detail: "",
      });
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Tạo nhóm khách hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm nhóm khách hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="CustomerTypeName">Tên nhóm khách hàng</Label>
            <Input
              id="CustomerTypeName"
              name="CustomerTypeName"
              value={formData.CustomerTypeName}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Discount">Chiết khấu (%)</Label>
              <Input
                id="Discount"
                name="Discount"
                type="number"
                value={formData.Discount}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="SpendingLimit">Hạn mức chi tiêu (VNĐ)</Label>
              <Input
                id="SpendingLimit"
                name="SpendingLimit"
                type="number"
                value={formData.SpendingLimit}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Detail">Mô tả / Chi tiết quyền lợi</Label>
            <Input
              id="Detail"
              name="Detail"
              value={formData.Detail}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
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
