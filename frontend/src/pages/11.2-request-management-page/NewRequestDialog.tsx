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
import { Plus, Trash2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface DetailInput {
  ProductID: number;
  Quantity: number;
}

export function NewRequestDialog({ open, onOpenChange, onSave }: Props) {
  const { emp } = useEmp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<DetailInput[]>([]);

  useEffect(() => {
    if (open) {
      const loadProducts = async () => {
        try {
          const list = await api.products.list();
          setProducts(list);
          if (list.length > 0) {
            setItems([{ ProductID: list[0].ProductID, Quantity: 1 }]);
          }
        } catch (e) {
          console.error("Lỗi lấy danh sách sản phẩm:", e);
        }
      };
      loadProducts();
    }
  }, [open]);

  const handleItemChange = (
    index: number,
    field: keyof DetailInput,
    value: number,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addItemRow = () => {
    if (products.length === 0) return;
    setItems((prev) => [
      ...prev,
      { ProductID: products[0].ProductID, Quantity: 1 },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const hasInvalidQty = items.some((item) => item.Quantity <= 0);
    if (hasInvalidQty) {
      toast.error("Số lượng đề xuất phải lớn hơn 0!");
      return;
    }

    setLoading(true);
    try {
      const requestId = Math.floor(Math.random() * 900000) + 100000;
      const empId = emp ? emp.EmployeeID : 1;

      // 1. Create request form
      await api.requestForms.create({
        RequestID: requestId,
        EmployeeID: empId,
        CreatedDate: new Date().toISOString(),
        Status: "0", // "0": Chờ duyệt
        ApproverID: 0,
        RejectReason: "",
      });

      // 2. Create request details
      await Promise.all(
        items.map((item) => {
          return api.requestDetails.create({
            RequestID: requestId,
            ProductID: item.ProductID,
            Quantity: item.Quantity,
          });
        })
      );

      toast.success("Tạo yêu cầu bổ sung thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo yêu cầu bổ sung thất bại!");
    } finally {
      setLoading(false);
    }
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
              <Label className="text-sm font-bold text-slate-900">
                Danh sách vật tư hàng hóa cần nhập
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addItemRow}
                disabled={loading}
                className="text-blue-600 border-blue-200 flex items-center gap-1 h-8 text-xs font-semibold rounded-md hover:bg-blue-50"
              >
                <Plus className="h-3.5 w-3.5" /> Thêm dòng
              </Button>
            </div>

            {/* Khối quản lý danh sách động dòng chi tiết */}
            <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-end gap-2 bg-slate-50/50 p-2.5 border border-slate-200 relative rounded-md"
                >
                  <div className="grid gap-1 flex-1">
                    <Label className="text-xs text-slate-500 font-semibold">
                      Tên sản phẩm hàng hóa
                    </Label>
                    <select
                      value={item.ProductID}
                      onChange={(e) =>
                        handleItemChange(index, "ProductID", Number(e.target.value))
                      }
                      className="flex h-8 w-full border border-slate-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md font-medium text-slate-800"
                      disabled={loading}
                    >
                      {products.map((prod) => (
                        <option key={prod.ProductID} value={prod.ProductID}>
                          {prod.ProductName} (Mã: #{prod.ProductID})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-1 w-20">
                    <Label className="text-xs text-slate-500 font-semibold">
                      Số lượng
                    </Label>
                    <Input
                      type="number"
                      min={1}
                      value={item.Quantity}
                      onChange={(e) =>
                        handleItemChange(index, "Quantity", Math.max(1, Number(e.target.value)))
                      }
                      className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs font-bold text-center rounded-md"
                      disabled={loading}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeItemRow(index)}
                    disabled={items.length === 1 || loading}
                    className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-red-500 bg-white rounded-md flex items-center justify-center"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
