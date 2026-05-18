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

export function NewPolicyDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({
    PolicyName: "",
    MaxReturnDays: "",
    PenaltyFeeRate: "",
    EffectiveDate: "",
    IsActive: "1",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      PolicyName: formData.PolicyName,
      MaxReturnDays: Number(formData.MaxReturnDays),
      PenaltyFeeRate: Number(formData.PenaltyFeeRate),
      EffectiveDate: formData.EffectiveDate
        ? new Date(formData.EffectiveDate)
        : new Date(),
      IsActive: Number(formData.IsActive),
    };
    console.log("Dữ liệu chính sách mới gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm chính sách mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="PolicyName">Tên chính sách</Label>
            <Input
              id="PolicyName"
              name="PolicyName"
              value={formData.PolicyName}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="MaxReturnDays">Số ngày đổi tối đa</Label>
              <Input
                id="MaxReturnDays"
                name="MaxReturnDays"
                type="number"
                value={formData.MaxReturnDays}
                onChange={handleChange}
                className={dialog.input}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="PenaltyFeeRate">Phí phạt (%)</Label>
              <Input
                id="PenaltyFeeRate"
                name="PenaltyFeeRate"
                type="number"
                value={formData.PenaltyFeeRate}
                onChange={handleChange}
                className={dialog.input}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="EffectiveDate">Ngày hiệu lực</Label>
              <Input
                id="EffectiveDate"
                name="EffectiveDate"
                type="date"
                value={formData.EffectiveDate}
                onChange={handleChange}
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="IsActive">Trạng thái</Label>
              <select
                id="IsActive"
                name="IsActive"
                value={formData.IsActive}
                onChange={handleChange}
                className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
              >
                <option value="1">Đang hoạt động</option>
                <option value="0">Tạm dừng</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-slate-200"
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
