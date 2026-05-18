import React, { useState } from "react";
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
import { Trash2, Plus } from "lucide-react";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NewReturnDetailItem {
  productID: number;
  quantity: number;
  qcStatus: string;
  targetWarehouseID: number;
  actionTaken: string;
}

// Mock danh sách sản phẩm mẫu để chọn trong dropdown
const MOCK_PRODUCTS_LIST = [
  { ProductID: 201, ProductName: "Sản phẩm mẫu 1" },
  { ProductID: 202, ProductName: "Sản phẩm mẫu 2" },
  { ProductID: 203, ProductName: "Sản phẩm mẫu 3" },
  { ProductID: 204, ProductName: "Sản phẩm mẫu 4" },
  { ProductID: 205, ProductName: "Sản phẩm mẫu 5" },
];

export function NewOrderReturnDialog({ open, onOpenChange }: NewProps) {
  // Khởi tạo các state thông tin chung của phiếu hoàn tiền
  const [orderName, setOrderName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [returnRefCode, setReturnRefCode] = useState("");
  const [reason, setReason] = useState("");
  const [totalRefund, setTotalRefund] = useState<number>(0);

  // Khởi tạo danh sách sản phẩm động luôn có ít nhất 1 dòng mặc định
  const [selectedProducts, setSelectedProducts] = useState<
    NewReturnDetailItem[]
  >([
    {
      productID: MOCK_PRODUCTS_LIST[0].ProductID,
      quantity: 1,
      qcStatus: "Đạt chuẩn",
      targetWarehouseID: 1,
      actionTaken: "Tái nhập kho",
    },
  ]);

  // Thêm dòng sản phẩm mới vào danh sách hoàn tiền
  const handleAddProduct = () => {
    setSelectedProducts((prev) => [
      ...prev,
      {
        productID: MOCK_PRODUCTS_LIST[0].ProductID,
        quantity: 1,
        qcStatus: "Đạt chuẩn",
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
  const handleSubmit = () => {
    if (!orderName.trim() || !employeeName.trim() || !returnRefCode.trim()) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    if (totalRefund <= 0) {
      alert("Vui lòng nhập số tiền hoàn tiền hợp lệ!");
      return;
    }

    const hasInvalidQuantity = selectedProducts.some((p) => p.quantity <= 0);
    if (hasInvalidQuantity) {
      alert("Số lượng của từng sản phẩm hoàn tiền phải lớn hơn hoặc bằng 1!");
      return;
    }

    const finalData = {
      orderName,
      employeeName,
      returnRefCode,
      reason,
      totalRefund,
      returnDate: new Date(),
      status: "Chờ xử lý",
      products: selectedProducts,
    };

    console.log("Dữ liệu tạo đơn hoàn tiền mới gửi đi:", finalData);

    // Reset toàn bộ state về trạng thái mặc định ban đầu
    setOrderName("");
    setEmployeeName("");
    setReturnRefCode("");
    setReason("");
    setTotalRefund(0);
    setSelectedProducts([
      {
        productID: MOCK_PRODUCTS_LIST[0].ProductID,
        quantity: 1,
        qcStatus: "Đạt chuẩn",
        targetWarehouseID: 1,
        actionTaken: "Tái nhập kho",
      },
    ]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[550px] bg-white border-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Tạo mới phiếu hoàn tiền
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          {/* Thông tin đơn hàng và mã tham chiếu */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="orderName">
                Tên/Mã đơn hàng gốc <span className="text-red-500">*</span>
              </Label>
              <Input
                id="orderName"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                placeholder="Ví dụ: #ORD-2500"
                className="border-slate-200 focus:ring-blue-600 h-9"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="returnRefCode">
                Mã tham chiếu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="returnRefCode"
                value={returnRefCode}
                onChange={(e) => setReturnRefCode(e.target.value)}
                placeholder="Ví dụ: REF-8000"
                className="border-slate-200 focus:ring-blue-600 h-9"
              />
            </div>
          </div>

          {/* Nhân viên và Số tiền hoàn */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="employeeName">
                Nhân viên tiếp nhận <span className="text-red-500">*</span>
              </Label>
              <Input
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Nhập tên nhân viên..."
                className="border-slate-200 focus:ring-blue-600 h-9"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="totalRefund">
                Tổng tiền hoàn tiền (đ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="totalRefund"
                type="number"
                value={totalRefund}
                onChange={(e) => setTotalRefund(Number(e.target.value))}
                placeholder="Nhập số tiền..."
                className="border-slate-200 focus:ring-blue-600 h-9"
              />
            </div>
          </div>

          {/* Lý do hoàn tiền */}
          <div className="grid gap-1.5">
            <Label htmlFor="reason">Lý do hoàn tiền</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập chi tiết lý do khách hàng hoàn tiền..."
              className="border-slate-200 focus:ring-blue-600 text-sm"
              rows={2}
            />
          </div>

          {/* Danh sách sản phẩm kèm theo (Style tương tự Combo) */}
          <div className="border-t border-slate-100 pt-4 mt-2">
            <Label className="text-slate-900 font-bold block mb-3">
              Danh sách sản phẩm hoàn tiền{" "}
              <span className="text-red-500">*</span>
            </Label>

            <div className="grid gap-3">
              {selectedProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 p-3 border border-slate-100 rounded-md bg-slate-50/30"
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
                        className="border-slate-200 focus:ring-blue-600 text-xs h-8 w-full"
                      >
                        {MOCK_PRODUCTS_LIST.map((prod) => (
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
                            Number(e.target.value),
                          )
                        }
                        placeholder="SL"
                        className="border-slate-200 focus:ring-blue-600 h-8 text-xs"
                      />
                    </div>

                    {/* Nút xóa dòng */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedProducts.length === 1}
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
                      className="border-slate-200 focus:ring-blue-600 h-7 text-xs"
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
                      className="border-slate-200 focus:ring-blue-600 h-7 text-xs"
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
              className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-3 w-full flex items-center justify-center gap-1 h-8"
            >
              <Plus className="h-4 w-4" /> Thêm sản phẩm hoàn tiền
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 text-sm"
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm"
            onClick={handleSubmit}
          >
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
