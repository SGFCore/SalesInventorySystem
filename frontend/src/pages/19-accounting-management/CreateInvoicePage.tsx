import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, entity, input, page, dialog } from "@/pages/page-classes";
import { Loader2, Search, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NativeSelect } from "@/components/ui/native-select";
import type { Order } from "@/lib/types";

export default function CreateInvoicePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const [invoiceType, setInvoiceType] = useState<"NORMAL" | "VAT">("NORMAL");
  const [vatInfo, setVatInfo] = useState({
    taxId: "",
    companyName: "",
    address: "",
    taxRate: "10"
  });
  const [generating, setGenerating] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      // Fetching completed orders (orderstatus = 3)
      const res = await api.orders.list(); // Or use specific endpoint if available, but list is fine with filter
      const completed = res.filter(o => o.orderstatus === 3);
      setOrders(completed.sort((a,b) => b.id - a.id));
    } catch (e: any) {
      toast.error(e.message || "Lỗi tải danh sách đơn hàng hoàn thành");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setInvoiceType("NORMAL");
    setVatInfo({ taxId: "", companyName: "", address: "", taxRate: "10" });
    setIsModalOpen(true);
  };

  const handleGeneratePdf = async () => {
    if (!selectedOrder || !selectedOrder.invoiceId) {
      toast.error("Đơn hàng này chưa có hóa đơn hệ thống để xuất PDF.");
      return;
    }
    
    if (invoiceType === "VAT" && (!vatInfo.taxId || !vatInfo.companyName)) {
      toast.error("Vui lòng điền mã số thuế và tên công ty");
      return;
    }

    setGenerating(true);
    try {
      await api.invoices.generatePdf(
        selectedOrder.invoiceId, 
        invoiceType === "VAT", 
        invoiceType === "VAT" ? vatInfo : undefined
      );
      toast.success("Xuất hóa đơn thành công!");
      setIsModalOpen(false);
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi xuất hóa đơn");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className="text-lg font-bold text-slate-800">Lập hóa đơn cho đơn hàng</div>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-slate-400">Không có đơn hàng nào chờ xuất hóa đơn.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Mã Hóa đơn (Hệ thống)</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(o => (
                <TableRow key={o.id}>
                  <TableCell className="font-bold">#{o.id}</TableCell>
                  <TableCell>{o.invoiceId ? `#${o.invoiceId}` : "Chưa có"}</TableCell>
                  <TableCell className="text-right font-semibold text-blue-600">{(o.totalamount || 0).toLocaleString("vi-VN")} đ</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      onClick={() => handleOpenModal(o)}
                      disabled={!o.invoiceId}
                      className={btn.primary}
                    >
                      <FileText className="w-4 h-4 mr-2" /> Lập hóa đơn
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={cn("sm:max-w-[450px] transition-none", dialog.content)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-600">
              Xuất hóa đơn cho ĐH #{selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div>
              <Label className="text-xs font-semibold text-slate-500 mb-2 block">Loại hóa đơn</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input type="radio" name="invType" value="NORMAL" checked={invoiceType === "NORMAL"} onChange={() => setInvoiceType("NORMAL")} className="w-4 h-4 text-blue-600" />
                  Hóa đơn bán hàng
                </label>
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input type="radio" name="invType" value="VAT" checked={invoiceType === "VAT"} onChange={() => setInvoiceType("VAT")} className="w-4 h-4 text-blue-600" />
                  Hóa đơn VAT
                </label>
              </div>
            </div>

            {invoiceType === "VAT" && (
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200 grid gap-3">
                <div className="text-xs text-orange-600 font-semibold mb-1">* Thông tin tạm thời (Không lưu CSDL)</div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Mã số thuế</Label>
                  <Input value={vatInfo.taxId} onChange={e => setVatInfo({...vatInfo, taxId: e.target.value})} className={cn(input.base, "mt-1")} />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Tên công ty</Label>
                  <Input value={vatInfo.companyName} onChange={e => setVatInfo({...vatInfo, companyName: e.target.value})} className={cn(input.base, "mt-1")} />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Địa chỉ</Label>
                  <Input value={vatInfo.address} onChange={e => setVatInfo({...vatInfo, address: e.target.value})} className={cn(input.base, "mt-1")} />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Thuế suất VAT (%)</Label>
                  <NativeSelect value={vatInfo.taxRate} onChange={e => setVatInfo({...vatInfo, taxRate: e.target.value})} className="mt-1">
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="8">8%</option>
                    <option value="10">10%</option>
                  </NativeSelect>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={generating} className={btn.secondary}>Hủy</Button>
            <Button onClick={handleGeneratePdf} disabled={generating} className={btn.primary}>
              {generating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
              Xuất PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
