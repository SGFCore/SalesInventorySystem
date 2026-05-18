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
import { useEmp } from "@/context/empContext";
import { btn, dialog } from "@/pages/page-classes";
import { Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DetailInput {
  ProductId: string;
  ProductName: string;
  Quantity: string;
}

export function NewRequestDialog({ open, onOpenChange }: Props) {
  const { emp } = useEmp();
  const [employeeId, setEmployeeId] = useState(emp.EmployeeID);
  const [items, setItems] = useState<DetailInput[]>([
    { ProductId: "", ProductName: "", Quantity: "" },
  ]);

  useEffect(() => {
    if (open) {
      setItems([{ ProductId: "", ProductName: "", Quantity: "" }]);
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
      { ProductId: "", ProductName: "", Quantity: "" },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Ép kiểu & Đóng gói dữ liệu Master-Detail
    const payload = {
      EmployeeID: Number(employeeId) || 0,
      CreatedDate: new Date(),
      Status: "Chờ duyệt",
      ApproverID: 0,
      RejectReason: "",
      Details: items.map((item) => ({
        ProductId: Number(item.ProductId) || 0,
        ProductName: item.ProductName,
        Quantity: Number(item.Quantity) || 0,
      })),
    };

    console.log("Dữ liệu tạo yêu cầu mới gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo yêu cầu bổ sung mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold text-slate-900">
                Danh sách vật tư hàng hóa cần nhập
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItemRow}
                className="text-blue-600 border-blue-200 flex items-center gap-1 h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5" /> Thêm dòng
              </Button>
            </div>

            {/* Khối quản lý danh sách động dòng chi tiết */}
            <div className="grid gap-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-end gap-2 bg-slate-50 p-2 border border-slate-100 relative"
                >
                  <div className="grid gap-1 w-20">
                    <Label className="text-xs text-slate-500">Mã SP</Label>
                    <Input
                      type="number"
                      value={item.ProductId}
                      onChange={(e) =>
                        handleItemChange(index, "ProductId", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 flex-1">
                    <Label className="text-xs text-slate-500">
                      Tên sản phẩm hàng hóa
                    </Label>
                    <Input
                      value={item.ProductName}
                      onChange={(e) =>
                        handleItemChange(index, "ProductName", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                    />
                  </div>

                  <div className="grid gap-1 w-16">
                    <Label className="text-xs text-slate-500">
                      Số lượng
                    </Label>
                    <Input
                      type="number"
                      value={item.Quantity}
                      onChange={(e) =>
                        handleItemChange(index, "Quantity", e.target.value)
                      }
                      className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItemRow(index)}
                    disabled={items.length === 1}
                    className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-red-500 bg-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-slate-200"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
