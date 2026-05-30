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
import { NativeSelect } from "@/components/ui/native-select";
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
  const [printType, setPrintType] = useState<"standard" | "vat">("standard");
  const [vatInfo, setVatInfo] = useState({
    taxCode: "",
    discount: 0,
    companyName: "",
    address: "",
  });

  const isB2B = !!(customer?.companyname && customer.companyname.trim().length > 0);

  useEffect(() => {
    if (open) {
      if (isB2B) {
        setPrintType("vat");
      } else {
        setPrintType("standard");
      }
      setVatInfo({
        taxCode: "",
        discount: 0,
        companyName: customer?.companyname || "",
        address: customer?.address || "",
      });
    }
  }, [open, isB2B, customer]);

  const handlePrint = async () => {
    setLoading(true);
    try {
      const isVat = printType === "vat";
      await api.invoices.generatePdf(
        invoice.InvoiceID,
        isVat,
        isVat ? vatInfo : undefined
      );
      toast.success("Xuất hóa đơn thành công!");
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
            In hóa đơn #{invoice.InvoiceID}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Loại hóa đơn
            </Label>
            <NativeSelect
              value={printType}
              onChange={(e) => setPrintType(e.target.value as "standard" | "vat")}
              className="border-slate-200 focus-visible:ring-blue-600 h-10"
              disabled={isB2B || loading}
            >
              {!isB2B && <option value="standard">Hóa đơn thường</option>}
              <option value="vat">Hóa đơn VAT</option>
            </NativeSelect>
            {isB2B && (
              <p className="text-[11px] text-amber-600 font-medium">
                * Khách hàng doanh nghiệp: Mặc định in hóa đơn VAT.
              </p>
            )}
          </div>

          {printType === "vat" && (
            <div className="grid gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid gap-2">
                <Label className="text-xs text-slate-600 font-medium">
                  Tên doanh nghiệp
                </Label>
                <Input
                  value={vatInfo.companyName}
                  readOnly
                  className="bg-slate-100 border-slate-200 h-9 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-600 font-medium">
                  Địa chỉ
                </Label>
                <Input
                  value={vatInfo.address}
                  readOnly
                  className="bg-slate-100 border-slate-200 h-9 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-600 font-medium">
                  Mã số thuế
                </Label>
                <Input
                  placeholder="Nhập mã số thuế..."
                  value={vatInfo.taxCode}
                  onChange={(e) => setVatInfo({ ...vatInfo, taxCode: e.target.value })}
                  className="border-slate-200 h-9 text-sm focus-visible:ring-blue-600"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs text-slate-600 font-medium">
                  Chiết khấu hóa đơn (đ)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={vatInfo.discount}
                  onChange={(e) => setVatInfo({ ...vatInfo, discount: Number(e.target.value) })}
                  className="border-slate-200 h-9 text-sm focus-visible:ring-blue-600"
                />
              </div>
            </div>
          )}
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
                Xuất PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
