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
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newCustomer: Customer) => void;
}

export function NewCustomerDialog({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async () => {
    if (!formData.FirstName || !formData.LastName) {
      toast.error("Vui lòng điền họ và tên!");
      return;
    }
    setLoading(true);
    try {
      const createdCustomer = await api.customers.create({
        customertypeId: Number(formData.CustomerTypeID) || 1,
        firstname: formData.FirstName,
        lastname: formData.LastName,
        companyname: formData.CompanyName.trim().length ? formData.CompanyName.trim() : null,
        phone: formData.Phone,
        email: formData.Email.trim().length ? formData.Address.trim() : null,
        address: formData.Address.trim().length ? formData.Address.trim() : null,
        createddate: new Date().toISOString(),
        totalaccumulatedspent: 0,
      });
      toast.success("Thêm khách hàng mới thành công!");
      onSave(createdCustomer);

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
    } catch (error: any) {
      toast.error(error.message || "Thêm khách hàng thất bại!");
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button className={btn.primary} onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
