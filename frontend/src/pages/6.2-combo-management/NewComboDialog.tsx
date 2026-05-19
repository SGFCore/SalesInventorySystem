import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
import { NativeSelect } from "@/components/ui/native-select";
import { btn, dialog } from "@/pages/page-classes";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Product } from "@/lib/types";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface ProductItem {
  productID: number;
  quantity: number;
}

export function NewComboDialog({ open, onOpenChange, onSave }: NewProps) {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [comboPrice, setComboPrice] = useState<number>(0);

  // Khởi tạo danh sách sản phẩm luôn có ít nhất 1 dòng mặc định
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (open) {
      const loadProducts = async () => {
        try {
          const list = await api.products.list();
          setProductList(list);
          if (list.length > 0) {
            setSelectedProducts([{ productID: list[0].ProductID, quantity: 1 }]);
          }
        } catch (e) {
          console.error("Lỗi tải danh sách sản phẩm:", e);
        }
      };
      loadProducts();
    }
  }, [open]);

  // Thêm dòng sản phẩm mới
  const handleAddProduct = () => {
    if (productList.length === 0) return;
    setSelectedProducts((prev) => [
      ...prev,
      { productID: productList[0].ProductID, quantity: 1 },
    ]);
  };

  // Xóa dòng sản phẩm (Giữ lại tối thiểu 1 dòng)
  const handleRemoveProduct = (index: number) => {
    if (selectedProducts.length === 1) return;
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Cập nhật giá trị Dropdown hoặc Input Số lượng của từng sản phẩm
  const handleProductChange = (
    index: number,
    field: "productID" | "quantity",
    value: number,
  ) => {
    setSelectedProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  // Submit form dữ liệu
  const handleSubmit = async () => {
    if (comboPrice <= 0) {
      toast.error("Vui lòng nhập giá bán combo hợp lệ!");
      return;
    }

    // Kiểm tra tính hợp lệ của số lượng
    const hasInvalidQuantity = selectedProducts.some((p) => p.quantity <= 0);
    if (hasInvalidQuantity) {
      toast.error("Số lượng của từng sản phẩm phải lớn hơn hoặc bằng 1!");
      return;
    }

    setLoading(true);
    try {
      const comboId = Math.floor(Math.random() * 9000) + 1000;
      // 1. Tạo combo
      await api.combos.create({
        ComboID: comboId,
        ComboPrice: comboPrice,
      });

      // 2. Tạo chi tiết combo
      await Promise.all(
        selectedProducts.map((p) =>
          api.comboDetails.create({
            ComboID: comboId,
            ProductID: p.productID,
            Quantity: p.quantity,
          }),
        ),
      );

      toast.success("Tạo mới combo và chi tiết combo thành công!");
      // Reset
      setComboPrice(0);
      if (productList.length > 0) {
        setSelectedProducts([{ productID: productList[0].ProductID, quantity: 1 }]);
      } else {
        setSelectedProducts([]);
      }
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Tạo mới combo thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo mới gói combo
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          {/* Nhập Giá bán combo */}
          <div className="grid gap-2">
            <Label htmlFor="comboPrice">
              Giá bán Combo (đ) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="comboPrice"
              type="number"
              value={comboPrice}
              onChange={(e) => setComboPrice(Number(e.target.value))}
              placeholder="Nhập tổng giá gói..."
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="border-t border-slate-100 pt-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-slate-900 font-bold">
                Danh sách sản phẩm thuộc Combo{" "}
                <span className="text-red-500">*</span>
              </Label>
            </div>

            {/* Danh sách các dòng sản phẩm động */}
            <div className="grid gap-3">
              {selectedProducts.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Dropdown chọn sản phẩm */}
                  <div className="flex-1">
                    <NativeSelect
                      value={item.productID}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "productID",
                          Number(e.target.value),
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 w-full"
                      disabled={loading}
                    >
                      {productList.map((prod) => (
                        <option key={prod.ProductID} value={prod.ProductID}>
                          {prod.ProductName} (#{prod.ProductID})
                        </option>
                      ))}
                    </NativeSelect>
                  </div>

                  {/* Input nhập số lượng */}
                  <div className="w-20">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "quantity",
                          Number(e.target.value),
                        )
                      }
                      placeholder="SL"
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9"
                      disabled={loading}
                    />
                  </div>

                  {/* Nút xóa dòng sản phẩm (bị disabled nếu chỉ còn 1 dòng) */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedProducts.length === 1 || loading}
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500 hover:bg-red-50 border-slate-200 h-9 w-9 p-0 flex items-center justify-center disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Nút thêm sản phẩm mới vào danh sách */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddProduct}
              disabled={loading || productList.length === 0}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-4 w-full flex items-center justify-center gap-1"
            >
              <Plus className="h-4 w-4" /> Thêm sản phẩm
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)} disabled={loading}>
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
