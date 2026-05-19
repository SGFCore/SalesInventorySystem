import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEmp } from "@/context/empContext";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  HelpCircle,
  Key
} from "lucide-react";

export function SignIn() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setEmp, setRoles } = useEmp();

  // Dữ liệu mẫu phục vụ Prototype chạy thử
  const SAMPLE_CREDENTIALS = {
    employeeId: "NV001",
    password: "123456"
  };

  const handleFillSample = () => {
    setEmployeeId(SAMPLE_CREDENTIALS.employeeId);
    setPassword(SAMPLE_CREDENTIALS.password);
    toast.success("Đã điền thông tin tài khoản mẫu!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (employeeId.trim().length === 0 || password.trim().length === 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.auth.signin({
        username: employeeId,
        password,
      });

      if (response && response.employee) {
        setEmp(response.employee);
        setRoles(response.roles || []);
        toast.success("Đăng nhập thành công!");
        login();
        navigate("/");
      } else {
        toast.error("Phản hồi đăng nhập không hợp lệ từ máy chủ.");
      }
    } catch (error: any) {
      toast.error(error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-100 p-4">
      {/* Container thẻ đăng nhập với thiết kế siêu phẳng (flat) và tối ưu diện tích */}
      <Card className="w-[340px] bg-white border border-slate-200 rounded-none p-0">
        
        {/* Header rút gọn để tiết kiệm không gian */}
        <CardHeader className="p-4 pb-2 border-b border-slate-100 text-center">
          <CardTitle className="text-xl font-bold tracking-tight text-blue-600">
            SGFMS
          </CardTitle>
          <CardDescription className="text-[11px] text-slate-500 font-medium">
            Hệ thống quản lý kho & bán hàng
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-4 pb-2 space-y-3">

            {/* Input Mã nhân viên */}
            <div className="space-y-1">
              <Label 
                htmlFor="employeeId" 
                className="text-[10px] font-bold text-slate-500 uppercase tracking-wide"
              >
                Mã nhân viên
              </Label>
              <div className="relative">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="h-3.5 w-3.5" />
                </div>
                <Input
                  id="employeeId"
                  placeholder="Nhập mã nhân viên..."
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="pl-8 h-8.5 text-xs border-slate-200 rounded-none bg-white focus-visible:ring-0 focus-visible:border-blue-600 focus-visible:ring-offset-0 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Input Mật khẩu */}
            <div className="space-y-1">
              <Label 
                htmlFor="password" 
                className="text-[10px] font-bold text-slate-500 uppercase tracking-wide"
              >
                Mật khẩu
              </Label>
              <div className="relative">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 pr-8 h-8.5 text-xs border-slate-200 rounded-none bg-white focus-visible:ring-0 focus-visible:border-blue-600 focus-visible:ring-offset-0 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

          </CardContent>

          {/* Footer hành động */}
          <CardFooter className="flex flex-col p-4 pt-1 space-y-3 border-0">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-none border-0"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            {/* Hướng dẫn IT support rút gọn tối đa */}
            <div className="p-2 bg-slate-50 border border-slate-200 flex items-start gap-1.5 w-full">
              <HelpCircle className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
              <p className="text-left text-[9px] text-slate-500 leading-tight">
                Liên hệ Phòng Kỹ thuật (IT Support) tại Hotline: <span className="font-bold text-slate-600">0785563729</span> khi cần hỗ trợ đăng nhập.
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
