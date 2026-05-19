import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import UserMenu from "@/components/navbar/UserMenu";
import { navbarData } from "@/data/navigation";
import { Bell, Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between px-4 h-12 shadow-sm">
      {/* Left: App Name - Thu nhỏ text và giảm khoảng cách */}
      <div className="flex items-center shrink-0">
        <h1 className="text-lg font-semibold tracking-tight text-white">
          {navbarData.appName}
        </h1>
      </div>

      {/* Right: Notification & Avatar - Giảm gap và size icon */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-blue-400"
        >
          <Bell size={18} />
        </Button>

        <UserMenu />
      </div>
    </nav>
  );
}
