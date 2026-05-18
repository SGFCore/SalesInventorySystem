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

      {/* Center: Search Input - Thu hẹp chiều cao và giới hạn độ rộng */}
      <div className="flex-1 flex justify-center px-4">
        <InputGroup className="max-w-sm w-full size-sm">
          {/* Giả sử component InputGroup của bạn hỗ trợ size "sm" hoặc bạn có thể chỉnh CSS trực tiếp */}
          <InputGroupInput
            placeholder="Tìm kiếm..."
            className="h-8 text-sm bg-blue-500/20 border-none placeholder:text-blue-100 text-white"
          />
          <InputGroupAddon className="h-8">
            <Search size={16} />
          </InputGroupAddon>
          <InputGroupAddon
            align="inline-end"
            className="text-xs opacity-80 h-8"
          >
            12 results
          </InputGroupAddon>
        </InputGroup>
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
