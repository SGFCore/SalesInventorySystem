import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/navbar/UserAvatar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEmp } from "@/context/empContext";
import { api } from "@/lib/api";

export default function UserMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { emp } = useEmp();

  const handleLogout = async () => {
    try {
      await api.auth.signout();
    } catch (error) {
      console.error("Lỗi khi gọi API đăng xuất:", error);
    } finally {
      logout();
      navigate("/signin");
    }
  };

  return (
    <DropdownMenu>
      {/* Trigger là Avatar - Bỏ toàn bộ shadow và animation theo yêu cầu */}
      <DropdownMenuTrigger className="outline-none ring-0 border-none transition-none">
        <UserAvatar
          username={emp.Fullname}
          fullSize="h-9 w-9"
          className="bg-blue-700 hover:bg-blue-950 cursor-pointer rounded-full"
          textSize="text-xs"
        />
      </DropdownMenuTrigger>

      {/* Nội dung menu */}
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-md border border-slate-200 bg-white p-1 shadow-none animate-none"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">{emp.Fullname}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {emp.Email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100" />

        <DropdownMenuItem
          onClick={() => navigate("/profile")}
          className="cursor-pointer hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-sm px-2 py-1.5 text-sm transition-none"
        >
          Xem hồ sơ
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-sm px-2 py-1.5 text-sm transition-none"
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
