import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { CountSheet, CountSheetDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailCountsheetDialog } from "@/pages/15-countsheet-management-page/DetailCountsheetDialog";
import { EditCountsheetDialog } from "@/pages/15-countsheet-management-page/EditCountsheetDialog";
import { NewCountsheetDialog } from "@/pages/15-countsheet-management-page/NewCountsheetDialog";
import { page, input, btn } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Định nghĩa hiển thị trạng thái
export const MAP_STATUS: Record<number, { text: string; className: string }> = {
  0: { text: "Chưa kiểm kê", className: "text-slate-400" },
  1: { text: "Chờ phê duyệt", className: "text-amber-500" },
  2: { text: "Đã phê duyệt", className: "text-green-600" },
  3: { text: "Từ chối, cần kiểm lại", className: "text-red-500" },
  4: { text: "Đã hủy", className: "text-slate-500 line-through" },
};

// Mockup Data chi tiết Master-Detail
export const MOCK_COUNTSHEET_DETAILS: Record<number, CountSheetDetail[]> =
  Array.from({ length: 25 }).reduce<Record<number, CountSheetDetail[]>>(
    (acc, _, i) => {
      const countsheetId = 700 + i;
      acc[countsheetId] = [
        {
          CountSheetld: countsheetId,
          WarehouseID: 1,
          ProductId: 101,
          Quantity: 45 + (i % 3),
          Note: i % 3 === 0 ? "Thực tế khớp hoàn toàn" : "Hao hụt tự nhiên",
        },
        {
          CountSheetld: countsheetId,
          WarehouseID: 1,
          ProductId: 102,
          Quantity: 120 - (i % 5),
          Note: "",
        },
      ];
      return acc;
    },
    {},
  );

const MOCK_COUNTSHEETS: CountSheet[] = Array.from({ length: 25 }, (_, i) => ({
  CountSheetId: 700 + i,
  CreatedDate: new Date(2026, 4, 18 - i),
  Status: i % 5,
}));

const ITEMS_PER_PAGE = 10;

export default function CountsheetManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountsheet, setSelectedCountsheet] =
    useState<CountSheet | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Quản lý trạng thái các Dialog
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "approve">("view");

  const filtered = MOCK_COUNTSHEETS.filter((c) =>
    c.CountSheetId.toString().includes(search),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCountsheets = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      {/* Bộ lọc tìm kiếm & Thêm mới */}
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo mã phiếu kiểm kê..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Tạo phiếu kiểm kê
        </Button>
      </div>

      {/* Bảng danh sách chính */}
      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedCountsheets.map((c) => {
              const statusConfig = MAP_STATUS[c.Status] || {
                text: "Không rõ",
                className: "text-slate-400",
              };
              return (
                <TableRow
                  key={c.CountSheetId}
                  className={page.tableRow}
                >
                  <TableCell className="w-24 font-medium text-slate-500">
                    #{c.CountSheetId}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {c.CreatedDate.toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-medium text-sm",
                        statusConfig.className,
                      )}
                    >
                      {statusConfig.text}
                    </span>
                  </TableCell>
                  <TableCell>
                    {/* Grid nút thao tác: Đẹu đằng như các page khác */}
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(btn.actionPrimary, "w-28")}
                        onClick={() => {
                          setSelectedCountsheet(c);
                          setDialogMode("view");
                          setIsDetailOpen(true);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(btn.actionPrimary, "w-28")}
                        onClick={() => {
                          setSelectedCountsheet(c);
                          setDialogMode("approve");
                          setIsDetailOpen(true);
                        }}
                      >
                        Phê duyệt
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(btn.actionPrimary, "w-28")}
                        onClick={() => {
                          setSelectedCountsheet(c);
                          setIsEditOpen(true);
                        }}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Phân trang dữ liệu */}
        <div className={page.pagination}>
          <div className={page.paginationText}>
            Hiển thị{" "}
            <span className="font-medium">{paginatedCountsheets.length}</span>{" "}
            trên <span className="font-medium">{filtered.length}</span> phiếu
            kiểm kê
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

      {/* Các Dialog điều hướng */}
      <DetailCountsheetDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        countsheet={selectedCountsheet}
        mode={dialogMode}
      />

      <NewCountsheetDialog open={isNewOpen} onOpenChange={setIsNewOpen} />

      <EditCountsheetDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        countsheet={selectedCountsheet}
      />
    </div>
  );
}
