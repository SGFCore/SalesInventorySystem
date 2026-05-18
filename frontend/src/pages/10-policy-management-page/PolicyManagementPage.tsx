import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ReturnPolicy } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailPolicyDialog } from "@/pages/10-policy-management-page/DetailPolicyDialog";
import { EditPolicyDialog } from "@/pages/10-policy-management-page/EditPolicyDialog";
import { NewPolicyDialog } from "@/pages/10-policy-management-page/NewPolicyDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MOCK_POLICIES: ReturnPolicy[] = Array.from({ length: 25 }, (_, i) => ({
  PolicyID: 200 + i,
  PolicyName:
    i === 0
      ? "Chính sách đổi trả tiêu chuẩn"
      : i === 1
        ? "Chính sách đổi trả hàng VIP"
        : i === 2
          ? "Chính sách đổi trả hàng khuyến mãi"
          : `Chính sách đổi trả áp dụng đợt ${i}`,
  MaxReturnDays: 7 + (i % 4) * 7, // 7, 14, 21, 28 ngày
  PenaltyFeeRate: (i % 3) * 5, // 0%, 5%, 10%
  EffectiveDate: new Date(2026, 4, 1 + i),
  IsActive: i % 6 === 5 ? 0 : 1, // 1: Hoạt động, 0: Tạm dừng
}));

const ITEMS_PER_PAGE = 10;

export default function PolicyManagementPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPolicy, setSelectedPolicy] = useState<ReturnPolicy | null>(
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
  const [isNewOpen, setIsNewOpen] = useState(false);

  const filtered = MOCK_POLICIES.filter((p) =>
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
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />

      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Tìm kiếm chính sách..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-slate-200 focus:ring-blue-600 rounded-none"
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
          onClick={() => setIsNewOpen(true)}
        >
          Thêm chính sách mới
        </Button>
      </div>

      <div className="border border-slate-200 overflow-hidden">
        <Table>
          <TableBody>
            {paginatedPolicies.map((p) => (
              <TableRow
                key={p.PolicyID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                <TableCell className="w-20 font-medium text-slate-500">
                  {p.PolicyID}
                </TableCell>
                <TableCell className="font-semibold text-left">
                  {p.PolicyName}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium text-sm",
                      p.IsActive === 1 ? "text-green-600" : "text-slate-400",
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
                      className="text-blue-600 border-blue-200 w-32 rounded-none"
                      onClick={() => openAction(p, "detail")}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 w-32 rounded-none"
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

        {/* Bộ điều khiển Phân trang */}
        <div className="flex items-center justify-between px-4 py-4 bg-white border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Hiển thị{" "}
            <span className="font-medium">{paginatedPolicies.length}</span> trên{" "}
            <span className="font-medium">{filtered.length}</span> chính sách
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
                      "h-8 w-8 p-0 rounded-none",
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
      <DetailPolicyDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        policy={selectedPolicy}
      />
      <EditPolicyDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        policy={selectedPolicy}
      />
      <NewPolicyDialog open={isNewOpen} onOpenChange={setIsNewOpen} />
    </div>
  );
}
