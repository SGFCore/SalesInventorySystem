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
import { NativeSelect } from "@/components/ui/native-select";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, entity, input, page, badge, dialog } from "@/pages/page-classes";
import { Loader2, Search, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Invoice, Payment, PaymentMethod } from "@/lib/types";

export default function PaymentRecordingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Modal states
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [methodId, setMethodId] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [refCode, setRefCode] = useState("");
  const [payDate, setPayDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);

  // Remaining debt logic
  const [payments, setPayments] = useState<Payment[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [invData, payData] = await Promise.all([
        api.invoices.getPending(),
        api.payments.list()
      ]);
      setInvoices(invData.sort((a,b) => b.InvoiceID - a.InvoiceID));
      setPayments(payData);
    } catch (e: any) {
      toast.error("Lỗi tải danh sách hóa đơn chờ thanh toán");
    } finally {
      setLoading(false);
    }
  };

  const loadMethods = async () => {
    try {
      const ms = await api.paymentMethods.list();
      setPaymentMethods(ms.filter(m => m.Status === 1));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
    loadMethods();
  }, []);

  const getPaidAmount = (invId: number) => {
    return payments
      .filter(p => p.InvoiceID === invId)
      .reduce((sum, p) => sum + (p.AmountPaid || 0), 0);
  };

  const getDebt = (invoice: Invoice) => {
    return (invoice.FinalAmount || 0) - getPaidAmount(invoice.InvoiceID);
  };

  const handleOpenModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setMethodId("");
    setAmount(getDebt(invoice));
    setRefCode("");
    setPayDate(new Date().toISOString().split("T")[0]);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedInvoice) return;
    if (!methodId) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Số tiền không hợp lệ");
      return;
    }

    setSaving(true);
    try {
      await api.payments.record({
        invoiceId: selectedInvoice.InvoiceID,
        paymentMethodId: Number(methodId),
        amountPaid: amount,
        referenceCode: refCode,
        paymentDate: payDate || new Date().toISOString().split("T")[0]
      });
      toast.success("Ghi nhận thanh toán thành công!");
      setIsModalOpen(false);
      loadData(); // Reload
    } catch (e: any) {
      toast.error(e.response?.data?.message || e.message || "Lỗi khi ghi nhận thanh toán");
    } finally {
      setSaving(false);
    }
  };

  const filteredInvoices = invoices.filter(inv => inv.InvoiceID.toString().includes(search.trim()));

  return (
    <div className={page.shell}>
      <div className={page.header}>
        <div className={page.searchWrap}>
          <Input
            placeholder="Tìm kiếm mã hóa đơn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={input.search}
          />
        </div>
      </div>

      <div className={page.tableWrap}>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-20 text-slate-400">Không có hóa đơn chờ thanh toán.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã HĐ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Tổng phải thu</TableHead>
                <TableHead className="text-right">Đã thu</TableHead>
                <TableHead className="text-right">Công nợ còn lại</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map(inv => {
                const paid = getPaidAmount(inv.InvoiceID);
                const debt = getDebt(inv);
                return (
                  <TableRow key={inv.InvoiceID}>
                    <TableCell className="font-bold">#{inv.InvoiceID}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(badge.base, inv.Status === "Thanh toán một phần" ? badge.info : badge.pending)}>
                        {inv.Status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{(inv.FinalAmount || 0).toLocaleString("vi-VN")} đ</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">{paid.toLocaleString("vi-VN")} đ</TableCell>
                    <TableCell className="text-right font-bold text-red-600">{debt.toLocaleString("vi-VN")} đ</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => handleOpenModal(inv)} className={btn.primary}>
                        <CreditCard className="w-4 h-4 mr-2" /> Ghi nhận
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={cn("sm:max-w-[450px] transition-none", dialog.content)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-600">
              Ghi nhận thanh toán HĐ #{selectedInvoice?.InvoiceID}
            </DialogTitle>
          </DialogHeader>

          {selectedInvoice && (
            <div className="grid gap-4 py-4">
              <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Tổng phải thu:</span>
                  <span className="font-semibold text-slate-800">{(selectedInvoice.FinalAmount || 0).toLocaleString("vi-VN")} đ</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700">Công nợ hiện tại:</span>
                  <span className="text-red-600">{getDebt(selectedInvoice).toLocaleString("vi-VN")} đ</span>
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Phương thức thanh toán <span className="text-red-500">*</span></Label>
                <NativeSelect value={methodId} onChange={e => setMethodId(e.target.value)} className="mt-1">
                  <option value="" disabled>-- Chọn --</option>
                  {paymentMethods.map(m => (
                    <option key={m.PaymentMethodID} value={m.PaymentMethodID}>{m.PaymentName}</option>
                  ))}
                </NativeSelect>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Số tiền thực thu <span className="text-red-500">*</span></Label>
                <Input 
                  type="number" 
                  min={1} 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))} 
                  className={cn(input.base, "mt-1")} 
                />
                <p className="text-[10px] text-slate-400 mt-1">Có thể nhập thấp hơn công nợ (Khách B2B).</p>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Mã giao dịch / Bút toán (Tùy chọn)</Label>
                <Input value={refCode} onChange={e => setRefCode(e.target.value)} className={cn(input.base, "mt-1")} placeholder="VD: MBBANK-123456" />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Ngày thanh toán <span className="text-red-500">*</span></Label>
                <Input type="date" value={payDate} onChange={e => setPayDate(e.target.value)} className={cn(input.base, "mt-1")} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={saving} className={btn.secondary}>Hủy</Button>
            <Button onClick={handleSave} disabled={saving || !methodId || !amount} className={btn.primary}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Xác nhận thu tiền"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
