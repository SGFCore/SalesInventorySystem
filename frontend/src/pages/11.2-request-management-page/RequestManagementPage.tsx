import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { RequestForm, RequestDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailRequestDialog } from "@/pages/11.2-request-management-page/DetailRequestDialog";
import { NewRequestDialog } from "@/pages/11.2-request-management-page/NewRequestDialog";
import { page, input, btn } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Mockup Data kết hợp RequestForm và RequestDetail đi kèm
export const MOCK_REQUEST_DETAILS: Record<number, RequestDetail[]> = Array.from(
  { length: 25 },
).reduce<Record<number, RequestDetail[]>>((acc, _, i) => {
  const reqId = 500 + i;
  acc[reqId] = [
    {
      RequestID: reqId,
      ProductId: 10,
      ProductName: "Giấy in A4 Double A c80",
      Quantity: 15 + (i % 3),
    },
    {
      RequestID: reqId,
      ProductId: 11,
      ProductName: "Bút bi Thiên Long FO-03",
      Quantity: 50 + (i % 5) * 10,
    },
  ];
  return acc;
}, {});

const MOCK_REQUESTS: RequestForm[] = Array.from({ length: 25 }, (_, i) => ({
  RequestID: 500 + i,
  EmployeeID: 100 + (i % 4),
  CreatedDate: new Date(2026, 4, 18 - i),
  Status: i % 3 === 0 ? "Chờ duyệt" : i % 3 === 1 ? "Đã duyệt" : "Từ chối",
  ApproverID: i % 3 !== 0 ? 999 : 0,
  RejectReason: i % 3 === 2 ? "Vượt quá định mức ngân sách tháng" : "",
}));

const ITEMS_PER_PAGE = 10;

export default function RequestManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<RequestForm | null>(
    null,
  );

  const topRef = useRef<HTMLDivElement>(null);

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
  const filtered = MOCK_REQUESTS.filter(
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
        <Table>
          <TableBody>
            {paginatedRequests.map((r) => (
              <TableRow
                key={r.RequestID}
                className={page.tableRow}
              >
                <TableCell className="w-24 font-medium text-slate-500">
                  #{r.RequestID}
                </TableCell>
                <TableCell className="text-left font-medium">
                  Nhân viên tạo:{" "}
                  <span className="font-semibold text-slate-900">
                    {r.EmployeeID}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {r.CreatedDate.toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium text-sm",
                      r.Status === "Đã duyệt" && "text-green-600",
                      r.Status === "Chờ duyệt" && "text-amber-500",
                      r.Status === "Từ chối" && "text-red-500",
                    )}
                  >
                    {r.Status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(btn.actionPrimary, "w-32")}
                      onClick={() => openAction(r, "view")}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(btn.actionPrimary, "w-32")}
                      onClick={() => openAction(r, "approve")}
                    >
                      Phê duyệt
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Bộ điều khiển Phân trang */}
        <div className={page.pagination}>
          <div className={page.paginationText}>
            Hiển thị{" "}
            <span className="font-medium">{paginatedRequests.length}</span> trên{" "}
            <span className="font-medium">{filtered.length}</span> yêu cầu
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
      </div>

      <DetailRequestDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        request={selectedRequest}
        mode={dialogMode}
      />

      <NewRequestDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
