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
import type { Order, OrderDetail, Product, Customer } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function DetailOrderDialog({ open, onOpenChange, order }: DetailProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (open && order) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          const [allDetails, allProds, allCustomers] = await Promise.all([
            api.orderDetails.list(),
            api.products.list(),
            api.customers.list(),
          ]);
          const filtered = allDetails.filter((d) => d.OrderID === order.id);
          setDetails(filtered);
          setProducts(allProds);
          const cust = allCustomers.find((c) => c.id === order.customerId);
          setCustomer(cust || null);
        } catch (e) {
          console.error("Lỗi lấy chi tiết đơn hàng:", e);
        } finally {
          setLoading(false);
        }
      };
      loadDetails();
    }
  }, [open, order]);

  if (!order) return null;

  const getProductName = (prodId: number) => {
    const prod = products.find((p) => p.ProductID === prodId);
    return prod ? prod.ProductName : `Sản phẩm #${prodId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[650px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Chi tiết Đơn Hàng #{order.id}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải chi tiết đơn hàng...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Khách hàng</Label>
                <span className="font-semibold text-slate-900">
                  {customer ? `${customer.firstname} ${customer.lastname}` : `Khách hàng #${order.customerId}`}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Mã Hóa Đơn</Label>
                <span className="font-semibold text-slate-900">
                  #{order.invoiceId || "Không có"}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Mã Vận Đơn</Label>
                <span className="font-semibold text-slate-900 text-blue-600">
                  {order.shipcode || "Chưa có"}
                </span>
              </div>
              <div className="grid gap-1">
                <Label className="text-slate-500 text-xs">Phí vận chuyển</Label>
                <span className="font-semibold text-slate-900">
                  {(order.shippingfee || 0).toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="grid gap-1 md:col-span-2">
                <Label className="text-slate-500 text-xs">
                  Ghi chú giao hàng
                </Label>
                <span className="font-semibold text-slate-900">
                  {order.shipmentnote || "Không có"}
                </span>
              </div>
            </div>

            <div className="grid gap-2 mt-4">
              <Label className="text-slate-900 font-bold border-b border-slate-200 pb-2">
                Chi tiết sản phẩm
              </Label>
              <div className="border border-slate-200 overflow-hidden rounded-md">
                <Table>
                  <TableBody>
                    {details.length > 0 ? (
                      details.map((item, idx) => (
                        <TableRow key={idx} className="border-b border-slate-100 bg-white">
                          <TableCell className="py-2 text-xs font-semibold text-slate-700">
                            {getProductName(item.ProductID)} (Mã: #{item.ProductID})
                          </TableCell>
                          <TableCell className="py-2 text-xs text-center text-slate-600">
                            SL: <span className="font-bold">{item.Quantity}</span>
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right text-slate-900 font-semibold">
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
                          Chưa cập nhật chi tiết sản phẩm.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end pt-2 border-t border-slate-100 mt-2">
                <span className="text-sm font-semibold text-slate-500 mr-4">
                  Tổng cộng (đã gồm ship):
                </span>
                <span className="text-base font-bold text-blue-600">
                  {(order.totalamount || 0).toLocaleString("vi-VN")} đ
                </span>
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
