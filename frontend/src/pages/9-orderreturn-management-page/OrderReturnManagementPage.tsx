import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { OrderReturn } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailOrderReturnDialog } from "@/pages/9-orderreturn-management-page/DetailOrderReturnDialog";
import { NewOrderReturnDialog } from "@/pages/9-orderreturn-management-page/NewOrderReturnDialog";
import { page, btn, entity, input } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Giả lập dữ liệu mẫu gồm 45 đơn hoàn tiền để chạy phân trang
const MOCK_ORDER_RETURNS: OrderReturn[] = Array.from(
  { length: 45 },
  (_, i) => ({
    ReturnID: 1001 + i,
    OrderName: `Đơn hàng #ORD-${2500 + i}`,
    EmployeeName: i % 2 === 0 ? "Nguyễn Văn A" : "Trần Thị B",
    ReturnDate: new Date(2026, 4, 1 + (i % 15)),
    Reason:
      i % 3 === 0
        ? "Sản phẩm lỗi kỹ thuật"
        : i % 3 === 1
          ? "Sai màu sắc kích thước"
          : "Khách đổi ý",
    TotalRefund: (i + 1) * 150000,
    ReturnRefCode: `REF-${8000 + i}`,
    Status: i % i === 0 ? "Đã duyệt" : "Chờ xử lý",
  }),
);

const ITEMS_PER_PAGE = 20;

export default function OrderReturnManagementPage() {
  const [orderReturns, setOrderReturns] = useState<OrderReturn[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrderReturn, setSelectedOrderReturn] =
    useState<OrderReturn | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setOrderReturns(MOCK_ORDER_RETURNS);
  }, []);

  // Reset về trang 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo Mã hoàn tiền
  const filteredReturns = orderReturns.filter((item) =>
    item.ReturnID.toString().includes(search.trim()),
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredReturns.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReturns = filteredReturns.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleDetailClick = (orderReturn: OrderReturn) => {
    setSelectedOrderReturn(orderReturn);
    setIsDetailOpen(true);
  };

  const handleAcceptClick = (returnId: number) => {
    alert(`Đã chấp nhận đơn hoàn tiền mã: #${returnId}`);
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
            placeholder="Tìm kiếm theo mã hoàn tiền..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Tạo yêu cầu hoàn tiền
        </Button>
      </div>

      {/* Order Return Table */}
      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedReturns.map((item) => (
              <TableRow
                key={item.ReturnID}
                className={page.tableRow}
              >
                {/* Thông tin Mã và Ngày hoàn tiền */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-slate-900">
                      #{item.ReturnID}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      Ngày tạo: {item.ReturnDate.toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </TableCell>

                {/* Thông tin tổng tiền hoàn tiền */}
                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className={entity.cellMeta}>
                      Tổng tiền hoàn tiền
                    </span>
                    <span className={cn(entity.price, 'mt-0.5')}>
                      {item.TotalRefund.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </TableCell>

                {/* Các button hành động */}
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(btn.actionSecondary, "w-32")}
                      onClick={() => handleDetailClick(item)}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      size="sm"
                      className={cn(btn.primary, "w-32")}
                      onClick={() => handleAcceptClick(item.ReturnID)}
                    >
                      Chấp nhận
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
            <span className="font-medium">{paginatedReturns.length}</span> trên{" "}
            <span className="font-medium">{filteredReturns.length}</span> đơn
            hàng
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
                    className={currentPage === pageNum ? btn.paginationActive : btn.paginationInactive}
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
      <DetailOrderReturnDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        orderReturn={selectedOrderReturn}
      />

      <NewOrderReturnDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
