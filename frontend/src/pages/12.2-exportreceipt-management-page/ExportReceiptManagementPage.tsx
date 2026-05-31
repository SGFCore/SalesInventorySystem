import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { ExtendedOrder, Shipcompany } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NewExportReceiptDialog } from "@/pages/12.2-exportreceipt-management-page/NewExportReceiptDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { FileOutput, Loader2, Search, Truck, AlertTriangle, History } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";
import { DetailOrderDialog } from "@/pages/8.2-order-management-page/DetailOrderDialog";

export default function ExportReceiptManagementPage() {
  const { hasRole } = useEmp();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<ExtendedOrder[]>([]);
  const [shipCompanies, setShipCompanies] = useState<Shipcompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [orderData, customerData, scData] = await Promise.all([
        api.orders.list(),
        api.customers.list(),
        api.shipCompanies.list()
      ]);

      const customerMap = new Map(customerData.map(c => [c.id, c]));
      const scMap = new Map(scData.map(s => [s.ShipCompanyID, s]));
      setShipCompanies(scData);

      // Filter: shippingstatus = 4 (Packed) AND no exportreceiptId
      const pending = orderData
        .filter(o => o.shippingstatus === 4 && (!o.exportreceiptId || o.exportreceiptId === 0))
        .map(o => ({
          ...o,
          customer: customerMap.get(Number(o.customerId)),
          shipCompany: scMap.get(Number(o.shipcompanyId))
        }));

      setOrders(pending.sort((a, b) => b.id - a.id));
    } catch (e: any) {
      toast.error("Lỗi tải danh sách chờ xuất kho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredOrders = useMemo(() => {
    const safeSearch = search.trim().toLowerCase();
    return orders.filter(o => {
      const idStr = String(o.id);
      const phoneStr = o.customer?.phone || "";
      return idStr.includes(safeSearch) || phoneStr.includes(safeSearch);
    });
  }, [orders, search]);

  // Grouping by ShipCompany
  const groupedOrders = useMemo(() => {
    const groups: Record<number, { company: Shipcompany | undefined, items: ExtendedOrder[] }> = {};
    filteredOrders.forEach(o => {
      const scId = o.shipcompanyId || 0;
      if (!groups[scId]) {
        groups[scId] = { company: o.shipCompany, items: [] };
      }
      groups[scId].items.push(o);
    });
    return Object.values(groups).sort((a, b) => (a.company?.ShipCompanyName || "").localeCompare(b.company?.ShipCompanyName || ""));
  }, [filteredOrders]);

  const handleToggleOrder = (orderId: number) => {
    setSelectedOrderIds(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const handleCreateBatchReceipt = () => {
    if (selectedOrderIds.length === 0) return;

    // Check if all selected orders have the same shipcompanyId
    const selectedOrders = orders.filter(o => selectedOrderIds.includes(o.id));
    const firstScId = selectedOrders[0].shipcompanyId;
    const isSameSc = selectedOrders.every(o => o.shipcompanyId === firstScId);

    if (!isSameSc) {
      toast.error(
        <div className="flex flex-col gap-1">
          <p className="font-bold flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" /> Đơn vị vận chuyển không đồng nhất
          </p>
          <p className="text-xs">Vui lòng chỉ chọn các đơn hàng thuộc cùng một đơn vị vận chuyển để tạo phiếu xuất.</p>
        </div>
      );
      return;
    }

    setIsNewOpen(true);
  };

  if (showHistory) {
    return (
      <div className={page.shell}>
         <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
               <History className="h-5 w-5 text-slate-400" />
               <h1 className="text-xl font-bold text-slate-800">Lịch sử phiếu xuất kho</h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowHistory(false)}>
               Quay lại danh sách chờ
            </Button>
         </div>
         {/* History table would go here - simplified for now to keep focus on requirements */}
         <div className="bg-white p-20 text-center rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-400 italic">Dữ liệu lịch sử đang được tối ưu hóa...</p>
         </div>
      </div>
    );
  }

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm theo mã đơn hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(input.search, "pl-10")}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHistory(true)} className="h-9 px-3">
             <History className="h-4 w-4 mr-2" />
             Lịch sử
          </Button>
          {hasRole(2) && (
            <Button 
              className={cn(btn.primary, "h-9")} 
              disabled={selectedOrderIds.length === 0}
              onClick={handleCreateBatchReceipt}
            >
              <FileOutput className="h-4 w-4 mr-2" />
              Tạo phiếu xuất kho ({selectedOrderIds.length})
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 bg-white rounded-xl border border-slate-100">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
            <span className="text-slate-500 font-medium">Đang tìm đơn hàng đã đóng gói...</span>
          </div>
        ) : groupedOrders.length === 0 ? (
          <div className="text-center py-24 text-slate-400 font-medium bg-white rounded-xl border border-dashed border-slate-300">
             <Truck className="h-12 w-12 mx-auto mb-3 opacity-20" />
             Không có đơn hàng nào đã đóng gói chờ xuất kho.
          </div>
        ) : (
          groupedOrders.map((group) => (
            <div key={group.company?.ShipCompanyID || 0} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="font-bold text-slate-700">{group.company?.ShipCompanyName || "Chưa gán đơn vị"}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-bold ml-2">
                       {group.items.length} đơn
                    </Badge>
                 </div>
                 <Checkbox 
                    checked={group.items.every(o => selectedOrderIds.includes(o.id))}
                    onCheckedChange={(checked) => {
                       const ids = group.items.map(o => o.id);
                       if (checked) setSelectedOrderIds(prev => Array.from(new Set([...prev, ...ids])));
                       else setSelectedOrderIds(prev => prev.filter(id => !ids.includes(id)));
                    }}
                 />
              </div>
              <Table>
                <TableHeader className="bg-white">
                  <TableRow className="hover:bg-transparent border-b border-slate-100">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="w-[100px]">Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Địa chỉ giao</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead className="w-[120px] text-center">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((order) => (
                    <TableRow key={order.id} className={cn("group transition-colors", selectedOrderIds.includes(order.id) && "bg-blue-50/30")}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedOrderIds.includes(order.id)}
                          onCheckedChange={() => handleToggleOrder(order.id)}
                        />
                      </TableCell>
                      <TableCell className={entity.id}>#{order.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-700 text-sm">
                             {order.customer ? `${order.customer.firstname} ${order.customer.lastname}` : "Khách lẻ"}
                           </span>
                           <span className="text-[11px] text-slate-500 font-medium">{order.customer?.phone || ""}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate text-xs text-slate-500 font-medium italic">
                        {order.customer?.address || order.shipmentnote || "-"}
                      </TableCell>
                      <TableCell className="font-bold text-blue-600 text-sm">
                        {order.totalamount.toLocaleString()}đ
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                           variant="ghost" 
                           size="sm" 
                           className="h-8 text-xs font-bold text-slate-500 hover:text-blue-600"
                           onClick={() => {
                              setSelectedOrderForDetail(order);
                              setIsDetailOpen(true);
                           }}
                        >
                           Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        )}
      </div>

      <DetailOrderDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        order={selectedOrderForDetail}
      />

      <NewExportReceiptDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={() => {
           loadData();
           setSelectedOrderIds([]);
        }}
        // Pass selected IDs to dialog
        initialSelectedOrderIds={selectedOrderIds}
      />
    </div>
  );
}
