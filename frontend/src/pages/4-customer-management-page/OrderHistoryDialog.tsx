import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Customer, Order } from "@/lib/types";
import { cn } from "@/lib/utils";
import { badge, dialog, entity, page } from "@/pages/page-classes";

const MOCK_ORDERS: Order[] = [
  {
    OrderID: 5001,
    CustomerID: 2000,
    EmployeeID: 1,
    InvoiceID: 901,
    ShipCode: "SHIP123",
    ShipCompanyID: 1001,
    TotalAmount: 1500000,
    OrderStatus: 1,
    ShippingStatus: 2,
    ShipmentNote: "",
    ShippingFee: 30000,
    ExportReceiptID: 801,
  },
  {
    OrderID: 5002,
    CustomerID: 2000,
    EmployeeID: 1,
    InvoiceID: 902,
    ShipCode: "SHIP456",
    ShipCompanyID: 1002,
    TotalAmount: 2450000,
    OrderStatus: 1,
    ShippingStatus: 1,
    ShipmentNote: "Giao giờ hành chính",
    ShippingFee: 25000,
    ExportReceiptID: 802,
  },
];

export function OrderHistoryDialog({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  customer: Customer | null;
}) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[800px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Lịch sử giao dịch: {customer.FirstName} {customer.LastName}
          </DialogTitle>
        </DialogHeader>
        <div className={page.tableWrap}>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableCell className="text-xs font-semibold text-slate-700">
                  Mã đơn
                </TableCell>
                <TableCell className="text-xs font-semibold text-slate-700">
                  Mã ship
                </TableCell>
                <TableCell className="text-xs font-semibold text-slate-700">
                  Tổng tiền
                </TableCell>
                <TableCell className="text-xs font-semibold text-slate-700">
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_ORDERS.map((o) => (
                <TableRow key={o.OrderID} className={page.tableRow}>
                  <TableCell className={entity.id}>#{o.OrderID}</TableCell>
                  <TableCell className={entity.price}>{o.ShipCode}</TableCell>
                  <TableCell className={entity.cellValue}>
                    {o.TotalAmount.toLocaleString()} đ
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        badge.base,
                        o.ShippingStatus === 2
                          ? badge.success
                          : badge.info,
                      )}
                    >
                      {o.ShippingStatus === 2 ? "Đã giao" : "Đang xử lý"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {MOCK_ORDERS.length === 0 && (
          <div className="py-10 text-center text-sm text-slate-400">
            Không có dữ liệu giao dịch
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
