import { Button } from "@/components/ui/button";
import UserMenu from "@/components/navbar/UserMenu";
import { navbarData } from "@/data/navigation";
import { Bell } from "lucide-react";
import { useNotification } from "@/context/notificationContext";
import { useNavigate } from "react-router-dom";
import { useEmp } from "@/context/empContext";

export function Navbar() {
  const { hasRole } = useEmp();
  const { unreadCount } = useNotification();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between px-4 h-12">
      {/* Left: App Name */}
      <div className="flex items-center shrink-0">
        <h1
          className="text-lg font-semibold tracking-tight text-white cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/")}
        >
          {navbarData.appName}
        </h1>
      </div>

      {/* Right: Notification & Avatar */}
      <div className="flex items-center gap-2 shrink-0">
        {
          (hasRole(1) || hasRole(3)) && <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-blue-400 relative"
            onClick={() => navigate("/notification-management")}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                className="
    absolute top-0 right-0
    flex h-4 w-4
    items-center justify-center
    rounded-full
    bg-red-500
    text-[8px] font-normal leading-none text-white
    ring-2 ring-blue-600
    translate-x-1/3 -translate-y-1/3
  "
              >
                {unreadCount}
              </span>
            )}
          </Button>
        }
        <UserMenu />
      </div>
    </nav>
  );
}
