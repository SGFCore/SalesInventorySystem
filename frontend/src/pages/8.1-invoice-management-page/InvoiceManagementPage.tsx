import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Invoice, Customer } from "@/lib/types";
import { DetailInvoiceDialog } from "@/pages/8.1-invoice-management-page/DetailInvoiceDialog";
import { badge, btn, entity, input, page } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";
import { PrintInvoiceDialog } from "./PrintInvoiceDialog";

const ITEMS_PER_PAGE = 20;

export default function InvoiceManagementPage() {
  const { hasRole } = useEmp();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = async () => {
    setLoading(true);
    try {
      const [invoiceData, customerData] = await Promise.all([
        api.invoices.list(),
        api.customers.list()
      ]);
      
      setCustomers(customerData);

      if (!invoiceData || invoiceData.length === 0) {
        toast.error("Không có dữ liệu hóa đơn");
        setInvoices([]);
      } else {
        // Sort newest first
        setInvoices(
          invoiceData.sort(
            (a, b) =>
              new Date(b.InvoiceDate).getTime() -
              new Date(a.InvoiceDate).getTime(),
          ),
        );
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách hóa đơn");
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset về trang 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo Mã Hóa Đơn
  const filteredInvoices = invoices.filter((inv) =>
    inv.InvoiceID.toString().includes(search.trim()),
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleDetailClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };

  const handlePrintClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPrintOpen(true);
  };

  const handleConfirmPayment = async (invoice: Invoice) => {
    try {
      await api.invoices.update(invoice.InvoiceID, {
        ...invoice,
        Status: "Đã thanh toán", // Đã thanh toán
      });
      toast.success(`Đã xác nhận thanh toán cho Hóa đơn #${invoice.InvoiceID}`);
      loadData();
    } catch (e: any) {
      toast.error(e.message || "Lỗi xác nhận thanh toán");
    }
  };

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const renderChannel = (code: number) => {
    return code === 0 ? "Tại quầy" : "Mạng xã hội/Online";
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "Chờ thanh toán":
        return (
          <Badge variant="outline" className={cn(badge.base, badge.pending)}>
            Chờ thanh toán
          </Badge>
        );
      case "Đã thanh toán":
        return (
          <Badge variant="outline" className={cn(badge.base, badge.success)}>
            Đã thanh toán
          </Badge>
        );
      case "Thanh toán 1 phần":
        return (
          <Badge variant="outline" className={cn(badge.base, badge.info)}>
            Thanh toán 1 phần
          </Badge>
        );
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  const isSalesRole = hasRole(3);

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      {/* Header Controls */}
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

      {/* Invoice Table */}
      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">
              Đang tải hóa đơn...
            </span>
          </div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy hóa đơn nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.InvoiceID} className={page.tableRow}>
                    {/* ID Hóa đơn */}
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className={entity.id}>#{invoice.InvoiceID}</span>
                        <span className="text-xs text-slate-500 mt-0.5 font-medium">
                          {new Date(invoice.InvoiceDate).toLocaleDateString(
                            "vi-VN",
                          )}{" "}
                          {new Date(invoice.InvoiceDate).toLocaleTimeString(
                            "vi-VN",
                            { hour: "2-digit", minute: "2-digit" },
                          )}
                        </span>
                      </div>
                    </TableCell>

                    {/* Kênh bán */}
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold text-slate-700 mt-0.5">
                          {renderChannel(invoice.SaleChannelCode)}
                        </span>
                      </div>
                    </TableCell>

                    {/* Trạng thái */}
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        {renderStatus(invoice.Status)}
                      </div>
                    </TableCell>

                    {/* Tổng tiền */}
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className={entity.cellMeta}>Tổng tiền</span>
                        <span className="font-bold text-slate-950 mt-0.5">
                          {invoice.FinalAmount.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    {/* Các nút hành động */}
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionSecondary, "w-32")}
                          onClick={() => handleDetailClick(invoice)}
                        >
                          Xem chi tiết
                        </Button>
                        {!isSalesRole && (
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              btn.actionPrimary,
                              "w-32 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
                            )}
                            disabled={invoice.Status === "Đã thanh toán"}
                            onClick={() => handleConfirmPayment(invoice)}
                          >
                            XN. thanh toán
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            btn.actionPrimary,
                            "w-32 bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
                          )}
                          onClick={() => handlePrintClick(invoice)}
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          In hóa đơn
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Bộ điều khiển Phân trang */}
            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium text-slate-900">
                    {paginatedInvoices.length}
                  </span>{" "}
                  trên{" "}
                  <span className="font-medium text-slate-900">
                    {filteredInvoices.length}
                  </span>{" "}
                  hóa đơn
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
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

      <DetailInvoiceDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        invoice={selectedInvoice}
      />

      {selectedInvoice && (
        <PrintInvoiceDialog
          open={isPrintOpen}
          onOpenChange={setIsPrintOpen}
          invoice={selectedInvoice}
          customer={customers.find(c => c.id === selectedInvoice.CustomerID)}
        />
      )}
    </div>
  );
}
