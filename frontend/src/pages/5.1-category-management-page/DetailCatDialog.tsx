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
import { FolderTree, Layers } from "lucide-react";
import React from "react";
import type { Category, Producttype } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  productTypes: Producttype[];
}

export function DetailCatDialog({ open, onOpenChange, category, productTypes }: Props) {
  if (!category) return null;

  const filteredTypes = productTypes.filter(t => t.categoryid === category.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <FolderTree className="w-5 h-5" />
            </div>
            <DialogTitle className={dialog.title}>
              Chi tiết danh mục sản phẩm
            </DialogTitle>
          </div>
          <p className="text-sm font-bold text-slate-900 mt-1">
            Danh mục: <span className="text-blue-600">{category.categoryname}</span>
          </p>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              Các loại sản phẩm thuộc danh mục này ({filteredTypes.length})
            </span>
          </div>

          <div className="border rounded-lg overflow-hidden border-slate-200 bg-white">
            <div className="max-h-[350px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-slate-50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="text-[10px] font-bold uppercase w-24">Mã Loại</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase">Tên loại sản phẩm</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTypes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-10 text-slate-400 italic text-sm">
                        Chưa có loại sản phẩm nào thuộc danh mục này.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTypes.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium text-slate-500 text-xs w-24">#{t.id}</TableCell>
                        <TableCell className="font-bold text-slate-700 text-sm">{t.producttypename}</TableCell>
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
