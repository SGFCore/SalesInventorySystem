import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EditProductTypeDialog } from "@/pages/5.2-producttype-management-page/EditProductTypeDialog";
import { NewProductTypeDialog } from "@/pages/5.2-producttype-management-page/NewProductTypeDialog";
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
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Tìm kiếm loại sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-slate-200 focus:ring-blue-600"
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm loại sản phẩm mới
        </Button>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {paginatedProductTypes.map((pt) => (
              <TableRow
                key={pt.ProductTypeID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                <TableCell className="w-20 font-medium text-slate-500">
                  {pt.ProductTypeID}
                </TableCell>
                <TableCell className="font-semibold text-left">
                  {pt.ProductTypeName}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
                      onClick={() => openAction(pt, "edit")}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
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
        <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
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
      <EditProductTypeDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        productType={selectedProductType}
      />
      <NewProductTypeDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
