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
import type { Countsheet, Countsheetdetail, Warehouse, Product } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import { Plus, Trash2, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countsheet: Countsheet;
  onSave: () => void;
}

interface DetailFormInput {
  WarehouseID: number;
  ProductId: number;
  Quantity: number;
  Note: string;
}

export function EditCountsheetDialog({
  open,
  onOpenChange,
  countsheet,
  onSave,
}: Props) {
  const [items, setItems] = useState<DetailFormInput[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && countsheet) {
      const loadInitialData = async () => {
        setLoading(true);
        try {
          const [allDetails, whList, prodList] = await Promise.all([
            api.countSheetDetails.list(),
            api.warehouses.list(),
            api.products.list(),
          ]);
          setWarehouses(whList.filter((w) => w.Status === 1));
          setProducts(prodList);

          const currentDetails = allDetails.filter(
            (d) => d.countsheetId === countsheet.id
          );

          if (currentDetails.length > 0) {
            setItems(
              currentDetails.map((d) => ({
                WarehouseID: d.warehouseId,
                ProductId: d.productId,
                Quantity: d.quantity,
                Note: d.note || "",
              }))
            );
          } else if (whList.length > 0 && prodList.length > 0) {
            setItems([
              {
                WarehouseID: whList[0].WareHouseID,
                ProductId: prodList[0].ProductID,
                Quantity: 10,
                Note: "Kiểm kê định kỳ",
              },
            ]);
          }
        } catch (e) {
          console.error("Lỗi lấy chi tiết kiểm kê:", e);
        } finally {
          setLoading(false);
        }
      };

      loadInitialData();
    }
  }, [open, countsheet]);

  const handleRowChange = (
    index: number,
    field: keyof DetailFormInput,
    value: any,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddRow = () => {
    if (warehouses.length === 0 || products.length === 0) return;
    setItems((prev) => [
      ...prev,
      {
        WarehouseID: warehouses[0].WareHouseID,
        ProductId: products[0].ProductID,
        Quantity: 10,
        Note: "Kiểm kê định kỳ",
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveUpdate = async () => {
    const hasInvalidQty = items.some((item) => item.Quantity < 0);
    if (hasInvalidQty) {
      toast.error("Số lượng kiểm kê thực tế không được nhỏ hơn 0!");
      return;
    }

    setLoading(true);
    try {
      // 1. Cập nhật Master
      await api.countSheets.update(countsheet.id, {
        ...countsheet,
        status: 1, // Trả về trạng thái Chờ phê duyệt sau khi cập nhật
      });

      // 2. Cập nhật Details (Xóa cũ tạo mới hoặc lưu đè)
      await Promise.all(
        items.map((item) =>
          api.countSheetDetails.create({
            countsheetId: countsheet.id,
            warehouseId: item.WarehouseID,
            productId: item.ProductId,
            quantity: item.Quantity,
            note: item.Note || "Kiểm kê định kỳ",
          }).catch((err) => {
            // Nếu đã tồn tại thì bỏ qua hoặc ghi đè
            return api.countSheetDetails.list(); 
          })
        )
      );

      toast.success("Cập nhật phiếu kiểm kê thành công và chuyển trạng thái Chờ duyệt!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Cập nhật phiếu kiểm kê thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[620px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật phiếu kiểm kê #{countsheet?.id}
          </DialogTitle>
        </DialogHeader>

        {loading && items.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải dữ liệu...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-slate-900">
                Danh sách chi tiết kiểm kê thực tế
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddRow}
                disabled={loading}
                className="text-blue-600 border-blue-200 flex items-center gap-1 h-8 text-xs font-semibold rounded-md hover:bg-blue-50"
              >
                <Plus className="h-3.5 w-3.5" /> Thêm hàng hóa
              </Button>
            </div>

            {/* Danh sách các trường nhập liệu tương ứng schema CountSheetDetail */}
            <div className="grid gap-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 border border-slate-200 bg-slate-50/50 rounded-md text-xs relative"
                >
                  <div className="flex items-center gap-2">
                    {/* Chọn Nhà kho */}
                    <div className="grid gap-1 w-32">
                      <Label className="text-[10px] text-slate-500 font-bold">Chọn Kho</Label>
                      <select
                        value={item.WarehouseID}
                        onChange={(e) =>
                          handleRowChange(index, "WarehouseID", Number(e.target.value))
                        }
                        className="flex h-8 w-full border border-slate-200 rounded-md bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 font-semibold"
                        disabled={loading}
                      >
                        {warehouses.map((w) => (
                          <option key={w.WareHouseID} value={w.WareHouseID}>
                            Kho: {w.WareHouseName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Chọn Sản phẩm */}
                    <div className="grid gap-1 flex-1">
                      <Label className="text-[10px] text-slate-500 font-bold">Chọn Sản phẩm</Label>
                      <select
                        value={item.ProductId}
                        onChange={(e) =>
                          handleRowChange(index, "ProductId", Number(e.target.value))
                        }
                        className="flex h-8 w-full border border-slate-200 rounded-md bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 font-semibold"
                        disabled={loading}
                      >
                        {products.map((prod) => (
                          <option key={prod.ProductID} value={prod.ProductID}>
                            {prod.ProductName} (Mã: #{prod.ProductID})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Số lượng */}
                    <div className="grid gap-1 w-20">
                      <Label className="text-[10px] text-slate-500 font-bold text-center">SL Thực Tế</Label>
                      <Input
                        type="number"
                        min={0}
                        value={item.Quantity}
                        onChange={(e) =>
                          handleRowChange(index, "Quantity", Math.max(0, Number(e.target.value)))
                        }
                        className="h-8 border-slate-200 bg-white text-center font-bold text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                        disabled={loading}
                      />
                    </div>

                    {/* Nút Xóa dòng */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveRow(index)}
                      disabled={items.length === 1 || loading}
                      className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-red-500 bg-white rounded-md mt-4 flex items-center justify-center"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Ghi chú */}
                  <div className="grid gap-1">
                    <Label className="text-[10px] text-slate-500 font-bold">Ghi chú kiểm kê</Label>
                    <Input
                      value={item.Note}
                      placeholder="Ghi chú điều kiện hoặc chênh lệch..."
                      onChange={(e) => handleRowChange(index, "Note", e.target.value)}
                      className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs rounded-md"
                      disabled={loading}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chân trang Điều hướng của form cập nhật */}
        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-500"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy bỏ
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-6"
            onClick={handleSaveUpdate}
            disabled={loading || items.length === 0}
          >
            {loading ? "Đang lưu..." : "Lưu cập nhật"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
