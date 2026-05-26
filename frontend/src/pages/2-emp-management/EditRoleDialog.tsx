import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";
import { ROLES } from "@/data/roles";
import type { Employee } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emp: Employee | null;
  onSave: () => void;
}

export function EditRoleDialog({ open, onOpenChange, emp, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roleIds: [] as number[],
  });

  useEffect(() => {
    if (open && emp) {
      const fetchRoles = async () => {
        setLoading(true);
        try {
          const list = await api.employeeRoles.list();
          const empRoles = list
            .filter((r) => r.employeeId === emp.EmployeeID)
            .map((r) => r.roleId);
          setFormData({ roleIds: empRoles });
        } catch (error) {
          toast.error("Không thể tải quyền của nhân viên!");
        } finally {
          setLoading(false);
        }
      };
      fetchRoles();
    }
  }, [open, emp]);

  const handleRoleChange = (roleId: number, checked: boolean) => {
    setFormData((prev) => {
      const newRoleIds = checked
        ? [...prev.roleIds, roleId]
        : prev.roleIds.filter((id) => id !== roleId);
      return { ...prev, roleIds: newRoleIds };
    });
  };

  const handleSubmit = async () => {
    if (!emp) return;
    if (formData.roleIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một quyền!");
      return;
    }
    setLoading(true);
    try {
      const currentList = await api.employeeRoles.list();
      const currentRoles = currentList
        .filter((r) => r.employeeId === emp.EmployeeID)
        .map((r) => r.roleId);

      // Thêm các quyền mới
      const toAdd = formData.roleIds.filter((id) => !currentRoles.includes(id));
      for (const roleId of toAdd) {
        await api.employeeRoles.create({
          employeeId: emp.EmployeeID,
          roleId: roleId,
        });
      }

      // Xóa các quyền cũ không còn chọn
      const toDelete = currentRoles.filter((id) => !formData.roleIds.includes(id));
      for (const roleId of toDelete) {
        try {
          await api.employeeRoles.delete(emp.EmployeeID, roleId);
        } catch (e) {
          console.warn("Không thể xóa quyền cũ:", roleId, e);
        }
      }

      toast.success("Cập nhật phân quyền thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật phân quyền thất bại!");
    } finally {
      setLoading(false);
    }
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
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)} disabled={loading}>
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
