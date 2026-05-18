import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Invoice } from "@/lib/types";
import { DetailInvoiceDialog } from "@/pages/8.1-invoice-management-page/DetailInvoiceDialog";
import { NewInvoiceDialog } from "@/pages/8.1-invoice-management-page/NewInvoiceDialog";
import { badge, btn, entity, input, page } from "@/pages/page-classes";

// Giả lập dữ liệu mẫu gồm 45 hóa đơn để test phân trang
const MOCK_INVOICES: Invoice[] = Array.from({ length: 45 }, (_, i) => ({
  InvoiceID: 1000 + i,
  CustomerID: 300 + (i % 5),
  EmployeeID: 101,
  SaleChannelCode: i % 2 === 0 ? 0 : 1, // 0: Tại quầy, 1: Mạng xã hội/Online
  TotalAmount: (i + 1) * 150000,
  TaxAmount: (i + 1) * 15000,
  FinalAmount: (i + 1) * 165000,
  Status: (i % 3).toString(), // "0": Chờ thanh toán, "1": Đã thanh toán, "2": Thanh toán 1 phần
  InvoiceDate: new Date(2026, 4, 18),
}));

const ITEMS_PER_PAGE = 20;

export default function InvoiceManagementPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setInvoices(MOCK_INVOICES);
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

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const renderChannel = (code: number) => {
    return code === 0 ? "Tại quầy" : "Mạng xã hội/Online";
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "0":
        return (
          <Badge
            variant="outline"
            className={cn(badge.base, badge.pending)}
          >
            Chờ thanh toán
          </Badge>
        );
      case "1":
        return (
          <Badge
            variant="outline"
            className={cn(badge.base, badge.success)}
          >
            Đã thanh toán
          </Badge>
        );
      case "2":
        return (
          <Badge
            variant="outline"
            className={cn(badge.base, badge.info)}
          >
            Thanh toán 1 phần
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Không xác định
          </Badge>
        );
    }
  };

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
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm hóa đơn
        </Button>
      </div>

      {/* Invoice Table */}
      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow
                key={invoice.InvoiceID}
                className={page.tableRow}
              >
                {/* ID Hóa đơn */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-slate-900">
                      #{invoice.InvoiceID}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      {invoice.InvoiceDate.toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </TableCell>

                {/* Kênh bán */}
                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className={entity.cellMeta}>
                      Kênh bán
                    </span>
                    <span className="font-medium text-slate-700 mt-0.5">
                      {renderChannel(invoice.SaleChannelCode)}
                    </span>
                  </div>
                </TableCell>

                {/* Trạng thái */}
                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-xs text-slate-500 mb-1">
                      Trạng thái
                    </span>
                    {renderStatus(invoice.Status)}
                  </div>
                </TableCell>

                {/* Tổng tiền */}
                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className={entity.cellMeta}>
                      Tổng tiền
                    </span>
                    <span className="font-bold text-slate-900 mt-0.5">
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
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(btn.actionPrimary, "w-32")}
                    >
                      XN. thanh toán
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Bộ điều khiển Phân trang */}
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
                    className={currentPage === pageNum ? btn.paginationActive : btn.paginationInactive}
                  >
                    {pageNum}</Button>
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
      </div>

      <DetailInvoiceDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        invoice={selectedInvoice}
      />

      <NewInvoiceDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
