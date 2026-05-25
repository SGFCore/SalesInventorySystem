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
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import type { Order, ReturnPolicy, OrderDetail, Product } from "@/lib/types";
import { btn, dialog } from "@/pages/page-classes";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useEmp } from "@/context/empContext";

interface ReturnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onSave: () => void;
}

export function ReturnProductDialog({
  open,
  onOpenChange,
  order,
  onSave,
}: ReturnProps) {
  const { emp } = useEmp();
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [policies, setPolicies] = useState<ReturnPolicy[]>([]);

  useEffect(() => {
    if (open && order) {
      const loadData = async () => {
        setLoading(true);
        try {
          const [detailsList, prodsList, polList] = await Promise.all([
            api.orderDetails.list(),
            api.products.list(),
            api.returnPolicies.list(),
          ]);
          setOrderDetails(detailsList.filter((d) => d.OrderID === order.id));
          setProducts(prodsList);
          setPolicies(polList.filter((p) => p.IsActive === 1));
        } catch (e) {
          console.error("Lỗi lấy dữ liệu trả hàng:", e);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [open, order]);

  const handleToggleProduct = (productId: number) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const getProductName = (prodId: number) => {
    const prod = products.find((p) => p.ProductID === prodId);
    return prod ? prod.ProductName : `Sản phẩm #${prodId}`;
  };

  const getProductPrice = (prodId: number) => {
    const detail = orderDetails.find((d) => d.ProductID === prodId);
    return detail ? detail.UnitPrice : 0;
  };

  const getProductQty = (prodId: number) => {
    const detail = orderDetails.find((d) => d.ProductID === prodId);
    return detail ? detail.Quantity : 0;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Update order status to 5 (Đổi/trả)
      await api.orders.update(order.id, {
        ...order,
        orderstatus: 5,
      });

      // 2. Compute Refund Amount
      let refundSum = 0;
      selectedProductIds.forEach((id) => {
        const detail = orderDetails.find((d) => d.ProductID === id);
        if (detail) {
          refundSum += detail.UnitPrice * detail.Quantity;
        }
      });

      const refCode = "RET" + Math.floor(Math.random() * 900000 + 100000);

      // 3. Create OrderReturn entry
      const newReturn = await api.orderReturns.create({
        orderId: order.id,
        employeeId: emp?.EmployeeID || 1,
        returndate: new Date().toISOString().split("T")[0],
        reason: "Trả hàng",
        totalrefund: refundSum,
        returnrefcode: refCode,
        status: "1", // Completed
      });

      // 4. Create ReturnDetails entry
      await Promise.all(
        selectedProductIds.map((pid) => {
          const qty = getProductQty(pid);
          return api.returnDetails.create({
            ReturnID: newReturn.id,
            ProductID: pid,
            Quantity: qty,
            QC_Status: "Chờ kiểm định",
            TargetWarehouseID: 1,
            ActionTaken: "Trả hàng",
          });
        })
      );

      toast.success("Yêu cầu trả hàng đã được gửi thành công!");
      onOpenChange(false);
      onSave();
    } catch (e: any) {
      toast.error(e.message || "Gửi yêu cầu trả hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[550px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-4">
            Yêu cầu Trả Hàng #{order?.id}
          </DialogTitle>
        </DialogHeader>

        {loading && orderDetails.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 text-sm font-medium">Đang tải danh sách đổi trả...</span>
          </div>
        ) : (
          <div className="grid gap-4 py-2 text-sm">
            <div className="font-semibold text-slate-700 mb-1">
              Chọn sản phẩm khách muốn hoàn trả:
            </div>

            <div className="border border-slate-200 overflow-hidden rounded-md">
              <Table>
                <TableBody>
                  {orderDetails.map((item) => (
                    <TableRow
                      key={item.ProductID}
                      className="border-b border-slate-100 bg-white"
                    >
                      <TableCell className="w-[40px] py-3 text-center">
                        <Checkbox
                          className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          checked={selectedProductIds.includes(item.ProductID)}
                          onCheckedChange={() =>
                            handleToggleProduct(item.ProductID)
                          }
                          disabled={loading}
                        />
                      </TableCell>
                      <TableCell className="py-3 text-xs font-semibold text-slate-700">
                        {getProductName(item.ProductID)} (Mã: #{item.ProductID})
                      </TableCell>
                      <TableCell className="py-3 text-xs text-center text-slate-600">
                        Số lượng:{" "}
                        <span className="font-bold">{item.Quantity}</span>
                      </TableCell>
                      <TableCell className="py-3 text-xs text-right text-slate-950 font-semibold">
                        {item.UnitPrice.toLocaleString("vi-VN")} đ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Quy định chính sách đổi trả bằng Collapsible */}
            <Collapsible
              open={isPolicyOpen}
              onOpenChange={setIsPolicyOpen}
              className="border border-slate-200 mt-2 rounded-md"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center justify-between w-full px-4 py-3 font-bold text-slate-900 text-xs bg-slate-50 hover:bg-slate-100 text-left"
                >
                  <span>CHÍNH SÁCH ĐỔI TRẢ ÁP DỤNG</span>
                  {isPolicyOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3 bg-white border-t border-slate-200 text-xs text-slate-600 space-y-3">
                {policies.length > 0 ? (
                  policies.map((policy) => (
                    <div
                      key={policy.PolicyID}
                      className="border-b border-slate-100 pb-2 last:border-none last:pb-0"
                    >
                      <div className="font-bold text-slate-800 mb-0.5">
                        {policy.PolicyName}
                      </div>
                      <div>
                        • Hạn đổi trả tối đa:{" "}
                        <span className="font-medium text-slate-900">
                          {policy.MaxReturnDays} ngày
                        </span>
                      </div>
                      <div>
                        • Tỷ lệ phí phạt hủy/đổi:{" "}
                        <span className="font-medium text-slate-900">
                          {policy.PenaltyFeeRate * 100}%
                        </span>
                      </div>
                      <div>
                        • Ngày hiệu lực công bố:{" "}
                        {new Date(policy.EffectiveDate).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400">Không có chính sách đổi trả nào đang hoạt động.</div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        <DialogFooter className="border-t border-slate-200 pt-4 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy bỏ
          </Button>
          <Button
            className={btn.primary}
            onClick={handleSubmit}
            disabled={selectedProductIds.length === 0 || loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận Trả hàng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
