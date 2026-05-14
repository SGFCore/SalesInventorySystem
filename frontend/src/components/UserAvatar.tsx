import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserAvatar({ username }: { username: string }) {
  return (
    <Avatar className="bg-blue-900">
      <AvatarFallback>{username.slice(0, 3)}</AvatarFallback>
    </Avatar>
  );
}
