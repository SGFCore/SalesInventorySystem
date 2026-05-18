import UserAvatar from "@/components/navbar/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEmp } from "@/context/empContext";
import { cn } from "@/lib/utils";
import { EditEmpDialog } from "@/pages/1-emp-info/EditEmpDialog";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function EmpInfoPage() {
  const { emp } = useEmp();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!emp)
    return (
      <div className="p-8 text-center text-slate-500">
        Không tìm thấy thông tin nhân viên.
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          {/* Container chính chia 2 cột cố định */}
          <div className="grid grid-cols-[200px_1fr] gap-8">
            {/* CỘT TRÁI: Avatar */}
            <div className="flex flex-col items-center gap-4">
              <UserAvatar
                username={emp.Fullname}
                fullSize="h-40 w-40"
                textSize="text-6xl"
              />
              <Badge
                className={cn(
                  "px-3 py-1",
                  emp.Status === 1
                    ? "bg-green-500 hover:bg-green-500"
                    : "bg-slate-400",
                  "text-white",
                )}
              >
                {emp.Status === 1 ? "Đang hoạt động" : "Nghỉ việc"}
              </Badge>
            </div>

            {/* CỘT PHẢI: Thông tin */}
            <div className="flex flex-col justify-start space-y-6">
              {/* Header: Tên & Nút sửa */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-start">
                  <div className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {emp.Fullname}
                  </div>
                  <div className="text-slate-500 font-medium mt-0 mb-5">
                    Mã Nhân viên:{" "}
                    <span className="text-slate-800">{emp.EmployeeID}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                    className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Sửa hồ sơ <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chi tiết liên hệ */}
              <div className="grid grid-cols-1 gap-5 rounded-2xl">
                <div className="flex gap-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 w-full text-left">
                      Email
                    </span>
                    <a
                      href={`mailto:${emp.Email}`}
                      className="text-slate-900 hover:text-blue-600 font-semibold transition-colors"
                    >
                      {emp.Email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500  w-full text-left">
                      Số điện thoại
                    </span>
                    <span className="text-slate-900 font-semibold">
                      {emp.Phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit dialog */}
      <EditEmpDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}
