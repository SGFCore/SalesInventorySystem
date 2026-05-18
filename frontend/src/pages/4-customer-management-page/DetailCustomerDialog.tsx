import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export function DetailCustomerDialog({ open, onOpenChange, customer }: Props) {
  if (!customer) return null;

  const renderValue = (val: any) =>
    val || <span className="text-slate-400">(Không có)</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Thông tin khách hàng
          </DialogTitle>
        </DialogHeader>
        <div className={dialog.body}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã khách hàng</Label>
              <p className="font-medium">{customer.CustomerID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Loại khách hàng</Label>
              <p className="font-medium">{customer.CustomerTypeID}</p>
            </div>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Họ và Tên</Label>
            <p className="font-medium text-lg">
              {customer.FirstName} {customer.LastName}
            </p>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Tên công ty</Label>
            <p className="font-medium">{renderValue(customer.CompanyName)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Điện thoại</Label>
              <p className="font-medium text-blue-600">
                {renderValue(customer.Phone)}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Email</Label>
              <p className="font-medium">{renderValue(customer.Email)}</p>
            </div>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Địa chỉ</Label>
            <p className="font-medium">{renderValue(customer.Address)}</p>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Tổng chi tiêu</Label>
            <p className="font-medium text-green-600">
              {customer.TotalAccumulatedSpent.toLocaleString()} VNĐ
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
