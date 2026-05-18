import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ImportReceipt, ImportReceiptDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailImportReceiptDialog } from "@/pages/12.1-importreceipt-management-page/DetailImportReceiptDialog";
import { NewImportReceiptDialog } from "@/pages/12.1-importreceipt-management-page/NewImportReceiptDialog";
import { page, input, btn } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Mockup Data chi tiết phiếu nhập kho
export const MOCK_RECEIPT_DETAILS: Record<number, ImportReceiptDetail[]> =
  Array.from({ length: 25 }).reduce<Record<number, ImportReceiptDetail[]>>(
    (acc, _, i) => {
      const receiptId = 800 + i;
      acc[receiptId] = [
        {
          ImportReceiptID: receiptId,
          ProductID: 10,
          ProductName: "Giấy in A4 Double A c80",
          ExpectedQuantity: 20,
          ActualQuantity: i % 4 === 0 ? 18 : 20,
        },
        {
          ImportReceiptID: receiptId,
          ProductID: 11,
          ProductName: "Bút bi Thiên Long FO-03",
          ExpectedQuantity: 100,
          ActualQuantity: 100,
        },
      ];
      return acc;
    },
    {},
  );

// Mockup danh sách phiếu nhập kho với trạng thái gọn hơn
const MOCK_RECEIPTS: ImportReceipt[] = Array.from({ length: 25 }, (_, i) => {
  const hasDiscrepancy = i % 4 === 0 ? 1 : 0;
  const statuses = ["Chờ duyệt", "Đã duyệt", "Từ chối", "Bản nháp"];
  const status = statuses[i % 4];

  return {
    ImportReceiptID: 800 + i,
    EmployeeID: 100 + (i % 3),
    WarehouseID: 1,
    Status: status,
    CreatedDate: new Date(2026, 4, 18 - i),
    RequestID: 500 + i,
    HasDiscrepancy: hasDiscrepancy,
    DiscrepancyReason: hasDiscrepancy
      ? "Thiếu 2 ram giấy do nhà cung cấp giao sót"
      : "",
    DiscrepancyImageURL: hasDiscrepancy
      ? "https://example.com/discrepancy.jpg"
      : "",
  };
});

const ITEMS_PER_PAGE = 10;

export default function ImportReceiptManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReceipt, setSelectedReceipt] = useState<ImportReceipt | null>(
    null,
  );

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Dialog states
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "approve">("view");

  // Tìm kiếm theo mã phiếu, mã NV hoặc mã yêu cầu
  const filtered = MOCK_RECEIPTS.filter(
    (r) =>
      r.ImportReceiptID.toString().includes(search) ||
      r.EmployeeID.toString().includes(search) ||
      r.RequestID.toString().includes(search),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReceipts = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (receiptObj: ImportReceipt, mode: "view" | "approve") => {
    setSelectedReceipt(receiptObj);
    setDialogMode(mode);
    setIsDetailOpen(true);
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <Input
          placeholder="Tìm kiếm theo mã phiếu, mã NV, mã yêu cầu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={input.search}
        />
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Tạo phiếu nhập kho
        </Button>
      </div>

      <div className="border border-slate-200 overflow-hidden">
        <Table>
          <TableBody>
            {paginatedReceipts.map((r) => (
              <TableRow
                key={r.ImportReceiptID}
                className={page.tableRow}
              >
                <TableCell className="w-24 font-medium text-slate-500">
                  #{r.ImportReceiptID}
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {r.CreatedDate.toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium text-sm",
                      r.Status === "Đã duyệt" && "text-green-600",
                      r.Status === "Chờ duyệt" && "text-amber-500",
                      r.Status === "Từ chối" && "text-red-500",
                      r.Status === "Bản nháp" && "text-slate-400",
                    )}
                  >
                    {r.Status}
                  </span>
                  {r.HasDiscrepancy === 1 && (
                    <span className="ml-2 text-xs bg-red-50 text-red-600 px-1.5 py-0.5 border border-red-100 font-medium">
                      Lệch
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 w-32"
                      onClick={() => openAction(r, "view")}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 w-32"
                      onClick={() => openAction(r, "approve")}
                    >
                      Phê duyệt
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
            <span className="font-medium">{paginatedReceipts.length}</span> trên{" "}
            <span className="font-medium">{filtered.length}</span> phiếu nhập
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
                    className={cn(
                      "h-8 w-8 p-0",
                      currentPage === pageNum
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                        : "text-slate-600 border-slate-200",
                    )}
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

      <DetailImportReceiptDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        importReceipt={selectedReceipt}
        mode={dialogMode}
      />

      <NewImportReceiptDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
