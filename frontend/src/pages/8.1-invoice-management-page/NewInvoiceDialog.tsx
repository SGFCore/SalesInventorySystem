import React, { useState } from "react";
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
import { Trash2, Plus, Search, UserPlus } from "lucide-react";
import { NewCustomerDialog } from "@/pages/4-customer-management-page/NewCustomerDialog";
import type { Customer } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";

interface NewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock Data
const MOCK_CUSTOMERS: Customer[] = [
  {
    CustomerID: 301,
    CustomerTypeID: 1,
    FirstName: "Nguyễn",
    LastName: "Văn A",
    CompanyName: "",
    Phone: "0901234567",
    Address: "Hà Nội",
    Email: "a@gmail.com",
    CreatedDate: new Date(),
    TotalAccumulatedSpent: 0,
  },
  {
    CustomerID: 302,
    CustomerTypeID: 1,
    FirstName: "Trần",
    LastName: "Thị B",
    CompanyName: "",
    Phone: "0987654321",
    Address: "HCM",
    Email: "b@gmail.com",
    CreatedDate: new Date(),
    TotalAccumulatedSpent: 0,
  },
];

const MOCK_PRODUCTS = [
  { ProductID: 201, ProductName: "Sản phẩm A", Price: 150000 },
  { ProductID: 202, ProductName: "Sản phẩm B", Price: 200000 },
];

const MOCK_PROMOTIONS = [
  { PromoID: 1, PromoName: "Giảm giá 10% (Tối đa 50k)" },
  { PromoID: 2, PromoName: "Freeship đơn từ 200k" },
];

export function NewInvoiceDialog({ open, onOpenChange }: NewProps) {
  // States Customer Search
  const [phoneSearch, setPhoneSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);

  // States Invoice Data
  const [invoiceData, setInvoiceData] = useState({
    SaleChannelCode: "0",
    Status: "0",
    EmployeeID: "101",
  });

  // States Dynamic Lists
  const [selectedProducts, setSelectedProducts] = useState([
    { productID: MOCK_PRODUCTS[0].ProductID, quantity: 1 },
  ]);
  const [selectedPromotions, setSelectedPromotions] = useState<
    { promoID: number }[]
  >([]);

  // Actions
  const handleSearchCustomer = () => {
    const cust = MOCK_CUSTOMERS.find((c) => c.Phone === phoneSearch.trim());
    if (cust) {
      setSelectedCustomer(cust);
    } else {
      alert("Không tìm thấy khách hàng. Vui lòng tạo mới!");
      setSelectedCustomer(null);
    }
  };

  const handleAddProduct = () => {
    setSelectedProducts((prev) => [
      ...prev,
      { productID: MOCK_PRODUCTS[0].ProductID, quantity: 1 },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    if (selectedProducts.length === 1) return;
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPromotion = () => {
    setSelectedPromotions((prev) => [
      ...prev,
      { promoID: MOCK_PROMOTIONS[0].PromoID },
    ]);
  };

  const handleRemovePromotion = (index: number) => {
    setSelectedPromotions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedCustomer) {
      alert("Vui lòng chọn khách hàng!");
      return;
    }
    const finalData = {
      Customer: selectedCustomer,
      InvoiceInfo: invoiceData,
      Products: selectedProducts,
      Promotions: selectedPromotions,
    };
    console.log("Dữ liệu tạo hóa đơn gửi đi:", finalData);
    onOpenChange(false);
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

          <div className="grid gap-6 py-2">
            {/* 1. Khu vực Khách hàng */}
            <div className="grid gap-3">
              <Label className="text-blue-600 font-bold uppercase text-xs tracking-wider">
                Thông tin khách hàng
              </Label>
              <div className="flex items-end gap-2">
                <div className="grid gap-2 flex-1">
                  <Label
                    htmlFor="phoneSearch"
                    className="text-xs text-slate-500"
                  >
                    Tra cứu SĐT
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="phoneSearch"
                      placeholder="Nhập SĐT..."
                      value={phoneSearch}
                      onChange={(e) => setPhoneSearch(e.target.value)}
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9"
                    />
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 h-9 px-3"
                      onClick={handleSearchCustomer}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 h-9"
                  onClick={() => setIsNewCustomerOpen(true)}
                >
                  Tạo mới
                </Button>
              </div>

              {selectedCustomer && (
                <div className="bg-slate-50 border border-slate-200 p-3 text-sm mt-2">
                  <p>
                    <span className="text-slate-500">Họ Tên:</span>{" "}
                    <strong className="text-slate-900">
                      {selectedCustomer.FirstName} {selectedCustomer.LastName}
                    </strong>
                  </p>
                  <p>
                    <span className="text-slate-500">SĐT:</span>{" "}
                    <strong className="text-slate-900">
                      {selectedCustomer.Phone}
                    </strong>
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
                    value={invoiceData.SaleChannelCode}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        SaleChannelCode: e.target.value,
                      })
                    }
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
                  >
                    <option value="0">Tại quầy</option>
                    <option value="1">Mạng xã hội / Online</option>
                  </NativeSelect>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs text-slate-500">Trạng thái</Label>
                  <NativeSelect
                    value={invoiceData.Status}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, Status: e.target.value })
                    }
                    className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9"
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
                            i === index
                              ? { ...p, productID: Number(e.target.value) }
                              : p,
                          ),
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 flex-1"
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
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9 w-20"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedProducts.length === 1}
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
                  className="text-slate-600 border-dashed border-slate-300 mt-2 h-8 w-full"
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
                            i === index
                              ? { ...p, promoID: Number(e.target.value) }
                              : p,
                          ),
                        )
                      }
                      className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 flex-1"
                    >
                      {MOCK_PROMOTIONS.map((promo) => (
                        <option key={promo.PromoID} value={promo.PromoID}>
                          {promo.PromoName}
                        </option>
                      ))}
                    </NativeSelect>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemovePromotion(index)}
                      className="text-red-500 border-slate-200 h-9 w-9 p-0 flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddPromotion}
                  className="text-slate-600 border-dashed border-slate-300 mt-1 h-8 w-full"
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
            >
              Hủy
            </Button>
            <Button
              className={btn.primary}
              onClick={handleSubmit}
            >
              Tạo Hóa Đơn
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
