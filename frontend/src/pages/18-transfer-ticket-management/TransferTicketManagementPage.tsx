import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { btn, entity, input, page } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2, CheckCircle, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { NewTransferTicketDialog } from "./NewTransferTicketDialog";
import { DetailTransferTicketDialog } from "./DetailTransferTicketDialog";
import type { Transferticket, Warehouse, Employee } from "@/lib/types";

const ITEMS_PER_PAGE = 20;

export default function TransferTicketManagementPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Transferticket[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Transferticket | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ticketData, whData, empData] = await Promise.all([
        api.sales.getTransferTickets(),
        api.warehouses.list(),
        api.employees.list(),
      ]);
      
      setWarehouses(whData);
      setEmployees(empData);

      // Role 3 chỉ thấy phiếu do mình tạo
      const filtered = user?.RoleID === 3 ? ticketData.filter(t => t.EmployeeID === user.EmployeeID) : ticketData;
      filtered.sort((a, b) => b.TransferID - a.TransferID);
      setTickets(filtered);
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách phiếu luân chuyển");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleConfirmReceive = async (id: number) => {
    if (!confirm(`Xác nhận đã nhận đủ hàng cho phiếu #${id}?`)) return;
    try {
      await api.sales.confirmTransferReceive(id);
      toast.success("Đã xác nhận nhận hàng và cập nhật tồn kho!");
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi xác nhận nhận hàng");
    }
  };

  const getWhName = (id: number) => warehouses.find(w => w.WareHouseID === id)?.WareHouseName || `Kho #${id}`;
  const getEmpName = (id: number) => employees.find(e => e.EmployeeID === id)?.Fullname || `NV #${id}`;

  const renderStatus = (status: string) => {
    const config: Record<string, { className: string }> = {
      "Chờ xuất kho": { className: "text-orange-600 border-orange-200 bg-orange-50" },
      "Đang luân chuyển": { className: "text-blue-600 border-blue-200 bg-blue-50" },
      "Hoàn tất": { className: "text-green-600 border-green-200 bg-green-50" },
      "Từ chối": { className: "text-red-600 border-red-200 bg-red-50" },
    };
    const current = config[status] || { className: "text-slate-600 border-slate-200 bg-slate-50" };
    
    return (
      <Badge variant="outline" className={cn("whitespace-nowrap font-medium text-[10px] rounded-full px-2 py-0.5", current.className)}>
        {status}
      </Badge>
    );
  };

  const filteredTickets = tickets.filter(t => {
    const s = search.toLowerCase();
    return String(t.TransferID).includes(s);
  });

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = filteredTickets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const openDetail = (ticket: Transferticket) => {
    setSelectedTicket(ticket);
    setIsDetailOpen(true);
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm theo mã phiếu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        {(user?.RoleID === 1 || user?.RoleID === 3) && (
          <Button className={btn.primary} onClick={() => setIsNewOpen(true)}>
            Tạo yêu cầu xin hàng
          </Button>
        )}
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu...</span>
          </div>
        ) : paginatedTickets.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không có phiếu luân chuyển nào.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã phiếu</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Người phụ trách</TableHead>
                <TableHead>Từ kho &gt; Đến kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTickets.map(t => (
                <TableRow key={t.TransferID} className="hover:bg-slate-50">
                  <TableCell className="font-bold text-slate-800">#{t.TransferID}</TableCell>
                  <TableCell className="text-sm text-slate-600">{t.CreatedDate ? new Date(t.CreatedDate).toLocaleDateString("vi-VN") : "N/A"}</TableCell>
                  <TableCell className="text-sm font-medium text-slate-700">{getEmpName(t.EmployeeID)}</TableCell>
                  <TableCell className="text-sm">
                    <span className="font-semibold text-slate-700">{getWhName(t.SourceWHID)}</span> &rarr; <span className="font-semibold text-blue-600">{getWhName(t.DestWHID)}</span>
                  </TableCell>
                  <TableCell>{renderStatus(t.Status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 text-[10px] h-7"
                        onClick={() => openDetail(t)}
                      >
                        <Eye className="w-3 h-3 mr-1" /> Chi tiết
                      </Button>
                      {t.Status === 'Đang luân chuyển' && user?.RoleID !== 2 && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-200 hover:bg-green-50 text-[10px] h-7"
                          onClick={() => handleConfirmReceive(t.TransferID)}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Nhận hàng
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <NewTransferTicketDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadData}
      />

      <DetailTransferTicketDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        ticket={selectedTicket}
        sourceName={selectedTicket ? getWhName(selectedTicket.SourceWHID) : ""}
        destName={selectedTicket ? getWhName(selectedTicket.DestWHID) : ""}
      />
    </div>
  );
}
