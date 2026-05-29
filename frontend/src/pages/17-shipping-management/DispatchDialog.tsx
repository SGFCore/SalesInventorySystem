import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { api } from "@/lib/api";
import type { Order, Shipcompany } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  onSave: () => void;
}

export function DispatchDialog({ open, onOpenChange, order, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Shipcompany[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  useEffect(() => {
    if (open) {
      loadCompanies();
      setSelectedCompanyId("");
    }
  }, [open]);

  const loadCompanies = async () => {
    try {
      const data = await api.shipCompanies.list();
      // Lọc các ĐVVC đang hoạt động (Status = 1)
      const activeCompanies = data.filter((c) => c.Status === 1);
      setCompanies(activeCompanies);
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách đơn vị vận chuyển");
    }
  };

  const handleSave = async () => {
    if (!order) return;
    if (!selectedCompanyId) {
      toast.error("Vui lòng chọn đơn vị vận chuyển");
      return;
    }

    setLoading(true);
    try {
      await api.shipping.assignShip(order.id, Number(selectedCompanyId));
      toast.success("Đẩy đơn vận chuyển thành công!");
      onSave();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi đẩy đơn vận chuyển");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[400px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Điều phối giao vận ĐH #{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold text-slate-500">
              Chọn Đơn vị vận chuyển (ĐVVC) <span className="text-red-500">*</span>
            </Label>
            <NativeSelect
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
            >
              <option value="" disabled>-- Chọn ĐVVC --</option>
              {companies.map((c) => (
                <option key={c.ShipCompanyID} value={c.ShipCompanyID}>
                  {c.ShipCompanyName}
                </option>
              ))}
            </NativeSelect>
            <p className="text-[10px] text-slate-400 mt-1">
              Hệ thống sẽ tự động gửi thông tin và nhận mã vận đơn từ đối tác.
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className={btn.secondary}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !selectedCompanyId}
            className={btn.primary}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Xác nhận đẩy đơn"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
