import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, entity, input, page, dialog } from "@/pages/page-classes";
import { 
  ClipboardList, 
  Loader2, 
  Printer, 
  AlertCircle,
  FileText
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { DetailOrderDialog } from "@/pages/8.2-order-management-page/DetailOrderDialog";

export default function OrderProcessingPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  
  // Dialog states
  const [isPickListOpen, setIsPickListOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Pick List Data
  const [pickListData, setPickListData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [orderData, customerData] = await Promise.all([
        api.orders.list(),
        api.customers.list(),
      ]);

      const customerMap = new Map(customerData.map(c => [c.id, c]));

      // Filter: shippingstatus IN (0,1) AND orderstatus IN (0,1)
      const filtered = orderData
        .filter(o => 
          (o.shippingstatus === 0 || o.shippingstatus === 1) && 
          (o.orderstatus === 0 || o.orderstatus === 1)
        )
        .map(o => ({
          ...o,
          customer: customerMap.get(Number(o.customerId))
        }));

      filtered.sort((a, b) => b.id - a.id);
      setOrders(filtered);
    } catch (e: any) {
      toast.error("Lỗi tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const safeSearch = search.trim().toLowerCase();
      if (!safeSearch) return true;
      const idStr = String(o.id);
      const phoneStr = o.customer?.phone || "";
      return idStr.includes(safeSearch) || phoneStr.includes(safeSearch);
    });
  }, [orders, search]);

  const toggleOrderSelection = (id: number) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    );
  };

  const handleCompletePacking = async (orderId: number) => {
    setLoading(true);
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      await api.orders.update(orderId, {
        ...order,
        shippingstatus: 4, // Đã đóng gói
        // Trigger trg_order_status_by_shipping sẽ tự cập nhật orderstatus = 1
      });

      toast.success(`Đã hoàn tất đóng gói đơn hàng #${orderId}!`);
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Lỗi cập nhật đóng gói");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePickList = async () => {
    if (selectedOrderIds.length === 0) return;

    setLoading(true);
    try {
      const [allDetails, allProducts, allInventory] = await Promise.all([
        api.orderDetails.list(),
        api.products.list(),
        api.detailInventories.list(),
      ]);

      const selectedDetails = allDetails.filter(d => selectedOrderIds.includes(d.OrderID || d.orderid));
      const aggregationMap = new Map<number, number>();
      selectedDetails.forEach(d => {
        const pId = d.ProductID || d.productid;
        const qty = d.Quantity || d.quantity;
        aggregationMap.set(pId, (aggregationMap.get(pId) || 0) + qty);
      });

      const productMap = new Map(allProducts.map(p => [p.ProductID, p]));
      const inventoryMap = new Map(
        allInventory
          .filter(i => i.WarehouseID === 1)
          .map(i => [i.ProductID, i.StorageLocation])
      );

      const items: any[] = [];
      aggregationMap.forEach((qty, pId) => {
        const prod = productMap.get(pId);
        items.push({
          productId: pId,
          productName: prod?.ProductName || `SP #${pId}`,
          quantity: qty,
          storageLocation: inventoryMap.get(pId) || null
        });
      });

      items.sort((a, b) => {
        if (!a.storageLocation && !b.storageLocation) return 0;
        if (!a.storageLocation) return 1;
        if (!b.storageLocation) return -1;
        return a.storageLocation.localeCompare(b.storageLocation, undefined, { numeric: true, sensitivity: 'base' });
      });

      setPickListData(items);
      setIsPickListOpen(true);
    } catch (e) {
      toast.error("Lỗi lập danh sách lấy hàng");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    if (selectedOrderIds.length === 0) return;
    setLoading(true);
    try {
      toast.info("Đang khởi tạo tệp PDF danh sách lấy hàng...");
      await api.orders.downloadPickListPdf(selectedOrderIds);
      toast.success("Đã tải xuống danh sách lấy hàng!");
      setIsPickListOpen(false);
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi tải xuống PDF");
    } finally {
      setLoading(false);
    }
  };

  const renderShippingBadge = (status: number) => {
    if (status === 0) return <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Cần lên lịch giao</Badge>;
    if (status === 1) return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Đang đóng gói</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm theo mã đơn hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            className={cn(btn.primary)} 
            disabled={selectedOrderIds.length === 0 || loading}
            onClick={handleGeneratePickList}
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Lập danh sách lấy hàng
          </Button>
        </div>
      </div>

      <div className={page.tableWrap}>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={filteredOrders.length > 0 && selectedOrderIds.length === filteredOrders.length}
                  onCheckedChange={(checked) => {
                    if (checked) setSelectedOrderIds(filteredOrders.map(o => o.id));
                    else setSelectedOrderIds([]);
                  }}
                />
              </TableHead>
              <TableHead className="w-[100px]">Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Vận chuyển</TableHead>
              <TableHead className="w-[150px] text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
                  <p className="text-slate-500 mt-2 font-medium">Đang tải dữ liệu...</p>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-slate-400">
                  Không tìm thấy đơn hàng nào chờ xử lý.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className={cn(selectedOrderIds.includes(order.id) && "bg-blue-50/30")}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedOrderIds.includes(order.id)}
                      onCheckedChange={() => toggleOrderSelection(order.id)}
                    />
                  </TableCell>
                  <TableCell className={entity.id}>#{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700 text-sm">
                        {order.customer ? `${order.customer.firstname} ${order.customer.lastname}` : "Khách lẻ"}
                      </span>
                      <span className="text-[11px] text-slate-500">{order.customer?.phone || ""}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-blue-600 text-sm">
                    {(order.totalamount || 0).toLocaleString()}đ
                  </TableCell>
                  <TableCell>{renderShippingBadge(order.shippingstatus)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        className={cn(btn.primary, "h-8 text-xs bg-green-600 hover:bg-green-700")}
                        onClick={() => handleCompletePacking(order.id)}
                        disabled={loading}
                      >
                        Hoàn tất đóng gói
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs font-semibold border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedOrderForDetail(order);
                          setIsDetailOpen(true);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isPickListOpen} onOpenChange={setIsPickListOpen}>
        <DialogContent className={cn("sm:max-w-[800px]", dialog.content)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl border-b pb-4">
              <ClipboardList className="h-6 w-6 text-blue-600" />
              DANH SÁCH LẤY HÀNG
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4">
            <Table>
              <TableHeader className="bg-slate-100">
                <TableRow>
                  <TableHead className="w-[50px] text-center">STT</TableHead>
                  <TableHead className="w-[80px]">Mã SP</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead className="w-[100px] text-center">Số lượng</TableHead>
                  <TableHead className="w-[150px]">Vị trí (Kệ/Ngăn)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pickListData.map((item, index) => (
                  <TableRow key={item.productId} className={cn(!item.storageLocation && "bg-orange-50/50")}>
                    <TableCell className="text-center font-medium text-slate-400">{index + 1}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">#{item.productId}</TableCell>
                    <TableCell className="font-semibold text-slate-700">{item.productName}</TableCell>
                    <TableCell className="text-center font-bold text-blue-700 text-lg">{item.quantity}</TableCell>
                    <TableCell>
                      {item.storageLocation ? (
                        <Badge variant="outline" className="bg-white border-slate-300 text-slate-700 font-bold">
                          {item.storageLocation}
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-1 text-orange-600 font-bold text-xs uppercase">
                          <AlertCircle className="h-3 w-3" />
                          Chưa có vị trí
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <DialogFooter className="border-t pt-4 mt-4">
            <Button variant="outline" onClick={() => setIsPickListOpen(false)}>Đóng</Button>
            <Button 
              className={cn(btn.primary, "bg-green-600 hover:bg-green-700")}
              onClick={handlePrint}
              disabled={loading}
            >
              <FileText className="h-4 w-4 mr-2" />
              Tải danh sách (PDF)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DetailOrderDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        order={selectedOrderForDetail}
      />
    </div>
  );
}
