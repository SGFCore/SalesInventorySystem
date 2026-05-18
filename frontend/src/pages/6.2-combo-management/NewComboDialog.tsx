import React, { useState } from "react";
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
import { Trash2, Plus } from "lucide-react";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ProductItem {
  productID: number;
  quantity: number;
}

// Mockup dữ liệu danh sách sản phẩm để chọn trong dropdown
const MOCK_PRODUCTS_LIST = [
  { ProductID: 201, ProductName: "Sản phẩm mẫu 1" },
  { ProductID: 202, ProductName: "Sản phẩm mẫu 2" },
  { ProductID: 203, ProductName: "Sản phẩm mẫu 3" },
  { ProductID: 204, ProductName: "Sản phẩm mẫu 4" },
  { ProductID: 205, ProductName: "Sản phẩm mẫu 5" },
];

export function NewComboDialog({ open, onOpenChange }: NewProps) {
  const [comboPrice, setComboPrice] = useState<number>(0);

  // Khởi tạo danh sách sản phẩm luôn có ít nhất 1 dòng mặc định
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([
    { productID: MOCK_PRODUCTS_LIST[0].ProductID, quantity: 1 },
  ]);

  // Thêm dòng sản phẩm mới
  const handleAddProduct = () => {
    setSelectedProducts((prev) => [
      ...prev,
      { productID: MOCK_PRODUCTS_LIST[0].ProductID, quantity: 1 },
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
  const handleSubmit = () => {
    if (comboPrice <= 0) {
      alert("Vui lòng nhập giá bán combo hợp lệ!");
      return;
    }

    // Kiểm tra tính hợp lệ của số lượng
    const hasInvalidQuantity = selectedProducts.some((p) => p.quantity <= 0);
    if (hasInvalidQuantity) {
      alert("Số lượng của từng sản phẩm phải lớn hơn hoặc bằng 1!");
      return;
    }

    const finalData = {
      comboPrice,
      products: selectedProducts,
    };

    console.log("Dữ liệu tạo combo mới gửi đi:", finalData);

    // Reset toàn bộ state về trạng thái mặc định ban đầu
    setComboPrice(0);
    setSelectedProducts([
      { productID: MOCK_PRODUCTS_LIST[0].ProductID, quantity: 1 },
    ]);
    onOpenChange(false);
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
                    >
                      {MOCK_PRODUCTS_LIST.map((prod) => (
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
                    />
                  </div>

                  {/* Nút xóa dòng sản phẩm (bị disabled nếu chỉ còn 1 dòng) */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedProducts.length === 1}
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
              className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-4 w-full flex items-center justify-center gap-1"
            >
              <Plus className="h-4 w-4" /> Thêm sản phẩm
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)}>
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
