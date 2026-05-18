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
import { Checkbox } from "@/components/ui/checkbox"; // Đảm bảo bạn đã cài đặt shadcn checkbox
import React, { useState } from "react";

import { ROLES } from "@/data/roles";
import type { Employee } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emp: Employee | null;
}

export function EditRoleDialog({ open, onOpenChange, emp }: Props) {
  const [formData, setFormData] = useState({
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
      <DialogContent className={cn("sm:max-w-[425px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật phân quyền
          </DialogTitle>
        </DialogHeader>

        <div className={dialog.body}>
          <div className="grid gap-3">
            <Label className="text-slate-900 font-semibold">
              Quyền <span className="text-red-500">*</span>
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
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
