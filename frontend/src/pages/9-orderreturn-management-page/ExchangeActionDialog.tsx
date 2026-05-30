import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, dialog, input } from "@/pages/page-classes";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { OrderDetail, Product } from "@/lib/types";

import { useEmp } from "@/context/empContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: OrderDetail;
  orderId: number;
  onSuccess: () => void;
}

export function ExchangeActionDialog({ open, onOpenChange, detail, orderId, onSuccess }: Props) {
  const { emp } = useEmp();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!emp) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      return;
    }
    setLoading(true);
    try {
      await api.sales.exchange({
        orderId,
        oldProductId: detail.ProductID,
        newProductId: detail.ProductID, // 1 đổi 1 cùng mã SKU
        quantity,
        employeeId: emp.EmployeeID
      });
      toast.success("Xử lý đổi hàng thành công (1 đổi 1)");
      onSuccess();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || e.message || "Lỗi khi đổi hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Xử lý đổi hàng (1 đổi 1)
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm font-medium">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Sản phẩm đổi trả:</span>
              <span className="text-slate-900 font-bold">Mã SP #{detail.ProductID}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Đơn giá:</span>
              <span className="text-slate-900">{(detail.UnitPrice || 0).toLocaleString("vi-VN")} đ</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-blue-600 font-bold italic">Hình thức: 1 đổi 1 cùng mã SKU</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label className="text-xs font-semibold text-slate-500">Số lượng đổi <span className="text-red-500">*</span></Label>
            <Input 
              type="number" 
              min={1} 
              max={detail.Quantity} 
              value={quantity} 
              onChange={e => setQuantity(Number(e.target.value))}
              className={cn(input.base, "h-10")}
            />
            <p className="text-[10px] text-slate-400 italic">Tối đa cho phép: {detail.Quantity} sản phẩm</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Lưu ý:</strong> Chế độ đổi hàng 1-to-1 không phát sinh giao dịch tài chính. Hệ thống sẽ tự động trừ kho sản phẩm mới và nhập kho sản phẩm cũ.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className={btn.secondary}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={loading} className={btn.primary}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Xác nhận đổi hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
