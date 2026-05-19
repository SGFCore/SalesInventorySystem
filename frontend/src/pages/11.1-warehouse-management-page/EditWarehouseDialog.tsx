import React, { useEffect, useState } from "react";
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
import { Trash2, Plus, Loader2 } from "lucide-react";
import type { Warehouse, DetailInventory, Product } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse;
  onSave: () => void;
}

export function EditWarehouseDialog({ open, onOpenChange, warehouse, onSave }: Props) {
  const [form, setForm] = useState<Partial<Warehouse>>({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // State quản lý danh sách sản phẩm và định mức tồn kho (Dynamic fields)
  const [inventoryProducts, setInventoryProducts] = useState<DetailInventory[]>([]);

  useEffect(() => {
    if (open && warehouse) {
      setForm(warehouse);

      const loadInventoryData = async () => {
        setLoading(true);
        try {
          const [allInventories, allProducts] = await Promise.all([
            api.detailInventories.list(),
            api.products.list(),
          ]);
          setProducts(allProducts);

          const existingInvs = allInventories.filter(
            (inv) => inv.WarehouseID === warehouse.WareHouseID
          );

          if (existingInvs.length > 0) {
            setInventoryProducts(existingInvs);
          } else if (allProducts.length > 0) {
            setInventoryProducts([
              {
                WarehouseID: warehouse.WareHouseID,
                ProductID: allProducts[0].ProductID,
                CurrentQuantity: 0,
                RealStock: 0,
                AvailableStock: 0,
                MinStock: 10,
                MaxStock: 100,
                IsAlertEnabled: 1,
                StorageLocation: "Khu A",
              },
            ]);
          }
        } catch (e) {
          console.error("Lỗi lấy chi tiết tồn kho:", e);
        } finally {
          setLoading(false);
        }
      };

      loadInventoryData();
    }
  }, [open, warehouse]);

  // Thêm dòng cấu hình sản phẩm mới vào kho
  const handleAddProduct = () => {
    if (products.length === 0) return;
    setInventoryProducts((prev) => [
      ...prev,
      {
        WarehouseID: warehouse.WareHouseID,
        ProductID: products[0].ProductID,
        CurrentQuantity: 0,
        RealStock: 0,
        AvailableStock: 0,
        MinStock: 10,
        MaxStock: 100,
        IsAlertEnabled: 1,
        StorageLocation: "Khu A",
      },
    ]);
  };

  // Xóa dòng cấu hình sản phẩm (Giữ lại tối thiểu 1 dòng)
  const handleRemoveProduct = (index: number) => {
    if (inventoryProducts.length === 1) return;
    setInventoryProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Cập nhật giá trị các trường trong danh sách sản phẩm động
  const handleProductChange = (
    index: number,
    field: keyof DetailInventory,
    value: string | number,
  ) => {
    setInventoryProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleSubmit = async () => {
    if (!form.WareHouseName?.trim() || !form.Address?.trim()) {
      toast.error("Vui lòng điền đầy đủ Tên và Địa chỉ kho hàng!");
      return;
    }

    // Validate dữ liệu định mức nhập vào
    const hasInvalidStock = inventoryProducts.some(
      (p) => p.MinStock < 0 || p.MaxStock < 0 || p.MinStock > p.MaxStock,
    );

    if (hasInvalidStock) {
      toast.error(
        "Định mức Min/Max không hợp lệ (Min Stock phải nhỏ hơn hoặc bằng Max Stock và không được âm)!",
      );
      return;
    }

    setLoading(true);
    try {
      // 1. Update warehouse info
      const updatedWH = {
        ...warehouse,
        ...form,
        ManagerID: Number(form.ManagerID) || warehouse.ManagerID,
        Capacity: Number(form.Capacity) || warehouse.Capacity,
        WarehouseType: Number(form.WarehouseType) || warehouse.WarehouseType,
        Status: Number(form.Status) !== undefined ? Number(form.Status) : warehouse.Status,
      };
      await api.warehouses.update(warehouse.WareHouseID, updatedWH);

      // 2. Save detail inventory configurations
      // (Trong thực tế, ta sẽ xóa hết cấu hình cũ của kho này rồi insert lại hoặc update. Để đơn giản & an toàn, ta gọi tạo mới cho từng dòng)
      await Promise.all(
        inventoryProducts.map((inv) =>
          api.detailInventories.create(inv).catch((err) => {
            // Nếu đã tồn tại, ta update bản ghi đó
            return api.detailInventories.update(inv.WarehouseID, inv);
          })
        )
      );

      toast.success("Cập nhật thông tin kho và cấu hình tồn kho thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Cập nhật kho hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật thông tin kho hàng #{warehouse.WareHouseID}
          </DialogTitle>
        </DialogHeader>

        {loading && inventoryProducts.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải dữ liệu kho hàng...</span>
          </div>
        ) : (
          <div className="grid gap-3 py-2 text-sm max-h-[70vh] overflow-y-auto pr-2">
            {/* Tên kho hàng */}
            <div className="grid gap-1">
              <Label htmlFor="edit-warehouseName" className="font-semibold text-slate-700">Tên kho hàng</Label>
              <Input
                id="edit-warehouseName"
                value={form.WareHouseName || ""}
                onChange={(e) =>
                  setForm({ ...form, WareHouseName: e.target.value })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                disabled={loading}
              />
            </div>

            {/* Địa chỉ */}
            <div className="grid gap-1">
              <Label htmlFor="edit-address" className="font-semibold text-slate-700">Địa chỉ</Label>
              <Input
                id="edit-address"
                value={form.Address || ""}
                onChange={(e) => setForm({ ...form, Address: e.target.value })}
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                disabled={loading}
              />
            </div>

            {/* Số điện thoại & Mã người quản lý */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label htmlFor="edit-contact" className="font-semibold text-slate-700">Số điện thoại</Label>
                <Input
                  id="edit-contact"
                  value={form.ContactNumber || ""}
                  onChange={(e) =>
                    setForm({ ...form, ContactNumber: e.target.value })
                  }
                  className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                  disabled={loading}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-managerId" className="font-semibold text-slate-700">Mã người quản lý</Label>
                <Input
                  id="edit-managerId"
                  type="number"
                  value={form.ManagerID ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, ManagerID: Number(e.target.value) })
                  }
                  className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Sức chứa & Loại kho */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label htmlFor="edit-capacity" className="font-semibold text-slate-700">Sức chứa</Label>
                <Input
                  id="edit-capacity"
                  type="number"
                  value={form.Capacity ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, Capacity: Number(e.target.value) })
                  }
                  className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-10 rounded-md"
                  disabled={loading}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-type" className="font-semibold text-slate-700">Loại kho</Label>
                <select
                  id="edit-type"
                  value={form.WarehouseType ?? 1}
                  onChange={(e) =>
                    setForm({ ...form, WarehouseType: Number(e.target.value) })
                  }
                  className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                  disabled={loading}
                >
                  <option value={1}>Kho tổng</option>
                  <option value={2}>Kho phân phối</option>
                </select>
              </div>
            </div>

            {/* Trạng thái hoạt động */}
            <div className="grid gap-1">
              <Label htmlFor="edit-status" className="font-semibold text-slate-700">Trạng thái</Label>
              <select
                id="edit-status"
                value={form.Status ?? 1}
                onChange={(e) =>
                  setForm({ ...form, Status: Number(e.target.value) })
                }
                className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                disabled={loading}
              >
                <option value={1}>Đang hoạt động</option>
                <option value={0}>Tạm dừng</option>
              </select>
            </div>

            {/* ================= PHẦN BỔ SUNG: DANH SÁCH SẢN PHẨM & ĐỊNH MỨC TỒN KHO ================= */}
            <div className="border-t border-slate-100 pt-4 mt-2">
              <Label className="text-slate-900 font-bold block mb-3">
                Cấu hình sản phẩm & Định mức tồn kho <span className="text-red-500">*</span>
              </Label>

              <div className="grid gap-3">
                {inventoryProducts.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-3 border border-slate-200 rounded-md bg-slate-50/50"
                  >
                    <div className="flex items-center gap-2">
                      {/* Dropdown chọn sản phẩm */}
                      <div className="flex-1">
                        <select
                          value={item.ProductID}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "ProductID",
                              Number(e.target.value),
                            )
                          }
                          className="flex h-8 w-full border border-slate-200 rounded-md bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                          disabled={loading}
                        >
                          {products.map((prod) => (
                            <option key={prod.ProductID} value={prod.ProductID}>
                              {prod.ProductName} (#{prod.ProductID})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Vị trí lưu trữ trong kho (StorageLocation) */}
                      <div className="w-28">
                        <Input
                          type="text"
                          placeholder="Vị trí (Kệ A1)"
                          value={item.StorageLocation}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "StorageLocation",
                              e.target.value,
                            )
                          }
                          className="border-slate-200 h-8 text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                          disabled={loading}
                        />
                      </div>

                      {/* Nút xóa dòng */}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={inventoryProducts.length === 1 || loading}
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-500 hover:bg-red-50 border-slate-200 h-8 w-8 p-0 flex items-center justify-center disabled:opacity-40 transition-none rounded-md"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {/* Nhập Min Stock và Max Stock */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          Min:
                        </span>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Min Stock"
                          value={item.MinStock}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "MinStock",
                              Number(e.target.value),
                            )
                          }
                          className="border-slate-200 h-8 text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-center font-bold"
                          disabled={loading}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          Max:
                        </span>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Max Stock"
                          value={item.MaxStock}
                          onChange={(e) =>
                            handleProductChange(
                              index,
                              "MaxStock",
                              Number(e.target.value),
                            )
                          }
                          className="border-slate-200 h-8 text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-center font-bold"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nút thêm sản phẩm mới vào kho */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
                className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-3 w-full flex items-center justify-center gap-1 h-8 text-xs transition-none"
                disabled={loading}
              >
                <Plus className="h-4 w-4" /> Thêm định mức sản phẩm vào kho
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200 transition-none"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-none"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
