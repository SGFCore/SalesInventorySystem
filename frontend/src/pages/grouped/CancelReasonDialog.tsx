import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";
import { useState } from "react";

interface CancelReasonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string) => void;
  title?: string;
  placeholder?: string;
}

export function CancelReasonDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Lý do hủy đơn hàng",
  placeholder = "Nhập lý do hủy tại đây...",
}: CancelReasonDialogProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="reason" className="text-sm font-medium text-slate-700">
              Lý do <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder={placeholder}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] border-slate-200 focus-visible:ring-blue-600"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={dialog.cancel}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className={btn.primary}
          >
            Xác nhận hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
