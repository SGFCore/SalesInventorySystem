import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Customer, Feedback } from "@/lib/types";

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
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-blue-600">
            Phản hồi từ: {customer.LastName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableBody>
                {MOCK_FEEDBACKS.map((f) => (
                  <TableRow key={f.FeedbackID}>
                    <TableCell className="text-xs text-slate-500 italic w-24">
                      {f.FeedBackDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        Đánh giá: {f.Rating}/5
                      </div>
                      <div className="text-sm text-slate-700">
                        {f.FeedbackComment}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="grid gap-2 border-t pt-4">
            <Label className="font-bold">Ghi nhận phản hồi mới</Label>
            <Input
              placeholder="Nội dung phản hồi..."
              className="focus:ring-blue-600"
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Rating (1-5)"
                className="w-32"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                Gửi phản hồi
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
