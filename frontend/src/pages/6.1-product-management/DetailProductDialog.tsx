import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Product } from "@/lib/types";

interface DetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function DetailProductDialog({
  open,
  onOpenChange,
  product,
}: DetailProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white border-none max-h-[90vh] overflow-y-auto(1)">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Chi tiết sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Mã sản phẩm</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {product.ProductID}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Tên sản phẩm</Label>
            <span className="col-span-2 font-bold text-slate-900">
              {product.ProductName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Danh mục</Label>
            <span className="col-span-2 text-slate-900">
              {product.CategoryName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Loại sản phẩm</Label>
            <span className="col-span-2 text-slate-900">
              {product.ProductTypeName}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Giá bán</Label>
            <span className="col-span-2 font-bold text-blue-600">
              {product.ProductPrice.toLocaleString("vi-VN")} đ
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Cho phép đổi trả</Label>
            <span className="col-span-2 text-slate-900">
              {product.AllowReturn === 1 ? "Có hỗ trợ" : "Không hỗ trợ"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 items-start border-b border-slate-100 pb-2">
            <Label className="text-slate-500">Trạng thái</Label>
            <span className="col-span-2 font-medium text-slate-900">
              {product.ProductStatus === 1 ? (
                <span className="text-green-600">Đang kinh doanh</span>
              ) : (
                <span className="text-red-500">Đã ngừng kinh doanh</span>
              )}
            </span>
          </div>

          <div className="grid gap-2">
            <Label className="text-slate-500">Mô tả chi tiết</Label>
            <p className="bg-slate-50 p-3 rounded-md text-slate-700 leading-relaxed text-xs border border-slate-100">
              {product.Detail || "Chưa có mô tả chi tiết."}
            </p>
          </div>
        </div>

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
