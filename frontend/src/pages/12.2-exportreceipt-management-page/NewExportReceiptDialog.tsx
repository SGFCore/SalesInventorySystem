import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import type { Shipcompany, ExtendedOrder } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dialog, btn } from "@/pages/page-classes";
import { Loader2, FileOutput, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  initialSelectedOrderIds: number[];
}

export function NewExportReceiptDialog({ open, onOpenChange, onSave, initialSelectedOrderIds }: Props) {
  const { emp } = useEmp();
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<ExtendedOrder[]>([]);
  const [shipCompany, setShipCompany] = useState<Shipcompany | null>(null);

  const loadSelection = async () => {
    setLoading(true);
    try {
      const [orderData, customerData, scData] = await Promise.all([
        api.orders.list(),
        api.customers.list(),
        api.shipCompanies.list()
      ]);

      const customerMap = new Map(customerData.map(c => [c.id, c]));
      const scMap = new Map(scData.map(s => [s.ShipCompanyID, s]));

      const selected = orderData
        .filter(o => initialSelectedOrderIds.includes(o.id))
        .map(o => ({
          ...o,
          customer: customerMap.get(Number(o.customerId)),
          shipCompany: scMap.get(Number(o.shipcompanyId))
        }));

      setSelectedOrders(selected);
      if (selected.length > 0) {
        setShipCompany(selected[0].shipCompany || null);
      }
    } catch (e) {
      toast.error("Lỗi tải dữ liệu đơn hàng đã chọn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && initialSelectedOrderIds.length > 0) {
      loadSelection();
    }
  }, [open, initialSelectedOrderIds]);

  const handleSubmit = async () => {
    if (selectedOrders.length === 0) return;

    setLoading(true);
    try {
      // 1. Get all OrderDetails to aggregate products
      const allOrderDetails = await api.orderDetails.list();
      const selectedDetails = allOrderDetails.filter(d => initialSelectedOrderIds.includes(d.OrderID || d.orderid));

      const productSummary: Record<number, number> = {};
      selectedDetails.forEach(d => {
        const pId = d.ProductID || d.productid;
        const qty = d.Quantity || d.quantity;
        if (pId) {
          productSummary[pId] = (productSummary[pId] || 0) + qty;
        }
      });

      const productDetails = Object.entries(productSummary).map(([pIdStr, qty]) => ({
        productId: Number(pIdStr),
        quantity: Number(qty)
      }));

      // 2. Create ONE Batch Export Receipt with nested details (Atomic Save)
      const warehouseId = 1;
      const orderIdsStr = initialSelectedOrderIds.join(", #");
      
      const receipt = await api.exportReceipts.create({
        employeeId: emp!.EmployeeID,
        exporttype: 1, // Bán hàng
        reason: `Xuất bán đơn hàng online: #${orderIdsStr}`,
        status: "Đã hoàn thành",
        warehouseId: warehouseId,
        createddate: new Date().toISOString().split('T')[0],
        details: productDetails // Integrated Details for Cascade Save
      } as any);

      // 3. Update RealStock (Integrated)
      const allInventories = await api.detailInventories.list();
      for (const item of productDetails) {
        const inv = allInventories.find(i => i.WarehouseID === warehouseId && i.ProductID === item.ProductID);
        if (inv) {
          await api.detailInventories.update(warehouseId, {
            ...inv,
            RealStock: inv.RealStock - item.Quantity,
            AvailableStock: inv.AvailableStock 
          });
        }
      }

      // 4. Update each Order (Link Receipt, Update Status, Generate ShipCode)
      for (const order of selectedOrders) {
        const randomShipCode = "SGF" + Math.floor(Math.random() * 900000 + 100000);
        await api.orders.update(order.id, {
          ...order,
          exportreceiptId: receipt.id,
          shippingstatus: 2, // Đã gửi vận chuyển
          shipcode: randomShipCode
        });
      }

      toast.success(`Đã xác nhận xuất kho thành công! Đã tạo phiếu #${receipt.id}.`);
      onSave();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.message || "Lỗi trong quá trình xuất kho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[650px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={cn(dialog.title, "flex items-center gap-2")}>
            <FileOutput className="h-5 w-5 text-blue-600" />
            Xác nhận xuất kho cho {initialSelectedOrderIds.length} đơn hàng
          </DialogTitle>
        </DialogHeader>

        <div className={cn(dialog.body, "max-h-[60vh] overflow-y-auto pr-2")}>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-3 items-start mb-4">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-xs text-blue-800 space-y-1">
              <p className="font-bold uppercase tracking-wide">Thông tin xuất kho chung</p>
              <div className="grid grid-cols-2 gap-x-4">
                <p>Kho xuất: <span className="font-bold">Kho tổng SGF (1)</span></p>
                <p>Đơn vị vận chuyển: <span className="font-bold text-blue-700">{shipCompany?.ShipCompanyName || "N/A"}</span></p>
                <p className="col-span-2">Lý do: <span className="italic">Xuất bán đơn hàng online</span></p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[100px] text-xs uppercase font-bold">Mã đơn</TableHead>
                  <TableHead className="text-xs uppercase font-bold">Khách hàng</TableHead>
                  <TableHead className="text-xs uppercase font-bold">Địa chỉ giao</TableHead>
                  <TableHead className="text-right text-xs uppercase font-bold">Tổng tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                   <TableRow>
                     <TableCell colSpan={4} className="text-center py-10">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
                     </TableCell>
                   </TableRow>
                ) : (
                  selectedOrders.map(o => (
                    <TableRow key={o.id} className="text-xs">
                      <TableCell className="font-bold text-slate-500">#{o.id}</TableCell>
                      <TableCell className="font-medium">
                        {o.customer ? `${o.customer.firstname} ${o.customer.lastname}` : "Khách lẻ"}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate italic text-slate-500">
                        {o.customer?.address || o.shipmentnote || "-"}
                      </TableCell>
                      <TableCell className="text-right font-bold text-blue-600">
                        {o.totalamount.toLocaleString()}đ
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <p className="text-[11px] text-slate-400 mt-4 italic text-center">
            * Hệ thống sẽ tự động trừ tồn kho vật lý và gán mã vận đơn cho các đơn hàng này.
          </p>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button 
            className={cn(btn.primary, "bg-blue-600 hover:bg-blue-700")}
            disabled={loading || selectedOrders.length === 0}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Đang xử lý...
              </>
            ) : (
              "Xác nhận xuất kho"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
