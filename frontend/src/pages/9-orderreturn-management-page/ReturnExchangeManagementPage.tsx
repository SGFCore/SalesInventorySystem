import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, entity, input, page } from "@/pages/page-classes";
import { Loader2, Search, RefreshCcw, CornerUpLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ReturnActionDialog } from "./ReturnActionDialog";
import { ExchangeActionDialog } from "./ExchangeActionDialog";
import type { Order, OrderDetail } from "@/lib/types";

export default function ReturnExchangeManagementPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderDetail | null>(null);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const data = await api.sales.searchOrders(keyword);
      setOrders(data);
      setSelectedOrder(null);
      setOrderDetails([]);
    } catch (e) {
      toast.error("Lỗi khi tìm kiếm đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrder = async (order: Order) => {
    setSelectedOrder(order);
    setLoadingDetails(true);
    try {
      const details = await api.orderDetails.list();
      const filtered = details.filter(d => d.OrderID === order.id);
      setOrderDetails(filtered);
    } catch (e) {
      toast.error("Lỗi khi tải chi tiết đơn hàng");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleOpenReturn = (detail: OrderDetail) => {
    if (!checkReturnEligibility(selectedOrder!)) {
      toast.error("Không đủ điều kiện trả hàng: Đơn hàng đã quá hạn 7 ngày hoặc chưa hoàn thành.");
      return;
    }
    setSelectedProduct(detail);
    setIsReturnOpen(true);
  };

  const handleOpenExchange = (detail: OrderDetail) => {
    if (!checkReturnEligibility(selectedOrder!)) {
      toast.error("Không đủ điều kiện đổi hàng: Đơn hàng đã quá hạn 7 ngày hoặc chưa hoàn thành.");
      return;
    }
    setSelectedProduct(detail);
    setIsExchangeOpen(true);
  };

  const checkReturnEligibility = (order: Order) => {
    // Tiền điều kiện: Đơn hàng gốc ở trạng thái "Đã hoàn thành" (status = 1)
    if (order.orderstatus !== 1) return false;

    let dateStr = order.invoicedate;
    if (!dateStr) return false;

    const invoiceDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - invoiceDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // Thỏa mãn điều kiện đổi trả hàng trong vòng 7 ngày
    return diffDays <= 7;
  };

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className={cn(page.searchWrap, "flex items-center gap-2")}>
          <Input
            placeholder="Mã Đơn hàng / Mã Hóa đơn / SĐT khách..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={cn(input.search, "w-96")}
          />
          <Button onClick={handleSearch} disabled={loading} className={btn.primary}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            Tra cứu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-1 border rounded-lg bg-white p-4 h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Kết quả tra cứu</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">1 Đơn hàng = 1 Hóa đơn</span>
          </div>
          {orders.length === 0 ? (
            <div className="text-center mt-20">
              <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Nhập thông tin để tìm đơn hàng</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.map(o => (
                <div 
                  key={o.id} 
                  onClick={() => handleSelectOrder(o)}
                  className={cn(
                    "p-3 rounded-lg border transition-all",
                    selectedOrder?.id === o.id ? "bg-blue-50 border-blue-400 shadow-sm" : "bg-white border-slate-100 hover:border-blue-200 shadow-none"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-blue-600 text-sm">Đơn hàng #{o.id}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">
                      {o.invoicedate ? new Date(o.invoicedate).toLocaleDateString("vi-VN") : "N/A"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700">Tổng tiền: {(o.totalamount || 0).toLocaleString("vi-VN")} đ</div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-slate-400">HĐ: {o.invoiceid ? `#${o.invoiceid}` : "N/A"}</span>
                    <Badge variant={o.orderstatus === 1 ? "default" : "secondary"} className="h-4 text-[9px] px-1.5">
                      {o.orderstatus === 1 ? "Đã hoàn thành" : "Khác"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2 border rounded-lg bg-white p-4 h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-4">Chi tiết mặt hàng Đổi/Trả</h3>
          {!selectedOrder ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <RefreshCcw className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm">Chọn một đơn hàng từ danh sách bên trái</p>
            </div>
          ) : loadingDetails ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
              <p className="text-sm text-slate-500 font-medium">Đang trích xuất dữ liệu...</p>
            </div>
          ) : (
            <div>
              <div className="mb-6 p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Trạng thái gốc</span>
                    <span className={cn("text-xs font-bold", selectedOrder.orderstatus === 1 ? "text-green-600" : "text-slate-500")}>
                      {selectedOrder.orderstatus === 1 ? "Đã hoàn thành" : "Không khả dụng"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ngày xuất HĐ</span>
                    <span className="text-xs font-bold text-slate-700">{selectedOrder.invoicedate || "Chưa có"}</span>
                  </div>
                </div>
                <Badge variant={checkReturnEligibility(selectedOrder) ? "default" : "destructive"} className="h-6">
                  {checkReturnEligibility(selectedOrder) ? "Đủ điều kiện (Trong hạn 7 ngày)" : "Không đủ điều kiện đổi trả"}
                </Badge>
              </div>

              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="text-xs font-bold uppercase text-slate-500">Sản phẩm</TableHead>
                    <TableHead className="text-xs font-bold uppercase text-slate-500 text-center">SL</TableHead>
                    <TableHead className="text-xs font-bold uppercase text-slate-500 text-right">Đơn giá</TableHead>
                    <TableHead className="text-xs font-bold uppercase text-slate-500 text-right">Thành tiền</TableHead>
                    <TableHead className="text-xs font-bold uppercase text-slate-500 text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails.map(detail => (
                    <TableRow key={detail.OrderDetailID} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 text-sm">SP #{detail.ProductID}</span>
                          <span className="text-[10px] text-slate-400 italic">Mã SKU: SKU-{detail.ProductID}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-slate-600">{detail.Quantity}</TableCell>
                      <TableCell className="text-right text-xs">{(detail.UnitPrice || 0).toLocaleString("vi-VN")} đ</TableCell>
                      <TableCell className="text-right font-bold text-blue-600 text-sm">{(detail.TotalAmount || 0).toLocaleString("vi-VN")} đ</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-[10px] font-bold text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => handleOpenExchange(detail)}
                          >
                            <RefreshCcw className="w-3 h-3 mr-1" /> Đổi hàng
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-[10px] font-bold text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleOpenReturn(detail)}
                          >
                            <CornerUpLeft className="w-3 h-3 mr-1" /> Trả hàng
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && selectedOrder && (
        <>
          <ReturnActionDialog
            open={isReturnOpen}
            onOpenChange={setIsReturnOpen}
            detail={selectedProduct}
            orderId={selectedOrder.id}
            onSuccess={() => {
              handleSearch();
            }}
          />
          <ExchangeActionDialog
            open={isExchangeOpen}
            onOpenChange={setIsExchangeOpen}
            detail={selectedProduct}
            orderId={selectedOrder.id}
            onSuccess={() => {
              handleSearch();
            }}
          />
        </>
      )}
    </div>
  );
}
