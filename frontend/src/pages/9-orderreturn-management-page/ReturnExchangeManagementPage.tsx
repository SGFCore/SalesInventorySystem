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
    setSelectedProduct(detail);
    setIsReturnOpen(true);
  };

  const handleOpenExchange = (detail: OrderDetail) => {
    setSelectedProduct(detail);
    setIsExchangeOpen(true);
  };

  const checkReturnEligibility = (order: Order | ExtendedOrder) => {
    let dateStr = order.invoicedate;
    
    // Nếu là ExtendedOrder và có kèm invoice, lấy ngày từ invoice
    if (!dateStr && 'invoice' in order && order.invoice) {
      dateStr = order.invoice.InvoiceDate;
    }

    if (!dateStr) return false;

    const invoiceDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - invoiceDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
  };

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className={cn(page.searchWrap, "flex items-center gap-2")}>
          <Input
            placeholder="Nhập mã ĐH, SĐT khách hoặc mã Hóa đơn..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={cn(input.search, "w-80")}
          />
          <Button onClick={handleSearch} disabled={loading} className={btn.primary}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-1 border rounded-lg bg-white p-4 h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-4">Kết quả tìm kiếm</h3>
          {orders.length === 0 ? (
            <p className="text-slate-500 text-sm text-center mt-10">Không có đơn hàng nào.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.map(o => (
                <div 
                  key={o.id} 
                  onClick={() => handleSelectOrder(o)}
                  className={cn(
                    "p-3 rounded-md border cursor-pointer hover:border-blue-400 transition-colors",
                    selectedOrder?.id === o.id ? "bg-blue-50 border-blue-400" : "bg-white border-slate-200"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-blue-600">#{o.id}</span>
                    <span className="text-xs text-slate-500">
                      {o.invoicedate ? new Date(o.invoicedate).toLocaleDateString("vi-VN") : "N/A"}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-700">Tổng tiền: {(o.totalamount || 0).toLocaleString("vi-VN")} đ</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Hóa đơn: {o.invoiceid ? `#${o.invoiceid}` : "Chưa xuất HĐ"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2 border rounded-lg bg-white p-4 h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-4">Chi tiết sản phẩm</h3>
          {!selectedOrder ? (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              Vui lòng chọn một đơn hàng để xem chi tiết
            </div>
          ) : loadingDetails ? (
            <div className="flex justify-center mt-10"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
          ) : (
            <div>
              <div className="mb-4 flex gap-2 items-center">
                <Badge variant={checkReturnEligibility(selectedOrder) ? "default" : "destructive"}>
                  {checkReturnEligibility(selectedOrder) ? "Còn hạn đổi trả" : "Hết hạn đổi trả"}
                </Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-center">Số lượng</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                    <TableHead className="text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails.map(detail => (
                    <TableRow key={detail.OrderDetailID}>
                      <TableCell className="font-medium">Mã SP: #{detail.ProductID}</TableCell>
                      <TableCell className="text-center">{detail.Quantity}</TableCell>
                      <TableCell className="text-right">{(detail.UnitPrice || 0).toLocaleString("vi-VN")} đ</TableCell>
                      <TableCell className="text-right font-bold text-blue-600">{(detail.TotalAmount || 0).toLocaleString("vi-VN")} đ</TableCell>
                      <TableCell className="text-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-[10px] text-blue-600 border-blue-200"
                          disabled={!checkReturnEligibility(selectedOrder)}
                          onClick={() => handleOpenExchange(detail)}
                        >
                          <RefreshCcw className="w-3 h-3 mr-1" /> Đổi
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-[10px] text-red-600 border-red-200"
                          disabled={!checkReturnEligibility(selectedOrder)}
                          onClick={() => handleOpenReturn(detail)}
                        >
                          <CornerUpLeft className="w-3 h-3 mr-1" /> Trả
                        </Button>
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
