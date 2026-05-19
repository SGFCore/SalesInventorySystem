import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { ReturnPolicy } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";
import React from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: ReturnPolicy | null;
}

export function DetailPolicyDialog({ open, onOpenChange, policy }: Props) {
  if (!policy) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Thông tin chi tiết chính sách đổi trả
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs font-semibold">Mã chính sách</Label>
              <p className="font-semibold text-slate-800">#{policy.PolicyID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs font-semibold">Trạng thái</Label>
              <p
                className={cn(
                  "font-bold text-sm mt-0.5",
                  policy.IsActive === 1 ? "text-green-600" : "text-slate-400",
                )}
              >
                {policy.IsActive === 1 ? "Đang hoạt động" : "Tạm dừng"}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs font-semibold">Tên chính sách</Label>
            <p className="font-bold text-base text-slate-900 mt-0.5">
              {policy.PolicyName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs font-semibold">
                Số ngày đổi trả tối đa
              </Label>
              <p className="font-bold text-blue-600 text-base mt-0.5">
                {policy.MaxReturnDays} ngày
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs font-semibold">
                Tỷ lệ phí phạt đổi trả
              </Label>
              <p className="font-bold text-red-600 text-base mt-0.5">
                {policy.PenaltyFeeRate * 100}%
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs font-semibold">Ngày có hiệu lực</Label>
            <p className="font-semibold text-slate-700 bg-slate-50 p-3 border border-slate-100 text-sm mt-1 rounded-md">
              {new Date(policy.EffectiveDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            className={btn.primary}
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
