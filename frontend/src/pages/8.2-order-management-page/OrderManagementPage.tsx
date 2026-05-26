import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Order, Customer } from "@/lib/types";
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
import { page, btn, entity, input } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 20;

export default function OrderManagementPage({ saleChannelCode }: { saleChannelCode?: number }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
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

  const loadOrders = async () => {
    setLoading(true);
    try {
      const [orderData, customerData, invoiceData] = await Promise.all([
        api.orders.list(),
        api.customers.list(),
        api.invoices.list(),
      ]);
      setCustomers(customerData);

      let filteredOrders = orderData || [];
      if (saleChannelCode !== undefined && saleChannelCode !== 0) { // Treat 0 as no filter
        filteredOrders = filteredOrders.filter(order => {
          const invoice = invoiceData.find(inv => inv.InvoiceID == order.invoiceId);
          return invoice && invoice.SaleChannelCode == saleChannelCode;
        });
      }

      if (!filteredOrders || filteredOrders.length === 0) {
        setOrders([]);
      } else {
        // Sort newest first
        setOrders(filteredOrders);
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách đơn hàng");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [saleChannelCode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getCustomerName = (customerId: number) => {
    const cust = customers.find((c) => c.id === customerId);
    return cust ? `${cust.firstname} ${cust.lastname}` : `Khách hàng #${customerId}`;
  };

  const filteredOrders = orders.filter((ord) => {
    if (!ord) return false;
    const safeSearch = (search || "").trim().toLowerCase();
    const idStr = ord.id != null ? String(ord.id) : "";
    const nameStr = getCustomerName(ord.customerId).toLowerCase();
    return idStr.includes(safeSearch) || nameStr.includes(safeSearch);
  });

  const displayedOrders = filteredOrders.length > 0 ? filteredOrders : orders;
  const totalPages = Math.ceil(displayedOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = displayedOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handleAction = async (
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
      try {
        await api.orders.update(order.id, {
          ...order,
          orderstatus: 4, // Đã hủy
        });
        toast.success(`Đã hủy đơn hàng #${order.id}`);
        loadOrders();
      } catch (e: any) {
        toast.error(e.message || "Lỗi khi hủy đơn hàng");
      }
    }

    if (action === "ship") {
      try {
        await api.orders.update(order.id, {
          ...order,
          shippingstatus: 2, // Đã gửi vận chuyển
          orderstatus: 2, // Đang giao
        });
        toast.success(`Đã giao vận đơn hàng #${order.id}`);
        loadOrders();
      } catch (e: any) {
        toast.error(e.message || "Lỗi giao vận đơn hàng");
      }
    }

    if (action === "cancelshipping") {
      try {
        await api.orders.update(order.id, {
          ...order,
          shippingstatus: 0, // Cần lên lịch giao
          orderstatus: 0, // Chờ xác nhận
        });
        toast.success(`Đã hủy giao vận cho đơn hàng #${order.id}`);
        loadOrders();
      } catch (e: any) {
        toast.error(e.message || "Lỗi khi hủy giao vận");
      }
    }

    if (action === "packeted") {
      try {
        await api.orders.update(order.id, {
          ...order,
          shippingstatus: 4, // Đang đóng gói
        });
        toast.success(`Đã đánh dấu Đóng gói xong cho đơn hàng #${order.id}`);
        loadOrders();
      } catch (e: any) {
        toast.error(e.message || "Lỗi cập nhật trạng thái đóng gói");
      }
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
        className={cn("whitespace-nowrap font-medium text-xs rounded-full px-2 py-0.5", current.className)}
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
      4: {
        text: "Đã đóng gói",
        className: "text-green-600 border-green-200 bg-green-50",
      },
    };
    const current = config[status] || {
      text: "Không xác định",
      className: "border-slate-200",
    };
    return (
      <Badge
        variant="outline"
        className={cn("whitespace-nowrap font-medium text-xs rounded-full px-2 py-0.5", current.className)}
      >
        {current.text}
      </Badge>
    );
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo mã ĐH hoặc Tên KH..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button className={btn.primary} onClick={() => setIsNewOpen(true)}>
          Thêm đơn hàng
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải đơn hàng...</span>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy đơn hàng nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className={entity.id}>#{order.id}</span>
                        <span className="text-xs font-semibold text-slate-500 mt-0.5">
                          {getCustomerName(order.customerId)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-semibold text-xs text-slate-400 mb-1">
                          Trạng thái ĐH
                        </span>
                        {renderOrderStatus(order.orderstatus)}
                      </div>
                    </TableCell>

                    {saleChannelCode !== undefined && saleChannelCode !== 0 && (
                      <TableCell>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-semibold text-xs text-slate-400 mb-1">
                            Trạng thái Giao
                          </span>
                          {renderShippingStatus(order.shippingstatus)}
                        </div>
                      </TableCell>
                    )}

                    <TableCell>
                      <div className="flex flex-col items-start text-sm">
                        <span className={entity.cellMeta}>Tổng tiền</span>
                        <span className="font-bold text-blue-600 mt-0.5">
                          {(order.totalamount || 0).toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="w-[60px] text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-slate-100"
                          >
                            <MoreHorizontal className="h-4 w-4 text-slate-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white border border-slate-200 min-w-[140px]"
                        >
                          <DropdownMenuItem
                            className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 font-medium"
                            onClick={() => handleAction(order, "detail")}
                          >
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={
                              order.orderstatus === 4 || order.shippingstatus >= 2
                            }
                            className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 disabled:opacity-50 font-medium"
                            onClick={() => handleAction(order, "edit")}
                          >
                            Cập nhật
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={
                              order.orderstatus === 4 || order.shippingstatus >= 2
                            }
                            className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 disabled:opacity-50 font-medium"
                            onClick={() => handleAction(order, "change")}
                          >
                            Đổi hàng
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={
                              order.orderstatus === 4 || order.shippingstatus >= 2
                            }
                            className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 disabled:opacity-50 font-medium"
                            onClick={() => handleAction(order, "return")}
                          >
                            Trả hàng
                          </DropdownMenuItem>
                          {saleChannelCode !== 0 && (
                            <DropdownMenuItem
                              disabled={
                                order.orderstatus === 4 || order.shippingstatus >= 2
                              }
                              className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 disabled:opacity-50 font-medium"
                              onClick={() => handleAction(order, "ship")}
                            >
                              Giao vận
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            disabled={
                              order.orderstatus === 4 || order.shippingstatus >= 2
                            }
                            className="text-red-600 hover:bg-red-50 cursor-pointer text-xs py-2 font-semibold disabled:opacity-50"
                            onClick={() => handleAction(order, "cancel")}
                          >
                            Hủy đơn hàng
                          </DropdownMenuItem>
                          {saleChannelCode !== 0 && (
                            <>
                              <DropdownMenuItem
                                disabled={
                                  order.orderstatus === 4 || order.shippingstatus >= 2
                                }
                                className="text-red-600 hover:bg-red-50 cursor-pointer text-xs py-2 font-semibold disabled:opacity-50"
                                onClick={() => handleAction(order, "cancelshipping")}
                              >
                                Hủy giao vận
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                disabled={
                                  order.orderstatus === 4 || order.shippingstatus >= 2
                                }
                                className="text-slate-700 hover:bg-slate-100 cursor-pointer text-xs py-2 disabled:opacity-50 font-medium"
                                onClick={() => handleAction(order, "packeted")}
                              >
                                Đóng gói xong
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
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
                          className={
                            currentPage === pageNum
                              ? btn.paginationActive
                              : btn.paginationInactive
                          }
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
            )}
          </>
        )}
      </div>

      <DetailOrderDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        order={selectedOrder}
        saleChannelCode={saleChannelCode}
      />
      <NewOrderDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadOrders}
        saleChannelCode={saleChannelCode}
      />
      {selectedOrder && (
        <EditOrderDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          order={selectedOrder}
          onSave={loadOrders}
          saleChannelCode={saleChannelCode}
        />
      )}
      {selectedOrder && (
        <ChangeProductDialog
          open={isChangeOpen}
          onOpenChange={setIsChangeOpen}
          order={selectedOrder}
          onSave={loadOrders}
        />
      )}
      {selectedOrder && (
        <ReturnProductDialog
          open={isReturnOpen}
          onOpenChange={setIsReturnOpen}
          order={selectedOrder}
          onSave={loadOrders}
        />
      )}
    </div>
  );
}
