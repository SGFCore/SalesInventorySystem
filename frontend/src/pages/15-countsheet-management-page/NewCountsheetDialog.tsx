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
import { btn, dialog } from "@/pages/page-classes";
import { Plus, Trash2, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Warehouse, Product } from "@/lib/types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface DetailInputRow {
  WarehouseID: number;
  ProductId: number;
  Quantity: number;
  Note: string;
}

export function NewCountsheetDialog({ open, onOpenChange, onSave }: Props) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouseGlobalId, setWarehouseGlobalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<DetailInputRow[]>([]);

  useEffect(() => {
    if (open) {
      setWarehouseGlobalId("");
      setItems([]);

      const loadDropdowns = async () => {
        setLoading(true);
        try {
          const [whList, prodList] = await Promise.all([
            api.warehouses.list(),
            api.products.list(),
          ]);
          const activeWH = whList.filter((w) => w.Status === 1);
          setWarehouses(activeWH);
          setProducts(prodList);

          if (activeWH.length > 0 && prodList.length > 0) {
            setWarehouseGlobalId(String(activeWH[0].WareHouseID));
            setItems([
              {
                WarehouseID: activeWH[0].WareHouseID,
                ProductId: prodList[0].ProductID,
                Quantity: 10,
                Note: "Kiểm kê định kỳ",
              },
            ]);
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

  const handleRowValueChange = (
    index: number,
    field: keyof DetailInputRow,
    value: any,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const insertNewRow = () => {
    if (warehouses.length === 0 || products.length === 0) return;
    const whId = Number(warehouseGlobalId) || warehouses[0].WareHouseID;
    setItems((prev) => [
      ...prev,
      {
        WarehouseID: whId,
        ProductId: products[0].ProductID,
        Quantity: 10,
        Note: "Kiểm kê định kỳ",
      },
    ]);
  };

  const removeRowIndex = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSubmit = async (isDraftMode: boolean) => {
    const hasInvalidQty = items.some((item) => item.Quantity < 0);
    if (hasInvalidQty) {
      toast.error("Số lượng kiểm kê thực tế không được nhỏ hơn 0!");
      return;
    }

    setLoading(true);
    try {
      const countSheetId = Math.floor(Math.random() * 900000) + 100000;
      
      // 1. Tạo phiếu kiểm Master
      await api.countSheets.create({
        CountSheetId: countSheetId,
        CreatedDate: new Date(),
        Status: isDraftMode ? 0 : 1, // 0: Bản nháp, 1: Chờ phê duyệt
      });

      // 2. Tạo chi tiết phiếu kiểm Details
      await Promise.all(
        items.map((item) =>
          api.countSheetDetails.create({
            CountSheetld: countSheetId,
            WarehouseID: item.WarehouseID,
            ProductId: item.ProductId,
            Quantity: item.Quantity,
            Note: item.Note || "Kiểm kê định kỳ",
          })
        )
      );

      toast.success(isDraftMode ? "Lưu bản nháp phiếu kiểm kho thành công!" : "Tạo phiếu kiểm kho mới thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo phiếu kiểm kho thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo phiếu kiểm kê mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm max-h-[70vh] overflow-y-auto pr-1">
          {/* Thông tin Master Info mặc định */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label
                htmlFor="warehouseGlobalId"
                className="text-xs font-bold text-slate-700"
              >
                Nhà kho kiểm kê chính
              </Label>
              <select
                id="warehouseGlobalId"
                value={warehouseGlobalId}
                onChange={(e) => {
                  const val = e.target.value;
                  setWarehouseGlobalId(val);
                  // Đồng bộ nhanh mã kho xuống các dòng chi tiết hiện tại
                  setItems((prev) =>
                    prev.map((item) => ({
                      ...item,
                      WarehouseID: Number(val),
                    })),
                  );
                }}
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
            <div className="grid gap-1 justify-end items-end pb-2">
              <p className="text-[11px] text-slate-400 font-semibold italic">
                * Trạng thái khi gửi duyệt: Chờ phê duyệt
              </p>
            </div>
          </div>

          {/* Danh sách vật tư chi tiết */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-bold text-slate-900">
                Danh sách chi tiết vật tư kiểm kho
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={insertNewRow}
                disabled={loading}
                className="text-blue-600 border-blue-200 flex items-center gap-1 h-8 text-xs font-semibold rounded-md hover:bg-blue-50"
              >
                <Plus className="h-3.5 w-3.5" /> Thêm dòng
              </Button>
            </div>

            {loading && items.length === 0 ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-500 text-xs font-semibold">Đang chuẩn bị form...</span>
              </div>
            ) : (
              <div className="grid gap-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-3 border border-slate-200 bg-slate-50/50 rounded-md text-xs relative"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid gap-1 flex-1">
                        <Label className="text-[10px] text-slate-500 font-bold">Tên sản phẩm</Label>
                        <select
                          value={item.ProductId}
                          onChange={(e) =>
                            handleRowValueChange(index, "ProductId", Number(e.target.value))
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

                      <div className="grid gap-1 w-20">
                        <Label className="text-[10px] text-slate-500 font-bold text-center">SL Thực kiểm</Label>
                        <Input
                          type="number"
                          min={0}
                          value={item.Quantity}
                          onChange={(e) =>
                            handleRowValueChange(index, "Quantity", Math.max(0, Number(e.target.value)))
                          }
                          className="h-8 border-slate-200 bg-white text-center font-bold text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                          disabled={loading}
                        />
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeRowIndex(index)}
                        disabled={items.length === 1 || loading}
                        className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-red-500 bg-white rounded-md mt-4 flex items-center justify-center"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <div className="grid gap-1">
                      <Label className="text-[10px] text-slate-500 font-bold">Ghi chú kiểm kê</Label>
                      <Input
                        value={item.Note}
                        onChange={(e) => handleRowValueChange(index, "Note", e.target.value)}
                        placeholder="VD: Hao hụt tự nhiên, Đầy đủ..."
                        className="h-8 border-slate-200 bg-white focus-visible:ring-blue-600 focus-visible:ring-offset-0 px-2 text-xs rounded-md"
                        disabled={loading}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cụm nút bấm chân trang Dialog */}
        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-500"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy bỏ
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
              onClick={() => handleSaveSubmit(true)}
              disabled={loading || items.length === 0}
            >
              Lưu bản nháp
            </Button>
            <Button
              className={btn.primary}
              onClick={() => handleSaveSubmit(false)}
              disabled={loading || items.length === 0}
            >
              Gửi duyệt
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
