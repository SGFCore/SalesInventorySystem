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
import type { Importreceipt, Importreceiptdetail } from "@/lib/types";
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
  importReceipt: Importreceipt | null;
  mode: "view" | "approve";
  onSave: () => void;
}

export function DetailImportReceiptDialog({
  open,
  onOpenChange,
  importReceipt,
  mode,
  onSave,
}: Props) {
  const { emp } = useEmp();
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<Importreceiptdetail[]>([]);

  useEffect(() => {
    if (open) {
      setRejectReason("");
      if (importReceipt) {
        const loadDetails = async () => {
          setLoading(true);
          try {
            const list = await api.importReceiptDetails.list();
            setDetails(list.filter((d) => d.ImportReceiptID === importReceipt.ImportReceiptID));
          } catch (e) {
            console.error("Lỗi lấy chi tiết phiếu nhập:", e);
          } finally {
            setLoading(false);
          }
        };
        loadDetails();
      }
    }
  }, [open, importReceipt]);

  if (!importReceipt) return null;

  const handleApprove = async (isApproved: boolean) => {
    if (!isApproved && !rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối!");
      return;
    }

    setLoading(true);
    try {
      const approverId = emp ? emp.EmployeeID : 999;

      // 1. Cập nhật trạng thái phiếu nhập kho
      await api.importReceipts.update(importReceipt.ImportReceiptID, {
        ...importReceipt,
        Status: isApproved ? "Đã nhập kho" : "Đã từ chối",
        DiscrepancyReason: isApproved ? importReceipt.DiscrepancyReason : rejectReason,
      });

      // 2. Nếu Đã Duyệt, tăng tồn kho trong bảng DetailInventory
      if (isApproved) {
        const allInventories = await api.detailInventories.list();
        await Promise.all(
          details.map(async (item) => {
            const existingInv = allInventories.find(
              (inv) => inv.WarehouseID === importReceipt.WarehouseID && inv.ProductID === item.ProductID
            );

            if (existingInv) {
              const updatedQty = existingInv.CurrentQuantity + item.ActualQuantity;
              await api.detailInventories.update(importReceipt.WarehouseID, {
                ...existingInv,
                CurrentQuantity: updatedQty,
                RealStock: updatedQty,
                AvailableStock: updatedQty,
              });
            } else {
              await api.detailInventories.create({
                WarehouseID: importReceipt.WarehouseID,
                ProductID: item.ProductID,
                CurrentQuantity: item.ActualQuantity,
                RealStock: item.ActualQuantity,
                AvailableStock: item.ActualQuantity,
                MinStock: 10,
                MaxStock: 500,
                IsAlertEnabled: 1,
                StorageLocation: "Khu A",
              });
            }
          })
        );
      }

      toast.success(isApproved ? "Đã phê duyệt phiếu nhập và cập nhật tồn kho!" : "Đã từ chối phiếu nhập kho!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Xử lý phê duyệt thất bại!");
    } finally {
      setLoading(false);
    }
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

        {loading && details.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải thông tin...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm max-h-[60vh] overflow-y-auto pr-2">
            {/* Thông tin Master Phiếu nhập */}
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Mã phiếu nhập</Label>
                <p className="font-semibold text-slate-900">#{importReceipt.ImportReceiptID}</p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Trạng thái</Label>
                <p
                  className={cn(
                    "font-bold text-xs mt-0.5",
                    (importReceipt.Status === "Đã nhập kho") && "text-green-600",
                    (importReceipt.Status === "Chờ duyệt") && "text-amber-500",
                    (importReceipt.Status === "Đã từ chối") && "text-red-500",
                  )}
                >
                  {importReceipt.Status}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Mã yêu cầu gốc</Label>
                <p className="font-semibold text-slate-900">#{importReceipt.RequestID}</p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Mã nhà kho</Label>
                <p className="font-semibold text-slate-900">Kho #{importReceipt.WarehouseID}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Nhân viên nhập</Label>
                <p className="font-semibold text-slate-900">#{importReceipt.EmployeeID}</p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Ngày nhập</Label>
                <p className="font-semibold text-slate-700">
                  {new Date(importReceipt.CreatedDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>

            {/* Lý do lệch kho / chênh lệch */}
            {importReceipt.HasDiscrepancy === 1 && (
              <div className="grid grid-cols-1 gap-1.5 bg-red-50 p-3 border border-red-200 rounded-md">
                <Label className="text-red-700 text-xs font-bold">
                  Thông tin chênh lệch khi nhận hàng
                </Label>
                <p className="font-semibold text-slate-700 text-xs">
                  <span className="text-slate-500 font-medium">Lý do:</span>{" "}
                  {importReceipt.DiscrepancyReason || "Không ghi nhận lý do cụ thể"}
                </p>
              </div>
            )}

            {/* Danh sách vật tư */}
            <div className="mt-2">
              <Label className="text-slate-900 font-bold mb-2 block text-xs border-b border-slate-200 pb-2">
                Chi tiết danh sách hàng nhập
              </Label>
              <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                <Table>
                  <TableBody>
                    {details.map((item, index) => {
                      const isRowDiscrepancy = item.ExpectedQuantity !== item.ActualQuantity;
                      return (
                        <TableRow
                          key={index}
                          className={cn(
                            "border-b border-slate-100 text-xs hover:bg-slate-50",
                            isRowDiscrepancy && "bg-red-50/50 hover:bg-red-50",
                          )}
                        >
                          <TableCell className="w-20 text-slate-500 font-medium">
                            Mã SP: #{item.ProductID}
                          </TableCell>
                          <TableCell className="font-semibold text-slate-900">
                            {item.ProductName}
                          </TableCell>
                          <TableCell className="text-right text-slate-500 font-semibold w-24">
                            Yêu cầu: {item.ExpectedQuantity}
                          </TableCell>
                          <TableCell
                            className={cn(
                              "text-right font-bold w-24",
                              isRowDiscrepancy ? "text-red-600 animate-pulse" : "text-blue-600",
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
                  placeholder="Nhập lý do từ chối phê duyệt phiếu nhập kho..."
                  className="flex min-h-[70px] w-full border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none rounded-md"
                  disabled={loading}
                />
              </div>
            )}
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          {mode === "approve" && importReceipt.Status === "Chờ duyệt" ? (
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
