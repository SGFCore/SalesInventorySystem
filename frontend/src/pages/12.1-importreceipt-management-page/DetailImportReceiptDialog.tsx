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
import type { ImportReceipt } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MOCK_RECEIPT_DETAILS } from "@/pages/12.1-importreceipt-management-page/ImportReceiptManagementPage";
import { btn, dialog } from "@/pages/page-classes";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importReceipt: ImportReceipt | null;
  mode: "view" | "approve";
}

export function DetailImportReceiptDialog({
  open,
  onOpenChange,
  importReceipt,
  mode,
}: Props) {
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (open) setRejectReason("");
  }, [open]);

  if (!importReceipt) return null;

  const details = MOCK_RECEIPT_DETAILS[importReceipt.ImportReceiptID] || [];

  const handleApprove = (isApproved: boolean) => {
    const payload = {
      ImportReceiptID: importReceipt.ImportReceiptID,
      Status: isApproved ? "Đã duyệt" : "Từ chối",
      ApproverID: 999,
      RejectReason: isApproved ? "" : rejectReason,
    };
    console.log("Xử lý phê duyệt phiếu nhập gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            {mode === "approve"
              ? "Phê duyệt phiếu nhập kho"
              : "Chi tiết phiếu nhập kho"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          {/* Thông tin Master Phiếu nhập */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã phiếu nhập</Label>
              <p className="font-medium">#{importReceipt.ImportReceiptID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Trạng thái</Label>
              <p
                className={cn(
                  "font-medium",
                  importReceipt.Status === "Đã duyệt" && "text-green-600",
                  importReceipt.Status === "Chờ duyệt" && "text-amber-500",
                  importReceipt.Status === "Từ chối" && "text-red-500",
                  importReceipt.Status === "Bản nháp" && "text-slate-400",
                )}
              >
                {importReceipt.Status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã yêu cầu gốc</Label>
              <p className="font-medium">#{importReceipt.RequestID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Mã kho lưu trữ</Label>
              <p className="font-medium">Kho #{importReceipt.WarehouseID}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">
                Mã nhân viên nhập
              </Label>
              <p className="font-medium">{importReceipt.EmployeeID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Ngày nhập</Label>
              <p className="font-medium text-slate-700">
                {importReceipt.CreatedDate.toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {/* Lý do từ chối nếu phiếu bị từ chối */}
          {importReceipt.Status === "Từ chối" &&
            importReceipt.DiscrepancyReason && (
              <div className="bg-slate-50 p-3 border border-slate-100">
                <Label className="text-slate-500 text-xs">
                  Lý do từ chối duyệt
                </Label>
                <p className="font-medium text-red-600 text-sm">
                  {importReceipt.DiscrepancyReason}
                </p>
              </div>
            )}

          {/* Hiển thị thông tin chênh lệch hàng hóa từ lúc nhập nếu có */}
          {importReceipt.HasDiscrepancy === 1 && (
            <div className="grid grid-cols-1 gap-2 bg-red-50 p-3 border border-red-100">
              <Label className="text-red-600 text-xs font-semibold">
                Thông tin chênh lệch khi nhận hàng
              </Label>
              <p className="font-medium text-slate-700 text-sm">
                <span className="text-slate-500 font-normal">Lý do lệch:</span>{" "}
                {importReceipt.DiscrepancyReason ||
                  "Không ghi nhận lý do cụ thể"}
              </p>
            </div>
          )}

          {/* Danh sách vật tư */}
          <div className="mt-2">
            <Label className="text-slate-700 font-semibold mb-2 block text-sm">
              Chi tiết danh sách hàng nhập
            </Label>
            <div className="border border-slate-200">
              <Table>
                <TableBody>
                  {details.map((item, index) => {
                    const isRowDiscrepancy =
                      item.ExpectedQuantity !== item.ActualQuantity;
                    return (
                      <TableRow
                        key={index}
                        className={cn(
                          "border-b border-slate-100 text-sm",
                          isRowDiscrepancy && "bg-red-50/30",
                        )}
                      >
                        <TableCell className="w-16 text-slate-400 text-xs font-medium">
                          {item.ProductID}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {item.ProductName}
                        </TableCell>
                        <TableCell className="text-right text-slate-500 w-24">
                          Yêu cầu: {item.ExpectedQuantity}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right font-bold w-24",
                            isRowDiscrepancy ? "text-red-600" : "text-blue-600",
                          )}
                        >
                          Thực nhập: {item.ActualQuantity}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Form nhập lý do khi thực hiện duyệt từ chối */}
          {mode === "approve" && importReceipt.Status === "Chờ duyệt" && (
            <div className="mt-2 grid gap-2 border-t border-slate-100 pt-4">
              <Label
                htmlFor="rejectReason"
                className="text-slate-700 text-xs font-semibold"
              >
                Lý do từ chối (Chỉ điền nếu chọn Từ chối)
              </Label>
              <textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối phê duyệt phiếu nhập kho..."
                className="flex min-h-[70px] w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {mode === "approve" && importReceipt.Status === "Chờ duyệt" ? (
            <>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleApprove(false)}
              >
                Từ chối
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleApprove(true)}
              >
                Phê duyệt
              </Button>
            </>
          ) : (
            <Button
              className={btn.primary}
              onClick={() => onOpenChange(false)}
            >
              Đóng
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
