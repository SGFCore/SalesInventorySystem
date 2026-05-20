import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import type { Customertype } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerType: Customertype | null;
}

export function DetailCustomerTypeDialog({
  open,
  onOpenChange,
  customerType,
}: Props) {
  if (!customerType) return null;

  const renderValue = (val: any) =>
    val || <span className="text-slate-400">(Không có)</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Thông tin chi tiết nhóm khách hàng
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">
                Mã nhóm khách hàng
              </Label>
              <p className="font-medium">{customerType.id}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Mức chiết khấu</Label>
              <p className="font-medium text-blue-600 text-lg">
                {customerType.discount}%
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">
              Tên nhóm khách hàng
            </Label>
            <p className="font-medium text-lg">
              {customerType.customertypename}
            </p>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">
              Hạn mức chi tiêu yêu cầu
            </Label>
            <p className="font-medium text-green-600">
              {customerType.spendinglimit.toLocaleString()} VNĐ
            </p>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">
              Mô tả chi tiết quyền lợi
            </Label>
            <p className="font-medium text-slate-700 bg-slate-50 p-3 border border-slate-100 text-sm">
              {renderValue(customerType.detail)}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button className={btn.primary} onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
