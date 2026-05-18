import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditCatDialog } from "@/pages/5.1-category-management-page/EditCatDialog";
import { NewCatDialog } from "@/pages/5.1-category-management-page/NewCatDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
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
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <Input
          placeholder="Tìm kiếm danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={input.search}
        />
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm danh mục mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedCategories.map((c) => (
              <TableRow
                key={c.CategoryID}
                className={page.tableRow}
              >
                <TableCell className={cn("w-20", entity.id)}>
                  {c.CategoryID}
                </TableCell>
                <TableCell className={cn("text-left", entity.name)}>
                  {c.CategoryName}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className={btn.actionPrimary}
                      onClick={() => openAction(c, "edit")}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={btn.actionDestructive}
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
        <div className={page.pagination}>
          <div className={page.paginationText}>
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
