import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Customer, Feedback, OrderDetail, Product, Combo, Order } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dialog, page } from "@/pages/page-classes";
import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function FeedbackDialog({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  customer: Customer | null;
}) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [selectedOrderDetailId, setSelectedOrderDetailId] = useState<string>("random");

  const loadFeedbacks = async () => {
    if (!customer) return;
    setLoading(true);
    try {
      const [allFeedbacks, allOrderDetails, allProducts, allCombos, allOrders] = await Promise.all([
        api.feedbacks.list(),
        api.orderDetails.list(),
        api.products.list(),
        api.combos.list(),
        api.orders.list(),
      ]);
      setFeedbacks(allFeedbacks.filter((f) => f.CustomerID === customer.id));
      setOrderDetails(allOrderDetails);
      setProducts(allProducts);
      setCombos(allCombos);
      setCustomerOrders(allOrders.filter((o) => o.customerId === customer.id));
    } catch (e: any) {
      toast.error(e.message || "Không thể tải phản hồi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && customer) {
      loadFeedbacks();
    }
  }, [open, customer]);

  const purchasedOrderDetails = orderDetails.filter((od) =>
    customerOrders.some((o) => o.id === od.OrderID)
  );

  const getItemName = (orderDetailId: number) => {
    const od = orderDetails.find((item) => item.OrderDetailID === orderDetailId);
    if (!od) return "Sản phẩm / Đơn hàng khác";

    if (od.ProductID) {
      const prod = products.find((p) => p.ProductID === od.ProductID);
      return prod
        ? `Sản phẩm: ${prod.ProductName} (Đơn #${od.OrderID})`
        : `Sản phẩm #${od.ProductID} (Đơn #${od.OrderID})`;
    }

    if (od.ComboID) {
      const comb = combos.find((c) => c.id === od.ComboID);
      return comb
        ? `Combo: #${comb.id} (${comb.comboprice.toLocaleString()}đ) (Đơn #${od.OrderID})`
        : `Combo #${od.ComboID} (Đơn #${od.OrderID})`;
    }

    return `Đơn hàng #${od.OrderID}`;
  };

  const renderStars = (rating: number) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(Math.max(0, 5 - rating));
    return (
      <span className="text-amber-500 font-bold text-sm tracking-wider">
        {fullStars}
        <span className="text-slate-300 font-normal">{emptyStars}</span>
      </span>
    );
  };

  const handleSubmit = async () => {
    if (!customer) return;
    if (!newComment.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi!");
      return;
    }
    setSubmitting(true);
    try {
      let orderDetailId = Math.floor(Math.random() * 8000) + 1000;

      if (selectedOrderDetailId !== "random") {
        orderDetailId = Number(selectedOrderDetailId);
      } else if (purchasedOrderDetails.length > 0) {
        orderDetailId = purchasedOrderDetails[0].OrderDetailID;
      }

      await api.feedbacks.create({
        OrderDetailID: orderDetailId,
        CustomerID: customer.id,
        FeedbackComment: newComment,
        FeedBackDate: new Date().toISOString(),
        AttachmentURL: "",
        Rating: newRating,
      });
      toast.success("Ghi nhận phản hồi thành công!");
      setNewComment("");
      setNewRating(5);
      setSelectedOrderDetailId("random");
      loadFeedbacks();
    } catch (error: any) {
      toast.error(error.message || "Gửi phản hồi thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[600px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>
            Phản hồi từ: {customer.firstname} {customer.lastname}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className={page.tableWrap}>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-500 text-sm">Đang tải phản hồi...</span>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm font-medium">
                Chưa có phản hồi nào từ khách hàng này.
              </div>
            ) : (
              <Table>
                <TableBody>
                  {feedbacks.map((f) => (
                    <TableRow key={f.FeedbackID} className={page.tableRow}>
                      <TableCell className="w-24 text-xs text-slate-500">
                        {new Date(f.FeedBackDate).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 mb-1">
                          {renderStars(f.Rating)}
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                            ID: #{f.FeedbackID}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mb-2 italic">
                          {getItemName(f.OrderDetailID)}
                        </div>
                        <div className="text-sm text-slate-700 bg-slate-50/50 p-2.5 rounded border border-slate-100">
                          {f.FeedbackComment}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="grid gap-2 border-t border-slate-100 pt-4">
            <Label className={dialog.label}>Ghi nhận phản hồi mới</Label>

            {purchasedOrderDetails.length > 0 && (
              <div className="grid gap-1">
                <Label className="text-xs text-slate-500">Sản phẩm / Đơn hàng liên quan</Label>
                <select
                  className={cn(
                    dialog.input,
                    "w-full h-10 px-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  value={selectedOrderDetailId}
                  onChange={(e) => setSelectedOrderDetailId(e.target.value)}
                  disabled={submitting}
                >
                  <option value="random">-- Chọn sản phẩm đã mua (Ngẫu nhiên/Mặc định) --</option>
                  {purchasedOrderDetails.map((od) => {
                    let displayName = `Đơn hàng #${od.OrderID}`;
                    if (od.ProductID) {
                      const prod = products.find((p) => p.ProductID === od.ProductID);
                      displayName = `Đơn #${od.OrderID} - ${prod ? prod.ProductName : `Sản phẩm #${od.ProductID}`}`;
                    } else if (od.ComboID) {
                      displayName = `Đơn #${od.OrderID} - Combo #${od.ComboID}`;
                    }
                    return (
                      <option key={od.OrderDetailID} value={od.OrderDetailID}>
                        {displayName}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <Input
              placeholder="Nội dung phản hồi..."
              className={dialog.input}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Đánh giá (1-5)"
                className={cn(dialog.input, "w-32 max-w-none")}
                min={1}
                max={5}
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                disabled={submitting}
              />
              <Button
                className={cn(dialog.submit, "flex-1")}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Đang gửi..." : "Gửi phản hồi"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
