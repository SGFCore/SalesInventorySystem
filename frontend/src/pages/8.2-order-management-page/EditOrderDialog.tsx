import React, { useState, useEffect } from "react";
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
import { NativeSelect } from "@/components/ui/native-select";
import type { Order } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onSave: () => void;
}

export function EditOrderDialog({ open, onOpenChange, order, onSave }: EditProps) {
  const [formData, setFormData] = useState<Partial<Order>>({});
  const [loading, setLoading] = useState(false);

  // Cập nhật state khi prop order thay đổi
  useEffect(() => {
    if (order) {
      setFormData({
        OrderStatus: order.OrderStatus,
        ShippingStatus: order.ShippingStatus,
        ShipCode: order.ShipCode,
        ShipmentNote: order.ShipmentNote,
      });
    }
  }, [order]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.orders.update(order.OrderID, {
        ...order,
        ...formData,
      });
      toast.success(`Đã cập nhật Đơn Hàng #${order.OrderID} thành công!`);
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Cập nhật đơn hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Cập nhật Đơn Hàng #{order?.OrderID}
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs text-slate-500 font-medium">
                Trạng thái Đơn hàng
              </Label>
              <NativeSelect
                value={formData.OrderStatus?.toString() || "0"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    OrderStatus: Number(e.target.value),
                  })
                }
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                disabled={loading}
              >
                <option value="0">Chờ xác nhận</option>
                <option value="1">Đã xác nhận</option>
                <option value="2">Đang giao</option>
                <option value="3">Giao thành công</option>
                <option value="4">Đã hủy</option>
                <option value="5">Đổi/trả</option>
              </NativeSelect>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs text-slate-500 font-medium">
                Trạng thái Giao vận
              </Label>
              <NativeSelect
                value={formData.ShippingStatus?.toString() || "0"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ShippingStatus: Number(e.target.value),
                  })
                }
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                disabled={loading}
              >
                <option value="0">Cần lên lịch giao</option>
                <option value="1">Đang đóng gói</option>
                <option value="2">Đã gửi vận chuyển</option>
                <option value="3">Khách từ chối</option>
              </NativeSelect>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-500 font-medium">
              Mã Vận Đơn (Ship Code)
            </Label>
            <Input
              placeholder="Nhập mã vận đơn..."
              value={formData.ShipCode || ""}
              onChange={(e) =>
                setFormData({ ...formData, ShipCode: e.target.value })
              }
              className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-slate-500 font-medium">Ghi chú vận chuyển</Label>
            <Input
              placeholder="Ghi chú..."
              value={formData.ShipmentNote || ""}
              onChange={(e) =>
                setFormData({ ...formData, ShipmentNote: e.target.value })
              }
              className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
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
