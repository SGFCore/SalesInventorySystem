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
import type { ProductType } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: ProductType | null;
  onSave: () => void;
}

export function EditProductTypeDialog({
  open,
  onOpenChange,
  productType,
  onSave,
}: EditProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ProductTypeName: "",
  });

  useEffect(() => {
    if (productType) {
      setFormData({
        ProductTypeName: productType.ProductTypeName,
      });
    }
  }, [productType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!productType) return;
    if (!formData.ProductTypeName.trim()) {
      toast.error("Vui lòng nhập tên loại sản phẩm!");
      return;
    }
    setLoading(true);
    try {
      await api.productTypes.update(productType.ProductTypeID, {
        ProductTypeID: productType.ProductTypeID,
        ProductTypeName: formData.ProductTypeName,
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
