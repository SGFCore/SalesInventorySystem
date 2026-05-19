import { useNotification } from "@/context/notificationContext";
import { btn, page, entity } from "@/pages/page-classes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Bell, 
  Check, 
  CheckCircle, 
  Inbox, 
  AlertTriangle, 
  ShoppingBag, 
  ClipboardList,
  Calendar,
  Loader2
} from "lucide-react";
import { useState } from "react";

export default function NotificationManagementPage() {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");

  // Bộ lọc thông báo dựa trên tab đang chọn
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return notif.Status === 0;
    if (activeTab === "read") return notif.Status === 1;
    return true;
  });

  // Hàm định dạng ngày giờ DD/MM/YYYY HH:MM
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Cấu hình hiển thị theo loại thông báo
  const getTypeConfig = (type: number) => {
    switch (type) {
      case 1:
        return {
          label: "Cảnh báo",
          icon: AlertTriangle,
          iconClass: "text-amber-600",
          badgeClass: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
          boxClass: "bg-amber-50 border-amber-200",
        };
      case 2:
        return {
          label: "Giao dịch",
          icon: ShoppingBag,
          iconClass: "text-emerald-600",
          badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
          boxClass: "bg-emerald-50 border-emerald-200",
        };
      case 3:
        return {
          label: "Yêu cầu",
          icon: ClipboardList,
          iconClass: "text-blue-600",
          badgeClass: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
          boxClass: "bg-blue-50 border-blue-200",
        };
      default:
        return {
          label: "Hệ thống",
          icon: Bell,
          iconClass: "text-slate-600",
          badgeClass: "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100",
          boxClass: "bg-slate-50 border-slate-200",
        };
    }
  };

  return (
    <div className={page.shell}>
      {/* Header Page */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 leading-tight">
            Quản lý thông báo
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Bạn có <span className="font-semibold text-blue-600">{unreadCount}</span> thông báo chưa đọc.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className={cn(btn.actionPrimary, "flex items-center gap-2 px-4 py-2 font-medium shadow-sm transition-all")}
          >
            <CheckCircle className="w-4 h-4" />
            Đánh dấu đã đọc tất cả
          </Button>
        )}
      </div>

      {/* Tabs Filter */}
      <div className="flex border-b border-slate-200 mb-6 gap-2">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "py-2 px-4 text-sm font-medium border-b-2 transition-all relative",
            activeTab === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          )}
        >
          Tất cả
          <Badge className="ml-1.5 bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-100 px-1.5 py-0">
            {notifications.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("unread")}
          className={cn(
            "py-2 px-4 text-sm font-medium border-b-2 transition-all relative",
            activeTab === "unread"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          )}
        >
          Chưa đọc
          {unreadCount > 0 && (
            <Badge className="ml-1.5 bg-red-100 text-red-700 border border-red-200 hover:bg-red-100 px-1.5 py-0 font-semibold">
              {unreadCount}
            </Badge>
          )}
        </button>

        <button
          onClick={() => setActiveTab("read")}
          className={cn(
            "py-2 px-4 text-sm font-medium border-b-2 transition-all relative",
            activeTab === "read"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          )}
        >
          Đã đọc
          <Badge className="ml-1.5 bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-100 px-1.5 py-0">
            {notifications.filter(n => n.Status === 1).length}
          </Badge>
        </button>
      </div>

      {/* Main Content Area */}
      <Card className="border border-slate-200/80 shadow-none bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-3 text-slate-500 font-medium">Đang tải danh sách thông báo...</span>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="rounded-full bg-slate-50 border border-slate-100 p-4 mb-4">
                <Inbox className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Không có thông báo nào</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-xs">
                {activeTab === "unread" 
                  ? "Tuyệt vời! Bạn đã đọc tất cả thông báo của mình." 
                  : activeTab === "read" 
                    ? "Bạn chưa có thông báo nào đã đọc."
                    : "Hộp thư thông báo của bạn hiện đang trống."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotifications.map((notif) => {
                const config = getTypeConfig(notif.Type);
                const IconComponent = config.icon;
                const isUnread = notif.Status === 0;

                return (
                  <div
                    key={notif.NotificationID}
                    className={cn(
                      "grid grid-cols-[auto_1fr_auto] items-start gap-4 p-5 transition-all",
                      isUnread 
                        ? "bg-blue-50/20 hover:bg-blue-50/40 border-l-4 border-l-blue-600" 
                        : "hover:bg-slate-50/40 border-l-4 border-l-transparent"
                    )}
                  >
                    {/* Left Icon (Styled matching EmpInfoPage contact badges) */}
                    <div className={cn(
                      "rounded-xl border p-2.5 shrink-0 transition-transform duration-200 hover:scale-105",
                      config.boxClass
                    )}>
                      <IconComponent className={cn("h-5 w-5", config.iconClass)} />
                    </div>

                    {/* Middle: Content */}
                    <div className="flex flex-col space-y-1.5 min-w-0 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Title */}
                        <span className={cn(
                          "text-base tracking-tight text-slate-900",
                          isUnread ? "font-semibold" : "font-medium text-slate-700"
                        )}>
                          {notif.Title}
                        </span>

                        {/* Category Badge */}
                        <Badge className={cn("px-2 py-0 text-[10px] font-medium border uppercase tracking-wider", config.badgeClass)}>
                          {config.label}
                        </Badge>

                        {/* Unread Glow Badge */}
                        {isUnread && (
                          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </div>

                      {/* Message Body */}
                      <p className={cn(
                        "text-sm leading-relaxed",
                        isUnread ? "text-slate-800" : "text-slate-500"
                      )}>
                        {notif.Message}
                      </p>

                      {/* Meta Information: Date and optional Product info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1 font-medium">
                        {/* Timestamp */}
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{formatDate(notif.CreatedDate)}</span>
                        </div>

                        {/* Product ID Indicator if exists */}
                        {notif.ProductID && (
                          <>
                            <span className={entity.separator}>·</span>
                            <div>
                              Mã sản phẩm: <span className={entity.id}>{notif.ProductID}</span>
                            </div>
                          </>
                        )}
                        
                        {/* Notification ID */}
                        <span className={entity.separator}>·</span>
                        <div>
                          ID: <span className={entity.id}>{notif.NotificationID}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action button to mark as read */}
                    <div className="flex items-center self-center pl-2">
                      {isUnread ? (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => markAsRead(notif.NotificationID)}
                          title="Đánh dấu đã đọc"
                          className={cn(
                            btn.actionPrimary,
                            "h-9 w-9 rounded-full hover:scale-105 transition-all shadow-sm"
                          )}
                        >
                          <Check className="h-4.5 w-4.5 text-blue-600" />
                        </Button>
                      ) : (
                        <div className="text-green-600 bg-green-50 rounded-full p-1.5 border border-green-100" title="Đã đọc">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
