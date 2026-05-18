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
import { Badge } from "@/components/ui/badge";
import type { Invoice } from "@/lib/types";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

// Mock data chi tiết sản phẩm thuộc hóa đơn
const MOCK_INVOICE_DETAILS = [
  { InvoiceID: 1000, ProductID: 201, Quantity: 2, Price: 150000 },
  { InvoiceID: 1000, ProductID: 202, Quantity: 1, Price: 100000 },
  { InvoiceID: 1001, ProductID: 203, Quantity: 5, Price: 50000 },
];

export function DetailInvoiceDialog({
  open,
  onOpenChange,
  invoice,
}: DetailProps) {
  if (!invoice) return null;

  const details = MOCK_INVOICE_DETAILS.filter(
    (d) => d.InvoiceID === invoice.InvoiceID,
  );

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white border-none rounded-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">
            Chi tiết Hóa Đơn #{invoice.InvoiceID}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Mã khách hàng</Label>
              <span className="font-medium text-slate-900">
                {invoice.CustomerID}
              </span>
            </div>
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Mã nhân viên</Label>
              <span className="font-medium text-slate-900">
                {invoice.EmployeeID}
              </span>
            </div>
            <div className="grid gap-1">
              <Label className="text-slate-500 text-xs">Ngày lập</Label>
              <span className="font-medium text-slate-900">
                {invoice.InvoiceDate.toLocaleDateString("vi-VN")}
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
            <div className="border border-slate-200 overflow-hidden">
              <Table>
                <TableBody>
                  {details.length > 0 ? (
                    details.map((item, idx) => (
                      <TableRow key={idx} className="border-b border-slate-100">
                        <TableCell className="py-2 text-xs font-medium text-slate-700">
                          Mã SP: #{item.ProductID}
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
                        Không có chi tiết sản phẩm.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-none w-24"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
