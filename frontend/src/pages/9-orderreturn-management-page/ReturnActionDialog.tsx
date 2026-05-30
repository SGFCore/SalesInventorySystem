import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, dialog, input } from "@/pages/page-classes";
import { Loader2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { OrderDetail, Warehouse } from "@/lib/types";
import { useEmp } from "@/context/empContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: OrderDetail;
  orderId: number;
  onSuccess: () => void;
}

export function ReturnActionDialog({ open, onOpenChange, detail, orderId, onSuccess }: Props) {
  const { emp } = useEmp();
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  
  const [formData, setFormData] = useState({
    reason: "",
    quantity: 1,
    qcStatus: "Đạt chuẩn",
    targetWarehouseId: "2", // Default to store warehouse
    actionTaken: "Nhập lại kho",
  });

  useEffect(() => {
    if (open) {
      loadWarehouses();
      setFormData({
        reason: "",
        quantity: 1,
        qcStatus: "Đạt chuẩn",
        targetWarehouseId: "2",
        actionTaken: "Nhập lại kho",
      });
    }
  }, [open]);

  const loadWarehouses = async () => {
    try {
      const data = await api.warehouses.list();
      setWarehouses(data.filter(w => w.Status === 1));
    } catch (e) {
      toast.error("Không thể tải danh sách kho");
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!emp) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      return;
    }
    if (!formData.reason.trim()) {
      toast.error("Vui lòng nhập lý do trả hàng");
      return;
    }
    setLoading(true);
    try {
      const refundAmount = (detail.UnitPrice || 0) * formData.quantity;

      await api.sales.return({
        orderId,
        reason: formData.reason,
        employeeId: emp.EmployeeID,
        items: [{ 
          productId: detail.ProductID, 
          quantity: formData.quantity, 
          condition: formData.qcStatus === "Đạt chuẩn" ? "Còn mới" : "Bị hỏng",
          qcStatus: formData.qcStatus,
          targetWarehouseId: Number(formData.targetWarehouseId),
          actionTaken: formData.actionTaken
        }]
      });
      
      toast.success(`Xử lý trả hàng thành công!`);
      toast.info(`Hệ thống đã tự động cộng tồn kho và cập nhật Audit Log.`);
      toast.success(`Yêu cầu hoàn tiền ${refundAmount.toLocaleString("vi-VN")} đ đang ở trạng thái 'Chờ xử lý'.`);
      
      onSuccess();
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Lỗi khi xử lý trả hàng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Xử lý trả hàng & Hoàn tiền
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm font-medium">
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
            <Label className="text-xs font-semibold text-slate-500">Sản phẩm khách trả</Label>
            <p className="font-bold text-slate-900 mt-1">Mã SP: #{detail.ProductID}</p>
            <p className="text-xs text-slate-500">Đơn giá: {(detail.UnitPrice || 0).toLocaleString("vi-VN")} đ</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-slate-500 text-red-600">Số lượng trả (Tối đa {detail.Quantity}) *</Label>
              <Input 
                type="number" 
                min={1} 
                max={detail.Quantity} 
                value={formData.quantity} 
                onChange={e => handleInputChange("quantity", Number(e.target.value))}
                className={cn(input.base, "h-10")}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-slate-500">Tình trạng (QC Status) *</Label>
              <NativeSelect
                value={formData.qcStatus}
                onChange={(e) => handleInputChange("qcStatus", e.target.value)}
                className="h-10"
              >
                <option value="Đạt chuẩn">Đạt chuẩn (Tốt)</option>
                <option value="Lỗi nhẹ">Lỗi nhẹ (Cần sửa)</option>
                <option value="Hỏng nặng">Hỏng nặng (Hủy)</option>
              </NativeSelect>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-slate-500">Kho tiếp nhận *</Label>
              <NativeSelect
                value={formData.targetWarehouseId}
                onChange={(e) => handleInputChange("targetWarehouseId", e.target.value)}
                className="h-10"
              >
                {warehouses.map(wh => (
                  <option key={wh.WareHouseID} value={wh.WareHouseID}>{wh.WareHouseName}</option>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-slate-500">Hình thức xử lý *</Label>
              <NativeSelect
                value={formData.actionTaken}
                onChange={(e) => handleInputChange("actionTaken", e.target.value)}
                className="h-10"
              >
                <option value="Nhập lại kho">Nhập lại kho</option>
                <option value="Hủy hàng">Hủy hàng</option>
                <option value="Chờ sửa chữa">Chờ sửa chữa</option>
              </NativeSelect>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-xs font-semibold text-slate-500">Lý do trả hàng <span className="text-red-500">*</span></Label>
            <Input 
              placeholder="VD: Sản phẩm bị lỗi kỹ thuật, không đúng mô tả..." 
              value={formData.reason} 
              onChange={e => handleInputChange("reason", e.target.value)}
              className={cn(input.base, "h-10")}
            />
          </div>

          <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 flex gap-2">
            <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
            <div className="text-[10px] text-yellow-700 leading-normal">
              <strong>Hoàn tiền:</strong> Hệ thống sẽ tự động khởi tạo 01 yêu cầu hoàn trả số tiền 
              <span className="font-bold"> {((detail.UnitPrice || 0) * formData.quantity).toLocaleString("vi-VN")} đ </span> 
              sang trạng thái "Chờ xử lý" sau khi bạn nhấn xác nhận.
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading} className={btn.secondary}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={loading || !formData.reason.trim()} className="bg-red-600 hover:bg-red-700 text-white">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Xác nhận trả hàng & Hoàn tiền"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
