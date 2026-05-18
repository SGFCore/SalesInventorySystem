import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmp } from "@/context/empContext";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailProductDialog } from "@/pages/6.1-product-management/DetailProductDialog";
import { EditProductDialog } from "@/pages/6.1-product-management/EditProductDialog";
import { NewProductDialog } from "@/pages/6.1-product-management/NewProductDialog";

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
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm theo tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-slate-200 focus:ring-blue-600"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      {/* Product Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow
                key={product.ProductID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                {/* Thông tin chung (ID, Tên, Trạng thái) */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 text-xs text-slate-300 mb-0.5">
                      <div className="text-black">{product.ProductID}</div> -
                      <span
                        className={cn(
                          "font-bold text-sm",
                          product.ProductStatus === 1 && "text-black",
                        )}
                      >
                        {product.ProductName}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "italic text-[10px]",
                        product.ProductStatus === 1
                          ? "text-green-500"
                          : "text-slate-300",
                      )}
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
                    <span className="font-medium text-xs text-slate-500">
                      {product.CategoryName} • {product.ProductTypeName}
                    </span>
                    <span className="font-semibold text-blue-600 mt-0.5">
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
                      className="text-slate-600 hover:bg-slate-100 w-full"
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
                        className="text-blue-600 border-blue-100 hover:bg-blue-50 w-full"
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
                            className="text-red-500 hover:bg-red-100 hover:text-red-600 border-red-500 w-full"
                          >
                            Ngưng KD
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-slate-600 hover:bg-slate-100 w-full"
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
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-slate-500">
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
