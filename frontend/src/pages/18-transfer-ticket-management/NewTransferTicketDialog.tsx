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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, dialog, input } from "@/pages/page-classes";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import type { Warehouse, Product } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewTransferTicketDialog({ open, onOpenChange, onSave }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [sourceId, setSourceId] = useState("");
  const [destId, setDestId] = useState("");
  
  const [selectedProductId, setSelectedProductId] = useState("");
  const [reqQuantity, setReqQuantity] = useState(1);
  const [items, setItems] = useState<{product: Product, quantity: number}[]>([]);

  useEffect(() => {
    if (open) {
      loadData();
      setItems([]);
      setSelectedProductId("");
      setReqQuantity(1);
    }
  }, [open]);

  const loadData = async () => {
    try {
      const [whData, prodData] = await Promise.all([
        api.warehouses.list(),
        api.products.list()
      ]);
      setWarehouses(whData.filter(w => w.Status === 1));
      setProducts(prodData.filter(p => p.ProductStatus === 1));
      
      const whTotal = whData.find(w => w.WarehouseType === 1);
      if (whTotal) setSourceId(whTotal.WareHouseID.toString());
      
      const whStore = whData.find(w => w.WarehouseType === 2);
      if (whStore) setDestId(whStore.WareHouseID.toString());
      
    } catch (e) {
      toast.error("Lỗi tải thông tin cơ bản");
    }
  };

  const handleAddItem = () => {
    if (!selectedProductId) {
      toast.error("Vui lòng chọn sản phẩm");
      return;
    }
    const prod = products.find(p => p.ProductID === Number(selectedProductId));
    if (!prod) return;
    
    // Check exist
    const exist = items.find(i => i.product.ProductID === prod.ProductID);
    if (exist) {
      setItems(items.map(i => i.product.ProductID === prod.ProductID ? { ...i, quantity: i.quantity + reqQuantity } : i));
    } else {
      setItems([...items, { product: prod, quantity: reqQuantity }]);
    }
    
    setSelectedProductId("");
    setReqQuantity(1);
  };

  const handleRemoveItem = (prodId: number) => {
    setItems(items.filter(i => i.product.ProductID !== prodId));
  };

  const handleSubmit = async () => {
    if (!sourceId || !destId) {
      toast.error("Vui lòng chọn kho xuất và kho nhập");
      return;
    }
    if (items.length === 0) {
      toast.error("Vui lòng thêm ít nhất một sản phẩm");
      return;
    }
    
    setLoading(true);
    try {
      await api.sales.createTransferTicket({
        employeeId: user?.EmployeeID,
        sourceWarehouseId: Number(sourceId),
        destinationWarehouseId: Number(destId),
        items: items.map(i => ({
          productId: i.product.ProductID,
          quantity: i.quantity
        }))
      });
      toast.success("Tạo yêu cầu luân chuyển thành công!");
      onSave();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || e.message || "Lỗi tạo yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Tạo yêu cầu nhập hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-slate-500">Từ kho (Kho xuất)</Label>
              <NativeSelect value={sourceId} onChange={e => setSourceId(e.target.value)} className="mt-1">
                <option value="" disabled>-- Chọn --</option>
                {warehouses.filter(w => w.WarehouseType === 1).map(w => (
                  <option key={w.WareHouseID} value={w.WareHouseID}>{w.WareHouseName}</option>
                ))}
              </NativeSelect>
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-500">Đến kho (Kho nhập)</Label>
              <NativeSelect value={destId} onChange={e => setDestId(e.target.value)} className="mt-1">
                <option value="" disabled>-- Chọn --</option>
                {warehouses.filter(w => w.WarehouseType === 2).map(w => (
                  <option key={w.WareHouseID} value={w.WareHouseID}>{w.WareHouseName}</option>
                ))}
              </NativeSelect>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-md p-3 bg-slate-50">
            <Label className="text-sm font-bold text-slate-700">Thêm sản phẩm</Label>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <div className="col-span-7">
                <NativeSelect value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)}>
                  <option value="" disabled>-- Tìm hoặc chọn SP --</option>
                  {products.map(p => (
                    <option key={p.ProductID} value={p.ProductID}>#{p.ProductID} - {p.ProductName}</option>
                  ))}
                </NativeSelect>
              </div>
              <div className="col-span-3">
                <Input type="number" min={1} value={reqQuantity} onChange={e => setReqQuantity(Number(e.target.value))} />
              </div>
              <div className="col-span-2">
                <Button variant="outline" className="w-full bg-white" onClick={handleAddItem}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-[200px] overflow-y-auto border border-slate-200 rounded-md">
            <Table>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell className="text-center text-slate-400 py-4">Chưa có sản phẩm nào</TableCell></TableRow>
                ) : items.map((i, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-semibold text-sm">#{i.product.ProductID} - {i.product.ProductName}</TableCell>
                    <TableCell className="text-center font-bold text-blue-600 w-20">{i.quantity}</TableCell>
                    <TableCell className="w-10">
                      <Button variant="ghost" size="sm" className="text-red-500 p-0 h-6 w-6" onClick={() => handleRemoveItem(i.product.ProductID)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className={btn.secondary}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={loading || items.length === 0} className={btn.primary}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Gửi yêu cầu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
