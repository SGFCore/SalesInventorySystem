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
import React, { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewWarehouseDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({
    WareHouseName: "",
    Address: "",
    ContactNumber: "",
    ManagerID: "",
    Capacity: "",
    WarehouseType: "1",
    Status: "1",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      WareHouseName: formData.WareHouseName,
      Address: formData.Address,
      ContactNumber: formData.ContactNumber,
      ManagerID: Number(formData.ManagerID),
      Capacity: Number(formData.Capacity),
      WarehouseType: Number(formData.WarehouseType),
      Status: Number(formData.Status),
    };
    console.log("Dữ liệu kho hàng mới gửi đi:", payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white border border-slate-200 max-h-[90vh] overflow-y-auto rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Thêm kho hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="WareHouseName">Tên kho hàng</Label>
            <Input
              id="WareHouseName"
              name="WareHouseName"
              value={formData.WareHouseName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600 rounded-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Address">Địa chỉ</Label>
            <Input
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600 rounded-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ContactNumber">Số điện thoại</Label>
              <Input
                id="ContactNumber"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleChange}
                className="border-slate-200 focus:ring-blue-600 rounded-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ManagerID">Mã người quản lý</Label>
              <Input
                id="ManagerID"
                name="ManagerID"
                type="number"
                value={formData.ManagerID}
                onChange={handleChange}
                className="border-slate-200 focus:ring-blue-600 rounded-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="Capacity">Sức chứa</Label>
              <Input
                id="Capacity"
                name="Capacity"
                type="number"
                value={formData.Capacity}
                onChange={handleChange}
                className="border-slate-200 focus:ring-blue-600 rounded-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="WarehouseType">Loại kho</Label>
              <select
                id="WarehouseType"
                name="WarehouseType"
                value={formData.WarehouseType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="1">Kho tổng</option>
                <option value="2">Kho phân phối</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Status">Trạng thái</Label>
            <select
              id="Status"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="flex h-10 w-full rounded-none border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="1">Đang hoạt động</option>
              <option value="0">Tạm dừng</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-none border-slate-200"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
