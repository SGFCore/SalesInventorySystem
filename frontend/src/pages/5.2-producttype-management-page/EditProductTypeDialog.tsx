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
import type { ProductType } from "./ProductTypeManagementPage";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: ProductType | null;
}

export function EditProductTypeDialog({
  open,
  onOpenChange,
  productType,
}: EditProps) {
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

  const handleSubmit = () => {
    console.log("Cập nhật loại sản phẩm:", formData);
    // Thực hiện logic API cập nhật ở đây
    onOpenChange(false);
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
            />
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
