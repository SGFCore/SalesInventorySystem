import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Combo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailComboDialog } from "@/pages/6.2-combo-management/DetailComboDialog";
import { NewComboDialog } from "@/pages/6.2-combo-management/NewComboDialog";
import { page, btn, entity, input } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Giả lập dữ liệu mẫu gồm 45 combo để test phân trang
const MOCK_COMBOS: Combo[] = Array.from({ length: 45 }, (_, i) => ({
  ComboID: 501 + i,
  ComboPrice: (i + 1) * 450000,
}));

const ITEMS_PER_PAGE = 20;

export default function ComboManagementPage() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCombos(MOCK_COMBOS);
  }, []);

  // Reset về trang 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo Mã Combo
  const filteredCombos = combos.filter((c) =>
    c.ComboID.toString().includes(search.trim()),
  );

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
        <Table>
          <TableBody>
            {paginatedCombos.map((combo) => (
              <TableRow
                key={combo.ComboID}
                className={page.tableRow}
              >
                {/* Thông tin chung (Mã Combo) */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <div className={entity.rowMeta}>
                      <span className="text-sm font-bold text-slate-900">
                        Mã Combo: {combo.ComboID}
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
                      {combo.ComboPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </TableCell>

                {/* Các nút hành động có grid ngang bằng nhau giống ProductManagementPage */}
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(btn.actionSecondary, "w-full")}
                    onClick={() => handleDetailClick(combo)}
                  >
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Bộ điều khiển Phân trang */}
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
      </div>

      {/* Đăng ký các Dialog liên quan */}
      <DetailComboDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        combo={selectedCombo}
      />

      <NewComboDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
