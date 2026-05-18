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
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DetailWarehouseDialog } from "@/pages/11.1-warehouse-management-page/DetailWarehouseDialog";
import { EditWarehouseDialog } from "@/pages/11.1-warehouse-management-page/EditWarehouseDialog";
import { ReportWarehouseDialog } from "@/pages/11.1-warehouse-management-page/ReportWarehouseDialog";
import { NewWarehouseDialog } from "@/pages/11.1-warehouse-management-page/NewWarehouseDialog";
import { page, input, btn } from "@/pages/page-classes";

// Mock dữ liệu 25 kho hàng mẫu phục vụ hiển thị prototype
const MOCK_WAREHOUSES: Warehouse[] = Array.from({ length: 25 }, (_, i) => ({
  WareHouseID: 100 + i,
  WareHouseName:
    i === 0
      ? "Kho tổng trung tâm miền Bắc"
      : i === 1
        ? "Kho phân phối Logistics miền Nam"
        : i === 2
          ? "Kho linh kiện công nghệ cao Đông Anh"
          : `Kho lưu trữ hàng hóa chi nhánh số ${i}`,
  ManagerID: 900 + i,
  Address: `${10 + i * 4} Đường Láng, Quận Đống Đa, Hà Nội`,
  ContactNumber: `09876543${String(i).padStart(2, "0")}`,
  Capacity: 5000 + (i % 5) * 5000, // 5000, 10000, 15000, 20000, 25000
  Status: i % 7 === 6 ? 0 : 1, // 1: Hoạt động, 0: Tạm dừng
  WarehouseType: i % 4 === 0 ? 1 : 2, // 1: Kho tổng, 2: Kho phân phối
}));

const ITEMS_PER_PAGE = 10;

export default function WarehouseManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null,
  );

  const topRef = useRef<HTMLDivElement>(null);

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
  const filtered = MOCK_WAREHOUSES.filter((w) =>
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
        <Input
          placeholder="Tìm kiếm kho hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={input.search}
        />
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm kho hàng mới
        </Button>
      </div>

      <div className="border border-slate-200 overflow-hidden">
        <Table>
          <TableBody>
            {paginatedWarehouses.map((w) => (
              <TableRow
                key={w.WareHouseID}
                className="hover:bg-slate-50 border-b border-slate-100 transition-none"
              >
                {/* Mã kho hàng */}
                <TableCell className="w-16 font-medium text-slate-500">
                  {w.WareHouseID}
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
                <TableCell className="text-left text-slate-600 text-sm">
                  {w.Address}
                </TableCell>

                {/* Dropdown Menu Hành động */}
                <TableCell className="w-16 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 focus:ring-0 focus:ring-offset-0"
                      >
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4 text-slate-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white border border-slate-200 min-w-[140px]"
                    >
                      <DropdownMenuItem
                        className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2"
                        onClick={() => openAction(w, "detail")}
                      >
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2"
                        onClick={() => openAction(w, "edit")}
                      >
                        Cập nhật
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2"
                        onClick={() => openAction(w, "report")}
                      >
                        Báo cáo thiếu hụt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Thanh phân trang dữ liệu */}
        <div className={page.pagination}>
          <div className={page.paginationText}>
            Hiển thị{" "}
            <span className="font-medium">{paginatedWarehouses.length}</span>{" "}
            trên <span className="font-medium">{filtered.length}</span> kho hàng
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 transition-none"
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
              className="h-8 w-8 p-0 transition-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Đăng ký các Dialog điều khiển luồng giao diện */}
      <DetailWarehouseDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        warehouse={selectedWarehouse}
      />
      <EditWarehouseDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        warehouse={selectedWarehouse}
      />
      <ReportWarehouseDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        warehouse={selectedWarehouse}
      />
      <NewWarehouseDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
