import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { ShipCompany } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comp: ShipCompany | null;
}

export function DetailCompDialog({ open, onOpenChange, comp }: DetailProps) {
  if (!comp) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Chi tiết đối tác vận chuyển
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm border-t border-b border-slate-100 my-2">
          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="text-slate-500">Mã đối tác:</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {comp.ShipCompanyID}
            </span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="text-slate-500">Tên công ty:</Label>
            <span className="col-span-2 font-semibold text-slate-900">
              {comp.ShipCompanyName}
            </span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="text-slate-500">Khu vực hỗ trợ:</Label>
            <span className="col-span-2 text-slate-900">
              {comp.SupportedRegion}
            </span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="text-slate-500">Số điện thoại:</Label>
            <span className="col-span-2 text-slate-900">{comp.Phone}</span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="text-slate-500">Email:</Label>
            <span className="col-span-2 text-slate-900">{comp.Email}</span>
          </div>

          <div className="grid grid-cols-3 items-start gap-2">
            <Label className="text-slate-500 mt-0.5">Địa chỉ:</Label>
            <span className="col-span-2 text-slate-900 break-words">
              {comp.Address}
            </span>
          </div>

          <div className="grid grid-cols-3 items-start gap-2">
            <Label className="text-slate-500 mt-0.5">Ghi chú:</Label>
            <span className="col-span-2 text-slate-900 italic break-words">
              {comp.Notes || "Không có ghi chú"}
            </span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="text-slate-500">Trạng thái:</Label>
            <span
              className={cn(
                "col-span-2 font-bold",
                comp.Status === 1 ? "text-green-500" : "text-red-500",
              )}
            >
              {comp.Status === 1 ? "Đang hợp tác" : "Ngưng hợp tác"}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
