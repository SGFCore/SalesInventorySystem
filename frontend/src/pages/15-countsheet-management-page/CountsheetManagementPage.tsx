import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { CountSheet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailCountsheetDialog } from "@/pages/15-countsheet-management-page/DetailCountsheetDialog";
import { EditCountsheetDialog } from "@/pages/15-countsheet-management-page/EditCountsheetDialog";
import { NewCountsheetDialog } from "@/pages/15-countsheet-management-page/NewCountsheetDialog";
import { page, input, btn } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const MAP_STATUS: Record<number, { text: string; className: string }> = {
  0: { text: "Chưa kiểm kê", className: "bg-slate-50 text-slate-600 border-slate-200" },
  1: { text: "Chờ phê duyệt", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  2: { text: "Đã phê duyệt", className: "bg-green-50 text-green-700 border-green-200" },
  3: { text: "Từ chối, cần kiểm lại", className: "bg-red-50 text-red-700 border-red-200" },
  4: { text: "Đã hủy", className: "bg-slate-100 text-slate-400 border-slate-200 line-through" },
};

const ITEMS_PER_PAGE = 10;

export default function CountsheetManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countsheets, setCountsheets] = useState<CountSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountsheet, setSelectedCountsheet] =
    useState<CountSheet | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  const loadCountSheets = async () => {
    setLoading(true);
    try {
      const data = await api.countSheets.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu phiếu kiểm kho");
        setCountsheets([]);
      } else {
        setCountsheets(data.sort((a, b) => b.CountSheetId - a.CountSheetId));
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải phiếu kiểm kho");
      setCountsheets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountSheets();
  }, []);

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

  const filtered = countsheets.filter((c) =>
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
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedCountsheets.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy phiếu kiểm kho nào.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedCountsheets.map((c) => {
                  const statusConfig = MAP_STATUS[c.Status] || {
                    text: "Không rõ",
                    className: "bg-slate-100 text-slate-400",
                  };
                  return (
                    <TableRow
                      key={c.CountSheetId}
                      className={page.tableRow}
                    >
                      <TableCell className="w-24 font-bold text-slate-500">
                        #{c.CountSheetId}
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs font-semibold">
                        Ngày tạo: {new Date(c.CreatedDate).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "font-bold text-xs px-2.5 py-0.5 rounded-full border",
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
                            className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
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
                            className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                            disabled={c.Status === 2 || c.Status === 4}
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
                            className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                            disabled={c.Status === 2 || c.Status === 4}
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

            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium text-slate-900">{paginatedCountsheets.length}</span>{" "}
                  trên <span className="font-medium text-slate-900">{filtered.length}</span> phiếu kiểm kê
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
            )}
          </>
        )}
      </div>

      {/* Các Dialog điều hướng */}
      <DetailCountsheetDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        countsheet={selectedCountsheet}
        mode={dialogMode}
        onSave={loadCountSheets}
      />

      <NewCountsheetDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadCountSheets}
      />

      {selectedCountsheet && (
        <EditCountsheetDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          countsheet={selectedCountsheet}
          onSave={loadCountSheets}
        />
      )}
    </div>
  );
}
