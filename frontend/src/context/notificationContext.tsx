import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Notification } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface NotificationContextType {
  notifications: Notification[];
  loading: boolean;
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await api.notifications.list();
      if (Array.isArray(data)) {
        // Sắp xếp các thông báo mới nhất lên đầu
        const sorted = data.sort((a, b) => {
          const timeA = a.CreatedDate ? new Date(a.CreatedDate).getTime() : 0;
          const timeB = b.CreatedDate ? new Date(b.CreatedDate).getTime() : 0;
          return timeB - timeA;
        });
        setNotifications(sorted);
      } else {
        setNotifications([]);
      }
    } catch (error: any) {
      console.error("Lỗi khi tải thông báo:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const notif = notifications.find((n) => n.NotificationID === id);
      if (notif && notif.Status === 0) {
        const updated = { ...notif, Status: 1 };
        await api.notifications.update(id, updated);
        
        // Cập nhật state cục bộ để UI thay đổi mượt mà
        setNotifications((prev) =>
          prev.map((n) => (n.NotificationID === id ? updated : n))
        );
        toast.success("Đã đánh dấu thông báo là đã đọc!");
      }
    } catch (error: any) {
      toast.error("Không thể đánh dấu đã đọc: " + (error.message || error));
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifs = notifications.filter((n) => n.Status === 0);
      if (unreadNotifs.length === 0) return;

      // Cập nhật tất cả các thông báo chưa đọc trên backend
      await Promise.all(
        unreadNotifs.map((n) =>
          api.notifications.update(n.NotificationID, { ...n, Status: 1 })
        )
      );

      // Cập nhật state cục bộ
      setNotifications((prev) =>
        prev.map((n) => (n.Status === 0 ? { ...n, Status: 1 } : n))
      );
      toast.success("Đã đánh dấu đọc tất cả thông báo!");
    } catch (error: any) {
      toast.error("Không thể cập nhật tất cả thông báo: " + (error.message || error));
    }
  };

  // Khởi tạo lấy dữ liệu khi lần đầu vào app
  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => n.Status === 0).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        unreadCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};
