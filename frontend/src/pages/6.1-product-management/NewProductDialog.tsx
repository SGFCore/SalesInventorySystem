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
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Category, Producttype } from "@/lib/types";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewProductDialog({ open, onOpenChange, onSave }: NewProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<Producttype[]>([]);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: 0,
    categoryId: 0,
    productTypeId: 0,
    detail: "",
    allowReturn: true,
  });

  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        try {
          const cats = await api.categories.list();
          const pts = await api.productTypes.list();
          setCategories(cats);
          setProductTypes(pts);
          // Set default values if list is not empty
          setFormData((prev) => ({
            ...prev,
            categoryId: cats[0]?.id || 0,
            productTypeId: pts[0]?.id || 0,
          }));
        } catch (e) {
          console.error("Lỗi tải danh mục/loại sản phẩm:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["productPrice", "categoryId", "productTypeId"].includes(name) ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowReturn: checked }));
  };

  const handleSubmit = async () => {
    if (!formData.productName.trim()) {
      toast.error("Vui lòng điền tên sản phẩm!");
      return;
    }
    if (!formData.categoryId) {
      toast.error("Vui lòng chọn danh mục!");
      return;
    }
    setLoading(true);
    try {
      const productId = Math.floor(Math.random() * 90000) + 10000;
      await api.products.create({
        ProductID: productId,
        ProductName: formData.productName,
        ProductPrice: formData.productPrice,
        CategoryID: formData.categoryId,
        ProductTypeID: formData.productTypeId,
        Detail: formData.detail,
        AllowReturn: formData.allowReturn ? 1 : 0,
        ProductStatus: 1,
        ImageURL: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      });
      toast.success("Thêm sản phẩm mới thành công!");
      setFormData({
        productName: "",
        productPrice: 0,
        categoryId: categories[0]?.id || 0,
        productTypeId: productTypes[0]?.id || 0,
        detail: "",
        allowReturn: true,
      });
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Thêm sản phẩm thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo mới sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="new-productName">
              Tên sản phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm..."
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-productPrice">Giá bán (đ)</Label>
            <Input
              id="new-productPrice"
              name="productPrice"
              type="number"
              value={formData.productPrice}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-categoryId">
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <select
              id="new-categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={cn(dialog.input, "bg-white border text-sm rounded-md p-2 h-10")}
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-productTypeId">Loại sản phẩm</Label>
            <select
              id="new-productTypeId"
              name="productTypeId"
              value={formData.productTypeId}
              onChange={handleChange}
              className={cn(dialog.input, "bg-white border text-sm rounded-md p-2 h-10")}
              disabled={loading}
            >
              {productTypes.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.producttypename}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-detail">Mô tả sản phẩm</Label>
            <Input
              id="new-detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              placeholder="Mô tả thông số hoặc đặc tính..."
              className={dialog.input}
              disabled={loading}
            />
          </div>

          <div className="flex items-center space-x-2 border p-3 rounded-md border-slate-100 mt-2">
            <Checkbox
              id="new-allowReturn"
              checked={formData.allowReturn}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked as boolean)
              }
              disabled={loading}
            />
            <label
              htmlFor="new-allowReturn"
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
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
