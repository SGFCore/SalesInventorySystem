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
import { Trash2, Plus } from "lucide-react";
import type { Warehouse } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";

// Khai báo type định mức tồn kho cho từng sản phẩm trong kho này
export type DetailInventory = {
  WarehouseID: number;
  ProductID: number;
  CurrentQuantity: number;
  RealStock: number;
  AvailableStock: number;
  MinStock: number;
  MaxStock: number;
  IsAlertEnabled: number;
  StorageLocation: string;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

// Mock danh sách sản phẩm mẫu để chọn trong dropdown
const MOCK_PRODUCTS_LIST = [
  { ProductID: 101, ProductName: "Sản phẩm A" },
  { ProductID: 102, ProductName: "Sản phẩm B" },
  { ProductID: 103, ProductName: "Sản phẩm C" },
  { ProductID: 104, ProductName: "Sản phẩm D" },
];

export function EditWarehouseDialog({ open, onOpenChange, warehouse }: Props) {
  const [form, setForm] = useState<Partial<Warehouse>>({});

  // State quản lý danh sách sản phẩm và định mức tồn kho (Dynamic fields)
  const [inventoryProducts, setInventoryProducts] = useState<DetailInventory[]>(
    [],
  );

  useEffect(() => {
    if (warehouse) {
      setForm(warehouse);
      // Giả sử ban đầu kho chưa có sản phẩm nào hoặc lấy từ database, ta tạo sẵn 1 dòng mặc định
      // Nếu warehouse có sẵn inventory từ props, bạn có thể map vào đây: setInventoryProducts(warehouse.inventories || [...])
      setInventoryProducts([
        {
          WarehouseID: warehouse.WareHouseID || 0,
          ProductID: MOCK_PRODUCTS_LIST[0].ProductID,
          CurrentQuantity: 0,
          RealStock: 0,
          AvailableStock: 0,
          MinStock: 10,
          MaxStock: 100,
          IsAlertEnabled: 1,
          StorageLocation: "",
        },
      ]);
    }
  }, [warehouse]);

  // Thêm dòng cấu hình sản phẩm mới vào kho
  const handleAddProduct = () => {
    setInventoryProducts((prev) => [
      ...prev,
      {
        WarehouseID: form.WareHouseID || 0,
        ProductID: MOCK_PRODUCTS_LIST[0].ProductID,
        CurrentQuantity: 0,
        RealStock: 0,
        AvailableStock: 0,
        MinStock: 10,
        MaxStock: 100,
        IsAlertEnabled: 1,
        StorageLocation: "",
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

  const handleSubmit = () => {
    // Validate dữ liệu định mức nhập vào
    const hasInvalidStock = inventoryProducts.some(
      (p) => p.MinStock < 0 || p.MaxStock < 0 || p.MinStock > p.MaxStock,
    );

    if (hasInvalidStock) {
      alert(
        "Định mức Min/Max không hợp lệ (Min Stock phải nhỏ hơn hoặc bằng Max Stock và không được âm)!",
      );
      return;
    }

    // Gộp data form kho hàng và danh sách sản phẩm định mức tồn kho gửi đi
    const finalData = {
      ...form,
      inventories: inventoryProducts,
    };

    console.log("Dữ liệu cập nhật kho hàng gửi đi:", finalData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật thông tin kho hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4 text-sm">
          {/* Tên kho hàng */}
          <div className="grid gap-1">
            <Label htmlFor="edit-warehouseName">Tên kho hàng</Label>
            <Input
              id="edit-warehouseName"
              value={form.WareHouseName || ""}
              onChange={(e) =>
                setForm({ ...form, WareHouseName: e.target.value })
              }
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-9"
            />
          </div>

          {/* Địa chỉ */}
          <div className="grid gap-1">
            <Label htmlFor="edit-address">Địa chỉ</Label>
            <Input
              id="edit-address"
              value={form.Address || ""}
              onChange={(e) => setForm({ ...form, Address: e.target.value })}
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-9"
            />
          </div>

          {/* Số điện thoại & Mã người quản lý */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="edit-contact">Số điện thoại</Label>
              <Input
                id="edit-contact"
                value={form.ContactNumber || ""}
                onChange={(e) =>
                  setForm({ ...form, ContactNumber: e.target.value })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-9"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="edit-managerId">Mã người quản lý</Label>
              <Input
                id="edit-managerId"
                type="number"
                value={form.ManagerID ?? ""}
                onChange={(e) =>
                  setForm({ ...form, ManagerID: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-9"
              />
            </div>
          </div>

          {/* Sức chứa & Loại kho */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <Label htmlFor="edit-capacity">Sức chứa</Label>
              <Input
                id="edit-capacity"
                type="number"
                value={form.Capacity ?? ""}
                onChange={(e) =>
                  setForm({ ...form, Capacity: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200 h-9"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="edit-type">Loại kho</Label>
              <select
                id="edit-type"
                value={form.WarehouseType ?? 1}
                onChange={(e) =>
                  setForm({ ...form, WarehouseType: Number(e.target.value) })
                }
                className="flex h-9 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
              >
                <option value={1}>Kho tổng</option>
                <option value={2}>Kho phân phối</option>
              </select>
            </div>
          </div>

          {/* Trạng thái hoạt động */}
          <div className="grid gap-1">
            <Label htmlFor="edit-status">Trạng thái</Label>
            <select
              id="edit-status"
              value={form.Status ?? 1}
              onChange={(e) =>
                setForm({ ...form, Status: Number(e.target.value) })
              }
              className="flex h-9 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
            >
              <option value={1}>Đang hoạt động</option>
              <option value={0}>Tạm dừng</option>
            </select>
          </div>

          {/* ================= PHẦN BỔ SUNG: DANH SÁCH SẢN PHẨM & ĐỊNH MỨC TỒN KHO ================= */}
          <div className="border-t border-slate-100 pt-4 mt-2">
            <Label className="text-slate-900 font-bold block mb-3">
              Cấu hình sản phẩm & Định mức tồn kho{" "}
              <span className="text-red-500">*</span>
            </Label>

            <div className="grid gap-3">
              {inventoryProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 border border-slate-100 bg-slate-50/30"
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
                        className="flex h-8 w-full border border-slate-200 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                      >
                        {MOCK_PRODUCTS_LIST.map((prod) => (
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
                        className="border-slate-200 h-8 text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                      />
                    </div>

                    {/* Nút xóa dòng */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={inventoryProducts.length === 1}
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-500 hover:bg-red-50 border-slate-200 h-8 w-8 p-0 flex items-center justify-center disabled:opacity-40 transition-none"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Nhập Min Stock và Max Stock */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        Tối thiểu (Min):
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
                        className="border-slate-200 h-7 text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        Tối đa (Max):
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
                        className="border-slate-200 h-7 text-xs focus-visible:ring-blue-600 focus-visible:ring-offset-0"
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
              className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-3 w-full flex items-center justify-center gap-1 h-8 transition-none"
            >
              <Plus className="h-4 w-4" /> Thêm định mức sản phẩm vào kho
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-slate-200 transition-none"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-none"
            onClick={handleSubmit}
          >
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
