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
import type { Product, Category, ProductType } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: () => void;
}

export function EditProductDialog({ open, onOpenChange, product, onSave }: EditProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: 0,
    categoryName: "",
    productTypeName: "",
    detail: "",
    allowReturn: false,
  });

  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        try {
          const cats = await api.categories.list();
          const pts = await api.productTypes.list();
          setCategories(cats);
          setProductTypes(pts);
        } catch (e) {
          console.error("Lỗi tải danh mục/loại sản phẩm:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowReturn: checked }));
  };

  const handleSubmit = async () => {
    if (!product) return;
    if (!formData.productName.trim()) {
      toast.error("Vui lòng điền tên sản phẩm!");
      return;
    }
    setLoading(true);
    try {
      await api.products.update(product.ProductID, {
        ...product,
        ProductName: formData.productName,
        ProductPrice: formData.productPrice,
        CategoryName: formData.categoryName,
        ProductTypeName: formData.productTypeName,
        Detail: formData.detail,
        AllowReturn: formData.allowReturn ? 1 : 0,
      });
      toast.success("Cập nhật sản phẩm thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật sản phẩm thất bại!");
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categoryName">
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <select
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className={cn(dialog.input, "bg-white border text-sm rounded-md p-2 h-10")}
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat.CategoryID} value={cat.CategoryName}>
                  {cat.CategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="productTypeName">Loại sản phẩm</Label>
            <select
              id="productTypeName"
              name="productTypeName"
              value={formData.productTypeName}
              onChange={handleChange}
              className={cn(dialog.input, "bg-white border text-sm rounded-md p-2 h-10")}
              disabled={loading}
            >
              {productTypes.map((pt) => (
                <option key={pt.ProductTypeID} value={pt.ProductTypeName}>
                  {pt.ProductTypeName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="detail">Mô tả ngắn</Label>
            <Input
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="flex items-center space-x-2 border p-3 rounded-md border-slate-100 mt-2">
            <Checkbox
              id="allowReturn"
              checked={formData.allowReturn}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked as boolean)
              }
              disabled={loading}
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
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)} disabled={loading}>
            Hủy
          </Button>
          <Button
            className={btn.primary}
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
