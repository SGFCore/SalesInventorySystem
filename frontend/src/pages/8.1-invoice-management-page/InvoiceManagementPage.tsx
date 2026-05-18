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
            className="text-yellow-600 border-yellow-200 bg-yellow-50 rounded-none"
          >
            Chờ thanh toán
          </Badge>
        );
      case "1":
        return (
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 rounded-none"
          >
            Đã thanh toán
          </Badge>
        );
      case "2":
        return (
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50 rounded-none"
          >
            Thanh toán 1 phần
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="rounded-none">
            Không xác định
          </Badge>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm theo mã hóa đơn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-slate-200 focus:ring-blue-600 rounded-none"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm hóa đơn
        </Button>
      </div>

      {/* Invoice Table */}
      <div className="border border-slate-200 overflow-hidden">
        <Table>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow
                key={invoice.InvoiceID}
                className="hover:bg-slate-50 border-b border-slate-200"
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
                    <span className="font-medium text-xs text-slate-500">
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
                    <span className="font-medium text-xs text-slate-500">
                      Tổng tiền
                    </span>
                    <span className="font-bold text-slate-900 mt-0.5">
                      {invoice.FinalAmount.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </TableCell>

                {/* Các nút hành động có grid ngang bằng nhau */}
                <TableCell className="text-right">
                  <div className="grid grid-cols-2 gap-2 w-full max-w-[260px] ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full rounded-none"
                      onClick={() => handleDetailClick(invoice)}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full rounded-none"
                      // onClick={() => handleDetailClick(invoice)}
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
        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
          <div className="text-sm text-slate-500">
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
              className="h-8 w-8 p-0 rounded-none border-slate-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "h-8 w-8 p-0 rounded-none",
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 border-slate-200",
                    )}
                  >
                    {page}
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
              className="h-8 w-8 p-0 rounded-none border-slate-200"
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
