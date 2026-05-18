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
import type { CountSheet, CountSheetDetail } from "@/lib/types";
import { MOCK_COUNTSHEET_DETAILS } from "@/pages/15-countsheet-management-page/CountsheetManagementPage";
import { dialog } from "@/pages/page-classes";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countsheet: CountSheet | null;
}

interface DetailFormInput {
  WarehouseID: string;
  ProductId: string;
  Quantity: string;
  Note: string;
}

export function EditCountsheetDialog({
  open,
  onOpenChange,
  countsheet,
}: Props) {
  const [items, setItems] = useState<DetailFormInput[]>([]);

  // Đổ dữ liệu hiện tại từ Mockup Data vào Form khi mở Dialog
  useEffect(() => {
    if (open && countsheet) {
      const currentDetails =
        MOCK_COUNTSHEET_DETAILS[countsheet.CountSheetId] || [];
      if (currentDetails.length > 0) {
        setItems(
          currentDetails.map((d) => ({
            WarehouseID: d.WarehouseID.toString(),
            ProductId: d.ProductId.toString(),
            Quantity: d.Quantity.toString(),
            Note: d.Note || "",
          })),
        );
      } else {
        setItems([{ WarehouseID: "1", ProductId: "", Quantity: "", Note: "" }]);
      }
    }
  }, [open, countsheet]);

  if (!countsheet) return null;

  const handleRowChange = (
    index: number,
    field: keyof DetailFormInput,
    value: string,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAddRow = () => {
    setItems((prev) => [
      ...prev,
      { WarehouseID: "1", ProductId: "", Quantity: "", Note: "" },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (items.length === 1) return; // Giữ lại ít nhất 1 dòng
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveUpdate = () => {
    // Ép kiểu dữ liệu thô từ Form Input về đúng định dạng Type dữ liệu của hệ thống
    const updatedDetails: CountSheetDetail[] = items.map((item) => ({
      CountSheetld: countsheet.CountSheetId,
      WarehouseID: Number(item.WarehouseID) || 0,
      ProductId: Number(item.ProductId) || 0,
      Quantity: Number(item.Quantity) || 0,
      Note: item.Note,
    }));

    const payload = {
      CountSheetId: countsheet.CountSheetId,
      Details: updatedDetails,
    };

    console.log("Cập nhật thành công! Dữ liệu phiếu gửi lên API:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[620px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật nội dung kiểm kê phiếu #{countsheet.CountSheetId}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-slate-700">
              Danh sách chi tiết kiểm kê thực tế
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddRow}
              className="text-blue-600 border-blue-200 flex items-center gap-1 h-8 text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Thêm hàng hóa
            </Button>
          </div>

          {/* Danh sách các trường nhập liệu tương ứng schema CountSheetDetail */}
          <div className="grid gap-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-end gap-2 bg-slate-50 p-2 border border-slate-100 relative"
              >
                {/* WarehouseID Input */}
                <div className="grid gap-1 w-16">
                  <Label className="text-xs text-slate-500 font-medium">
                    Mã Kho
                  </Label>
                  <Input
                    type="number"
                    value={item.WarehouseID}
                    onChange={(e) =>
                      handleRowChange(index, "WarehouseID", e.target.value)
                    }
                    className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                  />
                </div>

                {/* ProductId Input */}
                <div className="grid gap-1 w-24">
                  <Label className="text-xs text-slate-500 font-medium">
                    Mã Vật Tư
                  </Label>
                  <Input
                    type="number"
                    placeholder="Nhập mã..."
                    value={item.ProductId}
                    onChange={(e) =>
                      handleRowChange(index, "ProductId", e.target.value)
                    }
                    className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                  />
                </div>

                {/* Quantity Input */}
                <div className="grid gap-1 w-20">
                  <Label className="text-xs text-slate-500 font-medium">
                    SL Thực Tế
                  </Label>
                  <Input
                    type="number"
                    value={item.Quantity}
                    onChange={(e) =>
                      handleRowChange(index, "Quantity", e.target.value)
                    }
                    className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                  />
                </div>

                {/* Note Input */}
                <div className="grid gap-1 flex-1">
                  <Label className="text-xs text-slate-500 font-medium">
                    Ghi chú kiểm kê
                  </Label>
                  <Input
                    value={item.Note}
                    placeholder="Ghi chú điều kiện hoặc chênh lệch..."
                    onChange={(e) =>
                      handleRowChange(index, "Note", e.target.value)
                    }
                    className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                  />
                </div>

                {/* Nút Xóa dòng */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleRemoveRow(index)}
                  disabled={items.length === 1}
                  className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-red-500 bg-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Chân trang Điều hướng của form cập nhật */}
        <DialogFooter className="gap-2 sm:gap-0 mt-2">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-500"
            onClick={() => onOpenChange(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            onClick={handleSaveUpdate}
          >
            Lưu cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
