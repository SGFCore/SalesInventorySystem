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
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: ReturnPolicy;
  onSave: () => void;
}

export function EditPolicyDialog({ open, onOpenChange, policy, onSave }: Props) {
  const [form, setForm] = useState<Partial<ReturnPolicy>>({});
  const [dateString, setDateString] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (policy) {
      setForm(policy);
      if (policy.EffectiveDate) {
        const d = new Date(policy.EffectiveDate);
        if (!isNaN(d.getTime())) {
          setDateString(d.toISOString().split("T")[0]);
        }
      }
    }
  }, [policy]);

  const handleSubmit = async () => {
    if (!form.PolicyName?.trim()) {
      toast.error("Vui lòng nhập tên chính sách!");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        ...policy,
        ...form,
        EffectiveDate: dateString ? new Date(dateString) : new Date(policy.EffectiveDate),
        PenaltyFeeRate: form.PenaltyFeeRate !== undefined ? Number(form.PenaltyFeeRate) / 100 : policy.PenaltyFeeRate,
      };

      await api.returnPolicies.update(policy.PolicyID, updatedData);
      toast.success("Cập nhật chính sách thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Cập nhật chính sách thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật thông tin chính sách
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <div className="grid gap-1">
            <Label htmlFor="edit-policyName" className="font-semibold text-slate-700">Tên chính sách</Label>
            <Input
              id="edit-policyName"
              value={form.PolicyName || ""}
              onChange={(e) => setForm({ ...form, PolicyName: e.target.value })}
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="edit-maxReturnDays" className="font-semibold text-slate-700">Số ngày trả tối đa</Label>
              <Input
                id="edit-maxReturnDays"
                type="number"
                value={form.MaxReturnDays ?? ""}
                onChange={(e) =>
                  setForm({ ...form, MaxReturnDays: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                disabled={loading}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="edit-penaltyFee" className="font-semibold text-slate-700">Tỷ lệ phí phạt (%)</Label>
              <Input
                id="edit-penaltyFee"
                type="number"
                value={form.PenaltyFeeRate !== undefined ? Math.round(Number(form.PenaltyFeeRate) * 100) : ""}
                onChange={(e) =>
                  setForm({ ...form, PenaltyFeeRate: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="edit-effectiveDate" className="font-semibold text-slate-700">Ngày hiệu lực</Label>
              <Input
                id="edit-effectiveDate"
                type="date"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 px-3 h-10 rounded-md"
                disabled={loading}
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="edit-isActive" className="font-semibold text-slate-700">Trạng thái</Label>
              <select
                id="edit-isActive"
                value={form.IsActive ?? 1}
                onChange={(e) =>
                  setForm({ ...form, IsActive: Number(e.target.value) })
                }
                className="flex h-10 w-full border border-slate-200 rounded-md bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                disabled={loading}
              >
                <option value={1}>Đang hoạt động</option>
                <option value={0}>Tạm dừng</option>
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
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
