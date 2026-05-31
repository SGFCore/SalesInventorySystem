import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Customer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DetailCustomerDialog } from "./DetailCustomerDialog";
import { EditCustomerDialog } from "./EditCustomerDialog";
import { FeedbackDialog } from "./FeedbackDialog";
import { OrderHistoryDialog } from "./OrderHistoryDialog";
import { NewCustomerDialog } from "./NewCustomerDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [eligibleCustomerIds, setEligibleCustomerIds] = useState<Set<number>>(new Set());

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const [customerData, orderData, invoiceData] = await Promise.all([
        api.customers.list(),
        api.orders.list(),
        api.invoices.list()
      ]);

      if (!customerData || customerData.length === 0) {
        toast.error("Không có dữ liệu khách hàng");
        setCustomers([]);
      } else {
        setCustomers(customerData);
      }

      // TẬP HỢP KHÁCH HÀNG ĐỦ ĐIỀU KIỆN PHẢN HỒI:
      const eligibleIds = new Set<number>();

      // 1. Kiểm tra đơn hàng trực tuyến (Online): Mã trạng thái 3 = Giao thành công
      orderData.forEach(o => {
        if (o.shippingstatus === 3) {
          eligibleIds.add(o.customerId);
        }
      });

      // 2. Kiểm tra đơn hàng tại quầy (Offline): Thông qua Hóa đơn có trạng thái 'Đã thanh toán'
      invoiceData.forEach(inv => {
        if (inv.Status === 'Đã thanh toán' && inv.SaleChannelCode === 0) {
          eligibleIds.add(inv.CustomerID);
        }
      });

      setEligibleCustomerIds(eligibleIds);

    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu khách hàng");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const topRef = useRef<HTMLDivElement>(null);

  // Reset về trang 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Cuộn lên đầu khi đổi trang
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Dialog states
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const filtered = customers.filter((c) =>
    `${c.firstname} ${c.lastname}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (
    customer: Customer,
    type: "detail" | "edit" | "feedback" | "order",
  ) => {
    setSelectedCustomer(customer);
    if (type === "detail") setIsDetailOpen(true);
    if (type === "edit") setIsEditOpen(true);
    if (type === "feedback") setIsFeedbackOpen(true);
    if (type === "order") setIsOrderOpen(true);
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <Input
          placeholder="Tìm kiếm khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={input.search}
        />
        <Button className={btn.primary} onClick={() => setIsNewOpen(true)}>
          Thêm khách hàng mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu khách hàng...</span>
          </div>
        ) : paginatedCustomers.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy khách hàng nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedCustomers.map((c) => (
                  <TableRow key={c.id} className={page.tableRow}>
                    <TableCell className={cn("w-20", entity.id)}>
                      {c.id}
                    </TableCell>
                    <TableCell className={cn("text-left", entity.name)}>
                      {c.firstname} {c.lastname}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={btn.actionPrimary}
                          onClick={() => openAction(c, "detail")}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={btn.actionPrimary}
                          onClick={() => openAction(c, "edit")}
                        >
                          Cập nhật
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            btn.actionPrimary,
                            !eligibleCustomerIds.has(c.id) && "opacity-40 cursor-not-allowed grayscale pointer-events-none"
                          )}
                          disabled={!eligibleCustomerIds.has(c.id)}
                          onClick={() => openAction(c, "feedback")}
                          title={!eligibleCustomerIds.has(c.id) ? "Chưa có đơn hàng giao thành công" : ""}
                        >
                          Phản hồi
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={btn.actionPrimary}
                          onClick={() => openAction(c, "order")}
                        >
                          Lịch sử
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Phân trang */}
            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium">{paginatedCustomers.length}</span>{" "}
                  trên <span className="font-medium">{filtered.length}</span> khách hàng
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
            )}
          </>
        )}
      </div>

      {/* Dialogs */}
      <DetailCustomerDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        customer={selectedCustomer}
      />

      <EditCustomerDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        customer={selectedCustomer}
        onSave={loadCustomers}
      />

      <FeedbackDialog
        open={isFeedbackOpen}
        onOpenChange={setIsFeedbackOpen}
        customer={selectedCustomer}
      />

      <OrderHistoryDialog
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        customer={selectedCustomer}
      />

      <NewCustomerDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadCustomers}
      />
    </div>
  );
}
