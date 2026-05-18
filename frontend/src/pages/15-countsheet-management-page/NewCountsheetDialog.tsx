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
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DetailInputRow {
  WarehouseID: string;
  ProductId: string;
  Quantity: string;
  Note: string;
}

export function NewCountsheetDialog({ open, onOpenChange }: Props) {
  const [warehouseGlobalId, setWarehouseGlobalId] = useState("1");
  const [items, setItems] = useState<DetailInputRow[]>([
    {
      WarehouseID: "1",
      ProductId: "",
      Quantity: "",
      Note: "",
    },
  ]);

  useEffect(() => {
    if (open) {
      setWarehouseGlobalId("1");
      setItems([
        {
          WarehouseID: "1",
          ProductId: "",
          Quantity: "",
          Note: "",
        },
      ]);
    }
  }, [open]);

  const handleRowValueChange = (
    index: number,
    field: keyof DetailInputRow,
    value: string,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const insertNewRow = () => {
    setItems((prev) => [
      ...prev,
      {
        WarehouseID: warehouseGlobalId || "1",
        ProductId: "",
        Quantity: "",
        Note: "",
      },
    ]);
  };

  const removeRowIndex = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSubmit = (isDraftMode: boolean) => {
    // Chuẩn hóa và ép kiểu dữ liệu thô sang đúng Schema DB cấu trúc đề bài yêu cầu
    const payload = {
      CreatedDate: new Date(),
      Status: isDraftMode ? 0 : 1, // 0: Chưa kiểm kê (Bản nháp), 1: Chờ phê duyệt
      Details: items.map((item) => ({
        WarehouseID: Number(item.WarehouseID) || Number(warehouseGlobalId) || 0,
        ProductId: Number(item.ProductId) || 0,
        Quantity: Number(item.Quantity) || 0,
        Note: item.Note,
      })),
    };

    console.log("Dữ liệu tạo phiếu kiểm kê mới gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white border-none max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Tạo phiếu kiểm kê mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          {/* Thông tin Master Info mặc định */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label
                htmlFor="warehouseGlobalId"
                className="text-xs font-semibold text-slate-700"
              >
                Mã kho kiểm kê chính
              </Label>
              <Input
                id="warehouseGlobalId"
                type="number"
                value={warehouseGlobalId}
                onChange={(e) => {
                  setWarehouseGlobalId(e.target.value);
                  // Đồng bộ nhanh mã kho xuống các dòng chi tiết hiện tại
                  setItems((prev) =>
                    prev.map((item) => ({
                      ...item,
                      WarehouseID: e.target.value,
                    })),
                  );
                }}
                className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none text-xs"
              />
            </div>
            <div className="grid gap-1 justify-end items-end">
              <p className="text-[11px] text-slate-400 italic">
                * Trạng thái mặc định sau khi tạo: Chờ phê duyệt
              </p>
            </div>
          </div>

          {/* Danh sách vật tư chi tiết */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold text-slate-900">
                Danh sách chi tiết vật tư kiểm kho
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={insertNewRow}
                className="text-blue-600 border-blue-200 rounded-none flex items-center gap-1 h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Thêm dòng vật tư
              </Button>
            </div>

            <div className="grid gap-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-end gap-2 bg-slate-50 p-2 border border-slate-100 relative"
                >
                  <div className="grid gap-1 w-16">
                    <Label className="text-[10px] text-slate-500">Mã Kho</Label>
                    <Input
                      type="number"
                      value={item.WarehouseID}
                      onChange={(e) =>
                        handleRowValueChange(
                          index,
                          "WarehouseID",
                          e.target.value,
                        )
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 w-24">
                    <Label className="text-[10px] text-slate-500">Mã SP</Label>
                    <Input
                      type="number"
                      placeholder="Nhập mã..."
                      value={item.ProductId}
                      onChange={(e) =>
                        handleRowValueChange(index, "ProductId", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 w-20">
                    <Label className="text-[10px] text-slate-500">
                      SL Kiểm
                    </Label>
                    <Input
                      type="number"
                      value={item.Quantity}
                      onChange={(e) =>
                        handleRowValueChange(index, "Quantity", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus:ring-blue-600 rounded-none px-2 text-xs"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeRowIndex(index)}
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

        {/* Cụm nút bấm chân trang Dialog */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="rounded-none border-slate-200 text-slate-500"
            onClick={() => onOpenChange(false)}
          >
            Hủy bỏ
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-none border-amber-200 text-amber-600 hover:bg-amber-50"
              onClick={() => handleSaveSubmit(true)}
            >
              Lưu bản nháp
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
              onClick={() => handleSaveSubmit(false)}
            >
              Lưu phiếu kiểm kê
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
