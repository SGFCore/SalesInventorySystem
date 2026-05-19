import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { OrderReturn, ReturnDetail, Product } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderReturn: OrderReturn | null;
}

export function DetailOrderReturnDialog({
  open,
  onOpenChange,
  orderReturn,
}: DetailProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<ReturnDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open && orderReturn) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          const [detailsList, prodsList] = await Promise.all([
            api.returnDetails.list(),
            api.products.list(),
          ]);
          setDetails(detailsList.filter((d) => d.ReturnID === orderReturn.ReturnID));
          setProducts(prodsList);
        } catch (e) {
          console.error("Lỗi lấy chi tiết đơn hoàn trả:", e);
        } finally {
          setLoading(false);
        }
      };
      loadDetails();
    }
  }, [open, orderReturn]);

  if (!orderReturn) return null;

  const getProductName = (prodId: number) => {
    const prod = products.find((p) => p.ProductID === prodId);
    return prod ? prod.ProductName : `Sản phẩm #${prodId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết đơn hoàn trả hàng #{orderReturn.ReturnID}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải chi tiết hoàn trả...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Mã Hoàn Trả</Label>
              <span className="col-span-2 font-semibold text-slate-900">
                #{orderReturn.ReturnID}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Mã tham chiếu</Label>
              <span className="col-span-2 font-semibold text-slate-900 text-blue-600">
                {orderReturn.ReturnRefCode}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Đơn hàng gốc</Label>
              <span className="col-span-2 font-semibold text-slate-900">
                {orderReturn.OrderName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Nhân viên tiếp nhận</Label>
              <span className="col-span-2 font-semibold text-slate-900">
                {orderReturn.EmployeeName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Ngày hoàn trả</Label>
              <span className="col-span-2 font-semibold text-slate-900">
                {new Date(orderReturn.ReturnDate).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Lý do hoàn trả</Label>
              <span className="col-span-2 font-semibold text-slate-900">
                {orderReturn.Reason}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500 font-medium">Tổng tiền hoàn</Label>
              <span className="col-span-2 font-bold text-blue-600 text-base">
                {orderReturn.TotalRefund.toLocaleString("vi-VN")} đ
              </span>
            </div>

            {/* Danh sách sản phẩm chi tiết của Đơn hoàn trả */}
            <div className="grid gap-2 mt-2">
              <Label className="text-slate-900 font-bold border-b border-slate-200 pb-2">Sản phẩm hoàn trả</Label>
              <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                <Table>
                  <TableBody>
                    {details.length > 0 ? (
                      details.map((item, idx) => (
                        <TableRow
                          key={idx}
                          className="border-b border-slate-100 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          <TableCell className="py-2.5 font-semibold">
                            {getProductName(item.ProductID)} (Mã: #{item.ProductID})
                          </TableCell>
                          <TableCell className="py-2.5 text-center">
                            SL: <span className="font-bold text-slate-900">{item.Quantity}</span>
                          </TableCell>
                          <TableCell className="py-2.5 text-slate-500 font-medium">
                            QC: <span className="font-semibold text-slate-700">{item.QC_Status || "Chưa QC"}</span>
                          </TableCell>
                          <TableCell className="py-2.5 text-right text-blue-600 font-semibold">
                            {item.ActionTaken || "Đang xử lý"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="py-4 text-center text-xs text-slate-400">
                          Không tìm thấy chi tiết sản phẩm hoàn trả.
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
