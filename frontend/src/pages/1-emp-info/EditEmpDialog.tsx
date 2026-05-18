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
import { useEmp } from "@/context/empContext";
import React, { useState } from "react";

export function EditEmpDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { emp } = useEmp();

  // Giả lập dữ liệu ban đầu từ ID
  const [formData, setFormData] = useState({
    email: emp.Email,
    phone: emp.Phone,
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Chỉnh sửa hồ sơ
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="focus-visible:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone" className="text-slate-700 font-medium">
              Số điện thoại
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="focus-visible:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword" className="text-slate-700 font-medium">
              Mật khẩu mới
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="newPassword"
              placeholder="Để trống nếu không đổi"
              value={formData.newPassword}
              onChange={handleChange}
              className="focus-visible:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword" className="text-slate-700 font-medium">
              Mật khẩu
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="oldPassword"
              placeholder="Nhập mật khẩu (cũ) để xác nhận"
              value={formData.oldPassword}
              onChange={handleChange}
              className="focus-visible:ring-blue-600"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Cập nhật thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
