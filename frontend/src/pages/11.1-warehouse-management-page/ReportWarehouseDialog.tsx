import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Detailinventory, Warehouse, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn } from "@/pages/page-classes";
import { dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

export function ReportWarehouseDialog({
  open,
  onOpenChange,
  warehouse,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState<Detailinventory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open && warehouse) {
      const loadData = async () => {
        setLoading(true);
        try {
          const [invList, prodList] = await Promise.all([
            api.detailInventories.list(),
            api.products.list(),
          ]);
          setInventories(invList.filter((item) => item.WarehouseID === warehouse.WareHouseID));
          setProducts(prodList);
        } catch (e) {
          console.error("Lỗi lấy báo cáo thiếu hụt:", e);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [open, warehouse]);

  if (!warehouse) return null;

  const getProductName = (productId: number) => {
    const prod = products.find((p) => p.ProductID === productId);
    return prod ? prod.ProductName : `Sản phẩm #${productId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[800px] max-h-[85vh]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Báo cáo thiếu hụt vật tư - {warehouse.WareHouseName}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-red-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tạo báo cáo thiếu hụt...</span>
          </div>
        ) : (
          <div className="py-2 max-h-[60vh] overflow-y-auto pr-1">
            <div className="border border-slate-200 overflow-hidden rounded-md bg-white">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-b border-slate-200">
                    <TableHead className="font-bold text-slate-700 text-xs">
                      Tên sản phẩm (Mã)
                    </TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs">
                      Vị trí lưu trữ
                    </TableHead>
                    <TableHead className="font-bold text-right text-slate-700 text-xs">
                      Tồn tối thiểu (Min)
                    </TableHead>
                    <TableHead className="font-bold text-right text-slate-700 text-xs">
                      Tồn hiện tại
                    </TableHead>
                    <TableHead className="font-bold text-center text-slate-700 text-xs">
                      Tình trạng
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-slate-400 font-semibold text-xs"
                      >
                        Không tìm thấy dữ liệu tồn kho cho kho hàng này.
                      </TableCell>
                    </TableRow>
                  ) : (
                    inventories.map((item) => {
                      const isShortage = item.CurrentQuantity < item.MinStock;
                      return (
                        <TableRow
                          key={item.ProductID}
                          className={cn(
                            "border-b border-slate-100 transition-none text-xs",
                            isShortage
                              ? "bg-red-50 hover:bg-red-50 text-red-600 font-semibold"
                              : "hover:bg-slate-50 text-slate-700",
                          )}
                        >
                          <TableCell className="font-semibold py-3">
                            {getProductName(item.ProductID)} (Mã: #{item.ProductID})
                          </TableCell>
                          <TableCell className="py-3 font-medium">{item.StorageLocation || "Chưa gán vị trí"}</TableCell>
                          <TableCell className="text-right py-3 font-semibold text-slate-900">
                            {item.MinStock}
                          </TableCell>
                          <TableCell className="text-right py-3 font-bold">
                            {item.CurrentQuantity}
                          </TableCell>
                          <TableCell className="text-center py-3">
                            {isShortage ? (
                              <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 text-[10px] font-bold rounded">
                                THIẾU HỤT
                              </span>
                            ) : (
                              <span className="bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 text-[10px] font-bold rounded">
                                AN TOÀN
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            className={btn.primary}
            onClick={() => onOpenChange(false)}
          >
            Đóng báo cáo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
