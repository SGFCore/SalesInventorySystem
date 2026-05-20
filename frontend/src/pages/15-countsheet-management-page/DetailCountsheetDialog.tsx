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
import type { Countsheet, Countsheetdetail, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { MAP_STATUS } from "@/pages/15-countsheet-management-page/CountsheetManagementPage";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countsheet: Countsheet | null;
  mode: "view" | "approve";
  onSave: () => void;
}

export function DetailCountsheetDialog({
  open,
  onOpenChange,
  countsheet,
  mode,
  onSave,
}: Props) {
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<Countsheetdetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open) {
      setRejectReason("");
      if (countsheet) {
        const loadDetails = async () => {
          setLoading(true);
          try {
            const [allDetails, prodList] = await Promise.all([
              api.countSheetDetails.list(),
              api.products.list(),
            ]);
            setProducts(prodList);
            
            const filteredDetails = allDetails.filter(
              (d) => d.countsheetId === countsheet.id
            );
            setDetails(filteredDetails);
          } catch (e) {
            console.error("Lỗi lấy chi tiết phiếu kiểm kê:", e);
          } finally {
            setLoading(false);
          }
        };
        loadDetails();
      }
    }
  }, [open, countsheet]);

  if (!countsheet) return null;

  const statusConfig = MAP_STATUS[countsheet.status] || {
    text: "Không rõ",
    className: "bg-slate-100 text-slate-400 border-slate-200",
  };

  const getProductName = (productId: number) => {
    const p = products.find((prod) => prod.ProductID === productId);
    return p ? p.ProductName : `Sản phẩm #${productId}`;
  };

  const handleApproveAction = async (isApproved: boolean) => {
    if (!isApproved && !rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối!");
      return;
    }

    setLoading(true);
    try {
      const newStatus = isApproved ? 2 : 3; // 2: Đã phê duyệt, 3: Từ chối

      // 1. Cập nhật trạng thái phiếu kiểm kê
      await api.countSheets.update(countsheet.id, {
        ...countsheet,
        status: newStatus,
      });

      // 2. Nếu phê duyệt thành công, đồng bộ số lượng kiểm kê thực tế vào DetailInventory
      if (isApproved) {
        const allInventories = await api.detailInventories.list();
        await Promise.all(
          details.map(async (item) => {
            const existingInv = allInventories.find(
              (inv) => inv.WarehouseID === item.warehouseId && inv.ProductID === item.productId
            );

            if (existingInv) {
              await api.detailInventories.update(item.warehouseId, {
                ...existingInv,
                CurrentQuantity: item.quantity,
                RealStock: item.quantity,
                AvailableStock: item.quantity,
                StorageLocation: existingInv.StorageLocation || "Khu kiểm kê",
              });
            } else {
              await api.detailInventories.create({
                WarehouseID: item.warehouseId,
                ProductID: item.productId,
                CurrentQuantity: item.quantity,
                RealStock: item.quantity,
                AvailableStock: item.quantity,
                MinStock: 10,
                MaxStock: 500,
                IsAlertEnabled: 1,
                StorageLocation: "Khu kiểm kê",
              });
            }
          })
        );
      }

      toast.success(isApproved ? "Đã phê duyệt phiếu kiểm và đồng bộ tồn kho!" : "Đã từ chối phiếu kiểm kê!");
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
              ? "Phê duyệt phiếu kiểm kê"
              : "Chi tiết phiếu kiểm kê"}
          </DialogTitle>
        </DialogHeader>

        {loading && details.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải thông tin...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm max-h-[60vh] overflow-y-auto pr-2">
            {/* Thông tin Master Phiếu kiểm kê */}
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Mã phiếu kiểm kê</Label>
                <p className="font-semibold text-slate-900">#{countsheet.id}</p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Trạng thái hệ thống</Label>
                <p className={cn("font-bold text-xs mt-0.5 px-2 py-0.5 rounded-full border inline-block", statusConfig.className)}>
                  {statusConfig.text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Ngày tạo phiếu</Label>
                <p className="font-semibold text-slate-900">
                  {new Date(countsheet.createddate).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <Label className="text-slate-500 text-xs font-semibold">Bộ phận quản lý</Label>
                <p className="font-semibold text-slate-800">Kiểm soát Chất lượng & Kho vận</p>
              </div>
            </div>

            {/* Danh sách vật tư trong phiếu kiểm kê */}
            <div className="mt-2">
              <Label className="text-slate-900 font-bold mb-2 block text-xs border-b border-slate-200 pb-2">
                Chi tiết danh sách hàng kiểm kê thực tế
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
                          Mã SP: #{item.productId}
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900">
                          {getProductName(item.productId)}
                        </TableCell>
                        <TableCell className="text-slate-500 font-semibold text-xs">
                          Kho #{item.warehouseId}
                        </TableCell>
                        <TableCell className="text-right font-bold w-24 text-blue-600">
                          SL kiểm: {item.quantity}
                        </TableCell>
                        <TableCell className="text-slate-400 text-[10px] italic max-w-[120px] truncate">
                          {item.note || "---"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Form điền lý do khi người duyệt muốn từ chối */}
            {mode === "approve" && countsheet.status === 1 && (
              <div className="mt-2 grid gap-2 border-t border-slate-200 pt-4">
                <Label
                  htmlFor="rejectReason"
                  className="text-slate-700 text-xs font-bold"
                >
                  Lý do từ chối (Chỉ điền nếu bấm "Từ chối duyệt")
                </Label>
                <textarea
                  id="rejectReason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Nhập lý do từ chối hoặc nội dung yêu cầu kiểm kê lại..."
                  className="flex min-h-[70px] w-full border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none rounded-md"
                  disabled={loading}
                />
              </div>
            )}
          </div>
        )}

        {/* Footer xử lý action theo trạng thái phân quyền */}
        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          {mode === "approve" && countsheet.status === 1 ? (
            <div className="flex gap-2 justify-end w-full">
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleApproveAction(false)}
                disabled={loading}
              >
                Từ chối duyệt
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                onClick={() => handleApproveAction(true)}
                disabled={loading}
              >
                Phê duyệt phiếu
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
