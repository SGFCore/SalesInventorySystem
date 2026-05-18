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
import type { Order } from "@/lib/types";
import { dialog } from "@/pages/page-classes";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

const MOCK_ORDER_DETAILS = [
  {
    OrderID: 5000,
    ProductID: 201,
    ProductName: "Sản phẩm A",
    Quantity: 2,
    Price: 150000,
  },
  {
    OrderID: 5000,
    ProductID: 202,
    ProductName: "Sản phẩm B",
    Quantity: 1,
    Price: 100000,
  },
];

export function DetailOrderDialog({ open, onOpenChange, order }: DetailProps) {
  if (!order) return null;

  const details =
    MOCK_ORDER_DETAILS.filter((d) => d.OrderID === order.OrderID) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[650px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Chi tiết Đơn Hàng #{order.OrderID}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Khách hàng</Label>
              <span className="font-medium text-slate-900">
                {order.CustomerName}
              </span>
            </div>
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Mã Hóa Đơn</Label>
              <span className="font-medium text-slate-900">
                #{order.InvoiceID}
              </span>
            </div>
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Mã Vận Đơn</Label>
              <span className="font-medium text-slate-900">
                {order.ShipCode || "Chưa có"}
              </span>
            </div>
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Phí vận chuyển</Label>
              <span className="font-medium text-slate-900">
                {order.ShippingFee.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <div className="grid gap-1 md:col-span-2">
              <Label className="text-slate-500 text-xs">
                Ghi chú giao hàng
              </Label>
              <span className="font-medium text-slate-900">
                {order.ShipmentNote || "Không có"}
              </span>
            </div>
          </div>

          <div className="grid gap-2 mt-4">
            <Label className="text-slate-900 font-bold border-b border-slate-200 pb-2">
              Chi tiết sản phẩm
            </Label>
            <div className="border border-slate-200 overflow-hidden">
              <Table>
                <TableBody>
                  {details.length > 0 ? (
                    details.map((item, idx) => (
                      <TableRow key={idx} className="border-b border-slate-100">
                        <TableCell className="py-2 text-xs font-medium text-slate-700">
                          {item.ProductName} (Mã: #{item.ProductID})
                        </TableCell>
                        <TableCell className="py-2 text-xs text-center text-slate-600">
                          SL: <span className="font-bold">{item.Quantity}</span>
                        </TableCell>
                        <TableCell className="py-2 text-xs text-right text-slate-900 font-medium">
                          {(item.Quantity * item.Price).toLocaleString("vi-VN")}{" "}
                          đ
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
            <div className="flex justify-end pt-2">
              <span className="text-sm font-medium text-slate-500 mr-4">
                Tổng cộng:
              </span>
              <span className="text-base font-bold text-blue-600">
                {order.TotalAmount.toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>
        </div>

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
