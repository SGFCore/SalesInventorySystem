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
      <DialogContent className="sm:max-w-[800px] bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Lịch sử giao dịch: {customer.FirstName} {customer.LastName}
          </DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableCell className="font-bold">Mã Đơn</TableCell>
              <TableCell className="font-bold">Mã Ship</TableCell>
              <TableCell className="font-bold">Tổng tiền</TableCell>
              <TableCell className="font-bold">Trạng thái</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((o) => (
              <TableRow key={o.OrderID}>
                <TableCell>#{o.OrderID}</TableCell>
                <TableCell className="text-blue-600 font-medium">
                  {o.ShipCode}
                </TableCell>
                <TableCell>{o.TotalAmount.toLocaleString()} đ</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      o.ShippingStatus === 2
                        ? "text-green-600 border-green-200"
                        : "text-blue-600 border-blue-200"
                    }
                  >
                    {o.ShippingStatus === 2 ? "Đã giao" : "Đang xử lý"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {MOCK_ORDERS.length === 0 && (
          <div className="text-center py-10 text-slate-400 font-medium italic">
            Không có dữ liệu giao dịch
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
