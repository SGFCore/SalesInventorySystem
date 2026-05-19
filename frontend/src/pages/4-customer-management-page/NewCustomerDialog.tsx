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
import type { Customer } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newCustomer: Customer) => void;
}

export function NewCustomerDialog({ open, onOpenChange, onSave }: Props) {
  const [formData, setFormData] = useState({
    CustomerTypeID: "1",
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
    if (!formData.FirstName || !formData.LastName) {
      alert("Vui lòng điền họ và tên!");
      return;
    }

    const newCustomer: Customer = {
      CustomerID: Math.floor(Math.random() * 8000) + 3000, // Mock ID ngẫu nhiên
      CustomerTypeID: Number(formData.CustomerTypeID) || 1,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      CompanyName: formData.CompanyName,
      Phone: formData.Phone,
      Email: formData.Email,
      Address: formData.Address,
      CreatedDate: new Date(),
      TotalAccumulatedSpent: 0, // Mới tạo chi tiêu bằng 0
    };

    onSave(newCustomer);
    // Reset form
    setFormData({
      CustomerTypeID: "1",
      FirstName: "",
      LastName: "",
      CompanyName: "",
      Phone: "",
      Email: "",
      Address: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Thêm khách hàng mới
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="FirstName">Họ</Label>
              <Input
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                className={dialog.input}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="LastName">Tên</Label>
              <Input
                id="LastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                className={dialog.input}
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
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="CompanyName">Tên công ty</Label>
            <Input
              id="CompanyName"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Phone">Số điện thoại</Label>
            <Input
              id="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="Address">Địa chỉ</Label>
            <Input
              id="Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button className={btn.primary} onClick={handleSubmit}>
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
