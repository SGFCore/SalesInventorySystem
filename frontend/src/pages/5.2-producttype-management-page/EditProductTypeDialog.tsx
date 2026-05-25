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
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import type { Producttype, Category } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: Producttype | null;
  onSave: () => void;
}

export function EditProductTypeDialog({
  open,
  onOpenChange,
  productType,
  onSave,
}: EditProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    ProductTypeName: "",
    CategoryId: 0,
  });

  useEffect(() => {
    if (open) {
      api.categories
        .list()
        .then((data) => setCategories(data))
        .catch(() => toast.error("Không thể tải danh sách danh mục!"));
    }
  }, [open]);

  useEffect(() => {
    if (productType) {
      setFormData({
        ProductTypeName: productType.producttypename,
        CategoryId: productType.categoryid || 0,
      });
    }
  }, [productType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "CategoryId" ? Number(value) : value }));
  };

  const handleSubmit = async () => {
    if (!productType) return;
    if (!formData.ProductTypeName.trim()) {
      toast.error("Vui lòng nhập tên loại sản phẩm!");
      return;
    }
    if (!formData.CategoryId) {
      toast.error("Vui lòng chọn danh mục!");
      return;
    }
    setLoading(true);
    try {
      await api.productTypes.update(productType.id, {
        id: productType.id,
        producttypename: formData.ProductTypeName,
        categoryid: formData.CategoryId,
      });
      toast.success("Cập nhật loại sản phẩm thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật loại sản phẩm thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật loại sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="ProductTypeName">Tên loại sản phẩm</Label>
            <Input
              id="ProductTypeName"
              name="ProductTypeName"
              value={formData.ProductTypeName}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="CategoryId">Danh mục</Label>
            <select
              id="CategoryId"
              name="CategoryId"
              value={formData.CategoryId}
              onChange={handleChange}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                dialog.input
              )}
              disabled={loading}
            >
              <option value={0} disabled>
                Chọn danh mục...
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className={dialog.cancel}
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
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
