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
import type { OrderReturn, ReturnDetail } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderReturn: OrderReturn | null;
}

// Giả lập danh sách sản phẩm chi tiết của đơn hoàn trả
const MOCK_RETURN_DETAILS: ReturnDetail[] = [
  {
    ReturnID: 1001,
    ProductID: 201,
    Quantity: 2,
    QC_Status: "Lỗi kỹ thuật",
    TargetWarehouseID: 1,
    ActionTaken: "Hoàn kho tổng",
  },
  {
    ReturnID: 1001,
    ProductID: 202,
    Quantity: 1,
    QC_Status: "Đạt chuẩn",
    TargetWarehouseID: 1,
    ActionTaken: "Tái nhập kho",
  },
  {
    ReturnID: 1002,
    ProductID: 203,
    Quantity: 5,
    QC_Status: "Trầy xước nhẹ",
    TargetWarehouseID: 2,
    ActionTaken: "Sửa chữa",
  },
];

export function DetailOrderReturnDialog({
  open,
  onOpenChange,
  orderReturn,
}: DetailProps) {
  if (!orderReturn) return null;

  // Lọc lấy danh sách sản phẩm thuộc đơn hoàn trả hiện tại
  const details = MOCK_RETURN_DETAILS.filter(
    (d) => d.ReturnID === orderReturn.ReturnID,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết đơn hoàn trả hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Mã Hoàn Trả</Label>
            <span className="col-span-2 font-medium text-slate-900">
              #{orderReturn.ReturnID}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Mã tham chiếu</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {orderReturn.ReturnRefCode}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Đơn hàng gốc</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {orderReturn.OrderName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Nhân viên tiếp nhận</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {orderReturn.EmployeeName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Ngày hoàn trả</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {orderReturn.ReturnDate.toLocaleDateString("vi-VN")}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Lý do hoàn trả</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {orderReturn.Reason}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Tổng tiền hoàn</Label>
            <span className="col-span-2 font-bold text-blue-600">
              {orderReturn.TotalRefund.toLocaleString("vi-VN")} đ
            </span>
          </div>

          {/* Danh sách sản phẩm chi tiết của Đơn hoàn trả */}
          <div className="grid gap-2 mt-2">
            <Label className="text-slate-500">Sản phẩm hoàn trả</Label>
            <div className="border border-slate-100 rounded-md overflow-hidden">
              <Table>
                <TableBody>
                  {details.length > 0 ? (
                    details.map((item, idx) => (
                      <TableRow
                        key={idx}
                        className="border-b border-slate-50 text-xs text-slate-700"
                      >
                        <TableCell className="py-2 font-medium">
                          Mã SP: #{item.ProductID}
                        </TableCell>
                        <TableCell className="py-2">
                          SL: <span className="font-bold">{item.Quantity}</span>
                        </TableCell>
                        <TableCell className="py-2 text-slate-500">
                          QC: {item.QC_Status}
                        </TableCell>
                        <TableCell className="py-2 text-right text-blue-600 font-medium">
                          {item.ActionTaken}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="py-3 text-center text-xs text-slate-400">
                        Không có chi tiết sản phẩm mẫu cho đơn này.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white w-24"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
