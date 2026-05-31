import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import type { Order, Customer, Shipcompany } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, entity, input, page } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2, Truck, XCircle, Ban } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { DispatchDialog } from "@/pages/17-shipping-management/DispatchDialog";
import { CancelReasonDialog } from "@/pages/grouped/CancelReasonDialog";
import { useEmp } from "@/context/empContext";

const ITEMS_PER_PAGE = 20;

export default function ShippingManagementPage() {
  const { hasRole } = useEmp();
  const [orders, setOrders] = useState<(Order & { customer?: Customer, shipCompany?: Shipcompany })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<"ready" | "unpacking">("ready");

  const isStockkeeper = hasRole(2);
  const isSales = hasRole(3);
  const isManager = hasRole(1);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const [orderData, customerData, shipCompanyData] = await Promise.all([
        api.orders.list(),
        api.customers.list(),
        api.shipCompanies.list()
      ]);

      const customerMap = new Map(customerData.map(c => [c.id, c]));
      const shipCompanyMap = new Map(shipCompanyData.map(sc => [sc.ShipCompanyID, sc]));

      const mappedOrders = orderData
        .filter(o => o.shipcompanyId && o.shipcompanyId !== 0)
        .map(order => ({
          ...order,
          customer: customerMap.get(Number(order.customerId)),
          shipCompany: shipCompanyMap.get(Number(order.shipcompanyId))
        }));

      mappedOrders.sort((a, b) => b.id - a.id);
      setOrders(mappedOrders);
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách giao vận");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  const getCustomerName = (order: any) => {
    const cust = order.customer;
    return cust ? `${cust.firstname} ${cust.lastname}` : `KH #${order.customerId}`;
  };

  const getCustomerAddress = (order: any) => {
    const cust = order.customer;
    return cust ? cust.address : "Không có địa chỉ";
  };

  const filteredOrders = orders.filter((ord) => {
    if (activeTab === "ready") {
      // Show all in "ready" tab, but cancelled ones are grayed out
    } else {
      // Unpacking tab: OrderStatus = 4 AND shippingstatus = 4
      if (!(ord.orderstatus === 4 && ord.shippingstatus === 4)) return false;
    }

    const safeSearch = (search || "").trim().toLowerCase();
    if (!safeSearch) return true;
    const idStr = String(ord.id);
    const nameStr = getCustomerName(ord).toLowerCase();
    const shipCodeStr = (ord.shipcode || "").toLowerCase();
    return idStr.includes(safeSearch) || nameStr.includes(safeSearch) || shipCodeStr.includes(safeSearch);
  });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handleOpenDispatch = (order: Order) => {
    setSelectedOrder(order);
    setIsDispatchOpen(true);
  };

  const handleCancelShip = (order: Order) => {
    if (order.shippingstatus >= 2 && order.shippingstatus !== 4) {
      toast.error("Đơn hàng đã được bàn giao cho đơn vị vận chuyển!");
      return;
    }
    setSelectedOrder(order);
    setIsCancelOpen(true);
  };

  const handleConfirmCancelShip = async (reason: string) => {
    if (!selectedOrder) return;
    const order = selectedOrder;

    try {
      // 1. Update Order Status & Note
      await api.orders.update(order.id, {
        ...order,
        orderstatus: 4,
        shipmentnote: (order.shipmentnote || "") + " | Lý do hủy GV: " + reason,
      });

      // 2. Revert Stock (Warehouse 1)
      const orderDetails = await api.orderDetails.list();
      const items = orderDetails.filter(d => (d.OrderID || (d as any).orderid) === order.id);
      const allInventories = await api.detailInventories.list();
      const warehouseId = 1; 

      for (const item of items) {
        const pId = item.ProductID || (item as any).productid;
        const inv = allInventories.find(i => i.WarehouseID === warehouseId && i.ProductID === pId);
        if (inv) {
          await api.detailInventories.update(warehouseId, {
            ...inv,
            AvailableStock: inv.AvailableStock + (item.Quantity || item.quantity)
          });
        }
      }

      toast.success(
        <div className="flex flex-col gap-1">
          <p className="font-bold text-green-700">Hủy giao vận thành công!</p>
          <p className="text-xs text-slate-600 italic">Vui lòng thông báo Thủ kho để tháo dỡ kiện hàng (Mã đơn: {order.id}).</p>
        </div>,
        { duration: 6000 }
      );
      loadOrders();
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi hủy đơn hàng");
    }
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("ready")}
              className={cn(
                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeTab === "ready" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Chờ giao vận
            </button>
            <button
              onClick={() => setActiveTab("unpacking")}
              className={cn(
                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeTab === "unpacking" ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Hủy chờ tháo dỡ
              {orders.filter(o => o.orderstatus === 4 && o.shippingstatus === 4).length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px]">
                  {orders.filter(o => o.orderstatus === 4 && o.shippingstatus === 4).length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm theo mã ĐH, tên KH hoặc mã vận đơn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium font-sans text-sm">Đang tải danh sách...</span>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white text-sm font-sans">
            {activeTab === "ready" ? "Không có đơn hàng nào chờ giao vận." : "Không có đơn hàng nào cần tháo dỡ."}
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className={cn(
                      "border-b border-slate-200 transition-colors",
                      order.orderstatus === 4 && activeTab === "ready" ? "bg-slate-50/80 opacity-60 grayscale cursor-not-allowed" : "hover:bg-slate-50"
                    )}
                  >
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className={entity.id}>#{order.id}</span>
                        <span className="text-xs font-semibold text-slate-500 mt-0.5">
                          {getCustomerName(order)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start text-sm max-w-[200px]">
                        <span className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                          Địa chỉ giao hàng
                        </span>
                        <span className="text-xs font-medium text-slate-700 truncate w-full" title={getCustomerAddress(order)}>
                          {getCustomerAddress(order)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                          Trạng thái / Thông tin
                        </span>
                        {order.orderstatus === 4 ? (
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 text-[10px] py-0 font-bold uppercase">ĐÃ HỦY ĐƠN</Badge>
                            {order.shippingstatus === 4 && (
                              <span className="text-[9px] text-red-600 font-bold bg-red-50 px-1 rounded">CHỜ THÁO DỠ</span>
                            )}
                          </div>
                        ) : order.shippingstatus === 4 ? (
                          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-[10px] py-0">Đã đóng gói</Badge>
                        ) : order.shippingstatus === 2 ? (
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 text-[10px] py-0 w-fit">Đã gửi ĐVVC</Badge>
                            <span className="text-[10px] font-bold text-slate-700">{order.shipCompany?.ShipCompanyName || 'ĐVVC Khác'}</span>
                            <span className="text-[9px] text-slate-400 font-mono tabular-nums">{order.shipcode}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 text-[10px] py-0">Khác</Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-end text-sm">
                        <span className={entity.cellMeta}>Tổng thu COD</span>
                        <span className="font-bold text-blue-600 mt-0.5 text-xs tabular-nums">
                          {(order.totalamount || 0).toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="w-[180px] text-right">
                      {order.orderstatus !== 4 ? (
                        <div className="flex justify-end gap-2">
                          {isStockkeeper && order.shippingstatus === 4 && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 text-[11px] font-semibold text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => handleOpenDispatch(order)}
                            >
                              <Truck className="w-3.5 h-3.5 mr-1.5" />
                              Đẩy đơn
                            </Button>
                          )}
                          
                          {(isSales || isManager) && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={cn(
                                "h-8 text-[11px] font-semibold text-red-600 border-red-200 hover:bg-red-50",
                                (order.shippingstatus !== 4 || !order.shipcode) && "opacity-30 cursor-not-allowed pointer-events-none"
                              )}
                              disabled={order.shippingstatus !== 4 || !order.shipcode}
                              onClick={() => handleCancelShip(order)}
                              title={order.shippingstatus !== 4 || !order.shipcode ? "Chỉ có thể hủy sau khi đóng gói và có mã vận đơn" : "Hủy giao vận"}
                            >
                              <XCircle className="w-3.5 h-3.5 mr-1.5" />
                              Hủy giao vận
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="flex justify-end pr-4">
                          {activeTab === "unpacking" && isStockkeeper ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-[10px] font-bold text-green-600 hover:bg-green-50 px-2"
                              onClick={() => {
                                if (window.confirm("Xác nhận đã tháo dỡ kiện hàng này?")) {
                                  api.orders.update(order.id, { ...order, shippingstatus: 0 })
                                    .then(() => {
                                      toast.success("Đã hoàn tất tháo dỡ kiện hàng.");
                                      loadOrders();
                                    });
                                }
                              }}
                            >
                              XÁC NHẬN THÁO DỠ
                            </Button>
                          ) : (
                            <Ban className="w-5 h-5 text-slate-200" />
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium text-slate-900">
                    {paginatedOrders.length}
                  </span>{" "}
                  trên{" "}
                  <span className="font-medium text-slate-900">
                    {filteredOrders.length}
                  </span>{" "}
                  đơn hàng
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={btn.paginationNav}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? btn.paginationActive
                              : btn.paginationInactive
                          }
                        >
                          {pageNum}
                        </Button>
                      ),
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={btn.paginationNav}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <DispatchDialog 
        open={isDispatchOpen} 
        onOpenChange={setIsDispatchOpen} 
        order={selectedOrder}
        onSave={loadOrders}
      />

      <CancelReasonDialog
        open={isCancelOpen}
        onOpenChange={setIsCancelOpen}
        onConfirm={handleConfirmCancelShip}
        title="Lý do hủy giao vận"
        placeholder="Nhập lý do hủy giao vận..."
      />
    </div>
  );
}
