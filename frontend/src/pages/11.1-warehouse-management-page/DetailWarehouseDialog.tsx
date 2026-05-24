import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Warehouse, Detailinventory, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

export function DetailWarehouseDialog({
  open,
  onOpenChange,
  warehouse,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState<Detailinventory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open && warehouse) {
      const loadInventory = async () => {
        setLoading(true);
        try {
          const [invList, prodList] = await Promise.all([
            api.detailInventories.list(),
            api.products.list(),
          ]);
          setInventories(invList.filter((inv) => inv.WarehouseID === warehouse.WareHouseID));
          setProducts(prodList);
        } catch (e) {
          console.error("Lỗi tải thông tin tồn kho:", e);
        } finally {
          setLoading(false);
        }
      };
      loadInventory();
    }
  }, [open, warehouse]);

  if (!warehouse) return null;

  const getProductName = (productId: number) => {
    const prod = products.find((p) => p.ProductID === productId);
    return prod ? prod.ProductName : `Sản phẩm #${productId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px] transition-none", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Chi tiết kho hàng #{warehouse.WareHouseID}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-sm pr-1">
          <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-2">
            <div>
              <Label className="text-slate-500 text-xs font-semibold">Mã kho hàng</Label>
              <p className="font-semibold text-slate-900">
                #{warehouse.WareHouseID}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs font-semibold">Trạng thái</Label>
              <p
                className={cn(
                  "font-bold text-xs mt-0.5",
                  warehouse.Status === 1 ? "text-green-600" : "text-slate-400",
                )}
              >
                {warehouse.Status === 1 ? "Đang hoạt động" : "Tạm dừng"}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-slate-500 text-xs font-semibold">Tên kho hàng</Label>
            <p className="font-bold text-base text-slate-950">
              {warehouse.WareHouseName}
            </p>
          </div>

          <div>
            <Label className="text-slate-500 text-xs font-semibold">Địa chỉ</Label>
            <p className="font-semibold text-slate-700 bg-slate-50 p-2.5 border border-slate-100 text-xs rounded-md">
              {warehouse.Address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-2">
            <div>
              <Label className="text-slate-500 text-xs font-semibold">
                Số điện thoại liên hệ
              </Label>
              <p className="font-semibold text-slate-900">
                {warehouse.ContactNumber}
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs font-semibold">Mã người quản lý</Label>
              <p className="font-semibold text-slate-900">
                #{warehouse.ManagerID}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-2">
            <div>
              <Label className="text-slate-500 text-xs font-semibold">Sức chứa tối đa</Label>
              <p className="font-bold text-blue-600">
                {warehouse.Capacity.toLocaleString("vi-VN")} đơn vị
              </p>
            </div>
            <div>
              <Label className="text-slate-500 text-xs font-semibold">
                Loại hình kho hàng
              </Label>
              <p className="font-semibold text-slate-700">
                {warehouse.WarehouseType === 1
                  ? "Kho tổng trung tâm"
                  : "Kho phân phối vệ tinh"}
              </p>
            </div>
          </div>

          {/* Tồn kho thực tế */}
          <div className="border-t border-slate-200 pt-3 mt-2">
            <Label className="text-slate-900 font-bold block mb-2">Danh sách sản phẩm tồn kho</Label>
            {loading ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-500 text-xs font-semibold">Đang tải tồn kho...</span>
              </div>
            ) : inventories.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs font-semibold bg-slate-50 border rounded-md border-dashed">
                Kho hàng đang trống hoặc chưa được nhập kho.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-md overflow-hidden bg-white max-h-[250px] overflow-y-auto">
                <Table>
                  <TableBody>
                    {inventories.map((item, idx) => (
                      <TableRow key={idx} className="border-b border-slate-100 text-xs hover:bg-slate-50">
                        <TableCell className="py-2.5 font-semibold text-slate-800">
                          {getProductName(item.ProductID)} (Mã: #{item.ProductID})
                        </TableCell>
                        <TableCell className="py-2.5 text-center text-slate-500 font-medium">
                          Vị trí: <span className="font-semibold text-slate-800">{item.StorageLocation || "Khu A"}</span>
                        </TableCell>
                        <TableCell className="py-2.5 text-right font-semibold text-blue-600">
                          Tồn thực: <span className="font-bold text-slate-900">{item.CurrentQuantity}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-none"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
