import React, { useState } from "react";
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

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProductDialog({ open, onOpenChange }: NewProps) {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: 0,
    categoryName: "",
    productTypeName: "",
    detail: "",
    allowReturn: true, // Mặc định cho phép đổi trả khi tạo mới
  });

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
      alert("Vui lòng nhập đầy đủ các trường thông tin bắt buộc!");
      return;
    }
    console.log("Dữ liệu sản phẩm tạo mới:", formData);
    // Reset state sau khi lưu thành công
    setFormData({
      productName: "",
      productPrice: 0,
      categoryName: "",
      productTypeName: "",
      detail: "",
      allowReturn: true,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Tạo mới sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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
              className="border-slate-200 focus:ring-blue-600"
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
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-categoryName">
              Danh mục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Ví dụ: Thiết bị điện tử"
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-productTypeName">Loại sản phẩm</Label>
            <Input
              id="new-productTypeName"
              name="productTypeName"
              value={formData.productTypeName}
              onChange={handleChange}
              placeholder="Ví dụ: Hàng cao cấp"
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-detail">Mô tả sản phẩm</Label>
            <Input
              id="new-detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              placeholder="Mô tả thông số hoặc đặc tính..."
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center space-x-2 border p-3 rounded-md border-slate-100 mt-2">
            <Checkbox
              id="new-allowReturn"
              checked={formData.allowReturn}
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked as boolean)
              }
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
