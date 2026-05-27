import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { btn, dialog } from "@/pages/page-classes";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useEmp } from "@/context/empContext";
import type { Warehouse, RequestForm, RequestDetail } from "@/lib/types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface DetailInput {
  ProductID: number;
  ProductName: string;
  ExpectedQuantity: number;
  ActualQuantity: number;
}

export function NewImportReceiptDialog({ open, onOpenChange, onSave }: Props) {
  const { emp } = useEmp();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [requests, setRequests] = useState<RequestForm[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [hasDiscrepancy, setHasDiscrepancy] = useState(false);
  const [discrepancyReason, setDiscrepancyReason] = useState("");
  const [discrepancyImageURL, setDiscrepancyImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<DetailInput[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedRequestId("");
      setWarehouseId("");
      setHasDiscrepancy(false);
      setDiscrepancyReason("");
      setDiscrepancyImageURL("");
      setItems([]);

      const loadDropdowns = async () => {
        setLoading(true);
        try {
          const [whList, reqList] = await Promise.all([
            api.warehouses.list(),
            api.requestForms.list(),
          ]);
          setWarehouses(whList.filter((w) => w.Status === 1));

          // Chỉ hiện các yêu cầu đã duyệt ("1" hoặc "Đã duyệt")
          const approvedReqs = reqList.filter(
            (r) => r.Status === "1" || r.Status === "Đã duyệt"
          );
          setRequests(approvedReqs);

          if (whList.length > 0) {
            setWarehouseId(String(whList[0].WareHouseID));
          }
        } catch (e) {
          console.error("Lỗi lấy thông tin:", e);
        } finally {
          setLoading(false);
        }
      };

      loadDropdowns();
    }
  }, [open]);

  // Khi chọn yêu cầu bổ sung gốc, tự động tải các chi tiết yêu cầu đó và pre-fill
  useEffect(() => {
    if (selectedRequestId) {
      const loadRequestDetails = async () => {
        setLoading(true);
        try {
          const allDetails = await api.requestDetails.list();
          const reqDetails = allDetails.filter(
            (d) => d.RequestID === Number(selectedRequestId)
          );

          const prefilled = reqDetails.map((d) => ({
            ProductID: d.ProductID,
            ProductName: (d as any).ProductName || "",
            ExpectedQuantity: d.Quantity,
            ActualQuantity: d.Quantity, // mặc định bằng số yêu cầu
          }));

          setItems(prefilled);
        } catch (e) {
          console.error("Lỗi tải chi tiết yêu cầu:", e);
        } finally {
          setLoading(false);
        }
      };
      loadRequestDetails();
    } else {
      setItems([]);
    }
  }, [selectedRequestId]);

  const handleQtyChange = (index: number, actualVal: number) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ActualQuantity: actualVal };

      // Tự động bật checkbox chênh lệch nếu số thực nhập khác số yêu cầu
      const anyMismatch = updated.some((it) => it.ExpectedQuantity !== it.ActualQuantity);
      setHasDiscrepancy(anyMismatch);
      if (anyMismatch && !discrepancyReason) {
        setDiscrepancyReason("Có chênh lệch thực tế khi nhập kho");
      }

      return updated;
    });
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!selectedRequestId) {
      toast.error("Vui lòng chọn yêu cầu bổ sung gốc!");
      return;
    }
    if (!warehouseId) {
      toast.error("Vui lòng chọn nhà kho nhận hàng!");
      return;
    }

    const hasInvalidVal = items.some((it) => it.ActualQuantity < 0);
    if (hasInvalidVal) {
      toast.error("Số lượng thực nhập không được phép nhỏ hơn 0!");
      return;
    }

    setLoading(true);
    try {
      const empId = emp ? emp.EmployeeID : 101;

      // 1. Tạo phiếu nhập kho Master
      const newImport = await api.importReceipts.create({
        EmployeeID: empId,
        WarehouseID: Number(warehouseId),
        Status: "Chờ duyệt", // Draft or Pending
        CreatedDate: new Date().toISOString(),
        RequestID: Number(selectedRequestId),
        HasDiscrepancy: hasDiscrepancy ? 1 : 0,
        DiscrepancyReason: hasDiscrepancy ? discrepancyReason : "",
        DiscrepancyImageURL: hasDiscrepancy ? discrepancyImageURL : "",
      });

      // 2. Tạo chi tiết phiếu nhập Detail
      await Promise.all(
        items.map((item) =>
          api.importReceiptDetails.create({
            ImportReceiptID: newImport.ImportReceiptID,
            ProductID: item.ProductID,
            ProductName: item.ProductName,
            ExpectedQuantity: item.ExpectedQuantity,
            ActualQuantity: item.ActualQuantity,
          })
        )
      );

      // 3. Nếu Hoàn thành nhập (không phải nháp), tự động cộng tồn kho vào DetailInventory
      if (!isDraft) {
        const allInventories = await api.detailInventories.list();
        await Promise.all(
          items.map(async (item) => {
            const existingInv = allInventories.find(
              (inv) => inv.WarehouseID === Number(warehouseId) && inv.ProductID === item.ProductID
            );

            if (existingInv) {
              const updatedQty = existingInv.CurrentQuantity + item.ActualQuantity;
              await api.detailInventories.update(Number(warehouseId), {
                ...existingInv,
                CurrentQuantity: updatedQty,
                RealStock: updatedQty,
                AvailableStock: updatedQty,
              });
            } else {
              await api.detailInventories.create({
                WarehouseID: Number(warehouseId),
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

      toast.success(isDraft ? "Đã lưu bản nháp phiếu nhập!" : "Đã hoàn thành nhập kho và tăng tồn thực tế!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo phiếu nhập kho thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo phiếu nhập kho mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm max-h-[70vh] overflow-y-auto pr-1">
          {/* Thông tin Master Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="selectedRequestId" className="text-xs font-bold text-slate-700">
                Chọn yêu cầu bổ sung gốc <span className="text-red-500">*</span>
              </Label>
              <select
                id="selectedRequestId"
                value={selectedRequestId}
                onChange={(e) => setSelectedRequestId(e.target.value)}
                className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md font-semibold text-slate-800"
                disabled={loading}
              >
                <option value="">-- Chọn yêu cầu đã duyệt --</option>
                {requests.map((r) => (
                  <option key={r.RequestID} value={r.RequestID}>
                    Đề xuất #{r.RequestID} (Nhân viên: #{r.EmployeeID})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="warehouseSelect" className="text-xs font-bold text-slate-700">
                Chọn nhà kho nhận hàng <span className="text-red-500">*</span>
              </Label>
              <select
                id="warehouseSelect"
                value={warehouseId}
                onChange={(e) => setWarehouseId(e.target.value)}
                className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md font-semibold text-slate-800"
                disabled={loading}
              >
                {warehouses.map((w) => (
                  <option key={w.WareHouseID} value={w.WareHouseID}>
                    {w.WareHouseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phần Checkbox quản lý chênh lệch thực tế */}
          <div className="flex items-center space-x-2 border-t border-slate-100 pt-3">
            <Checkbox
              id="hasDiscrepancy"
              checked={hasDiscrepancy}
              onCheckedChange={(checked) => setHasDiscrepancy(!!checked)}
              className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-md"
              disabled={loading}
            />
            <Label
              htmlFor="hasDiscrepancy"
              className="text-xs font-bold text-slate-700 cursor-pointer"
            >
              Ghi nhận có chênh lệch giữa chứng từ và thực tế nhập
            </Label>
          </div>

          {hasDiscrepancy && (
            <div className="grid gap-3 bg-slate-50/50 p-3 border border-slate-200 rounded-md">
              <div className="grid gap-1">
                <Label className="text-[11px] font-bold text-slate-600">
                  Lý do chênh lệch hàng nhập
                </Label>
                <textarea
                  value={discrepancyReason}
                  onChange={(e) => setDiscrepancyReason(e.target.value)}
                  placeholder="Ghi chi tiết lý do lệch..."
                  className="flex min-h-[50px] w-full border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none rounded-md font-semibold"
                  disabled={loading}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-[11px] font-bold text-slate-600">
                  URL ảnh đối chiếu thực tế (Nếu có)
                </Label>
                <Input
                  value={discrepancyImageURL}
                  onChange={(e) => setDiscrepancyImageURL(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-xs font-semibold rounded-md"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Danh sách vật tư chi tiết */}
          <div className="border-t border-slate-100 pt-3">
            <Label className="text-sm font-bold text-slate-900 mb-3 block">
              Danh sách chi tiết vật tư nhập kho
            </Label>

            {loading && items.length === 0 ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-500 text-xs font-semibold">Đang tải chi tiết vật tư...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-slate-400 font-bold text-xs bg-slate-50/50 border border-dashed rounded-md">
                Chọn một yêu cầu bổ sung ở trên để tự động nạp danh sách sản phẩm.
              </div>
            ) : (
              <div className="grid gap-3">
                {items.map((item, index) => {
                  const isMismatched = item.ExpectedQuantity !== item.ActualQuantity;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center justify-between bg-slate-50/50 p-3 border rounded-md text-xs",
                        isMismatched ? "border-red-200 bg-red-50/30" : "border-slate-200"
                      )}
                    >
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-slate-900">{item.ProductName}</p>
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Mã SP: #{item.ProductID}</p>
                      </div>

                      <div className="flex items-center gap-4 text-center">
                        <div>
                          <Label className="text-[10px] text-slate-500 font-bold block mb-1">Yêu cầu</Label>
                          <span className="font-bold text-slate-800 bg-slate-100 border px-2 py-1 rounded">
                            {item.ExpectedQuantity}
                          </span>
                        </div>

                        <div>
                          <Label className="text-[10px] text-slate-500 font-bold block mb-1">Thực nhập</Label>
                          <Input
                            type="number"
                            min={0}
                            value={item.ActualQuantity}
                            onChange={(e) => handleQtyChange(index, Math.max(0, Number(e.target.value)))}
                            className="h-8 w-16 border-slate-200 bg-white text-center font-bold text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-500"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
              onClick={() => handleSubmit(true)}
              disabled={loading || items.length === 0}
            >
              Lưu bản nháp
            </Button>
            {
              !(loading || items.length === 0) && <Button
                className={btn.primary}
                onClick={() => handleSubmit(false)}
              >
                {loading ? "Đang xử lý..." : "Hoàn thành"}
              </Button>
            }

          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
