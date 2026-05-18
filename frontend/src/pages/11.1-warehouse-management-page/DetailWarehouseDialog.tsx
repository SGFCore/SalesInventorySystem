import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Warehouse } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

export function DetailWarehouseDialog({
  open,
  onOpenChange,
  warehouse,
}: Props) {
  if (!warehouse) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border border-slate-200 rounded-none transition-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Thông tin chi tiết kho hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã kho hàng</Label>
              <p className="font-medium text-slate-900">
                {warehouse.WareHouseID}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Trạng thái</Label>
              <p
                className={cn(
                  "font-medium text-sm",
                  warehouse.Status === 1 ? "text-green-600" : "text-slate-400",
                )}
              >
                {warehouse.Status === 1 ? "Đang hoạt động" : "Tạm dừng"}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">Tên kho hàng</Label>
            <p className="font-medium text-lg text-slate-900">
              {warehouse.WareHouseName}
            </p>
          </div>

          <div>
            <Label className="text-slate-500 text-xs">Địa chỉ</Label>
            <p className="font-medium text-slate-700 bg-slate-50 p-3 border border-slate-100 text-sm">
              {warehouse.Address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">
                Số điện thoại liên hệ
              </Label>
              <p className="font-medium text-slate-900">
                {warehouse.ContactNumber}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Mã người quản lý</Label>
              <p className="font-medium text-slate-900">
                {warehouse.ManagerID}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Sức chứa tối đa</Label>
              <p className="font-medium text-blue-600 text-lg">
                {warehouse.Capacity.toLocaleString("vi-VN")} đơn vị
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">
                Loại hình kho hàng
              </Label>
              <p className="font-medium text-slate-700">
                {warehouse.WarehouseType === 1
                  ? "Kho tổng trung tâm"
                  : "Kho phân phối vệ tinh"}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-none transition-none"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
