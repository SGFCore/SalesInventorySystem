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
import React, { useEffect, useState } from "react";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cat: Category | null;
}

export function EditCatDialog({ open, onOpenChange, cat }: EditProps) {
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

  const handleSubmit = () => {
    console.log("Cập nhật danh mục:", formData);
    // Thực hiện logic API cập nhật ở đây
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Cập nhật danh mục
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="CategoryName">Tên danh mục</Label>
            <Input
              id="CategoryName"
              name="CategoryName"
              value={formData.CategoryName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
