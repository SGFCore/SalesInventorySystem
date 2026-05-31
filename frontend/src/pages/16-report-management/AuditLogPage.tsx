import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { page, input } from "@/pages/page-classes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NativeSelect } from "@/components/ui/native-select";
import { apiClient } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";

interface AuditLog {
  timestamp: string;
  employeeName: string;
  role: string;
  actionType: string;
  targetType: string;
  targetName: string;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filters state (UC70)
  const [employee, setEmployee] = useState("");
  const [targetType, setTargetType] = useState("ALL");
  const [targetName, setTargetName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (employee) params.append("employeeName", employee);
      if (targetType !== "ALL") params.append("targetType", targetType);
      if (targetName) params.append("targetName", targetName);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      
      const data = await apiClient.get<AuditLog[]>(`/history?${params.toString()}`);
      setLogs(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchLogs, 300);
    return () => clearTimeout(timer);
  }, [employee, targetType, targetName, startDate, endDate]);

  const getActionConfig = (type: string) => {
    switch (type) {
      case 'CREATE': return { label: 'Thêm mới', class: "bg-green-50 text-green-700 border-green-200" };
      case 'UPDATE': return { label: 'Cập nhật', class: "bg-blue-50 text-blue-700 border-blue-200" };
      case 'DELETE': return { label: 'Xóa', class: "bg-red-50 text-red-700 border-red-200" };
      default: return { label: type, class: "bg-slate-50 text-slate-600 border-slate-200" };
    }
  };

  return (
    <div className={page.shell}>
      <div className={cn(page.header, "flex-col items-start gap-4")}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Nhân viên</label>
            <Input 
              placeholder="Tên nhân viên..." 
              value={employee} 
              onChange={e => setEmployee(e.target.value)}
              className={input.search}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Loại đối tượng</label>
            <NativeSelect value={targetType} onChange={e => setTargetType(e.target.value)}>
              <option value="ALL">Tất cả</option>
              <option value="Sản phẩm">Sản phẩm</option>
              <option value="Đơn hàng">Đơn hàng</option>
              <option value="Hóa đơn">Hóa đơn</option>
              <option value="Kho">Kho</option>
              <option value="Khách hàng">Khách hàng</option>
            </NativeSelect>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Tên đối tượng</label>
            <Input 
              placeholder="Gấu bông, Kho A..." 
              value={targetName} 
              onChange={e => setTargetName(e.target.value)}
              className={input.search}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Từ ngày</label>
            <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={input.search}/>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Đến ngày</label>
            <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={input.search}/>
          </div>
        </div>
      </div>

      <div className={page.tableWrap}>
        <Table>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-10">Đang tải...</TableCell></TableRow>
            ) : logs.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-10">Trống</TableCell></TableRow>
            ) : logs.map((log, idx) => {
              const cfg = getActionConfig(log.actionType);
              return (
                <TableRow key={idx} className={page.tableRow}>
                  <TableCell className="w-40 text-xs font-semibold text-slate-500">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="w-56">
                    <div className="font-bold text-slate-700 leading-tight">{log.employeeName}</div>
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{log.role}</div>
                  </TableCell>
                  <TableCell className="w-32">
                    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase py-0", cfg.class)}>
                      {cfg.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-32">
                    <Badge variant="outline" className="text-[10px] font-bold bg-slate-50 text-slate-500 border-slate-200 uppercase py-0">
                      {log.targetType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-800">
                    {log.targetName || "---"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
