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
      <DialogContent className="sm:max-w-[425px] bg-white border-none max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Thêm nhóm khách hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="CustomerTypeName">Tên nhóm khách hàng</Label>
            <Input
              id="CustomerTypeName"
              name="CustomerTypeName"
              value={formData.CustomerTypeName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600 rounded-none"
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
                className="border-slate-200 focus:ring-blue-600 rounded-none"
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
                className="border-slate-200 focus:ring-blue-600 rounded-none"
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
              className="border-slate-200 focus:ring-blue-600 rounded-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-none"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
