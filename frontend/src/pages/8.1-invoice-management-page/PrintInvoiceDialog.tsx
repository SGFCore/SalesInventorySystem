import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import type { Invoice, Customer } from "@/lib/types";
import { toast } from "sonner";
import { Printer, FileText } from "lucide-react";

interface PrintProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice;
  customer?: Customer;
}

export function PrintInvoiceDialog({ open, onOpenChange, invoice, customer }: PrintProps) {
  const [loading, setLoading] = useState(false);
  const [vatInfo, setVatInfo] = useState({
    taxCode: "",
    companyName: "",
    address: "",
  });

  useEffect(() => {
    if (open) {
      setVatInfo({
        taxCode: (invoice as any).buyer_tax_code || "",
        companyName: (invoice as any).buyer_name || (customer ? `${customer.firstname} ${customer.lastname}` : "Khách hàng lẻ"),
        address: (invoice as any).buyer_address || customer?.address || "Theo địa chỉ giao hàng",
      });
    }
  }, [open, customer, invoice]);

  const handlePrint = async () => {
    if (!vatInfo.companyName || !vatInfo.address) {
      toast.error("Vui lòng nhập Tên người mua và Địa chỉ xuất hóa đơn!");
      return;
    }
    setLoading(true);
    try {
      await api.invoices.generatePdf(
        invoice.InvoiceID,
        true,
        vatInfo
      );
      toast.success("Xuất hóa đơn VAT thành công!");
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.message || "Lỗi khi xuất hóa đơn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4 flex items-center gap-2">
            <Printer className="h-5 w-5 text-blue-600" />
            In hóa đơn VAT #{invoice.InvoiceID}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid gap-2">
              <Label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                Tên người mua (Công ty/Cá nhân) <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Nhập tên người mua..."
                value={vatInfo.companyName}
                onChange={(e) => setVatInfo({ ...vatInfo, companyName: e.target.value })}
                className="border-slate-200 h-10 text-sm focus-visible:ring-blue-600"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                Địa chỉ xuất hóa đơn <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Nhập địa chỉ ghi trên hóa đơn..."
                value={vatInfo.address}
                onChange={(e) => setVatInfo({ ...vatInfo, address: e.target.value })}
                className="border-slate-200 h-10 text-sm focus-visible:ring-blue-600"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs text-slate-600 font-semibold uppercase tracking-wider">
                Mã số thuế (nếu có)
              </Label>
              <Input
                placeholder="Nhập mã số thuế..."
                value={vatInfo.taxCode}
                onChange={(e) => setVatInfo({ ...vatInfo, taxCode: e.target.value })}
                className="border-slate-200 h-10 text-sm focus-visible:ring-blue-600"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic text-center px-4">
            Lưu ý: Thông tin trên sẽ được in trực tiếp lên hóa đơn VAT chính thức.
          </p>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            className={cn(btn.primary, "bg-blue-600 hover:bg-blue-700 text-white")}
            onClick={handlePrint}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Xuất PDF VAT
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
