import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Employee } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditEmpDialog } from "@/pages/2-emp-management/EditEmpDialog";
import { EditRoleDialog } from "@/pages/2-emp-management/EditRoleDialog";
import { NewEmpDialog } from "@/pages/2-emp-management/NewEmpDialog";
import { btn, entity, input, page } from "@/pages/page-classes";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Giả lập dữ liệu lớn hơn để test phân trang
const MOCK_DATA: Employee[] = Array.from({ length: 45 }, (_, i) => ({
  EmployeeID: 101 + i,
  Fullname: `Nhân viên ${i + 1}`,
  Email: `emp${i + 1}@company.com`,
  Phone: "0901234567",
  PasswordHash: "xxx",
  Status: i % 3 === 0 ? 0 : 1,
}));

const ITEMS_PER_PAGE = 20;

export default function EmpManagementPage() {
  const [emps, setEmps] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setEmps(MOCK_DATA);
  }, []);

  // Reset về trang 1 khi tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Lọc dữ liệu theo search
  const filteredEmps = emps.filter((e) =>
    e.Fullname.toLowerCase().includes(search.toLowerCase()),
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

  // Khi click chuyển trang
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cuộn đến vị trí của ref này
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className={page.shell}>
      <div ref={topRef} />
      {/* Header Controls */}
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
        <Button className={btn.primary} onClick={() => setIsNewDialogOpen(true)}>
          Thêm người dùng mới
        </Button>
      </div>

      {/* Employee Table */}
      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {paginatedEmps.map((emp) => (
              <TableRow
                key={emp.EmployeeID}
                className={page.tableRow}
              >
                {/* General info */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <div className={entity.rowMeta}>
                      <span className={entity.id}>{emp.EmployeeID}</span>
                      <span className={entity.separator}>·</span>
                      <span
                        className={cn(entity.name, emp.Status === 0 && entity.nameInactive)}
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
                      onClick={() => setIsEditRoleDialogOpen(true)}
                    >
                      Sửa quyền
                    </Button>

                    {/* Cột 3: Trạng thái (Vô hiệu hóa / Mở khóa) */}
                    {emp.Status === 1 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(btn.actionDestructive, "w-full")}
                      >
                        Vô hiệu hóa
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(btn.actionSecondary, "w-full")}
                      >
                        Kích hoạt lại
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* --- Bộ điều khiển Phân trang --- */}
        <div className={page.pagination}>
          <div className={page.paginationText}>
            Hiển thị <span className="font-medium">{paginatedEmps.length}</span>{" "}
            trên <span className="font-medium">{filteredEmps.length}</span> nhân
            viên
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

      <EditEmpDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        employee={selectedEmp}
      />

      <NewEmpDialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen} />

      <EditRoleDialog
        open={isEditRoleDialogOpen}
        onOpenChange={setIsEditRoleDialogOpen}
        emp={selectedEmp}
      />
    </div>
  );
}
