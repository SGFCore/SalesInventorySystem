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
  saleChannelCode?: number;
}

export function EditOrderDialog({ open, onOpenChange, order, onSave, saleChannelCode }: EditProps) {
  const [formData, setFormData] = useState<Partial<Order>>({});
  const [loading, setLoading] = useState(false);

  // Cập nhật state khi prop order thay đổi
  useEffect(() => {
    if (order) {
      setFormData({
        orderstatus: order.orderstatus,
        shippingstatus: order.shippingstatus,
        shipcode: order.shipcode,
        shipmentnote: order.shipmentnote,
      });
    }
  }, [order]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.orders.update(order.id, {
        ...order,
        ...formData,
      });
      toast.success(`Đã cập nhật Đơn Hàng #${order.id} thành công!`);
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
            Cập nhật Đơn Hàng #{order?.id}
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs text-slate-500 font-medium">
                Trạng thái Đơn hàng
              </Label>
              <NativeSelect
                value={formData.orderstatus?.toString() || "0"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    orderstatus: Number(e.target.value),
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

            {saleChannelCode !== 0 && (
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500 font-medium">
                  Trạng thái Giao vận
                </Label>
                <NativeSelect
                  value={formData.shippingstatus?.toString() || "0"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shippingstatus: Number(e.target.value),
                    })
                  }
                  className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                  disabled={loading}
                >
                  <option value="0">Cần lên lịch giao</option>
                  <option value="1">Đang đóng gói</option>
                  <option value="2">Đã gửi vận chuyển</option>
                  <option value="4">Đã đóng gói</option>
                  <option value="3">Khách từ chối</option>
                </NativeSelect>
              </div>
            )}
          </div>

          {saleChannelCode !== 0 && (
            <>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500 font-medium">
                  Mã Vận Đơn (Ship Code)
                </Label>
                <Input
                  placeholder="Nhập mã vận đơn..."
                  value={formData.shipcode || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, shipcode: e.target.value })
                  }
                  className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-xs text-slate-500 font-medium">Ghi chú vận chuyển</Label>
                <Input
                  placeholder="Ghi chú..."
                  value={formData.shipmentnote || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, shipmentnote: e.target.value })
                  }
                  className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                  disabled={loading}
                />
              </div>
            </>
          )}
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
