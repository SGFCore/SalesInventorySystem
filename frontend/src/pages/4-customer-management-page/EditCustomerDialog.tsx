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

export function EditCustomerDialog({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  customer: Customer | null;
}) {
  const [form, setForm] = useState<Partial<Customer>>({});

  useEffect(() => {
    if (customer) setForm(customer);
  }, [customer]);

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
                value={form.FirstName || ""}
                onChange={(e) =>
                  setForm({ ...form, FirstName: e.target.value })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0"
              />
            </div>
            <div className="grid gap-1">
              <Label>Tên</Label>
              <Input
                value={form.LastName || ""}
                onChange={(e) => setForm({ ...form, LastName: e.target.value })}
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="grid gap-1">
            <Label>Công ty</Label>
            <Input
              value={form.CompanyName || ""}
              onChange={(e) =>
                setForm({ ...form, CompanyName: e.target.value })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label>Số điện thoại</Label>
            <Input
              value={form.Phone || ""}
              onChange={(e) => setForm({ ...form, Phone: e.target.value })}
            />
          </div>
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              value={form.Email || ""}
              onChange={(e) => setForm({ ...form, Email: e.target.value })}
            />
          </div>
          <div className="grid gap-1">
            <Label>Địa chỉ</Label>
            <Input
              value={form.Address || ""}
              onChange={(e) => setForm({ ...form, Address: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className={dialog.cancel} onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button className={btn.primary}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
