import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Invoice, InvoiceDetail, Product } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

export function DetailInvoiceDialog({
  open,
  onOpenChange,
  invoice,
}: DetailProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<InvoiceDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open && invoice) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          const [allDetails, allProds] = await Promise.all([
            api.invoiceDetails.list(),
            api.products.list(),
          ]);
          const filtered = allDetails.filter((d) => d.InvoiceID === invoice.InvoiceID);
          setDetails(filtered);
          setProducts(allProds);
        } catch (e) {
          console.error("Lỗi lấy chi tiết hóa đơn:", e);
        } finally {
          setLoading(false);
        }
      };
      loadDetails();
    }
  }, [open, invoice]);

  if (!invoice) return null;

  const getStatusText = (status: string) => {
    switch (status) {
      case "0":
        return "Chờ thanh toán";
      case "1":
        return "Đã thanh toán";
      case "2":
        return "Thanh toán 1 phần";
      default:
        return "Không xác định";
    }
  };

  const getProductName = (prodId: number) => {
    const prod = products.find((p) => p.ProductID === prodId);
    return prod ? prod.ProductName : `Sản phẩm #${prodId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Chi tiết Hóa Đơn #{invoice.InvoiceID}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải chi tiết hóa đơn...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Mã khách hàng</Label>
                <span className="font-medium text-slate-900">
                  #{invoice.CustomerID}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Mã nhân viên</Label>
                <span className="font-medium text-slate-900">
                  #{invoice.EmployeeID}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Ngày lập</Label>
                <span className="font-medium text-slate-900">
                  {new Date(invoice.InvoiceDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Kênh bán</Label>
                <span className="font-medium text-slate-900">
                  {invoice.SaleChannelCode === 0
                    ? "Tại quầy"
                    : "Mạng xã hội/Online"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-2">
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Trạng thái</Label>
                <span className="font-medium text-slate-900">
                  {getStatusText(invoice.Status)}
                </span>
              </div>
              <div className="grid gap-1 text-right">
                <Label className="text-slate-500 text-xs">Tổng thanh toán</Label>
                <span className="font-bold text-lg text-blue-600">
                  {invoice.FinalAmount.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>

            {/* Danh sách sản phẩm thành phần */}
            <div className="grid gap-2 mt-4">
              <Label className="text-slate-900 font-bold border-b border-slate-200 pb-2">
                Danh sách sản phẩm
              </Label>
              <div className="border border-slate-200 overflow-hidden rounded-md">
                <Table>
                  <TableBody>
                    {details.length > 0 ? (
                      details.map((item, idx) => (
                        <TableRow key={idx} className="border-b border-slate-100 bg-white">
                          <TableCell className="py-2 text-xs font-semibold text-slate-700">
                            {getProductName(item.ProductID)} (#{item.ProductID})
                          </TableCell>
                          <TableCell className="py-2 text-xs text-center text-slate-600">
                            SL: <span className="font-bold">{item.Quantity}</span>
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right text-slate-900 font-medium">
                            {(item.Quantity * item.UnitPrice).toLocaleString("vi-VN")} đ
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          className="py-4 text-center text-xs text-slate-400"
                          colSpan={3}
                        >
                          Không có chi tiết sản phẩm.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 w-24"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
