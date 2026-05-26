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
import { Trash2, Plus, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import type { Product, Combo } from "@/lib/types";

interface EditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo: Combo | null;
  onSave: () => void;
}

interface ProductItem {
  productID: number;
  quantity: number;
}

export function EditComboDetail({ open, onOpenChange, combo, onSave }: EditProps) {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [comboPrice, setComboPrice] = useState<number>(0);

  // Danh sách các sản phẩm đang được chọn trên giao diện
  const [selectedProducts, setSelectedProducts] = useState<ProductItem[]>([]);
  // Lưu giữ danh sách sản phẩm ban đầu để tính toán diff khi lưu
  const [initialProducts, setInitialProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (open && combo) {
      const loadInitialData = async () => {
        setDataLoading(true);
        try {
          // 1. Tải danh sách tất cả sản phẩm
          const prods = await api.products.list();
          setProductList(prods);

          // 2. Tải danh sách chi tiết combo của combo hiện tại
          const allDetails = await api.comboDetails.list();
          const comboDetails = allDetails
            .filter((d) => d.comboId === combo.id)
            .map((d) => ({
              productID: d.productId,
              quantity: d.quantity,
            }));

          setSelectedProducts(comboDetails);
          setInitialProducts(JSON.parse(JSON.stringify(comboDetails)));
          setComboPrice(combo.comboprice);
        } catch (e) {
          console.error("Lỗi tải chi tiết combo để chỉnh sửa:", e);
          toast.error("Không thể tải thông tin chi tiết combo");
        } finally {
          setDataLoading(false);
        }
      };
      loadInitialData();
    }
  }, [open, combo]);

  // Thêm dòng sản phẩm mới
  const handleAddProduct = () => {
    if (productList.length === 0) return;
    // Tìm sản phẩm chưa được chọn để thêm mặc định (nếu có), nếu không chọn sản phẩm đầu tiên
    const selectedIds = selectedProducts.map((p) => p.productID);
    const availableProduct = productList.find((p) => !selectedIds.includes(p.ProductID)) || productList[0];
    
    setSelectedProducts((prev) => [
      ...prev,
      { productID: availableProduct.ProductID, quantity: 1 },
    ]);
  };

  // Xóa dòng sản phẩm (Giữ lại tối thiểu 1 dòng)
  const handleRemoveProduct = (index: number) => {
    if (selectedProducts.length === 1) {
      toast.error("Combo phải chứa ít nhất 1 sản phẩm!");
      return;
    }
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  // Cập nhật giá trị Dropdown hoặc Input Số lượng của từng sản phẩm
  const handleProductChange = (
    index: number,
    field: "productID" | "quantity",
    value: number,
  ) => {
    setSelectedProducts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  // Submit chỉnh sửa dữ liệu
  const handleSubmit = async () => {
    if (!combo) return;

    if (comboPrice <= 0) {
      toast.error("Vui lòng nhập giá bán combo hợp lệ!");
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error("Vui lòng thêm ít nhất một sản phẩm vào combo!");
      return;
    }

    // Kiểm tra tính hợp lệ của số lượng
    const hasInvalidQuantity = selectedProducts.some((p) => p.quantity <= 0);
    if (hasInvalidQuantity) {
      toast.error("Số lượng của từng sản phẩm phải lớn hơn hoặc bằng 1!");
      return;
    }

    // Kiểm tra trùng lặp sản phẩm
    const productIds = selectedProducts.map((p) => p.productID);
    const hasDuplicate = productIds.some((id, idx) => productIds.indexOf(id) !== idx);
    if (hasDuplicate) {
      toast.error("Không được chọn trùng lặp sản phẩm trong cùng một combo!");
      return;
    }

    setLoading(true);
    try {
      // 1. Cập nhật giá bán combo
      await api.combos.update(combo.id, {
        id: combo.id,
        comboprice: comboPrice,
      });

      // 2. Tính toán diff cho combo details
      // A. Các sản phẩm cần xóa: có trong initial nhưng không có trong selected
      const toDelete = initialProducts.filter(
        (init) => !selectedProducts.some((sel) => sel.productID === init.productID)
      );

      // B. Các sản phẩm cần thêm mới: có trong selected nhưng không có trong initial
      const toCreate = selectedProducts.filter(
        (sel) => !initialProducts.some((init) => init.productID === sel.productID)
      );

      // C. Các sản phẩm cần cập nhật số lượng: có trong cả hai nhưng số lượng khác nhau
      const toUpdate = selectedProducts.filter((sel) => {
        const matchingInit = initialProducts.find((init) => init.productID === sel.productID);
        return matchingInit && matchingInit.quantity !== sel.quantity;
      });

      // 3. Thực hiện các API calls song song cho phần chi tiết combo
      await Promise.all([
        // Xóa các chi tiết cũ
        ...toDelete.map((item) =>
          api.comboDetails.delete(combo.id, item.productID)
        ),
        // Thêm chi tiết mới
        ...toCreate.map((item) =>
          api.comboDetails.create({
            comboId: combo.id,
            productId: item.productID,
            quantity: item.quantity,
          })
        ),
        // Cập nhật chi tiết hiện có
        ...toUpdate.map((item) =>
          api.comboDetails.update(combo.id, item.productID, {
            comboId: combo.id,
            productId: item.productID,
            quantity: item.quantity,
          })
        ),
      ]);

      toast.success("Cập nhật thông tin combo và chi tiết thành công!");
      onOpenChange(false);
      onSave();
    } catch (error: any) {
      toast.error(error.message || "Cập nhật combo thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chỉnh sửa gói combo (Mã: {combo?.id})
          </DialogTitle>
        </DialogHeader>

        {dataLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-medium">Đang tải dữ liệu combo...</span>
          </div>
        ) : (
          <div className={dialog.body}>
            {/* Nhập Giá bán combo */}
            <div className="grid gap-2">
              <Label htmlFor="editComboPrice">
                Giá bán Combo (đ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="editComboPrice"
                type="number"
                value={comboPrice}
                onChange={(e) => setComboPrice(Number(e.target.value))}
                placeholder="Nhập tổng giá gói..."
                className={dialog.input}
                disabled={loading}
              />
            </div>

            <div className="border-t border-slate-100 pt-4 mt-2">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-slate-900 font-bold">
                  Danh sách sản phẩm thuộc Combo{" "}
                  <span className="text-red-500">*</span>
                </Label>
              </div>

              {/* Danh sách các dòng sản phẩm động */}
              <div className="grid gap-3">
                {selectedProducts.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
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
                        className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-sm h-9 w-full"
                        disabled={loading}
                      >
                        {productList.map((prod) => (
                          <option key={prod.ProductID} value={prod.ProductID}>
                            {prod.ProductName} (#{prod.ProductID})
                          </option>
                        ))}
                      </NativeSelect>
                    </div>

                    {/* Input nhập số lượng */}
                    <div className="w-20">
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
                        className="border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0 h-9"
                        disabled={loading}
                      />
                    </div>

                    {/* Nút xóa dòng sản phẩm (bị disabled nếu chỉ còn 1 dòng) */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedProducts.length === 1 || loading}
                      onClick={() => handleRemoveProduct(index)}
                      className="text-red-500 hover:bg-red-50 border-slate-200 h-9 w-9 p-0 flex items-center justify-center disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Nút thêm sản phẩm mới vào danh sách */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddProduct}
                disabled={loading || productList.length === 0}
                className="text-blue-600 border-blue-200 hover:bg-blue-50 mt-4 w-full flex items-center justify-center gap-1"
              >
                <Plus className="h-4 w-4" /> Thêm sản phẩm
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
            disabled={loading || dataLoading}
          >
            Hủy
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={loading || dataLoading}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
