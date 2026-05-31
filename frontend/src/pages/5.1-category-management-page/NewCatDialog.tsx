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
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewCatDialog({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CategoryName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.CategoryName.trim()) {
      toast.error("Vui lòng điền tên danh mục!");
      return;
    }
    setLoading(true);
    try {
      await api.categories.create({
        categoryname: formData.CategoryName,
      });
      toast.success("Thêm danh mục mới thành công!");
      setFormData({ CategoryName: "" });
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Thêm danh mục thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm danh mục mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="newCategoryName">
              Tên danh mục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="newCategoryName"
              name="CategoryName"
              value={formData.CategoryName}
              onChange={handleChange}
              className={dialog.input}
              placeholder="Nhập tên danh mục..."
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
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
