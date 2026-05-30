import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/lib/api";
import type { Order, Shipcompany, Warehouse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dialog, btn } from "@/pages/page-classes";
import { Loader2, Package, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewExportReceiptDialog({ open, onOpenChange, onSave }: Props) {
  const { emp } = useEmp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipCompanies, setShipCompanies] = useState<Shipcompany[]>([]);
  const [selectedShipCompany, setSelectedShipCompany] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number>(1); // Default to main warehouse

  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedShipCompany(null);
      setSelectedOrderIds([]);
      loadInitialData();
    }
  }, [open]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [scData, whData] = await Promise.all([
        api.shipCompanies.list(),
        api.warehouses.list(),
      ]);
      setShipCompanies(scData.filter(sc => sc.Status === 1));
      setWarehouses(whData);
    } catch (error) {
      toast.error("Không thể tải dữ liệu ban đầu");
    } finally {
      setLoading(false);
    }
  };

  const loadReadyOrders = async (shipCompanyId: number) => {
    setLoading(true);
    try {
      const allOrders = await api.orders.list();
      // Filter orders with ShipCompanyID and shippingstatus === 4 (Đã đóng gói)
      const readyOrders = allOrders.filter(
        (o) => o.shipcompanyId === shipCompanyId && o.shippingstatus === 4
      );
      setOrders(readyOrders);
      setSelectedOrderIds(readyOrders.map((o) => o.id)); // Default select all
      if (readyOrders.length === 0) {
        toast.info("Không có kiện hàng chờ xuất cho đơn vị này.");
      }
    } catch (error) {
      toast.error("Không thể tải danh sách kiện hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedShipCompany) {
        toast.error("Vui lòng chọn đơn vị vận chuyển!");
        return;
      }
      loadReadyOrders(selectedShipCompany);
      setStep(2);
    }
  };

  const handleToggleOrder = (orderId: number) => {
    setSelectedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSubmit = async () => {
    if (selectedOrderIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một kiện hàng để xuất kho!");
      return;
    }

    setLoading(true);
    try {
      // 1. Lấy chi tiết của tất cả các đơn hàng đã chọn để tổng hợp sản phẩm
      const allOrderDetailsData = await api.orderDetails.list();
      const selectedDetails = allOrderDetailsData.filter(d => selectedOrderIds.includes(d.OrderID));
      
      // Tổng hợp số lượng theo ProductID
      const productSummary: Record<number, number> = {};
      selectedDetails.forEach(d => {
        if (d.ProductID) {
          productSummary[d.ProductID] = (productSummary[d.ProductID] || 0) + d.Quantity;
        }
      });

      // 2. Tạo Phiếu xuất kho (ExportReceipt)
      const receipt = await api.exportReceipts.create({
        employeeId: emp!.EmployeeID,
        exporttype: 1, // Bán hàng
        reason: `Xuất kho giao vận - Đơn vị: ${shipCompanies.find(sc => sc.ShipCompanyID === selectedShipCompany)?.ShipCompanyName}`,
        status: "Đã hoàn thành",
        warehouseId: selectedWarehouseId,
        createddate: new Date().toISOString().split('T')[0],
      });

      // 3. Tạo Chi tiết phiếu xuất (ExportReceiptDetail) và cập nhật Tồn kho vật lý (RealStock)
      const allInventories = await api.detailInventories.list();
      
      for (const [productIdStr, quantity] of Object.entries(productSummary)) {
        const productId = Number(productIdStr);
        
        // Tạo ExportReceiptDetail
        await api.exportReceiptDetails.create({
          ExportReceiptID: receipt.id,
          ProductID: productId,
          Quantity: quantity
        });

        // Cập nhật RealStock trong DetailInventory
        const existingInv = allInventories.find(
          (inv) => inv.WarehouseID === selectedWarehouseId && inv.ProductID === productId
        );

        if (existingInv) {
          await api.detailInventories.update(selectedWarehouseId, {
            ...existingInv,
            RealStock: existingInv.RealStock - quantity,
            // Giữ nguyên AvailableStock vì nó đã được trừ khi tạo đơn hàng/hóa đơn
          });
        }
      }

      // 4. Cập nhật trạng thái các Đơn hàng sang "Đang giao" (shippingstatus = 2)
      for (const orderId of selectedOrderIds) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
          await api.orders.update(orderId, {
            ...order,
            shippingstatus: 2, // Đã gửi vận chuyển -> Trigger C26 sẽ tự update orderstatus = 2 (Đang giao)
            exportreceiptId: receipt.id,
          });
        }
      }

      toast.success("Xuất kho thành công và đã cập nhật tồn kho vật lý!");
      onSave();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Xuất kho thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Xuất kho giao vận
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="font-semibold text-slate-700 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  Chọn đơn vị vận chuyển
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {shipCompanies.map((sc) => (
                    <div
                      key={sc.ShipCompanyID}
                      onClick={() => setSelectedShipCompany(sc.ShipCompanyID)}
                      className={cn(
                        "cursor-pointer border-2 rounded-lg p-3 transition-all flex flex-col items-center justify-center gap-2 text-center",
                        selectedShipCompany === sc.ShipCompanyID
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-100 bg-white text-slate-600 hover:border-blue-200"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {sc.ShipCompanyName.charAt(0)}
                      </div>
                      <span className="text-sm font-bold">{sc.ShipCompanyName}</span>
                      <span className="text-[10px] text-slate-400">{sc.Phone}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 pt-2 border-t border-slate-100">
                <Label className="font-semibold text-slate-700">Xuất từ kho</Label>
                <select
                  className={cn(dialog.input, "h-10 text-sm")}
                  value={selectedWarehouseId}
                  onChange={(e) => setSelectedWarehouseId(Number(e.target.value))}
                >
                  {warehouses.map(wh => (
                    <option key={wh.WareHouseID} value={wh.WareHouseID}>
                      {wh.WareHouseName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="font-semibold text-slate-700 flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  Danh sách kiện hàng "Đã đóng gói"
                </Label>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  Đã chọn: {selectedOrderIds.length} / {orders.length}
                </span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="text-sm text-slate-500">Đang tải kiện hàng...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                  <Package className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 font-medium">Không có kiện hàng nào chờ xuất</p>
                  <Button
                    variant="link"
                    className="text-blue-600 mt-1"
                    onClick={() => setStep(1)}
                  >
                    Quay lại chọn đơn vị khác
                  </Button>
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden bg-white max-h-[350px] overflow-y-auto border-slate-200">
                  <Table>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow
                          key={order.id}
                          className={cn(
                            "cursor-pointer hover:bg-slate-50",
                            selectedOrderIds.includes(order.id) ? "bg-blue-50/30" : ""
                          )}
                          onClick={() => handleToggleOrder(order.id)}
                        >
                          <TableCell className="w-10">
                            <Checkbox
                              checked={selectedOrderIds.includes(order.id)}
                              onCheckedChange={() => handleToggleOrder(order.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-700 text-sm">#{order.id}</span>
                              <span className="text-[10px] text-slate-500">Mã vận đơn: {order.shipcode || "N/A"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs font-medium text-slate-600">
                              {order.totalamount.toLocaleString("vi-VN")} đ
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                              Đã đóng gói
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {step === 2 && (
            <Button
              variant="outline"
              className={dialog.cancel}
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Quay lại
            </Button>
          )}
          <Button
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          {step === 1 ? (
            <Button
              className={cn(btn.primary, "w-32")}
              onClick={handleNext}
              disabled={loading || !selectedShipCompany}
            >
              Tiếp theo
            </Button>
          ) : (
            <Button
              className={cn(btn.primary, "w-32")}
              onClick={handleSubmit}
              disabled={loading || orders.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Đang xử lý
                </>
              ) : (
                "Xác nhận xuất"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
