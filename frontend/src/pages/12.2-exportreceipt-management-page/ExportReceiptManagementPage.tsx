import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Exportreceipt } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailExportReceiptDialog } from "@/pages/12.2-exportreceipt-management-page/DetailExportReceiptDialog";
import { NewExportReceiptDialog } from "@/pages/12.2-exportreceipt-management-page/NewExportReceiptDialog";
import { page, input, btn } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

const ITEMS_PER_PAGE = 10;

export default function ExportReceiptManagementPage() {
  const { hasRole } = useEmp();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [receipts, setReceipts] = useState<Exportreceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<Exportreceipt | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  const loadReceipts = async () => {
    setLoading(true);
    try {
      const data = await api.exportReceipts.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu phiếu xuất kho");
        setReceipts([]);
      } else {
        // Sort by ID descending
        setReceipts(data.sort((a, b) => b.id - a.id));
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách phiếu xuất kho");
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceipts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const filtered = receipts.filter(
    (r) =>
      r.id.toString().includes(search) ||
      r.employeeId.toString().includes(search) ||
      (r.reason && r.reason.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReceipts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getExportTypeName = (type: number) => {
    switch (type) {
      case 1: return "Bán hàng";
      case 2: return "Hủy rác";
      case 3: return "Sửa chữa";
      default: return "Khác";
    }
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo mã phiếu, lý do..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        {hasRole(2) && (
          <Button className={btn.primary} onClick={() => setIsNewOpen(true)}>
            Xuất kho giao vận
          </Button>
        )}
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedReceipts.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy phiếu xuất kho nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedReceipts.map((r) => (
                  <TableRow key={r.id} className={page.tableRow}>
                    <TableCell className="w-24 font-bold text-slate-500">
                      #{r.id}
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs font-semibold">
                      Ngày tạo: {new Date(r.createddate).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold text-slate-700">
                        Loại: {getExportTypeName(r.exporttype)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-bold text-xs px-2.5 py-0.5 rounded-full border",
                          r.status === "Đã hoàn thành" && "bg-green-50 text-green-700 border-green-200",
                          r.status === "Đã hủy" && "bg-red-50 text-red-700 border-red-200",
                        )}
                      >
                        {r.status}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-slate-500">
                      {r.reason}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                          onClick={() => {
                            setSelectedReceipt(r);
                            setIsDetailOpen(true);
                          }}
                        >
                          Xem chi tiết
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
                  Hiển thị{" "}
                  <span className="font-medium text-slate-900">{paginatedReceipts.length}</span> trên{" "}
                  <span className="font-medium text-slate-900">{filtered.length}</span> phiếu xuất
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum ? btn.paginationActive : btn.paginationInactive}
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

      <DetailExportReceiptDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        exportReceipt={selectedReceipt}
      />

      <NewExportReceiptDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadReceipts}
      />
    </div>
  );
}
