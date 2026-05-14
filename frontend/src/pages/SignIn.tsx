import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-main to-supporting flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-main mb-2">SGF Management</h1>
          <p className="text-foreground">Đăng nhập vào hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main"
                size={20}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full pl-10 pr-4 py-2 border-2 border-supporting rounded-lg focus:outline-none focus:border-main transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main"
                size={20}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full pl-10 pr-4 py-2 border-2 border-supporting rounded-lg focus:outline-none focus:border-main transition"
                required
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-main" />
              <span className="text-sm text-foreground">Nhớ tôi</span>
            </label>
            <a href="#" className="text-sm text-main hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-main text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-foreground">
            Chưa có tài khoản?{" "}
            <a href="#" className="text-main font-semibold hover:underline">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
