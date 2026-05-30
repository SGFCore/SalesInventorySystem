import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect } from "@/components/ui/native-select";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, dialog, input } from "@/pages/page-classes";
import { Loader2, FileText, Building2, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Invoice, Customer } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

export function PrintInvoiceDialog({ open, onOpenChange, invoice }: Props) {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isVat, setIsVat] = useState(false);
  const [vatInfo, setVatInfo] = useState({
    taxCode: "",
    taxRate: "10", // Mặc định 10%
  });

  useEffect(() => {
    if (open && invoice) {
      loadCustomer();
    }
  }, [open, invoice]);

  const loadCustomer = async () => {
    if (!invoice?.CustomerID) return;
    try {
      const data = await api.customers.get(invoice.CustomerID);
      setCustomer(data);
      // B2B logic: Nếu có tên doanh nghiệp thì bắt buộc xuất VAT
      if (data.CompanyName && data.CompanyName.trim() !== "") {
        setIsVat(true);
      } else {
        setIsVat(false);
      }
    } catch (e) {
      console.error("Lỗi tải thông tin khách hàng", e);
    }
  };

  const handlePrint = async () => {
    if (!invoice) return;
    
    if (isVat && !vatInfo.taxCode.trim()) {
      toast.error("Vui lòng nhập Mã số thuế để xuất hóa đơn VAT");
      return;
    }

    setLoading(true);
    toast.info("Đang khởi tạo tệp PDF...");
    try {
      await api.invoices.generatePdf(invoice.InvoiceID, isVat, isVat ? vatInfo : undefined);
      toast.success("Tải báo cáo thành công!");
      onOpenChange(false);
    } catch (e: any) {
      toast.error(`Lỗi khi in hóa đơn: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isB2B = !!(customer?.CompanyName && customer?.CompanyName.trim() !== "");

  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[450px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={cn(dialog.title, "flex items-center gap-2")}>
            <FileText className="w-5 h-5 text-blue-600" />
            Tùy chọn in hóa đơn #{invoice.InvoiceID}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Thông tin khách hàng */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              {isB2B ? <Building2 className="w-4 h-4 text-blue-600" /> : <Info className="w-4 h-4 text-slate-400" />}
              <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Thông tin khách hàng</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{customer?.Fullname || "Khách lẻ"}</p>
            {isB2B && (
              <>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{customer?.CompanyName}</p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit font-bold">
                   Khách hàng B2B (Bắt buộc VAT)
                </div>
              </>
            )}
          </div>

          {/* Lựa chọn loại hóa đơn */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="vat-check" 
                checked={isVat} 
                onCheckedChange={(checked) => !isB2B && setIsVat(checked as boolean)}
                disabled={isB2B}
              />
              <Label htmlFor="vat-check" className="text-sm font-bold text-slate-700 cursor-pointer">
                Xuất hóa đơn VAT
              </Label>
            </div>

            {isVat && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="grid gap-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Mã số thuế *</Label>
                  <Input 
                    placeholder="Nhập MST..."
                    value={vatInfo.taxCode}
                    onChange={e => setVatInfo({...vatInfo, taxCode: e.target.value})}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Thuế suất (%)</Label>
                  <NativeSelect
                    value={vatInfo.taxRate}
                    onChange={e => setVatInfo({...vatInfo, taxRate: e.target.value})}
                    className="h-9 text-sm"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="8">8%</option>
                    <option value="10">10%</option>
                  </NativeSelect>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-slate-100 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 px-6">Hủy</Button>
          <Button 
            onClick={handlePrint} 
            className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Printer className="w-4 h-4 mr-2" />}
            Xác nhận & In PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
