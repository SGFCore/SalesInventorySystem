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

export function NewPolicyDialog({ open, onOpenChange, onSave }: Props) {
  const [formData, setFormData] = useState({
    PolicyName: "",
    MaxReturnDays: "",
    PenaltyFeeRate: "",
    EffectiveDate: "",
    IsActive: "1",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.PolicyName.trim()) {
      toast.error("Vui lòng điền tên chính sách!");
      return;
    }

    setLoading(true);
    try {
      await api.returnPolicies.create({
        PolicyName: formData.PolicyName,
        MaxReturnDays: Number(formData.MaxReturnDays) || 7,
        PenaltyFeeRate: (Number(formData.PenaltyFeeRate) || 0) / 100, // Convert percentage to fraction
        EffectiveDate: formData.EffectiveDate
          ? new Date(formData.EffectiveDate).toISOString()
          : new Date().toISOString(),
        IsActive: Number(formData.IsActive),
      });

      toast.success("Tạo chính sách đổi trả thành công!");
      // Reset form
      setFormData({
        PolicyName: "",
        MaxReturnDays: "",
        PenaltyFeeRate: "",
        EffectiveDate: "",
        IsActive: "1",
      });
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo chính sách thất bại!");
    } finally {
      setLoading(false);
    }
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
            <Label htmlFor="PolicyName" className="font-semibold text-slate-700">Tên chính sách</Label>
            <Input
              id="PolicyName"
              name="PolicyName"
              value={formData.PolicyName}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
              placeholder="VD: Chính sách mùa hè..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="MaxReturnDays" className="font-semibold text-slate-700">Số ngày đổi tối đa</Label>
              <Input
                id="MaxReturnDays"
                name="MaxReturnDays"
                type="number"
                value={formData.MaxReturnDays}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
                placeholder="VD: 7"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="PenaltyFeeRate" className="font-semibold text-slate-700">Phí phạt (%)</Label>
              <Input
                id="PenaltyFeeRate"
                name="PenaltyFeeRate"
                type="number"
                value={formData.PenaltyFeeRate}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
                placeholder="VD: 10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="EffectiveDate" className="font-semibold text-slate-700">Ngày hiệu lực</Label>
              <Input
                id="EffectiveDate"
                name="EffectiveDate"
                type="date"
                value={formData.EffectiveDate}
                onChange={handleChange}
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-3 h-10 rounded-md"
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="IsActive" className="font-semibold text-slate-700">Trạng thái</Label>
              <select
                id="IsActive"
                name="IsActive"
                value={formData.IsActive}
                onChange={handleChange}
                className="flex h-10 w-full border border-slate-200 rounded-md bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                disabled={loading}
              >
                <option value="1">Đang hoạt động</option>
                <option value="0">Tạm dừng</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200"
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
            {loading ? "Đang lưu..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
