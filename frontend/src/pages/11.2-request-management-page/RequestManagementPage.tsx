import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { RequestForm } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailRequestDialog } from "@/pages/11.2-request-management-page/DetailRequestDialog";
import { NewRequestDialog } from "@/pages/11.2-request-management-page/NewRequestDialog";
import { page, input, btn } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

const ITEMS_PER_PAGE = 10;

export default function RequestManagementPage() {
  const { hasRole } = useEmp();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState<RequestForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RequestForm | null>(
    null,
  );

  const topRef = useRef<HTMLDivElement>(null);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await api.requestForms.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu yêu cầu đề xuất");
        setRequests([]);
      } else {
        setRequests(data);
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải yêu cầu đề xuất");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Dialog states
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "approve">("view");

  // Tìm kiếm theo Mã yêu cầu hoặc Mã nhân viên
  const filtered = requests.filter(
    (r) =>
      r.RequestID.toString().includes(search) ||
      r.EmployeeID.toString().includes(search),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRequests = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (requestObj: RequestForm, mode: "view" | "approve") => {
    setSelectedRequest(requestObj);
    setDialogMode(mode);
    setIsDetailOpen(true);
  };

  const getStatusText = (status: string) => {
    if (status === "1" || status === "Đã duyệt") return "Đã duyệt";
    if (status === "2" || status === "Từ chối") return "Từ chối";
    return "Chờ duyệt";
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo mã yêu cầu, mã NV..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Tạo yêu cầu mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedRequests.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy yêu cầu đề xuất nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedRequests.map((r) => (
                  <TableRow
                    key={r.RequestID}
                    className={page.tableRow}
                  >
                    <TableCell className="w-24 font-bold text-slate-500">
                      #{r.RequestID}
                    </TableCell>
                    <TableCell className="text-left font-medium">
                      Nhân viên tạo:{" "}
                      <span className="font-semibold text-slate-900">
                        #{r.EmployeeID}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs font-semibold">
                      Ngày tạo: {new Date(r.CreatedDate).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-bold text-xs px-2.5 py-0.5 rounded-full border",
                          (r.Status === "1" || r.Status === "Đã duyệt") && "bg-green-50 text-green-700 border-green-200",
                          (r.Status === "0" || r.Status === "Chờ duyệt" || !r.Status) && "bg-yellow-50 text-yellow-700 border-yellow-200",
                          (r.Status === "2" || r.Status === "Từ chối") && "bg-red-50 text-red-700 border-red-200",
                        )}
                      >
                        {getStatusText(r.Status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                          onClick={() => openAction(r, "view")}
                        >
                          Xem chi tiết
                        </Button>
                        {
                          hasRole(1) && (
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                              disabled={r.Status === "1" || r.Status === "2" || r.Status === "Đã duyệt" || r.Status === "Từ chối"}
                              onClick={() => openAction(r, "approve")}
                            >
                              Phê duyệt
                            </Button>
                          )
                        }

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
                  <span className="font-medium text-slate-900">{paginatedRequests.length}</span> trên{" "}
                  <span className="font-medium text-slate-900">{filtered.length}</span> yêu cầu
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

      <DetailRequestDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        request={selectedRequest}
        mode={dialogMode}
        onSave={loadRequests}
      />

      <NewRequestDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadRequests}
      />
    </div>
  );
}
