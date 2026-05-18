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
import { Checkbox } from "@/components/ui/checkbox";
import type { Product } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function EditProductDialog({ open, onOpenChange, product }: EditProps) {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: 0,
    categoryName: "",
    productTypeName: "",
    detail: "",
    allowReturn: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.ProductName,
        productPrice: product.ProductPrice,
        categoryName: product.CategoryName,
        productTypeName: product.ProductTypeName,
        detail: product.Detail,
        allowReturn: product.AllowReturn === 1,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowReturn: checked }));
  };

  const handleSubmit = () => {
    if (!formData.productName.trim() || !formData.categoryName.trim()) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }
    console.log("Dữ liệu cập nhật gửi đi:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="productName">
              Tên sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="productPrice">Giá bán (đ)</Label>
            <Input
              id="productPrice"
              name="productPrice"
              type="number"
              value={formData.productPrice}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categoryName">
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="productTypeName">Loại sản phẩm</Label>
            <Input
              id="productTypeName"
              name="productTypeName"
              value={formData.productTypeName}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="detail">Mô tả ngắn</Label>
            <Input
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="flex items-center space-x-2 border p-3 rounded-md border-slate-100 mt-2">
            <Checkbox
              id="allowReturn"
              checked={formData.allowReturn}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked as boolean)
              }
            />
            <label
              htmlFor="allowReturn"
              className="text-sm font-medium cursor-pointer select-none"
            >
              Cho phép đổi trả sản phẩm
            </label>
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
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
