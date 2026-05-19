import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ShipCompany } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailCompDialog } from "@/pages/3-comp-management/DetailCompDialog";
import { EditCompDialog } from "@/pages/3-comp-management/EditCompDialog";
import { NewCompDialog } from "@/pages/3-comp-management/NewCompDialog";
import { page, btn, entity, input } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ITEMS_PER_PAGE = 20;

export default function CompManagementPage() {
  const [companies, setCompanies] = useState<ShipCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedComp, setSelectedComp] = useState<ShipCompany | null>(null);

  // States điều khiển các Dialog
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const data = await api.shipCompanies.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu");
        setCompanies([]);
        return;
      }
      setCompanies(data);
    } catch (error: any) {
      toast.error(error.message || "Không thể tải danh sách đối tác vận chuyển");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  // Reset về trang 1 khi tìm kiếm thông tin thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo tên đối tác
  const filteredCompanies = companies.filter((c) =>
    c.ShipCompanyName.toLowerCase().includes(search.toLowerCase()),
  );

  // Tính toán logic phân trang
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Cuộn mượt lên đầu bảng khi đổi trang
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handleActionClick = (comp: ShipCompany, action: "detail" | "edit") => {
    setSelectedComp(comp);
    if (action === "detail") setIsDetailOpen(true);
    if (action === "edit") setIsEditOpen(true);
  };

  const toggleStatus = async (comp: ShipCompany) => {
    try {
      const newStatus = comp.Status === 1 ? 0 : 1;
      await api.shipCompanies.update(comp.ShipCompanyID, {
        ...comp,
        Status: newStatus,
      });
      toast.success(newStatus === 1 ? "Kích hoạt đối tác thành công!" : "Ngừng hợp tác thành công!");
      loadCompanies();
    } catch (error: any) {
      toast.error("Thay đổi trạng thái thất bại: " + error.message);
    }
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      {/* Thanh điều khiển phía trên */}
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo tên đối tác..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm đối tác mới
        </Button>
      </div>

      {/* Bảng danh sách đối tác */}
      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu đối tác...</span>
          </div>
        ) : paginatedCompanies.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy đối tác vận chuyển nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedCompanies.map((comp) => (
                  <TableRow
                    key={comp.ShipCompanyID}
                    className={page.tableRow}
                  >
                    {/* Thông tin định danh & Tên */}
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <div className={entity.rowMeta}>
                          <span className={entity.id}>{comp.ShipCompanyID}</span>
                          <span className={entity.separator}>·</span>
                          <span
                            className={cn(entity.name, comp.Status === 0 && entity.nameInactive)}
                          >
                            {comp.ShipCompanyName}
                          </span>
                        </div>
                        <div
                          className={cn(comp.Status === 1 ? entity.statusActive : entity.statusInactive)}
                        >
                          {comp.Status === 1 ? "Đang hợp tác" : "Ngưng hợp tác"}
                        </div>
                      </div>
                    </TableCell>

                    {/* Thông tin liên hệ */}
                    <TableCell>
                      <div
                        className={cn(
                          "flex flex-col items-start text-sm",
                          comp.Status === 0 ? "text-slate-300" : "text-black",
                        )}
                      >
                        <span>{comp.Email}</span>
                        <span>{comp.Phone}</span>
                      </div>
                    </TableCell>

                    {/* Khu vực các nút hành động đồng đều về kích thước */}
                    <TableCell>
                      <div className="grid grid-cols-3 gap-2 w-full max-w-[400px] ml-auto">
                        {/* Xem chi tiết */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionSecondary, "w-full")}
                          onClick={() => handleActionClick(comp, "detail")}
                        >
                          Xem chi tiết
                        </Button>

                        {/* Cập nhật */}
                        <Button
                          disabled={comp.Status === 0}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full"
                          onClick={() => handleActionClick(comp, "edit")}
                        >
                          Cập nhật
                        </Button>

                        {/* Thay đổi trạng thái hợp tác */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "w-full",
                            comp.Status === 1
                              ? "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              : "text-slate-600 hover:bg-slate-100",
                          )}
                          onClick={() => toggleStatus(comp)}
                        >
                          {comp.Status === 1 ? "Ngưng hợp tác" : "Hợp tác lại"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Phân trang hệ thống */}
            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium">{paginatedCompanies.length}</span>{" "}
                  trên <span className="font-medium">{filteredCompanies.length}</span>{" "}
                  đối tác
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

      {/* Các Dialog điều khiển luồng dữ liệu phụ trợ */}
      <DetailCompDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        comp={selectedComp}
      />

      <EditCompDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        comp={selectedComp}
        onSave={loadCompanies}
      />

      <NewCompDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadCompanies}
      />
    </div>
  );
}
