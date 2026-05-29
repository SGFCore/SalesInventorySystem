import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2, Printer, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Invoice } from "@/lib/types";
import { DetailInvoiceDialog } from "@/pages/8.1-invoice-management-page/DetailInvoiceDialog";
import { badge, btn, entity, input, page } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

export default function InvoiceSearchPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const data = await api.invoices.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu hóa đơn");
        setInvoices([]);
      } else {
        setInvoices(data.sort((a, b) => new Date(b.InvoiceDate).getTime() - new Date(a.InvoiceDate).getTime()));
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách hóa đơn");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredInvoices = invoices.filter((inv) =>
    inv.InvoiceID.toString().includes(search.trim())
  );

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDetailClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };

  const handlePrint = async (invoice: Invoice) => {
    toast.info("Đang khởi tạo tệp PDF...");
    try {
      await api.invoices.generatePdf(invoice.InvoiceID, false);
      toast.success("Tải báo cáo thành công!");
    } catch (e: any) {
      console.error("PDF Download Error:", e);
      toast.error(`Lỗi khi in hóa đơn: ${e.message}`);
    }
  };

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const renderChannel = (code: number) => code === 0 ? "Tại quầy" : "Trực tuyến";

  const renderStatus = (status: string) => {
    switch (status) {
      case "Chờ thanh toán": return <Badge variant="outline" className={cn(badge.base, badge.pending)}>Chờ thanh toán</Badge>;
      case "Đã thanh toán": return <Badge variant="outline" className={cn(badge.base, badge.success)}>Đã thanh toán</Badge>;
      case "Thanh toán 1 phần": return <Badge variant="outline" className={cn(badge.base, badge.info)}>Thanh toán 1 phần</Badge>;
      default: return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo mã hóa đơn..."
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
            <span className="ml-2 text-slate-500 font-medium">Đang tải hóa đơn...</span>
          </div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy hóa đơn nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã HĐ</TableHead>
                  <TableHead>Kênh bán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.InvoiceID} className={page.tableRow}>
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className={entity.id}>#{invoice.InvoiceID}</span>
                        <span className="text-xs text-slate-500 mt-0.5 font-medium">
                          {new Date(invoice.InvoiceDate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold text-slate-700 mt-0.5">{renderChannel(invoice.SaleChannelCode)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">{renderStatus(invoice.Status)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className={entity.cellMeta}>Tổng tiền</span>
                        <span className="font-bold text-slate-950 mt-0.5">{(invoice.FinalAmount || 0).toLocaleString("vi-VN")} đ</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" className={cn(btn.actionSecondary, "w-28")} onClick={() => handleDetailClick(invoice)}>
                          <Eye className="w-4 h-4 mr-1.5" /> Chi tiết
                        </Button>
                        <Button variant="outline" size="sm" className={cn(btn.actionPrimary, "w-28")} onClick={() => handlePrint(invoice)}>
                          <Printer className="w-4 h-4 mr-1.5" /> In hóa đơn
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị <span className="font-medium text-slate-900">{paginatedInvoices.length}</span> trên <span className="font-medium text-slate-900">{filteredInvoices.length}</span> hóa đơn
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

      <DetailInvoiceDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        invoice={selectedInvoice}
      />
    </div>
  );
}
