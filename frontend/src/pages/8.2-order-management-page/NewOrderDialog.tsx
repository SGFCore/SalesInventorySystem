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
import { Trash2, Plus, Printer, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Product, Shipcompany, Customer, Discount, Invoice } from "@/lib/types";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";
import { PrintInvoiceDialog } from "@/pages/8.1-invoice-management-page/PrintInvoiceDialog";

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
    ShippingFee: 30000,
    ShipmentNote: "",
    ShippingAddress: "", // New field
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [shipCompanies, setShipCompanies] = useState<Shipcompany[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<
    { productID: number; quantity: number }[]
  >([]);
  const [selectedPromotions, setSelectedPromotions] = useState<
    { promoID: number }[]
  >([]);

  // Payment states for offline orders
  const [showPayment, setShowPayment] = useState(false);
  const [amountTendered, setAmountTendered] = useState<number>(0);
  const [totalToPay, setTotalToPay] = useState<number>(0);

  // VAT Invoice states
  const [wantVAT, setWantVAT] = useState(false);
  const [vatDetails, setVatDetails] = useState({
    buyerName: "",
    buyerAddress: "",
    buyerTaxCode: "",
  });
  
  // Print states
  const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        try {
          const [allProducts, allShip, allCustomers, allDiscounts] = await Promise.all([
            api.products.list(),
            api.shipCompanies.list(),
            api.customers.list(),
            api.discounts.list(),
          ]);
          setProducts(allProducts);
          setShipCompanies(allShip);
          setCustomers(allCustomers);
          setDiscounts(allDiscounts);

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
            const firstCust = allCustomers[0];
            setSelectedCustomerId(firstCust.id.toString());
            setOrderData(prev => ({ ...prev, ShippingAddress: firstCust.address || "" }));
            setVatDetails({
              buyerName: firstCust.companyname || `${firstCust.firstname} ${firstCust.lastname}`,
              buyerAddress: (firstCust as any).invoice_address || firstCust.address || "",
              buyerTaxCode: (firstCust as any).tax_code || "",
            });
          }
          setSelectedPromotions([]);
          setShowPayment(false);
          setAmountTendered(0);
          setCreatedInvoice(null);
          setWantVAT(false);
        } catch (e) {
          console.error("Lỗi tải danh mục tạo đơn hàng:", e);
        }
      };
      loadOptions();
    }
  }, [open]);

  useEffect(() => {
    if (selectedCustomerId) {
      const cust = customers.find(c => c.id.toString() === selectedCustomerId);
      if (cust) {
        setOrderData(prev => ({ ...prev, ShippingAddress: cust.address || "" }));
        setVatDetails({
          buyerName: cust.companyname || `${cust.firstname} ${cust.lastname}`,
          buyerAddress: (cust as any).invoice_address || cust.address || "",
          buyerTaxCode: (cust as any).tax_code || "",
        });
      }
    }
  }, [selectedCustomerId]);

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
    setSelectedPromotions((prev) => [...prev, { promoID: discounts[0].id }]);
  };

  const handleRemovePromotion = (index: number) => {
    setSelectedPromotions((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, item) => {
      const prod = products.find((p) => p.ProductID === item.productID);
      return sum + (prod?.ProductPrice || 0) * item.quantity;
    }, 0);
  };

  const calculateDiscount = () => {
    return selectedPromotions.reduce((sum, item) => {
      const promo = discounts.find((d) => d.id === item.promoID);
      return sum + (promo?.value || 0);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountTotal = calculateDiscount();
    const tax = Math.round(subtotal * 0.1);
    const shipping = saleChannelCode !== 0 ? orderData.ShippingFee : 0;
    return Math.max(0, subtotal + tax + shipping - discountTotal);
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

    if (saleChannelCode === 0 && !showPayment) {
      setTotalToPay(calculateTotal());
      setShowPayment(true);
      return;
    }

    if (saleChannelCode === 0 && amountTendered < totalToPay) {
      toast.error("Số tiền khách đưa không đủ!");
      return;
    }

    setLoading(true);
    try {
      const shipCode = "SHIP" + Math.floor(Math.random() * 900000 + 100000);
      const subtotal = calculateSubtotal();
      const tax = Math.round(subtotal * 0.1);
      const discount = calculateDiscount();
      const shipping = saleChannelCode !== 0 ? orderData.ShippingFee : 0;
      const total = calculateTotal();

      const customer = customers.find(c => c.id.toString() === selectedCustomerId);

      // Prepare VAT info for invoice
      let finalBuyerName = "Khách hàng lẻ";
      let finalBuyerAddress = "Theo địa chỉ giao hàng";
      let finalBuyerTaxCode = "";

      if (saleChannelCode === 0) {
        // Offline: Auto-fill if possible
        if (customer) {
          finalBuyerName = customer.companyname || `${customer.firstname} ${customer.lastname}`;
          finalBuyerAddress = (customer as any).invoice_address || customer.address || "Theo địa chỉ giao hàng";
          finalBuyerTaxCode = (customer as any).tax_code || "";
        }
      } else {
        // Online: Use provided info if wantVAT is true
        if (wantVAT) {
          finalBuyerName = vatDetails.buyerName || (customer ? `${customer.firstname} ${customer.lastname}` : "Khách hàng lẻ");
          finalBuyerAddress = vatDetails.buyerAddress || (customer?.address || "Theo địa chỉ giao hàng");
          finalBuyerTaxCode = vatDetails.buyerTaxCode;

          // Update customer record with this tax info for future use
          if (customer) {
            await api.customers.update(customer.id, {
              ...customer,
              tax_code: finalBuyerTaxCode,
              invoice_address: finalBuyerAddress
            } as any);
          }
        } else if (customer) {
          finalBuyerName = customer.companyname || `${customer.firstname} ${customer.lastname}`;
          finalBuyerAddress = (customer as any).invoice_address || customer.address || "Theo địa chỉ giao hàng";
          finalBuyerTaxCode = (customer as any).tax_code || "";
        }
      }

      // 1. Create Invoice
      const inv = await api.invoices.create({
        CustomerID: Number(selectedCustomerId),
        EmployeeID: emp?.EmployeeID || 1,
        SaleChannelCode: saleChannelCode === 0 ? 0 : 1, 
        TotalAmount: subtotal + tax - discount, 
        TaxAmount: tax,
        FinalAmount: total,
        Status: saleChannelCode === 0 ? "Đã thanh toán" : "Chờ thanh toán",
        InvoiceDate: new Date().toISOString(),
        buyer_name: finalBuyerName,
        buyer_address: finalBuyerAddress,
        buyer_tax_code: finalBuyerTaxCode,
        tax_rate: (customer as any)?.tax_rate || 10
      } as any);

      // 2. Create Order
      const newOrder = await api.orders.create({
        customerId: Number(selectedCustomerId),
        employeeId: emp?.EmployeeID || null,
        invoiceId: inv.InvoiceID,
        shipcode: saleChannelCode !== 0 && shipCode.trim().length ? shipCode.trim() : null,
        shipcompanyId: saleChannelCode !== 0 && orderData.ShipCompanyID ? Number(orderData.ShipCompanyID) : null,
        totalamount: total,
        orderstatus: saleChannelCode === 0 ? 3 : 0, 
        shippingstatus: 0,
        shipmentnote: orderData.ShipmentNote.trim().length ? orderData.ShipmentNote.trim() : null,
        shippingfee: shipping,
        exportreceiptId: null,
      });

      // 3. Details
      await Promise.all([
        ...selectedProducts.map((item) => {
          const prod = products.find((p) => p.ProductID === item.productID);
          const price = prod?.ProductPrice || 0;
          return Promise.all([
            api.orderDetails.create({
              OrderID: newOrder.id,
              ProductID: item.productID,
              ComboID: null,
              Quantity: item.quantity,
              UnitPrice: price,
              DiscountAmount: 0,
              TotalAmount: price * item.quantity,
            }),
            api.invoiceDetails.create({
              InvoiceID: inv.InvoiceID,
              ProductID: item.productID,
              ComboID: null,
              Quantity: item.quantity,
              UnitPrice: price,
              DiscountAmount: 0,
              TotalAmount: price * item.quantity,
            })
          ]);
        }),
      ]);

      // 4. Promotions
      if (selectedPromotions.length > 0) {
        await Promise.all(
          selectedPromotions.map((item) => {
            const promo = discounts.find((d) => d.id === item.promoID);
            return api.listDiscounts.create({
              orderId: newOrder.id,
              discountId: item.promoID,
              appliedvalue: promo?.value || 0,
            });
          })
        );
      }

      // 5. Stock
      if (saleChannelCode === 0) {
        const allInventories = await api.detailInventories.list();
        const warehouseId = 1;
        for (const item of selectedProducts) {
          const invData = allInventories.find(i => i.WarehouseID === warehouseId && i.ProductID === item.productID);
          if (invData) {
            await api.detailInventories.update(warehouseId, {
              ...invData,
              AvailableStock: invData.AvailableStock - item.quantity,
              RealStock: invData.RealStock - item.quantity
            });
          }
        }
        setCreatedInvoice(inv);
        toast.success("Tạo đơn hàng và hóa đơn VAT thành công!");
      } else {
        toast.success(`Tạo đơn hàng trực tuyến thành công. Mã đơn: #${newOrder.id}`);
        onOpenChange(false);
        onSave();
      }
    } catch (e: any) {
      toast.error(e.message || "Tạo đơn hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = calculateSubtotal();
  const discountTotal = calculateDiscount();
  const tax = Math.round(subtotal * 0.1);
  const total = calculateTotal();
  const changeAmount = Math.max(0, amountTendered - totalToPay);

  if (createdInvoice) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className={cn("sm:max-w-[400px]", dialog.content)}>
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Hoàn tất đơn hàng!</h2>
                <p className="text-sm text-slate-500 mt-1">Hóa đơn VAT #{createdInvoice.InvoiceID} đã được ghi nhận.</p>
              </div>
              <div className="grid grid-cols-1 gap-2 w-full mt-4">
                <Button 
                  className={cn(btn.primary, "w-full")}
                  onClick={() => setIsPrintOpen(true)}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  In hóa đơn ngay
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    onOpenChange(false);
                    onSave();
                  }}
                >
                  Đóng & Tiếp tục
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <PrintInvoiceDialog 
          open={isPrintOpen}
          onOpenChange={(val) => {
            setIsPrintOpen(val);
            if (!val) {
              onOpenChange(false);
              onSave();
            }
          }}
          invoice={createdInvoice}
          customer={customers.find(c => c.id === Number(selectedCustomerId))}
        />
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            {saleChannelCode === 0 ? "Tạo đơn hàng tại quầy" : "Tạo đơn hàng trực tuyến"}
          </DialogTitle>
        </DialogHeader>

        {!showPayment ? (
          <div className="grid gap-6 py-2 max-h-[70vh] overflow-y-auto pr-2">
            {/* Thông tin chung */}
            <div className="grid gap-3">
              <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Thông tin khách hàng
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2 col-span-2">
                  <Label className="text-xs text-slate-500 font-medium">
                    Chọn Khách hàng
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
                
                <div className="grid gap-2 col-span-2">
                  <Label className="text-xs text-slate-500 font-medium">
                    Địa chỉ giao hàng
                  </Label>
                  <Input
                    placeholder="Nhập địa chỉ giao hàng..."
                    value={orderData.ShippingAddress}
                    onChange={(e) =>
                      setOrderData({ ...orderData, ShippingAddress: e.target.value })
                    }
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2 col-span-2">
                  <Label className="text-xs text-slate-500 font-medium">
                    Ghi chú đơn hàng (tuỳ chọn)
                  </Label>
                  <Input
                    placeholder="Giao giờ hành chính, gọi trước khi giao..."
                    value={orderData.ShipmentNote}
                    onChange={(e) =>
                      setOrderData({ ...orderData, ShipmentNote: e.target.value })
                    }
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 text-sm"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Online VAT Options */}
            {saleChannelCode !== 0 && (
              <div className="grid gap-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="wantVAT" 
                    checked={wantVAT}
                    onChange={(e) => setWantVAT(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <Label htmlFor="wantVAT" className="text-sm font-semibold text-slate-700 cursor-pointer">
                    Tôi muốn xuất hóa đơn VAT
                  </Label>
                </div>

                {wantVAT && (
                  <div className="grid gap-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-2">
                    <div className="grid gap-2">
                      <Label className="text-xs font-medium text-slate-600">Tên người mua (Công ty/Cá nhân)</Label>
                      <Input 
                        value={vatDetails.buyerName}
                        onChange={(e) => setVatDetails({...vatDetails, buyerName: e.target.value})}
                        placeholder="Công ty TNHH ABC..."
                        className="bg-white border-blue-100 h-9 text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-xs font-medium text-slate-600">Địa chỉ xuất hóa đơn</Label>
                      <Input 
                        value={vatDetails.buyerAddress}
                        onChange={(e) => setVatDetails({...vatDetails, buyerAddress: e.target.value})}
                        placeholder="Địa chỉ ghi trên hóa đơn..."
                        className="bg-white border-blue-100 h-9 text-sm"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-xs font-medium text-slate-600">Mã số thuế</Label>
                      <Input 
                        value={vatDetails.buyerTaxCode}
                        onChange={(e) => setVatDetails({...vatDetails, buyerTaxCode: e.target.value})}
                        placeholder="Nhập mã số thuế..."
                        className="bg-white border-blue-100 h-9 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

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

            {/* Khuyến mãi */}
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
                            i === index
                              ? { ...p, promoID: Number(e.target.value) }
                              : p,
                          ),
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 flex-1"
                      disabled={loading}
                    >
                      {discounts.map((promo) => (
                        <option key={promo.id} value={promo.id}>
                          {promo.discountname} (-{promo.value.toLocaleString()} đ)
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

            {/* Vận chuyển (Online Only) */}
            {saleChannelCode !== 0 && (
              <div className="grid gap-3 border-t border-slate-100 pt-4">
                <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                  Đơn vị vận chuyển và phí ship
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xs text-slate-500 font-medium">
                      Đơn vị vận chuyển
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
                </div>
              </div>
            )}

            {/* Tổng cộng */}
            <div className="mt-4 pt-4 border-t-2 border-slate-200 bg-slate-50 p-4 rounded-lg">
               <div className="flex justify-between items-center text-sm mb-1">
                 <span className="text-slate-500">Tạm tính:</span>
                 <span className="font-medium">{subtotal.toLocaleString()} đ</span>
               </div>
               <div className="flex justify-between items-center text-sm mb-1">
                 <span className="text-slate-500">Thuế (10%):</span>
                 <span className="font-medium">{tax.toLocaleString()} đ</span>
               </div>
               {discountTotal > 0 && (
                 <div className="flex justify-between items-center text-sm mb-1 text-red-600">
                   <span>Giảm giá:</span>
                   <span>-{discountTotal.toLocaleString()} đ</span>
                 </div>
               )}
               {saleChannelCode !== 0 && (
                 <div className="flex justify-between items-center text-sm mb-1">
                   <span className="text-slate-500">Phí vận chuyển:</span>
                   <span className="font-medium">{orderData.ShippingFee.toLocaleString()} đ</span>
                 </div>
               )}
               <div className="flex justify-between items-center text-lg font-bold mt-2 pt-2 border-t border-slate-200 text-blue-600">
                 <span>TỔNG CỘNG:</span>
                 <span>{total.toLocaleString()} đ</span>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 py-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid gap-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-slate-600">Tổng thanh toán:</span>
                <span className="text-blue-600 text-2xl">{totalToPay.toLocaleString()} đ</span>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-sm font-semibold text-slate-700">Số tiền khách đưa</Label>
                <div className="relative">
                  <Input 
                    type="number"
                    value={amountTendered}
                    onChange={(e) => setAmountTendered(Number(e.target.value))}
                    className="h-12 text-xl font-bold border-blue-200 focus-visible:ring-blue-600"
                    placeholder="0"
                    autoFocus
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">đ</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tiền thừa trả khách:</span>
                <span className={cn(
                  "text-xl font-bold",
                  changeAmount > 0 ? "text-green-600" : "text-slate-400"
                )}>
                  {changeAmount.toLocaleString()} đ
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[100000, 200000, 500000, 1000000].map(amt => (
                <Button 
                  key={amt}
                  variant="outline"
                  className="h-10 text-xs font-bold"
                  onClick={() => setAmountTendered(amt)}
                >
                  {amt.toLocaleString()} đ
                </Button>
              ))}
              <Button 
                variant="outline"
                className="h-10 text-xs font-bold text-blue-600 border-blue-200 col-span-2"
                onClick={() => setAmountTendered(totalToPay)}
              >
                Khách đưa đủ
              </Button>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          {showPayment ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowPayment(false)}
                disabled={loading}
              >
                Quay lại
              </Button>
              <Button
                className={cn(btn.primary, "px-8")}
                onClick={handleSubmit}
                disabled={loading || amountTendered < totalToPay}
              >
                {loading ? "Đang xử lý..." : "Xác nhận & Thanh toán"}
              </Button>
            </>
          ) : (
            <>
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
                {loading ? "Đang tạo..." : saleChannelCode === 0 ? "Tiếp tục thanh toán" : "Xác nhận tạo đơn hàng"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
