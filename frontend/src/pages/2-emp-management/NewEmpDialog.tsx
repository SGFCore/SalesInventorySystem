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
import { Checkbox } from "@/components/ui/checkbox"; // Đảm bảo bạn đã cài đặt shadcn checkbox
import React, { useState } from "react";

import { ROLES } from "@/data/roles";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewEmpDialog({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "12345",
    roleIds: [] as number[], // Lưu danh sách các ID role đã chọn
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

  const handleSubmit = () => {
    if (formData.roleIds.length === 0) {
      alert("Vui lòng chọn ít nhất một quyền!");
      return;
    }
    console.log("Dữ liệu gửi đi:", formData);
    // Thực hiện logic lưu ở đây
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Cập nhật nhân viên
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* ... Các trường Input cũ giữ nguyên ... */}
          <div className="grid gap-2">
            <Label htmlFor="fullname">Họ và tên</Label>
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-slate-200 focus:ring-blue-600"
            />
          </div>

          {/* Phần danh sách vai trò */}
          <div className="grid gap-3">
            <Label className="text-slate-900 font-semibold">
              Phân quyền <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-4 border p-3 rounded-md border-slate-100">
              {ROLES.map((role) => (
                <div key={role.RoleID} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role.RoleID}`}
                    checked={formData.roleIds.includes(role.RoleID)}
                    onCheckedChange={(checked) =>
                      handleRoleChange(role.RoleID, checked as boolean)
                    }
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
