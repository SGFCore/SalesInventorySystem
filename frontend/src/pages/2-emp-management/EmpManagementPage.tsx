import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Employee } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditEmpDialog } from "@/pages/2-emp-management/EditEmpDialog";
import { EditRoleDialog } from "@/pages/2-emp-management/EditRoleDialog";
import { NewEmpDialog } from "@/pages/2-emp-management/NewEmpDialog";

import { ChevronLeft, ChevronRight } from "lucide-react"; // Import thêm icon
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
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <div ref={topRef} />
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-slate-200 focus:ring-blue-600"
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsNewDialogOpen(true)}
        >
          Thêm người dùng mới
        </Button>
      </div>

      {/* Employee Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {paginatedEmps.map((emp) => (
              <TableRow
                key={emp.EmployeeID}
                className="hover:bg-slate-50/50 border-b border-slate-100"
              >
                {/* General info */}
                <TableCell>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 text-xs text-slate-300 mb-0.5">
                      <div className="text-black">{emp.EmployeeID}</div> -
                      <span
                        className={cn(
                          "font-bold",
                          emp.Status === 1 && "text-black",
                        )}
                      >
                        {emp.Fullname}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "italic text-[10px]",
                        emp.Status === 1 ? "text-green-500" : "text-slate-300",
                      )}
                    >
                      {emp.Status === 1 ? "Đang hoạt động" : "Nghỉ việc"}
                    </div>
                  </div>
                </TableCell>

                {/* Contact info */}
                <TableCell>
                  <div
                    className={cn(
                      "flex flex-col items-start text-sm",
                      emp.Status === 0 ? "text-slate-300" : "text-black",
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
                      className="text-blue-600 border-blue-100 hover:bg-blue-50 w-full"
                      onClick={() => handleEditClick(emp)}
                    >
                      Cập nhật
                    </Button>

                    {/* Cột 2: Sửa quyền */}
                    <Button
                      disabled={emp.Status === 0}
                      variant="outline"
                      size="sm"
                      className="text-slate-600 hover:bg-slate-100 w-full"
                      onClick={() => setIsEditRoleDialogOpen(true)}
                    >
                      Sửa quyền
                    </Button>

                    {/* Cột 3: Trạng thái (Vô hiệu hóa / Mở khóa) */}
                    {emp.Status === 1 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:bg-red-100 hover:text-red-600 border-red-500 w-full"
                      >
                        Vô hiệu hóa
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-slate-600 hover:bg-slate-100 w-full"
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
        <div className="flex items-center justify-between px-4 py-4">
          <div className="text-sm text-slate-500">
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
                      "h-8 w-8 p-0 text-white",
                      currentPage === page ? "bg-blue-600" : "text-slate-600",
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
