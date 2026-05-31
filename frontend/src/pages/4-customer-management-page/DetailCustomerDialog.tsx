import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Customer, Customertype } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export function DetailCustomerDialog({ open, onOpenChange, customer }: Props) {
  const [customerTypes, setCustomerTypes] = useState<Customertype[]>([]);

  useEffect(() => {
    if (open) {
      loadCustomerTypes();
    }
  }, [open]);

  const loadCustomerTypes = async () => {
    try {
      const data = await api.customerTypes.list();
      setCustomerTypes(data);
    } catch (e) {
      console.error("Lỗi tải danh sách loại khách hàng", e);
    }
  };

  if (!customer) return null;

  const renderValue = (val: any) =>
    val || <span className="text-slate-400">(Không có)</span>;

  const typeName = customerTypes.find(t => t.id === customer.customertypeId)?.customertypename || customer.customertypeId;

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
              <p className="font-medium">{customer.id}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Nhóm khách hàng</Label>
              <p className="font-medium text-blue-600">{typeName}</p>
            </div>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Họ và Tên</Label>
            <p className="font-medium text-lg">
              {customer.firstname} {customer.lastname}
            </p>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Tên công ty</Label>
            <p className="font-medium">{renderValue(customer.companyname)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Điện thoại</Label>
              <p className="font-medium text-blue-600">
                {renderValue(customer.phone)}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Email</Label>
              <p className="font-medium">{renderValue(customer.email)}</p>
            </div>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Địa chỉ</Label>
            <p className="font-medium">{renderValue(customer.address)}</p>
          </div>
          <div>
            <Label className="text-slate-500 text-xs">Tổng chi tiêu</Label>
            <p className="font-medium text-green-600">
              {customer.totalaccumulatedspent.toLocaleString()} VNĐ
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
