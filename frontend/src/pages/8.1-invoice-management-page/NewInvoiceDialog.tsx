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
import { Trash2, Plus, Search } from "lucide-react";
import { NewCustomerDialog } from "@/pages/4-customer-management-page/NewCustomerDialog";
import type { Customer, Product, Discount } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export function NewInvoiceDialog({ open, onOpenChange, onSave }: NewProps) {
  const { emp } = useEmp();
  const [loading, setLoading] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);

  // Dynamic Options
  const [products, setProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  // Invoice Fields
  const [saleChannelCode, setSaleChannelCode] = useState<number>(0); // 0: Tại quầy, 1: Mạng xã hội/Online
  const [status, setStatus] = useState<string>("0"); // "0": Chờ thanh toán, "1": Đã thanh toán, "2": Thanh toán 1 phần

  const [selectedProducts, setSelectedProducts] = useState<{ productID: number; quantity: number }[]>([]);
  const [selectedPromotions, setSelectedPromotions] = useState<{ promoID: number }[]>([]);

  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        try {
          const [prodList, promoList] = await Promise.all([
            api.products.list(),
            api.discounts.list(),
          ]);
          setProducts(prodList);
          setDiscounts(promoList);

          if (prodList.length > 0) {
            setSelectedProducts([{ productID: prodList[0].ProductID, quantity: 1 }]);
          }
          if (promoList.length > 0) {
            setSelectedPromotions([]);
          }
        } catch (e) {
          console.error("Lỗi lấy danh sách sản phẩm/khuyến mãi:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

  const handleSearchCustomer = async () => {
    if (!phoneSearch.trim()) {
      toast.error("Vui lòng nhập số điện thoại cần tìm");
      return;
    }
    try {
      const customers = await api.customers.list();
      const cust = customers.find((c) => c.Phone === phoneSearch.trim());
      if (cust) {
        setSelectedCustomer(cust);
        toast.success(`Đã tìm thấy khách hàng: ${cust.FirstName} ${cust.LastName}`);
      } else {
        toast.error("Không tìm thấy khách hàng. Vui lòng tạo mới!");
        setSelectedCustomer(null);
      }
    } catch (e) {
      toast.error("Lỗi kết nối khi tìm kiếm khách hàng");
    }
  };

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

  const handleAddPromotion = () => {
    if (discounts.length === 0) return;
    setSelectedPromotions((prev) => [
      ...prev,
      { promoID: discounts[0].DiscountID },
    ]);
  };

  const handleRemovePromotion = (index: number) => {
    setSelectedPromotions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedCustomer) {
      toast.error("Vui lòng chọn khách hàng!");
      return;
    }
    if (selectedProducts.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      // Calculate totals
      let totalAmount = 0;
      selectedProducts.forEach((item) => {
        const prod = products.find((p) => p.ProductID === item.productID);
        if (prod) {
          totalAmount += prod.Price * item.quantity;
        }
      });

      // Apply promotional discounts if any
      let discountAmount = 0;
      selectedPromotions.forEach((item) => {
        const promo = discounts.find((d) => d.DiscountID === item.promoID);
        if (promo) {
          discountAmount += promo.Value;
        }
      });

      const taxAmount = Math.round(totalAmount * 0.1);
      const finalAmount = Math.max(0, totalAmount + taxAmount - discountAmount);

      const invoiceId = Math.floor(Math.random() * 900000) + 100000;

      // 1. Create Invoice record
      await api.invoices.create({
        InvoiceID: invoiceId,
        CustomerID: selectedCustomer.CustomerID,
        EmployeeID: emp?.EmployeeID || 1,
        SaleChannelCode: saleChannelCode,
        TotalAmount: totalAmount,
        TaxAmount: taxAmount,
        FinalAmount: finalAmount,
        Status: status,
        InvoiceDate: new Date(),
      });

      // 2. Create InvoiceDetail records
      await Promise.all(
        selectedProducts.map((item, index) => {
          const prod = products.find((p) => p.ProductID === item.productID);
          const price = prod ? prod.Price : 0;
          return api.invoiceDetails.create({
            InvoiceDetailID: Math.floor(Math.random() * 900000) + 100000 + index,
            InvoiceID: invoiceId,
            ProductID: item.productID,
            ComboID: 0,
            Quantity: item.quantity,
            UnitPrice: price,
            DiscountAmount: 0,
            TotalAmount: price * item.quantity,
          });
        })
      );

      // 3. Link Promotions to Invoice using listDiscounts if applicable
      if (selectedPromotions.length > 0) {
        await Promise.all(
          selectedPromotions.map((item) => {
            const promo = discounts.find((d) => d.DiscountID === item.promoID);
            const val = promo ? promo.Value : 0;
            return api.listDiscounts.create({
              OrderID: invoiceId, // Note: listDiscounts has OrderID representing transaction ID
              DiscountID: item.promoID,
              AppliedValue: val,
            });
          })
        );
      }

      toast.success("Tạo hóa đơn thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Tạo hóa đơn thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
              Tạo mới Hóa đơn
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-2 max-h-[70vh] overflow-y-auto pr-2">
            {/* 1. Khu vực Khách hàng */}
            <div className="grid gap-3">
              <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Thông tin khách hàng
              </Label>
              <div className="flex items-end gap-2">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="phoneSearch" className="text-xs text-slate-500">
                    Tra cứu SĐT
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="phoneSearch"
                      placeholder="Nhập SĐT..."
                      value={phoneSearch}
                      onChange={(e) => setPhoneSearch(e.target.value)}
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                      disabled={loading}
                    />
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 h-9 px-3"
                      onClick={handleSearchCustomer}
                      disabled={loading}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 h-9 text-xs"
                  onClick={() => setIsNewCustomerOpen(true)}
                  disabled={loading}
                >
                  Tạo mới KH
                </Button>
              </div>

              {selectedCustomer && (
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm mt-2">
                  <p>
                    <span className="text-slate-500">Họ Tên:</span>{" "}
                    <strong className="text-slate-900">
                      {selectedCustomer.FirstName} {selectedCustomer.LastName}
                    </strong>
                  </p>
                  <p>
                    <span className="text-slate-500">SĐT:</span>{" "}
                    <strong className="text-slate-900">{selectedCustomer.Phone}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* 2. Thông tin Hóa đơn (Chung) */}
            <div className="grid gap-3 border-t border-slate-100 pt-4">
              <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Thông tin chung
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs text-slate-500">Kênh bán</Label>
                  <NativeSelect
                    value={saleChannelCode}
                    onChange={(e) => setSaleChannelCode(Number(e.target.value))}
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                    disabled={loading}
                  >
                    <option value={0}>Tại quầy</option>
                    <option value={1}>Mạng xã hội / Online</option>
                  </NativeSelect>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs text-slate-500">Trạng thái</Label>
                  <NativeSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                    disabled={loading}
                  >
                    <option value="0">Chờ thanh toán</option>
                    <option value="1">Đã thanh toán</option>
                    <option value="2">Thanh toán 1 phần</option>
                  </NativeSelect>
                </div>
              </div>
            </div>

            {/* 3. Danh sách sản phẩm */}
            <div className="grid gap-3 border-t border-slate-100 pt-4">
              <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Sản phẩm
              </Label>
              <div className="grid gap-2">
                {selectedProducts.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <NativeSelect
                      value={item.productID}
                      onChange={(e) =>
                        setSelectedProducts((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, productID: Number(e.target.value) } : p
                          )
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 flex-1"
                      disabled={loading}
                    >
                      {products.map((prod) => (
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
                            i === index ? { ...p, quantity: Math.max(1, Number(e.target.value)) } : p
                          )
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

            {/* 4. Khuyến mãi */}
            <div className="grid gap-3 border-t border-slate-100 pt-4">
              <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Khuyến mãi áp dụng
              </Label>
              <div className="grid gap-2">
                {selectedPromotions.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <NativeSelect
                      value={item.promoID}
                      onChange={(e) =>
                        setSelectedPromotions((prev) =>
                          prev.map((p, i) =>
                            i === index ? { ...p, promoID: Number(e.target.value) } : p
                          )
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 flex-1"
                      disabled={loading}
                    >
                      {discounts.map((promo) => (
                        <option key={promo.DiscountID} value={promo.DiscountID}>
                          {promo.DiscountName} (-{promo.Value.toLocaleString()}đ)
                        </option>
                      ))}
                    </NativeSelect>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemovePromotion(index)}
                      className="text-red-500 border-slate-200 h-9 w-9 p-0 flex items-center justify-center"
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddPromotion}
                  className="text-slate-600 border-dashed border-slate-300 mt-1 h-8 w-full text-xs"
                  disabled={loading || discounts.length === 0}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm mã khuyến mãi
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
              {loading ? "Đang tạo..." : "Tạo Hóa Đơn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Render Dialog tạo khách hàng đè lên */}
      <NewCustomerDialog
        open={isNewCustomerOpen}
        onOpenChange={setIsNewCustomerOpen}
      />
    </>
  );
}
