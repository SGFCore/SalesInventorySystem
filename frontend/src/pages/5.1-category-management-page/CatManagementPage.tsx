import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditCatDialog } from "@/pages/5.1-category-management-page/EditCatDialog";
import { NewCatDialog } from "@/pages/5.1-category-management-page/NewCatDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function CatManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
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

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await api.categories.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu");
        setCategories([]);
      } else {
        setCategories(data);
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu danh mục");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Reset về trang 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Cuộn lên đầu khi đổi trang
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Logic lọc và phân trang
  const filtered = categories.filter((c) =>
    c.CategoryName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = async (category: Category, type: "edit" | "delete") => {
    if (type === "edit") {
      setSelectedCategory(category);
      setIsEditOpen(true);
    }
    if (type === "delete") {
      if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.CategoryName}"?`)) {
        try {
          await api.categories.delete(category.CategoryID);
          toast.success("Xóa danh mục thành công!");
          loadCategories();
        } catch (error: any) {
          toast.error("Xóa danh mục thất bại: " + error.message);
        }
      }
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu danh mục...</span>
          </div>
        ) : paginatedCategories.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy danh mục nào hợp lệ.
          </div>
        ) : (
          <>
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
            {totalPages > 0 && (
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
            )}
          </>
        )}
      </div>

      {/* Dialogs */}
      <EditCatDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        cat={selectedCategory}
        onSave={loadCategories}
      />
      <NewCatDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadCategories}
      />
    </div>
  );
}
