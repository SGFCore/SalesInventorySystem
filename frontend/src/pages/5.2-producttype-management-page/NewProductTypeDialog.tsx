import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import React, { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProductTypeDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({
    ProductTypeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Dữ liệu tạo mới loại sản phẩm:", formData);
    // Thực hiện logic API thêm mới ở đây
    setFormData({ ProductTypeName: "" }); // Reset form đúng chuẩn code mẫu
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm loại sản phẩm mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="newProductTypeName">Tên loại sản phẩm</Label>
            <Input
              id="newProductTypeName"
              name="ProductTypeName"
              value={formData.ProductTypeName}
              onChange={handleChange}
              className={dialog.input}
              placeholder="Nhập tên loại sản phẩm..."
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
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
