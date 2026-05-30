import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import type { Exportreceipt, Exportreceiptdetail, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dialog } from "@/pages/page-classes";
import { Loader2, FileText, Calendar, User, Package, Warehouse } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exportReceipt: Exportreceipt | null;
}

export function DetailExportReceiptDialog({ open, onOpenChange, exportReceipt }: Props) {
  const [details, setDetails] = useState<Exportreceiptdetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && exportReceipt) {
      loadDetails();
    }
  }, [open, exportReceipt]);

  const loadDetails = async () => {
    setLoading(true);
    try {
      const [detailData, productData] = await Promise.all([
        api.exportReceiptDetails.list(),
        api.products.list(),
      ]);
      setDetails(detailData.filter((d) => d.ExportReceiptID === exportReceipt?.id));
      setProducts(productData);
    } catch (error) {
      console.error("Lỗi tải chi tiết phiếu xuất:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!exportReceipt) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[700px]", dialog.content)}>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <DialogTitle className={dialog.title}>
              Chi tiết phiếu xuất kho #{exportReceipt.id}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4 border-y border-slate-100 mb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">Ngày tạo</span>
                <span className="text-sm font-semibold text-slate-700">
                  {new Date(exportReceipt.createddate).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">Người thực hiện</span>
                <span className="text-sm font-semibold text-slate-700">Mã NV: {exportReceipt.employeeId}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400">Kho xuất</span>
                <span className="text-sm font-semibold text-slate-700">Mã kho: {exportReceipt.warehouseId}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Trạng thái</span>
              <span className={cn(
                "text-xs font-bold w-fit px-2 py-0.5 rounded-full border mt-1",
                exportReceipt.status === "Đã hoàn thành" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
              )}>
                {exportReceipt.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-600" />
            Danh sách sản phẩm xuất kho
          </Label>
          
          <div className="border rounded-lg overflow-hidden border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableCell className="text-[10px] uppercase font-bold text-slate-500 py-3">Sản phẩm</TableCell>
                  <TableCell className="text-[10px] uppercase font-bold text-slate-500 py-3 text-center">Số lượng</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="py-10">
                      <div className="flex justify-center items-center gap-2 text-slate-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang tải chi tiết...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : details.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="py-10 text-center text-slate-400 text-sm">
                      Phiếu xuất này không có chi tiết sản phẩm hoặc đang được xử lý.
                    </TableCell>
                  </TableRow>
                ) : (
                  details.map((item, idx) => {
                    const product = products.find(p => p.ProductID === item.ProductID);
                    return (
                      <TableRow key={idx} className="hover:bg-slate-50">
                        <TableCell className="py-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{product?.ProductName || "N/A"}</span>
                            <span className="text-[10px] text-slate-400 font-medium">Mã SP: #{item.ProductID}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 text-center font-bold text-blue-600">
                          {item.Quantity}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ghi chú / Lý do</span>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {exportReceipt.reason || "Không có ghi chú."}
          </p>
        </div>

        <DialogFooter className="mt-6 border-t border-slate-100 pt-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
