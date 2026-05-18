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
import type { ReturnPolicy } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: ReturnPolicy | null;
}

export function EditPolicyDialog({ open, onOpenChange, policy }: Props) {
  const [form, setForm] = useState<Partial<ReturnPolicy>>({});
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    if (policy) {
      setForm(policy);
      if (policy.EffectiveDate) {
        // Chuyển đổi Date sang định dạng YYYY-MM-DD cho thẻ input type="date"
        setDateString(policy.EffectiveDate.toISOString().split("T")[0]);
      }
    }
  }, [policy]);

  const handleSubmit = () => {
    const updatedData = {
      ...form,
      EffectiveDate: dateString ? new Date(dateString) : form.EffectiveDate,
    };
    console.log("Dữ liệu cập nhật chính sách gửi đi:", updatedData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white rounded-none border border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Cập nhật thông tin chính sách
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <div className="grid gap-1">
            <Label htmlFor="edit-policyName">Tên chính sách</Label>
            <Input
              id="edit-policyName"
              value={form.PolicyName || ""}
              onChange={(e) => setForm({ ...form, PolicyName: e.target.value })}
              className="focus:ring-blue-600 rounded-none border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="edit-maxReturnDays">Số ngày trả tối đa</Label>
              <Input
                id="edit-maxReturnDays"
                type="number"
                value={form.MaxReturnDays ?? ""}
                onChange={(e) =>
                  setForm({ ...form, MaxReturnDays: Number(e.target.value) })
                }
                className="focus:ring-blue-600 rounded-none border-slate-200"
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="edit-penaltyFee">Tỷ lệ phí phạt (%)</Label>
              <Input
                id="edit-penaltyFee"
                type="number"
                value={form.PenaltyFeeRate ?? ""}
                onChange={(e) =>
                  setForm({ ...form, PenaltyFeeRate: Number(e.target.value) })
                }
                className="focus:ring-blue-600 rounded-none border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="edit-effectiveDate">Ngày hiệu lực</Label>
              <Input
                id="edit-effectiveDate"
                type="date"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="focus:ring-blue-600 rounded-none border-slate-200 px-3"
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="edit-isActive">Trạng thái</Label>
              <select
                id="edit-isActive"
                value={form.IsActive ?? 1}
                onChange={(e) =>
                  setForm({ ...form, IsActive: Number(e.target.value) })
                }
                className="flex h-10 w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value={1}>Đang hoạt động</option>
                <option value={0}>Tạm dừng</option>
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
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
