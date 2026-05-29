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
import { useState } from "react";
import { toast } from "sonner";
import type { OrderDetail } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: OrderDetail;
  orderId: number;
  onSuccess: () => void;
}

export function ReturnActionDialog({ open, onOpenChange, detail, orderId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [condition, setCondition] = useState("Còn mới");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Vui lòng nhập lý do trả hàng");
      return;
    }
    setLoading(true);
    try {
      await api.sales.return({
        orderId,
        reason,
        items: [{ productId: detail.ProductID, quantity, condition }]
      });
      toast.success("Đã tạo yêu cầu trả hàng thành công");
      onSuccess();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Lỗi khi trả hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[400px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Xử lý trả hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label className="text-xs font-semibold text-slate-500">Sản phẩm trả</Label>
            <p className="font-bold text-slate-900 mt-1">Mã SP: #{detail.ProductID}</p>
          </div>
          <div>
            <Label className="text-xs font-semibold text-slate-500">Số lượng trả (Tối đa {detail.Quantity})</Label>
            <Input 
              type="number" 
              min={1} 
              max={detail.Quantity} 
              value={quantity} 
              onChange={e => setQuantity(Number(e.target.value))}
              className={cn(input.base, "mt-1")}
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-slate-500">Tình trạng hàng hóa</Label>
            <NativeSelect
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-1"
            >
              <option value="Còn mới">Còn mới (Nhập lại kho bán)</option>
              <option value="Bị hỏng">Bị hỏng (Nhập kho lỗi)</option>
            </NativeSelect>
          </div>
          <div>
            <Label className="text-xs font-semibold text-slate-500">Lý do trả hàng <span className="text-red-500">*</span></Label>
            <Input 
              placeholder="VD: Không vừa size, khách đổi ý..." 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              className={cn(input.base, "mt-1")}
            />
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className={btn.secondary}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={loading || !reason.trim()} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Xác nhận trả hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
