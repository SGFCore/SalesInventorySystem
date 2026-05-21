import { useMemo, useState } from "react";

import { useNotification } from "@/context/notificationContext";

import { btn, entity, page } from "@/pages/page-classes";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import {
  AlertTriangle,
  Bell,
  Calendar,
  Check,
  CheckCircle,
  ClipboardList,
  Inbox,
  Loader2,
  ShoppingBag,
} from "lucide-react";

/* =========================================================
 * TYPES
 * ======================================================= */

type TabType = "all" | "unread" | "read";

type NotificationTypeConfig = {
  label: string;
  icon: any;
  iconClass: string;
  badgeClass: string;
  boxClass: string;
};

type NotificationItem = {
  NotificationID: number;
  Title: string;
  Message: string;
  CreatedDate: string | Date;
  ProductID?: number | string;
  Type: number;
  Status: number;
};

/* =========================================================
 * HELPERS
 * ======================================================= */

const formatDate = (dateInput: string | Date) => {
  if (!dateInput) return "";

  const d = new Date(dateInput);

  if (isNaN(d.getTime())) return "";

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(d.getDate())}/${pad(
    d.getMonth() + 1
  )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
};

const NOTIFICATION_TYPE_CONFIG: Record<number, NotificationTypeConfig> = {
  1: {
    label: "Cảnh báo",
    icon: AlertTriangle,
    iconClass: "text-amber-600",
    badgeClass:
      "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
    boxClass: "bg-amber-50 border-amber-200",
  },

  2: {
    label: "Giao dịch",
    icon: ShoppingBag,
    iconClass: "text-emerald-600",
    badgeClass:
      "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
    boxClass: "bg-emerald-50 border-emerald-200",
  },

  3: {
    label: "Yêu cầu",
    icon: ClipboardList,
    iconClass: "text-blue-600",
    badgeClass:
      "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    boxClass: "bg-blue-50 border-blue-200",
  },
};

const DEFAULT_TYPE_CONFIG: NotificationTypeConfig = {
  label: "Hệ thống",
  icon: Bell,
  iconClass: "text-slate-600",
  badgeClass:
    "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100",
  boxClass: "bg-slate-50 border-slate-200",
};

const getTypeConfig = (type: number): NotificationTypeConfig => {
  return NOTIFICATION_TYPE_CONFIG[type] || DEFAULT_TYPE_CONFIG;
};

/* =========================================================
 * COMPONENT
 * ======================================================= */

export default function NotificationManagementPage() {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotification();

  const [activeTab, setActiveTab] = useState<TabType>("all");

  /* =========================================================
   * DERIVED STATE
   * ======================================================= */

  const unreadCount = useMemo(
    () => notifications.filter((n: NotificationItem) => n.Status === 0).length,
    [notifications]
  );

  const readCount = useMemo(
    () => notifications.filter((n: NotificationItem) => n.Status === 1).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(
          (n: NotificationItem) => n.Status === 0
        );

      case "read":
        return notifications.filter(
          (n: NotificationItem) => n.Status === 1
        );

      default:
        return notifications;
    }
  }, [activeTab, notifications]);

  /* =========================================================
   * HANDLERS
   * ======================================================= */

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================================================
   * EMPTY STATE MESSAGE
   * ======================================================= */

  const emptyMessage = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return "Tuyệt vời! Bạn đã đọc tất cả thông báo của mình.";

      case "read":
        return "Bạn chưa có thông báo nào đã đọc.";

      default:
        return "Hộp thư thông báo của bạn hiện đang trống.";
    }
  }, [activeTab]);

  /* =========================================================
   * RENDER
   * ======================================================= */

  return (
    <div className={page.shell}>
      {/* =====================================================
       * PAGE HEADER
       * =================================================== */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Quản lý thông báo
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Bạn có{" "}
            <span className="font-semibold text-blue-600">
              {unreadCount}
            </span>{" "}
            thông báo chưa đọc.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className={cn(
              btn.actionPrimary,
              "flex items-center gap-2 px-4 py-2 shadow-sm"
            )}
          >
            <CheckCircle className="w-4 h-4" />

            <span>Đánh dấu đã đọc tất cả</span>
          </Button>
        )}
      </div>

      {/* =====================================================
       * TABS
       * =================================================== */}

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <TabButton
          active={activeTab === "all"}
          label="Tất cả"
          count={notifications.length}
          onClick={() => setActiveTab("all")}
        />

        <TabButton
          active={activeTab === "unread"}
          label="Chưa đọc"
          count={unreadCount}
          countClass="bg-red-100 text-red-700 border-red-200"
          onClick={() => setActiveTab("unread")}
        />

        <TabButton
          active={activeTab === "read"}
          label="Đã đọc"
          count={readCount}
          onClick={() => setActiveTab("read")}
        />
      </div>

      {/* =====================================================
       * CONTENT
       * =================================================== */}

      <Card className="overflow-hidden bg-white border shadow-none rounded-2xl border-slate-200/80">
        <CardContent className="p-0">
          {loading ? (
            <LoadingState />
          ) : filteredNotifications.length === 0 ? (
            <EmptyState message={emptyMessage} />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredNotifications.map((notif: NotificationItem) => (
                <NotificationCard
                  key={notif.NotificationID}
                  notification={notif}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* =========================================================
 * TAB BUTTON
 * ======================================================= */

type TabButtonProps = {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
  countClass?: string;
};

function TabButton({
  active,
  label,
  count,
  onClick,
  countClass,
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-4 text-sm font-medium border-b-2 transition-all",
        active
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-slate-500 hover:text-slate-900"
      )}
    >
      {label}

      <Badge
        className={cn(
          "ml-1.5 px-1.5 py-0 border bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-100",
          countClass
        )}
      >
        {count}
      </Badge>
    </button>
  );
}

/* =========================================================
 * LOADING STATE
 * ======================================================= */

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />

      <span className="ml-3 font-medium text-slate-500">
        Đang tải danh sách thông báo...
      </span>
    </div>
  );
}

/* =========================================================
 * EMPTY STATE
 * ======================================================= */

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="p-4 mb-4 border rounded-full bg-slate-50 border-slate-100">
        <Inbox className="w-10 h-10 text-slate-400" />
      </div>

      <h3 className="text-base font-semibold text-slate-900">
        Không có thông báo nào
      </h3>

      <p className="max-w-xs mt-1 text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}

/* =========================================================
 * NOTIFICATION CARD
 * ======================================================= */

type NotificationCardProps = {
  notification: NotificationItem;
  onMarkAsRead: (id: number) => void;
};

function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const config = getTypeConfig(notification.Type);

  const IconComponent = config.icon;

  const isUnread = notification.Status === 0;

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] gap-4 items-start p-5 transition-all",
        isUnread
          ? "bg-blue-50/20 hover:bg-blue-50/40 border-l-4 border-l-blue-600"
          : "hover:bg-slate-50/40 border-l-4 border-l-transparent"
      )}
    >
      {/* ===================================================
       * LEFT ICON
       * ================================================= */}

      <div
        className={cn(
          "rounded-xl border p-2.5 shrink-0 transition-transform duration-200 hover:scale-105",
          config.boxClass
        )}
      >
        <IconComponent
          className={cn("w-5 h-5", config.iconClass)}
        />
      </div>

      {/* ===================================================
       * CONTENT
       * ================================================= */}

      <div className="flex flex-col min-w-0 text-left space-y-1.5">
        {/* TITLE ROW */}

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-base tracking-tight",
              isUnread
                ? "font-semibold text-slate-900"
                : "font-medium text-slate-700"
            )}
          >
            {notification.Title}
          </span>

          <Badge
            className={cn(
              "px-2 py-0 text-[10px] uppercase tracking-wider border",
              config.badgeClass
            )}
          >
            {config.label}
          </Badge>

          {isUnread && (
            <span className="flex w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          )}
        </div>

        {/* MESSAGE */}

        <p
          className={cn(
            "text-sm leading-relaxed",
            isUnread ? "text-slate-800" : "text-slate-500"
          )}
        >
          {notification.Message}
        </p>

        {/* META */}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />

            <span>{formatDate(notification.CreatedDate)}</span>
          </div>

          {notification.ProductID && (
            <>
              <span className={entity.separator}>·</span>

              <div>
                Mã sản phẩm:{" "}
                <span className={entity.id}>
                  {notification.ProductID}
                </span>
              </div>
            </>
          )}

          <span className={entity.separator}>·</span>

          <div>
            ID:{" "}
            <span className={entity.id}>
              {notification.NotificationID}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================
       * ACTION
       * ================================================= */}

      <div className="flex items-center self-center pl-2">
        {isUnread ? (
          <Button
            variant="outline"
            size="icon"
            title="Đánh dấu đã đọc"
            onClick={() =>
              onMarkAsRead(notification.NotificationID)
            }
            className={cn(
              btn.actionPrimary,
              "h-9 w-9 rounded-full hover:scale-105 transition-all shadow-sm"
            )}
          >
            <Check className="w-4.5 h-4.5 text-blue-600" />
          </Button>
        ) : (
          <div
            title="Đã đọc"
            className="p-1.5 text-green-600 border rounded-full bg-green-50 border-green-100"
          >
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}