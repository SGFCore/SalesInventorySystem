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

export function NewCustomerDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({
    CustomerTypeID: "",
    FirstName: "",
    LastName: "",
    CompanyName: "",
    Phone: "",
    Email: "",
    Address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Dữ liệu gửi đi:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Thêm khách hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="FirstName">Họ</Label>
              <Input
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                className="border-slate-200 focus:ring-blue-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="LastName">Tên</Label>
              <Input
                id="LastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                className="border-slate-200 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="CustomerTypeID">Loại khách hàng (ID)</Label>
            <Input
              id="CustomerTypeID"
              name="CustomerTypeID"
              value={formData.CustomerTypeID}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="CompanyName">Tên công ty</Label>
            <Input
              id="CompanyName"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Phone">Số điện thoại</Label>
            <Input
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Address">Địa chỉ</Label>
            <Input
              id="Address"
              name="Address"
              value={formData.Address}
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
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
