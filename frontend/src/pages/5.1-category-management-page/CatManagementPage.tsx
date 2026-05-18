import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditCatDialog } from "@/pages/5.1-category-management-page/EditCatDialog";
import { NewCatDialog } from "@/pages/5.1-category-management-page/NewCatDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Dữ liệu mẫu giả lập prototype
const MOCK_CATEGORIES: Category[] = Array.from({ length: 25 }, (_, i) => ({
  CategoryID: 100 + i,
  CategoryName:
    [
      "Linh kiện điện tử",
      "Thiết bị ngoại vi",
      "Màn hình hiển thị",
      "Phụ kiện máy tính",
      "Thiết bị mạng",
    ][i % 5] + ` ${Math.floor(i / 5) + 1}`,
}));

const ITEMS_PER_PAGE = 10;

export default function CatManagementPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Dialog states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Reset về trang 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Cuộn lên đầu khi đổi trang
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Logic lọc và phân trang
  const filtered = MOCK_CATEGORIES.filter((c) =>
    c.CategoryName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (category: Category, type: "edit" | "delete") => {
    if (type === "edit") {
      setSelectedCategory(category);
      setIsEditOpen(true);
    }
    if (type === "delete") {
      // Thực hiện logic xóa trực tiếp hoặc qua alert-dialog tùy nhu cầu
      console.log("Xóa danh mục:", category.CategoryID);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Tìm kiếm danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-slate-200 focus:ring-blue-600"
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm danh mục mới
        </Button>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {paginatedCategories.map((c) => (
              <TableRow
                key={c.CategoryID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                <TableCell className="w-20 font-medium text-slate-500">
                  {c.CategoryID}
                </TableCell>
                <TableCell className="font-semibold text-left">
                  {c.CategoryName}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
                      onClick={() => openAction(c, "edit")}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => openAction(c, "delete")}
                    >
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Bộ điều khiển Phân trang */}
        <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Hiển thị{" "}
            <span className="font-medium">{paginatedCategories.length}</span>{" "}
            trên <span className="font-medium">{filtered.length}</span> danh mục
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
                      "h-8 w-8 p-0 transition-none",
                      currentPage === page
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
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
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <EditCatDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        cat={selectedCategory}
      />
      <NewCatDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
