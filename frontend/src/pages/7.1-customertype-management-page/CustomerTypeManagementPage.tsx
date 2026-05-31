import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DetailCustomerTypeDialog } from "@/pages/7.1-customertype-management-page/DetailCustomerTypeDialog";
import { EditCustomerTypeDialog } from "@/pages/7.1-customertype-management-page/EditCustomerTypeDialog";
import { NewCustomerTypeDialog } from "@/pages/7.1-customertype-management-page/NewCustomerTypeDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Customertype } from "@/lib/types";

const ITEMS_PER_PAGE = 10;

export default function CustomerTypeManagementPage() {
  const [customerTypes, setCustomerTypes] = useState<Customertype[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<Customertype | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  const loadCustomerTypes = async () => {
    setLoading(true);
    try {
      const data = await api.customerTypes.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu");
        setCustomerTypes([]);
      } else {
        setCustomerTypes(data);
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi lấy dữ liệu nhóm khách hàng");
      setCustomerTypes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerTypes();
  }, []);

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

  const filtered = customerTypes.filter((t) =>
    t.customertypename.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTypes = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (typeObj: Customertype, actionType: "detail" | "edit") => {
    setSelectedType(typeObj);
    if (actionType === "detail") setIsDetailOpen(true);
    if (actionType === "edit") setIsEditOpen(true);
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <Input
          placeholder="Tìm kiếm nhóm khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={input.search}
        />
      </div>

      <div className="border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">
              Đang tải dữ liệu nhóm khách hàng...
            </span>
          </div>
        ) : paginatedTypes.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy nhóm khách hàng nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedTypes.map((t) => (
                  <TableRow key={t.id} className={page.tableRow}>
                    <TableCell className={cn("w-20", entity.id)}>
                      {t.id}
                    </TableCell>
                    <TableCell className={cn("text-left", entity.name)}>
                      {t.customertypename}
                    </TableCell>
                    <TableCell className="text-blue-600 font-medium">
                      Chiết khấu: {t.discount}%
                    </TableCell>
                    <TableCell>
                      {/* Grid nút bấm với chiều ngang bằng nhau (w-32) theo đúng layout mẫu */}
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 w-32"
                          onClick={() => openAction(t, "detail")}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 w-32"
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
            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium">{paginatedTypes.length}</span>{" "}
                  trên <span className="font-medium">{filtered.length}</span>{" "}
                  nhóm khách hàng
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
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
        onSave={loadCustomerTypes}
      />
      <NewCustomerTypeDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadCustomerTypes}
      />
    </div>
  );
}
