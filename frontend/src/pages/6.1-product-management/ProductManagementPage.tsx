import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmp } from "@/context/empContext";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailProductDialog } from "@/pages/6.1-product-management/DetailProductDialog";
import { EditProductDialog } from "@/pages/6.1-product-management/EditProductDialog";
import { NewProductDialog } from "@/pages/6.1-product-management/NewProductDialog";
import { page, btn, entity, input } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Giả lập dữ liệu mẫu gồm 45 sản phẩm để test phân trang
const MOCK_PRODUCTS: Product[] = Array.from({ length: 45 }, (_, i) => ({
  ProductID: 201 + i,
  ProductName: `Sản phẩm mẫu ${i + 1}`,
  Detail: `Mô tả chi tiết cho sản phẩm mẫu thứ ${i + 1}. Sản phẩm chất lượng cao đạt tiêu chuẩn quốc tế.`,
  ProductPrice: (i + 1) * 150000,
  ProductStatus: i % 4 === 0 ? 0 : 1, // Đang kinh doanh hoặc Ngừng kinh doanh
  CategoryName: i % 2 === 0 ? "Thiết bị điện tử" : "Gia dụng & Đời sống",
  AllowReturn: i % 3 === 0 ? 0 : 1,
  ImageURL: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  ProductTypeName: i % 2 === 0 ? "Hàng cao cấp" : "Hàng phổ thông",
}));

const ITEMS_PER_PAGE = 20;

export default function ProductManagementPage() {
  const { hasRole } = useEmp();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
  }, []);

  // Reset về trang 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo tên sản phẩm
  const filteredProducts = products.filter((p) =>
    p.ProductName.toLowerCase().includes(search.toLowerCase()),
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleDetailClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
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
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      {/* Product Table */}
      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow
                key={product.ProductID}
                className={page.tableRow}
              >
                {/* Thông tin chung (ID, Tên, Trạng thái) */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <div className={entity.rowMeta}>
                      <span className={entity.id}>{product.ProductID}</span>
                      <span className={entity.separator}>·</span>
                      <span
                        className={cn(entity.name, product.ProductStatus === 0 && entity.nameInactive)}
                      >
                        {product.ProductName}
                      </span>
                    </div>
                    <div
                      className={cn(product.ProductStatus === 1 ? entity.statusActive : entity.statusInactive)}
                    >
                      {product.ProductStatus === 1
                        ? "Đang kinh doanh"
                        : "Đã ngừng kinh doanh"}
                    </div>
                  </div>
                </TableCell>

                {/* Danh mục, Loại sản phẩm và Giá cả */}
                <TableCell>
                  <div
                    className={cn(
                      "flex flex-col items-start text-sm",
                      product.ProductStatus === 0
                        ? "text-slate-300"
                        : "text-black",
                    )}
                  >
                    <span className={entity.cellMeta}>
                      {product.CategoryName} • {product.ProductTypeName}
                    </span>
                    <span className={cn(entity.price, 'mt-0.5')}>
                      {product.ProductPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </TableCell>

                {/* Các nút hành động với grid bằng nhau */}
                <TableCell>
                  <div className="grid grid-cols-3 gap-2 w-full max-w-[400px] ml-auto">
                    {/* Cột 1: Xem chi tiết */}
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(btn.actionSecondary, "w-full")}
                      onClick={() => handleDetailClick(product)}
                    >
                      Xem chi tiết
                    </Button>

                    {/* Cột 2: Cập nhật */}
                    {hasRole(1) && (
                      <Button
                        disabled={product.ProductStatus === 0}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full"
                        onClick={() => handleEditClick(product)}
                      >
                        Cập nhật
                      </Button>
                    )}

                    {/* Cột 3: Trạng thái Kinh doanh */}
                    {hasRole(1) && (
                      <>
                        {product.ProductStatus === 1 ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full"
                          >
                            Ngưng KD
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(btn.actionSecondary, "w-full")}
                          >
                            KD lại
                          </Button>
                        )}
                      </>
                    )}
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
            <span className="font-medium">{paginatedProducts.length}</span> trên{" "}
            <span className="font-medium">{filteredProducts.length}</span> sản
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

      {/* Đăng ký các Dialog liên quan */}
      <DetailProductDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        product={selectedProduct}
      />

      <EditProductDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        product={selectedProduct}
      />

      <NewProductDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
