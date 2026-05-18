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
import type { DetailInventory, Warehouse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { btn } from "@/pages/page-classes";
import { dialog } from "@/pages/page-classes";

// Mock dữ liệu tồn kho chi tiết cho mục đích hiển thị mẫu prototype
const MOCK_INVENTORY_DETAILS: DetailInventory[] = Array.from(
  { length: 60 },
  (_, i) => {
    const warehouseId = 100 + (i % 25); // Phân bổ đều vào các kho từ 100 đến 124
    const minStock = 50 + (i % 5) * 20; // 50, 70, 90, 110, 130
    // Tạo tình huống thiếu hụt ngẫu nhiên bằng cách gán số lượng nhỏ hơn mức tối thiểu
    const currentQuantity = i % 3 === 0 ? minStock - 15 : minStock + 40;

    return {
      WarehouseID: warehouseId,
      ProductID: 5000 + i,
      CurrentQuantity: currentQuantity,
      RealStock: currentQuantity + 5,
      AvailableStock: currentQuantity,
      MinStock: minStock,
      MaxStock: minStock * 3,
      IsAlertEnabled: 1,
      StorageLocation: `Khuên ${String.fromCharCode(65 + (i % 4))}-${i % 10}`,
    };
  },
);

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
  if (!warehouse) return null;

  // Lọc ra các vật tư thuộc kho hàng hiện tại
  const inventoryData = MOCK_INVENTORY_DETAILS.filter(
    (item) => item.WarehouseID === warehouse.WareHouseID,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[800px] max-h-[85vh]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Báo cáo thiếu hụt vật tư - {warehouse.WareHouseName}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-b border-slate-200">
                  <TableHead className="font-semibold text-slate-700">
                    Mã sản phẩm
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Vị trí lưu trữ
                  </TableHead>
                  <TableHead className="font-semibold text-right text-slate-700">
                    Tồn thực tế
                  </TableHead>
                  <TableHead className="font-semibold text-right text-slate-700">
                    Hiện tại
                  </TableHead>
                  <TableHead className="font-semibold text-right text-slate-700">
                    Mức tối thiểu
                  </TableHead>
                  <TableHead className="font-semibold text-center text-slate-700">
                    Tình trạng
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-slate-400"
                    >
                      Không tìm thấy dữ liệu tồn kho cho kho hàng này.
                    </TableCell>
                  </TableRow>
                ) : (
                  inventoryData.map((item) => {
                    const isShortage = item.CurrentQuantity < item.MinStock;
                    return (
                      <TableRow
                        key={item.ProductID}
                        className={cn(
                          "border-b border-slate-100 transition-none",
                          isShortage
                            ? "bg-red-50 hover:bg-red-50 text-red-600 font-medium"
                            : "hover:bg-slate-50",
                        )}
                      >
                        <TableCell>{item.ProductID}</TableCell>
                        <TableCell>{item.StorageLocation}</TableCell>
                        <TableCell className="text-right">
                          {item.RealStock}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {item.CurrentQuantity}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.MinStock}
                        </TableCell>
                        <TableCell className="text-center">
                          {isShortage ? (
                            <span className="bg-red-200 text-red-800 px-2 py-0.5 text-xs font-bold uppercase">
                              Thiếu hụt
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">
                              An toàn
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

        <DialogFooter>
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
