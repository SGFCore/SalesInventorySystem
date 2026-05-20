import React, { useState, useEffect } from "react";
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
import type { Employee } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
  onSave: () => void;
}

export function EditEmpDialog({
  open,
  onOpenChange,
  employee,
  onSave,
}: EditProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        fullname: employee.Fullname,
        email: employee.Email,
        phone: employee.Phone,
        password: "",
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!employee) return;
    if (!formData.fullname.trim()) {
      toast.error("Họ và tên không được để trống!");
      return;
    }
    setLoading(true);
    try {
      await api.employees.update(employee.EmployeeID, {
        ...employee,
        Fullname: formData.fullname,
        Email: formData.email,
        Phone: formData.phone,
        password: formData.password || employee.password,
      });
      toast.success("Cập nhật thông tin nhân viên thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>Cập nhật nhân viên</DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="fullname">Họ và tên</Label>
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus:border-blue-600"
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={dialog.input}
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Để trống nếu giữ nguyên"
              value={formData.password}
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
