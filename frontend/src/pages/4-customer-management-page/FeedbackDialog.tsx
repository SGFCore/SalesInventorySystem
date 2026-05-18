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

const MOCK_FEEDBACKS: Feedback[] = [
  {
    FeedbackID: 1,
    OrderDetailID: 101,
    CustomerID: 2000,
    FeedbackComment: "Giao hàng nhanh, đóng gói kỹ.",
    FeedBackDate: new Date(),
    AttachmentURL: "",
    Rating: 5,
  },
  {
    FeedbackID: 2,
    OrderDetailID: 105,
    CustomerID: 2000,
    FeedbackComment: "Sản phẩm hơi cũ.",
    FeedBackDate: new Date(),
    AttachmentURL: "",
    Rating: 3,
  },
];

export function FeedbackDialog({
  open,
  onOpenChange,
  customer,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  customer: Customer | null;
}) {
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
            <Table>
              <TableBody>
                {MOCK_FEEDBACKS.map((f) => (
                  <TableRow key={f.FeedbackID} className={page.tableRow}>
                    <TableCell className="w-24 text-xs text-slate-500">
                      {f.FeedBackDate.toLocaleDateString()}
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
          </div>
          <div className="grid gap-2 border-t border-slate-100 pt-4">
            <Label className={dialog.label}>Ghi nhận phản hồi mới</Label>
            <Input
              placeholder="Nội dung phản hồi..."
              className={dialog.input}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Rating (1-5)"
                className={cn(dialog.input, "w-32 max-w-none")}
              />
              <Button className={cn(dialog.submit, "flex-1")}>
                Gửi phản hồi
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
