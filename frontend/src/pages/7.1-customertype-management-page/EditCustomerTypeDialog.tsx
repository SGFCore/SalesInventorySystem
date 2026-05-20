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
import { btn, dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Customertype } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerType: Customertype | null;
  onSave: () => void;
}

export function EditCustomerTypeDialog({
  open,
  onOpenChange,
  customerType,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Customertype>>({});

  // Cập nhật lại dữ liệu form mỗi khi đối tượng khách hàng truyền vào thay đổi
  useEffect(() => {
    if (customerType) {
      setForm(customerType);
    }
  }, [customerType]);

  const handleSubmit = async () => {
    if (!customerType) return;
    if (!form.customertypename?.trim()) {
      toast.error("Vui lòng nhập tên nhóm khách hàng!");
      return;
    }
    setLoading(true);
    try {
      await api.customerTypes.update(customerType.id, {
        ...customerType,
        CustomerTypeName: form.customertypename,
        Discount: form.discount || 0,
        SpendingLimit: form.spendinglimit || 0,
        Detail: form.detail || "",
      });
      toast.success("Cập nhật nhóm khách hàng thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
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
              value={form.customertypename || ""}
              onChange={(e) =>
                setForm({ ...form, customertypename: e.target.value })
              }
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
              disabled={loading}
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
                value={form.discount ?? ""}
                onChange={(e) =>
                  setForm({ ...form, discount: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
                disabled={loading}
              />
            </div>

            {/* Hạn mức chi tiêu yêu cầu */}
            <div className="grid gap-1">
              <Label htmlFor="edit-limit">Hạn mức chi tiêu (VNĐ)</Label>
              <Input
                id="edit-limit"
                type="number"
                value={form.spendinglimit ?? ""}
                onChange={(e) =>
                  setForm({ ...form, spendinglimit: Number(e.target.value) })
                }
                className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
                disabled={loading}
              />
            </div>
          </div>

          {/* Mô tả quyền lợi chi tiết */}
          <div className="grid gap-1">
            <Label htmlFor="edit-detail">Mô tả quyền lợi</Label>
            <Input
              id="edit-detail"
              value={form.detail || ""}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
              className="focus-visible:ring-blue-600 focus-visible:ring-offset-0 border-slate-200"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="border-slate-200"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
