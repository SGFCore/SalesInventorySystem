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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: OrderDetail;
  orderId: number;
  onSuccess: () => void;
}

export function ExchangeActionDialog({ open, onOpenChange, detail, orderId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductId, setNewProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [priceDiff, setPriceDiff] = useState(0);

  useEffect(() => {
    if (open) {
      loadProducts();
      setNewProductId("");
      setQuantity(1);
      setPriceDiff(0);
    }
  }, [open]);

  useEffect(() => {
    if (newProductId && products.length > 0) {
      const oldPrice = detail.UnitPrice || 0;
      const newProd = products.find(p => p.ProductID === Number(newProductId));
      const newPrice = newProd ? newProd.ProductPrice : 0;
      setPriceDiff((newPrice - oldPrice) * quantity);
    }
  }, [newProductId, quantity, detail.UnitPrice, products]);

  const loadProducts = async () => {
    try {
      const data = await api.products.list();
      setProducts(data.filter(p => p.ProductStatus === 1)); // Chỉ hiển thị SP đang kinh doanh
    } catch (e) {
      toast.error("Không thể tải danh sách sản phẩm");
    }
  };

  const handleSubmit = async () => {
    if (!newProductId) {
      toast.error("Vui lòng chọn sản phẩm mới để đổi");
      return;
    }
    setLoading(true);
    try {
      await api.sales.exchange({
        orderId,
        oldProductId: detail.ProductID,
        newProductId: Number(newProductId),
        quantity
      });
      toast.success("Xử lý đổi hàng thành công");
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
            Xử lý đổi hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
            <Label className="text-xs font-semibold text-slate-500">Sản phẩm khách trả</Label>
            <p className="font-bold text-slate-900 mt-1">Mã SP: #{detail.ProductID}</p>
            <p className="text-xs text-slate-500 mt-1">Đơn giá: {(detail.UnitPrice || 0).toLocaleString("vi-VN")} đ</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Label className="text-xs font-semibold text-slate-500">Chọn sản phẩm mới <span className="text-red-500">*</span></Label>
              <NativeSelect
                value={newProductId}
                onChange={(e) => setNewProductId(e.target.value)}
                className="mt-1"
              >
                <option value="" disabled>-- Tìm hoặc chọn SP --</option>
                {products.map(p => (
                  <option key={p.ProductID} value={p.ProductID}>
                    #{p.ProductID} - {p.ProductName} ({(p.ProductPrice || 0).toLocaleString("vi-VN")} đ)
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-500">Số lượng</Label>
              <Input 
                type="number" 
                min={1} 
                max={detail.Quantity} 
                value={quantity} 
                onChange={e => setQuantity(Number(e.target.value))}
                className={cn(input.base, "mt-1")}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-1 flex justify-between items-center">
            <Label className="text-sm font-semibold text-slate-700">Chênh lệch tài chính:</Label>
            <div className="text-right">
              {priceDiff > 0 ? (
                <span className="font-bold text-red-600">Khách cần bù: {priceDiff.toLocaleString("vi-VN")} đ</span>
              ) : priceDiff < 0 ? (
                <span className="font-bold text-green-600">Hoàn lại khách: {Math.abs(priceDiff).toLocaleString("vi-VN")} đ</span>
              ) : (
                <span className="font-bold text-slate-500">Đổi ngang giá (0 đ)</span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className={btn.secondary}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={loading || !newProductId} className={btn.primary}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Xác nhận đổi hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
