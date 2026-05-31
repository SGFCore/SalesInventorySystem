import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Category, Producttype } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditCatDialog } from "@/pages/5.1-category-management-page/EditCatDialog";
import { NewCatDialog } from "@/pages/5.1-category-management-page/NewCatDialog";
import { DetailCatDialog } from "@/pages/5.1-category-management-page/DetailCatDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2, Eye, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function CatManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<Producttype[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // Dialog states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [catData, typeData] = await Promise.all([
        api.categories.list(),
        api.productTypes.list()
      ]);
      setCategories(catData || []);
      setProductTypes(typeData || []);
    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu danh mục");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
    c.categoryname.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = async (category: Category, type: "edit" | "delete" | "detail") => {
    setSelectedCategory(category);
    if (type === "detail") setIsDetailOpen(true);
    if (type === "edit") setIsEditOpen(true);
    if (type === "delete") {
      const hasTypes = productTypes.some(t => t.categoryid === category.id);
      if (hasTypes) {
        toast.error("Không thể xóa danh mục đang có loại sản phẩm bên trong!");
        return;
      }

      if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.categoryname}"?`)) {
        try {
          await api.categories.delete(category.id);
          toast.success("Xóa danh mục thành công!");
          loadData();
        } catch (error: any) {
          toast.error("Xóa danh mục thất bại: " + error.message);
        }
      }
    }
  };

  const getTypeCount = (catId: number) => {
    return productTypes.filter(t => t.categoryid === catId).length;
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
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu...</span>
          </div>
        ) : paginatedCategories.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy danh mục nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedCategories.map((c) => {
                  const tCount = getTypeCount(c.id);
                  return (
                    <TableRow
                      key={c.id}
                      className={page.tableRow}
                    >
                      <TableCell className={cn("w-20", entity.id)}>
                        {c.id}
                      </TableCell>
                      <TableCell className={cn("text-left", entity.name)}>
                        <div className="flex flex-col">
                          <span>{c.categoryname}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5 tracking-tight">
                            Số lượng loại sản phẩm: {tCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(btn.actionSecondary, "w-28")}
                            onClick={() => openAction(c, "detail")}
                          >
                            <Eye className="w-4 h-4 mr-1.5" /> Xem chi tiết
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(btn.actionPrimary, "w-28")}
                            onClick={() => openAction(c, "edit")}
                          >
                            Cập nhật
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              btn.actionDestructive, 
                              "w-28",
                              tCount > 0 && "opacity-30 cursor-not-allowed grayscale pointer-events-none"
                            )}
                            disabled={tCount > 0}
                            onClick={() => openAction(c, "delete")}
                          >
                            <Trash2 className="w-4 h-4 mr-1.5" /> Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
      <DetailCatDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        category={selectedCategory}
        productTypes={productTypes}
      />
      <EditCatDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        cat={selectedCategory}
        onSave={loadData}
      />
      <NewCatDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadData}
      />
    </div>
  );
}
