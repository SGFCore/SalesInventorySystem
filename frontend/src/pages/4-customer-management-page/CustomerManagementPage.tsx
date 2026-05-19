import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Customer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DetailCustomerDialog } from "./DetailCustomerDialog";
import { EditCustomerDialog } from "./EditCustomerDialog";
import { FeedbackDialog } from "./FeedbackDialog";
import { OrderHistoryDialog } from "./OrderHistoryDialog";
import { NewCustomerDialog } from "./NewCustomerDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { api } from "@/lib/api";

const ITEMS_PER_PAGE = 10;

export default function CustomerManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [customers, setCustomers] = useState<Customer[]>([]); // Khởi tạo mảng rỗng thay vì undefined

  // SỬA LỖI: Gọi hàm init() bên trong useEffect
  useEffect(() => {
    const init = async () => {
      try {
        const data = await api.customers.list();
        if (!data) {
          alert("KHÔNG CÓ DATA!");
          setCustomers([]);
        } else {
          setCustomers(data);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu khách hàng:", error);
        setCustomers([]);
      }
    };
    init(); // Phải gọi hàm này ở đây!
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
    `${c.FirstName} ${c.LastName}`.toLowerCase().includes(search.toLowerCase()),
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

  // Hàm cập nhật danh sách local sau khi sửa
  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.CustomerID === updatedCustomer.CustomerID ? updatedCustomer : c,
      ),
    );
  };

  // Hàm thêm mới vào danh sách local
  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
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
        <Table>
          <TableBody>
            {paginatedCustomers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-slate-400"
                >
                  Không tìm thấy khách hàng nào hợp lệ.
                </TableCell>
              </TableRow>
            ) : (
              paginatedCustomers.map((c) => (
                <TableRow key={c.CustomerID} className={page.tableRow}>
                  <TableCell className={cn("w-20", entity.id)}>
                    {c.CustomerID}
                  </TableCell>
                  <TableCell className={cn("text-left", entity.name)}>
                    {c.FirstName} {c.LastName}
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
                        className={btn.actionPrimary}
                        onClick={() => openAction(c, "feedback")}
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
              ))
            )}
          </TableBody>
        </Table>

        {/* Phân trang */}
        {totalPages > 0 && (
          <div className={page.pagination}>
            <div className={page.paginationText}>
              Hiển thị{" "}
              <span className="font-medium">{paginatedCustomers.length}</span>{" "}
              trên <span className="font-medium">{filtered.length}</span> khách
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
        onSave={handleUpdateCustomer}
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
        onSave={handleAddCustomer}
      />
    </div>
  );
}
