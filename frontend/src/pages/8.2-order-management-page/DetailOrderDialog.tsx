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
  saleChannelCode?: number;
}

export function DetailOrderDialog({ open, onOpenChange, order, saleChannelCode }: DetailProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (open && order) {
      const loadDetails = async () => {
        setLoading(true);
        try {
          // Tải song song tất cả các nguồn dữ liệu có thể chứa chi tiết sản phẩm
          const [allOrderDetails, allInvDetails, allProds, allCustomers] = await Promise.all([
            api.orderDetails.list(),
            api.invoiceDetails.list(),
            api.products.list(),
            api.customers.list(),
          ]);
          
          setProducts(allProds);
          const cust = allCustomers.find((c) => c.id === order.customerId);
          setCustomer(cust || null);

          const orderId = order.id;
          const invoiceId = order.invoiceId || (order.invoice as any)?.InvoiceID;

          // 1. Thử tìm trong OrderDetails (quy trình chuẩn cho Đơn hàng)
          let filtered = allOrderDetails
            .filter((d: any) => 
              (d.OrderID || d.orderid) == orderId || 
              (invoiceId && (d.OrderID || d.orderid) == invoiceId)
            );

          // 2. Nếu không có trong OrderDetails, thử tìm trong InvoiceDetails (quy trình cho Hóa đơn/Đơn tại quầy đã thanh toán)
          if (filtered.length === 0 && (invoiceId || orderId)) {
            const targetId = invoiceId || orderId;
            const fromInvoice = allInvDetails.filter((d: any) => 
              (d.InvoiceID || d.invoiceid) == targetId || 
              (d.InvoiceID || d.invoiceid) == orderId
            );

            if (fromInvoice.length > 0) {
              filtered = fromInvoice.map((id: any) => ({
                OrderDetailID: id.InvoiceDetailID || id.id || id.invoicedetailid,
                OrderID: orderId,
                ProductID: id.ProductID || id.productid,
                ComboID: id.ComboID || id.comboid,
                Quantity: id.Quantity || id.quantity,
                UnitPrice: id.UnitPrice || id.unitprice,
                DiscountAmount: id.DiscountAmount || id.discountamount,
                TotalAmount: id.TotalAmount || id.totalamount
              } as OrderDetail));
            }
          }

          setDetails(filtered);
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

  const getProductName = (item: any) => {
    const prodId = item.ProductID || item.productid;
    const prod = products.find((p) => (p as any).ProductID == prodId || (p as any).id == prodId);
    return prod ? (prod as any).ProductName || (prod as any).productname : `Sản phẩm #${prodId}`;
  };

  const renderValue = (val: any) =>
    val || <span className="text-slate-400">(Không có)</span>;

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
              {saleChannelCode !== 0 && (
                <>
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
                </>
              )}
            </div>

            <div className="grid gap-2 mt-4">
              <Label className="text-slate-900 font-bold border-b border-slate-200 pb-2">
                Thông tin khách hàng
              </Label>
              {customer ? (
                <div className="grid gap-3 border border-slate-200 p-3 rounded-md bg-slate-50/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-500 text-xs">Mã khách hàng</Label>
                      <p className="font-medium text-sm">#{customer.id}</p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Loại khách hàng</Label>
                      <p className="font-medium text-sm">{customer.customertypeId}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Họ và Tên</Label>
                    <p className="font-medium text-base text-blue-700">
                      {customer.firstname} {customer.lastname}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Tên công ty</Label>
                    <p className="font-medium text-sm">{renderValue(customer.companyname)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-500 text-xs">Điện thoại</Label>
                      <p className="font-medium text-sm text-blue-600">
                        {renderValue(customer.phone)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-slate-500 text-xs">Email</Label>
                      <p className="font-medium text-sm">{renderValue(customer.email)}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Địa chỉ</Label>
                    <p className="font-medium text-sm">{renderValue(customer.address)}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-xs">Tổng chi tiêu</Label>
                    <p className="font-medium text-sm text-green-600">
                      {customer.totalaccumulatedspent?.toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">Không có thông tin khách hàng.</p>
              )}
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
                            {getProductName(item)} (Mã: #{item.ProductID || (item as any).productid})
                          </TableCell>
                          <TableCell className="py-2 text-xs text-center text-slate-600">
                            SL: <span className="font-bold">{item.Quantity || (item as any).quantity}</span>
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right text-slate-900 font-semibold">
                            {((item.Quantity || (item as any).quantity) * (item.UnitPrice || (item as any).unitprice)).toLocaleString("vi-VN")} đ
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
                  Tổng cộng:
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
