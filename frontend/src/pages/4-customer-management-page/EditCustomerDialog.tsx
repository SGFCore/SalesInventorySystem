import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { Customer } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface EditCustomerProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  customer: Customer | null;
  onSave: (updated: Customer) => void;
}

export function EditCustomerDialog({
  open,
  onOpenChange,
  customer,
  onSave,
}: EditCustomerProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Customer>>({});

  useEffect(() => {
    if (customer) setForm(customer);
  }, [customer]);

  const handleSubmit = async () => {
    if (!customer) return;
    if (!form.firstname || !form.lastname) {
      toast.error("Họ và tên không được trống!");
      return;
    }
    setLoading(true);
    try {
      const updatedCustomer = { ...customer, ...form } as Customer;
      await api.customers.update(customer.id, updatedCustomer);
      toast.success("Cập nhật thông tin khách hàng thành công!");
      onSave(updatedCustomer);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Cập nhật khách hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Cập nhật khách hàng
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1">
              <Label>Họ</Label>
              <Input
                value={form.firstname || ""}
                onChange={(e) =>
                  setForm({ ...form, firstname: e.target.value })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>
            <div className="grid gap-1">
              <Label>Tên</Label>
              <Input
                value={form.lastname || ""}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0"
                disabled={loading}
              />
            </div>
          </div>
          <div className="grid gap-1">
            <Label>Công ty</Label>
            <Input
              value={form.companyname || ""}
              onChange={(e) =>
                setForm({ ...form, companyname: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <div className="grid gap-1">
            <Label>Số điện thoại</Label>
            <Input
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="grid gap-1">
            <Label>Địa chỉ</Label>
            <Input
              value={form.address || ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
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
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
