import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EditProductTypeDialog } from "@/pages/5.2-producttype-management-page/EditProductTypeDialog";
import { NewProductTypeDialog } from "@/pages/5.2-producttype-management-page/NewProductTypeDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Định nghĩa interface cho ProductType dựa theo logic của danh mục mẫu
export interface ProductType {
  ProductTypeID: number;
  ProductTypeName: string;
}

// Dữ liệu mẫu giả lập prototype cho Loại sản phẩm (25 mục)
const MOCK_PRODUCT_TYPES: ProductType[] = Array.from(
  { length: 25 },
  (_, i) => ({
    ProductTypeID: 200 + i,
    ProductTypeName:
      [
        "Điện thoại thông minh",
        "Laptop văn phòng",
        "Máy tính bảng",
        "Đồng hồ thông minh",
        "Tai nghe không dây",
      ][i % 5] + ` Thế hệ ${Math.floor(i / 5) + 1}`,
  }),
);

const ITEMS_PER_PAGE = 10;

export default function ProductTypeManagementPage() {
  const [search, setSearch] = useState("");
  const [selectedProductType, setSelectedProductType] =
    useState<ProductType | null>(null);

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
  const filtered = MOCK_PRODUCT_TYPES.filter((pt) =>
    pt.ProductTypeName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProductTypes = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (productType: ProductType, type: "edit" | "delete") => {
    if (type === "edit") {
      setSelectedProductType(productType);
      setIsEditOpen(true);
    }
    if (type === "delete") {
      // Thực hiện logic xóa trực tiếp hoặc qua alert-dialog tùy nhu cầu
      console.log("Xóa loại sản phẩm:", productType.ProductTypeID);
    }
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
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm loại sản phẩm mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedProductTypes.map((pt) => (
              <TableRow
                key={pt.ProductTypeID}
                className={page.tableRow}
              >
                <TableCell className={cn("w-20", entity.id)}>
                  {pt.ProductTypeID}
                </TableCell>
                <TableCell className={cn("text-left", entity.name)}>
                  {pt.ProductTypeName}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className={btn.actionPrimary}
                      onClick={() => openAction(pt, "edit")}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={btn.actionDestructive}
                      onClick={() => openAction(pt, "delete")}
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
            <span className="font-medium">{paginatedProductTypes.length}</span>{" "}
            trên <span className="font-medium">{filtered.length}</span> loại sản
            phẩm
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
      <EditProductTypeDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        productType={selectedProductType}
      />
      <NewProductTypeDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
