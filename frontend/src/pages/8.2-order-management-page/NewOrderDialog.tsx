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
import { Trash2, Plus } from "lucide-react";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MOCK_PRODUCTS = [
  { ProductID: 201, ProductName: "Sản phẩm A", Price: 150000 },
  { ProductID: 202, ProductName: "Sản phẩm B", Price: 200000 },
];

export function NewOrderDialog({ open, onOpenChange }: NewProps) {
  const [orderData, setOrderData] = useState({
    CustomerName: "",
    InvoiceID: "",
    ShipCompanyID: "1",
    ShippingFee: 0,
    ShipmentNote: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([
    { productID: MOCK_PRODUCTS[0].ProductID, quantity: 1 },
  ]);

  const handleAddProduct = () =>
    setSelectedProducts((prev) => [
      ...prev,
      { productID: MOCK_PRODUCTS[0].ProductID, quantity: 1 },
    ]);
  const handleRemoveProduct = (index: number) =>
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    console.log("Tạo đơn hàng:", { orderData, selectedProducts });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white border-none rounded-none max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">
            Tạo mới Đơn Hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          {/* Thông tin chung */}
          <div className="grid gap-3">
            <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
              Thông tin giao hàng
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500">Tên khách hàng</Label>
                <Input
                  placeholder="Nhập tên khách hàng"
                  value={orderData.CustomerName}
                  onChange={(e) =>
                    setOrderData({ ...orderData, CustomerName: e.target.value })
                  }
                  className="border-slate-200 focus:ring-blue-600 rounded-none h-9"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500">
                  Mã hóa đơn liên kết (nếu có)
                </Label>
                <Input
                  placeholder="Ví dụ: 1001"
                  value={orderData.InvoiceID}
                  onChange={(e) =>
                    setOrderData({ ...orderData, InvoiceID: e.target.value })
                  }
                  className="border-slate-200 focus:ring-blue-600 rounded-none h-9"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500">
                  Đối tác vận chuyển
                </Label>
                <NativeSelect
                  value={orderData.ShipCompanyID}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      ShipCompanyID: e.target.value,
                    })
                  }
                  className="border-slate-200 focus:ring-blue-600 text-sm h-9 rounded-none"
                >
                  <option value="1">Giao Hàng Tiết Kiệm</option>
                  <option value="2">Viettel Post</option>
                  <option value="3">Tự giao</option>
                </NativeSelect>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500">
                  Phí vận chuyển (đ)
                </Label>
                <Input
                  type="number"
                  value={orderData.ShippingFee}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      ShippingFee: Number(e.target.value),
                    })
                  }
                  className="border-slate-200 focus:ring-blue-600 rounded-none h-9"
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label className="text-xs text-slate-500">
                  Ghi chú giao hàng
                </Label>
                <Input
                  placeholder="Ghi chú cho shipper..."
                  value={orderData.ShipmentNote}
                  onChange={(e) =>
                    setOrderData({ ...orderData, ShipmentNote: e.target.value })
                  }
                  className="border-slate-200 focus:ring-blue-600 rounded-none h-9"
                />
              </div>
            </div>
          </div>

          {/* Sản phẩm */}
          <div className="grid gap-3 border-t border-slate-100 pt-4">
            <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
              Danh sách sản phẩm
            </Label>
            <div className="grid gap-2">
              {selectedProducts.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <NativeSelect
                    value={item.productID}
                    onChange={(e) =>
                      setSelectedProducts((prev) =>
                        prev.map((p, i) =>
                          i === index
                            ? { ...p, productID: Number(e.target.value) }
                            : p,
                        ),
                      )
                    }
                    className="border-slate-200 focus:ring-blue-600 text-sm h-9 flex-1 rounded-none"
                  >
                    {MOCK_PRODUCTS.map((prod) => (
                      <option key={prod.ProductID} value={prod.ProductID}>
                        {prod.ProductName} - {prod.Price.toLocaleString()} đ
                      </option>
                    ))}
                  </NativeSelect>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      setSelectedProducts((prev) =>
                        prev.map((p, i) =>
                          i === index
                            ? { ...p, quantity: Number(e.target.value) }
                            : p,
                        ),
                      )
                    }
                    className="border-slate-200 focus:ring-blue-600 h-9 w-20 rounded-none"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedProducts.length === 1}
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500 border-slate-200 h-9 w-9 p-0 flex items-center justify-center rounded-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
                className="text-slate-600 border-dashed border-slate-300 mt-2 rounded-none h-8 w-full"
              >
                <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            className="rounded-none"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-none"
            onClick={handleSubmit}
          >
            Tạo Đơn Hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
