import { useEmp } from "@/context/empContext";
import { api } from "@/lib/api";
import Dashboard from "@/pages/Dashboard";
import {
  Loader2,
  Package,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LowStockItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
}

interface PendingReqItem {
  id: string;
  title: string;
  creator: string;
  date: string;
  itemsCount: number;
}

export default function Home() {
  const { emp, hasRole } = useEmp();

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    productsCount: 0,
    lowStockCount: 0,
    warehousesCount: 0,
    pendingReqsCount: 0,
  });

  const [lowStockProducts, setLowStockProducts] = useState<LowStockItem[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingReqItem[]>([]);

  useEffect(() => {
    if (!hasRole(1)) return;

    const loadDashboardData = async () => {
      try {
        const [prodList, whList, invList, reqList, reqDetailsList, empList] = await Promise.all([
          api.products.list(),
          api.warehouses.list(),
          api.detailInventories.list(),
          api.requestForms.list(),
          api.requestDetails.list(),
          api.employees.list(),
        ]);

        // 1. Tổng số sản phẩm
        const totalProds = prodList.length;

        // 2. Chi nhánh kho hoạt động
        const activeWH = whList.filter((w) => w.Status === 1).length;

        // 3. Sản phẩm sắp hết hàng (CurrentQuantity < MinStock)
        const lowStockItems: LowStockItem[] = [];
        invList.forEach((inv) => {
          if (inv.CurrentQuantity < inv.MinStock) {
            const prod = prodList.find((p) => p.ProductID === inv.ProductID);
            if (prod) {
              const name = prod.ProductName;
              // Tránh trùng lặp sản phẩm nếu nằm ở nhiều kho
              if (!lowStockItems.some((item) => item.id === `SP-${prod.ProductID}`)) {
                lowStockItems.push({
                  id: `SP-${prod.ProductID}`,
                  name,
                  stock: inv.CurrentQuantity,
                  unit: "Đơn vị",
                });
              }
            }
          }
        });

        // 4. Đề xuất chờ kiểm duyệt (Status === "0" hoặc "Chờ duyệt")
        const pendingReqForms = reqList.filter((r) => r.Status === "0" || r.Status === "Chờ duyệt");

        const pendingItems: PendingReqItem[] = pendingReqForms.map((rf) => {
          const creatorEmp = empList.find((e) => e.EmployeeID === rf.EmployeeID);
          const creatorName = creatorEmp ? creatorEmp.Fullname : `Nhân viên #${rf.EmployeeID}`;

          const detailsCount = reqDetailsList.filter((d) => d.RequestID === rf.RequestID).length;

          return {
            id: `YC-${rf.RequestID}`,
            title: `Yêu cầu bổ sung vật tư #${rf.RequestID}`,
            creator: creatorName,
            date: new Date(rf.CreatedDate).toLocaleDateString("vi-VN"),
            itemsCount: detailsCount || 1,
          };
        });

        setMetrics({
          productsCount: totalProds,
          lowStockCount: lowStockItems.length,
          warehousesCount: activeWH,
          pendingReqsCount: pendingReqForms.length,
        });

        setLowStockProducts(lowStockItems.slice(0, 3));
        setPendingRequests(pendingItems.slice(0, 3));

      } catch (e) {
        console.error("Lỗi tải thông tin Dashboard:", e);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header section with User Info */}
      <div className="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-xl border border-white/10">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/15 backdrop-blur-md p-2 rounded-xl border border-white/10">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              SGFMS Dashboard
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
            Xin chào,{" "}
            <span className="text-yellow-200">
              {emp?.Fullname || "Thành viên hệ thống"}
            </span>
            !
          </h1>

          <p className="text-blue-100 text-sm md:text-base font-medium">
            Chúc bạn một ngày làm việc hiệu quả và đầy năng lượng ✨
          </p>
        </div>

        {/* Right decorative icon */}
        <div className="relative z-10 hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>

            <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl rotate-6 hover:rotate-0 transition-transform duration-500">
              <Package className="w-10 h-10 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {hasRole(1) ? (
        loading ? (
          <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-slate-200">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-slate-500 font-semibold">Đang chuẩn bị báo cáo tổng quan...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">Báo cáo hiệu quả kinh doanh & KPI</h2>
            <Dashboard />
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-white to-blue-50/40 rounded-2xl border border-slate-100 transition-all">
          <div className="relative mb-8 group">
            <div className="absolute -inset-4 rounded-full bg-blue-400/20 blur-xl group-hover:bg-blue-400/30 transition-colors duration-500"></div>
            <div className="relative bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-5 rounded-2x rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <Package className="w-12 h-12 stroke-[1.5]" />
            </div>
            <Sparkles className="absolute -top-5 -right-5 w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl md:text-[28px] font-bold text-slate-800 text-center max-w-2xl leading-relaxed px-4">
            Chào mừng đến với hệ thống<br />quản lý bán hàng và kho hàng <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold tracking-tight">SGF</span>
          </h2>
          <p className="mt-4 text-slate-500 text-center font-medium px-4">
            Hãy bắt đầu một ngày làm việc thật năng suất và hiệu quả!
          </p>
        </div>
      )}
    </div>
  );
}
