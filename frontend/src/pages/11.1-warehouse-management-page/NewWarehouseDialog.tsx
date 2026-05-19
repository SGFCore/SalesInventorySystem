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

export function NewWarehouseDialog({ open, onOpenChange, onSave }: Props) {
  const [formData, setFormData] = useState({
    WareHouseName: "",
    Address: "",
    ContactNumber: "",
    ManagerID: "",
    Capacity: "",
    WarehouseType: "1",
    Status: "1",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.WareHouseName.trim() || !formData.Address.trim()) {
      toast.error("Vui lòng điền tên kho hàng và địa chỉ!");
      return;
    }

    setLoading(true);
    try {
      const warehouseId = Math.floor(Math.random() * 900) + 100;
      await api.warehouses.create({
        WareHouseID: warehouseId,
        WareHouseName: formData.WareHouseName,
        Address: formData.Address,
        ContactNumber: formData.ContactNumber || "N/A",
        ManagerID: Number(formData.ManagerID) || 1,
        Capacity: Number(formData.Capacity) || 10000,
        WarehouseType: Number(formData.WarehouseType),
        Status: Number(formData.Status),
      });

      toast.success("Thêm kho hàng mới thành công!");
      // Reset form
      setFormData({
        WareHouseName: "",
        Address: "",
        ContactNumber: "",
        ManagerID: "",
        Capacity: "",
        WarehouseType: "1",
        Status: "1",
      });
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Thêm kho hàng mới thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[480px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm kho hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="WareHouseName" className="font-semibold text-slate-700">Tên kho hàng <span className="text-red-500">*</span></Label>
            <Input
              id="WareHouseName"
              name="WareHouseName"
              value={formData.WareHouseName}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
              placeholder="VD: Kho hàng trung tâm..."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Address" className="font-semibold text-slate-700">Địa chỉ <span className="text-red-500">*</span></Label>
            <Input
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
              placeholder="VD: 100 Đường Láng, Đống Đa, Hà Nội"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ContactNumber" className="font-semibold text-slate-700">Số điện thoại</Label>
              <Input
                id="ContactNumber"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
                placeholder="VD: 0987654321"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ManagerID" className="font-semibold text-slate-700">Mã người quản lý</Label>
              <Input
                id="ManagerID"
                name="ManagerID"
                type="number"
                value={formData.ManagerID}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
                placeholder="VD: 901"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Capacity" className="font-semibold text-slate-700">Sức chứa</Label>
              <Input
                id="Capacity"
                name="Capacity"
                type="number"
                value={formData.Capacity}
                onChange={handleChange}
                className={dialog.input}
                disabled={loading}
                placeholder="VD: 10000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="WarehouseType" className="font-semibold text-slate-700">Loại kho</Label>
              <select
                id="WarehouseType"
                name="WarehouseType"
                value={formData.WarehouseType}
                onChange={handleChange}
                className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
                disabled={loading}
              >
                <option value="1">Kho tổng</option>
                <option value="2">Kho phân phối</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Status" className="font-semibold text-slate-700">Trạng thái</Label>
            <select
              id="Status"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 rounded-md"
              disabled={loading}
            >
              <option value="1">Đang hoạt động</option>
              <option value="0">Tạm dừng</option>
            </select>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-slate-200"
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
            {loading ? "Đang lưu..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
