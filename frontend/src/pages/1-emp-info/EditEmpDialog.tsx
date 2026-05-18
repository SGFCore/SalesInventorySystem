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
import { cn } from "@/lib/utils";
import { dialog } from "@/pages/page-classes";
import React, { useState } from "react";

export function EditEmpDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { emp } = useEmp();

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
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>Chỉnh sửa hồ sơ</DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="email" className={dialog.label}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone" className={dialog.label}>
              Số điện thoại
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword" className={dialog.label}>
              Mật khẩu mới
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Để trống nếu không đổi"
              value={formData.newPassword}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="oldPassword" className={dialog.label}>
              Mật khẩu hiện tại
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Nhập mật khẩu để xác nhận"
              value={formData.oldPassword}
              onChange={handleChange}
              className={dialog.input}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button type="button" className={dialog.submit}>
            Cập nhật thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
