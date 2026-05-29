import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { page, btn } from "@/pages/page-classes";
import { useDashboard } from "@/context/dashboardContext";
import { api } from "@/lib/api";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NativeSelect } from "@/components/ui/native-select";
import type { Detailinventory } from "@/lib/types";

export default function InventoryReportPage() {
  const { detailInventories, warehouses, products, loading } = useDashboard();
  const [selectedWh, setSelectedWh] = useState<string>("ALL");
  const [selectedProd, setSelectedProd] = useState<string>("ALL");

  const filteredData = useMemo(() => {
    if (!detailInventories) return [];
    return detailInventories.filter((item: Detailinventory) => {
      const matchWh = selectedWh === "ALL" || item.WarehouseID.toString() === selectedWh;
      const matchProd = selectedProd === "ALL" || item.ProductID.toString() === selectedProd;
      return matchWh && matchProd;
    });
  }, [detailInventories, selectedWh, selectedProd]);

  const handleExport = async () => {
    toast.info("Đang khởi tạo tệp PDF...");
    try {
      await api.reports.downloadInventoryPdf(selectedWh, selectedProd);
      toast.success("Tải báo cáo thành công!");
    } catch (e: any) {
      console.error("PDF Download Error:", e);
      toast.error(`Lỗi khi tải báo cáo: ${e.message}`);
    }
  };

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Chọn kho</span>
            <NativeSelect
              value={selectedWh}
              onChange={(e) => setSelectedWh(e.target.value)}
              className="w-48"
            >
              <option value="ALL">Tất cả kho</option>
              {warehouses?.map(wh => (
                <option key={wh.WareHouseID} value={wh.WareHouseID.toString()}>{wh.WareHouseName}</option>
              ))}
            </NativeSelect>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Chọn mặt hàng</span>
            <NativeSelect
              value={selectedProd}
              onChange={(e) => setSelectedProd(e.target.value)}
              className="w-64"
            >
              <option value="ALL">Tất cả mặt hàng</option>
              {products?.map(p => (
                <option key={p.ProductID} value={p.ProductID.toString()}>{p.ProductName}</option>
              ))}
            </NativeSelect>
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
            Không tìm thấy dữ liệu tồn kho.
          </div>
        ) : (
          <Table>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={`${item.WarehouseID}-${item.ProductID}`} className={page.tableRow}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Sản phẩm</span>
                      <span className="text-sm font-bold text-slate-800">Mã SP: {item.ProductID}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Kho</span>
                      <span className="text-sm font-medium text-slate-600">ID: {item.WarehouseID}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Tồn thực tế</span>
                      <span className="text-sm font-bold text-slate-900">{item.RealStock}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Có thể bán</span>
                      <span className="text-sm font-bold text-green-600">{item.AvailableStock}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-semibold text-slate-400 uppercase">Trạng thái</span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                        item.AvailableStock < (item.MinStock || 5) ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
                      )}>
                        {item.AvailableStock < (item.MinStock || 5) ? "Sắp hết hàng" : "Đủ hàng"}
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
