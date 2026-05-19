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
import type { Category } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cat: Category | null;
  onSave: () => void;
}

export function EditCatDialog({ open, onOpenChange, cat, onSave }: EditProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CategoryName: "",
  });

  useEffect(() => {
    if (cat) {
      setFormData({
        CategoryName: cat.CategoryName,
      });
    }
  }, [cat]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!cat) return;
    if (!formData.CategoryName.trim()) {
      toast.error("Vui lòng nhập tên danh mục!");
      return;
    }
    setLoading(true);
    try {
      await api.categories.update(cat.CategoryID, {
        CategoryID: cat.CategoryID,
        CategoryName: formData.CategoryName,
      });
      toast.success("Cập nhật danh mục thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật danh mục thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật danh mục
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="CategoryName">Tên danh mục</Label>
            <Input
              id="CategoryName"
              name="CategoryName"
              value={formData.CategoryName}
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
