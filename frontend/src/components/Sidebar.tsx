import { sidebarData, type SidebarItem } from "@/data/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEmp } from "@/context/empContext";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasRole } = useEmp();

  // Lọc dữ liệu sidebar dựa trên availableRole
  const filteredSidebar = sidebarData.filter((item) =>
    item.availableRole.some((role) => hasRole(role)),
  );

  return (
    <aside className="w-1/4 h-[calc(100vh-48px)] bg-white border-r border-slate-200 flex flex-col">
      {/* Header Sidebar */}
      {/* <div className="p-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-blue-600 uppercase tracking-tight">
          Hệ thống Quản lý
        </h2>
      </div> */}

      <div className="flex-1 overflow-y-scroll py-4 px-3">
        <nav className="space-y-1">
          {filteredSidebar.map((item: SidebarItem) => {
            const isActive = location.pathname === item.directionTo;

            return (
              <Button
                key={item.directionTo}
                variant="ghost"
                className={cn(
                  "w-full justify-start font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600",
                )}
                onClick={() => navigate(item.directionTo)}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
