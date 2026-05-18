import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Order } from "@/lib/types";
import { DetailOrderDialog } from "@/pages/8.2-order-management-page/DetailOrderDialog";
import { NewOrderDialog } from "@/pages/8.2-order-management-page/NewOrderDialog";
import { EditOrderDialog } from "@/pages/8.2-order-management-page/EditOrderDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeProductDialog } from "@/pages/8.2-order-management-page/ChangeProductDialog";
import { ReturnProductDialog } from "@/pages/8.2-order-management-page/ReturnProductDialog";

const MOCK_ORDERS: Order[] = Array.from({ length: 45 }, (_, i) => ({
  OrderID: 5000 + i,
  CustomerName: `Khách hàng ${i + 1}`,
  EmployeeID: 101,
  InvoiceID: 1000 + i,
  ShipCode: `VNPOST${8000 + i}`,
  ShipCompanyID: i % 2 === 0 ? 1 : 2,
  TotalAmount: (i + 1) * 200000,
  OrderStatus: i % 6,
  ShippingStatus: i % 4,
  ShipmentNote: "Giao trong giờ hành chính",
  ShippingFee: 30000,
  ExportReceiptID: 2000 + i,
}));

const ITEMS_PER_PAGE = 20;

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  // Dialog states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setOrders(MOCK_ORDERS);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredOrders = orders.filter(
    (ord) =>
      ord.OrderID.toString().includes(search.trim()) ||
      ord.CustomerName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handleAction = (
    order: Order,
    action:
      | "detail"
      | "edit"
      | "cancel"
      | "ship"
      | "change"
      | "return"
      | "packeted"
      | "cancelshipping",
  ) => {
    setSelectedOrder(order);
    if (action === "detail") setIsDetailOpen(true);
    if (action === "edit") setIsEditOpen(true);
    if (action === "change") setIsChangeOpen(true);
    if (action === "return") setIsReturnOpen(true);
    if (action === "cancel") {
      alert(`Đã yêu cầu hủy đơn hàng #${order.OrderID}`);
    }
    if (action === "ship") {
      alert(`Đã yêu cầu giao vận đơn hàng #${order.OrderID}`);
    }
  };

  const renderOrderStatus = (status: number) => {
    const config: Record<number, { text: string; className: string }> = {
      0: {
        text: "Chờ xác nhận",
        className: "text-slate-600 border-slate-200 bg-slate-50",
      },
      1: {
        text: "Đã xác nhận",
        className: "text-blue-600 border-blue-200 bg-blue-50",
      },
      2: {
        text: "Đang giao",
        className: "text-yellow-600 border-yellow-200 bg-yellow-50",
      },
      3: {
        text: "Giao thành công",
        className: "text-green-600 border-green-200 bg-green-50",
      },
      4: { text: "Đã hủy", className: "text-red-600 border-red-200 bg-red-50" },
      5: {
        text: "Đổi/trả",
        className: "text-purple-600 border-purple-200 bg-purple-50",
      },
    };
    const current = config[status] || {
      text: "Không xác định",
      className: "border-slate-200",
    };
    return (
      <Badge
        variant="outline"
        className={cn("rounded-none whitespace-nowrap", current.className)}
      >
        {current.text}
      </Badge>
    );
  };

  const renderShippingStatus = (status: number) => {
    const config: Record<number, { text: string; className: string }> = {
      0: {
        text: "Cần lên lịch giao",
        className: "text-slate-600 border-slate-200 bg-slate-50",
      },
      1: {
        text: "Đang đóng gói",
        className: "text-blue-600 border-blue-200 bg-blue-50",
      },
      2: {
        text: "Đã gửi vận chuyển",
        className: "text-indigo-600 border-indigo-200 bg-indigo-50",
      },
      3: {
        text: "Khách từ chối",
        className: "text-red-600 border-red-200 bg-red-50",
      },
    };
    const current = config[status] || {
      text: "Không xác định",
      className: "border-slate-200",
    };
    return (
      <Badge
        variant="outline"
        className={cn("rounded-none whitespace-nowrap", current.className)}
      >
        {current.text}
      </Badge>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm theo mã ĐH hoặc Tên KH..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-slate-200 focus:ring-blue-600 rounded-none"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm đơn hàng
        </Button>
      </div>

      <div className="border border-slate-200 overflow-hidden">
        <Table>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow
                key={order.OrderID}
                className="hover:bg-slate-50 border-b border-slate-200"
              >
                <TableCell>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-slate-900">
                      #{order.OrderID}
                    </span>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">
                      {order.CustomerName}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-xs text-slate-500 mb-1">
                      Trạng thái ĐH
                    </span>
                    {renderOrderStatus(order.OrderStatus)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-xs text-slate-500 mb-1">
                      Trạng thái Giao
                    </span>
                    {renderShippingStatus(order.ShippingStatus)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-xs text-slate-500">
                      Tổng tiền
                    </span>
                    <span className="font-bold text-blue-600 mt-0.5">
                      {order.TotalAmount.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </TableCell>

                <TableCell className="w-[60px] text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 rounded-none hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-4 w-4 text-slate-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white rounded-none border border-slate-200 min-w-[140px]"
                    >
                      <DropdownMenuItem
                        className="text-slate-700 hover:bg-slate-100 rounded-none cursor-pointer text-xs py-2"
                        onClick={() => handleAction(order, "detail")}
                      >
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-slate-700 hover:bg-slate-100 rounded-none cursor-pointer text-xs py-2 disabled:opacity-50"
                        onClick={() => handleAction(order, "edit")}
                      >
                        Cập nhật
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-slate-700 hover:bg-slate-100 rounded-none cursor-pointer text-xs py-2 disabled:opacity-50"
                        onClick={() => handleAction(order, "change")}
                      >
                        Đổi hàng
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-slate-700 hover:bg-slate-100 rounded-none cursor-pointer text-xs py-2 disabled:opacity-50"
                        onClick={() => handleAction(order, "return")}
                      >
                        Trả hàng
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-slate-700 hover:bg-slate-100 rounded-none cursor-pointer text-xs py-2 disabled:opacity-50"
                        onClick={() => handleAction(order, "ship")}
                      >
                        Giao vận
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-red-600 hover:bg-red-50 rounded-none cursor-pointer text-xs py-2 font-medium disabled:opacity-50"
                        onClick={() => handleAction(order, "cancel")}
                      >
                        Hủy đơn hàng
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-red-600 hover:bg-red-50 rounded-none cursor-pointer text-xs py-2 font-medium disabled:opacity-50"
                        onClick={() => handleAction(order, "cancelshipping")}
                      >
                        Hủy giao vận
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={
                          order.OrderStatus === 4 || order.ShippingStatus >= 2
                        }
                        className="text-slate-700 hover:bg-slate-100 rounded-none cursor-pointer text-xs py-2 disabled:opacity-50"
                        onClick={() => handleAction(order, "packeted")}
                      >
                        Đóng gói xong
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
          <div className="text-sm text-slate-500">
            Hiển thị{" "}
            <span className="font-medium text-slate-900">
              {paginatedOrders.length}
            </span>{" "}
            trên{" "}
            <span className="font-medium text-slate-900">
              {filteredOrders.length}
            </span>{" "}
            đơn hàng
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 rounded-none border-slate-200"
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
                      "h-8 w-8 p-0 rounded-none",
                      currentPage === page
                        ? "bg-blue-600 text-white"
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
              className="h-8 w-8 p-0 rounded-none border-slate-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <DetailOrderDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        order={selectedOrder}
      />
      <NewOrderDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
      {selectedOrder && (
        <EditOrderDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          order={selectedOrder}
        />
      )}
      {selectedOrder && (
        <ChangeProductDialog
          open={isChangeOpen}
          onOpenChange={setIsChangeOpen}
          order={selectedOrder}
        />
      )}
      {selectedOrder && (
        <ReturnProductDialog
          open={isReturnOpen}
          onOpenChange={setIsReturnOpen}
          order={selectedOrder}
        />
      )}
    </div>
  );
}
