import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Shipcompany } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comp: Shipcompany | null;
}

export function DetailCompDialog({ open, onOpenChange, comp }: DetailProps) {
  if (!comp) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết đối tác vận chuyển
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm border-t border-b border-slate-100 my-2">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-slate-500">Mã đối tác:</Label>
            <span className="col-span-3 font-medium text-slate-900">
              {comp.ShipCompanyID}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-slate-500">Tên đối tác vận chuyển:</Label>
            <span className="col-span-3 font-semibold text-slate-900">
              {comp.ShipCompanyName}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-slate-500">Khu vực hỗ trợ:</Label>
            <span className="col-span-3 text-slate-900">
              {comp.SupportedRegion}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-slate-500">Số điện thoại:</Label>
            <span className="col-span-3 text-slate-900">{comp.Phone}</span>
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-slate-500">Email:</Label>
            <span className="col-span-3 text-slate-900">{comp.Email}</span>
          </div>

          <div className="grid grid-cols-4 items-start gap-2">
            <Label className="text-slate-500 mt-0.5">Địa chỉ:</Label>
            <span className="col-span-3 text-slate-900 break-words">
              {comp.Address}
            </span>
          </div>

          <div className="grid grid-cols-4 items-start gap-2">
            <Label className="text-slate-500 mt-0.5">Ghi chú:</Label>
            <span className="col-span-3 text-slate-900 italic break-words">
              {comp.Notes || "Không có ghi chú"}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-2">
            <Label className="text-slate-500">Trạng thái:</Label>
            <span
              className={cn(
                "col-span-3 font-bold",
                comp.Status === 1 ? "text-green-600" : "text-red-500",
              )}
            >
              {comp.Status === 1 ? "Đang hợp tác" : "Ngưng hợp tác"}
            </span>
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
