import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
import { btn, dialog } from "@/pages/page-classes";
import { Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";
import type { Product, Shipcompany, Customer } from "@/lib/types";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  saleChannelCode?: number;
}

export function NewOrderDialog({ open, onOpenChange, onSave, saleChannelCode }: NewProps) {
  const { emp } = useEmp();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    InvoiceID: "",
    ShipCompanyID: "1",
    ShippingFee: 0,
    ShipmentNote: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [shipCompanies, setShipCompanies] = useState<Shipcompany[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<
    { productID: number; quantity: number }[]
  >([]);

  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        try {
          const [allProducts, allShip, allCustomers] = await Promise.all([
            api.products.list(),
            api.shipCompanies.list(),
            api.customers.list(),
          ]);
          setProducts(allProducts);
          setShipCompanies(allShip);
          setCustomers(allCustomers);

          if (allProducts.length > 0) {
            setSelectedProducts([
              { productID: allProducts[0].ProductID, quantity: 1 },
            ]);
          }
          if (allShip.length > 0) {
            setOrderData((prev) => ({
              ...prev,
              ShipCompanyID: allShip[0].ShipCompanyID.toString(),
            }));
          }
          if (allCustomers.length > 0) {
            setSelectedCustomerId(allCustomers[0].id.toString());
          }
        } catch (e) {
          console.error("Lỗi tải danh mục tạo đơn hàng:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

  const handleAddProduct = () => {
    if (products.length === 0) return;
    setSelectedProducts((prev) => [
      ...prev,
      { productID: products[0].ProductID, quantity: 1 },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (selectedProducts.length === 1) return;
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedCustomerId) {
      toast.error("Vui lòng chọn khách hàng!");
      return;
    }
    if (selectedProducts.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      const orderId = Math.floor(Math.random() * 900000) + 100000;
      const shipCode = "SHIP" + Math.floor(Math.random() * 900000 + 100000);

      // Calculate Total Amount
      let totalAmount = 0;
      selectedProducts.forEach((item) => {
        const prod = products.find((p) => p.ProductID === item.productID);
        if (prod) {
          totalAmount += prod.ProductPrice * item.quantity;
        }
      });

      // 1. Create Order
      await api.orders.create({
        id: orderId,
        customerId: Number(selectedCustomerId),
        employeeId: emp?.EmployeeID || 1,
        invoiceId: orderData.InvoiceID ? Number(orderData.InvoiceID) : 0,
        shipcode: shipCode,
        shipcompanyId: Number(orderData.ShipCompanyID),
        totalamount: totalAmount + orderData.ShippingFee,
        orderstatus: 0, // 0: Chờ xác nhận, 1: Đang chuẩn bị, 2: Đang giao, 3: Đã giao, 4: Đã hủy
        shippingstatus: 0, // 0: Chưa giao, 1: Đang giao, 2: Đã giao thành công, 3: Trả về
        shipmentnote: orderData.ShipmentNote,
        shippingfee: orderData.ShippingFee,
        exportreceiptId: 0,
      });

      // 2. Create OrderDetails
      await Promise.all(
        selectedProducts.map((item, index) => {
          const prod = products.find((p) => p.ProductID === item.productID);
          const price = prod ? prod.ProductPrice : 0;
          return api.orderDetails.create({
            OrderDetailID: Math.floor(Math.random() * 900000) + 100000 + index,
            OrderID: orderId,
            ProductID: item.productID,
            ComboID: 0,
            Quantity: item.quantity,
            UnitPrice: price,
            DiscountAmount: 0,
            TotalAmount: price * item.quantity,
          });
        }),
      );

      toast.success("Tạo đơn hàng thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo đơn hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Tạo mới Đơn Hàng
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-2 max-h-[70vh] overflow-y-auto pr-2">
          {/* Thông tin chung */}
          <div className="grid gap-3">
            <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
              {saleChannelCode !== 0 ? "Thông tin giao hàng" : "Thông tin chung"}
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500 font-medium">
                  Khách hàng
                </Label>
                <NativeSelect
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                  disabled={loading}
                >
                  {customers.map((cust) => (
                    <option key={cust.id} value={cust.id}>
                      {cust.firstname} {cust.lastname} - {cust.phone}
                    </option>
                  ))}
                </NativeSelect>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-500 font-medium">
                  Mã hóa đơn liên kết (nếu có)
                </Label>
                <Input
                  placeholder="Ví dụ: 1001"
                  value={orderData.InvoiceID}
                  onChange={(e) =>
                    setOrderData({ ...orderData, InvoiceID: e.target.value })
                  }
                  className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                  disabled={loading}
                />
              </div>
              {saleChannelCode !== 0 && (
                <>
                  <div className="grid gap-2">
                    <Label className="text-xs text-slate-500 font-medium">
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
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                      disabled={loading}
                    >
                      {shipCompanies.map((ship) => (
                        <option key={ship.ShipCompanyID} value={ship.ShipCompanyID}>
                          {ship.ShipCompanyName}
                        </option>
                      ))}
                    </NativeSelect>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-xs text-slate-500 font-medium">
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
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm text-center"
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <Label className="text-xs text-slate-500 font-medium">
                      Ghi chú giao hàng
                    </Label>
                    <Input
                      placeholder="Ghi chú cho shipper..."
                      value={orderData.ShipmentNote}
                      onChange={(e) =>
                        setOrderData({ ...orderData, ShipmentNote: e.target.value })
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                      disabled={loading}
                    />
                  </div>
                </>
              )}
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
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 flex-1"
                    disabled={loading}
                  >
                    {products.map((prod) => (
                      <option key={prod.ProductID} value={prod.ProductID}>
                        {prod.ProductName} -{" "}
                        {prod.ProductPrice.toLocaleString()} đ
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
                            ? {
                                ...p,
                                quantity: Math.max(1, Number(e.target.value)),
                              }
                            : p,
                        ),
                      )
                    }
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 w-20 text-sm text-center"
                    disabled={loading}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedProducts.length === 1 || loading}
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500 border-slate-200 h-9 w-9 p-0 flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
                className="text-slate-600 border-dashed border-slate-300 mt-2 h-8 w-full text-xs"
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
              </Button>
            </div>
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
            className={btn.primary}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo Đơn Hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
