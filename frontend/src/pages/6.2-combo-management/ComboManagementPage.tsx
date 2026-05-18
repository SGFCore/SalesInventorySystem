import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Combo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailComboDialog } from "@/pages/6.2-combo-management/DetailComboDialog";
import { NewComboDialog } from "@/pages/6.2-combo-management/NewComboDialog";

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
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm theo mã combo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-slate-200 focus:ring-blue-600"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm combo mới
        </Button>
      </div>

      {/* Combo Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {paginatedCombos.map((combo) => (
              <TableRow
                key={combo.ComboID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                {/* Thông tin chung (Mã Combo) */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 text-xs text-slate-300 mb-0.5">
                      <span className="text-sm font-bold text-slate-900">
                        Mã Combo: {combo.ComboID}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Giá combo */}
                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-xs text-slate-500">
                      Giá bán combo
                    </span>
                    <span className="font-semibold text-blue-600 mt-0.5">
                      {combo.ComboPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </TableCell>

                {/* Các nút hành động có grid ngang bằng nhau giống ProductManagementPage */}
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-slate-600 hover:bg-slate-100 w-full"
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
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-slate-500">
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
              className="h-8 w-8 p-0"
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
                      "h-8 w-8 p-0 text-white",
                      currentPage === page ? "bg-blue-600" : "text-slate-600",
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
              className="h-8 w-8 p-0"
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
