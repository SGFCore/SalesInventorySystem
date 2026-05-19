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
              <Label className="text-slate-500 text-xs">Mã chính sách</Label>
              <p className="font-medium">{policy.PolicyID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Trạng thái</Label>
              <p
                className={cn(
                  "font-medium text-base",
                  policy.IsActive === 1 ? "text-green-600" : "text-slate-400",
                )}
              >
                {policy.IsActive === 1 ? "Đang hoạt động" : "Tạm dừng"}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">Tên chính sách</Label>
            <p className="font-medium text-lg text-slate-900">
              {policy.PolicyName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">
                Số ngày đổi trả tối đa
              </Label>
              <p className="font-medium text-blue-600 text-lg">
                {policy.MaxReturnDays} ngày
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">
                Tỷ lệ phí phạt đổi trả
              </Label>
              <p className="font-medium text-red-600 text-lg">
                {policy.PenaltyFeeRate}%
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">Ngày có hiệu lực</Label>
            <p className="font-medium text-slate-700 bg-slate-50 p-3 border border-slate-100 text-sm">
              {policy.EffectiveDate.toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        <DialogFooter>
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
