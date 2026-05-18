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
      <DialogContent className="sm:max-w-[425px] bg-white border-none max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Thêm chính sách mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="PolicyName">Tên chính sách</Label>
            <Input
              id="PolicyName"
              name="PolicyName"
              value={formData.PolicyName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600 rounded-none"
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
                className="border-slate-200 focus:ring-blue-600 rounded-none"
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
                className="border-slate-200 focus:ring-blue-600 rounded-none"
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
                className="border-slate-200 focus:ring-blue-600 rounded-none px-3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="IsActive">Trạng thái</Label>
              <select
                id="IsActive"
                name="IsActive"
                value={formData.IsActive}
                onChange={handleChange}
                className="flex h-10 w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            className="rounded-none border-slate-200"
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
