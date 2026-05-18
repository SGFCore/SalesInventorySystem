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
import type { CustomerType } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerType: CustomerType | null;
}

export function EditCustomerTypeDialog({
  open,
  onOpenChange,
  customerType,
}: Props) {
  const [form, setForm] = useState<Partial<CustomerType>>({});

  // Cập nhật lại dữ liệu form mỗi khi đối tượng khách hàng truyền vào thay đổi
  useEffect(() => {
    if (customerType) {
      setForm(customerType);
    }
  }, [customerType]);

  const handleSubmit = () => {
    console.log("Dữ liệu cập nhật nhóm khách hàng gửi đi:", form);
    // Xử lý logic API lưu thay đổi ở đây nếu có
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Cập nhật thông tin nhóm
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {/* Tên nhóm khách hàng */}
          <div className="grid gap-1">
            <Label htmlFor="edit-typeName">Tên nhóm khách hàng</Label>
            <Input
              id="edit-typeName"
              value={form.CustomerTypeName || ""}
              onChange={(e) =>
                setForm({ ...form, CustomerTypeName: e.target.value })
              }
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
            />
          </div>

          {/* Layout grid 2 cột cho các thuộc tính số liệu */}
          <div className="grid grid-cols-2 gap-4">
            {/* Chiết khấu - Đã được mở khóa cho phép sửa đổi */}
            <div className="grid gap-1">
              <Label htmlFor="edit-discount">Chiết khấu (%)</Label>
              <Input
                id="edit-discount"
                type="number"
                value={form.Discount ?? ""}
                onChange={(e) =>
                  setForm({ ...form, Discount: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
              />
            </div>

            {/* Hạn mức chi tiêu yêu cầu */}
            <div className="grid gap-1">
              <Label htmlFor="edit-limit">Hạn mức chi tiêu (VNĐ)</Label>
              <Input
                id="edit-limit"
                type="number"
                value={form.SpendingLimit ?? ""}
                onChange={(e) =>
                  setForm({ ...form, SpendingLimit: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
              />
            </div>
          </div>

          {/* Mô tả quyền lợi chi tiết */}
          <div className="grid gap-1">
            <Label htmlFor="edit-detail">Mô tả quyền lợi</Label>
            <Input
              id="edit-detail"
              value={form.Detail || ""}
              onChange={(e) => setForm({ ...form, Detail: e.target.value })}
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-slate-200"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
          >
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
