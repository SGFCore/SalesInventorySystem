import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { OrderReturn } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailOrderReturnDialog } from "@/pages/9-orderreturn-management-page/DetailOrderReturnDialog";
import { NewOrderReturnDialog } from "@/pages/9-orderreturn-management-page/NewOrderReturnDialog";
import { page, btn, entity, input } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

export default function OrderReturnManagementPage() {
  const [orderReturns, setOrderReturns] = useState<OrderReturn[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrderReturn, setSelectedOrderReturn] =
    useState<OrderReturn | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const loadOrderReturns = async () => {
    setLoading(true);
    try {
      const data = await api.orderReturns.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu hoàn trả");
        setOrderReturns([]);
      } else {
        setOrderReturns(data);
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách hoàn tiền");
      setOrderReturns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderReturns();
  }, []);

  // Reset về trang 1 khi tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo Mã hoàn tiền
  const filteredReturns = orderReturns.filter((item) =>
    item.id.toString().includes(search.trim()),
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

  const handleAcceptClick = async (item: OrderReturn) => {
    try {
      await api.orderReturns.update(item.id, {
        ...item,
        status: "1", // 1: Đã duyệt / hoàn tất
      });
      toast.success(`Đã chấp nhận đơn hoàn tiền mã: #${item.id}`);
      loadOrderReturns();
    } catch (e: any) {
      toast.error(e.message || "Lỗi duyệt đơn hoàn tiền");
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
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedReturns.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy dữ liệu hoàn tiền nào.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedReturns.map((item) => (
                  <TableRow
                    key={item.id}
                    className={page.tableRow}
                  >
                    {/* Thông tin Mã và Ngày hoàn tiền */}
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-bold text-slate-900">
                          #{item.id}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 font-medium">
                          Ngày tạo: {new Date(item.returndate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-slate-950">
                          Đơn hàng #{item.orderId}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          NV lập: #{item.employeeId}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className="text-xs font-semibold text-slate-400">Lý do</span>
                        <span className="text-xs font-medium text-slate-700 mt-0.5">{item.reason}</span>
                      </div>
                    </TableCell>

                    {/* Thông tin tổng tiền hoàn tiền */}
                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className={entity.cellMeta}>
                          Tổng tiền hoàn tiền
                        </span>
                        <span className={cn(entity.price, 'mt-0.5')}>
                          {item.totalrefund.toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold text-xs text-slate-400 mb-1">Trạng thái</span>
                        <span className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full border",
                          item.status === "1" || item.status === "Đã duyệt"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        )}>
                          {item.status === "1" || item.status === "Đã duyệt" ? "Đã duyệt" : "Chờ xử lý"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Các button hành động */}
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionSecondary, "w-28")}
                          onClick={() => handleDetailClick(item)}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          size="sm"
                          className={cn(btn.primary, "w-28")}
                          disabled={item.status === "1" || item.status === "Đã duyệt"}
                          onClick={() => handleAcceptClick(item)}
                        >
                          {item.status === "1" || item.status === "Đã duyệt" ? "Đã duyệt" : "Chấp nhận"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium text-slate-900">{paginatedReturns.length}</span> trên{" "}
                  <span className="font-medium text-slate-900">{filteredReturns.length}</span> đơn hoàn
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
            )}
          </>
        )}
      </div>

      {/* Đăng ký các Dialog liên quan */}
      <DetailOrderReturnDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        orderReturn={selectedOrderReturn}
      />

      <NewOrderReturnDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadOrderReturns}
      />
    </div>
  );
}
