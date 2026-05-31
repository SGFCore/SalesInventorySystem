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
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect } from "@/components/ui/native-select";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { btn, dialog, page } from "@/pages/page-classes";
import { Loader2, Star, X, ImagePlus, History, Calendar } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Customer, OrderDetail, Product, Feedback } from "@/lib/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export function FeedbackDialog({ open, onOpenChange, customer }: Props) {
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [feedbackHistory, setFeedbackHistory] = useState<Feedback[]>([]);
  
  const [formData, setFormData] = useState({
    feedbackComment: "",
    rating: 0,
    orderDetailId: "",
    attachmentUrl: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && customer) {
      setActiveTab("form");
      setFormData({
        feedbackComment: "",
        rating: 0,
        orderDetailId: "",
        attachmentUrl: "",
      });
      loadData();
    }
  }, [open, customer]);

  const loadData = async () => {
    if (!customer) return;
    setLoadingData(true);
    
    try {
      const [details, prods, customerOrders, history] = await Promise.all([
        api.orderDetails.list().catch(() => []),
        api.products.list().catch(() => []),
        api.orders.list().catch(() => []),
        api.feedbacks.list().catch(() => [])
      ]);

      // QUAN TRỌNG: Sửa logic lọc sản phẩm đã mua
      // Trong OrderDTO, trường là customerId (camelCase), không phải customerid (lowercase)
      const myOrderIds = customerOrders
        .filter(o => o.customerId === customer.id)
        .map(o => o.id);

      const myDetails = details.filter(d => myOrderIds.includes(d.OrderID));
      
      setOrderDetails(myDetails);
      setProducts(prods);
      
      const myHistory = history.filter(f => f.customerid === customer.id);
      setFeedbackHistory(myHistory.sort((a, b) => new Date(b.feedbackdate).getTime() - new Date(a.feedbackdate).getTime()));
    } catch (e) {
      toast.error("Lỗi khi tải dữ liệu.");
    } finally {
      setLoadingData(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Thực hiện gửi file thật lên server qua API /api/uploads
      const res = await api.uploads.uploadImage(file);
      // Backend trả về { url: "/uploads/filename.jpg" }
      setFormData(prev => ({ ...prev, attachmentUrl: res.url }));
      toast.success("Đã tải ảnh lên thành công!");
    } catch (e) {
      console.error("Upload error:", e);
      toast.error("Lỗi khi tải ảnh lên server.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!customer) return;
    if (!formData.feedbackComment.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi!");
      return;
    }
    if (formData.rating === 0) {
      toast.error("Vui lòng chọn mức độ đánh giá!");
      return;
    }
    if (!formData.orderDetailId) {
      toast.error("Vui lòng chọn sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      // Sửa lại tên trường để khớp chính xác với @JsonProperty trong FeedbackDTO.java
      await api.feedbacks.create({
        CustomerID: customer.id,
        OrderDetailID: Number(formData.orderDetailId),
        FeedbackComment: formData.feedbackComment,
        Rating: formData.rating,
        AttachmentURL: formData.attachmentUrl || "",
        // Bỏ FeedbackDate để backend tự sinh theo LocalDateTime.now() nhằm tránh lỗi format/timezone
      } as any);

      toast.success("Gửi phản hồi thành công!");
      loadData();
      setActiveTab("history");
    } catch (error: any) {
      toast.error(error.message || "Gửi phản hồi thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={cn("w-3 h-3", s <= count ? "fill-yellow-400 text-yellow-400" : "text-slate-200")} />
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[500px]", dialog.content)}>
        <DialogHeader>
          <DialogTitle className={dialog.title}>Phản hồi khách hàng</DialogTitle>
          <p className={page.textMuted}>
            Khách hàng: <span className="font-semibold text-slate-900">{customer?.firstname} {customer?.lastname}</span>
          </p>
        </DialogHeader>

        <div className="flex border-b border-slate-100 mb-2">
          <button 
            onClick={() => setActiveTab("form")}
            className={cn(
              "flex-1 py-3 text-sm font-bold transition-all",
              activeTab === "form" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            Thêm phản hồi
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex-1 py-3 text-sm font-bold transition-all",
              activeTab === "history" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/30" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            Lịch sử ({feedbackHistory.length})
          </button>
        </div>

        <div className={cn(dialog.body, "py-2")}>
          {activeTab === "form" ? (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="orderDetailId" className={dialog.label}>
                  Sản phẩm đã mua <span className="text-red-500">*</span>
                </Label>
                <NativeSelect
                  id="orderDetailId"
                  value={formData.orderDetailId}
                  onChange={(e) => setFormData({ ...formData, orderDetailId: e.target.value })}
                  className={dialog.input}
                  disabled={loadingData || loading}
                >
                  <option value="">-- Chọn sản phẩm --</option>
                  {orderDetails.map((d) => {
                    const product = products.find(p => p.ProductID === d.ProductID);
                    return (
                      <option key={d.OrderDetailID} value={d.OrderDetailID}>
                        #{d.OrderID} - {product?.ProductName || `SP #${d.ProductID}`}
                      </option>
                    );
                  })}
                </NativeSelect>
              </div>

              <div className="grid gap-2">
                <Label className={dialog.label}>Mức độ đánh giá <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        className={cn(
                          "w-8 h-8",
                          (hoverRating || formData.rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-200 fill-slate-50"
                        )}
                      />
                    </button>
                  ))}
                  {formData.rating > 0 && (
                    <span className="ml-3 text-sm font-bold text-blue-600">{formData.rating}/5</span>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="comment" className={dialog.label}>
                  Nội dung phản hồi <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Nhập cảm nhận của khách hàng..."
                  value={formData.feedbackComment}
                  onChange={(e) => setFormData({ ...formData, feedbackComment: e.target.value })}
                  className={cn(dialog.input, "min-h-[100px] resize-none")}
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <Label className={dialog.label}>Minh chứng</Label>
                <div className="flex flex-col gap-3">
                  {formData.attachmentUrl ? (
                    <div className="relative w-full aspect-video rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden group">
                      <img src={formData.attachmentUrl} alt="Preview" className="w-full h-full object-contain" />
                      <button 
                        onClick={() => setFormData({...formData, attachmentUrl: ""})}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="h-20 border-dashed border-2 flex flex-col gap-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-500"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-6 h-6 text-slate-400" />}
                      <span className="text-xs font-medium">Chọn file ảnh</span>
                    </Button>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1">
              {loadingData ? (
                <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" /></div>
              ) : feedbackHistory.length === 0 ? (
                <p className="text-center py-10 text-slate-400 text-sm italic">Chưa có lịch sử phản hồi</p>
              ) : (
                feedbackHistory.map((item) => {
                  const product = products.find(p => p.ProductID === item.orderdetailid);
                  return (
                    <div key={item.id} className="p-3 rounded-md border border-slate-100 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col gap-1">
                          {renderStars(item.rating)}
                          <span className="text-xs font-semibold text-slate-700 truncate max-w-[250px]">
                            {product?.ProductName || `Sản phẩm #${item.orderdetailid}`}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(item.feedbackdate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic">"{item.feedbackcomment}"</p>
                      {item.attachmenturl && (
                        <div className="mt-2 rounded border border-slate-100 max-w-[100px] overflow-hidden">
                          <img 
                            src={item.attachmenturl} 
                            alt="Minh chứng" 
                            className="w-full h-auto cursor-pointer" 
                            onClick={() => window.open(item.attachmenturl!, "_blank")}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-2">
          <Button
            variant="outline"
            className={dialog.cancel}
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Hủy
          </Button>
          {activeTab === "form" && (
            <Button
              className={btn.primary}
              onClick={handleSubmit}
              disabled={loading || uploading || orderDetails.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý
                </>
              ) : (
                "Lưu phản hồi"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
