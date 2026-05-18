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
import type { CountSheet } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  MAP_STATUS,
  MOCK_COUNTSHEET_DETAILS,
} from "@/pages/15-countsheet-management-page/CountsheetManagementPage";
import { btn, dialog } from "@/pages/page-classes";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countsheet: CountSheet | null;
  mode: "view" | "approve";
}

export function DetailCountsheetDialog({
  open,
  onOpenChange,
  countsheet,
  mode,
}: Props) {
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (open) setRejectReason("");
  }, [open]);

  if (!countsheet) return null;

  const details = MOCK_COUNTSHEET_DETAILS[countsheet.CountSheetId] || [];
  const statusConfig = MAP_STATUS[countsheet.Status] || {
    text: "Không rõ",
    className: "text-slate-400",
  };

  const handleApproveAction = (isApproved: boolean) => {
    const payload = {
      CountSheetId: countsheet.CountSheetId,
      Status: isApproved ? 2 : 3, // 2: Đã phê duyệt, 3: Đã từ chối, cần kiểm kê lại
      RejectReason: isApproved ? "" : rejectReason,
    };
    console.log("Xử lý quyết định phê duyệt phiếu kiểm kê gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            {mode === "approve"
              ? "Phê duyệt phiếu kiểm kê"
              : "Chi tiết phiếu kiểm kê"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          {/* Thông tin Master Phiếu kiểm kê */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã phiếu kiểm kê</Label>
              <p className="font-medium">#{countsheet.CountSheetId}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">
                Trạng thái hệ thống
              </Label>
              <p className={cn("font-medium", statusConfig.className)}>
                {statusConfig.text}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Ngày tạo phiếu</Label>
              <p className="font-medium text-slate-700">
                {countsheet.CreatedDate.toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Đơn vị quản lý</Label>
              <p className="font-medium text-slate-700">Hệ thống Kho vận</p>
            </div>
          </div>

          {/* Danh sách vật tư trong phiếu kiểm kê */}
          <div className="mt-2">
            <Label className="text-slate-700 font-semibold mb-2 block text-sm">
              Chi tiết danh sách hàng kiểm kê
            </Label>
            <div className="border border-slate-200">
              <Table>
                <TableBody>
                  {details.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-slate-100 text-sm hover:bg-slate-50/20"
                    >
                      <TableCell className="w-16 text-slate-400 text-xs font-medium">
                        SP #{item.ProductId}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">
                        Kho lưu trữ #{item.WarehouseID}
                      </TableCell>
                      <TableCell className="text-right font-bold w-24 text-blue-600">
                        SL: {item.Quantity}
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs italic max-w-[120px] truncate">
                        {item.Note || "---"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Form điền lý do khi người duyệt muốn từ chối */}
          {mode === "approve" && countsheet.Status === 1 && (
            <div className="mt-2 grid gap-2 border-t border-slate-100 pt-4">
              <Label
                htmlFor="rejectReason"
                className="text-slate-700 text-xs font-semibold"
              >
                Lý do yêu cầu kiểm kê lại (Chỉ điền nếu chọn Từ chối)
              </Label>
              <textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối hoặc nội dung yêu cầu kiểm kê lại..."
                className="flex min-h-[70px] w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none"
              />
            </div>
          )}
        </div>

        {/* Footer xử lý action theo trạng thái phân quyền */}
        <DialogFooter className="gap-2 sm:gap-0">
          {mode === "approve" && countsheet.Status === 1 ? (
            <>
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleApproveAction(false)}
              >
                Từ chối duyệt
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleApproveAction(true)}
              >
                Phê duyệt phiếu
              </Button>
            </>
          ) : (
            <Button
              className={btn.primary}
              onClick={() => onOpenChange(false)}
            >
              Đóng cửa sổ
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
