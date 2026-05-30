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
import { api } from "@/lib/api";
import { toast } from "sonner";

export function EditEmpDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { emp, hasRole } = useEmp();
  const [loading, setLoading] = useState(false);
  const isManager = hasRole(1);

  const [formData, setFormData] = useState({
    email: emp?.Email || "",
    phone: emp?.Phone || "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!emp) return;
    
    // Chỉ yêu cầu mật khẩu nếu là Quản lý muốn đổi mật khẩu hoặc xác nhận
    if (isManager && !formData.oldPassword) {
      toast.error("Vui lòng nhập mật khẩu hiện tại để xác nhận!");
      return;
    }

    setLoading(true);
    try {
      const updateData: any = {
        ...emp,
        Email: formData.email,
        Phone: formData.phone,
      };

      // Chỉ gửi password mới nếu là Quản lý và có nhập mật khẩu mới
      if (isManager && formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      await api.employees.update(emp.EmployeeID, updateData);
      toast.success("Cập nhật hồ sơ thành công!");
      onOpenChange(false);
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

          {isManager && (
            <>
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
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            type="button"
            className={dialog.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Cập nhật thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
