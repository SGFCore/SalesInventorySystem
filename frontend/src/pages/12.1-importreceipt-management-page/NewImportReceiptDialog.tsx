import { Button } from "@/components/ui/button";
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
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DetailInput {
  ProductID: string;
  ProductName: string;
  ExpectedQuantity: string;
  ActualQuantity: string;
}

export function NewImportReceiptDialog({ open, onOpenChange }: Props) {
  const [requestId, setRequestId] = useState("");
  const [warehouseId, setWarehouseId] = useState("1");
  const [hasDiscrepancy, setHasDiscrepancy] = useState(false);
  const [discrepancyReason, setDiscrepancyReason] = useState("");
  const [discrepancyImageURL, setDiscrepancyImageURL] = useState("");

  const [items, setItems] = useState<DetailInput[]>([
    {
      ProductID: "",
      ProductName: "",
      ExpectedQuantity: "",
      ActualQuantity: "",
    },
  ]);

  useEffect(() => {
    if (open) {
      setRequestId("");
      setWarehouseId("1");
      setHasDiscrepancy(false);
      setDiscrepancyReason("");
      setDiscrepancyImageURL("");
      setItems([
        {
          ProductID: "",
          ProductName: "",
          ExpectedQuantity: "",
          ActualQuantity: "",
        },
      ]);
    }
  }, [open]);

  const handleItemChange = (
    index: number,
    field: keyof DetailInput,
    value: string,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addItemRow = () => {
    setItems((prev) => [
      ...prev,
      {
        ProductID: "",
        ProductName: "",
        ExpectedQuantity: "",
        ActualQuantity: "",
      },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (isDraft: boolean) => {
    // Ép kiểu dữ liệu Master-Detail chuẩn schema cấu trúc dữ liệu
    const payload = {
      EmployeeID: 101, // Giả định ID nhân viên đang thao tác hệ thống
      WarehouseID: Number(warehouseId) || 0,
      Status: isDraft ? "Bản nháp" : "Đã hoàn thành",
      CreatedDate: new Date(),
      RequestID: Number(requestId) || 0,
      HasDiscrepancy: hasDiscrepancy ? 1 : 0,
      DiscrepancyReason: hasDiscrepancy ? discrepancyReason : "",
      DiscrepancyImageURL: hasDiscrepancy ? discrepancyImageURL : "",
      Details: items.map((item) => ({
        ProductID: Number(item.ProductID) || 0,
        ProductName: item.ProductName,
        ExpectedQuantity: Number(item.ExpectedQuantity) || 0,
        ActualQuantity: Number(item.ActualQuantity) || 0,
      })),
    };

    console.log("Dữ liệu tạo phiếu nhập kho mới gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white border-none max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Tạo phiếu nhập kho mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          {/* Thông tin Master Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label
                htmlFor="requestId"
                className="text-xs font-semibold text-slate-700"
              >
                Mã yêu cầu gốc bổ sung
              </Label>
              <Input
                id="requestId"
                type="number"
                placeholder="Nhập mã YC..."
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none text-xs"
              />
            </div>
            <div className="grid gap-1">
              <Label
                htmlFor="warehouseId"
                className="text-xs font-semibold text-slate-700"
              >
                Mã kho lưu trữ
              </Label>
              <Input
                id="warehouseId"
                type="number"
                value={warehouseId}
                onChange={(e) => setWarehouseId(e.target.value)}
                className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none text-xs"
              />
            </div>
          </div>

          {/* Phần Checkbox quản lý chênh lệch thực tế */}
          <div className="flex items-center space-x-2 border-t border-slate-100 pt-3">
            <Checkbox
              id="hasDiscrepancy"
              checked={hasDiscrepancy}
              onCheckedChange={(checked) => setHasDiscrepancy(!!checked)}
              className="rounded-none border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label
              htmlFor="hasDiscrepancy"
              className="text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Ghi nhận có chênh lệch giữa chứng từ và thực tế nhập
            </Label>
          </div>

          {hasDiscrepancy && (
            <div className="grid gap-3 bg-slate-50 p-3 border border-slate-100">
              <div className="grid gap-1">
                <Label className="text-[11px] font-medium text-slate-600">
                  Lý do chênh lệch hàng nhập
                </Label>
                <textarea
                  value={discrepancyReason}
                  onChange={(e) => setDiscrepancyReason(e.target.value)}
                  placeholder="Ghi chi tiết lý do lệch..."
                  className="flex min-h-[50px] w-full rounded-none border border-slate-200 bg-white px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-[11px] font-medium text-slate-600">
                  URL ảnh đối chiếu thực tế
                </Label>
                <Input
                  value={discrepancyImageURL}
                  onChange={(e) => setDiscrepancyImageURL(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none text-xs"
                />
              </div>
            </div>
          )}

          {/* Danh sách vật tư chi tiết */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold text-slate-900">
                Danh sách chi tiết vật tư nhập kho
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItemRow}
                className="text-blue-600 border-blue-200 rounded-none flex items-center gap-1 h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Thêm dòng
              </Button>
            </div>

            <div className="grid gap-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-end gap-2 bg-slate-50 p-2 border border-slate-100 relative"
                >
                  <div className="grid gap-1 w-16">
                    <Label className="text-[10px] text-slate-500">Mã SP</Label>
                    <Input
                      type="number"
                      value={item.ProductID}
                      onChange={(e) =>
                        handleItemChange(index, "ProductID", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 flex-1">
                    <Label className="text-[10px] text-slate-500">
                      Tên sản phẩm
                    </Label>
                    <Input
                      value={item.ProductName}
                      onChange={(e) =>
                        handleItemChange(index, "ProductName", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 w-16">
                    <Label className="text-[10px] text-slate-500">SL Y/C</Label>
                    <Input
                      type="number"
                      value={item.ExpectedQuantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "ExpectedQuantity",
                          e.target.value,
                        )
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 w-16">
                    <Label className="text-[10px] text-slate-500">
                      SL Thực
                    </Label>
                    <Input
                      type="number"
                      value={item.ActualQuantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "ActualQuantity",
                          e.target.value,
                        )
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItemRow(index)}
                    disabled={items.length === 1}
                    className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-red-500 rounded-none bg-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="rounded-none border-slate-200 text-slate-500"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-none border-amber-200 text-amber-600 hover:bg-amber-50"
              onClick={() => handleSubmit(true)}
            >
              Lưu bản nháp
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
              onClick={() => handleSubmit(false)}
            >
              Hoàn thành nhập
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
