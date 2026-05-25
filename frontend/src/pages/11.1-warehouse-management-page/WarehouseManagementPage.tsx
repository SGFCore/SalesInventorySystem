import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Warehouse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DetailWarehouseDialog } from "@/pages/11.1-warehouse-management-page/DetailWarehouseDialog";
import { EditWarehouseDialog } from "@/pages/11.1-warehouse-management-page/EditWarehouseDialog";
import { ReportWarehouseDialog } from "@/pages/11.1-warehouse-management-page/ReportWarehouseDialog";
import { NewWarehouseDialog } from "@/pages/11.1-warehouse-management-page/NewWarehouseDialog";
import { page, input, btn } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function WarehouseManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null,
  );

  const topRef = useRef<HTMLDivElement>(null);

  const loadWarehouses = async () => {
    setLoading(true);
    try {
      const data = await api.warehouses.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu nhà kho");
        setWarehouses([]);
      } else {
        setWarehouses(data);
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách nhà kho");
      setWarehouses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  // Reset về trang 1 khi thực hiện tìm kiếm dữ liệu
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Tự động cuộn mượt lên trên đầu trang khi chuyển dịch phân trang
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // State quản lý việc đóng mở các Dialog liên quan
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // Bộ lọc tìm kiếm theo Tên kho hàng
  const filtered = warehouses.filter((w) =>
    w.WareHouseName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedWarehouses = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (
    warehouseObj: Warehouse,
    actionType: "detail" | "edit" | "report",
  ) => {
    setSelectedWarehouse(warehouseObj);
    if (actionType === "detail") setIsDetailOpen(true);
    if (actionType === "edit") setIsEditOpen(true);
    if (actionType === "report") setIsReportOpen(true);
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm kho hàng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm kho hàng mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedWarehouses.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy kho hàng nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedWarehouses.map((w) => (
                  <TableRow
                    key={w.WareHouseID}
                    className={page.tableRow}
                  >
                    {/* Mã kho hàng */}
                    <TableCell className="w-16 font-semibold text-slate-500">
                      #{w.WareHouseID}
                    </TableCell>

                    {/* Tên kho hàng & Trạng thái hoạt động gộp chung */}
                    <TableCell className="w-1/3 text-left">
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-semibold text-slate-900">
                          {w.WareHouseName}
                        </span>
                        <span
                          className={cn(
                            "italic text-[11px]",
                            w.Status === 1
                              ? "text-green-600 font-medium"
                              : "text-slate-400",
                          )}
                        >
                          {w.Status === 1 ? "Đang hoạt động" : "Tạm dừng"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Địa chỉ kho hàng */}
                    <TableCell className="text-left text-slate-600 text-xs font-semibold">
                      {w.Address}
                    </TableCell>

                    {/* Dropdown Menu Hành động */}
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                          onClick={() => openAction(w, "detail")}
                        >
                          Xem chi tiết
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                          onClick={() => openAction(w, "edit")}
                        >
                          Cập nhật
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-32 text-xs font-semibold")}
                          onClick={() => openAction(w, "report")}
                        >
                          Báo cáo thiếu hụt
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
                  <span className="font-medium text-slate-900">{paginatedWarehouses.length}</span>{" "}
                  trên <span className="font-medium text-slate-900">{filtered.length}</span> kho hàng
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

      {/* Đăng ký các Dialog điều khiển luồng giao diện */}
      <DetailWarehouseDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        warehouse={selectedWarehouse}
      />
      {selectedWarehouse && (
        <EditWarehouseDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          warehouse={selectedWarehouse}
          onSave={loadWarehouses}
        />
      )}
      <ReportWarehouseDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        warehouse={selectedWarehouse}
      />
      <NewWarehouseDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadWarehouses}
      />
    </div>
  );
}
