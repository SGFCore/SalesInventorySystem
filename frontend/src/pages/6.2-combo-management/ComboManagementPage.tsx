import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Combo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailComboDialog } from "@/pages/6.2-combo-management/DetailComboDialog";
import { NewComboDialog } from "@/pages/6.2-combo-management/NewComboDialog";
import { EditComboDetail } from "@/pages/6.2-combo-management/EditComboDetail";
import { page, btn, entity, input } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

export default function ComboManagementPage() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const loadCombos = async () => {
    setLoading(true);
    try {
      const data = await api.combos.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu");
        setCombos([]);
      } else {
        setCombos(data);
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu combo");
      setCombos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCombos();
  }, []);

  // Reset về trang 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo Mã Combo
  const filteredCombos = combos.filter((c) => {
    if (!c) return false;
    const safeSearch = (search || "").trim();
    const idStr = c.id != null ? String(c.id) : "";
    return idStr.includes(safeSearch);
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredCombos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCombos = filteredCombos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleDetailClick = (combo: Combo) => {
    setSelectedCombo(combo);
    setIsDetailOpen(true);
  };

  const handleEditClick = (combo: Combo) => {
    setSelectedCombo(combo);
    setIsEditOpen(true);
  };

  const handleDeleteClick = async (combo: Combo) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa combo "${combo.id}"? Hành động này cũng sẽ xóa các chi tiết sản phẩm liên quan trong combo.`
      )
    ) {
      setLoading(true);
      try {
        // 1. Tải danh sách chi tiết combo của combo cần xóa
        const allDetails = await api.comboDetails.list();
        const comboDetails = allDetails.filter((d) => d.comboId === combo.id);

        // 2. Xóa các chi tiết combo trước (do ràng buộc RESTRICT)
        await Promise.all(
          comboDetails.map((d) =>
            api.comboDetails.delete(combo.id, d.productId)
          )
        );

        // 3. Xóa combo chính
        await api.combos.delete(combo.id);

        toast.success("Xóa combo thành công!");
        loadCombos();
      } catch (error: any) {
        toast.error(error.message || "Xóa combo thất bại!");
      } finally {
        setLoading(false);
      }
    }
  };

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      {/* Header Controls */}
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo mã combo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm combo mới
        </Button>
      </div>

      {/* Combo Table */}
      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu combo...</span>
          </div>
        ) : paginatedCombos.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy combo nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedCombos.map((combo) => (
                  <TableRow
                    key={combo.id}
                    className={page.tableRow}
                  >
                    {/* Thông tin chung (Mã Combo) */}
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <div className={entity.rowMeta}>
                          <span className="text-sm font-bold text-slate-900">
                            Mã Combo: {combo.id}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Giá combo */}
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className={entity.cellMeta}>
                          Giá bán combo
                        </span>
                        <span className={cn(entity.price, 'mt-0.5')}>
                          {(combo.comboprice || 0).toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    {/* Các nút hành động */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={btn.actionSecondary}
                          onClick={() => handleDetailClick(combo)}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={btn.actionPrimary}
                          onClick={() => handleEditClick(combo)}
                        >
                          Sửa combo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={btn.actionDestructive}
                          onClick={() => handleDeleteClick(combo)}
                        >
                          Xóa combo
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
                  <span className="font-medium">{paginatedCombos.length}</span> trên{" "}
                  <span className="font-medium">{filteredCombos.length}</span> combo
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
                          className={cn(currentPage === pageNum ? btn.paginationActive : btn.paginationInactive)}
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

      {/* Đăng ký các Dialog liên quan */}
      <DetailComboDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        combo={selectedCombo}
      />

      <NewComboDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadCombos}
      />

      <EditComboDetail
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        combo={selectedCombo}
        onSave={loadCombos}
      />
    </div>
  );
}
