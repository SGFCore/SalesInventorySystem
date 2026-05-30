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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronLeft, ChevronRight, Loader2, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

export default function ProductManagementPage() {
  const { hasRole } = useEmp();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  // New state for inventory totals
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [totalQuantities, setTotalQuantities] = useState<Record<number, number>>({});
  const [totalByWarehouse, setTotalByWarehouse] = useState<Record<number, Record<number, number>>>({});
  const [warehouseMap, setWarehouseMap] = useState<Record<number, number>>({});


  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = async () => {
    setLoading(true);
    setInventoryLoading(true);
    try {
      const [productData, inventoryData, warehouseData, categoryData, typeData] = await Promise.all([
        api.products.list(),
        api.detailInventories.list(),
        api.warehouses.list(),
        api.categories.list(),
        api.productTypes.list(),
      ]);
      
      setCategories(categoryData || []);
      setProductTypes(typeData || []);

      if (!productData || productData.length === 0) {
        toast.error("Không có dữ liệu");
        setProducts([]);
      } else {
        setProducts(productData);
      }
      // Compute total quantities per product
      const qtyMap: Record<number, number> = {};
      const byWarehouse: Record<number, Record<number, number>> = {};
      const whMap: Record<number, number> = {};
      // Build warehouse ID -> type map
      warehouseData.forEach((wh: any) => {
        whMap[wh.WareHouseID] = wh.WarehouseType as number;
      });
setWarehouseMap(whMap);
      inventoryData.forEach((inv: any) => {
        const pid = inv.ProductID as number;
        const wid = inv.WarehouseID as number;
        const wtype = whMap[wid];
        // total available quantity per product
        qtyMap[pid] = (qtyMap[pid] || 0) + (inv.AvailableStock as number);
        // per warehouse type
        if (!byWarehouse[pid]) byWarehouse[pid] = {};
        byWarehouse[pid][wtype] = (byWarehouse[pid][wtype] || 0) + (inv.AvailableStock as number);
      });
      setTotalByWarehouse(byWarehouse);
      setTotalQuantities(qtyMap);
    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu");
      setProducts([]);
      setTotalQuantities({});
    } finally {
      setLoading(false);
      setInventoryLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
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

  const handleToggleStatus = async (product: Product) => {
    const newStatus = product.ProductStatus === 1 ? 0 : 1;
    const actionName = newStatus === 1 ? "kinh doanh lại" : "ngừng kinh doanh";
    if (window.confirm(`Bạn có chắc chắn muốn ${actionName} sản phẩm "${product.ProductName}"?`)) {
      try {
        await api.products.update(product.ProductID, {
          ...product,
          ProductStatus: newStatus,
        });
        toast.success(`Đã chuyển trạng thái sản phẩm sang ${newStatus === 1 ? "đang kinh doanh" : "ngừng kinh doanh"}!`);
        loadProducts();
      } catch (error: any) {
        toast.error(`Đổi trạng thái sản phẩm thất bại: ${error.message}`);
      }
    }
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu sản phẩm...</span>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy sản phẩm nào hợp lệ.
          </div>
        ) : (
          <>
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
                          DM: {categories.find(c => c.id === product.CategoryID)?.categoryname || product.CategoryID} • 
                          Loại: {productTypes.find(t => t.id === product.ProductTypeID)?.producttypename || product.ProductTypeID} • 
                          SL: {totalQuantities[product.ProductID]}
                        </span>
                        <span className={entity.cellMeta}>
                          Kho gốc: {totalByWarehouse[product.ProductID]?.[1] ?? 0} • 
                          Kho trưng bày: {totalByWarehouse[product.ProductID]?.[2] ?? 0} • Kho lỗi: {totalByWarehouse[product.ProductID]?.[3] ?? 0}
                        </span>
                        <span className={cn(entity.price, 'mt-0.5')}>
                          {product.ProductPrice.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    {/* Các nút hành động */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-slate-200 min-w-[140px]">
                          <DropdownMenuItem className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 font-medium" onClick={() => handleDetailClick(product)}>
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 font-medium" onClick={() => handleEditClick(product)}>
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 font-medium" onClick={() => handleToggleStatus(product)}>
                            {product.ProductStatus === 1 ? "Ngừng kinh doanh" : "Kinh doanh lại"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                  <span className="font-medium">{paginatedProducts.length}</span> trên{" "}
                  <span className="font-medium">{filteredProducts.length}</span> sản phẩm
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

      {/* Đăng ký các Dialog liên quan */}
      <DetailProductDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        product={selectedProduct}
        loading={inventoryLoading}
        totalQuantity={selectedProduct ? totalQuantities[selectedProduct.ProductID] ?? null : null}
        categories={categories}
        productTypes={productTypes}
      />

      <EditProductDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        product={selectedProduct}
        onSave={loadProducts}
      />

      <NewProductDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadProducts}
      />
    </div>
  );
}
