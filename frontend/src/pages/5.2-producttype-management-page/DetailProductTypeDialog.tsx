import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { btn, dialog } from "@/pages/page-classes";
import { Layers, Package } from "lucide-react";
import React from "react";
import type { Producttype, Product } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: Producttype | null;
  products: Product[];
}

export function DetailProductTypeDialog({ open, onOpenChange, productType, products }: Props) {
  if (!productType) return null;

  const filteredProducts = products.filter(p => p.ProductTypeID === productType.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Layers className="w-5 h-5" />
            </div>
            <DialogTitle className={dialog.title}>
              Chi tiết loại sản phẩm
            </DialogTitle>
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1">
            Loại: <span className="text-blue-600">{productType.producttypename}</span>
          </p>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              Danh sách sản phẩm thuộc loại này ({filteredProducts.length})
            </span>
          </div>

          <div className="border rounded-lg overflow-hidden border-slate-200 bg-white">
            <div className="max-h-[350px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-slate-50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase">Mã SP</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase">Tên sản phẩm</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase text-right">Giá bán</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-10 text-slate-400 italic text-sm">
                        Chưa có sản phẩm nào thuộc loại này.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((p) => (
                      <TableRow key={p.ProductID}>
                        <TableCell className="font-medium text-slate-500 text-xs w-20">#{p.ProductID}</TableCell>
                        <TableCell className="font-bold text-slate-700 text-sm">{p.ProductName}</TableCell>
                        <TableCell className="text-right font-bold text-blue-600">
                          {p.ProductPrice.toLocaleString("vi-VN")} đ
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-100 pt-4">
          <Button
            className={cn(btn.primary, "px-8")}
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
