import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Employee } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditEmpDialog } from "@/pages/2-emp-management/EditEmpDialog";
import { EditRoleDialog } from "@/pages/2-emp-management/EditRoleDialog";
import { NewEmpDialog } from "@/pages/2-emp-management/NewEmpDialog";
import { btn, entity, input, page } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ITEMS_PER_PAGE = 20;

export default function EmpManagementPage() {
  const [emps, setEmps] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const loadEmps = async () => {
    setLoading(true);
    try {
      const [empData, roleData] = await Promise.all([
        api.employees.list(),
        api.employeeRoles.list(),
      ]);

      if (!empData || empData.length === 0) {
        toast.error("Không có dữ liệu");
        setEmps([]);
        return;
      }

      // Lọc bỏ những nhân viên có quyền Quản lý (RoleID = 1)
      // Phạm Văn Quản Lý có RoleID là 1 nên sẽ bị loại bỏ khỏi danh sách này
      const managerIds = new Set(
        roleData
          .filter((r: any) => r.roleId === 1)
          .map((r: any) => r.employeeId)
      );

      const nonManagerEmps = empData.filter(
        (emp) => !managerIds.has(emp.EmployeeID)
      );

      setEmps(nonManagerEmps);
    } catch (error: any) {
      toast.error(error.message || "Không thể tải danh sách nhân viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmps();
  }, []);

  // Reset về trang 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo search (tên hoặc số điện thoại)
  const filteredEmps = emps.filter((e) =>
    e.Fullname.toLowerCase().includes(search.toLowerCase()) ||
    (e.Phone && e.Phone.includes(search))
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredEmps.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmps = filteredEmps.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleEditClick = (emp: Employee) => {
    setSelectedEmp(emp);
    setIsEditDialogOpen(true);
  };

  const handleRoleClick = (emp: Employee) => {
    setSelectedEmp(emp);
    setIsEditRoleDialogOpen(true);
  };

  const toggleStatus = async (emp: Employee) => {
    try {
      const newStatus = emp.Status === 1 ? 0 : 1;
      await api.employees.update(emp.EmployeeID, {
        ...emp,
        Status: newStatus,
      });
      toast.success(
        newStatus === 1
          ? "Kích hoạt nhân viên thành công!"
          : "Vô hiệu hóa nhân viên thành công!",
      );
      loadEmps();
    } catch (error: any) {
      toast.error("Thay đổi trạng thái thất bại: " + error.message);
    }
  };

  // Khi click chuyển trang
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className={page.shell}>
      <div ref={topRef} />
      {/* Header Controls */}
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo tên hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button
          className={btn.primary}
          onClick={() => setIsNewDialogOpen(true)}
        >
          Thêm nhân viên mới
        </Button>
      </div>

      {/* Employee Table */}
      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">
              Đang tải dữ liệu nhân viên...
            </span>
          </div>
        ) : paginatedEmps.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            Không tìm thấy nhân viên nào hợp lệ.
          </div>
        ) : (
          <>
            <Table>
              <TableBody>
                {paginatedEmps.map((emp, index) => (
                  <TableRow key={emp.EmployeeID} className={page.tableRow}>
                    {/* General info */}
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <div className={entity.rowMeta}>
                          {/* Hiển thị số thứ tự (STT) thay vì EmployeeID gốc của DB */}
                          <span className={entity.id}>{startIndex + index + 1}</span>
                          <span className={entity.separator}>·</span>
                          <span
                            className={cn(
                              entity.name,
                              emp.Status === 0 && entity.nameInactive,
                            )}
                          >
                            {emp.Fullname}
                          </span>
                        </div>
                        <span
                          className={cn(
                            emp.Status === 1
                              ? entity.statusActive
                              : entity.statusInactive,
                          )}
                        >
                          {emp.Status === 1 ? "Đang hoạt động" : "Nghỉ việc"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Contact info */}
                    <TableCell>
                      <div
                        className={cn(
                          "flex flex-col items-start gap-0.5",
                          emp.Status === 0
                            ? entity.cellValueInactive
                            : entity.cellValue,
                        )}
                      >
                        <span>{emp.Email}</span>
                        <span>{emp.Phone}</span>
                      </div>
                    </TableCell>

                    {/* Action buttons */}
                    <TableCell>
                      <div className="grid grid-cols-3 gap-2 w-full max-w-[400px] ml-auto">
                        {/* Cột 1: Cập nhật */}
                        <Button
                          disabled={emp.Status === 0}
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionPrimary, "w-full")}
                          onClick={() => handleEditClick(emp)}
                        >
                          Cập nhật
                        </Button>

                        {/* Cột 2: Sửa quyền */}
                        <Button
                          disabled={emp.Status === 0}
                          variant="outline"
                          size="sm"
                          className={cn(btn.actionSecondary, "w-full")}
                          onClick={() => handleRoleClick(emp)}
                        >
                          Sửa quyền
                        </Button>

                        {/* Cột 3: Trạng thái */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            emp.Status === 1
                              ? btn.actionDestructive
                              : btn.actionSecondary,
                            "w-full",
                          )}
                          onClick={() => toggleStatus(emp)}
                        >
                          {emp.Status === 1 ? "Vô hiệu hóa" : "Kích hoạt lại"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* --- Bộ điều khiển Phân trang --- */}
            {totalPages > 0 && (
              <div className={page.pagination}>
                <div className={page.paginationText}>
                  Hiển thị{" "}
                  <span className="font-medium">{paginatedEmps.length}</span>{" "}
                  trên{" "}
                  <span className="font-medium">{filteredEmps.length}</span>{" "}
                  nhân viên
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

      <EditEmpDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        employee={selectedEmp}
        onSave={loadEmps}
      />

      <NewEmpDialog
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        onSave={loadEmps}
      />

      <EditRoleDialog
        open={isEditRoleDialogOpen}
        onOpenChange={setIsEditRoleDialogOpen}
        emp={selectedEmp}
        onSave={loadEmps}
      />
    </div>
  );
}
