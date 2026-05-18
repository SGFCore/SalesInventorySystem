import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmp } from "@/context/empContext";
import type { Customer } from "@/lib/types";
import { cn } from "@/lib/utils"; // Import cn để xử lý class
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icon
import { useEffect, useRef, useState } from "react";

import { DetailCustomerDialog } from "./DetailCustomerDialog";
import { EditCustomerDialog } from "./EditCustomerDialog";
import { FeedbackDialog } from "./FeedbackDialog";
import { OrderHistoryDialog } from "./OrderHistoryDialog";
import { NewCustomerDialog } from "@/pages/4-customer-management-page/NewCustomerDialog";

const MOCK_CUSTOMERS: Customer[] = Array.from({ length: 45 }, (_, i) => ({
  CustomerID: 2000 + i,
  CustomerTypeID: (i % 2) + 1,
  FirstName: i % 2 === 0 ? "Nguyễn" : "Trần",
  LastName: i % 2 === 0 ? "Văn A" : "Thị B",
  CompanyName: i % 3 === 0 ? "Công ty Giải pháp Công nghệ" : "",
  Phone: `090${1000000 + i}`,
  Address: "123 Đường số 1, Quận 1, TP.HCM",
  Email: `customer${i}@example.com`,
  CreatedDate: new Date(),
  TotalAccumulatedSpent: 5000000 + i * 100000,
}));

const ITEMS_PER_PAGE = 10;

export default function CustomerManagementPage() {
  const { hasRole } = useEmp();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

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

  const filtered = MOCK_CUSTOMERS.filter((c) =>
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

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Tìm kiếm khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-slate-200 focus:ring-blue-600"
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm khách hàng mới
        </Button>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {paginatedCustomers.map((c) => (
              <TableRow
                key={c.CustomerID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                <TableCell className="w-20 font-medium text-slate-500">
                  {c.CustomerID}
                </TableCell>
                <TableCell className="font-semibold text-left">
                  {c.FirstName} {c.LastName}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
                      onClick={() => openAction(c, "detail")}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
                      onClick={() => openAction(c, "edit")}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
                      onClick={() => openAction(c, "feedback")}
                    >
                      Phản hồi
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200"
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

        {/* Bộ điều khiển Phân trang Refactored */}
        <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
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
              className="h-8 w-8 p-0"
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
                      "h-8 w-8 p-0 transition-none",
                      currentPage === page
                        ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
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
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
      <NewCustomerDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
