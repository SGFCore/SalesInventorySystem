import { page } from "@/pages/page-classes";
export default function Home() {
  return (
    <div className="space-y-2 p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Chào mừng
      </h1>
      <p className={page.textMuted}>
        Đây là trang chủ của SGF Management System
      </p>
    </div>
  );
}
