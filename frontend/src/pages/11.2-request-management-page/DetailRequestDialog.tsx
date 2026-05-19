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
import type { RequestForm, RequestDetail } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEmp } from "@/context/empContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: RequestForm | null;
  mode: "view" | "approve";
  onSave: () => void;
}

export function DetailRequestDialog({
  open,
  onOpenChange,
  request,
  mode,
  onSave,
}: Props) {
  const { emp } = useEmp();
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<RequestDetail[]>([]);

  useEffect(() => {
    if (open) {
      setRejectReason("");
      if (request) {
        const loadDetails = async () => {
          setLoading(true);
          try {
            const list = await api.requestDetails.list();
            setDetails(list.filter((d) => d.RequestID === request.RequestID));
          } catch (e) {
            console.error("Lỗi lấy chi tiết đề xuất:", e);
          } finally {
            setLoading(false);
          }
        };
        loadDetails();
      }
    }
  }, [open, request]);

  if (!request) return null;

  const handleApprove = async (isApproved: boolean) => {
    if (!isApproved && !rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối!");
      return;
    }

    setLoading(true);
    try {
      const approverId = emp ? emp.EmployeeID : 999;
      await api.requestForms.update(request.RequestID, {
        ...request,
        Status: isApproved ? "1" : "2", // "1": Đã duyệt, "2": Từ chối
        ApproverID: approverId,
        RejectReason: isApproved ? "" : rejectReason,
      });

      toast.success(isApproved ? "Đã phê duyệt yêu cầu bổ sung!" : "Đã từ chối yêu cầu bổ sung!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Xử lý phê duyệt thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    if (status === "1" || status === "Đã duyệt") return "Đã duyệt";
    if (status === "2" || status === "Từ chối") return "Từ chối";
    return "Chờ duyệt";
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

        {loading && details.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải thông tin...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm max-h-[60vh] overflow-y-auto pr-2">
            {/* Thông tin Master Form */}
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Mã yêu cầu</Label>
                <p className="font-semibold text-slate-900">#{request.RequestID}</p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Trạng thái</Label>
                <p
                  className={cn(
                    "font-bold text-xs mt-0.5",
                    (request.Status === "1" || request.Status === "Đã duyệt") && "text-green-600",
                    (request.Status === "0" || request.Status === "Chờ duyệt" || !request.Status) && "text-amber-500",
                    (request.Status === "2" || request.Status === "Từ chối") && "text-red-500",
                  )}
                >
                  {getStatusText(request.Status)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Mã nhân viên tạo</Label>
                <p className="font-semibold text-slate-900">#{request.EmployeeID}</p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Ngày tạo</Label>
                <p className="font-semibold text-slate-700">
                  {new Date(request.CreatedDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            {(request.Status === "1" || request.Status === "2" || request.Status === "Đã duyệt" || request.Status === "Từ chối") && (
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 border border-slate-200 rounded-md">
                <div>
                  <Label className="text-slate-500 text-xs font-semibold">Mã người duyệt</Label>
                  <p className="font-semibold text-slate-800">#{request.ApproverID || "---"}</p>
                </div>
                {(request.Status === "2" || request.Status === "Từ chối") && (
                  <div className="col-span-2 mt-1.5 border-t border-slate-200 pt-1.5">
                    <Label className="text-slate-500 text-xs font-semibold">
                      Lý do từ chối
                    </Label>
                    <p className="font-bold text-red-600 text-xs mt-0.5">
                      {request.RejectReason}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Danh sách RequestDetail */}
            <div className="mt-2">
              <Label className="text-slate-900 font-bold mb-2 block text-xs border-b border-slate-200 pb-2">
                Danh sách sản phẩm đề xuất bổ sung
              </Label>
              <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                <Table>
                  <TableBody>
                    {details.map((item, index) => (
                      <TableRow
                        key={index}
                        className="border-b border-slate-100 text-xs hover:bg-slate-50"
                      >
                        <TableCell className="w-20 text-slate-500 font-medium">
                          Mã SP: #{item.ProductId}
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900">
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
                          className="text-center py-4 text-slate-400 text-xs font-semibold"
                        >
                          Không có sản phẩm nào được đề xuất.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Biểu mẫu điền khi thực hiện Phê duyệt */}
            {mode === "approve" && (request.Status === "0" || request.Status === "Chờ duyệt" || !request.Status) && (
              <div className="mt-2 grid gap-2 border-t border-slate-200 pt-4">
                <Label
                  htmlFor="rejectReason"
                  className="text-slate-700 text-xs font-bold"
                >
                  Lý do từ chối (Chỉ điền nếu bấm "Từ chối")
                </Label>
                <textarea
                  id="rejectReason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do từ chối phê duyệt..."
                  className="flex min-h-[70px] w-full border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none rounded-md"
                  disabled={loading}
                />
              </div>
            )}
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          {mode === "approve" && (request.Status === "0" || request.Status === "Chờ duyệt" || !request.Status) ? (
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleApprove(false)}
                disabled={loading}
              >
                Từ chối
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleApprove(true)}
                disabled={loading}
              >
                Phê duyệt
              </Button>
            </div>
          ) : (
            <Button
              className={btn.primary}
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Đóng
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
