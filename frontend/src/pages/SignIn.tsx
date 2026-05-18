import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] shadow-2xl border-none">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-blue-600 tracking-tight">
            SGFMS
          </CardTitle>
          <CardDescription className="text-slate-500"></CardDescription>
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
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" text-slate-700>
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-4 pb-8 mt-5">
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Đăng nhập ngay
              </Button>

              <div className="text-center text-sm text-slate-500">
                Nếu bạn gặp sự cố khi đăng nhập, vui lòng liên hệ với phòng IT.
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
