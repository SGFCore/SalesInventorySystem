import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { page, input, entity } from "@/pages/page-classes";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NativeSelect } from "@/components/ui/native-select";

// Fake Data
const FAKE_AUDIT_LOGS = [
  { id: 1, time: "2024-05-20 09:15:22", employee: "Nguyễn Văn A", action: "Thêm mới", target: "Sản phẩm: iPhone 15", type: "CREATE" },
  { id: 2, time: "2024-05-20 10:30:45", employee: "Trần Thị B", action: "Cập nhật", target: "Đơn hàng: #ORD123", type: "UPDATE" },
  { id: 3, time: "2024-05-20 11:05:10", employee: "Lê Văn C", action: "Xóa", target: "Khách hàng: Anh Tuấn", type: "DELETE" },
  { id: 4, time: "2024-05-20 14:20:15", employee: "Nguyễn Văn A", action: "Duyệt", target: "Phiếu kiểm kê: #CS55", type: "APPROVE" },
  { id: 5, time: "2024-05-21 08:45:00", employee: "Phạm Minh D", action: "Đăng nhập", target: "Hệ thống", type: "LOGIN" },
];

export default function AuditLogPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filtered = FAKE_AUDIT_LOGS.filter(log => 
    log.employee.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === "ALL" || log.type === filterType)
  );

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className="flex gap-4 w-full">
          <Input
            placeholder="Tìm kiếm theo tên nhân viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(input.search, "max-w-md")}
          />
          <NativeSelect 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-48"
          >
            <option value="ALL">Tất cả thao tác</option>
            <option value="CREATE">Thêm mới</option>
            <option value="UPDATE">Cập nhật</option>
            <option value="DELETE">Xóa</option>
            <option value="APPROVE">Duyệt</option>
            <option value="LOGIN">Đăng nhập</option>
          </NativeSelect>
        </div>
      </div>

      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {filtered.map((log) => (
              <TableRow key={log.id} className={page.tableRow}>
                <TableCell className={cn("w-48 text-xs font-semibold text-slate-500")}>
                  {log.time}
                </TableCell>
                <TableCell className={cn("font-bold text-slate-700")}>
                  {log.employee}
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full border",
                    log.type === 'CREATE' ? "bg-green-50 text-green-700 border-green-200" :
                    log.type === 'DELETE' ? "bg-red-50 text-red-700 border-red-200" :
                    log.type === 'UPDATE' ? "bg-blue-50 text-blue-700 border-blue-200" :
                    "bg-slate-50 text-slate-600 border-slate-200"
                  )}>
                    {log.action}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {log.target}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
