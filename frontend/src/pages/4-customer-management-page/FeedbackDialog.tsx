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
import type { Customer, Feedback } from "@/lib/types";
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
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const loadFeedbacks = async () => {
    if (!customer) return;
    setLoading(true);
    try {
      const all = await api.feedbacks.list();
      setFeedbacks(all.filter((f) => f.CustomerID === customer.CustomerID));
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

  const handleSubmit = async () => {
    if (!customer) return;
    if (!newComment.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi!");
      return;
    }
    setSubmitting(true);
    try {
      const feedbackId = Math.floor(Math.random() * 900000) + 100000;
      await api.feedbacks.create({
        FeedbackID: feedbackId,
        OrderDetailID: Math.floor(Math.random() * 8000) + 1000,
        CustomerID: customer.CustomerID,
        FeedbackComment: newComment,
        FeedBackDate: new Date(),
        AttachmentURL: "",
        Rating: newRating,
      });
      toast.success("Ghi nhận phản hồi thành công!");
      setNewComment("");
      setNewRating(5);
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
            Phản hồi từ: {customer.FirstName} {customer.LastName}
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
                        <div className="text-sm font-medium text-slate-900">
                          Đánh giá: {f.Rating}/5
                        </div>
                        <div className="text-sm text-slate-600">
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
