import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/Sidebar";

export function Home() {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      {/* Navbar nằm trên cùng */}
      <Navbar />

      {/* Flex row: Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-main">Chào mừng</h1>
            <p className="text-foreground">
              Đây là trang chủ của SGF Management System
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
