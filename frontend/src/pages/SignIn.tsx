import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { btn, dialog, page } from "@/pages/page-classes";
import { toast } from "sonner";

export function SignIn() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Logic "Đăng nhập bậy bạ": Chỉ cần không để trống là cho qua
    if (employeeId.trim().length > 0 && password.trim().length > 0) {
      toast.success("Đăng nhập thành công!");
      login();
      navigate("/");
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-[400px] border border-slate-200 shadow-sm">
        <CardHeader className="space-y-1 pb-4 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight text-blue-600">
            SGFMS
          </CardTitle>
          <CardDescription className={page.textMuted}>
            Đăng nhập hệ thống quản lý
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Employee ID Input */}
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="text-slate-700">
                Mã nhân viên
              </Label>
              <Input
                id="employeeId"
                placeholder="Nhập mã nhân viên..."
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className={dialog.input}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={dialog.input}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 px-6 pb-6">
            <Button
              type="submit"
              className={cn(btn.primary, "h-10 w-full font-medium")}
            >
              Đăng nhập
            </Button>
            <p className="text-center text-xs text-slate-500">
              Nếu bạn gặp sự cố khi đăng nhập, vui lòng liên hệ phòng IT.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
