import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import type { Order, Customer, Shipcompany } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, entity, input, page } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2, Truck, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { DispatchDialog } from "@/pages/17-shipping-management/DispatchDialog";

const ITEMS_PER_PAGE = 20;

export default function ShippingManagementPage() {
  const [orders, setOrders] = useState<(Order & { customer?: Customer, shipCompany?: Shipcompany })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const [orderData, customerData, shipCompanyData] = await Promise.all([
        api.shipping.getShippingReadyOrders(),
        api.customers.list(),
        api.shipCompanies.list()
      ]);

      const customerMap = new Map(customerData.map(c => [c.id, c]));
      const shipCompanyMap = new Map(shipCompanyData.map(sc => [sc.ShipCompanyID, sc]));

      const mappedOrders = orderData.map(order => ({
        ...order,
        customer: customerMap.get(Number(order.customerId)),
        shipCompany: shipCompanyMap.get(Number(order.shipcompanyId))
      }));

      // Sort by ID descending
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
  }, [search]);

  const getCustomerName = (order: any) => {
    const cust = order.customer;
    return cust ? `${cust.firstname} ${cust.lastname}` : `KH #${order.customerId}`;
  };

  const getCustomerAddress = (order: any) => {
    const cust = order.customer;
    return cust ? cust.address : "Không có địa chỉ";
  };

  const filteredOrders = orders.filter((ord) => {
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

  const handleCancelShip = async (orderId: number) => {
    if (!confirm(`Bạn có chắc chắn muốn hủy giao vận cho đơn hàng #${orderId}? Hệ thống sẽ tự động hoàn tồn kho.`)) return;
    
    try {
      await api.shipping.cancelShip(orderId);
      toast.success("Hủy giao vận thành công. Tồn kho đã được hoàn trả.");
      loadOrders();
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi hủy giao vận");
    }
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm theo mã ĐH, tên KH hoặc mã vận đơn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <div className="flex gap-2">
          {/* Nút tác vụ hàng loạt có thể đặt ở đây nếu cần */}
        </div>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không có đơn hàng nào chờ giao vận.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-slate-50 border-b border-slate-200"
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
                        <span className="font-semibold text-xs text-slate-400 mb-1">
                          Địa chỉ giao hàng
                        </span>
                        <span className="text-xs font-medium text-slate-700 truncate w-full" title={getCustomerAddress(order)}>
                          {getCustomerAddress(order)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold text-xs text-slate-400 mb-1">
                          Thông tin giao vận
                        </span>
                        {order.shippingstatus === 4 ? (
                          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-[10px] py-0">Chờ đẩy đơn</Badge>
                        ) : order.shippingstatus === 2 ? (
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 text-[10px] py-0 w-fit">Đã gửi ĐVVC</Badge>
                            <span className="text-[10px] font-bold text-slate-700">{order.shipCompany?.ShipCompanyName || 'ĐVVC Khác'}</span>
                            <span className="text-[10px] font-mono text-slate-500">{order.shipcode}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 text-[10px] py-0">Khác</Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-end text-sm">
                        <span className={entity.cellMeta}>Tổng thu COD (Dự kiến)</span>
                        <span className="font-bold text-blue-600 mt-0.5">
                          {(order.totalamount || 0).toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="w-[180px] text-right">
                      <div className="flex justify-end gap-2">
                        {order.shippingstatus === 4 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-xs font-semibold text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => handleOpenDispatch(order)}
                          >
                            <Truck className="w-3 h-3 mr-1.5" />
                            Đẩy đơn
                          </Button>
                        )}
                        
                        {(order.shippingstatus === 4 || order.shippingstatus === 2) && order.orderstatus !== 4 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-xs font-semibold text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleCancelShip(order.id)}
                          >
                            <XCircle className="w-3 h-3 mr-1.5" />
                            Hủy
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị <span className="font-medium text-slate-900">{paginatedOrders.length}</span> trên <span className="font-medium text-slate-900">{filteredOrders.length}</span> đơn hàng
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={btn.paginationNav}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button key={pageNum} variant={currentPage === pageNum ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(pageNum)} className={currentPage === pageNum ? btn.paginationActive : btn.paginationInactive}>
                        {pageNum}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={btn.paginationNav}>
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
    </div>
  );
}
