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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCustomerTypeDialog({ open, onOpenChange }: Props) {
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

  const handleSubmit = () => {
    console.log("Dữ liệu nhóm khách hàng gửi đi:", formData);
    onOpenChange(false);
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
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
           
            onClick={() => onOpenChange(false)}
          >
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
