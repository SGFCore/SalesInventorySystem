import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username: string;
  fullSize?: string; // Ví dụ: "h-40 w-40"
  textSize?: string; // Ví dụ: "text-5xl"
  className?: string; // Vẫn giữ để có thể thêm margin/padding nếu cần
}

export default function UserAvatar({
  username,
  fullSize = "h-10 w-10",
  textSize = "text-sm",
  className,
}: UserAvatarProps) {
  const initials = (username || "System User")
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase();

  return (
    <Avatar
      className={cn(
        "bg-blue-900 flex items-center justify-center overflow-hidden",
        fullSize,
        className,
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-inherit text-white flex items-center justify-center w-full h-full",
          textSize,
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
