import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Combo, ComboDetail, Product } from "@/lib/types";
import { dialog } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo: Combo | null;
}

export function DetailComboDialog({ open, onOpenChange, combo }: DetailProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<ComboDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (open && combo) {
      const loadDetailData = async () => {
        setLoading(true);
        try {
          const [detailsList, prods] = await Promise.all([
            api.comboDetails.list(),
            api.products.list(),
          ]);
          setDetails(detailsList.filter((d) => d.ComboID === combo.ComboID));
          setProducts(prods);
        } catch (e) {
          console.error("Lỗi tải chi tiết combo:", e);
        } finally {
          setLoading(false);
        }
      };
      loadDetailData();
    }
  }, [open, combo]);

  if (!combo) return null;

  const getProductName = (productId: number) => {
    const prod = products.find((p) => p.ProductID === productId);
    return prod ? prod.ProductName : `Sản phẩm #${productId}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Chi tiết gói sản phẩm (Combo)
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải chi tiết combo...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-4 text-sm">
            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500">Mã Combo</Label>
              <span className="col-span-2 font-medium text-slate-900">
                {combo.ComboID}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
              <Label className="text-slate-500">Giá bán gốc combo</Label>
              <span className="col-span-2 font-bold text-blue-600">
                {combo.ComboPrice.toLocaleString("vi-VN")} đ
              </span>
            </div>

            {/* Danh sách sản phẩm thành phần bên trong Combo */}
            <div className="grid gap-2 mt-2">
              <Label className="text-slate-500">Sản phẩm trong gói</Label>
              <div className="border border-slate-100 rounded-md overflow-hidden">
                <Table>
                  <TableBody>
                    {details.length > 0 ? (
                      details.map((item, idx) => (
                        <TableRow key={idx} className="border-b border-slate-50">
                          <TableCell className="py-2 text-xs font-medium text-slate-700">
                            {getProductName(item.ProductID)}
                          </TableCell>
                          <TableCell className="py-2 text-xs text-right text-slate-600">
                            Số lượng:{" "}
                            <span className="font-bold">{item.Quantity}</span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="py-3 text-center text-xs text-slate-400">
                          Không có sản phẩm nào thuộc combo này.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white w-24"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
