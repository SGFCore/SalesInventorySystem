import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { page, btn, input } from "@/pages/page-classes";
import { useDashboard } from "@/context/dashboardContext";
import { api } from "@/lib/api";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Loader2, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import type { Invoice } from "@/lib/types";

export default function RevenueReportPage() {
  const { invoices, loading } = useDashboard();
  const [startDateStr, setStartDateStr] = useState(new Date(new Date().setDate(1)).toISOString().split('T')[0]);
  const [endDateStr, setEndDateStr] = useState(new Date().toISOString().split('T')[0]);

  const filteredData = useMemo(() => {
    if (!invoices) return [];
    const startBoundary = startOfDay(new Date(startDateStr));
    const endBoundary = endOfDay(new Date(endDateStr));

    return invoices.filter((item: Invoice) => {
      if (!item.InvoiceDate) return false;
      try {
        const itemDate = parseISO(item.InvoiceDate);
        return isWithinInterval(itemDate, { start: startBoundary, end: endBoundary });
      } catch {
        return false;
      }
    });
  }, [invoices, startDateStr, endDateStr]);

  const handleExport = async () => {
    toast.info("Đang khởi tạo tệp PDF...");
    try {
      await api.reports.downloadRevenuePdf(startDateStr, endDateStr);
      toast.success("Tải báo cáo thành công!");
    } catch (e: any) {
      console.error("PDF Download Error:", e);
      toast.error(`Lỗi khi tải báo cáo: ${e.message}`);
    }
  };

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Từ ngày</span>
            <Input
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className={cn(input.search, "w-40")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Đến ngày</span>
            <Input
              type="date"
              value={endDateStr}
              onChange={(e) => setEndDateStr(e.target.value)}
              className={cn(input.search, "w-40")}
            />
          </div>
        </div>
        <Button variant="outline" className={cn(btn.actionSecondary, "mt-5")} onClick={handleExport}>
          <FileDown className="h-4 w-4 mr-2" />
          Xuất PDF
        </Button>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center items-center py-20 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải báo cáo...</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white">
            Không có dữ liệu trong khoảng thời gian này.
          </div>
        ) : (
          <Table>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.InvoiceID} className={page.tableRow}>
                  <TableCell className="w-32">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">#{item.InvoiceID}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{new Date(item.InvoiceDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Khách hàng</span>
                      <span className="text-sm font-bold text-slate-800">ID: {item.CustomerID}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Kênh bán</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit",
                        item.SaleChannelCode === 0 ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-purple-50 text-purple-700 border-purple-200"
                      )}>
                        {item.SaleChannelCode === 0 ? "Tại quầy" : "Trực tuyến"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Tổng tiền</span>
                      <span className="text-sm font-bold text-blue-600">
                        {item.FinalAmount?.toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
