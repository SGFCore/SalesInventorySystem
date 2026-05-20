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
import type { Customertype } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

type CustomerTypeFormData = Omit<Customertype, "id">;

const INITIAL_FORM_DATA: CustomerTypeFormData = {
  customertypename: "",
  discount: 0,
  detail: "",
  spendinglimit: 0,
};

export function NewCustomerTypeDialog({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<CustomerTypeFormData>(INITIAL_FORM_DATA);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.customertypename.trim()) {
      toast.error("Vui lòng nhập tên nhóm khách hàng!");
      return;
    }

    setLoading(true);

    try {
      const typeId = Math.floor(Math.random() * 9000) + 1000;

      await api.customerTypes.create({
        id: typeId,
        customertypename: formData.customertypename.trim(),
        discount: formData.discount,
        spendinglimit: formData.spendinglimit,
        detail: formData.detail.trim(),
      });

      toast.success("Tạo nhóm khách hàng thành công!");

      setFormData(INITIAL_FORM_DATA);

      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error?.message || "Tạo nhóm khách hàng thất bại!");
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
            <Label htmlFor="customertypename">Tên nhóm khách hàng</Label>

            <Input
              id="customertypename"
              name="customertypename"
              value={formData.customertypename}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="discount">Chiết khấu (%)</Label>

              <Input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="spendinglimit">Hạn mức chi tiêu (VNĐ)</Label>

              <Input
                id="spendinglimit"
                name="spendinglimit"
                type="number"
                value={formData.spendinglimit}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="detail">Mô tả / Chi tiết quyền lợi</Label>

            <Input
              id="detail"
              name="detail"
              value={formData.detail}
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
