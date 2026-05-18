import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { CustomerType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailCustomerTypeDialog } from "@/pages/7.1-customertype-management-page/DetailCustomerTypeDialog";
import { EditCustomerTypeDialog } from "@/pages/7.1-customertype-management-page/EditCustomerTypeDialog";
import { NewCustomerTypeDialog } from "@/pages/7.1-customertype-management-page/NewCustomerTypeDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MOCK_CUSTOMER_TYPES: CustomerType[] = Array.from(
  { length: 25 },
  (_, i) => ({
    CustomerTypeID: 100 + i,
    CustomerTypeName:
      i === 0
        ? "Khách hàng Đồng"
        : i === 1
          ? "Khách hàng Bạc"
          : i === 2
            ? "Khách hàng Vàng"
            : `Nhóm khách hàng VIP ${i}`,
    Discount: (i % 5) * 5, // 0%, 5%, 10%, 15%, 20%
    Detail: `Mô tả tiêu chuẩn và quyền lợi dành cho nhóm khách hàng thứ ${i + 1}`,
    SpendingLimit: 5000000 + i * 5000000,
  }),
);

const ITEMS_PER_PAGE = 10;

export default function CustomerTypeManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<CustomerType | null>(null);

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
  const [isNewOpen, setIsNewOpen] = useState(false);

  const filtered = MOCK_CUSTOMER_TYPES.filter((t) =>
    t.CustomerTypeName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTypes = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (typeObj: CustomerType, actionType: "detail" | "edit") => {
    setSelectedType(typeObj);
    if (actionType === "detail") setIsDetailOpen(true);
    if (actionType === "edit") setIsEditOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Tìm kiếm nhóm khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-slate-200 focus:ring-blue-600 rounded-none"
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm nhóm khách hàng mới
        </Button>
      </div>

      <div className="border border-slate-200 overflow-hidden">
        <Table>
          <TableBody>
            {paginatedTypes.map((t) => (
              <TableRow
                key={t.CustomerTypeID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                <TableCell className="w-20 font-medium text-slate-500">
                  {t.CustomerTypeID}
                </TableCell>
                <TableCell className="font-semibold text-left">
                  {t.CustomerTypeName}
                </TableCell>
                <TableCell className="text-blue-600 font-medium">
                  Chiết khấu: {t.Discount}%
                </TableCell>
                <TableCell>
                  {/* Grid nút bấm với chiều ngang bằng nhau (w-32) theo đúng layout mẫu */}
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 w-32 rounded-none"
                      onClick={() => openAction(t, "detail")}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 w-32 rounded-none"
                      onClick={() => openAction(t, "edit")}
                    >
                      Cập nhật
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Bộ điều khiển Phân trang */}
        <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Hiển thị{" "}
            <span className="font-medium">{paginatedTypes.length}</span> trên{" "}
            <span className="font-medium">{filtered.length}</span> nhóm khách
            hàng
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 rounded-none"
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
                      "h-8 w-8 p-0 transition-none rounded-none",
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
              className="h-8 w-8 p-0 rounded-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Các Dialog điều khiển */}
      <DetailCustomerTypeDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        customerType={selectedType}
      />
      <EditCustomerTypeDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        customerType={selectedType}
      />
      <NewCustomerTypeDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
