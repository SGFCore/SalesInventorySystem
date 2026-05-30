import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import type { Transferticket, Transferticketdetail, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dialog } from "@/pages/page-classes";
import { Loader2, Package, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: Transferticket | null;
  sourceName: string;
  destName: string;
}

export function DetailTransferTicketDialog({ open, onOpenChange, ticket, sourceName, destName }: Props) {
  const [details, setDetails] = useState<Transferticketdetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && ticket) {
      loadDetails();
    }
  }, [open, ticket]);

  const loadDetails = async () => {
    setLoading(true);
    try {
      const [detailData, productData] = await Promise.all([
        api.transferTicketDetails.list(),
        api.products.list()
      ]);
      setDetails(detailData.filter(d => d.TransferID === ticket?.TransferID));
      setProducts(productData);
    } catch (e) {
      console.error("Lỗi tải chi tiết phiếu luân chuyển:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[650px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={cn(dialog.title, "flex items-center gap-2")}>
            Chi tiết phiếu luân chuyển #{ticket.TransferID}
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <span className="font-bold text-slate-700">{sourceName}</span>
            <ArrowRight className="w-3 h-3" />
            <span className="font-bold text-blue-600">{destName}</span>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="border rounded-md overflow-hidden border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="text-xs uppercase font-bold text-slate-600">Sản phẩm</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-slate-600 text-center">SL Xuất</TableHead>
                  <TableHead className="text-xs uppercase font-bold text-slate-600 text-center">SL Thực nhận</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10">
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Đang tải chi tiết...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : details.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-10 text-slate-400">
                      Không có chi tiết sản phẩm.
                    </TableCell>
                  </TableRow>
                ) : (
                  details.map((item, idx) => {
                    const product = products.find(p => p.ProductID === item.ProductID);
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700 text-sm">{product?.ProductName || `SP #${item.ProductID}`}</span>
                            <span className="text-[10px] text-slate-400">Mã: #{item.ProductID}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-slate-600">
                          {item.ExportQuantity || 0}
                        </TableCell>
                        <TableCell className="text-center font-bold text-blue-600">
                          {item.ReceiveQuantity || 0}
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
          <Button variant="outline" onClick={() => onOpenChange(false)} className="min-w-[100px]">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
