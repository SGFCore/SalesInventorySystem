import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EditProductTypeDialog } from "@/pages/5.2-producttype-management-page/EditProductTypeDialog";
import { NewProductTypeDialog } from "@/pages/5.2-producttype-management-page/NewProductTypeDialog";
import { DetailProductTypeDialog } from "@/pages/5.2-producttype-management-page/DetailProductTypeDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2, Eye, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Producttype, Product } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function ProductTypeManagementPage() {
  const [productTypes, setProductTypes] = useState<Producttype[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProductType, setSelectedProductType] =
    useState<Producttype | null>(null);

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
      const [typeData, productData] = await Promise.all([
        api.productTypes.list(),
        api.products.list()
      ]);
      setProductTypes(typeData || []);
      setProducts(productData || []);
    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu");
      setProductTypes([]);
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
  const filtered = productTypes.filter((pt) =>
    pt.producttypename.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProductTypes = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = async (
    productType: Producttype,
    type: "edit" | "delete" | "detail",
  ) => {
    setSelectedProductType(productType);
    if (type === "detail") setIsDetailOpen(true);
    if (type === "edit") setIsEditOpen(true);
    if (type === "delete") {
      const hasProducts = products.some(p => p.ProductTypeID === productType.id);
      if (hasProducts) {
        toast.error("Không thể xóa loại sản phẩm đang có sản phẩm bên trong!");
        return;
      }

      if (
        window.confirm(
          `Bạn có chắc chắn muốn xóa loại sản phẩm "${productType.producttypename}"?`,
        )
      ) {
        try {
          await api.productTypes.delete(productType.id);
          toast.success("Xóa loại sản phẩm thành công!");
          loadData();
        } catch (error: any) {
          toast.error("Xóa loại sản phẩm thất bại: " + error.message);
        }
      }
    }
  };

  const getProductCount = (typeId: number) => {
    return products.filter(p => p.ProductTypeID === typeId).length;
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <Input
          placeholder="Tìm kiếm loại sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={input.search}
        />
        <Button className={btn.primary} onClick={() => setIsNewOpen(true)}>
          Thêm loại sản phẩm mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">
              Đang tải dữ liệu...
            </span>
          </div>
        ) : paginatedProductTypes.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy loại sản phẩm nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedProductTypes.map((pt) => {
                  const pCount = getProductCount(pt.id);
                  return (
                    <TableRow key={pt.id} className={page.tableRow}>
                      <TableCell className={cn("w-20", entity.id)}>
                        {pt.id}
                      </TableCell>
                      <TableCell className={cn("text-left", entity.name)}>
                        <div className="flex flex-col">
                          <span>{pt.producttypename}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase mt-0.5 tracking-tight">
                            Số lượng sản phẩm: {pCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(btn.actionSecondary, "w-28")}
                            onClick={() => openAction(pt, "detail")}
                          >
                            <Eye className="w-4 h-4 mr-1.5" /> Xem chi tiết
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(btn.actionPrimary, "w-28")}
                            onClick={() => openAction(pt, "edit")}
                          >
                            Cập nhật
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              btn.actionDestructive, 
                              "w-28",
                              pCount > 0 && "opacity-30 cursor-not-allowed grayscale pointer-events-none"
                            )}
                            disabled={pCount > 0}
                            onClick={() => openAction(pt, "delete")}
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
                  <span className="font-medium">
                    {paginatedProductTypes.length}
                  </span>{" "}
                  trên <span className="font-medium">{filtered.length}</span>{" "}
                  loại sản phẩm
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={cn(
                            currentPage === pageNum
                              ? btn.paginationActive
                              : btn.paginationInactive,
                          )}
                        >
                          {pageNum}
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
      <DetailProductTypeDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        productType={selectedProductType}
        products={products}
      />
      <EditProductTypeDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        productType={selectedProductType}
        onSave={loadData}
      />
      <NewProductTypeDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadData}
      />
    </div>
  );
}
