import React, { useState, useEffect } from "react";
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
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { dialog } from "@/pages/page-classes";
import { cn } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

interface NewReturnDetailItem {
  productID: number;
  quantity: number;
  qcStatus: string;
  targetWarehouseID: number;
  actionTaken: string;
}

export function NewOrderReturnDialog({ open, onOpenChange, onSave }: NewProps) {
  const { emp } = useEmp();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Khởi tạo các state thông tin chung của phiếu hoàn tiền
  const [orderName, setOrderName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [returnRefCode, setReturnRefCode] = useState("");
  const [reason, setReason] = useState("");
  const [totalRefund, setTotalRefund] = useState<number>(0);

  // Khởi tạo danh sách sản phẩm động luôn có ít nhất 1 dòng mặc định
  const [selectedProducts, setSelectedProducts] = useState<NewReturnDetailItem[]>([]);

  useEffect(() => {
    if (open) {
      // Set default employee name
      if (emp) {
        setEmployeeName(emp.Fullname);
      } else {
        setEmployeeName("Nhân viên hệ thống");
      }

      // Pre-generate a random ref code
      setReturnRefCode("RET" + Math.floor(Math.random() * 900000 + 100000));

      const loadProducts = async () => {
        try {
          const list = await api.products.list();
          setProducts(list);
          if (list.length > 0) {
            setSelectedProducts([
              {
                productID: list[0].ProductID,
                quantity: 1,
                qcStatus: "Đạt chuẩn QC",
                targetWarehouseID: 1,
                actionTaken: "Tái nhập kho",
              },
            ]);
          }
        } catch (e) {
          console.error("Lỗi lấy danh sách sản phẩm hoàn trả:", e);
        }
      };
      loadProducts();
    }
  }, [open, emp]);

  // Thêm dòng sản phẩm mới vào danh sách hoàn tiền
  const handleAddProduct = () => {
    if (products.length === 0) return;
    setSelectedProducts((prev) => [
      ...prev,
      {
        productID: products[0].ProductID,
        quantity: 1,
        qcStatus: "Đạt chuẩn QC",
        targetWarehouseID: 1,
        actionTaken: "Tái nhập kho",
      },
    ]);
  };

  // Xóa dòng sản phẩm (Giữ lại tối thiểu 1 dòng)
  const handleRemoveProduct = (index: number) => {
    if (selectedProducts.length === 1) return;
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Cập nhật giá trị các field động trong danh sách sản phẩm
  const handleProductChange = (
    index: number,
    field: keyof NewReturnDetailItem,
    value: string | number,
  ) => {
    setSelectedProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  // Submit form dữ liệu phiếu hoàn tiền mới
  const handleSubmit = async () => {
    if (!orderName.trim() || !employeeName.trim() || !returnRefCode.trim()) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    if (totalRefund <= 0) {
      toast.error("Vui lòng nhập số tiền hoàn tiền hợp lệ!");
      return;
    }

    const hasInvalidQuantity = selectedProducts.some((p) => p.quantity <= 0);
    if (hasInvalidQuantity) {
      toast.error("Số lượng của từng sản phẩm hoàn tiền phải lớn hơn hoặc bằng 1!");
      return;
    }

    setLoading(true);
    try {
      const returnId = Math.floor(Math.random() * 900000) + 100000;

      // 1. Create OrderReturn
      await api.orderReturns.create({
        ReturnID: returnId,
        OrderName: orderName,
        EmployeeName: employeeName,
        ReturnDate: new Date(),
        Reason: reason || "Đổi trả hàng",
        TotalRefund: totalRefund,
        ReturnRefCode: returnRefCode,
        Status: "0", // 0: Chờ xử lý
      });

      // 2. Create ReturnDetails song song
      await Promise.all(
        selectedProducts.map((item, idx) => {
          return api.returnDetails.create({
            ReturnID: returnId,
            ProductID: item.productID,
            Quantity: item.quantity,
            QC_Status: item.qcStatus || "Chưa QC",
            TargetWarehouseID: item.targetWarehouseID || 1,
            ActionTaken: item.actionTaken || "Tái nhập kho",
          });
        })
      );

      toast.success("Tạo phiếu hoàn trả thành công!");
      // Reset toàn bộ state về trạng thái mặc định ban đầu
      setOrderName("");
      setReason("");
      setTotalRefund(0);
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo phiếu hoàn tiền thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Tạo mới phiếu hoàn tiền
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm max-h-[70vh] overflow-y-auto pr-2">
          {/* Thông tin đơn hàng và mã tham chiếu */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="orderName" className="font-semibold text-slate-700">
                Tên/Mã đơn hàng gốc <span className="text-red-500">*</span>
              </Label>
              <Input
                id="orderName"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                placeholder="Ví dụ: #ORD-2500"
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9"
                disabled={loading}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="returnRefCode" className="font-semibold text-slate-700">
                Mã tham chiếu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="returnRefCode"
                value={returnRefCode}
                onChange={(e) => setReturnRefCode(e.target.value)}
                placeholder="Ví dụ: REF-8000"
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9"
                disabled={loading}
              />
            </div>
          </div>

          {/* Nhân viên và Số tiền hoàn */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="employeeName" className="font-semibold text-slate-700">
                Nhân viên tiếp nhận <span className="text-red-500">*</span>
              </Label>
              <Input
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Nhập tên nhân viên..."
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9"
                disabled={loading}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="totalRefund" className="font-semibold text-slate-700">
                Tổng tiền hoàn tiền (đ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalRefund"
                type="number"
                value={totalRefund}
                onChange={(e) => setTotalRefund(Number(e.target.value))}
                placeholder="Nhập số tiền..."
                className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-center"
                disabled={loading}
              />
            </div>
          </div>

          {/* Lý do hoàn tiền */}
          <div className="grid gap-1.5">
            <Label htmlFor="reason" className="font-semibold text-slate-700">Lý do hoàn tiền</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập chi tiết lý do khách hàng hoàn tiền..."
              className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm"
              rows={2}
              disabled={loading}
            />
          </div>

          {/* Danh sách sản phẩm kèm theo (Style tương tự Combo) */}
          <div className="border-t border-slate-100 pt-4 mt-2">
            <Label className="text-slate-900 font-bold block mb-3">
              Danh sách sản phẩm hoàn tiền <span className="text-red-500">*</span>
            </Label>

            <div className="grid gap-3">
              {selectedProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 border border-slate-200 rounded-md bg-slate-50/50"
                >
                  <div className="flex items-center gap-2">
                    {/* Dropdown chọn sản phẩm */}
                    <div className="flex-1">
                      <NativeSelect
                        value={item.productID}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "productID",
                            Number(e.target.value),
                          )
                        }
                        className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-xs h-8 w-full"
                        disabled={loading}
                      >
                        {products.map((prod) => (
                          <option key={prod.ProductID} value={prod.ProductID}>
                            {prod.ProductName} (#{prod.ProductID})
                          </option>
                        ))}
                      </NativeSelect>
                    </div>

                    {/* Input nhập số lượng */}
                    <div className="w-16">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "quantity",
                            Math.max(1, Number(e.target.value)),
                          )
                        }
                        placeholder="SL"
                        className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-8 text-xs text-center font-bold"
                        disabled={loading}
                      />
                    </div>

                    {/* Nút xóa dòng */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedProducts.length === 1 || loading}
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-500 hover:bg-red-50 border-slate-200 h-8 w-8 p-0 flex items-center justify-center disabled:opacity-40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Bổ sung các trường nghiệp vụ QC và Xử lý nội bộ */}
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      placeholder="Trạng thái QC (VD: Lỗi nhẹ)"
                      value={item.qcStatus}
                      onChange={(e) =>
                        handleProductChange(index, "qcStatus", e.target.value)
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-8 text-xs"
                      disabled={loading}
                    />
                    <Input
                      type="text"
                      placeholder="Hành động xử lý (VD: Tái nhập)"
                      value={item.actionTaken}
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          "actionTaken",
                          e.target.value,
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-8 text-xs"
                      disabled={loading}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Nút thêm sản phẩm mới */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddProduct}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-3 w-full flex items-center justify-center gap-1 h-8 text-xs"
              disabled={loading}
            >
              <Plus className="h-4 w-4" /> Thêm sản phẩm hoàn tiền
            </Button>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
