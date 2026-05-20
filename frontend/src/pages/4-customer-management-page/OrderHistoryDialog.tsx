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
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function OrderHistoryDialog({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  customer: Customer | null;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && customer) {
      const loadOrders = async () => {
        setLoading(true);
        try {
          const all = await api.orders.list();
          setOrders(all.filter((o) => o.customerId === customer.id));
        } catch (e: any) {
          toast.error(e.message || "Không thể tải lịch sử đơn hàng!");
        } finally {
          setLoading(false);
        }
      };
      loadOrders();
    }
  }, [open, customer]);

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[800px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Lịch sử giao dịch: {customer.firstname} {customer.lastname}
          </DialogTitle>
        </DialogHeader>
        <div className={page.tableWrap}>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="ml-2 text-slate-500 text-sm">Đang tải lịch sử...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-400 font-medium">
              Không có dữ liệu giao dịch
            </div>
          ) : (
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
                {orders.map((o) => (
                  <TableRow key={o.id} className={page.tableRow}>
                    <TableCell className={entity.id}>#{o.id}</TableCell>
                    <TableCell className={entity.price}>{o.shipcode}</TableCell>
                    <TableCell className={entity.cellValue}>
                      {o.totalamount.toLocaleString()} đ
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          badge.base,
                          o.shippingstatus === 2
                            ? badge.success
                            : badge.info,
                        )}
                      >
                        {o.shippingstatus === 2 ? "Đã giao" : "Đang xử lý"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
