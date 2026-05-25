import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLES } from "@/data/roles";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { dialog } from "@/pages/page-classes";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewEmpDialog({ open, onOpenChange, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "12345",
    roleIds: [] as number[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (roleId: number, checked: boolean) => {
    setFormData((prev) => {
      const newRoleIds = checked
        ? [...prev.roleIds, roleId]
        : prev.roleIds.filter((id) => id !== roleId);
      return { ...prev, roleIds: newRoleIds };
    });
  };

  const handleSubmit = async () => {
    if (!formData.fullname.trim()) {
      toast.error("Họ và tên không được để trống!");
      return;
    }
    if (formData.roleIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một quyền!");
      return;
    }
    setLoading(true);
    try {
      const newEmp = await api.employees.create({
        Fullname: formData.fullname,
        Email: formData.email,
        Phone: formData.phone,
        password: formData.password,
        Status: 1,
      });

      // Tạo employee roles
      for (const roleId of formData.roleIds) {
        await api.employeeRoles.create({
          employeeId: newEmp.EmployeeID,
          roleId: roleId,
        });
      }

      toast.success("Thêm nhân viên mới thành công!");
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        password: "12345",
        roleIds: [],
      });
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Không thể thêm nhân viên mới!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>Thêm nhân viên mới</DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-2">
            <Label htmlFor="fullname">Họ và tên</Label>
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={dialog.input}
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

          <div className="grid gap-3">
            <Label className="text-slate-900 font-semibold">
              Phân quyền <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3 rounded-md border border-slate-200 bg-slate-50/50 p-3">
              {ROLES.map((role) => (
                <div key={role.RoleID} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role.RoleID}`}
                    checked={formData.roleIds.includes(role.RoleID)}
                    onCheckedChange={(checked) =>
                      handleRoleChange(role.RoleID, checked as boolean)
                    }
                    disabled={loading}
                  />
                  <label
                    htmlFor={`role-${role.RoleID}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {role.RoleName}
                  </label>
                </div>
              ))}
            </div>
            {formData.roleIds.length === 0 && (
              <p className="text-xs text-red-500 italic">
                Cần chọn ít nhất 1 quyền
              </p>
            )}
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
            className={dialog.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
