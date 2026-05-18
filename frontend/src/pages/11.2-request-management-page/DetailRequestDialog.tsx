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
import type { RequestForm } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MOCK_REQUEST_DETAILS } from "@/pages/11.2-request-management-page/RequestManagementPage";
import { btn, dialog } from "@/pages/page-classes";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: RequestForm | null;
  mode: "view" | "approve";
}

export function DetailRequestDialog({
  open,
  onOpenChange,
  request,
  mode,
}: Props) {
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (open) setRejectReason("");
  }, [open]);

  if (!request) return null;

  const details = MOCK_REQUEST_DETAILS[request.RequestID] || [];

  const handleApprove = (isApproved: boolean) => {
    const payload = {
      RequestID: request.RequestID,
      Status: isApproved ? "Đã duyệt" : "Từ chối",
      ApproverID: 999, // Giả định ID người duyệt hiện tại
      RejectReason: isApproved ? "" : rejectReason,
    };
    console.log("Xử lý phê duyệt gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            {mode === "approve"
              ? "Phê duyệt yêu cầu bổ sung"
              : "Chi tiết yêu cầu bổ sung"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          {/* Thông tin Master Form */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã yêu cầu</Label>
              <p className="font-medium">#{request.RequestID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Trạng thái</Label>
              <p
                className={cn(
                  "font-medium",
                  request.Status === "Đã duyệt" && "text-green-600",
                  request.Status === "Chờ duyệt" && "text-amber-500",
                  request.Status === "Từ chối" && "text-red-500",
                )}
              >
                {request.Status}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-500 text-xs">Mã nhân viên tạo</Label>
              <p className="font-medium">{request.EmployeeID}</p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs">Ngày tạo</Label>
              <p className="font-medium text-slate-700">
                {request.CreatedDate.toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {request.Status !== "Chờ duyệt" && (
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 border border-slate-100">
              <div>
                <Label className="text-slate-500 text-xs">Mã người duyệt</Label>
                <p className="font-medium">{request.ApproverID || "---"}</p>
              </div>
              {request.Status === "Từ chối" && (
                <div className="col-span-2 mt-2">
                  <Label className="text-slate-500 text-xs">
                    Lý do từ chối
                  </Label>
                  <p className="font-medium text-red-600 text-sm">
                    {request.RejectReason}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Danh sách RequestDetail */}
          <div className="mt-2">
            <Label className="text-slate-700 font-semibold mb-2 block text-sm">
              Danh sách sản phẩm bổ sung
            </Label>
            <div className="border border-slate-200">
              <Table>
                <TableBody>
                  {details.map((item, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-slate-100 text-sm"
                    >
                      <TableCell className="w-16 text-slate-400 text-xs font-medium">
                        {item.ProductId}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">
                        {item.ProductName}
                      </TableCell>
                      <TableCell className="text-right font-bold text-blue-600 w-24">
                        SL: {item.Quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                  {details.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-4 text-slate-400 text-sm"
                      >
                        Không có sản phẩm nào.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Biểu mẫu điền khi thực hiện Phê duyệt */}
          {mode === "approve" && request.Status === "Chờ duyệt" && (
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
                placeholder="Nhập lý do từ chối phê duyệt..."
                className="flex min-h-[70px] w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {mode === "approve" && request.Status === "Chờ duyệt" ? (
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
