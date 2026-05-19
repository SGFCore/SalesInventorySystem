import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ReturnPolicy } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailPolicyDialog } from "@/pages/10-policy-management-page/DetailPolicyDialog";
import { EditPolicyDialog } from "@/pages/10-policy-management-page/EditPolicyDialog";
import { NewPolicyDialog } from "@/pages/10-policy-management-page/NewPolicyDialog";
import { page, input, btn, entity } from "@/pages/page-classes";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

export default function PolicyManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [policies, setPolicies] = useState<ReturnPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState<ReturnPolicy | null>(
    null,
  );

  const topRef = useRef<HTMLDivElement>(null);

  const loadPolicies = async () => {
    setLoading(true);
    try {
      const data = await api.returnPolicies.list();
      if (!data || data.length === 0) {
        toast.error("Không có dữ liệu chính sách");
        setPolicies([]);
      } else {
        setPolicies(data.sort((a, b) => b.PolicyID - a.PolicyID));
      }
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải chính sách đổi trả");
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
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

  const filtered = policies.filter((p) =>
    p.PolicyName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPolicies = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openAction = (
    policyObj: ReturnPolicy,
    actionType: "detail" | "edit",
  ) => {
    setSelectedPolicy(policyObj);
    if (actionType === "detail") setIsDetailOpen(true);
    if (actionType === "edit") setIsEditOpen(true);
  };

  return (
    <div className={page.shell}>
      <div ref={topRef} />

      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm chính sách..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewOpen(true)}
        >
          Thêm chính sách mới
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải danh sách...</span>
          </div>
        ) : paginatedPolicies.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không tìm thấy chính sách đổi trả nào.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedPolicies.map((p) => (
                  <TableRow
                    key={p.PolicyID}
                    className={page.tableRow}
                  >
                    <TableCell className={cn("w-20", entity.id)}>
                      #{p.PolicyID}
                    </TableCell>
                    <TableCell className={cn("text-left font-semibold text-slate-900", entity.name)}>
                      {p.PolicyName}
                    </TableCell>
                    <TableCell className="text-center font-medium text-xs text-slate-500">
                      Hạn trả: <span className="font-bold text-slate-800">{p.MaxReturnDays} ngày</span>
                    </TableCell>
                    <TableCell className="text-center font-medium text-xs text-slate-500">
                      Phí phạt: <span className="font-bold text-red-600">{p.PenaltyFeeRate * 100}%</span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-semibold text-xs border rounded-full px-2.5 py-0.5",
                          p.IsActive === 1
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-50 text-slate-500 border-slate-200",
                        )}
                      >
                        {p.IsActive === 1 ? "Đang hoạt động" : "Tạm dừng"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                          onClick={() => openAction(p, "detail")}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-28 text-xs font-semibold")}
                          onClick={() => openAction(p, "edit")}
                        >
                          Cập nhật
                        </Button>
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
                  <span className="font-medium text-slate-900">{paginatedPolicies.length}</span> trên{" "}
                  <span className="font-medium text-slate-900">{filtered.length}</span> chính sách
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

      {/* Các Dialog điều khiển */}
      <DetailPolicyDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        policy={selectedPolicy}
      />
      {selectedPolicy && (
        <EditPolicyDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          policy={selectedPolicy}
          onSave={loadPolicies}
        />
      )}
      <NewPolicyDialog
        open={isNewOpen}
        onOpenChange={setIsNewOpen}
        onSave={loadPolicies}
      />
    </div>
  );
}
