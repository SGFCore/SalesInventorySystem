import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Discount, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailDiscountDialog } from "@/pages/7.2-discount-management-page/DetailDiscountDialog";
import { EditDiscountDialog } from "@/pages/7.2-discount-management-page/EditDiscountDialog";
import { NewDiscountDialog } from "@/pages/7.2-discount-management-page/NewDiscountDialog";
import { page, btn, entity, input, badge } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Sample data Sản phẩm cho prototype
export const MOCK_PRODUCTS = [
  { ProductID: 101, ProductName: "Cà phê Espresso" },
  { ProductID: 102, ProductName: "Trà sữa Trân châu" },
  { ProductID: 103, ProductName: "Bánh ngọt Tiramisu" },
  { ProductID: 104, ProductName: "Sinh tố Xoài" },
];

// Giả lập dữ liệu mẫu gồm 45 khuyến mãi để test phân trang
const MOCK_DISCOUNTS: Discount[] = Array.from({ length: 45 }, (_, i) => {
  const productIndex = i % MOCK_PRODUCTS.length;
  return {
    DiscountID: 701 + i,
    CustomerTypeID: (i % 3) + 1,
    DiscountName: `Khuyến mãi hè rực rỡ đợt ${i + 1}`,
    Value: (i + 1) * 10000,
    Detail: `Chương trình giảm giá tri ân khách hàng đợt ${i + 1} áp dụng trên toàn hệ thống.`,
    Status: i % 3, // 0: Chờ chạy, 1: Đang chạy, 2: Tạm dừng
    StartDate: new Date(2026, 5, 1),
    ExpiryDate: new Date(2026, 6, 1),
    AppliedProductID: MOCK_PRODUCTS[productIndex].ProductID.toString(),
  };
});

const ITEMS_PER_PAGE = 20;

export default function DiscountManagementPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setDiscounts(MOCK_DISCOUNTS);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredDiscounts = discounts.filter((d) =>
    d.DiscountName.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDiscounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDiscounts = filteredDiscounts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleDetailClick = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDetailOpen(true);
  };

  const handleEditClick = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsEditOpen(true);
  };

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Chờ chạy";
      case 1:
        return "Đang chạy";
      case 2:
        return "Tạm dừng";
      default:
        return "Không xác định";
    }
  };

  const getStatusClass = (status: number) => {
    switch (status) {
      case 0:
        return "text-amber-500 font-medium";
      case 1:
        return "text-green-600 font-medium";
      case 2:
        return "text-red-500 font-medium";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      {/* Header Controls */}
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo tên khuyến mãi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button className={btn.primary} onClick={() => setIsNewOpen(true)}>
          Thêm khuyến mãi mới
        </Button>
      </div>

      {/* Discount Table */}
      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedDiscounts.map((discount) => {
              const appliedProduct = MOCK_PRODUCTS.find(
                (p) => p.ProductID.toString() === discount.AppliedProductID,
              );

              return (
                <TableRow key={discount.DiscountID} className={page.tableRow}>
                  {/* Thông tin chung (Mã & Tên) */}
                  <TableCell>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 text-xs mb-0.5">
                        <span className={entity.id}>{discount.DiscountID}</span>
                        <span>•</span>
                        <span className="text-slate-500 font-medium">
                          SP:{" "}
                          {appliedProduct
                            ? appliedProduct.ProductName
                            : "Không xác định"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {discount.DiscountName}
                      </span>
                    </div>
                  </TableCell>

                  {/* Giá trị giảm giá */}
                  <TableCell>
                    <div className="flex flex-col items-start text-sm">
                      <span className={entity.cellMeta}>Mức giảm giá</span>
                      <span className={cn(entity.price, "mt-0.5")}>
                        {discount.Value.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </TableCell>

                  {/* Trạng thái */}
                  <TableCell>
                    <div className="flex flex-col items-start text-xs">
                      <span className="text-slate-400 mb-0.5">Trạng thái</span>
                      {discount.Status === 1 ? (
                        <Badge
                          variant="outline"
                          className={cn(badge.base, badge.success)}
                        >
                          {getStatusLabel(discount.Status)}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className={cn(badge.base, badge.danger)}
                        >
                          {getStatusLabel(discount.Status)}
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  {/* Nút hành động */}
                  <TableCell>
                    <div className="grid grid-cols-2 gap-2 w-full max-w-[260px] ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(btn.actionSecondary, "w-full")}
                        onClick={() => handleDetailClick(discount)}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full"
                        onClick={() => handleEditClick(discount)}
                      >
                        Cập nhật
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Bộ điều khiển Phân trang */}
        <div className={page.pagination}>
          <div className={page.paginationText}>
            Hiển thị{" "}
            <span className="font-medium">{paginatedDiscounts.length}</span>{" "}
            trên <span className="font-medium">{filteredDiscounts.length}</span>{" "}
            khuyến mãi
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
      </div>

      <DetailDiscountDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        discount={selectedDiscount}
      />

      <NewDiscountDialog open={isNewOpen} onOpenChange={setIsNewOpen} />

      <EditDiscountDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        discount={selectedDiscount}
      />
    </div>
  );
}
